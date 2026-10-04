const sharp = require("sharp");
const fs = require("fs");

(async () => {
  const { data, info } = await sharp("public/fiam-logo.png")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 20) continue;
      if (r > 180 && g > 60 && g < 180 && b < 80 && r > g) {
        sr += r;
        sg += g;
        sb += b;
        n++;
      }
    }
  }
  const avgR = Math.round(sr / n);
  const avgG = Math.round(sg / n);
  const avgB = Math.round(sb / n);
  const hex =
    "#" +
    [avgR, avgG, avgB].map((v) => v.toString(16).padStart(2, "0")).join("");
  console.log("brand orange", hex);

  function svgDot(size, padRatio = 0.12) {
    const pad = size * padRatio;
    const r = (size - pad * 2) / 2;
    const c = size / 2;
    return Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${c}" cy="${c}" r="${r}" fill="${hex}"/></svg>`,
    );
  }

  async function writePng(size, out) {
    await sharp(svgDot(size)).png().toFile(out);
  }

  await writePng(512, "src/app/icon.png");
  await writePng(180, "src/app/apple-icon.png");
  await writePng(256, "public/fiam-dot.png");
  await writePng(256, "public/fiam-mark.png");

  const png16 = await sharp(svgDot(16)).png().toBuffer();
  const png32 = await sharp(svgDot(32)).png().toBuffer();
  const png48 = await sharp(svgDot(48)).png().toBuffer();

  function icoFromPngs(pngs) {
    const count = pngs.length;
    const headerSize = 6 + 16 * count;
    let offset = headerSize;
    const entries = [];
    for (const png of pngs) {
      const pw = (png[16] << 24) | (png[17] << 16) | (png[18] << 8) | png[19];
      const ph = (png[20] << 24) | (png[21] << 16) | (png[22] << 8) | png[23];
      entries.push({
        w: pw >= 256 ? 0 : pw,
        h: ph >= 256 ? 0 : ph,
        size: png.length,
        offset,
      });
      offset += png.length;
    }
    const out = Buffer.alloc(offset);
    out.writeUInt16LE(0, 0);
    out.writeUInt16LE(1, 2);
    out.writeUInt16LE(count, 4);
    let eoff = 6;
    for (const e of entries) {
      out[eoff] = e.w;
      out[eoff + 1] = e.h;
      out[eoff + 2] = 0;
      out[eoff + 3] = 0;
      out.writeUInt16LE(1, eoff + 4);
      out.writeUInt16LE(32, eoff + 6);
      out.writeUInt32LE(e.size, eoff + 8);
      out.writeUInt32LE(e.offset, eoff + 12);
      eoff += 16;
    }
    let poff = headerSize;
    for (const p of pngs) {
      p.copy(out, poff);
      poff += p.length;
    }
    return out;
  }

  const ico = icoFromPngs([png16, png32, png48]);
  fs.writeFileSync("src/app/favicon.ico", ico);
  fs.writeFileSync("public/favicon.ico", ico);
  console.log("favicon updated");
})();
