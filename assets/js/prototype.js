/* =========================================================================
 * Dino English · Landing Page — Functional Interactive Prototype (一期)
 * 支持：手机号+验证码(任意4位通过) / 切换套餐 / 输入优惠码 / 切换支付方式
 * 逻辑参考真实一期落地页，支持多国切换（沙特/韩国/印尼/马来/越南）
 * ========================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ------------------------- 数据 ------------------------- */
  const COUNTRIES = [
    {
      key: "SA", flag: "🇸🇦", code: "+966", name: "沙特", cur: "SAR",
      link: "https://sa.dinoenglish.ai/website/landingpage/login/",
      plans: [
        { key: "1y", name: "1 Year", label: "1 year plan", price: 879.99, per: "≈SAR 2.41/Day", was: "SAR 1,099.99", best: true, tag: "Best Value · 20% Off" },
        { key: "1m", name: "1 Month", label: "1 month plan", price: 157.49, per: "≈SAR 5.25/Day", was: "SAR 174.99", best: false },
        { key: "1w", name: "1 Week", label: "1 week plan", price: 46.79, per: "≈SAR 6.68/Day", was: "SAR 51.99", best: false }
      ],
      methods: [
        { key: "card", name: "Bank Card", ico: "💳", bg: "transparent", emoji: true }
      ]
    },
    {
      key: "KR", flag: "🇰🇷", code: "+82", name: "韩国", cur: "KRW",
      link: "https://kr.dinoenglish.ai/website/landingpage/login/",
      plans: [
        { key: "1y", name: "1 Year", label: "1 year plan", price: 344000, per: "≈KRW 942/Day", was: "KRW 430,000", best: true, tag: "Best Value · 20% Off" },
        { key: "1m", name: "1 Month", label: "1 month plan", price: 62100, per: "≈KRW 2,070/Day", was: "KRW 69,000", best: false },
        { key: "1w", name: "1 Week", label: "1 week plan", price: 18000, per: "≈KRW 2,571/Day", was: "KRW 20,000", best: false }
      ],
      methods: [
        { key: "naver", name: "NaverPay", ico: "N", bg: "#03C75A" },
        { key: "toss", name: "TossPay", ico: "T", bg: "#3182F6" },
        { key: "samsung", name: "SamsungPay", ico: "Pay", bg: "#1428A0", small: true },
        { key: "payco", name: "PayCo", ico: "P", bg: "#EF3E42" },
        { key: "kakao", name: "Kakaopay", ico: "K", bg: "#FEE500", fg: "#3A1D1D" },
        { key: "card", name: "Bank Card", ico: "💳", bg: "transparent", emoji: true }
      ]
    },
    {
      key: "IN", flag: "🇮🇩", code: "+62", name: "印尼", cur: "IDR",
      link: "https://in.dinoenglish.ai/website/landingpage/login/",
      plans: [
        { key: "1m", name: "1 Month", label: "1 month plan", price: 359000, per: "≈IDR 11,966/Day", was: "IDR 598,333", best: true, tag: "Best Value · 40% Off" },
        { key: "1y", name: "1 Year", label: "1 year plan", price: 2690000, per: "≈IDR 7,369/Day", was: "IDR 4,890,909", best: false }
      ],
      methods: [
        { key: "card", name: "Bank Card", ico: "💳", bg: "transparent", emoji: true }
      ]
    },
    {
      key: "MY", flag: "🇲🇾", code: "+60", name: "马来", cur: "RM",
      link: "https://ma.dinoenglish.ai/website/landingpage/login/",
      plans: [
        { key: "1m", name: "1 Month", label: "1 month plan", price: 99.90, per: "≈RM 3.33/Day", was: "RM 166.50", best: true, tag: "Best Value · 40% Off" },
        { key: "1y", name: "1 Year", label: "1 year plan", price: 649.90, per: "≈RM 1.78/Day", was: "RM 1,181.64", best: false }
      ],
      methods: [
        { key: "fpx", name: "FPX", ico: "F", bg: "#00529C" },
        { key: "ewallet", name: "E-wallets", ico: "E", bg: "#FF004D" },
        { key: "card", name: "Bank Card", ico: "💳", bg: "transparent", emoji: true }
      ]
    },
    {
      key: "VN", flag: "🇻🇳", code: "+84", name: "越南", cur: "VND",
      link: null,
      plans: [
        { key: "1m", name: "1 Month", label: "1 month plan", price: 250000, per: "≈VND 8,333/Day", was: "VND 400,000", best: true, tag: "Best Value · 37% Off" },
        { key: "1y", name: "1 Year", label: "1 year plan", price: 2000000, per: "≈VND 5,479/Day", was: "VND 3,500,000", best: false }
      ],
      methods: [
        { key: "bank_transfer", name: "Local Bank Transfer", ico: "🏦", bg: "transparent", emoji: true },
        { key: "visa", name: "Visa", ico: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png", bg: "transparent", isImg: true },
        { key: "mastercard", name: "Mastercard", ico: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", bg: "transparent", isImg: true }
      ]
    }
  ];

  // 优惠码 → 立减金额（统一按数字，展示时带货币符号），大小写不敏感
  const COUPONS = { D668INO: 40, DINO10: 10, DINO20: 20, DINO30: 30, DINO50: 50 };

  // 每屏顶部插画（用截图顶部，CSS 裁剪），及裁剪高度(px@350宽)
  const HERO = {
    login: { img: "assets/ui/login.png", crop: 320 },
    login_kr: { img: "assets/ui/kr_long_bg.png", crop: 450, isLong: true },
    plans: { img: "assets/ui/plans.png", crop: 212 },
    coupon: { img: "assets/ui/coupon.png", crop: 178 },
    pay: { img: "assets/ui/pay.png", crop: 182 }
  };

  const state = {
    country: 1, // 默认韩国
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
    pay: "toss",
    ewallet: "tng",
    paymentMode: "full"
  };
  let countdownTimer = null;

  function money(v, cur) {
    if (!cur) cur = COUNTRIES[state.country].cur;
    const noDecimals = ["KRW", "IDR", "VND"].includes(cur);
    const formatted = Number(v).toLocaleString('en-US', { minimumFractionDigits: noDecimals ? 0 : 2, maximumFractionDigits: noDecimals ? 0 : 2 });
    return cur + " " + formatted;
  }

  const currentCountry = () => COUNTRIES[state.country];
  const currentPlan = () => currentCountry().plans.find(p => p.key === state.plan) || currentCountry().plans[0];
  const total = () => Math.max(0, currentPlan().price - (state.couponApplied ? state.discount : 0));
  const payToday = () => {
    let t = total();
    if (currentCountry().key === "VN") {
      if (state.paymentMode === "installment") return Math.round(t / 3);
      if (state.paymentMode === "deposit") return 50000;
    }
    return t;
  };

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
    let h = HERO[id];
    if (id === "login" && currentCountry().key === "KR") {
      h = HERO["login_kr"];
    }
    if (!h) return "";
    
    if (h.isLong) {
      return `<img src="${h.img}" style="width: 100%; display: block;" />`;
    }
    return `<div class="hero" style="height:${h.crop}px;background-image:url('${h.img}')"></div>`;
  }

  const SCREENS = {
    login() {
      const c = currentCountry();
      const isKr = c.key === "KR";
      return `
      <div style="position: relative;">
        ${heroHTML("login")}
        <div class="body body--login ${isKr ? 'body--transparent' : ''}" ${isKr ? 'style="position:absolute; top:298px; left:0; width:100%; margin-top:0; background:transparent; box-shadow:none; z-index:10;"' : ''}>
          <div class="mcard" ${isKr ? 'style="margin-top:0"' : ''}>
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

        ${c.key === "VN" ? "" : `
        <div class="socials">
          <span class="soc" style="color:#EA4335">G</span>
          <span class="soc" style="color:#111"></span>
          <span class="soc" style="color:#1877F2">f</span>
          <span class="soc" style="background:#FEE500;color:#3A1D1D">K</span>
        </div>
        `}
      </div>
      ${isKr ? `<div class="sticky-btn-wrap" id="kr-sticky-btn" hidden><button class="sticky-btn">지금 Dino English 시작하기</button></div>` : ''}
      </div>`;
    },

    plans() {
      const c = currentCountry();
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
          ${c.plans.map((p) => {
            const sel = state.plan === p.key;
            return `<button class="plan ${sel ? "sel" : ""}" data-plan="${p.key}">
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
            <button class="apply ${state.couponApplied ? "done" : (state.coupon.length >= 4 ? "active" : "")}" id="apply-btn" ${state.coupon.length >= 4 ? "" : "disabled"}>
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
      const c = currentCountry();
      const p = currentPlan();
      return `
      ${heroHTML("pay")}
      <button class="back" data-to="coupon" aria-label="返回"></button>
      <div class="body body--blue">
        <div class="mcard summary">
          <div class="srow"><span>${p.name} plan</span><b>${money(p.price)}</b></div>
          ${state.couponApplied ? `<div class="srow"><span>Discount</span><b class="disc">-${money(state.discount)}</b></div>` : ""}
          <div class="srow total"><span>Due Today</span><b>${money(payToday())}</b></div>
        </div>
        ${c.key === 'VN' ? `
        <div class="mcard">
          <h3 class="mtitle">Payment Plan (VN Special)</h3>
          <div class="pay-modes" style="display:flex; flex-direction:column; gap:8px;">
            <label style="display:flex; align-items:center; padding:12px; border:1px solid ${state.paymentMode === 'full' ? '#3d7bff' : 'rgba(0,0,0,0.08)'}; border-radius:12px; background:${state.paymentMode === 'full' ? '#f0f5ff' : '#fff'}; cursor:pointer;">
              <input type="radio" name="paymode" value="full" style="margin-right:12px; accent-color:#3d7bff;" ${state.paymentMode === 'full' ? 'checked' : ''}>
              <div style="flex:1;">
                <div style="font-weight:600; color:#232049; font-size:14px;">Full Payment</div>
                <div style="font-size:12px; color:#7a7a8e;">Pay the total amount today</div>
              </div>
            </label>
            <label style="display:flex; align-items:center; padding:12px; border:1px solid ${state.paymentMode === 'installment' ? '#3d7bff' : 'rgba(0,0,0,0.08)'}; border-radius:12px; background:${state.paymentMode === 'installment' ? '#f0f5ff' : '#fff'}; cursor:pointer;">
              <input type="radio" name="paymode" value="installment" style="margin-right:12px; accent-color:#3d7bff;" ${state.paymentMode === 'installment' ? 'checked' : ''}>
              <div style="flex:1;">
                <div style="font-weight:600; color:#232049; font-size:14px;">3-Month Installment</div>
                <div style="font-size:12px; color:#7a7a8e;">Split into 3 payments. Pay ${money(Math.round(total()/3))} today</div>
              </div>
            </label>
            <label style="display:flex; align-items:center; padding:12px; border:1px solid ${state.paymentMode === 'deposit' ? '#3d7bff' : 'rgba(0,0,0,0.08)'}; border-radius:12px; background:${state.paymentMode === 'deposit' ? '#f0f5ff' : '#fff'}; cursor:pointer;">
              <input type="radio" name="paymode" value="deposit" style="margin-right:12px; accent-color:#3d7bff;" ${state.paymentMode === 'deposit' ? 'checked' : ''}>
              <div style="flex:1;">
                <div style="font-weight:600; color:#232049; font-size:14px;">Pay Deposit</div>
                <div style="font-size:12px; color:#7a7a8e;">Secure promotion with a ${money(50000)} deposit</div>
              </div>
            </label>
          </div>
        </div>
        ` : ''}
        <div class="mcard">
          <h3 class="mtitle">Choose Payment Method</h3>
          <div class="methods">
            ${c.methods.map((m) => {
              const sel = state.pay === m.key;
              let icon = '';
              if (m.isImg) {
                icon = `<img src="${m.ico}" alt="${m.name}" style="height:24px; object-fit:contain;" />`;
              } else {
                icon = m.emoji
                  ? `<span class="m-ico emoji">${m.ico}</span>`
                  : `<span class="m-ico ${m.small ? "small" : ""}" style="background:${m.bg};color:${m.fg || "#fff"}">${m.ico}</span>`;
              }
              return `<button class="method ${sel ? "sel" : ""}" data-pay="${m.key}">
                ${icon}
                <div style="flex:1; text-align:left; margin-left:${m.isImg ? '12px' : '0'};">
                  <div class="m-name" style="margin:0;">${m.name}</div>
                  ${m.sub ? `<div style="font-size:12px;color:#7a7a8e;margin-top:2px;font-weight:400;line-height:1.2;">${m.sub}</div>` : ''}
                </div>
                <span class="m-rad ${sel ? "on" : ""}"></span>
              </button>
              ${sel && m.key === 'fpx' ? `
                <div class="sub-methods" style="margin-top:-6px;margin-bottom:12px;padding:12px;background:rgba(0,0,0,0.03);border-radius:12px;border:1px solid rgba(0,0,0,0.06);">
                  <div style="font-size:12px;color:#7a7a8e;margin-bottom:8px">Select Bank</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <button style="flex:1;padding:8px;border-radius:8px;border:1px solid #3d7bff;background:#f0f5ff;color:#3d7bff;font-weight:600;font-size:13px;cursor:pointer">Maybank2U</button>
                    <button style="flex:1;padding:8px;border-radius:8px;border:1px solid #d3d3e0;background:#fff;color:#232049;font-weight:600;font-size:13px;cursor:pointer">CIMB Clicks</button>
                  </div>
                </div>
              ` : ''}
              ${sel && m.key === 'ewallet' ? `
                <div class="sub-methods" style="margin-top:-6px;margin-bottom:12px;padding:12px;background:rgba(0,0,0,0.03);border-radius:12px;border:1px solid rgba(0,0,0,0.06);">
                  <div style="font-size:12px;color:#7a7a8e;margin-bottom:8px">Select e-Wallet</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <button class="ew-btn" data-ew="tng" style="flex:1;padding:8px;border-radius:8px;border:1px solid ${state.ewallet === 'tng' ? '#3d7bff' : '#d3d3e0'};background:${state.ewallet === 'tng' ? '#f0f5ff' : '#fff'};color:${state.ewallet === 'tng' ? '#3d7bff' : '#232049'};font-weight:600;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;"><span style="background:#0055A5;color:#fff;border-radius:4px;padding:2px 4px;font-size:10px;">TNG</span> Touch 'n Go</button>
                    <button class="ew-btn" data-ew="grab" style="flex:1;padding:8px;border-radius:8px;border:1px solid ${state.ewallet === 'grab' ? '#3d7bff' : '#d3d3e0'};background:${state.ewallet === 'grab' ? '#f0f5ff' : '#fff'};color:${state.ewallet === 'grab' ? '#3d7bff' : '#232049'};font-weight:600;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;"><span style="background:#00B14F;color:#fff;border-radius:4px;padding:2px 4px;font-size:10px;">Grab</span> GrabPay</button>
                  </div>
                </div>
              ` : ''}
              `;
            }).join("")}
          </div>
        </div>
        ${(state.pay === 'visa' || state.pay === 'mastercard') && state.paymentMode !== 'full' ? `
        <div style="margin-bottom:16px; padding:12px; background:rgba(61,123,255,0.05); border:1px solid rgba(61,123,255,0.2); border-radius:12px; display:flex; align-items:flex-start; gap:10px;">
          <input type="checkbox" id="auto-deduct" checked style="margin-top:2px; accent-color:#3d7bff; width:16px; height:16px; cursor:pointer;" />
          <label for="auto-deduct" style="font-size:12px; color:#232049; line-height:1.4; cursor:pointer;">
            <b>Authorize Automatic Deduction</b><br/>
            <span style="color:#7a7a8e;">I authorize Dino English to securely save my card and automatically deduct the remaining balance on the due date without further action.</span>
          </label>
        </div>
        ` : ''}
        <button class="cta cta--wide" id="paynow">Pay now</button>
        <p class="foot">Cancel anytime · <a>Terms of Service</a> · <a>Privacy Policy</a></p>
      </div>`;
    },

    transfer_instructions() {
      const p = currentPlan();
      return `
      <div class="body body--blue" style="min-height:720px; display:flex; flex-direction:column; background:#f5f7ff; margin-top:0; border-radius:34px; padding: 24px;">
        <h2 style="color:#232049;font-size:22px;margin-bottom:8px;font-weight:800;text-align:center;">Transfer Instructions</h2>
        <p style="color:#7a7a8e;font-size:14px;text-align:center;margin-bottom:24px;">Please transfer the exact amount to the bank account below.</p>
        
        <div style="background:#fff; border-radius:16px; padding:20px; width:100%; box-shadow:0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#7a7a8e;font-size:13px;">Transfer Amount</span>
            <b style="color:#ef5350;font-size:16px;">${money(payToday())}</b>
          </div>
          <div style="height:1px; background:rgba(0,0,0,0.05); margin-bottom:12px;"></div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#7a7a8e;font-size:13px;">Bank Name</span>
            <b style="color:#232049;font-size:14px;text-align:right;">Vietcombank (NAPAS)</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#7a7a8e;font-size:13px;">Account Name</span>
            <b style="color:#232049;font-size:14px;text-align:right;">DINO ENGLISH PTE LTD</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#7a7a8e;font-size:13px;">Account Number</span>
            <b style="color:#232049;font-size:14px;text-align:right;">1029384756</b>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#7a7a8e;font-size:13px;">Reference Code</span>
            <b style="color:#232049;font-size:14px;text-align:right;">DINO-${Math.floor(100000 + Math.random()*900000)}</b>
          </div>
          <div style="font-size:12px;color:#ef5350;background:rgba(239,83,80,0.1);padding:10px;border-radius:8px;margin-top:16px;">
            ⚠️ Notice: Include the Reference Code in your transfer note to avoid delay.
          </div>
        </div>

        <button class="cta cta--wide" id="simulate-transfer-btn">I have transferred</button>
        <p class="foot" style="text-align:center;margin-top:16px;">Your subscription will be active automatically once we receive the payment.</p>
      </div>`;
    },

    processing() {
      return `
      <div class="body body--blue" style="min-height:720px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f5f7ff; margin-top:0; border-radius:34px;">
        <div style="width:44px;height:44px;border:4px solid rgba(61,123,255,0.2);border-top-color:#3d7bff;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:24px;"></div>
        <h2 style="color:#232049;font-size:22px;margin-bottom:8px;font-weight:800;">确认付款中...</h2>
        <p style="color:#7a7a8e;font-size:14px;">Confirming your payment</p>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
      </div>`;
    },

    success() {
      const p = currentPlan();
      const expiry = { "1y": "2027.05.18", "1m": "2026.08.15", "1w": "2026.07.22" }[state.plan] || "2027.01.01";
      return `
      <div class="body body--success">
        <div class="succ-illus"></div>
        <div class="mcard">
          <div class="succ-hd"><span class="check-lg">✓</span><h2>Payment Complete!</h2></div>
          <p class="succ-sub">Thank you! Your subscription is now active.</p>
          <div class="succ-line"></div>
          <div class="srow"><span>${p.name}</span><b>${money(p.price - (state.couponApplied ? state.discount : 0))}</b></div>
          <div class="srow total" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05);"><span>Total Paid</span><b>${money(total())}</b></div>
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
    if (viewport._scrollHandler) {
      viewport.removeEventListener("scroll", viewport._scrollHandler);
      viewport._scrollHandler = null;
    }
    if (viewport._loginObserver) {
      viewport._loginObserver.disconnect();
      viewport._loginObserver = null;
    }
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
    return { login: "登录", plans: "选择套餐", coupon: "优惠码", pay: "支付方式", transfer_instructions: "转账指引", processing: "确认付款", success: "支付成功" }[id];
  }

  /* ------------------------- 事件绑定 ------------------------- */
  function bindScreen(id) {
    // 通用：返回 / 跳转
    $$("[data-to]", viewport).forEach((b) => b.addEventListener("click", () => show(b.dataset.to)));

    if (id === "login") {
      const phone = $("#phone"), code = $("#code");
      
      // 韩国吸底按钮逻辑
      const stickyBtnWrap = $("#kr-sticky-btn");
      if (stickyBtnWrap) {
        const loginCard = $(".body--login .mcard");
        if (loginCard) {
          const observer = new IntersectionObserver((entries) => {
            // 当登录卡片完全离开视口时，显示吸底按钮
            if (entries[0].intersectionRatio === 0) {
              stickyBtnWrap.hidden = false;
            } else {
              stickyBtnWrap.hidden = true;
            }
          }, { root: viewport, threshold: 0 });
          
          observer.observe(loginCard);
          
          if (viewport._loginObserver) viewport._loginObserver.disconnect();
          viewport._loginObserver = observer;
        }
        
        stickyBtnWrap.querySelector("button").addEventListener("click", () => {
          viewport.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      
      // 获取验证码
      const getcodeBtn = $("#getcode");
      const updateGetCodeState = () => {
        if (state.countdown > 0) return; // 倒计时中保持不可点状态
        if (state.phone.length > 0) {
          getcodeBtn.classList.add("active");
        } else {
          getcodeBtn.classList.remove("active");
        }
      };
      
      phone.addEventListener("input", (e) => { 
        state.phone = e.target.value.replace(/[^\d]/g, ""); 
        e.target.value = state.phone; 
        updateGetCodeState();
      });
      
      code.addEventListener("input", (e) => {
        state.code = e.target.value.replace(/[^\d]/g, "");
        e.target.value = state.code;
        $("#login-btn").disabled = state.code.length < 4;
      });
      // 国家码下拉
      const ccBtn = $("#cc-btn"), ccMenu = $("#cc-menu");
      ccBtn.addEventListener("click", (e) => { e.stopPropagation(); ccMenu.hidden = !ccMenu.hidden; });
      $$(".cc-item", ccMenu).forEach((it) => it.addEventListener("click", () => {
        switchCountry(+it.dataset.i);
        state.phone = phone.value;
        ccMenu.hidden = true;
      }));
      // 获取验证码点击
      getcodeBtn.addEventListener("click", () => {
        if (!state.phone) { toast("Please input the valid phone number"); return; }
        startCountdown();
        toast("Verification code sent");
      });
      
      // 初始化状态
      updateGetCodeState();
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
        const btn = $("#apply-btn");
        btn.disabled = state.coupon.length < 4 || state.couponApplied;
        if (state.coupon.length >= 4 && !state.couponApplied) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
      $("#apply-btn").addEventListener("click", () => {
        if (state.couponApplied) return;
        const code = state.coupon.trim().toUpperCase();
        const isDino4 = /^DINO\d{4}$/.test(code);
        if (COUPONS[code] != null || isDino4) {
          state.couponApplied = true;
          // 假设优惠券的折扣数值就是对应的货币数值（这里做个简单转换，或者固定减去该数值）
          let baseDiscount = COUPONS[code] || 40; // 默认 DINO+4位数字 减 40
          // 如果是印尼/越南/韩国等大面额货币，优惠券金额可能需要乘以一个系数
          if (["IDR", "VND", "KRW"].includes(currentCountry().cur)) {
            state.discount = baseDiscount * 1000;
          } else {
            state.discount = baseDiscount;
          }
          state.couponErr = false;
          state.couponMsg = "You saved " + money(state.discount);
        } else {
          state.couponApplied = false; state.discount = 0; state.couponErr = true;
          state.couponMsg = "Wrong coupon code, retry.";
        }
        show("coupon");
      });
    }

    if (id === "pay") {
      $$("input[name='paymode']", viewport).forEach(radio => {
        radio.addEventListener("change", (e) => {
          state.paymentMode = e.target.value;
          show("pay");
        });
      });
      $$(".method", viewport).forEach((b) => b.addEventListener("click", (e) => {
        if (e.target.closest('.sub-methods')) return;
        state.pay = b.dataset.pay; show("pay");
      }));
      $$(".ew-btn", viewport).forEach((b) => b.addEventListener("click", (e) => {
        e.stopPropagation();
        state.ewallet = b.dataset.ew; show("pay");
      }));
      $("#paynow").addEventListener("click", () => {
        if (state.pay === 'bank_transfer') {
          show("transfer_instructions");
        } else if (state.pay === 'ewallet') {
          toast("跳转第三方 App 支付...");
          setTimeout(() => {
            show("processing");
            setTimeout(() => show("success"), 2500);
          }, 1000);
        } else {
          toast("发起信用卡支付请求...");
          setTimeout(() => {
            show("processing");
            setTimeout(() => show("success"), 1500);
          }, 500);
        }
      });
    }

    if (id === "transfer_instructions") {
      $("#simulate-transfer-btn").addEventListener("click", () => {
        toast("Mocking webhook received...");
        setTimeout(() => {
          show("processing");
          setTimeout(() => show("success"), 2500);
        }, 500);
      });
    }

    if (id === "processing") {
      // Nothing to bind
    }

    if (id === "success") {
      $("#restart2").addEventListener("click", resetAll);
    }
  }

  function closeCC() { const m = $("#cc-menu"); if (m) m.hidden = true; }

  function startCountdown() {
    state.codeSent = true; state.countdown = 60;
    const btn = $("#getcode");
    if (btn) { 
      btn.disabled = true; 
      btn.textContent = "60s"; 
      btn.classList.remove("active");
    }
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      state.countdown--;
      const b = $("#getcode");
      if (state.countdown <= 0) {
        clearInterval(countdownTimer); state.countdown = 0;
        if (b) { 
          b.disabled = false; 
          b.textContent = "Resend"; 
          if (state.phone.length > 0) b.classList.add("active");
        }
      } else if (b) { b.textContent = state.countdown + "s"; }
    }, 1000);
  }

  function resetAll() {
    clearInterval(countdownTimer);
    Object.assign(state, { phone: "", code: "", codeSent: false, countdown: 0, coupon: "", couponApplied: false, discount: 0, couponMsg: "", couponErr: false });
    // 重置套餐和支付方式为当前国家的默认值
    state.plan = currentCountry().plans[0].key;
    state.pay = currentCountry().methods[0].key;
    show("login");
  }

  function switchCountry(index) {
    state.country = index;
    const c = COUNTRIES[index];
    state.plan = c.plans[0].key;
    state.pay = c.methods[0].key;
    state.couponApplied = false;
    state.discount = 0;
    state.coupon = "";
    state.couponMsg = "";
    state.couponErr = false;
    renderCountryTabs();
    show(current);
  }

  /* ------------------------- 顶部国家切换栏 ------------------------- */
  function renderCountryTabs() {
    const tabs = $("#country-tabs");
    if (!tabs) return;
    tabs.innerHTML = COUNTRIES.map((c, i) => `
      <button class="ctab ${state.country === i ? "active" : ""}" data-i="${i}">
        ${c.flag} ${c.name}
      </button>
    `).join("");
    $$(".ctab", tabs).forEach(b => b.addEventListener("click", () => switchCountry(+b.dataset.i)));

    const liveBtn = $("#btn-live");
    if (liveBtn) {
      const link = currentCountry().link;
      if (link) {
        liveBtn.style.display = "inline-block";
        liveBtn.href = link;
        liveBtn.textContent = `🔗 查看线上版 (${currentCountry().name})`;
      } else {
        liveBtn.style.display = "none";
      }
    }
  }

  /* ------------------------- 右侧实时状态 ------------------------- */
  function updateInfo() {
    const c = currentCountry(), p = currentPlan();
    $("#info-country").textContent = `${c.flag} ${c.code}`;
    $("#info-phone").textContent = state.phone ? `${c.code} ${state.phone}` : "—";
    $("#info-plan").textContent = `${p.name} · ${money(p.price)}`;
    $("#info-coupon").textContent = state.couponApplied ? `${state.coupon.toUpperCase()} (-${money(state.discount)})` : (state.coupon || "—");
    $("#info-total").textContent = currentCountry().key === 'VN' && state.paymentMode !== 'full' ? `${money(payToday())} (Due Today)` : money(total());
    $("#info-pay").textContent = (c.methods.find((m) => m.key === state.pay) || {}).name || "—";
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
    renderCountryTabs();
    buildList();
    bind();
    show("login");
  });
})();
