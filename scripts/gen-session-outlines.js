const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'docs', 'sessions');

const sessions = [
  { n: 11, layer: 'Layer 2', layerName: 'React Fundamentals', title: 'Props — Passing Data Down', concept: 'Props are function arguments; they are read-only', milestone: 'Pass country name and region as props to CountryCard' },
  { n: 12, layer: 'Layer 2', layerName: 'React Fundamentals', title: 'Component Composition', concept: 'Building UIs from nested components', milestone: 'Build CountryList that contains multiple CountryCard' },
  { n: 13, layer: 'Layer 2', layerName: 'React Fundamentals', title: 'Conditional Rendering', concept: 'Ternary, && short-circuit, early return patterns', milestone: 'Show a "No countries found" message conditionally' },
  { n: 14, layer: 'Layer 2', layerName: 'React Fundamentals', title: 'Rendering Lists with map()', concept: 'Using .map() inside JSX to render arrays', milestone: 'Render all mock countries from an array' },
  { n: 15, layer: 'Layer 2', layerName: 'React Fundamentals', title: 'Keys — Why React Needs Them', concept: 'Reconciliation, diffing algorithm, key as identity', milestone: 'Add keys to all list items; see what breaks without them', gate: true },
  { n: 16, layer: 'Layer 3', layerName: 'State', title: 'What Is State?', concept: 'State vs props, why state triggers re-render, mental model', milestone: 'Concept only — no code written yet' },
  { n: 17, layer: 'Layer 3', layerName: 'State', title: 'useState Hook', concept: 'Hook syntax, initial value, setter function, closure capture', milestone: 'Add a click counter to CountryCard' },
  { n: 18, layer: 'Layer 3', layerName: 'State', title: 'Event Handlers', concept: 'Synthetic events, onClick, onChange, the event object', milestone: 'Handle a button click on a country card' },
  { n: 19, layer: 'Layer 3', layerName: 'State', title: 'Re-rendering Deep Dive', concept: "What causes a re-render, what doesn't, React batching", milestone: 'Prove re-renders with console.log; add render counter' },
  { n: 20, layer: 'Layer 3', layerName: 'State', title: 'Controlled Inputs', concept: 'Input value tied to state, onChange handler pattern', milestone: 'Add a search input that controls its own value' },
  { n: 21, layer: 'Layer 3', layerName: 'State', title: 'Lifting State Up', concept: 'When state needs to be shared, moving state to parent', milestone: 'Move search state from input to App; pass filtered list down' },
  { n: 22, layer: 'Layer 3', layerName: 'State', title: 'Derived State', concept: 'Computing values from existing state; avoiding redundant state', milestone: 'Derive filtered countries from search term without extra useState', gate: true },
  { n: 23, layer: 'Layer 4', layerName: 'Mock Data', title: 'Why Mock Data Matters', concept: 'Frontend independence, contract-first design, iteration speed', milestone: 'Add /mock/countries.json with 10 countries' },
  { n: 24, layer: 'Layer 4', layerName: 'Mock Data', title: 'Building a Service Layer', concept: 'Separation of concerns, encapsulating data access', milestone: 'Build countryService.js with functions returning fake data' },
  { n: 25, layer: 'Layer 4', layerName: 'Mock Data', title: 'Fake Async Responses', concept: 'Wrapping data in Promises to simulate real API timing', milestone: 'Make countryService.js return Promise.resolve(data) with delay' },
  { n: 26, layer: 'Layer 4', layerName: 'Mock Data', title: 'Designing Against a Contract', concept: 'What an API contract is, defining fake data shapes', milestone: 'Define JSDoc comment contracts for the country data shape', gate: true },
  { n: 27, layer: 'Layer 5', layerName: 'Testing', title: 'Why We Test and What to Test', concept: 'Test types, behavior-driven testing, what NOT to test', milestone: 'Concept only — no code' },
  { n: 28, layer: 'Layer 5', layerName: 'Testing', title: 'Setting Up Vitest + RTL', concept: 'Install, configure, write first smoke test', milestone: 'Test that CountryCard renders without crashing' },
  { n: 29, layer: 'Layer 5', layerName: 'Testing', title: 'Testing Props and Output', concept: 'getByRole, getByText, asserting rendered content', milestone: 'Test that country name appears in CountryCard output' },
  { n: 30, layer: 'Layer 5', layerName: 'Testing', title: 'Testing Events and State', concept: 'fireEvent, userEvent, asserting state changes via DOM', milestone: 'Test that clicking a button updates displayed count' },
  { n: 31, layer: 'Layer 5', layerName: 'Testing', title: 'Testing the Service Layer', concept: 'vi.mock, testing async functions, asserting resolved shape', milestone: 'Test that countryService.getAll() resolves with correct shape', gate: true },
  { n: 32, layer: 'Layer 6', layerName: 'Architecture', title: 'Folder Organization', concept: 'Why structure matters, feature vs type grouping', milestone: 'Reorganize /src; move all files to correct places' },
  { n: 33, layer: 'Layer 6', layerName: 'Architecture', title: 'Reusable Components', concept: 'What makes a component reusable, props as API surface', milestone: 'Extract Badge, Card, Button as generic components' },
  { n: 34, layer: 'Layer 6', layerName: 'Architecture', title: 'Custom Hooks', concept: 'When to extract logic into a hook, rules of hooks', milestone: 'Extract useCountrySearch hook from App' },
  { n: 35, layer: 'Layer 6', layerName: 'Architecture', title: 'The Prop Drilling Problem', concept: 'Recognizing the pain, when it matters, what comes next', milestone: 'Deliberately hit prop drilling pain with favorites feature' },
  { n: 36, layer: 'Layer 6', layerName: 'Architecture', title: 'Architecture Review', concept: 'Full codebase audit, refactor planning', milestone: 'Document all architecture decisions in /docs/architecture', gate: true },
  { n: 37, layer: 'Layer 7', layerName: 'Real World', title: 'useEffect', concept: 'What a side effect is, effect lifecycle, cleanup', milestone: 'Replace fake service with useEffect calling fake Promise' },
  { n: 38, layer: 'Layer 7', layerName: 'Real World', title: 'Fetch and Real APIs', concept: 'HTTP, fetch(), reading API docs, response shapes', milestone: 'Replace fake Promise with real REST Countries API call' },
  { n: 39, layer: 'Layer 7', layerName: 'Real World', title: 'Loading and Error States', concept: 'UX for async operations, loading spinner, error message', milestone: 'Add loading and error UI to country list' },
  { n: 40, layer: 'Layer 7', layerName: 'Real World', title: 'Capstone Review', concept: 'End-to-end walkthrough of everything built', milestone: 'Document every architectural decision; full quiz across all layers', capstone: true },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const s of sessions) {
  const nn = pad(s.n);
  const prev = s.n > 1 ? pad(s.n - 1) : null;
  const next = s.n < 40 ? pad(s.n + 1) : null;
  const badge = s.capstone || s.gate ? 'badge-gate' : 'badge-current';
  const badgeLabel = s.capstone ? 'Capstone' : s.gate ? 'Layer gate' : 'Available';

  const navLinks = [
    prev ? `<a href="../session-${prev}/index.html">← Session ${prev}</a>` : '',
    '<a href="../../syllabus/index.html">Syllabus</a>',
    next ? `<a href="../session-${next}/index.html">Session ${next} →</a>` : '',
  ].filter(Boolean).join(' · ');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Session ${nn} — ${esc(s.title)}</title>
  <link rel="stylesheet" href="../../styles.css" />
</head>
<body>
<nav>
  <div class="container">
    <a href="../../index.html" class="brand">⚛ React Learning</a>
    <a href="../../syllabus/index.html">Syllabus</a>
    <a href="../../sessions/index.html" class="active">Sessions</a>
    <a href="../../quizzes/index.html">Quizzes</a>
    <a href="../../labs/index.html">Labs</a>
    <a href="../../architecture/index.html">Architecture</a>
    <a href="../../session-notes/index.html">Notes</a>
    <a href="../../commit-reviews/index.html">Commits</a>
    <a href="../../prompts/index.html">Prompts</a>
  </div>
</nav>
<main>
  <div class="container">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
      <span class="badge badge-layer">${esc(s.layer)}</span>
      <span class="badge ${badge}">Session ${nn}</span>
      <span style="color:var(--text-muted);font-size:13px;">${esc(s.layerName)}</span>
    </div>
    <h1>${esc(s.title)}</h1>
    <div class="alert alert-warning">
      <strong>Outline page.</strong> The full lesson doc (quizzes, SVGs, lab, commit checkpoint) is not written yet.
      Use the syllabus outline below until this session is hydrated.
    </div>
    <div class="card">
      <h2>From the syllabus</h2>
      <p><strong>Core concept:</strong> ${esc(s.concept)}</p>
      <p><strong>Project milestone:</strong> ${esc(s.milestone)}</p>
      <p><strong>Status:</strong> <span class="badge ${badge}">${badgeLabel}</span> — session page is open; complete prior sessions in order when doing the lab track.</p>
    </div>
    <p style="margin-top:24px;">${navLinks}</p>
  </div>
</main>
</body>
</html>`;

  const dir = path.join(base, `session-${nn}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log('Created', sessions.length, 'outline pages');
