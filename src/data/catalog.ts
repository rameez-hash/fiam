import raw from "./catalog.json";

export type SpecRow = { label: string; value: string };

export type CatalogNode = {
  id: string;
  slug: string;
  name: string;
  image: string;
  parentId: string | null;
  depth: number;
  children: string[];
  products: string[];
};

export type CatalogProduct = {
  id: string;
  slug: string;
  code: string;
  seriesTitle: string;
  nodeId: string;
  cover: string;
  images: string[];
  params: SpecRow[];
  specs: SpecRow[];
  sections: { title: string; text: string; images: string[] }[];
};

export type TopCategory = CatalogNode & {
  shortName: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  highlight: string;
};

const topMeta: Record<string, Omit<TopCategory, keyof CatalogNode> & { slug: string; name: string }> = {
  "7": {
    slug: "commercial-led-light",
    name: "Commercial LED Light",
    shortName: "Commercial",
    description:
      "Downlights, track, linear, panel, high bay and wall washer systems engineered for offices, retail, hospitality and public spaces.",
    seoTitle: "Commercial LED Lights Pakistan | Downlights, Track, Panel & Linear",
    seoDescription:
      "Buy commercial LED lights in Pakistan from Fiam: SMD and COB downlights, track lights, linear lights, LED panel lights, high bay and wall washers for offices, retail, and projects nationwide.",
    highlight: "Downlight · Track · Linear · Panel",
  },
  "8": {
    slug: "fixtures-led-module",
    name: "Fixtures LED Module",
    shortName: "LED Modules",
    description:
      "Recessed and surface fixtures for GU10, MR16, AR111 and PAR modules, with adjustable aiming and die-cast aluminium housings.",
    seoTitle: "LED Module Fixtures Pakistan | GU10, MR16, AR111 & PAR",
    seoDescription:
      "FIAM LED module fixtures in Pakistan for GU10, MR16, AR111 and PAR: recessed and surface housings for accent and general lighting across Karachi, Lahore, Islamabad, and more.",
    highlight: "GU10 · MR16 · AR111 · PAR",
  },
  "10": {
    slug: "outdoor-light",
    name: "Outdoor Light",
    shortName: "Outdoor",
    description:
      "IP-rated step lights, wall lights, floodlights, bollards and landscape luminaires for façades, gardens and pathways.",
    seoTitle: "Outdoor LED Lights Pakistan | Flood, Step, Wall & Garden Lights",
    seoDescription:
      "Outdoor LED lights in Pakistan from Fiam: IP-rated flood lights, step lights, wall lights, bollards and garden lights for façades, pathways, and outdoor projects nationwide.",
    highlight: "IP-rated exterior luminaires",
  },
  "1198": {
    slug: "decorative-lighting",
    name: "Decorative Lighting",
    shortName: "Decorative",
    description:
      "Pendants, chandeliers, wall, table and floor lamps that shape atmosphere in homes, hospitality and boutique interiors.",
    seoTitle: "Pendant Lights & Decorative Lighting Pakistan | Chandeliers & Lamps",
    seoDescription:
      "Shop pendant lights, chandeliers, ceiling lights, wall lamps, table lamps and floor lamps in Pakistan. Decorative lighting by Fiam for homes, hospitality, and interiors nationwide.",
    highlight: "Atmosphere-first interiors",
  },
};

const data = raw as { topIds: string[]; nodes: CatalogNode[]; products: CatalogProduct[] };

const rawById = new Map(data.nodes.map((n) => [n.id, n]));
const hasProducts = (n: CatalogNode): boolean =>
  n.products.length > 0 || n.children.some((id) => {
    const child = rawById.get(id);
    return child ? hasProducts(child) : false;
  });

const nodes: CatalogNode[] = data.nodes
  .filter((n) => n.depth === 0 || hasProducts(n))
  .map((n) => ({
    ...n,
    ...(topMeta[n.id] ? { slug: topMeta[n.id].slug, name: topMeta[n.id].name } : {}),
    children: n.children.filter((id) => {
      const child = rawById.get(id);
      return child ? hasProducts(child) : false;
    }),
  }));
const nodeById = new Map(nodes.map((n) => [n.id, n]));
const nodeBySlug = new Map(nodes.map((n) => [n.slug, n]));

export const catalogProducts: CatalogProduct[] = data.products.map((p) => {
  // List-page cover was prepended during scrape and usually duplicates the first
  // show-page photo, so drop it from the gallery when detail images exist.
  let images =
    p.cover && p.images.length > 1 && p.images[0] === p.cover
      ? p.images.slice(1)
      : [...p.images];
  if (!images.length) {
    const fallback = p.cover || rawById.get(p.nodeId)?.image || "";
    if (fallback) images = [fallback];
  }
  return {
    ...p,
    cover: p.cover || images[0] || "",
    images: [...new Set(images)],
  };
});
const productById = new Map(catalogProducts.map((p) => [p.id, p]));
const productBySlug = new Map(catalogProducts.map((p) => [p.slug, p]));

export const catalogNodes = nodes;

export const topCategories: TopCategory[] = data.topIds
  .map((id) => nodeById.get(id))
  .filter((n): n is CatalogNode => Boolean(n))
  .map((n) => ({ ...n, ...topMeta[n.id] }));

export const getTopCategory = (id: string) => topCategories.find((c) => c.id === id);
export const getNode = (slug: string) => nodeBySlug.get(slug);
export const getNodeById = (id: string) => nodeById.get(id);
export const getCatalogProduct = (slug: string) => productBySlug.get(slug);

export const getChildren = (node: CatalogNode) =>
  node.children.map((id) => nodeById.get(id)).filter((n): n is CatalogNode => Boolean(n));

export const getNodeProducts = (node: CatalogNode) =>
  node.products.map((id) => productById.get(id)).filter((p): p is CatalogProduct => Boolean(p));

export function getAncestors(node: CatalogNode) {
  const chain: CatalogNode[] = [];
  let cur = node.parentId ? nodeById.get(node.parentId) : undefined;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parentId ? nodeById.get(cur.parentId) : undefined;
  }
  return chain;
}

export function getRootCategory(node: CatalogNode) {
  return getTopCategory(node.depth === 0 ? node.id : getAncestors(node)[0]?.id ?? node.id);
}

export function countProducts(node: CatalogNode): number {
  return node.products.length + getChildren(node).reduce((sum, c) => sum + countProducts(c), 0);
}

/** Homepage / mega-menu covers for top-level categories */
export const categoryCovers: Record<string, string> = {
  "commercial-led-light": "/categories/commercial-led-light-v3.jpg",
  "fixtures-led-module": "/categories/fixtures-module-v5.jpg",
  "outdoor-light": "/categories/outdoor-light-v2.jpg",
  "decorative-lighting": "/categories/decorative-lighting-v2.jpg",
};

export function nodeImage(node: CatalogNode): string {
  if (node.image) return node.image;
  const first = getNodeProducts(node)[0];
  if (first?.cover) return first.cover;
  for (const child of getChildren(node)) {
    const img = nodeImage(child);
    if (img) return img;
  }
  return "";
}

export function categoryCoverImage(node: CatalogNode): string {
  return categoryCovers[node.slug] || nodeImage(node);
}

export const productImage = (p: CatalogProduct) => p.cover || p.images[0] || "";

export function getProductSiblings(p: CatalogProduct) {
  const node = nodeById.get(p.nodeId);
  return node ? getNodeProducts(node) : [];
}

/** First product of each family, spread across categories, for home page rails */
export function getShowcaseProducts(limit = 8, offset = 0) {
  const perCategory = topCategories.map((cat) => {
    const picks: CatalogProduct[] = [];
    const walk = (n: CatalogNode) => {
      const first = getNodeProducts(n)[0];
      if (first && productImage(first)) picks.push(first);
      getChildren(n).forEach(walk);
    };
    walk(cat);
    return picks.slice(offset);
  });
  const out: CatalogProduct[] = [];
  for (let i = 0; out.length < limit && perCategory.some((l) => l[i]); i++) {
    for (const list of perCategory) if (list[i] && out.length < limit) out.push(list[i]);
  }
  return out;
}

export function specValue(p: CatalogProduct, ...labels: string[]) {
  const rows = [...p.specs, ...p.params];
  for (const l of labels) {
    const hit = rows.find((r) => r.label.toLowerCase().startsWith(l.toLowerCase()));
    if (hit?.value) return hit.value;
  }
  return "";
}
