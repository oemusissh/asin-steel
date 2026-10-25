// ساخت مدل سه‌بعدی مقطع‌های فولادی فقط با CSS (بدون کتابخانه).
// هر مقطع یک پروفیل دوبعدی است که در راستای Z کشیده (extrude) می‌شود.
export type ShapeKey = 'beam' | 'rebar' | 'channel' | 'angle' | 'tube' | 'plate' | 'pipe' | 'flat';

type Pt = [number, number];
type Loop = Pt[];
type Piece = { outer: Loop; inner?: Loop; len: number; z?: number };

const LX = -0.5, LY = -0.85;
const LM = Math.hypot(LX, LY);
const LIGHT: Pt = [LX / LM, LY / LM]; // نور از بالا-چپ

const ngon = (r: number, n = 18): Loop =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [r * Math.cos(a), r * Math.sin(a)] as Pt;
  });
const rect = (w: number, h: number): Loop => [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];

const SHAPES: Record<ShapeKey, { k: number; pieces: Piece[] }> = {
  // I شکل
  beam: {
    k: 1,
    pieces: [{
      len: 380,
      outer: [[-70, -80], [70, -80], [70, -62], [7, -62], [7, 62], [70, 62], [70, 80], [-70, 80], [-70, 62], [-7, 62], [-7, -62], [-70, -62]]
    }]
  },
  // میلگرد آجدار: استوانه + حلقه‌های آج
  rebar: {
    k: 1.1,
    pieces: [
      { outer: ngon(34), len: 380 },
      ...Array.from({ length: 15 }, (_, i) => ({ outer: ngon(40), len: 9, z: -168 + i * 24 }))
    ]
  },
  // U شکل
  channel: {
    k: 1.05,
    pieces: [{ len: 370, outer: [[-45, -75], [45, -75], [45, -61], [-33, -61], [-33, 61], [45, 61], [45, 75], [-45, 75]] }]
  },
  // L شکل
  angle: {
    k: 1.15,
    pieces: [{ len: 360, outer: [[-55, -55], [-39, -55], [-39, 39], [55, 39], [55, 55], [-55, 55]] }]
  },
  // قوطی توخالی
  tube: {
    k: 1.2,
    pieces: [{ len: 360, outer: rect(120, 80), inner: rect(104, 64) }]
  },
  // ورق
  plate: {
    k: 1,
    pieces: [{ len: 230, outer: rect(230, 16) }]
  },
  // لولهٔ توخالی
  pipe: {
    k: 1.1,
    pieces: [{ len: 340, outer: ngon(52, 22), inner: ngon(40, 22) }]
  },
  // تسمه
  flat: {
    k: 1.1,
    pieces: [{ len: 360, outer: rect(120, 10) }]
  }
};

const area = (l: Loop) => {
  let s = 0;
  for (let i = 0; i < l.length; i++) {
    const [x1, y1] = l[i];
    const [x2, y2] = l[(i + 1) % l.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
};

const f = (n: number) => n.toFixed(2);

function sides(loop: Loop, len: number, z: number, hole: boolean): string {
  const dir = (area(loop) >= 0 ? 1 : -1) * (hole ? -1 : 1);
  let out = '';
  for (let i = 0; i < loop.length; i++) {
    const [x1, y1] = loop[i];
    const [x2, y2] = loop[(i + 1) % loop.length];
    const dx = x2 - x1, dy = y2 - y1;
    const w = Math.hypot(dx, dy);
    if (w < 0.01) continue;
    const nx = (dir * dy) / w, ny = (dir * -dx) / w;
    const lit = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1]);
    const l = 26 + 44 * lit;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    out += `<i class="sf" style="width:${f(w)}px;height:${len}px;margin:${-len / 2}px 0 0 ${f(-w / 2)}px;--l:${f(l)}%;transform:translate3d(${f((x1 + x2) / 2)}px,${f((y1 + y2) / 2)}px,${z}px) rotateZ(${f(ang)}deg) rotateX(90deg)"></i>`;
  }
  return out;
}

function cap(p: Piece, z: number): string {
  const xs = p.outer.map((q) => q[0]), ys = p.outer.map((q) => q[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX, h = maxY - minY;
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const pt = (q: Pt) => `${f(q[0] - minX)}px ${f(q[1] - minY)}px`;
  let poly = p.outer.map(pt).join(',') + ',' + pt(p.outer[0]);
  if (p.inner) poly += ',' + p.inner.map(pt).join(',') + ',' + pt(p.inner[0]) + ',' + pt(p.outer[0]);
  return `<i class="cf" style="width:${f(w)}px;height:${f(h)}px;margin:${f(cy - h / 2)}px 0 0 ${f(cx - w / 2)}px;clip-path:polygon(evenodd,${poly});transform:translateZ(${z}px)"></i>`;
}

export function build3d(key: ShapeKey): { html: string; k: number } {
  const s = SHAPES[key];
  let html = '';
  for (const p of s.pieces) {
    const z = p.z ?? 0;
    html += sides(p.outer, p.len, z, false);
    if (p.inner) html += sides(p.inner, p.len, z, true);
    html += cap(p, z + p.len / 2) + cap(p, z - p.len / 2);
  }
  return { html, k: s.k };
}