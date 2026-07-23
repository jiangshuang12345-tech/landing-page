/* =========================================================================
 * Dino AI · Landing Page 二期 PRD — Structured Content
 * ========================================================================= */

window.PRD2 = {
  meta: {
    title: "Landing Page · 二期",
    subtitle: "渠道级配置化 · SKU × 优惠券 × 优惠码",
    version: "v1.0",
    status: "评审中",
    goal: "同一国家不同渠道，支持不同 SKU 组合与优惠力度",
    countries: [
      { code: "VN", flag: "🇻🇳", name: "越南", cur: "VND" },
      { code: "SA", flag: "🇸🇦", name: "沙特", cur: "SAR" },
      { code: "KR", flag: "🇰🇷", name: "韩国", cur: "KRW" },
      { code: "MY", flag: "🇲🇾", name: "马来", cur: "RM" },
      { code: "IN", flag: "🇮🇩", name: "印尼", cur: "IDR" }
    ]
  },

  hierarchy: [
    { level: "01", name: "Landing Page", desc: "与渠道码 1:1，决定本页货盘", color: "#6c4bff" },
    { level: "02", name: "SKU", desc: "每个 LP 可绑定多个套餐（周/月/年）", color: "#3d7bff" },
    { level: "03", name: "优惠券", desc: "每个 SKU 可挂多张券（百分比 / 立减互斥）", color: "#ff9a2e" },
    { level: "04", name: "优惠码", desc: "每张券可批量生成多个 DINO**** 码", color: "#34c759" }
  ],

  vsPhase1: [
    { dim: "配置粒度", p1: "按国家静态套餐表", p2: "按 Landing Page / 渠道码动态货盘" },
    { dim: "SKU", p1: "一国一套，渠道无关", p2: "同国不同渠道可绑不同 SKU" },
    { dim: "优惠", p1: "优惠码弱关联渠道", p2: "券绑定 SKU；一券多码；力度可配" },
    { dim: "运营", p1: "改价依赖发版", p2: "管台配置即时生效" },
    { dim: "C 端流程", p1: "登录→套餐→码→支付", p2: "流程不变，货盘与核销按配置下发" }
  ],

  rules: [
    { id: "R1", title: "LP → SKU 一对多", text: "一个 Landing Page 至少绑定 1 个 SKU；可只绑单品做渠道专投。" },
    { id: "R2", title: "SKU 可跨 LP 复用", text: "多个渠道可共用同一组 SKU（归因分开、货盘一致）。" },
    { id: "R3", title: "SKU → 券 一对多", text: "同一 SKU 可挂多张不同折扣力度的优惠券。" },
    { id: "R4", title: "券归属单一 SKU", text: "核销时优惠码必须匹配当前选中 SKU，否则失败。" },
    { id: "R5", title: "券 → 码 一对多", text: "生成规则：DINO + 四位随机数；支持批量生成。" },
    { id: "R6", title: "折扣互斥", text: "百分比与立减不可同时配置；折后价必须 > 0。" },
    { id: "R7", title: "Best Value ≤ 1", text: "同一 LP 货盘内至多一个 Best Value；冲突则拦截或取序首位。" }
  ],

  scenarios: [
    {
      id: "A",
      title: "渠道不同 · SKU 不同",
      example: "沙特 Meta 绑周/月/年；Google Ads 只绑周包 7827",
      why: "不同投放目标卖不同货盘"
    },
    {
      id: "B",
      title: "渠道不同 · SKU 相同",
      example: "沙特 Snapchat / KOL 与 Google 共用周包 7827",
      why: "归因拆分，货盘保持一致"
    },
    {
      id: "C",
      title: "渠道不同 · 优惠力度不同",
      example: "同年包：Meta 挂 20% 券，KOL 挂立减券 + 专属码",
      why: "渠道专属折扣与码包分发"
    }
  ],

  skus: [
    { country: "SA", id: "7827", name: "周包", price: "SAR 51.99", best: false, coupons: [
      { id: "6666", name: "新客折扣券", type: "percent", value: "10%" },
      { id: "6667", name: "立减券", type: "fixed", value: "−20" },
      { id: "6668", name: "加码折扣", type: "percent", value: "20%" },
      { id: "6669", name: "大额立减", type: "fixed", value: "−50" }
    ]},
    { country: "SA", id: "7828", name: "月包", price: "SAR 174.99", best: false, coupons: [
      { id: "6670", name: "月包折扣", type: "percent", value: "10%" }
    ]},
    { country: "SA", id: "7829", name: "年包", price: "SAR 1099.99", best: true, coupons: [
      { id: "6671", name: "年包折扣", type: "percent", value: "20%" }
    ]},
    { country: "KR", id: "7830", name: "周包", price: "KRW 20,000", best: false, coupons: [
      { id: "6672", name: "周包折扣", type: "percent", value: "10%" }
    ]},
    { country: "KR", id: "7831", name: "月包", price: "KRW 69,000", best: false, coupons: [
      { id: "6673", name: "月包折扣", type: "percent", value: "10%" }
    ]},
    { country: "KR", id: "7832", name: "年包", price: "KRW 430,000", best: true, coupons: [
      { id: "6674", name: "年包折扣", type: "percent", value: "20%" }
    ]},
    { country: "MY", id: "7833", name: "月包", price: "RM 166.50", best: true, coupons: [
      { id: "6675", name: "月包折扣", type: "percent", value: "40%" }
    ]},
    { country: "MY", id: "7834", name: "年包", price: "RM 1,181.64", best: false, coupons: [
      { id: "6676", name: "年包折扣", type: "percent", value: "45%" }
    ]},
    { country: "IN", id: "7835", name: "月包", price: "IDR 598,333", best: true, coupons: [
      { id: "6677", name: "月包折扣", type: "percent", value: "40%" }
    ]},
    { country: "IN", id: "7836", name: "年包", price: "IDR 4,890,909", best: false, coupons: [
      { id: "6678", name: "年包折扣", type: "percent", value: "45%" }
    ]},
    { country: "VN", id: "7837", name: "月包", price: "VND 500,000", best: true, coupons: [
      { id: "6679", name: "月包折扣", type: "percent", value: "40%" }
    ]},
    { country: "VN", id: "7838", name: "年包", price: "VND 5,000,000", best: false, coupons: [
      { id: "6680", name: "年包折扣", type: "percent", value: "45%" }
    ]}
  ],

  bindings: [
    { country: "SA", channel: "Meta Ads", code: "Zr7Gx4d", skus: ["7827", "7828", "7829"], note: "LP-1 完整货盘" },
    { country: "SA", channel: "Google Ads", code: "Uw5Tn8f", skus: ["7827"], note: "渠道不同，SKU 不同" },
    { country: "SA", channel: "Snapchat", code: "Xb3Mq6s", skus: ["7827"], note: "渠道不同，SKU 相同" },
    { country: "SA", channel: "KOL", code: "Fj9Cv2h", skus: ["7827"], note: "SKU 相同" },
    { country: "SA", channel: "Google Play", code: "Dk4Np7w", skus: ["7827"], note: "SKU 相同" },
    { country: "SA", channel: "App Store", code: "Rv8Hs3m", skus: ["7827"], note: "SKU 相同" },
    { country: "SA", channel: "默认", code: "Rx5Fp2n", skus: ["7827", "7828", "7829"], note: "国家默认回落" },
    { country: "KR", channel: "Meta Ads", code: "Kp7Nm3x", skus: ["7830", "7831", "7832"], note: "完整货盘" },
    { country: "KR", channel: "默认", code: "Tb6Wr9k", skus: ["7830", "7831", "7832"], note: "国家默认" },
    { country: "MY", channel: "Meta Ads", code: "Vd8Rn5j", skus: ["7833"], note: "侧重月包" },
    { country: "MY", channel: "Google Ads", code: "Hx3Fb7w", skus: ["7834"], note: "侧重年包" },
    { country: "MY", channel: "KOL", code: "Ep4Wm8t", skus: ["7833"], note: "月包" },
    { country: "MY", channel: "KOL_Farahelia", code: "Ky7Rf3w", skus: ["7834"], note: "年包" },
    { country: "MY", channel: "默认", code: "Nc4Hs7m", skus: ["7833", "7834"], note: "国家默认" },
    { country: "IN", channel: "Meta Ads", code: "Hv9Rn2w", skus: ["7835", "7836"], note: "双 SKU" },
    { country: "IN", channel: "Google Ads", code: "Lk5Jp8c", skus: ["7835"], note: "仅月包" },
    { country: "IN", channel: "Snapchat", code: "Yd3Fq7h", skus: ["7836"], note: "仅年包" },
    { country: "IN", channel: "默认", code: "Jw8Dq3v", skus: ["7835", "7836"], note: "国家默认" },
    { country: "VN", channel: "Meta Ads", code: "Vn1Aa2b", skus: ["7837", "7838"], note: "完整货盘" },
    { country: "VN", channel: "默认", code: "Vn7Gg8h", skus: ["7837", "7838"], note: "国家默认" }
  ],

  features: {
    cms: [
      { id: "F1", title: "SKU 管理", items: ["新建/编辑/上下架", "原价·币种·有效期·Best Value", "按国家筛选"] },
      { id: "F2", title: "优惠券管理", items: ["挂在指定 SKU 下", "百分比 / 立减互斥", "有效期与上下架"] },
      { id: "F3", title: "优惠码生成", items: ["批量生成 DINO+四位随机数", "全局唯一·可禁用", "导出 CSV 分发"] },
      { id: "F4", title: "LP 绑定", items: ["渠道码绑定 SKU 有序列表", "预览货盘与 Best Value", "保存后生效"] }
    ],
    cend: [
      { step: "进入 LP", change: "解析 channel → 拉取该 LP 绑定的 SKU 列表" },
      { step: "套餐页", change: "仅展示本 LP 货盘；默认选中 Best Value" },
      { step: "优惠码", change: "额外校验：码所属券必须绑定当前选中 SKU" },
      { step: "支付/成功", change: "流程不变；订单入库补 sku_id / coupon_id / promo_code" }
    ]
  },

  acceptance: [
    "可为任意国家创建 SKU，并设置原价、有效期、Best Value",
    "可在 SKU 下创建优惠券，百分比 / 立减互斥生效",
    "可为一张券批量生成 ≥ 2 个 DINO**** 码，且全局唯一",
    "可为不同渠道码绑定不同或相同 SKU 列表",
    "同一国家两个渠道进入套餐页，SKU 列表可不同（沙特 Meta vs Google）",
    "选中 SKU A 时，仅该 SKU 下的优惠码可核销成功",
    "跨 SKU 误用优惠码 → 失败 toast",
    "支付成功订单含 sku_id + promo_code + 原价/折后价",
    "一期默认渠道码仍可完成完整购买；登录/支付/退款不变"
  ],

  opens: [
    { q: "无效渠道 / 空货盘时？", a: "建议回落国家默认 LP；备选错误页" },
    { q: "跨 SKU 误用文案？", a: "统一 Incorrect，或单独 Not valid for this plan" },
    { q: "SKU 有效期 vs 券有效期？", a: "建议取交集；SKU 控可售，券控可兑" },
    { q: "多个 Best Value？", a: "建议保存时强制校验拦截" },
    { q: "URL 自动带入优惠码？", a: "二期默认不做，可作为二期+" }
  ]
};
