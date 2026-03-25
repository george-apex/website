const fs = require('fs');
const path = require('path');

const objPath = path.join(__dirname, '../data.obj');
const outputPath = path.join(__dirname, '../components/animations/dataWireframeData.ts');

console.log('Reading OBJ file...');
const objContent = fs.readFileSync(objPath, 'utf-8');
const lines = objContent.split('\n');

const vertices = [];
const edges = new Set();

console.log('Parsing...');
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('v ')) {
    const parts = trimmed.split(/\s+/);
    vertices.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
  } else if (trimmed.startsWith('f ')) {
    const parts = trimmed.split(/\s+/).slice(1);
    const faceVertexIndices = parts.map(p => {
      const slashIndex = p.indexOf('/');
      return slashIndex >= 0 ? parseInt(p.substring(0, slashIndex)) - 1 : parseInt(p) - 1;
    });
    
    for (let i = 0; i < faceVertexIndices.length; i++) {
      const v1 = faceVertexIndices[i];
      const v2 = faceVertexIndices[(i + 1) % faceVertexIndices.length];
      const edgeKey = v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
      edges.add(edgeKey);
    }
  }
}

console.log(`Vertices: ${vertices.length}, Edges: ${edges.size}`);

const edgeArray = Array.from(edges).map(edgeKey => {
  const [i1, i2] = edgeKey.split('-').map(Number);
  return [vertices[i1], vertices[i2]];
});

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
let minZ = Infinity, maxZ = -Infinity;

for (const [v1, v2] of edgeArray) {
  for (const [x, y, z] of [v1, v2]) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  }
}

const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;
const centerZ = (minZ + maxZ) / 2;
const maxDim = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
const scale = 2 / maxDim;

const normalizedEdges = edgeArray.map(([v1, v2]) => {
  return [
    [(v1[0] - centerX) * scale, (v1[1] - centerY) * scale, (v1[2] - centerZ) * scale],
    [(v2[0] - centerX) * scale, (v2[1] - centerY) * scale, (v2[2] - centerZ) * scale]
  ];
});

const distance = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p1[0] - p2[0], 2) +
    Math.pow(p1[1] - p2[1], 2) +
    Math.pow(p1[2] - p2[2], 2)
  );
};

console.log('Categorizing edges by region and direction...');
const regions = { x: 4, y: 4, z: 4 };
const buckets = {};

for (let xi = 0; xi < regions.x; xi++) {
  for (let yi = 0; yi < regions.y; yi++) {
    for (let zi = 0; zi < regions.z; zi++) {
      buckets[`${xi},${yi},${zi}`] = [];
    }
  }
}

normalizedEdges.forEach((edge, idx) => {
  const [p1, p2] = edge;
  const midX = (p1[0] + p2[0]) / 2;
  const midY = (p1[1] + p2[1]) / 2;
  const midZ = (p1[2] + p2[2]) / 2;
  
  const xi = Math.min(regions.x - 1, Math.max(0, Math.floor((midX + 1) / 2 * regions.x)));
  const yi = Math.min(regions.y - 1, Math.max(0, Math.floor((midY + 1) / 2 * regions.y)));
  const zi = Math.min(regions.z - 1, Math.max(0, Math.floor((midZ + 1) / 2 * regions.z)));
  
  const len = distance(p1, p2);
  buckets[`${xi},${yi},${zi}`].push({ edge, len });
});

const targetCount = 4000;
const bucketCount = Object.keys(buckets).length;
const perBucket = Math.ceil(targetCount / bucketCount);

console.log(`Selecting ${perBucket} longest edges from each of ${bucketCount} regions...`);

const selectedEdges = [];
for (const key of Object.keys(buckets)) {
  const bucketEdges = buckets[key].sort((a, b) => b.len - a.len);
  const topEdges = bucketEdges.slice(0, perBucket).map(e => e.edge);
  selectedEdges.push(...topEdges);
}

selectedEdges.sort((a, b) => distance(b[0], b[1]) - distance(a[0], a[1]));
const finalEdges = selectedEdges.slice(0, targetCount);

const cuboidCorners = [
  [minX, minY, minZ], [maxX, minY, minZ],
  [minX, maxY, minZ], [maxX, maxY, minZ],
  [minX, minY, maxZ], [maxX, minY, maxZ],
  [minX, maxY, maxZ], [maxX, maxY, maxZ],
].map(([x, y, z]) => [
  (x - centerX) * scale,
  (y - centerY) * scale,
  (z - centerZ) * scale
]);

const cuboidEdgeIndices = [
  [0, 1], [2, 3], [4, 5], [6, 7],
  [0, 2], [1, 3], [4, 6], [5, 7],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const cuboidEdges = cuboidEdgeIndices.map(([i, j]) => [cuboidCorners[i], cuboidCorners[j]]);

finalEdges.unshift(...cuboidEdges);

const tsContent = `// Data Center Wireframe: ${finalEdges.length} edges (region-balanced)
export const DATA_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(finalEdges)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated ${outputPath}`);
console.log(`Final edges: ${finalEdges.length}`);
