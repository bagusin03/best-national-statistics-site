// Pembuat chart SVG tanpa library: bar, garis, dan donat. Semua fungsi
// mengembalikan string SVG yang bisa disisipkan ke halaman. Nilai negatif
// digambar di bawah garis nol.
const NS = "http://www.w3.org/2000/svg";
const TEAL = "#0e4f4a";
const AMBER = "#e8a33d";
const SAND = "#f2e7c9";
const INK = "#1d2b29";
const MUTED = "#5c6b68";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// Label sumbu: data memakai `year` untuk deret waktu, `label` untuk kategori.
function axisLabel(d) {
  return d.label ?? d.year;
}

function niceMax(values) {
  const m = Math.max(...values.map(Math.abs), 1);
  const pow = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil(m / pow) * pow;
}

// Chart batang vertikal. data: [{label, value}]
export function barChart(data, { height = 260, unit = "%", color = TEAL } = {}) {
  const w = 560, padL = 44, padB = 34, padT = 14;
  const max = niceMax(data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const span = max - min;
  const plotH = height - padT - padB;
  const plotW = w - padL - 12;
  const bw = Math.min(64, (plotW / data.length) * 0.6);
  const step = plotW / data.length;
  const y = (v) => padT + ((max - v) / span) * plotH;
  const zeroY = y(0);
  let bars = "";
  data.forEach((d, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const top = Math.min(y(d.value), zeroY);
    const h = Math.abs(zeroY - y(d.value));
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(h, 2).toFixed(1)}" rx="4" fill="${color}"/>`
      + `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="12" fill="${INK}">${String(d.value).replace(".", ",")}${unit}</text>`
      + `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(axisLabel(d))}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Diagram batang" xmlns="${NS}">`
    + `<line x1="${padL}" y1="${zeroY}" x2="${w - 8}" y2="${zeroY}" stroke="${MUTED}" stroke-width="1"/>`
    + `<text x="8" y="${y(max) + 4}" font-size="11" fill="${MUTED}">${String(max).replace(".", ",")}${unit}</text>`
    + bars + `</svg>`;
}

// Chart garis dengan titik. data: [{label, value}]
export function lineChart(data, { height = 260, unit = "%", color = AMBER } = {}) {
  const w = 560, padL = 44, padB = 34, padT = 18;
  const max = niceMax(data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const span = max - min;
  const plotH = height - padT - padB;
  const plotW = w - padL - 16;
  const x = (i) => padL + (i / (data.length - 1)) * plotW;
  const y = (v) => padT + ((max - v) / span) * plotH;
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  let dots = "";
  data.forEach((d, i) => {
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`
      + `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 11).toFixed(1)}" text-anchor="middle" font-size="12" fill="${INK}">${String(d.value).replace(".", ",")}${unit}</text>`
      + `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(axisLabel(d))}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Diagram garis" xmlns="${NS}">`
    + `<line x1="${padL}" y1="${y(0)}" x2="${w - 8}" y2="${y(0)}" stroke="${MUTED}" stroke-width="1"/>`
    + `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
    + dots + `</svg>`;
}

// Donat sederhana untuk satu pangsa (mis. 19,8% dari 100).
export function donutChart(share, { label = "", color = TEAL } = {}) {
  const r = 62, c = 2 * Math.PI * r;
  const dash = (share / 100) * c;
  return `<svg viewBox="0 0 160 160" width="160" height="160" style="flex:none" role="img" aria-label="${esc(label)}" xmlns="${NS}">`
    + `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${SAND}" stroke-width="22"/>`
    + `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${color}" stroke-width="22" stroke-dasharray="${dash.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 80 80)" stroke-linecap="round"/>`
    + `<text x="80" y="76" text-anchor="middle" font-size="24" font-weight="700" fill="${INK}">${String(share).replace(".", ",")}%</text>`
    + `<text x="80" y="96" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text></svg>`;
}

// Batang horizontal untuk peringkat provinsi.
export function hbarChart(rows, { unit = " jt" } = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  return rows.map((r) => {
    const pct = (r.value / max) * 100;
    return `<div class="hbar-row"><span class="hbar-label">${esc(r.label)}</span>`
      + `<span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%"></span></span>`
      + `<span class="hbar-value">${String(r.value).replace(".", ",")}${unit}</span></div>`;
  }).join("");
}
