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

console.log('Building adjacency for merging...');
const pointKey = (p) => `${p[0].toFixed(6)},${p[1].toFixed(6)},${p[2].toFixed(6)}`;

const adjacency = new Map();
normalizedEdges.forEach((edge, idx) => {
  const [p1, p2] = edge;
  const k1 = pointKey(p1);
  const k2 = pointKey(p2);
  if (!adjacency.has(k1)) adjacency.set(k1, []);
  if (!adjacency.has(k2)) adjacency.set(k2, []);
  adjacency.get(k1).push(p2);
  adjacency.get(k2).push(p1);
});

console.log('Merging connected edges into chains...');
const used = new Set();
const chains = [];

for (const edge of normalizedEdges) {
  const [p1, p2] = edge;
  const k1 = pointKey(p1);
  const k2 = pointKey(p2);
  const edgeKey = `${k1}|${k2}`;
  const edgeKeyRev = `${k2}|${k1}`;
  
  if (used.has(edgeKey) || used.has(edgeKeyRev)) continue;
  
  const chain = [p1, p2];
  used.add(edgeKey);
  used.add(edgeKeyRev);
  
  let current = p2;
  let currentKey = k2;
  for (let iter = 0; iter < 100; iter++) {
    const neighbors = adjacency.get(currentKey) || [];
    let found = false;
    for (const n of neighbors) {
      const nk = pointKey(n);
      const fwdKey = `${currentKey}|${nk}`;
      const revKey = `${nk}|${currentKey}`;
      if (!used.has(fwdKey) && !used.has(revKey)) {
        chain.push(n);
        used.add(fwdKey);
        used.add(revKey);
        current = n;
        currentKey = nk;
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  
  current = p1;
  currentKey = k1;
  for (let iter = 0; iter < 100; iter++) {
    const neighbors = adjacency.get(currentKey) || [];
    let found = false;
    for (const n of neighbors) {
      const nk = pointKey(n);
      const fwdKey = `${currentKey}|${nk}`;
      const revKey = `${nk}|${currentKey}`;
      if (!used.has(fwdKey) && !used.has(revKey)) {
        chain.unshift(n);
        used.add(fwdKey);
        used.add(revKey);
        current = n;
        currentKey = nk;
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  
  chains.push(chain);
}

chains.sort((a, b) => b.length - a.length);
console.log(`Total chains: ${chains.length}`);
console.log(`Top 5 chain lengths: ${chains.slice(0, 5).map(c => c.length).join(', ')}`);

const targetCount = 4000;
const selectedChains = chains.slice(0, targetCount);

const mergedEdges = selectedChains.map(chain => {
  if (chain.length < 2) return [chain[0], chain[0]];
  return [chain[0], chain[chain.length - 1]];
});

const tsContent = `// Data Center Wireframe: Merged into ${mergedEdges.length} longer edges
export const DATA_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(mergedEdges)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated ${outputPath}`);
console.log(`Final edges: ${mergedEdges.length}`);
