/**
 * Replace inline setupQuiz scripts with shared quiz.js + data-pass-post attrs.
 */
const fs = require('fs');
const path = require('path');

const sessionsDir = path.join(__dirname, '..', 'docs', 'sessions');
const cssLine = '  <link rel="stylesheet" href="../../quiz-explain-modal.css" />';

const postPassMessages = {
  'session-07': 'Layer 1 complete. Take the Layer 1 Gate Quiz to unlock Layer 2.',
  'session-08': 'Session 08 complete. Proceed to Session 09 — JSX Deep Dive.',
  'session-10': 'Proceed to Session 11 after committing.',
};

const replacement =
  '<script src="../../quiz.js" defer></script>\n' +
  '<script>\n' +
  '  document.addEventListener(\'DOMContentLoaded\', function () {\n' +
  '    setupQuiz(\'pre\');\n' +
  '    setupQuiz(\'post\');\n' +
  '  });\n' +
  '</script>';

const inlineQuizRe = /<script>\s*\n\s*function setupQuiz\(prefix\)[\s\S]*?setupQuiz\('post'\);\s*\n<\/script>/;

const dirs = fs.readdirSync(sessionsDir).filter((d) => /^session-\d{2}$/.test(d));
let updated = 0;

for (const dir of dirs) {
  const file = path.join(sessionsDir, dir, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (!inlineQuizRe.test(html)) {
    if (html.includes('quiz.js')) console.log('skip (already migrated):', dir);
    continue;
  }

  if (!html.includes('quiz-explain-modal.css')) {
    if (html.includes('../../notes-widget.css')) {
      html = html.replace(
        '<link rel="stylesheet" href="../../notes-widget.css" />',
        '<link rel="stylesheet" href="../../notes-widget.css" />\n' + cssLine
      );
    } else {
      html = html.replace(
        '<link rel="stylesheet" href="../../styles.css" />',
        '<link rel="stylesheet" href="../../styles.css" />\n' + cssLine
      );
    }
  }

  const passPost = postPassMessages[dir];
  if (passPost && html.includes('id="post-quiz"') && !html.includes('data-pass-post')) {
    html = html.replace(
      '<div id="post-quiz">',
      '<div id="post-quiz" data-pass-post="' + passPost.replace(/"/g, '&quot;') + '">'
    );
  }

  html = html.replace(inlineQuizRe, replacement);
  fs.writeFileSync(file, html);
  updated++;
}

console.log('Migrated quiz to shared quiz.js in', updated, 'session files');
