/* =========================================================================
 * Dino English · Landing Page — Interactive Clickable Prototype
 * 点击屏幕内热区在页面之间跳转，模拟真实交互流程。
 * hotspot 坐标均为该屏图片的百分比 (x,y,w,h)。
 * ========================================================================= */
(function () {
  "use strict";

  /* ------- 屏幕定义 + 热区（点击跳转） ------- */
  const SCREENS = {
    login: {
      title: "注册 / 登录",
      group: "登录",
      img: "assets/ui/login.png",
      note: "输入手机号后点「Get code」获取验证码；点「Log in」登录。",
      hotspots: [
        { x: 63, y: 67, w: 29, h: 6, to: "login_code", label: "Get code" },
        { x: 8, y: 75.5, w: 84, h: 6.5, to: "login_code", label: "Log in" }
      ]
    },
    login_code: {
      title: "验证码已发送",
      group: "登录",
      img: "assets/ui/login-code.png",
      note: "验证码已发送。点「Log in」登录成功进入套餐页；也可查看输入错误的状态。",
      hotspots: [
        { x: 8, y: 75.5, w: 84, h: 6.5, to: "plans", label: "Log in → 套餐" },
        { x: 63, y: 67, w: 29, h: 6, to: "login_error", label: "模拟验证码错误" }
      ]
    },
    login_error: {
      title: "验证码错误",
      group: "登录",
      img: "assets/ui/login-error.png",
      note: "验证码错误状态（红框 + Incorrect Code）。重新输入后点「Log in」。",
      hotspots: [
        { x: 8, y: 75.5, w: 84, h: 6.5, to: "plans", label: "Log in → 套餐" },
        { x: 63, y: 67, w: 29, h: 6, to: "login_code", label: "重新获取验证码" }
      ]
    },
    login_alt: {
      title: "登录（备选主视觉）",
      group: "登录",
      img: "assets/ui/login-alt.png",
      note: "备选 Hero（小恐龙驾驶飞机）。点「Log in」进入套餐页。",
      hotspots: [
        { x: 8, y: 75.5, w: 84, h: 6.5, to: "plans", label: "Log in → 套餐" }
      ]
    },
    plans: {
      title: "权益与套餐",
      group: "套餐",
      img: "assets/ui/plans.png",
      note: "默认高亮 Best Value（1 Year）。点「Continue」进入优惠码页。",
      hotspots: [
        { x: 2, y: 4, w: 14, h: 3.5, to: "login_code", label: "返回" },
        { x: 10, y: 89.5, w: 80, h: 6, to: "coupon", label: "Continue → 优惠码" }
      ]
    },
    coupon: {
      title: "优惠码（未输入）",
      group: "优惠码",
      img: "assets/ui/coupon.png",
      note: "点输入框或「Apply」输入优惠码；或直接点「Continue」。",
      hotspots: [
        { x: 2, y: 3.5, w: 14, h: 4, to: "plans", label: "返回" },
        { x: 8, y: 31, w: 55, h: 6, to: "coupon_typed", label: "输入优惠码" },
        { x: 62, y: 31, w: 29, h: 6, to: "coupon_typed", label: "Apply" },
        { x: 8, y: 89, w: 84, h: 6, to: "pay", label: "Continue → 支付" }
      ]
    },
    coupon_typed: {
      title: "优惠码（已输入）",
      group: "优惠码",
      img: "assets/ui/coupon-typed.png",
      note: "已输入 D668INO。点「Apply」验证 → 成功，或查看错误提示。",
      hotspots: [
        { x: 2, y: 3.5, w: 14, h: 4, to: "plans", label: "返回" },
        { x: 62, y: 31, w: 29, h: 6, to: "coupon_ok", label: "Apply → 验证成功" },
        { x: 8, y: 31, w: 52, h: 6, to: "coupon_error", label: "模拟验证失败" },
        { x: 8, y: 89, w: 84, h: 6, to: "pay", label: "Continue → 支付" }
      ]
    },
    coupon_ok: {
      title: "优惠码（兑换成功）",
      group: "优惠码",
      img: "assets/ui/coupon-ok.png",
      note: "验证成功，You saved $40.00。点「Continue」进入支付。",
      hotspots: [
        { x: 2, y: 3.5, w: 14, h: 4, to: "plans", label: "返回" },
        { x: 8, y: 89, w: 84, h: 6, to: "pay", label: "Continue → 支付" }
      ]
    },
    coupon_error: {
      title: "优惠码（错误提示）",
      group: "优惠码",
      img: "assets/ui/coupon-error.png",
      note: "Wrong coupon code, retry.（红框）。重新输入后点 Apply。",
      hotspots: [
        { x: 2, y: 3.5, w: 14, h: 4, to: "plans", label: "返回" },
        { x: 62, y: 31, w: 29, h: 6, to: "coupon_ok", label: "重试 → 成功" },
        { x: 8, y: 89, w: 84, h: 6, to: "pay", label: "Continue → 支付" }
      ]
    },
    pay: {
      title: "选择支付方式（韩国）",
      group: "支付",
      img: "assets/ui/pay.png",
      note: "韩国本地支付：NaverPay / TossPay / SamsungPay / PayCo / Kakaopay。点「Pay now」。",
      hotspots: [
        { x: 2, y: 5, w: 14, h: 3.5, to: "coupon_ok", label: "返回" },
        { x: 60, y: 51, w: 34, h: 5, to: "pay_card", label: "切换银行卡视图" },
        { x: 8, y: 88.5, w: 84, h: 6, to: "success", label: "Pay now → 成功" }
      ]
    },
    pay_card: {
      title: "选择支付方式（银行卡）",
      group: "支付",
      img: "assets/ui/pay-card.png",
      note: "印尼 / 马来 / 沙特：银行卡支付。点「Pay now」完成支付。",
      hotspots: [
        { x: 2, y: 5, w: 14, h: 3.5, to: "coupon_ok", label: "返回" },
        { x: 8, y: 88.5, w: 84, h: 6, to: "success", label: "Pay now → 成功" }
      ]
    },
    success: {
      title: "支付成功",
      group: "完成",
      img: "assets/ui/success.png",
      note: "支付成功，VIP 立即生效。点「Start learning」跳转 App / 商店。",
      hotspots: [
        { x: 8, y: 92, w: 84, h: 5, to: "login", label: "Start learning（重新体验）" }
      ]
    }
  };

  /* 主流程顺序（用于进度条 & 上一步/下一步） */
  const FLOW = ["login", "login_code", "plans", "coupon", "coupon_typed", "coupon_ok", "pay", "success"];

  /* 侧边分组顺序 */
  const GROUPS = [
    { name: "登录", ids: ["login", "login_code", "login_error", "login_alt"] },
    { name: "套餐", ids: ["plans"] },
    { name: "优惠码", ids: ["coupon", "coupon_typed", "coupon_ok", "coupon_error"] },
    { name: "支付", ids: ["pay", "pay_card"] },
    { name: "完成", ids: ["success"] }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };

  let current = "login";
  let showHot = false;
  const history = [];

  const stage = $("#screen-img");
  const hotLayer = $("#hotspots");

  function render(id, opts = {}) {
    const s = SCREENS[id];
    if (!s) return;
    if (!opts.noHistory && current !== id) history.push(current);
    current = id;

    // image swap with fade
    stage.style.opacity = 0;
    const pre = new Image();
    pre.onload = () => { stage.src = s.img; stage.style.opacity = 1; $("#viewport").scrollTop = 0; };
    pre.src = s.img;

    // hotspots
    hotLayer.innerHTML = "";
    s.hotspots.forEach((h) => {
      const b = el("button", "hotspot" + (showHot ? " show" : ""));
      b.style.left = h.x + "%"; b.style.top = h.y + "%";
      b.style.width = h.w + "%"; b.style.height = h.h + "%";
      b.title = h.label || "";
      b.setAttribute("aria-label", h.label || "hotspot");
      b.innerHTML = `<span class="hotspot__tip">${h.label || ""}</span>`;
      b.addEventListener("click", (e) => { e.stopPropagation(); ripple(b); render(h.to); });
      hotLayer.appendChild(b);
    });

    // meta
    $("#scr-title").textContent = s.title;
    $("#scr-note").textContent = s.note;
    $("#scr-group").textContent = s.group;

    // active in sidebar
    $$("#screen-list .scr-item").forEach((n) => n.classList.toggle("active", n.dataset.id === id));

    // progress
    const fi = FLOW.indexOf(id);
    $("#progress-bar").style.width = fi >= 0 ? ((fi + 1) / FLOW.length * 100) + "%" : $("#progress-bar").style.width;
    $("#step-count").textContent = fi >= 0 ? `步骤 ${fi + 1} / ${FLOW.length}` : "分支状态";

    // prev/next based on FLOW
    $("#btn-next").disabled = fi < 0 || fi >= FLOW.length - 1;
  }

  function ripple(target) {
    const r = el("span", "ripple");
    target.appendChild(r);
    setTimeout(() => r.remove(), 500);
  }

  /* ------- sidebar list ------- */
  function buildList() {
    const list = $("#screen-list");
    GROUPS.forEach((g) => {
      list.appendChild(el("div", "scr-group", g.name));
      g.ids.forEach((id) => {
        const s = SCREENS[id];
        const item = el("button", "scr-item");
        item.dataset.id = id;
        item.innerHTML = `<img src="${s.img}" alt="" loading="lazy"><span>${s.title}</span>`;
        item.addEventListener("click", () => render(id));
        list.appendChild(item);
      });
    });
  }

  /* ------- controls ------- */
  function bind() {
    $("#btn-back").addEventListener("click", () => {
      if (history.length) render(history.pop(), { noHistory: true });
    });
    $("#btn-next").addEventListener("click", () => {
      const fi = FLOW.indexOf(current);
      if (fi >= 0 && fi < FLOW.length - 1) render(FLOW[fi + 1]);
    });
    $("#btn-restart").addEventListener("click", () => { history.length = 0; render("login", { noHistory: true }); });
    const toggle = $("#btn-hotspots");
    toggle.addEventListener("click", () => {
      showHot = !showHot;
      toggle.classList.toggle("on", showHot);
      toggle.textContent = showHot ? "🟡 热区：显示中" : "○ 显示热区";
      $$("#hotspots .hotspot").forEach((h) => h.classList.toggle("show", showHot));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") $("#btn-next").click();
      if (e.key === "ArrowLeft") $("#btn-back").click();
    });

    // sidebar toggle (mobile)
    $("#side-toggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildList();
    bind();
    render("login", { noHistory: true });
  });
})();
