# Raksha-Wallet frontend (static, backend-agnostic)
Pure HTML/CSS/JS, no build step, no demo data. Open index.html or serve the folder with any web server.

## Connect a backend
Edit assets/config.js: set API_BASE, auth headers, and endpoints.
- GET (config.LOAD[page]) returns JSON: keys fill [data-bind="key"] (text) and [data-list="key"] (arrays).
  Table rows: array of objects keyed by the th data-k attributes. Other lists: array of strings or {text}.
- Forms [data-form] and buttons [data-action] POST JSON to config.SUBMIT[name]; a JSON reply is rendered the same way.
- Until a backend responds, every panel shows an empty state.

## Pages
operations, case-intake, case-overview, trace, detection, candidate-score, request-draft, review-approval, responses
