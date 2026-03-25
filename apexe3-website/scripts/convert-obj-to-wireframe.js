const fs = require('fs');
const path = require('path');

const objPath = path.join(__dirname, '../bar_chart_only.obj');
const outputPath = path.join(__dirname, '../components/animations/barChartWireframeData.ts');

const objContent = fs.readFileSync(objPath, 'utf-8');
const lines = objContent.split('\n');

const vertices = [];
const edges = new Set();

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('v ')) {
    const parts = trimmed.split(/\s+/);
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    vertices.push([x, y, z]);
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

const tsContent = `// Bar Chart Wireframe: ${vertices.length} vertices, ${normalizedEdges.length} edges
export const BAR_CHART_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(normalizedEdges, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated ${outputPath}`);
console.log(`Vertices: ${vertices.length}, Edges: ${normalizedEdges.length}`);
