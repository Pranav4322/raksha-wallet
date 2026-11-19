// Backend wiring: the only file you need to edit to connect any backend (REST/JSON).
window.RAKSHA_CONFIG = {
  API_BASE: "",                       // e.g. "https://api.example.com"
  getAuthHeaders: () => ({}),         // e.g. () => ({Authorization: "Bearer " + token})
  // GET endpoint per page; response JSON fills [data-bind] and [data-list] elements by key.
  LOAD: {
    operations: "/api/operations", "case-overview": "/api/cases/current", trace: "/api/cases/current/trace",
    detection: "/api/cases/current/detection", "candidate-score": "/api/cases/current/candidate",
    "request-draft": "/api/cases/current/request", "review-approval": "/api/cases/current/review",
    responses: "/api/responses"
  },
  // POST/PUT endpoints for [data-form] and [data-action] elements.
  SUBMIT: {
    "case-intake": "/api/cases", "request-draft": "/api/requests", approve: "/api/reviews/approve",
    return: "/api/reviews/return", accept: "/api/candidates/accept", reject: "/api/candidates/reject",
    ingest: "/api/responses/ingest", hold: "/api/responses/hold", "run-detection": "/api/detection/run"
  }
};
