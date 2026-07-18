// Deterministic "hand-cut paper" silhouette generator.
//
// Builds a rounded-rectangle perimeter, nudges each vertex slightly along its
// normal using a fixed seed table (never Math.random, so server- and
// client-rendered output always match), then smooths a curve through the
// points so the result reads as a gentle deckled edge rather than a
// jagged/spiky shape.

const SEED = [
    0.6, -0.3, 0.8, -0.6, 0.2, 0.9, -0.5, 0.4, -0.8, 0.3, 0.7, -0.4, 0.5, -0.9,
    0.2, 0.6, -0.7, 0.3, 0.8, -0.2, 0.4, -0.6, 0.9, -0.3, 0.5, 0.1, -0.8, 0.6, -0.4, 0.7, -0.2, 0.5, 0.3, -0.7, 0.8, -0.5, 0.2, 0.9, -0.6, 0.4,
];

function seededOffset(i, amplitude) {
    return SEED[i % SEED.length] * amplitude;
}

function rectPerimeterPoints(w, h, radius, perSide, amplitude) {
    const pts = [];
    const segs = [
        [radius, 0, w - radius, 0, 0, -1], // top
        [w, radius, w, h - radius, 1, 0], // right
        [w - radius, h, radius, h, 0, 1], // bottom
        [0, h - radius, 0, radius, -1, 0], // left
    ];
    let i = 0;
    segs.forEach(([x1, y1, x2, y2, nx, ny]) => {
        for (let s = 0; s < perSide; s++) {
            const t = s / perSide;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            const off = seededOffset(i++, amplitude);
            pts.push([x + nx * off, y + ny * off]);
        }
    });
    return pts;
}

function mid(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function smoothClosedPath(points) {
    const n = points.length;
    const start = mid(points[n - 1], points[0]);
    let d = `M ${start[0].toFixed(2)},${start[1].toFixed(2)} `;
    for (let i = 0; i < n; i++) {
        const p = points[i];
        const next = points[(i + 1) % n];
        const m = mid(p, next);
        d += `Q ${p[0].toFixed(2)},${p[1].toFixed(2)} ${m[0].toFixed(2)},${m[1].toFixed(2)} `;
    }
    return d + "Z";
}

/**
 * @param {number} w viewBox width
 * @param {number} h viewBox height
 * @param {number} radius corner rounding
 * @param {number} perSide subdivisions per edge (more = smoother wobble)
 * @param {number} amplitude how far points nudge, in viewBox units
 * @returns {string} an SVG path `d` attribute value
 */
export function paperEdgePath(w = 1000, h = 640, radius = 40, perSide = 9, amplitude = 6) {
    const pts = rectPerimeterPoints(w, h, radius, perSide, amplitude);
    return smoothClosedPath(pts);
}