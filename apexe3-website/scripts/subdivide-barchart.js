const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../components/animations/barChartWireframeData.ts');
const outputPath = inputPath;

const content = fs.readFileSync(inputPath, 'utf-8');
const match = content.match(/export const BAR_CHART_WIREFRAME_DATA.*= (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not parse wireframe data');
  process.exit(1);
}

const edges = eval(match[1]);
console.log(`Original edges: ${edges.length}`);

const subdivisions = 8;
const newEdges = [];

for (const [v1, v2] of edges) {
  for (let i = 0; i < subdivisions; i++) {
    const t1 = i / subdivisions;
    const t2 = (i + 1) / subdivisions;
    const newV1 = [
      v1[0] + (v2[0] - v1[0]) * t1,
      v1[1] + (v2[1] - v1[1]) * t1,
      v1[2] + (v2[2] - v1[2]) * t1
    ];
    const newV2 = [
      v1[0] + (v2[0] - v1[0]) * t2,
      v1[1] + (v2[1] - v1[1]) * t2,
      v1[2] + (v2[2] - v1[2]) * t2
    ];
    newEdges.push([newV1, newV2]);
  }
}

console.log(`New edges: ${newEdges.length}`);

const tsContent = `// Bar Chart Wireframe: subdivided ${newEdges.length} edges (from ${edges.length} original)
export const BAR_CHART_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(newEdges, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Updated ${outputPath}`);
