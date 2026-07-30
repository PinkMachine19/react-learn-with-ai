const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'docs', 'syllabus', 'index.html');
let html = fs.readFileSync(file, 'utf8');

for (let n = 11; n <= 40; n++) {
  const p = String(n).padStart(2, '0');
  const old = `<td>${n}</td>`;
  const neu = `<td><a href="../sessions/session-${p}/index.html">${p}</a></td>`;
  html = html.replace(old, neu);
}

fs.writeFileSync(file, html);
console.log('Syllabus links updated for sessions 11-40');
