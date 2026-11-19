(() => {
  const C = window.RAKSHA_CONFIG, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const NAV = [["operations","Operations"],["case-intake","Case intake"],["case-overview","Cases"],["trace","Trace"],["request-draft","Requests"],["responses","Responses"],["detection","Intelligence"]];
  const page = document.body.dataset.page, group = document.body.dataset.nav || page;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  async function api(path, opts = {}) {
    const r = await fetch(C.API_BASE + path, { headers: { "Content-Type": "application/json", ...C.getAuthHeaders() }, ...opts });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.status === 204 ? null : r.json();
  }
  function render(d) {
    $$("[data-bind]").forEach(e => { const v = d[e.dataset.bind]; if (v != null) e.textContent = v; });
    $$("[data-list]").forEach(e => {
      const rows = d[e.dataset.list]; if (!Array.isArray(rows)) return;
      const empty = $(".empty-row", e); if (empty) empty.hidden = rows.length > 0;
      $$(".row", e).forEach(n => n.remove());
      const ks = e.tagName === "TBODY" ? $$("th", e.closest("table")).map(t => t.dataset.k) : null;
      rows.forEach(r => {
        const n = document.createElement(ks ? "tr" : "li"); n.className = "row";
        n.innerHTML = ks ? ks.map(k => `<td>${esc(r[k])}</td>`).join("") : esc(typeof r === "string" ? r : r.text);
        e.appendChild(n);
      });
    });
  }
  function toast(m, bad) { const t = document.createElement("div"); t.className = "toast" + (bad ? " bad" : ""); t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 3500); }
  async function submit(key, body) { try { const r = await api(C.SUBMIT[key], { method: "POST", body: JSON.stringify(body || {}) }); toast("Saved"); if (r) render(r); } catch (e) { toast("Request failed: " + e.message, true); } }
  function shell() {
    const nav = NAV.map(([h, l]) => `<a href="${h}.html" class="${h === group ? "on" : ""}">${l}</a>`).join("");
    document.body.insertAdjacentHTML("afterbegin", `<aside class="side"><div class="brand"><b>Raksha-Wallet</b><small>SAHYOG INTEGRATED</small></div><nav>${nav}</nav><div class="sess">Secure session · <span data-bind="session">LIVE</span><br><small>RESTRICTED · OFFICIAL USE</small></div></aside>
    <header class="top"><button class="menu" aria-label="Menu">☰</button><input type="search" placeholder="Search case ID, wallet or transaction hash" aria-label="Search"><span class="pill ok" data-bind="link">SAHYOG CONNECTED</span><span class="user"><i data-bind="initials">--</i><span><b data-bind="officer">—</b><small data-bind="role">Investigating Officer</small></span></span></header>`);
    $(".menu").onclick = () => document.body.classList.toggle("nav-open");
  }
  document.addEventListener("DOMContentLoaded", async () => {
    shell();
    $$("[data-form]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); if (f.checkValidity()) submit(f.dataset.form, Object.fromEntries(new FormData(f))); else f.reportValidity(); }));
    $$("[data-action]").forEach(b => b.addEventListener("click", () => submit(b.dataset.action, { page })));
    $$(".chips").forEach(g => g.addEventListener("click", e => { const c = e.target.closest("button"); if (!c) return; $$("button", g).forEach(x => x.classList.remove("on")); c.classList.add("on"); const h = $("input[type=hidden]", g); if (h) h.value = c.dataset.v; }));
    if (C.LOAD[page]) try { render(await api(C.LOAD[page])); } catch (e) { /* no backend yet: empty states stay visible */ }
  });
  window.Raksha = { api, render, toast };
})();
