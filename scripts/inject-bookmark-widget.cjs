/**
 * Adds bookmark-widget.css + bookmark-widget.js to all session index.html files (idempotent).
 */
const fs = require('fs');
const path = require('path');

const sessionsDir = path.join(__dirname, '..', 'docs', 'sessions');
const cssLine = '  <link rel="stylesheet" href="../../bookmark-widget.css" />';
const scriptLine = '<script src="../../bookmark-widget.js" defer></script>';

const dirs = fs.readdirSync(sessionsDir).filter((d) => /^session-\d{2}$/.test(d));

let updated = 0;
for (const dir of dirs) {
  const file = path.join(sessionsDir, dir, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('bookmark-widget.js')) continue;

  if (html.includes('notes-widget.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="../../notes-widget.css" />',
      '<link rel="stylesheet" href="../../notes-widget.css" />\n' + cssLine
    );
  } else if (html.includes('../../styles.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="../../styles.css" />',
      '<link rel="stylesheet" href="../../styles.css" />\n' + cssLine
    );
  }

  if (html.includes('notes-widget.js')) {
    html = html.replace(
      '<script src="../../notes-widget.js" defer></script>',
      '<script src="../../notes-widget.js" defer></script>\n' + scriptLine
    );
  } else {
    html = html.replace('</body>', scriptLine + '\n\n</body>');
  }

  fs.writeFileSync(file, html);
  updated++;
}

console.log('Injected bookmark widget into', updated, 'session files');
