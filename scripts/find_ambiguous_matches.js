const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.js');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract stockLoadouts object region
const stockStart = content.indexOf('SC_DATA.stockLoadouts');
if (stockStart === -1) {
  console.error('stockLoadouts not found in data.js');
  process.exit(1);
}
const stockSlice = content.slice(stockStart, stockStart + 200000); // assume keys are within first 200k chars
const keyRegex = /"([^"]+)"\s*:\s*\{/g;
let m;
const stockKeys = new Set();
while ((m = keyRegex.exec(stockSlice)) !== null) {
  stockKeys.add(m[1]);
}

// Extract ships array region
const shipsStart = content.indexOf('\n        ships: [');
if (shipsStart === -1) {
  console.error('ships array not found in data.js');
  process.exit(1);
}
const shipsSlice = content.slice(shipsStart, shipsStart + 400000);
const nameRegex = /name:\s*"([^"]+)"/g;
const ships = [];
while ((m = nameRegex.exec(shipsSlice)) !== null) {
  ships.push(m[1]);
}

// helpers
function normalize(s){ return (s||'').toString().toLowerCase().replace(/[^a-z0-9]+/g, ''); }
function levenshtein(a,b){ if(!a||!b) return (a||b)?Math.max((a||'').length,(b||'').length):0; const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>new Array(n+1)); for(let i=0;i<=m;i++)dp[i][0]=i; for(let j=0;j<=n;j++)dp[0][j]=j; for(let i=1;i<=m;i++){ for(let j=1;j<=n;j++){ const cost=a[i-1]===b[j-1]?0:1; dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost); } } return dp[m][n]; }
function similarity(a,b){ const maxLen=Math.max(a.length,b.length)||1; return 1-levenshtein(a,b)/maxLen; }

const stockArr = Array.from(stockKeys);
const results = [];
for(const shipName of ships){
  if (stockKeys.has(shipName)) continue; // exact match exists
  const t = normalize(shipName);
  let best = {key:null, score:-1};
  const scores = [];
  for(const key of stockArr){
    const s = similarity(t, normalize(key));
    scores.push({key, score:s});
    if (s>best.score){ best={key, score:s}; }
  }
  // find ties or close candidates
  const close = scores.filter(s=>s.score>=best.score-0.05).sort((a,b)=>b.score-a.score);
  if (best.score < 0.6 || close.length>1) {
    results.push({ ship: shipName, best: best, close: close.slice(0,5) });
  }
}

console.log(JSON.stringify(results, null, 2));
