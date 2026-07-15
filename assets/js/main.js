/* =========================================================================
 * Dino English · Landing Page PRD — Interactions & Rendering
 * ========================================================================= */
(function () {
  "use strict";
  const D = window.PRD;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ---------------------- Toast ---------------------- */
  let toastTimer;
  function toast(msg) {
    let t = $(".toast-pop");
    if (!t) { t = el("div", "toast-pop"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  /* ---------------------- Lightbox ---------------------- */
  const lb = $("#lightbox");
  const lbImg = $("#lightbox-img");
  function openLightbox(src) { lbImg.src = src; lb.classList.add("open"); }
  function closeLightbox() { lb.classList.remove("open"); }
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__close")) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  document.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-zoom]");
    if (img) openLightbox(img.src);
  });

  /* =====================================================================
   * HERO — countries + metrics
   * ===================================================================== */
  function renderHero() {
    const cc = $("#hero-countries");
    D.meta.countries.forEach((c) => {
      const card = el("div", "ccard");
      card.innerHTML = `
        <span class="ccard__code">${c.code}</span>
        <div class="ccard__flag">${c.flag}</div>
        <h4>${c.name}</h4>
        <small>${c.lang} · ${c.cur}</small>
        <div class="tagline">${c.note}</div>`;
      cc.appendChild(card);
    });

    const metrics = [
      { n: "4", l: "投放国家 / 独立站点" },
      { n: "28", l: "渠道码 (4×7)" },
      { n: "6", l: "核心流程页面" },
      { n: "GA4+AF", l: "双端归因埋点" }
    ];
    const m = $("#hero-metrics");
    metrics.forEach((x) => {
      m.appendChild(el("div", "metric", `<b>${x.n}</b><span>${x.l}</span>`));
    });
  }

  /* =====================================================================
   * OWNERSHIP
   * ===================================================================== */
  function renderOwners() {
    const g = $("#owner-grid");
    D.meta.roles.forEach((r) => {
      g.appendChild(el("div", "owner",
        `<div class="owner__k">${esc(r.role)}</div><div class="owner__v">${esc(r.owner)}</div>`));
    });
  }

  /* =====================================================================
   * PROTOTYPE WALKTHROUGH
   * ===================================================================== */
  let cur = 0;
  function renderStepbar() {
    const bar = $("#proto-stepbar");
    D.screens.forEach((s, i) => {
      const dot = el("button", "stepdot", `<b>${s.step}</b> ${s.name}`);
      dot.addEventListener("click", () => goto(i));
      bar.appendChild(dot);
    });
  }
  function goto(i) {
    cur = (i + D.screens.length) % D.screens.length;
    const s = D.screens[cur];
    // phone image
    const img = $("#phone-img");
    img.style.opacity = 0;
    setTimeout(() => { img.src = s.img; img.style.opacity = 1; }, 130);
    // title + caption
    $("#proto-title").innerHTML = `<h3>${esc(s.name)}</h3><span class="chip">${esc(s.tag)}</span>`;
    $("#proto-caption").textContent = s.caption;
    // points
    const ul = $("#proto-points"); ul.innerHTML = "";
    s.points.forEach((p) => ul.appendChild(el("li", null, p)));
    // states
    const st = $("#proto-states");
    if (s.states && s.states.length) {
      st.style.display = "";
      st.innerHTML = `<h5>异常 / 状态 & Toast 文案</h5>`;
      s.states.forEach((x) => {
        st.appendChild(el("div", "state-row",
          `<span class="lbl">${esc(x.label)}</span><span class="toast">${esc(x.toast)}</span>`));
      });
    } else { st.style.display = "none"; st.innerHTML = ""; }
    // stepbar active
    $$("#proto-stepbar .stepdot").forEach((d, di) => d.classList.toggle("active", di === cur));
    $("#proto-counter").textContent = `${cur + 1} / ${D.screens.length}`;
  }
  function renderProto() {
    renderStepbar();
    $("#proto-prev").addEventListener("click", () => goto(cur - 1));
    $("#proto-next").addEventListener("click", () => goto(cur + 1));
    goto(0);
  }

  /* =====================================================================
   * ANALYTICS FUNNEL
   * ===================================================================== */
  function renderFunnel() {
    $("#analytics-principle").innerHTML =
      `<div class="ic">🧭</div><p><b>核心原则：</b>${esc(D.analytics.principle)}</p>`;
    const f = $("#funnel");
    D.analytics.funnel.forEach((s, i) => {
      f.appendChild(el("div", "fstep",
        `<span class="n">${String(i + 1).padStart(2, "0")}</span>
         <div class="ic">${s.icon}</div><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p>`));
    });
  }

  /* =====================================================================
   * CHANNEL CODES — tabs + search + copy
   * ===================================================================== */
  let chFilter = "ALL", chQuery = "";
  function renderChannelTable() {
    const tb = $("#channel-body");
    tb.innerHTML = "";
    const q = chQuery.trim().toLowerCase();
    const rows = D.channels.filter((c) => {
      const okC = chFilter === "ALL" || c.country === chFilter;
      const okQ = !q || (c.ch + c.code + c.country).toLowerCase().includes(q);
      return okC && okQ;
    });
    if (!rows.length) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:26px;color:var(--txt-mute)">无匹配结果</td></tr>`;
      return;
    }
    rows.forEach((c) => {
      const tr = el("tr", c.isDefault ? "is-default" : "");
      tr.innerHTML = `
        <td style="white-space:nowrap">${c.flag} ${c.country}</td>
        <td>${esc(c.ch)}</td>
        <td><span class="code">${esc(c.code)}</span></td>
        <td class="url-cell"><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.url)}</a></td>
        <td><button class="copybtn" data-copy="${esc(c.url)}">复制链接</button></td>`;
      tb.appendChild(tr);
    });
  }
  function renderChannels() {
    const tabWrap = $("#channel-tabs");
    ["ALL", "SA", "KR", "ID", "MY"].forEach((code) => {
      const label = code === "ALL" ? "全部" : (D.meta.countries.find((c) => c.code === code)?.flag + " " + code);
      const b = el("button", "tab" + (code === "ALL" ? " active" : ""), label);
      b.addEventListener("click", () => {
        chFilter = code;
        $$("#channel-tabs .tab").forEach((t) => t.classList.remove("active"));
        b.classList.add("active");
        renderChannelTable();
      });
      tabWrap.appendChild(b);
    });
    $("#channel-search").addEventListener("input", (e) => { chQuery = e.target.value; renderChannelTable(); });
    $("#channel-rule").innerHTML = `<div class="ic">🔑</div><p><b>渠道码规则：</b>${esc(D.channelRule)}</p>`;
    renderChannelTable();
  }

  /* copy delegation */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copybtn");
    if (!btn) return;
    const txt = btn.dataset.copy;
    navigator.clipboard?.writeText(txt).then(() => {
      btn.classList.add("copied"); const o = btn.textContent; btn.textContent = "已复制 ✓";
      toast("已复制到剪贴板");
      setTimeout(() => { btn.classList.remove("copied"); btn.textContent = o; }, 1400);
    });
  });

  /* =====================================================================
   * PRICING + COUPON
   * ===================================================================== */
  let priceFilter = "ALL";
  function renderPricingTable() {
    const tb = $("#pricing-body");
    tb.innerHTML = "";
    D.pricing.filter((p) => priceFilter === "ALL" || p.country === priceFilter).forEach((p) => {
      const tr = el("tr");
      tr.innerHTML = `
        <td style="white-space:nowrap">${p.flag} ${p.country}</td>
        <td><b style="color:var(--txt)">${esc(p.plan)}</b></td>
        <td class="strike">${esc(p.origin)}</td>
        <td><span class="badge badge--off">-${esc(p.off)}</span></td>
        <td style="color:#fff;font-weight:700">${esc(p.final)}</td>
        <td>${p.best ? '<span class="badge badge--best">Best Value</span>' : "—"}</td>`;
      tb.appendChild(tr);
    });
  }
  function renderPricing() {
    const tabWrap = $("#pricing-tabs");
    ["ALL", "SA", "KR", "MY", "ID"].forEach((code) => {
      const label = code === "ALL" ? "全部" : (D.meta.countries.find((c) => c.code === code)?.flag + " " + code);
      const b = el("button", "tab" + (code === "ALL" ? " active" : ""), label);
      b.addEventListener("click", () => {
        priceFilter = code;
        $$("#pricing-tabs .tab").forEach((t) => t.classList.remove("active"));
        b.classList.add("active");
        renderPricingTable();
      });
      tabWrap.appendChild(b);
    });
    renderPricingTable();

    const cb = $("#coupon-body");
    D.coupons.forEach((c) => {
      cb.appendChild(el("tr", null,
        `<td><span class="code">${esc(c.code)}</span></td>
         <td>${esc(c.off)}</td>
         <td>${esc(c.exp)}</td>
         <td><button class="copybtn" data-copy="${esc(c.code)}">复制</button></td>`));
    });
  }

  /* =====================================================================
   * REFUND
   * ===================================================================== */
  function renderRefund() {
    const tb = $("#refund-rules-body");
    D.refund.rules.forEach((r) => {
      tb.appendChild(el("tr", null,
        `<td style="color:#fff;font-weight:600;white-space:nowrap">${esc(r.cond)}</td>
         <td>${esc(r.formula)}</td>
         <td style="color:var(--accent-2)">${esc(r.example)}</td>`));
    });
    const fl = $("#refund-flow");
    D.refund.flow.forEach((s, i) => {
      fl.appendChild(el("div", "rstep",
        `<span class="rn">${i + 1}</span><span class="who">${esc(s.who)}</span><span class="act">${esc(s.act)}</span>`));
    });
  }

  /* =====================================================================
   * NAV — scrollspy + mobile toggle
   * ===================================================================== */
  function initNav() {
    const links = $$(".nav__links a");
    const map = links.map((a) => ({ a, sec: $(a.getAttribute("href")) })).filter((x) => x.sec);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = "#" + en.target.id;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((x) => io.observe(x.sec));

    const toggle = $(".nav__toggle");
    toggle.addEventListener("click", () => $(".nav__links").classList.toggle("open"));
    links.forEach((a) => a.addEventListener("click", () => $(".nav__links").classList.remove("open")));
  }

  /* =====================================================================
   * REVEAL ON SCROLL
   * ===================================================================== */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    $$(".reveal").forEach((n) => io.observe(n));
  }

  /* ---------------------- boot ---------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHero();
    renderOwners();
    renderProto();
    renderFunnel();
    renderChannels();
    renderPricing();
    renderRefund();
    initNav();
    initReveal();
  });
})();
