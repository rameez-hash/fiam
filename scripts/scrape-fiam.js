/* eslint-disable */
// Crawls the fiam.cc product tree (category → series → family → product)
// and downloads every original image into public/catalog.
// Usage: node scripts/scrape-fiam.js [--no-images]

const fs = require("fs");
const path = require("path");
const http = require("http");

const BASE = "http://www.fiam.cc";
const ROOT = path.join(__dirname, "..");
const CACHE = path.join(ROOT, ".cache", "fiam-html");
const IMG_DIR = path.join(ROOT, "public", "catalog");
const OUT = path.join(ROOT, "src", "data", "catalog.json");
const SKIP_IMAGES = process.argv.includes("--no-images");

const TOP = [
  { id: "7", name: "Commercial LED Light" },
  { id: "8", name: "Fixtures LED Module / GU10 / MR16" },
  { id: "10", name: "Outdoor Light" },
  { id: "1198", name: "Decorative Lighting" },
];
const NAV_IDS = new Set(["2", "3", "4", "6", "46", ...TOP.map((t) => t.id)]);

fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(IMG_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function get(url, binary = false, attempt = 1) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (FiamPakistanCatalog)" }, timeout: 45000 },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(get(new URL(res.headers.location, url).href, binary, attempt));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${res.statusCode} ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          resolve(binary ? buf : buf.toString("utf8"));
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error(`timeout ${url}`)));
    req.on("error", reject);
  }).catch(async (err) => {
    if (attempt >= 4) throw err;
    await sleep(800 * attempt);
    return get(url, binary, attempt + 1);
  });
}

async function page(url) {
  const file = path.join(CACHE, url.replace(/^https?:\/\//, "").replace(/[^\w.-]+/g, "_") + ".html");
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const html = await get(url);
  fs.writeFileSync(file, html);
  await sleep(150);
  return html;
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const text = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

/** Any fiam.cc image URL → original /upload/... URL */
function originalImage(src) {
  if (!src) return "";
  let u = src.trim();
  u = u.replace(/^\.\.\//, "/");
  const m = u.match(/upload\/[^"'?#\s]+/i);
  return m ? `${BASE}/${m[0]}` : "";
}

/** Main content only: breadcrumb → footer, minus the sidebar */
function mainArea(html) {
  const s = html.indexOf('class="curmbs"');
  const e = html.indexOf('<div class="footer"');
  let area = html.slice(s > 0 ? s : 0, e > 0 ? e : html.length);
  area = area.replace(/<ul class="lanmu">[\s\S]*?<\/ul>/gi, "");
  return area;
}

function listId(href) {
  const m = href.match(/\/list\/(\d+)-(\d+)\.html/i);
  return m ? { id: m[1], page: Number(m[2]) } : null;
}

function parseListPage(html, selfId) {
  const area = mainArea(html);
  const children = [];
  const products = [];
  const seenChild = new Set();
  const seenProd = new Set();

  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(area))) {
    const li = m[1];
    const a = li.match(/<a[^>]+href=["']([^"']+)["']/i);
    if (!a) continue;
    const href = new URL(a[1], BASE).href;
    const img = (li.match(/data-src=["']([^"']+)["']/i) || li.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1];
    const name = text((li.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "");

    const prod = href.match(/\/show\/product-(\d+)\.html/i);
    if (prod) {
      if (seenProd.has(prod[1])) continue;
      seenProd.add(prod[1]);
      let params = [];
      const ta = li.match(/<textarea[^>]*>([\s\S]*?)<\/textarea>/i);
      if (ta) {
        try {
          const json = JSON.parse(decode(ta[1]).trim());
          params = Object.values(json.params || {}).map((p) => ({ label: p.title, value: String(p.value) }));
        } catch {}
      }
      products.push({ id: prod[1], url: href, title: name, cover: originalImage(img), params });
      continue;
    }

    const lid = listId(href);
    if (!lid || lid.id === selfId || NAV_IDS.has(lid.id) || !img) continue;
    if (seenChild.has(lid.id)) continue;
    seenChild.add(lid.id);
    children.push({ id: lid.id, name, image: originalImage(img) });
  }

  const pages = new Set();
  const pagerRe = new RegExp(`/list/${selfId}-(\\d+)\\.html`, "gi");
  let pm;
  while ((pm = pagerRe.exec(area))) pages.add(Number(pm[1]));

  return { children, products, maxPage: Math.max(1, ...pages) };
}

function parseProduct(html) {
  const h1 = html.match(/<div class="lcms-product-header-cover">\s*<h1>([\s\S]*?)<\/h1>/i);
  let seriesTitle = "";
  let code = "";
  if (h1) {
    code = text((h1[1].match(/<span>([\s\S]*?)<\/span>/i) || [])[1] || "");
    seriesTitle = text(h1[1].replace(/<span>[\s\S]*?<\/span>/i, ""));
  }

  const gallery = [];
  const lb = html.match(/<ul class="lcms-lightbox">([\s\S]*?)<\/ul>/i);
  if (lb) {
    for (const g of lb[1].matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
      const u = originalImage(g[1]);
      if (u && !gallery.includes(u)) gallery.push(u);
    }
  }

  const specs = [];
  const td = html.match(/<div class="lcms-product-header-title">([\s\S]*?)<div class="dingzhi-favbtn|<div class="lcms-product-header-title">([\s\S]*?)<div class="clear">/i);
  const tdHtml = td ? td[1] || td[2] || "" : "";
  for (const p of tdHtml.matchAll(/<p>\s*<span>([\s\S]*?)<\/span>\s*<span>([\s\S]*?)<\/span>\s*<\/p>/gi)) {
    const label = text(p[1]).replace(/[:：]\s*$/, "").trim();
    const value = text(p[2]);
    if (label && value) specs.push({ label, value });
  }

  const tabNames = [...(html.match(/<ul class="lcms-product-contents-tabs">([\s\S]*?)<\/ul>/i) || ["", ""])[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((t) => text(t[1]));
  const tabBodies = [...html.matchAll(/<div class="lcms-product-contents-item[^"]*">([\s\S]*?)<div class="clear"><\/div>\s*<\/div>/gi)].map((t) => t[1]);
  const sections = [];
  const contentImages = [];
  tabBodies.forEach((body, i) => {
    const imgs = [...body.matchAll(/<img[^>]+(?:data-src|src)=["']([^"']+)["']/gi)].map((x) => originalImage(x[1])).filter(Boolean);
    imgs.forEach((u) => !contentImages.includes(u) && contentImages.push(u));
    const t = text(body);
    if (t || imgs.length) sections.push({ title: tabNames[i] || "Details", text: t, images: imgs });
  });

  return { seriesTitle, code, gallery, specs, sections, contentImages };
}

async function crawlList(id, name, image, parentId, ancestry, state) {
  if (state.nodes.has(id)) return;
  const node = { id, name, image, parentId, depth: ancestry.length, children: [], products: [] };
  state.nodes.set(id, node);
  console.log(`${"  ".repeat(ancestry.length)}▸ ${name} (${id})`);

  const first = await page(`${BASE}/list/${id}-1.html`);
  let parsed = parseListPage(first, id);
  const allChildren = [...parsed.children];
  const allProducts = [...parsed.products];
  for (let p = 2; p <= parsed.maxPage; p++) {
    const more = parseListPage(await page(`${BASE}/list/${id}-${p}.html`), id);
    allChildren.push(...more.children.filter((c) => !allChildren.some((x) => x.id === c.id)));
    allProducts.push(...more.products.filter((c) => !allProducts.some((x) => x.id === c.id)));
  }

  for (const child of allChildren) {
    node.children.push(child.id);
    await crawlList(child.id, child.name, child.image, id, [...ancestry, id], state);
  }

  for (const card of allProducts) {
    if (state.products.has(card.id)) {
      node.products.push(card.id);
      continue;
    }
    let detail = { seriesTitle: "", code: card.title, gallery: [], specs: [], sections: [], contentImages: [] };
    try {
      detail = parseProduct(await page(card.url));
    } catch (e) {
      console.warn("   ! product failed", card.url, e.message);
    }
    // Prefer show-page lightbox photos; list cover is often a near-duplicate.
    const images = [...new Set((detail.gallery.length ? detail.gallery : [card.cover]).filter(Boolean))];
    state.products.set(card.id, {
      id: card.id,
      code: detail.code || card.title,
      seriesTitle: detail.seriesTitle,
      nodeId: id,
      cover: card.cover || images[0] || "",
      images,
      params: card.params,
      specs: detail.specs,
      sections: detail.sections,
      sourceUrl: card.url,
    });
    node.products.push(card.id);
  }
  if (allProducts.length) console.log(`${"  ".repeat(ancestry.length + 1)}${allProducts.length} products`);
}

async function downloadImages(urls) {
  const list = [...urls];
  let done = 0;
  let failed = 0;
  const worker = async () => {
    while (list.length) {
      const url = list.shift();
      const rel = url.replace(`${BASE}/upload/`, "");
      const dest = path.join(IMG_DIR, rel);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        done++;
        continue;
      }
      try {
        const buf = await get(url, true);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
      } catch (e) {
        failed++;
        console.warn("   ! image failed", url, e.message);
      }
      done++;
      if (done % 50 === 0) console.log(`   images ${done}/${urls.size}`);
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return { total: urls.size, failed };
}

const localPath = (url) => (url ? `/catalog/${url.replace(`${BASE}/upload/`, "")}` : "");

(async () => {
  const state = { nodes: new Map(), products: new Map() };
  for (const top of TOP) {
    const html = await page(`${BASE}/list/${top.id}-1.html`);
    const banner = originalImage((html.match(/lcms-banner[\s\S]*?data-src=["']([^"']+)["']/i) || [])[1] || "");
    await crawlList(top.id, top.name, banner, null, [], state);
  }

  const imageUrls = new Set();
  for (const n of state.nodes.values()) if (n.image) imageUrls.add(n.image);
  for (const p of state.products.values()) {
    p.images.forEach((u) => imageUrls.add(u));
    p.sections.forEach((s) => s.images.forEach((u) => imageUrls.add(u)));
  }

  let imgResult = { total: imageUrls.size, failed: 0 };
  if (!SKIP_IMAGES) {
    console.log(`\nDownloading ${imageUrls.size} images...`);
    imgResult = await downloadImages(imageUrls);
  }

  const usedSlugs = new Set();
  const uniqueSlug = (base, id) => {
    let s = slugify(base);
    if (usedSlugs.has(s)) s = `${s}-${id}`;
    usedSlugs.add(s);
    return s;
  };

  const nodes = [...state.nodes.values()].map((n) => ({
    id: n.id,
    slug: uniqueSlug(n.name, n.id),
    name: n.name,
    image: localPath(n.image),
    parentId: n.parentId,
    depth: n.depth,
    children: n.children,
    products: n.products,
  }));
  usedSlugs.clear();
  const products = [...state.products.values()].map((p) => ({
    id: p.id,
    slug: uniqueSlug(p.code, p.id),
    code: p.code,
    seriesTitle: p.seriesTitle,
    nodeId: p.nodeId,
    cover: localPath(p.cover),
    images: p.images.map(localPath),
    params: p.params,
    specs: p.specs,
    sections: p.sections.map((s) => ({ ...s, images: s.images.map(localPath) })),
  }));

  fs.writeFileSync(
    OUT,
    JSON.stringify({ source: BASE, scrapedAt: new Date().toISOString(), topIds: TOP.map((t) => t.id), nodes, products })
  );
  console.log(`\nNodes: ${nodes.length}  Products: ${products.length}  Images: ${imgResult.total} (failed ${imgResult.failed})`);
  console.log("Wrote", OUT);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
