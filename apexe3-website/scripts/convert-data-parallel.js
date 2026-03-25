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

const getDirection = (p1, p2) => {
  const len = distance(p1, p2);
  if (len < 0.0001) return [0, 0, 0];
  return [(p2[0] - p1[0]) / len, (p2[1] - p1[1]) / len, (p2[2] - p1[2]) / len];
};

const dotProduct = (d1, d2) => {
  return Math.abs(d1[0] * d2[0] + d1[1] * d2[1] + d1[2] * d2[2]);
};

const proximityThreshold = 0.02;
const parallelThreshold = 0.95;

console.log('Merging parallel, adjacent edges...');

const edgeInfo = normalizedEdges.map((edge, idx) => {
  const [p1, p2] = edge;
  const len = distance(p1, p2);
  const dir = getDirection(p1, p2);
  return { p1, p2, len, dir, idx };
});

const used = new Set();
const mergedEdges = [];

for (let i = 0; i < edgeInfo.length; i++) {
  if (used.has(i)) continue;
  
  const edge = edgeInfo[i];
  let chainStart = edge.p1;
  let chainEnd = edge.p2;
  let chainDir = edge.dir;
  
  used.add(i);
  
  let extended = true;
  while (extended) {
    extended = false;
    
    for (let j = 0; j < edgeInfo.length; j++) {
      if (used.has(j)) continue;
      
      const other = edgeInfo[j];
      const parallelism = dotProduct(chainDir, other.dir);
      if (parallelism < parallelThreshold) continue;
      
      const distToStart1 = distance(chainEnd, other.p1);
      const distToStart2 = distance(chainEnd, other.p2);
      const distToEnd1 = distance(chainStart, other.p1);
      const distToEnd2 = distance(chainStart, other.p2);
      
      if (distToStart1 < proximityThreshold) {
        chainEnd = other.p2;
        used.add(j);
        extended = true;
      } else if (distToStart2 < proximityThreshold) {
        chainEnd = other.p1;
        used.add(j);
        extended = true;
      } else if (distToEnd1 < proximityThreshold) {
        chainStart = other.p2;
        used.add(j);
        extended = true;
      } else if (distToEnd2 < proximityThreshold) {
        chainStart = other.p1;
        used.add(j);
        extended = true;
      }
    }
  }
  
  mergedEdges.push([chainStart, chainEnd]);
}

console.log(`Merged ${normalizedEdges.length} edges into ${mergedEdges.length} chains`);

const targetCount = 4000;
const sortedEdges = mergedEdges.sort((a, b) => {
  const lenA = distance(a[0], a[1]);
  const lenB = distance(b[0], b[1]);
  return lenB - lenA;
});

const finalEdges = sortedEdges.slice(0, targetCount);

const tsContent = `// Data Center Wireframe: Merged ${normalizedEdges.length} edges into ${finalEdges.length} parallel chains
export const DATA_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(finalEdges)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated ${outputPath}`);
console.log(`Final edges: ${finalEdges.length}`);
