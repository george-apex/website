const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../components/animations/dataWireframeData.ts');
const outputPath = inputPath;

console.log('Reading data...');
const content = fs.readFileSync(inputPath, 'utf-8');
const match = content.match(/export const DATA_WIREFRAME_DATA.*= (\[[\s\S]*\]);/);
const edges = JSON.parse(match[1]);
console.log(`Original edges: ${edges.length}`);

const pointKey = (p) => `${p[0].toFixed(6)},${p[1].toFixed(6)},${p[2].toFixed(6)}`;

const adjacency = new Map();
edges.forEach((edge, idx) => {
  const [p1, p2] = edge;
  const k1 = pointKey(p1);
  const k2 = pointKey(p2);
  if (!adjacency.has(k1)) adjacency.set(k1, []);
  if (!adjacency.has(k2)) adjacency.set(k2, []);
  adjacency.get(k1).push({ point: p2, edgeIdx: idx });
  adjacency.get(k2).push({ point: p1, edgeIdx: idx });
});

const used = new Set();
const chains = [];

for (const edge of edges) {
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
  while (true) {
    const neighbors = adjacency.get(currentKey) || [];
    let found = false;
    for (const n of neighbors) {
      const nk = pointKey(n.point);
      const fwdKey = `${currentKey}|${nk}`;
      const revKey = `${nk}|${currentKey}`;
      if (!used.has(fwdKey) && !used.has(revKey)) {
        chain.push(n.point);
        used.add(fwdKey);
        used.add(revKey);
        current = n.point;
        currentKey = nk;
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  
  current = p1;
  currentKey = k1;
  while (true) {
    const neighbors = adjacency.get(currentKey) || [];
    let found = false;
    for (const n of neighbors) {
      const nk = pointKey(n.point);
      const fwdKey = `${currentKey}|${nk}`;
      const revKey = `${nk}|${currentKey}`;
      if (!used.has(fwdKey) && !used.has(revKey)) {
        chain.unshift(n.point);
        used.add(fwdKey);
        used.add(revKey);
        current = n.point;
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

const targetCount = 4000;
const selectedChains = chains.slice(0, targetCount);

const newEdges = selectedChains.map(chain => {
  if (chain.length < 2) return [chain[0], chain[0]];
  return [chain[0], chain[chain.length - 1]];
});

const tsContent = `// Data Center Wireframe: Merged into ${newEdges.length} longer edges
export const DATA_WIREFRAME_DATA: [number, number, number][][] = ${JSON.stringify(newEdges)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated ${newEdges.length} merged edges`);
console.log(`Average chain length: ${(chains.reduce((a, c) => a + c.length, 0) / chains.length).toFixed(1)} points`);
