/* =========================================================================
 * Dino AI · Landing Page 二期 PRD — Render
 * ========================================================================= */
(function () {
  "use strict";
  const D = window.PRD2;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* Hero countries */
  const hc = $("#hero-countries");
  if (hc) {
    D.meta.countries.forEach((c) => {
      hc.appendChild(el("div", "ccard",
        `<span class="ccard__code">${esc(c.code)}</span>
         <div class="ccard__flag">${c.flag}</div>
         <h4>${esc(c.name)}</h4>
         <small>${esc(c.cur)}</small>`));
    });
  }

  /* Hierarchy */
  const hier = $("#hierarchy");
  if (hier) {
    D.hierarchy.forEach((h, i) => {
      const card = el("div", "hier-card",
        `<span class="hier-lv" style="background:${h.color}">${h.level}</span>
         <h3>${esc(h.name)}</h3><p>${esc(h.desc)}</p>`);
      hier.appendChild(card);
      if (i < D.hierarchy.length - 1) {
        hier.appendChild(el("div", "hier-arrow", "→"));
      }
    });
  }

  /* VS table */
  const vsBody = $("#vs-body");
  if (vsBody) {
    D.vsPhase1.forEach((r) => {
      vsBody.appendChild(el("tr", null,
        `<td>${esc(r.dim)}</td><td>${esc(r.p1)}</td><td><b>${esc(r.p2)}</b></td>`));
    });
  }

  /* Rules */
  const rules = $("#rules");
  if (rules) {
    D.rules.forEach((r) => {
      rules.appendChild(el("div", "rule-card",
        `<span class="pill">${esc(r.id)}</span><h4>${esc(r.title)}</h4><p>${esc(r.text)}</p>`));
    });
  }

  /* Scenarios */
  const sc = $("#scenarios");
  if (sc) {
    D.scenarios.forEach((s) => {
      sc.appendChild(el("div", "scenario-card",
        `<div class="scenario-id">${esc(s.id)}</div>
         <h3>${esc(s.title)}</h3>
         <p class="ex">${esc(s.example)}</p>
         <p class="why">${esc(s.why)}</p>`));
    });
  }

  /* SKU explorer */
  let skuCountry = "SA";
  const skuTabs = $("#sku-tabs");
  const skuList = $("#sku-list");

  function renderSkus() {
    if (!skuList) return;
    skuList.innerHTML = "";
    D.skus.filter((s) => s.country === skuCountry).forEach((s) => {
      const coupons = s.coupons.map((c) =>
        `<li><code>${esc(c.id)}</code> ${esc(c.name)}
         <span class="tag tag--${c.type}">${esc(c.type === "percent" ? "折扣" : "立减")} ${esc(c.value)}</span>
         <span class="mute">→ 可生成多个 DINO****</span></li>`
      ).join("");
      skuList.appendChild(el("div", "sku-card" + (s.best ? " sku-card--best" : ""),
        `<div class="sku-head">
           <div><b>SKU ${esc(s.id)}</b> · ${esc(s.name)}${s.best ? ' <span class="best">Best Value</span>' : ""}</div>
           <div class="price">${esc(s.price)}</div>
         </div>
         <ul class="coupon-list">${coupons}</ul>`));
    });
  }

  if (skuTabs) {
    D.meta.countries.forEach((c) => {
      const btn = el("button", "tab" + (c.code === skuCountry ? " active" : ""), `${c.flag} ${c.name}`);
      btn.addEventListener("click", () => {
        skuCountry = c.code;
        skuTabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        renderSkus();
        renderBindings();
      });
      skuTabs.appendChild(btn);
    });
  }
  renderSkus();

  /* Bindings */
  const bindTable = $("#bind-body");
  function renderBindings() {
    if (!bindTable) return;
    bindTable.innerHTML = "";
    D.bindings.filter((b) => b.country === skuCountry).forEach((b) => {
      bindTable.appendChild(el("tr", null,
        `<td>${esc(b.channel)}</td>
         <td><code class="copy" data-copy="${esc(b.code)}">${esc(b.code)}</code></td>
         <td>${b.skus.map((id) => `<code>${esc(id)}</code>`).join(" ")}</td>
         <td>${esc(b.note)}</td>`));
    });
  }
  renderBindings();

  /* Features */
  const cms = $("#cms-features");
  if (cms) {
    D.features.cms.forEach((f) => {
      cms.appendChild(el("div", "feat-card",
        `<span class="pill">${esc(f.id)}</span><h3>${esc(f.title)}</h3>
         <ul>${f.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`));
    });
  }
  const cend = $("#cend-features");
  if (cend) {
    D.features.cend.forEach((f) => {
      cend.appendChild(el("div", "cend-row",
        `<b>${esc(f.step)}</b><span>${esc(f.change)}</span>`));
    });
  }

  /* Acceptance */
  const acc = $("#acceptance");
  if (acc) {
    D.acceptance.forEach((a) => {
      acc.appendChild(el("li", null, esc(a)));
    });
  }

  /* Opens */
  const opens = $("#opens");
  if (opens) {
    D.opens.forEach((o) => {
      opens.appendChild(el("div", "open-card",
        `<h4>${esc(o.q)}</h4><p>${esc(o.a)}</p>`));
    });
  }

  /* Copy */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-copy]");
    if (!t) return;
    navigator.clipboard.writeText(t.dataset.copy).then(() => {
      const old = t.textContent;
      t.textContent = "已复制";
      setTimeout(() => (t.textContent = old), 900);
    });
  });

  /* Nav active */
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = "#" + en.target.id;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));

  const toggle = $(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", () => $(".nav__links").classList.toggle("open"));
  }
})();
