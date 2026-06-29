/**
 * Adds notes-widget.css + notes-widget.js to all session index.html files (idempotent).
 */
const fs = require('fs');
const path = require('path');

const sessionsDir = path.join(__dirname, '..', 'docs', 'sessions');
const cssLine = '  <link rel="stylesheet" href="../../notes-widget.css" />';
const scriptLine = '<script src="../../notes-widget.js" defer></script>';

const dirs = fs.readdirSync(sessionsDir).filter((d) => /^session-\d{2}$/.test(d));

let updated = 0;
for (const dir of dirs) {
  const file = path.join(sessionsDir, dir, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('notes-widget.js')) continue;

  if (html.includes('../../styles.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="../../styles.css" />',
      '<link rel="stylesheet" href="../../styles.css" />\n' + cssLine
    );
  }

  html = html.replace('</body>', scriptLine + '\n\n</body>');
  fs.writeFileSync(file, html);
  updated++;
}

console.log('Injected notes widget into', updated, 'session files');
