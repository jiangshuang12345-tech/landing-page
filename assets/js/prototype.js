/* =========================================================================
 * Dino English · Landing Page — Functional Interactive Prototype (一期)
 * 支持：手机号+验证码(任意4位通过) / 切换套餐 / 输入优惠码 / 切换支付方式
 * 逻辑参考 kr.dinoenglish.ai 一期落地页（一期真实站点不支持优惠码，此原型为演示保留）
 * ========================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ------------------------- 数据 ------------------------- */
  const COUNTRIES = [
    { flag: "🇸🇦", code: "+966", name: "沙特" },
    { flag: "🇰🇷", code: "+82", name: "韩国" },
    { flag: "🇮🇩", code: "+62", name: "印尼" },
    { flag: "🇲🇾", code: "+60", name: "马来" }
  ];

  const PLANS = {
    "1y": { key: "1y", name: "1 Year", label: "1 year plan", price: 229.99, per: "≈$0.63/Day", was: "$430.00", best: true, tag: "Best Value · 45% Off" },
    "1m": { key: "1m", name: "1 Month", label: "1 month plan", price: 62.10, per: "≈$1.27/Day", was: "$69.00", best: false },
    "1w": { key: "1w", name: "1 Week", label: "1 week plan", price: 18.00, per: "≈$1.57/Day", was: "$20.00", best: false }
  };
  const PLAN_ORDER = ["1y", "1m", "1w"];

  // 优惠码 → 立减金额（美元），大小写不敏感
  const COUPONS = { D668INO: 40, DINO10: 10, DINO20: 20, DINO30: 30, DINO50: 50 };

  const METHODS = [
    { key: "naver", name: "NaverPay", ico: "N", bg: "#03C75A" },
    { key: "toss", name: "TossPay", ico: "T", bg: "#3182F6" },
    { key: "samsung", name: "SamsungPay", ico: "Pay", bg: "#1428A0", small: true },
    { key: "payco", name: "PayCo", ico: "P", bg: "#EF3E42" },
    { key: "kakao", name: "Kakaopay", ico: "K", bg: "#FEE500", fg: "#3A1D1D" },
    { key: "card", name: "Bank Card", ico: "💳", bg: "transparent", emoji: true }
  ];

  // 每屏顶部插画（用截图顶部，CSS 裁剪），及裁剪高度(px@350宽)
  const HERO = {
    login: { img: "assets/ui/login.png", crop: 320 },
    plans: { img: "assets/ui/plans.png", crop: 212 },
    coupon: { img: "assets/ui/coupon.png", crop: 178 },
    pay: { img: "assets/ui/pay.png", crop: 182 }
  };

  const state = {
    country: 0,
    phone: "",
    code: "",
    codeSent: false,
    countdown: 0,
    plan: "1y",
    coupon: "",
    couponApplied: false,
    discount: 0,
    couponMsg: "",
    couponErr: false,
    pay: "toss"
  };
  let countdownTimer = null;

  const money = (v) => "$" + Number(v).toFixed(2);
  const currentPlan = () => PLANS[state.plan];
  const total = () => Math.max(0, currentPlan().price - (state.couponApplied ? state.discount : 0));

  /* ------------------------- Toast ------------------------- */
  let toastT;
  function toast(msg) {
    const t = $("#p-toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2000);
  }

  /* ------------------------- 屏幕渲染 ------------------------- */
  const viewport = $("#viewport");

  function heroHTML(id) {
    const h = HERO[id];
    if (!h) return "";
    return `<div class="hero" style="height:${h.crop}px;background-image:url('${h.img}')"></div>`;
  }

  const SCREENS = {
    login() {
      const c = COUNTRIES[state.country];
      return `
      ${heroHTML("login")}
      <div class="body body--login">
        <div class="mcard">
          <h1 class="dino-title">Dino English</h1>
          <p class="dino-sub">The No.1 AI English App for Kids – 13 Years of Trust, Smart AI Tutors</p>

          <div class="field field--phone">
            <button class="cc" id="cc-btn">${c.flag} <b>${c.code}</b> <span class="caret">▾</span></button>
            <input id="phone" class="inp" type="tel" inputmode="numeric" placeholder="Phone number" value="${state.phone}" />
            <div class="cc-menu" id="cc-menu" hidden>
              ${COUNTRIES.map((x, i) => `<div class="cc-item" data-i="${i}">${x.flag} ${x.code} <small>${x.name}</small></div>`).join("")}
            </div>
          </div>

          <div class="field field--code">
            <span class="code-label">SMS code：</span>
            <input id="code" class="inp inp--code" inputmode="numeric" maxlength="6" placeholder="0000" value="${state.code}" />
            <button class="getcode" id="getcode" ${state.countdown > 0 ? "disabled" : ""}>${state.countdown > 0 ? state.countdown + "s" : (state.codeSent ? "Resend" : "Get code")}</button>
          </div>

          <button class="cta" id="login-btn" ${state.code.length >= 4 ? "" : "disabled"}>Log in</button>
          <p class="terms">You agree to our <a>Terms of Use</a> and <a>Privacy Policy</a></p>
        </div>

        <div class="socials">
          <span class="soc" style="color:#EA4335">G</span>
          <span class="soc" style="color:#111"></span>
          <span class="soc" style="color:#1877F2">f</span>
          <span class="soc" style="background:#FEE500;color:#3A1D1D">K</span>
        </div>
      </div>`;
    },

    plans() {
      const benefits = [
        ["📘", "Full Access to 864 CEFR Standard Lessons"],
        ["🗺️", "Personalized learning path · 3 lessons/week"],
        ["📊", "Report after every lesson"],
        ["💬", "Daily AI practice"],
        ["🎁", "All extension resources unlocked"]
      ];
      return `
      ${heroHTML("plans")}
      <button class="back" data-to="login" aria-label="返回"></button>
      <div class="body body--blue">
        <div class="mcard benefits">
          ${benefits.map((b) => `<div class="ben"><span>${b[0]}</span><p>${b[1]}</p></div>`).join("")}
        </div>
        <div class="plans">
          ${PLAN_ORDER.map((k) => {
            const p = PLANS[k];
            const sel = state.plan === k;
            return `<button class="plan ${sel ? "sel" : ""}" data-plan="${k}">
              ${p.best ? `<span class="plan-tag">${p.tag}</span>` : ""}
              <div class="plan-l"><b>${p.name}</b><small>${p.per}</small></div>
              <div class="plan-r"><b>${money(p.price)}</b><small class="was">${p.was}</small></div>
            </button>`;
          }).join("")}
        </div>
        <button class="cta cta--wide" data-to="coupon">Continue</button>
        <p class="foot">Cancel anytime · <a>Terms of Service</a> · <a>Privacy Policy</a></p>
      </div>`;
    },

    coupon() {
      const p = currentPlan();
      return `
      ${heroHTML("coupon")}
      <button class="back" data-to="plans" aria-label="返回"></button>
      <div class="body body--blue">
        <div class="mcard">
          <h3 class="mtitle">Have a promo code?</h3>
          <div class="promo ${state.couponErr ? "err" : ""} ${state.couponApplied ? "ok" : ""}">
            <input id="coupon" class="inp" placeholder="6688" value="${state.coupon}" ${state.couponApplied ? "readonly" : ""} />
            <button class="apply ${state.couponApplied ? "done" : ""}" id="apply-btn" ${state.coupon.trim() ? "" : "disabled"}>
              ${state.couponApplied ? "✓" : "Apply"}
            </button>
          </div>
          ${state.couponMsg ? `<p class="promo-msg ${state.couponErr ? "err" : "ok"}">${state.couponMsg}</p>` : ""}
        </div>
        <div class="mcard summary">
          <div class="srow"><span>${p.label}</span><b>${money(p.price)}</b></div>
          ${state.couponApplied ? `<div class="srow"><span>Discount</span><b class="disc">-${money(state.discount)}</b></div>` : ""}
          <div class="srow total"><span>Total</span><b>${money(total())}</b></div>
        </div>
        <button class="cta cta--wide" data-to="pay">Continue</button>
        <p class="foot">Cancel anytime · <a>Terms of Service</a> · <a>Privacy Policy</a></p>
      </div>`;
    },

    pay() {
      const p = currentPlan();
      // 这里我们在原型上加两个“假的”马来支付方式作为演示
      const MOCK_METHODS = [
        ...METHODS,
        { key: "fpx", name: "FPX (Online Banking)", ico: "🏦", emoji: true },
        { key: "tng", name: "Touch 'n Go eWallet", ico: "TNG", bg: "#0055A5" }
      ];
      return `
      ${heroHTML("pay")}
      <button class="back" data-to="coupon" aria-label="返回"></button>
      <div class="body body--blue">
        <div class="mcard summary">
          <div class="srow"><span>${p.name} plan</span><b>${money(p.price)}</b></div>
          ${state.couponApplied ? `<div class="srow"><span>Discount</span><b class="disc">-${money(state.discount)}</b></div>` : ""}
          <div class="srow total"><span>Total</span><b>${money(total())}</b></div>
        </div>
        <div class="mcard">
          <h3 class="mtitle">Choose Payment Method</h3>
          <div class="methods">
            ${MOCK_METHODS.map((m) => {
              const sel = state.pay === m.key;
              const icon = m.emoji
                ? `<span class="m-ico emoji">${m.ico}</span>`
                : `<span class="m-ico ${m.small ? "small" : ""}" style="background:${m.bg};color:${m.fg || "#fff"}">${m.ico}</span>`;
              return `<button class="method ${sel ? "sel" : ""}" data-pay="${m.key}">
                ${icon}<span class="m-name">${m.name}</span>
                <span class="m-rad"></span>
              </button>
              ${sel && m.key === 'fpx' ? `
                <div class="sub-methods" style="margin-top:-6px;margin-bottom:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                  <div style="font-size:12px;color:var(--txt-dim);margin-bottom:8px">Select Bank</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <button class="tab active" style="flex:1">Maybank2U</button>
                    <button class="tab" style="flex:1">CIMB Clicks</button>
                  </div>
                </div>
              ` : ''}
              `;
            }).join("")}
          </div>
        </div>
        <button class="cta cta--wide" data-to="success">Pay now</button>
        <p class="foot">Cancel anytime · <a>Terms of Service</a> · <a>Privacy Policy</a></p>
      </div>`;
    },
                <span class="radio ${sel ? "on" : ""}">${sel ? "✓" : ""}</span>
              </button>`;
            }).join("")}
          </div>
        </div>
        <button class="cta cta--wide" id="paynow">Pay now</button>
        <p class="foot">Cancel anytime · <a>Terms of Service</a> · <a>Privacy Policy</a></p>
      </div>`;
    },

    success() {
      const p = currentPlan();
      const expiry = { "1y": "2027.05.18", "1m": "2026.08.15", "1w": "2026.07.22" }[state.plan];
      return `
      <div class="body body--success">
        <div class="succ-illus"></div>
        <div class="mcard">
          <div class="succ-hd"><span class="check-lg">✓</span><h2>Payment Complete!</h2></div>
          <p class="succ-sub">Thank you! Your subscription is now active.</p>
          <div class="succ-line"></div>
          <div class="srow"><span>${p.name}</span><b>${money(total())}</b></div>
          <div class="srow"><span>Expired Date</span><b>${expiry}</b></div>
        </div>
        <div class="mcard">
          <div class="ben"><span>📘</span><p>Full Access to 864 CEFR Standard Lessons</p></div>
          <div class="ben"><span>🗺️</span><p>Personalized learning path · 3 lessons/week</p></div>
          <div class="ben"><span>📊</span><p>Report after every lesson</p></div>
          <div class="ben"><span>💬</span><p>Daily AI practice</p></div>
          <div class="ben"><span>🎁</span><p>All extension resources unlocked</p></div>
        </div>
        <div class="mcard">
          <b class="acc-t">Account</b>
          <p class="acc-p">Use the same account in the app. Access your lessons anytime, anywhere.</p>
          <b class="acc-t">Contact support</b>
          <p class="acc-mail">support@dinoenglish.ai</p>
        </div>
        <button class="cta cta--wide" id="restart2">Start learning</button>
      </div>`;
    }
  };

  const FLOW = ["login", "plans", "coupon", "pay", "success"];
  let current = "login";

  function show(id) {
    current = id;
    viewport.innerHTML = `<div class="screen screen--${id}">${SCREENS[id]()}</div>`;
    viewport.scrollTop = 0;
    bindScreen(id);
    // sidebar active + progress
    $$("#screen-list .scr-item").forEach((n) => n.classList.toggle("active", n.dataset.id === id));
    const fi = FLOW.indexOf(id);
    $("#progress-bar").style.width = ((fi + 1) / FLOW.length * 100) + "%";
    $("#step-count").textContent = `第 ${fi + 1} / ${FLOW.length} 步 · ${labelOf(id)}`;
    updateInfo();
  }

  function labelOf(id) {
    return { login: "登录", plans: "选择套餐", coupon: "优惠码", pay: "支付方式", success: "支付成功" }[id];
  }

  /* ------------------------- 事件绑定 ------------------------- */
  function bindScreen(id) {
    // 通用：返回 / 跳转
    $$("[data-to]", viewport).forEach((b) => b.addEventListener("click", () => show(b.dataset.to)));

    if (id === "login") {
      const phone = $("#phone"), code = $("#code");
      phone.addEventListener("input", (e) => { state.phone = e.target.value.replace(/[^\d]/g, ""); e.target.value = state.phone; });
      code.addEventListener("input", (e) => {
        state.code = e.target.value.replace(/[^\d]/g, "");
        e.target.value = state.code;
        $("#login-btn").disabled = state.code.length < 4;
      });
      // 国家码下拉
      const ccBtn = $("#cc-btn"), ccMenu = $("#cc-menu");
      ccBtn.addEventListener("click", (e) => { e.stopPropagation(); ccMenu.hidden = !ccMenu.hidden; });
      $$(".cc-item", ccMenu).forEach((it) => it.addEventListener("click", () => {
        state.country = +it.dataset.i; state.phone = phone.value; ccMenu.hidden = true; show("login");
      }));
      // 获取验证码
      $("#getcode").addEventListener("click", () => {
        if (!state.phone) { toast("Please input the valid phone number"); return; }
        startCountdown();
        toast("Verification code sent");
      });
      // 登录（任意 4 位验证码通过）
      $("#login-btn").addEventListener("click", () => {
        if (state.code.length < 4) return;
        toast("登录成功");
        setTimeout(() => show("plans"), 350);
      });
    }

    if (id === "plans") {
      $$(".plan", viewport).forEach((b) => b.addEventListener("click", () => { state.plan = b.dataset.plan; show("plans"); }));
    }

    if (id === "coupon") {
      const cin = $("#coupon");
      cin.addEventListener("input", (e) => {
        state.coupon = e.target.value;
        $("#apply-btn").disabled = !state.coupon.trim() || state.couponApplied;
      });
      $("#apply-btn").addEventListener("click", () => {
        if (state.couponApplied) return;
        const code = state.coupon.trim().toUpperCase();
        if (COUPONS[code] != null) {
          state.couponApplied = true; state.discount = COUPONS[code]; state.couponErr = false;
          state.couponMsg = "You saved " + money(state.discount);
        } else {
          state.couponApplied = false; state.discount = 0; state.couponErr = true;
          state.couponMsg = "Wrong coupon code, retry.";
        }
        show("coupon");
      });
    }

    if (id === "pay") {
      $$(".method", viewport).forEach((b) => b.addEventListener("click", () => { state.pay = b.dataset.pay; show("pay"); }));
      $("#paynow").addEventListener("click", () => {
        toast("支付成功");
        setTimeout(() => show("success"), 400);
      });
    }

    if (id === "success") {
      $("#restart2").addEventListener("click", resetAll);
    }
  }

  function closeCC() { const m = $("#cc-menu"); if (m) m.hidden = true; }

  function startCountdown() {
    state.codeSent = true; state.countdown = 60;
    const btn = $("#getcode");
    if (btn) { btn.disabled = true; btn.textContent = "60s"; }
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      state.countdown--;
      const b = $("#getcode");
      if (state.countdown <= 0) {
        clearInterval(countdownTimer); state.countdown = 0;
        if (b) { b.disabled = false; b.textContent = "Resend"; }
      } else if (b) { b.textContent = state.countdown + "s"; }
    }, 1000);
  }

  function resetAll() {
    clearInterval(countdownTimer);
    Object.assign(state, { country: 0, phone: "", code: "", codeSent: false, countdown: 0, plan: "1y", coupon: "", couponApplied: false, discount: 0, couponMsg: "", couponErr: false, pay: "toss" });
    show("login");
  }

  /* ------------------------- 右侧实时状态 ------------------------- */
  function updateInfo() {
    const c = COUNTRIES[state.country], p = currentPlan();
    $("#info-country").textContent = `${c.flag} ${c.code}`;
    $("#info-phone").textContent = state.phone ? `${c.code} ${state.phone}` : "—";
    $("#info-plan").textContent = `${p.name} · ${money(p.price)}`;
    $("#info-coupon").textContent = state.couponApplied ? `${state.coupon.toUpperCase()} (-${money(state.discount)})` : (state.coupon || "—");
    $("#info-total").textContent = money(total());
    $("#info-pay").textContent = (METHODS.find((m) => m.key === state.pay) || {}).name || "—";
  }

  /* ------------------------- 侧边栏 ------------------------- */
  function buildList() {
    const list = $("#screen-list");
    list.innerHTML = FLOW.map((id, i) =>
      `<button class="scr-item" data-id="${id}"><span class="scr-n">${i + 1}</span><span>${labelOf(id)}</span></button>`
    ).join("");
    $$(".scr-item", list).forEach((b) => b.addEventListener("click", () => show(b.dataset.id)));
  }

  function bind() {
    $("#btn-restart").addEventListener("click", resetAll);
    $("#btn-back").addEventListener("click", () => { const i = FLOW.indexOf(current); if (i > 0) show(FLOW[i - 1]); });
    $("#btn-next").addEventListener("click", () => { const i = FLOW.indexOf(current); if (i < FLOW.length - 1) show(FLOW[i + 1]); });
    $("#side-toggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
    document.addEventListener("click", closeCC);
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight") $("#btn-next").click();
      if (e.key === "ArrowLeft") $("#btn-back").click();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildList();
    bind();
    show("login");
  });
})();
