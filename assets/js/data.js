/* =========================================================================
 * Dino English · Landing Page PRD — Structured Content
 * 所有需求内容集中在此，便于维护与后续多语言扩展。
 * ========================================================================= */

window.PRD = {
  meta: {
    title: "Dino English · Landing Page",
    subtitle: "海外获客落地页 · 沙特 / 韩国 / 印尼 / 马来",
    version: "v1.0",
    status: "开发中",
    launch: "2026.07.15（沟通后实际上线日期）",
    countries: [
      { code: "SA", flag: "🇸🇦", name: "沙特阿拉伯", lang: "阿拉伯语", note: "UI 需做界面反转 (RTL)", cur: "SAR" },
      { code: "KR", flag: "🇰🇷", name: "韩国", lang: "韩语", note: "支持本地支付方式", cur: "KRW" },
      { code: "ID", flag: "🇮🇩", name: "印度尼西亚", lang: "印尼语", note: "银行支付", cur: "IDR" },
      { code: "MY", flag: "🇲🇾", name: "马来西亚", lang: "马来语", note: "银行支付", cur: "MYR" }
    ],
    roles: [
      { role: "需求 + 原型", owner: "@米兰" },
      { role: "UI 设计", owner: "@李珊珊 · Figma（沙特需界面反转）" },
      { role: "技术", owner: "@李晓宇 @胡兆乾 @张帝 @董鹏 @王槐宝 @罗伟 · 管台 @姜双" },
      { role: "数据埋点", owner: "@米兰 @许璐璐" },
      { role: "业务负责人", owner: "印尼/马来 @Clifford Lee · 韩国/沙特 @张芳" },
      { role: "多语言", owner: "@米兰" }
    ]
  },

  /* ---------------------------------------------------------------------- */
  /* 交互原型走查 —— 逐屏                                                      */
  /* ---------------------------------------------------------------------- */
  screens: [
    {
      id: "register",
      step: "01",
      name: "注册 / 登录页",
      tag: "Sign up",
      img: "assets/images/screen-login-combined.png",
      caption: "增加品牌信息：13年品牌信任背书，地球与全球连线设计，突出No.1 AI英语App定位",
      points: [
        "App 名称「Dino English」+ 营销文案（需多语言）：“The No.1 AI English App for Kids — 13 Years of Trust, Smart AI Tutors” 以及 “Making English learning part of your child's daily route”",
        "注册方式 1（首位 · 突出）：手机号 —— 支持 4 国手机号（沙特/印尼/马来/韩国），国家码下拉可选",
        "验证码逻辑与 App 内一致：点击「Get code」发送并倒计时 60s，倒计时中退出返回后继续；结束后变「Resend」",
        "验证码满 4 位后 [Login] 按钮由置灰变亮起可点击；提交正确后登录成功",
        "注册方式 2：google / apple / facebook / kakao (韩国特有) 一排小图标，一键拉起第三方登录",
        "隐私协议 / 用户条款：4 国多语言，均可跳转链接，放置于登录按钮下方",
        "默认姓名与 App 内一致（后端预置 100 个姓名随机给出）"
      ],
      states: [
        { label: "手机号格式错误", toast: "Please input the valid phone number" },
        { label: "网络异常", toast: "Network error. Please try again" },
        { label: "请求过于频繁 (5 分钟最多 5 次)", toast: "Too many requests. Please try again later" },
        { label: "验证码错误", toast: "Incorrect verification code" },
        { label: "验证码过期 (有效期 5 分钟)", toast: "Verification code expired. Please request a new one" }
      ]
    },
    {
      id: "plans",
      step: "02",
      name: "支付 / 套餐页",
      tag: "Dino Pro",
      img: "assets/images/screen-plans.png",
      caption: "按国家展示套餐 · 价格 · 币种 · 折扣，默认高亮 Best Value",
      points: [
        "文案全部需多语言（Dino Pro 除外）：权益、套餐+价格、政策链接、支付说明「支付后 App 内立即生效，可随时取消」",
        "页面地址仍带 国家 + 渠道码",
        "点击返回可回到注册页，允许修改手机号或重新拉起第三方授权",
        "所有套餐均为一次性购买；按国家展示不同套餐 / 价格 / 币种 / 折扣标签",
        "默认选中并高亮带「Best Value」标签的套餐",
        "点击「Continue」跳转优惠码页面"
      ],
      states: []
    },
    {
      id: "coupon",
      step: "03",
      name: "优惠码页",
      tag: "Apply coupon",
      img: "assets/images/screen-coupon.png",
      caption: "一码多人兑换 · 限时有效 · 入库记录原价与折后价",
      points: [
        "无优惠码：仅展示套餐名（如 1 year）+ 价格 229.99，总计 $229.99",
        "有优惠码：展示原价 229.99 + 直减 40（高亮）+ 总计 $189.99",
        "入库数据需同时记录：原价 与 折扣后价格",
        "输入前 Apply 按钮置灰；输入后亮起可点击校验",
        "校验成功：按钮变绿 + 勾选 + 显示优惠文案（You saved $40.00）",
        "点击返回上一页支持修改优惠码信息"
      ],
      states: [
        { label: "网络异常", toast: "Network error. Please try again" },
        { label: "优惠码错误", toast: "Incorrect promotion code" },
        { label: "优惠码过期", toast: "Promotion code expired" }
      ]
    },
    {
      id: "method",
      step: "04",
      name: "选择支付方式",
      tag: "Payment",
      img: "assets/images/screen-payment.png",
      caption: "按国家展示支付渠道 · 点击 Pay now 拉起第三方支付",
      points: [
        "韩国：NaverPay、TossPay、SamsungPay、PayCo、Kakaopay、银行卡",
        "印尼 / 马来 / 沙特：银行支付",
        "点击「Pay now」拉起第三方支付",
        "返回按钮可回上一页重新输入优惠码",
        "除支付方式名称外，其它文案均需多语言"
      ],
      states: [
        { label: "支付成功", toast: "跳转支付成功页面" },
        { label: "支付失败", toast: "支付失败，请重试（留在当前页）" },
        { label: "取消支付", toast: "支付已取消，请重试（留在当前页）" }
      ]
    },
    {
      id: "success",
      step: "05",
      name: "支付成功页",
      tag: "Payment Complete",
      img: "assets/images/screen-success.png",
      caption: "展示套餐 · 有效期 · 权益 · 引导下载 App 同账号登录学习",
      points: [
        "无论用户此前是否在 App 内购买过，支付成功都直接展示成功页",
        "展示：恭喜文案、套餐名+价格、VIP 有效期、权益列表",
        "引导去 App 用同一账号登录学习；客服 support@dinoenglish.ai；VIP 立即生效",
        "「Start Learning」按钮：已下载 App → 打开 App；未下载 → 跳转 Google / iOS 商店",
        "VIP 权益发放：同账号立即发放；不同账号不发放，需联系客服人工处理",
        "有效期：非会员 = 套餐到期时间；会员 = 在 Google / App Store 有效期基础上叠加"
      ],
      states: [
        { label: "支付失败停留原页", toast: "支付失败，请重试（再次失败/取消不再提醒）" }
      ]
    },
    {
      id: "home",
      step: "06",
      name: "返回主页 / 复访",
      tag: "Home",
      img: "assets/images/screen-home.png",
      caption: "根据登录 & 购买状态决定复访落点",
      points: [
        "登录失败：返回初始注册页",
        "登录成功但未购买 / 购买失败：第二次进入重新登录注册",
        "登录 + 购买成功后（首页及后续复访）：直接展示支付成功页信息，方便查询已购套餐"
      ],
      states: []
    }
  ],

  /* ---------------------------------------------------------------------- */
  /* 埋点 & 数据架构                                                          */
  /* ---------------------------------------------------------------------- */
  analytics: {
    principle:
      "GA4 = Web + App 行为漏斗；AppsFlyer = 安装归因 & 渠道；UserID/UID 在 Web 登录后与 App 打通；AppsFlyer 推荐 OneLink + Smart Script 做 Web-to-App。",
    funnel: [
      { icon: "🖱️", title: "广告点击", desc: "ch = 7 位渠道码" },
      { icon: "🛬", title: "Landing Page", desc: "① GA4 page_view" },
      { icon: "🔎", title: "校验渠道码", desc: "→ Session Country + Channel" },
      { icon: "🔐", title: "登录 / 注册", desc: "Phone OTP / OAuth · ② GA4 login + channel_code" },
      { icon: "💳", title: "会员 → 优惠券 → 支付", desc: "成功 → ③ GA4 purchase + channel_code；失败 → 回首页" },
      { icon: "🔗", title: "AppsFlyer OneLink", desc: "Web ↔ App UID · 安装 App · ⑤ AF 安装归因" },
      { icon: "👑", title: "自动 VIP", desc: "⑥ Firebase / GA4 login / first_open / subscribe / purchase" },
      { icon: "🗄️", title: "CRM 入库", desc: "channel_code / country / UID · Paid → Activated" },
      { icon: "🎯", title: "ROI 闭环", desc: "归因回流广告平台" }
    ]
  },

  /* ---------------------------------------------------------------------- */
  /* 渠道码 —— 4 国 × (6 广告渠道 + 1 默认) = 28                                */
  /* ---------------------------------------------------------------------- */
  channelRule:
    "格式：固定 7 位随机字符串，字符集 = 大小写字母 + 数字，去除易混字符 0 O o 1 l I i。运营/CMS 为「国家 × 渠道」预生成唯一码存入映射表；广告链接仅带 ?ch=xxxxxxx，Landing 反查国家与渠道。",
  channels: [
    // KR
    { country: "KR", flag: "🇰🇷", ch: "Meta Ads", code: "Kp7Nm3x", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Kp7Nm3x&c=MetaAds&af_channel=LP-MetaAds" },
    { country: "KR", flag: "🇰🇷", ch: "Google Ads", code: "Rt4Hw9q", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Rt4Hw9q&c=GoogleAds&af_channel=LP_GoogleAds" },
    { country: "KR", flag: "🇰🇷", ch: "Snapchat", code: "Jn2Yv6k", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Jn2Yv6k&c=Snapchat&af_channel=LP_Snapchat" },
    { country: "KR", flag: "🇰🇷", ch: "KOL", code: "Bf8Dc5m", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Bf8Dc5m&c=KOL&af_channel=LP_KOL" },
    { country: "KR", flag: "🇰🇷", ch: "Google Play", code: "Wq3Xs7n", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Wq3Xs7n&c=GooglePlay&af_channel=LP_GooglePlay" },
    { country: "KR", flag: "🇰🇷", ch: "App Store", code: "Gm6Tk4p", url: "https://kr.dinoenglish.ai/website/landingpage/login/?channel=Gm6Tk4p&c=AppStore&af_channel=LP_AppStore" },
    { country: "KR", flag: "🇰🇷", ch: "默认", code: "Tb6Wr9k", url: "https://kr.dinoenglish.ai/website/landingpage/login/", isDefault: true },
    // MY
    { country: "MY", flag: "🇲🇾", ch: "Meta Ads", code: "Vd8Rn5j", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Vd8Rn5j" },
    { country: "MY", flag: "🇲🇾", ch: "Google Ads", code: "Hx3Fb7w", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Hx3Fb7w" },
    { country: "MY", flag: "🇲🇾", ch: "Snapchat", code: "Qs9Kz2r", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Qs9Kz2r" },
    { country: "MY", flag: "🇲🇾", ch: "KOL", code: "Ep4Wm8t", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Ep4Wm8t" },
    { country: "MY", flag: "🇲🇾", ch: "Google Play", code: "Mg3Xs7n", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Mg3Xs7n" },
    { country: "MY", flag: "🇲🇾", ch: "App Store", code: "Gn6Tk4p", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Gn6Tk4p" },
    { country: "MY", flag: "🇲🇾", ch: "KOL_Farahelia", code: "Ky7Rf3w", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Ky7Rf3w" },
    { country: "MY", flag: "🇲🇾", ch: "KOL_FezyraNesry", code: "Tn5Bx9j", url: "https://ma.dinoenglish.ai/website/landingpage/login/?channel=Tn5Bx9j" },
    { country: "MY", flag: "🇲🇾", ch: "默认", code: "Nc4Hs7m", url: "https://ma.dinoenglish.ai/website/landingpage/login/", isDefault: true },
    // ID
    { country: "ID", flag: "🇮🇩", ch: "Meta Ads", code: "Hv9Rn2w", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Hv9Rn2w" },
    { country: "ID", flag: "🇮🇩", ch: "Google Ads", code: "Lk5Jp8c", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Lk5Jp8c" },
    { country: "ID", flag: "🇮🇩", ch: "Snapchat", code: "Yd3Fq7h", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Yd3Fq7h" },
    { country: "ID", flag: "🇮🇩", ch: "KOL", code: "Nm6Wx4t", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Nm6Wx4t" },
    { country: "ID", flag: "🇮🇩", ch: "Google Play", code: "Ct8Bk9r", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Ct8Bk9r" },
    { country: "ID", flag: "🇮🇩", ch: "App Store", code: "Ps2Hn5v", url: "https://in.dinoenglish.ai/website/landingpage/login/?channel=Ps2Hn5v" },
    { country: "ID", flag: "🇮🇩", ch: "默认", code: "Jw8Dq3v", url: "https://in.dinoenglish.ai/website/landingpage/login/", isDefault: true },
    // SA
    { country: "SA", flag: "🇸🇦", ch: "Meta Ads", code: "Zr7Gx4d", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Zr7Gx4d" },
    { country: "SA", flag: "🇸🇦", ch: "Google Ads", code: "Uw5Tn8f", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Uw5Tn8f" },
    { country: "SA", flag: "🇸🇦", ch: "Snapchat", code: "Xb3Mq6s", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Xb3Mq6s" },
    { country: "SA", flag: "🇸🇦", ch: "KOL", code: "Fj9Cv2h", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Fj9Cv2h" },
    { country: "SA", flag: "🇸🇦", ch: "Google Play", code: "Dk4Np7w", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Dk4Np7w" },
    { country: "SA", flag: "🇸🇦", ch: "App Store", code: "Rv8Hs3m", url: "https://sa.dinoenglish.ai/website/landingpage/login/?channel=Rv8Hs3m" },
    { country: "SA", flag: "🇸🇦", ch: "默认", code: "Rx5Fp2n", url: "https://sa.dinoenglish.ai/website/landingpage/login/", isDefault: true }
  ],

  /* ---------------------------------------------------------------------- */
  /* 定价                                                                    */
  /* ---------------------------------------------------------------------- */
  pricing: [
    { country: "SA", flag: "🇸🇦", plan: "1-week", origin: "SAR 51.99", off: "10%", final: "SAR 46.79", best: false },
    { country: "SA", flag: "🇸🇦", plan: "1-month", origin: "SAR 174.99", off: "10%", final: "SAR 157.49", best: false },
    { country: "SA", flag: "🇸🇦", plan: "1-year", origin: "SAR 1,099.99", off: "20%", final: "SAR 879.99", best: true },
    { country: "KR", flag: "🇰🇷", plan: "1-week", origin: "KRW 20,000", off: "10%", final: "KRW 18,000", best: false },
    { country: "KR", flag: "🇰🇷", plan: "1-month", origin: "KRW 69,000", off: "10%", final: "KRW 62,100", best: false },
    { country: "KR", flag: "🇰🇷", plan: "1-year", origin: "KRW 430,000", off: "20%", final: "KRW 344,000", best: true },
    { country: "MY", flag: "🇲🇾", plan: "1-month", origin: "RM 166.50", off: "40%", final: "RM 99.90", best: true },
    { country: "MY", flag: "🇲🇾", plan: "1-year", origin: "RM 1,181.64", off: "45%", final: "RM 649.90", best: false },
    { country: "ID", flag: "🇮🇩", plan: "1-month", origin: "IDR 598,333", off: "40%", final: "IDR 359,000", best: true },
    { country: "ID", flag: "🇮🇩", plan: "1-year", origin: "IDR 4,890,909", off: "45%", final: "IDR 2,690,000", best: false }
  ],

  coupons: [
    { code: "dino10off", off: "优惠 10 美金", exp: "2026.8.30" },
    { code: "dino20off", off: "优惠 20 美金", exp: "2026.8.30" },
    { code: "dino30off", off: "优惠 30 美金", exp: "2026.8.30" },
    { code: "dino50off", off: "优惠 50 美金", exp: "2026.8.30" }
  ],

  /* ---------------------------------------------------------------------- */
  /* 退款                                                                    */
  /* ---------------------------------------------------------------------- */
  refund: {
    rules: [
      { cond: "购买后 ≤ 2 天", formula: "可退 = 实付金额", example: "第 1 天申请 → 退 99.90（100%）" },
      { cond: "购买后 > 2 天", formula: "可退 = 实付 × (剩余天数 / 总天数)", example: "第 10 天申请（月包 30 天）→ 99.90 × 20/30 = 66.60" },
      { cond: "使用 Coupon", formula: "以实付金额为基数", example: "券后价参与计算，券不退回" },
      { cond: "SKU 总天数", formula: "周包 7 · 月包 30 · 年包 365", example: "剩余天数 = 总天数 − 已购天数（下限 0）" }
    ],
    flow: [
      { who: "用户", act: "联系客服申请退款" },
      { who: "客服", act: "核实订单 · 计算可退金额 · 人工发起退款邮件" },
      { who: "直系领导", act: "审批确认（邮件 / 工单）" },
      { who: "技术", act: "取消 VIP 权益 · CRM Activated → Revoked" },
      { who: "财务", act: "审批并执行退费 · 支付网关 Refund API" },
      { who: "用户", act: "收到退款 · 对外口径 14 天内到账" }
    ]
  }
};
