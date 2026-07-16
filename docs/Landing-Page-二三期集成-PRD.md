# Dino English · Landing Page 二三期集成 PRD (含新增越南)

| 字段 | 内容 |
|---|---|
| 文档版本 | v2.0 (集成版) |
| 状态 | 评审中 |
| 核心模块 | 1. 货盘配置：渠道级动态 SKU 与优惠券/码配置（原二期）<br>2. 马来支付：新增 FPX 网银与本地电子钱包（原三期）<br>3. Pixel 归因：FB、TK 核心事件打点（原三期）<br>4. **市场拓维：新增越南 (VN) 落地页，支持越南手机号及国际信用卡** |

---

## 1. 背景与业务目标

在第一期落地页（沙特、韩国、印尼、马来）走通从「广告点击 → 注册/登录 → 付款 → App 账号打通」闭环的基础上，随着业务扩大，遇到了以下痛点，本期（二三期合并）旨在解决：

1. **精细化运营诉求**：当前一国只能有一套固定价格和套餐，无法为 KOL、不同广告渠道提供差异化货盘与专属折扣。
2. **支付转化瓶颈**：马来西亚用户极度依赖本土网银 (FPX) 和电子钱包，现有的单纯信用卡支付流失严重；同时业务计划开拓**越南市场**，需扩展对应入口与支付支持。
3. **精准买量归因**：缺少注册、购买环节的后端/前端 Pixel 回传，广告模型（FB/TK）无法深度学习，影响投流 ROAS。

---

## 2. 功能范围总览

本期系统级变更涉及四大核心模块：

1. **渠道货盘动态化 (CMS & C端)**：Landing Page（渠道码）→ 动态绑定 SKU → 绑定优惠券（比例/立减）→ 批量生成 `DINO****` 优惠码。
2. **马来本地支付 (C端 & 后端)**：接入 Airwallex 的马来 FPX (Online Banking) 与 电子钱包 (TNG, Boost, GrabPay) 支付。
3. **越南市场新增 (C端)**：新增越南落地页，支持 +84 手机号注册，支持国际卡（Visa/Mastercard）支付。
4. **媒体 Pixel 归因 (前端)**：在注册成功、购买成功节点，向 FB、TK 触发 Standard Events。

---

## 3. 核心模块一：渠道级货盘与优惠配置

一期为“按国家固定套餐”，本期升级为**“按 Landing Page 渠道码动态下发”**。

### 3.1 数据模型与约束

```text
LandingPage (渠道码) ─── N 个 SKU ─── N 张优惠券 (互斥: 百分比/立减) ─── N 个优惠码
```

*   **Landing Page 绑定**：每个渠道码必须绑定一组有序的 SKU 列表。如果 C 端访问了无效渠道码，需**回落展示该国的默认 LP 货盘**。
*   **SKU 配置**：套餐含原价、币种、有效期。同 LP 内至多允许 1 个 SKU 标为 `Best Value`。
*   **优惠券 (Coupon)**：
    *   挂载在特定 SKU 下。
    *   支持**百分比**（如 10%）或 **立减**（如 -20），两者强制互斥。折后价不得 ≤ 0。
*   **优惠码 (Promo Code)**：
    *   由运营在管台指定数量，系统批量生成。规则：前缀 `DINO` + 4 位随机数字（排重）。
    *   C 端输入兑换码时，**必须匹配当前选中的 SKU**，否则提示 `Incorrect promotion code`。

### 3.2 管台 (CMS) 需求
1. **SKU 与券管理**：新建、编辑、上下架，支持按国家筛。
2. **生成与导出**：一键生成优惠码，支持导出 CSV。
3. **LP 关联配置**：勾选渠道码与对应的 SKU 列表，预览展示效果。

---

## 4. 核心模块二：越南市场拓维 (新增)

全面复用前四国的交互流程（从广告落地 → 手机号注册 → 选套餐 → 填优惠码 → 支付），主要进行底层能力的扩充。

### 4.1 支持越南手机号注册
*   **国家码与区号**：注册页国家下拉列表新增**越南 (Vietnam)**，对应国际区号 **`+84`**。
*   **验证与防刷**：复用现有的 App / Web 发送短信接口，验证码随意输入 4 位（测试环境）或接入真实网关，倒计时 60s 逻辑不变。

### 4.2 越南支付方式支持
*   **国际化银行卡 (Bank Card)**：越南本地暂不接独立网关，**直接复用并支持国际银行卡支付 (Visa, Mastercard 等)**。
*   **货币呈现**：基于 CMS 配置越南站对应 SKU，前端展示币种通常为 VND（越南盾）或 USD，随配置下发。

---

## 5. 核心模块三：支付方式扩充 (马来 FPX & E-wallets)

在马来西亚 (MY) 站点，补充原生本地支付（仅限 Mobile 端，一次性购买）。

### 5.1 UX 交互与动态渲染

| 支付方式 | 用户体验 (UX) | 特别注意 (开发必看) |
|---|---|---|
| **FPX<br>(Online Banking)** | **1. 展开银行列表**：选中 FPX 后，下方内联展开支持的具体银行列表。<br>**2. 选中并支付**：选中如 Maybank2U 后点 Pay Now。<br>**3. 网银验证**：重定向至网银认证页面完成打款。<br>**4. 回跳**：返回 DinoAI 落地页展示“Confirming payment...”。 | **前端不可写死银行列表与图标**。必须调用 Airwallex `Get Available Methods` 接口动态获取可用 `bank_list` 和 `logo_url`。若某银行深夜维护，网关不返回，前端就不展示；图标加载失败需有默认银行 Icon 兜底。 |
| **E-wallets**<br>(TNG, Boost, GrabPay) | **1. 选择钱包**：列表中点击对应钱包。<br>**2. 直接唤起 App**：点击 Pay Now 后，通过底层重定向 (Redirect) 或 App-switch (跳转)，**直接拉起用户手机里的电子钱包 App**。<br>**3. 回跳**：支付完毕自动切回浏览器页面确认状态。 | 本期业务**无 PC 端**扫码场景，仅支持纯移动端环境的唤起/跳转。 |
| **Bank Card** | (越南及其他国家主用) 直接拉起信用卡输入表单或重定向至银行卡网关。 | |

### 5.2 核心订单流与安全性
依托 Airwallex `PaymentIntent` 模式：
1. **订单生成**：业务库生成唯一订单，再去网关生成 PaymentIntent，拿到 `next_action` (拉起或跳转)。
2. **防篡改与 Webhook**：**严禁信任前端跳回页面的支付结果**。只有在接收到 Airwallex 推送的验证过的 `SUCCEEDED` Webhook 时，或主动查询状态为成功时，才将订单置为 `PAID` 并**唯一一次下发 VIP 权益**。
3. **异常处理**：若回跳后 Webhook 延迟，前端须保持轮询并提示用户处理中；若金额、币种不符，标记 `REQUIRES_REVIEW`，截断发货并人工介入。

---

## 6. 核心模块四：媒体 Pixel 归因打点

在全局 Header 中部署 FB Base Pixel 与 TK Base Pixel。主要针对两大高价值转化节点：

### 6.1 注册成功 (CompleteRegistration)
*   **触发时机**：用户输入正确手机号验证码，点击 Login，且**接口返回注册/登录成功**时。
*   **动作**：
    *   Facebook: `fbq('track', 'CompleteRegistration')`
    *   TikTok: `ttq.track('CompleteRegistration')`

### 6.2 购买成功 (Purchase)
*   **触发时机**：从第三方支付跳回落地页，前端轮询到订单为 `PAID`，渲染 Payment Success 页面时。
*   **传递参数 (关键)**：必须动态传入金额以支持 ROAS 优化，金额为**券后实付金额**。

**代码示例**：
```javascript
// Facebook Pixel 示例
fbq('track', 'Purchase', {
  value: 166.50,         // 【必填】实付金额 (若用券为券后价)
  currency: 'MYR',       // 【必填】结算币种 (如 MYR, VND, SAR 等)
  content_ids: ['7833'], // 【必填】购买的 SKU ID
  content_type: 'product'
});

// TikTok Pixel 示例
ttq.track('CompletePayment', {
  value: 166.50,
  currency: 'MYR',
  contents: [
    {
      content_id: '7833',
      quantity: 1,
      price: 166.50
    }
  ],
  content_type: 'product'
});
```
*注：有条件建议额外透传 Hashed Phone Number 做高级匹配 (Advanced Matching) 以提高数据命中率。*

---

## 7. 验收标准 (Acceptance Criteria)

### 7.1 配置端与 C 端货盘
- [ ] 运营可创建带有效期的 SKU，可绑定互斥折扣券，可批量导出专属优惠码。
- [ ] 不同渠道码进入落地页，能呈现各自绑定的专属货盘。无效渠道回落国家默认盘。
- [ ] **交叉验证**：跨 SKU 使用不属于该 SKU 的优惠码，系统准确抛出 `Incorrect promotion code`。

### 7.2 越南新增 (VN)
- [ ] 国家下拉列表新增越南 `+84`，验证码接收及注册流跑通。
- [ ] 越南渠道能看到配置的越南 SKU 货盘（币种、金额正确）。
- [ ] 越南站可通过 Bank Card (Visa/Mastercard) 正常调起付款并完单发货。

### 7.3 马来本地支付 (MY)
- [ ] **FPX 银行列表**：验证渲染的银行列表来自于 Airwallex 接口实时的返回数据（包含 Name 与 Logo URL）。
- [ ] **E-wallets 跳转**：移动端选择 TNG，提交后能原生唤起本地 Touch 'n Go App。
- [ ] **安全发货**：模拟伪造前端支付成功请求，系统未收到 Webhook 拒绝发货；正常 Webhook 下精确发放一次 VIP 天数。

### 7.4 数据归因 (Pixel)
- [ ] 使用 FB / TK Pixel Helper 插件。
- [ ] 注册成功后，插件正确捕获 `CompleteRegistration`。
- [ ] 付款成功后，插件捕获 `Purchase`/`CompletePayment`，且 `value` 字段精确等于用户真实扣款金额（折后），`content_ids` 匹配。
