const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../components/animations/erenWireframeData.ts');
const outputPath = path.join(__dirname, '../components/animations/erenWireframeData.ts');

console.log('Reading existing file...');
const content = fs.readFileSync(inputPath, 'utf-8');
const match = content.match(/export const EREN_WIREFRAME_DATA: \[number, number, number\]\[\]\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not parse data');
  process.exit(1);
}

console.log('Parsing JSON...');
const edges = JSON.parse(match[1]);
console.log(`Total edges: ${edges.length}`);

const targetEdges = 16000;
const step = Math.max(1, Math.floor(edges.length / targetEdges));
const sampledEdges = [];
for (let i = 0; i < edges.length && sampledEdges.length < targetEdges; i += step) {
  sampledEdges.push(edges[i]);
}

console.log(`Sampled edges: ${sampledEdges.length}`);

const tsContent = `// Eren Wireframe: Sampled ${sampledEdges.length} edges from ${edges.length}
export const EREN_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(sampledEdges)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log('Done');
