# Dino English · Landing Page 三期 PRD

| 字段 | 内容 |
|---|---|
| 文档版本 | v1.0 |
| 状态 | 草稿 / 待评审 |
| 核心模块 | 1. 支付：马来本地支付（FPX、E-wallets）<br>2. 归因：FB、TK Pixel 注册与购买事件打点 |
| 参考文献 | `DinoAI_Malaysia_Local_Payments_PRD_v1.0.md` |

---

## 1. 背景与目标

### 1.1 背景
- **支付转化痛点**：目前马来西亚用户的 Web 结账仅支持 Visa/Mastercard，但当地用户更倾向于使用线上网银转账（FPX）或本地电子钱包（E-wallets）。缺乏本地支付方式导致了部分意向用户的流失。
- **投放归因痛点**：我们的落地页主要在 Facebook (Meta) 和 TikTok 渠道投放，目前缺少针对核心转化节点（注册、购买）的 Pixel 实时回传，导致广告平台无法进行深度转化优化 (CBO/VBO)，影响买量效率。

### 1.2 业务目标
1. **提升马来转化率**：接入 FPX 与 E-wallets，满足当地支付习惯。
2. **优化买量模型**：打通 FB 与 TK Pixel，将 Landing Page 核心转化（注册、购买）精准回传给广告平台，赋能机器自我学习，降低 CPA。

---

## 2. 功能范围

### 2.1 新增支付方式（马来西亚）
依托现有的 Airwallex 网关，在付款页面新增以下选项：
1. **FPX (Online Banking)**：对接马来西亚本地各大银行的实时网银支付。
2. **E-wallets (电子钱包)**：支持 Touch ‘n Go, Boost, GrabPay。

### 2.2 媒体 Pixel 归因（Landing Page）
在 Landing Page 中嵌入 Facebook Pixel 和 TikTok Pixel，覆盖以下核心转化事件：
1. **注册成功 (Registration)**：用户完成手机号验证码校验并登录成功后触发。
2. **购买成功 (Purchase)**：用户完成套餐支付，且后端验证成功后触发。

---

## 3. 马来本地支付详细方案

### 3.1 支付方式与 UX 交互

| 支付方式 | 用户体验 (UX) | 结算与限额 | 优先级 |
|---|---|---|---|
| **FPX<br>(Online Banking)** | **1. 展开银行列表**：用户点击 FPX 选项后，下方自动展开支持的网银列表（带银行 Icon）。<br>**2. 选择银行**：用户点击想要使用的银行（例如 Maybank2U）。<br>**3. 唤起支付**：用户点击底部 `Pay Now` 按钮，页面重定向至对应银行的网页登录端（如果手机装了该银行 App，通常会直接唤醒 App）。<br>**4. 银行端验证**：用户在银行界面完成账号密码或生物识别授权支付。<br>**5. 跳回校验**：支付成功或失败后，均自动跳回 DinoAI 落地页，页面展示 "Confirming payment..." 并等待后端确认结果后，跳转到支付成功页或提示失败。 | 仅限 MYR（马币）单次支付。 | P0 |
| **E-wallets**<br>(TNG, Boost, GrabPay) | **1. 选择钱包**：用户在支付方式列表中选中特定的电子钱包（如 Touch 'n Go）。<br>**2. 唤起 App**：点击 `Pay Now` 按钮后，不再要求选银行，直接通过底层协议 (App-switch) 唤醒手机中的 Touch 'n Go App。<br>**3. 钱包端验证**：用户在电子钱包内确认金额并输入支付密码/刷脸。<br>**4. 跳回校验**：与 FPX 类似，钱包会自动将用户抛回 DinoAI 落地页，展示 "Confirming payment..." 直至接收到成功 Webhook 后渲染支付成功页。| TBC，依据商户实体限制。 | P1 |

> **补充说明：**
> 1. **关于 PC 端**：目前业务场景**无 PC 端**，因此二期剔除了 PC 端的二维码扫码逻辑，仅保留移动端（Mobile Web）原生拉起 App 或重定向的流程。
> 2. **FPX 银行列表**：前端展示的银行列表必须通过 Airwallex 接口（`Get Available Methods`）**动态获取**以保证可用性。通常会包含马来西亚当地主流银行，例如：`Maybank2U`, `CIMB Clicks`, `Public Bank`, `RHB Now`, `Hong Leong Connect`, `AmBank` 等。

### 3.2 核心业务与订单流
本地支付的接入将复用当前 Airwallex `PaymentIntent` 模式：
1. **发起支付 (PaymentIntent)**：创建订单并调用 Airwallex 接口发起支付。获取返回的 `next_action` 决定跳端动作，状态置为 `PROCESSING`。
2. **状态轮询与前端展示**：由于都是移动端拉起，用户在银行/钱包完成授权返回落地页时，前端需展示 "Confirming payment..."（确认中）的状态并轮询后端。
3. **Webhook 鉴权与订单完结 (Idempotency)**：
   - **绝不**信任前端回调作为付款成功的直接依据。
   - 只有接收到 Airwallex 返回的 `SUCCEEDED` Webhook，或主动 Status Inquiry 确认为成功时，才将订单置为 `PAID` 并下发 VIP 权益。
4. **一期限制**：本次上线的 FPX 与 E-wallets 仅支持 **一次性购买 (One-time purchase)**，不支持连续包月代扣。

---

## 4. 媒体 Pixel 打点方案

为了让投放模型学习高质量用户，需要在 Landing Page 的全局 Header 中安装 FB Base Pixel 和 TK Base Pixel，并在特定节点触发 Standard Events。

### 4.1 事件映射表

| 业务动作 | FB Pixel 事件 | TikTok Pixel 事件 | 触发时机 & 判定条件 |
|---|---|---|---|
| **注册成功** | `CompleteRegistration` | `CompleteRegistration` | 用户在 Landing Page 输入手机号验证码，点击 Login 后，**接口返回登录/注册成功**的那一刻。 |
| **购买成功** | `Purchase` | `CompletePayment` | 用户支付完毕返回页面，**前端轮询接口确认订单已是 PAID 状态**，或支付成功页 (Success Page) 渲染时。 |

### 4.2 携带参数 (Payload) 规范
在触发购买事件时，为确保广告引擎能计算 ROAS（广告投入回报率），事件必须携带价值与币种参数。

#### A. 购买事件 (Purchase / CompletePayment) 必传参数
```javascript
// Facebook 示例
fbq('track', 'Purchase', {
  value: 166.50,         // 实际支付金额 (若有优惠券则为折后最终价)
  currency: 'MYR',       // 币种 (如 MYR, SAR, KRW)
  content_ids: ['7833'], // SKU ID
  content_type: 'product'
});

// TikTok 示例
ttq.track('CompletePayment', {
  value: 166.50,
  currency: 'MYR',
  contents: [
    {
      content_id: '7833',
      content_name: 'Monthly Plan',
      quantity: 1,
      price: 166.50
    }
  ],
  content_type: 'product'
});
```

#### B. 高级匹配 (Advanced Matching)
为了提升广告平台的事件匹配率 (Match Rate)，建议在触发 `CompleteRegistration` 和 `Purchase` 时，将用户的 Hashed Phone Number（经过 SHA-256 加密的手机号）一并传递给 Pixel 脚本。

---

## 5. 异常处理与边界场景

| 场景 | 当前状态 | 前端展示 | 后端处理 |
|---|---|---|---|
| **前端返回成功，Webhook 未到** | PROCESSING | 展示“确认付款中...”，前端开始轮询接口 | 不下发权益，直至 Webhook 到达或主动查单认定成功 |
| **前端已关闭页面，但付款已完成** | PAID | (用户不在页面) | Webhook 正常接收，正常下发 VIP 权益 |
| **用户在网银/钱包端主动取消** | CANCELLED | 落地页展示“支付已取消，请重试” | 置订单为 Cancelled，允许用户重试或选其他方式 |
| **二维码超时未扫** | EXPIRED | 展示“二维码已过期，请点击刷新” | 订单失效，需用户点击重新生成 PaymentIntent |
| **重复收到 Webhook** | PAID | 幂等操作，无影响 | 后端处理需做幂等 (Idempotent)，VIP 有效期不重复叠加 |
| **金额或币种篡改/不匹配** | REQUIRES_REVIEW | 提示“正在处理中”，转入客服处理 | 阻断发货，生成 Critical Exception，由人工核对账单 |

---

## 6. 验收标准 (Acceptance Criteria)

### 6.1 支付功能验证
- [ ] **FPX 流程**：用户选择 FPX，正确显示银行列表。提交后跳转测试网关授权成功，返回落地页展示支付成功，VIP 立即生效。
- [ ] **E-wallets 扫码流程 (Desktop)**：选择 Touch 'n Go 或 GrabPay，渲染出倒计时二维码。扫码支付成功后，PC 端页面自动轮询并跳转到成功页。
- [ ] **E-wallets 跳转流程 (Mobile)**：手机端选择支付，能触发 Redirect 或 App-switch 拉起对应的电子钱包进行支付验证。
- [ ] **异常防重**：模拟网关发送多次相同订单的 `SUCCEEDED` Webhook，用户 VIP 天数不被重复叠加。

### 6.2 媒体归因 Pixel 验证 (需使用 Pixel Helper 工具)
- [ ] **全局代码加载**：Landing Page 所有页面加载时，FB 与 TK 的 `PageView` 事件正常触发。
- [ ] **注册事件验证**：新手机号验证码输入并点击登录后，触发 FB `CompleteRegistration` 与 TK `CompleteRegistration`。
- [ ] **购买事件验证**：订单实际付款成功并跳转 Success Page 后，触发 FB `Purchase` 与 TK `CompletePayment`，且携带的 `value`、`currency`、`content_ids` 取值绝对正确（需注意是否有使用优惠码折价的情况）。
