# Dino English · Landing Page 二三期集成 PRD

| 字段 | 内容 |
|---|---|
| 文档版本 | v2.0 |
| 状态 | 方案中 |
| 关联一期 | [Dino English - Landing page (sa_kr_in_my)](../index.html) |
| 覆盖国家 | 沙特 (SA) / 韩国 (KR) / 印尼 (IN) / 马来 (MY) / **越南 (VN)** |
| 二三期目标 | 1. **渠道级灵活配置化**：同一国家不同渠道可绑定不同 SKU 与优惠力度<br>2. **支付方式拓维**：新增越南本地银行转账 (Bank Transfer) 及特殊收款模式 (Deposit/Installment)<br>3. **马来支付拓维**：新增 FPX 网银及本地电子钱包 |

---

## 1. 背景与问题

### 1.1 一期能力（已具备）

一期落地页已打通完整获客链路：

```
广告点击 → Landing（国家域名 + 渠道码）→ 注册/登录 → 套餐选择 → 优惠码 → 支付 → VIP 生效 → App 打通
```

一期关键能力回顾：

- 四国独立站点（`sa/kr/in/ma.dinoenglish.ai`）+ 7 位渠道码归因
- 按**国家**展示固定套餐与价格
- 用户可手动输入优惠码；优惠码支持多人兑换、限时有效
- App / Web 账号互通、VIP 发放、退款与埋点闭环

### 1.2 一期瓶颈

一期配置粒度停在「国家」层：

| 维度 | 一期现状 | 业务痛点 |
|---|---|---|
| SKU | 一国一套套餐表 | Meta / Google / KOL 等渠道无法差异化卖货 |
| 优惠 | 优惠码与渠道弱关联 | 同一国家只能统一折扣，难做渠道专属力度 |
| 投放 | 渠道码仅用于归因 | 无法按渠道切换展示的 SKU 组合 |
| 运营 | 改价 / 改券偏硬编码 | 上新渠道、调折扣依赖研发发版 |

### 1.3 二期要解决什么

> **同一国家、不同渠道，需要支持不同的 SKU 组合与优惠力度。**

配置关系（核心）：

```
Landing Page（≈ 渠道码）
    └── 绑定 N 个 SKU
            └── 每个 SKU 绑定 N 张优惠券（不同折扣力度）
                    └── 每张优惠券可生成 N 个优惠码
```

---

## 2. 目标与非目标

### 2.1 目标

1. **渠道级货盘配置**：每个 Landing Page（由渠道码唯一标识）可独立绑定 SKU 列表。
2. **SKU 级优惠配置**：每个 SKU 可绑定多张优惠券；折扣力度按券配置（百分比 / 立减二选一）。
3. **券码批量生成**：每张优惠券可生成多个优惠码（规则：`DINO` + 四位随机数）。
4. **运营可配置**：后台可完成 SKU / 券 / 码 / 绑定关系的增删改查，无需发版。
5. **兼容一期体验**：C 端主流程不变；仅「展示哪些货、可用哪些券」按配置动态下发。
6. **【三期新增】越南市场与支付拓维**：支持越南 (VN) 的落地页，并新增接入 **本地银行转账 (Bank Transfer)**，同时探索 Deposit（定金）与 Installment（分期）的支付模式。
7. **【三期新增】马来支付拓维**：新增 FPX 网银及本地电子钱包（Touch 'n Go 等）。

### 2.2 非目标（本次不做）

- 不改一期登录 / 第三方 OAuth / 支付方式 / 退款公式 / VIP 叠加规则
- 不做 A/B 实验框架（同一渠道多版本货盘）
- 不做自动发券到用户账户（仍为用户输入优惠码模式）
- 不做跨国家 SKU 复用（SKU 归属单一国家）

---

## 3. 角色与术语

| 术语 | 定义 |
|---|---|
| **Landing Page (LP)** | 一次投放落地入口，与**渠道码 1:1**。URL 形如 `https://{country}.dinoenglish.ai/.../?channel={code}` |
| **渠道码 (Channel Code)** | 7 位唯一码，映射「国家 + 广告渠道」。规则同于一期 |
| **SKU** | 可售卖套餐单元（周包 / 月包 / 年包等），含原价、币种、有效期、Best Value 标记 |
| **优惠券 (Coupon)** | 折扣策略实体：百分比折扣 **或** 立减金额（互斥），绑定到具体 SKU |
| **优惠码 (Promo Code)** | 用户输入的兑换码；隶属于某张优惠券；一张券可有多个码 |
| **绑定** | 配置关系：LP↔SKU、SKU↔Coupon、Coupon↔PromoCode |

---

## 4. 信息架构与数据模型

### 4.1 实体关系

```
Country 1 ─── N Channel
Channel 1 ─── 1 LandingPage（channel_code）
LandingPage 1 ─── N SKU          （货盘）
SKU 1 ─── N Coupon               （该 SKU 可用的优惠策略）
Coupon 1 ─── N PromoCode         （对外发放的码）
```

### 4.2 字段定义

#### 4.2.1 SKU

| 字段 | 类型 | 说明 | 示例 |
|---|---|---|---|
| sku_id | string(4) | 四位随机数，全局唯一 | `7827` |
| country | enum | SA / KR / IN / MY | `SA` |
| name | string | 套餐名称 | 周包 / 月包 / 年包 |
| origin_price | decimal | 原价（展示划线价） | `51.99` |
| currency | string | 币种 | `SAR` / `KRW` / `RM` / `IDR` |
| duration_days | int | VIP 天数 | 7 / 30 / 365 |
| valid_from / valid_to | datetime | SKU 可售时间窗 | `2026-07-15 00:00` — `2026-07-30 23:59` |
| best_value | bool | 是否 Best Value（同 LP 货盘内至多 1 个为 true） | `true` |
| status | enum | on / off | `on` |

#### 4.2.2 优惠券 (Coupon)

| 字段 | 类型 | 说明 | 示例 |
|---|---|---|---|
| coupon_id | string(4) | 四位随机数 | `6666` |
| sku_id | string | 所属 SKU | `7827` |
| name | string | 运营可读名称 | `26年6月韩国新客折扣券` |
| discount_type | enum | `percent` \| `fixed`（互斥） | `percent` |
| discount_value | decimal | 10 = 10% 或立减 10（依 type） | `10` |
| valid_from / valid_to | datetime | 券有效期 | — |
| status | enum | on / off | `on` |

**校验规则：**

- `percent` 与 `fixed` 不可同时配置
- `percent` 取值范围建议 1–99
- `fixed` 必须 < 所属 SKU 原价，且 > 0
- 折后价 = 原价 × (1 − percent/100) **或** 原价 − fixed；结果不得 ≤ 0

#### 4.2.3 优惠码 (Promo Code)

| 字段 | 类型 | 说明 | 示例 |
|---|---|---|---|
| promo_code | string | 对外码，全局唯一 | `DINO3356` |
| coupon_id | string | 所属优惠券 | `6666` |
| gen_rule | — | 固定：`DINO` + 四位随机数 | — |
| status | enum | unused / active / disabled / expired | `active` |
| redeem_limit | int / null | 可兑换次数上限；null = 不限（一期「一码多人」） | `null` |
| redeem_count | int | 已兑换次数 | `12` |

**生成规则：**

1. 前缀固定 `DINO`（大小写策略：入库统一大写；校验时大小写不敏感）
2. 后缀：四位数字随机（`0000–9999`），碰撞则重试
3. 支持一次批量生成 N 个（N 由运营指定，建议上限 500/次）

#### 4.2.4 Landing Page 绑定

| 字段 | 类型 | 说明 | 示例 |
|---|---|---|---|
| lp_id | string | LP 标识 | `SA-LP-1` |
| country | enum | 国家 | `SA` |
| channel_name | string | 广告渠道名 | `Meta Ads` |
| channel_code | string(7) | 渠道码（一期规则） | `Zr7Gx4d` |
| sku_ids | list | 本 LP 可售 SKU 列表（有序，决定前端展示顺序） | `[7827,7828,7829]` |
| status | enum | on / off | `on` |

---

## 5. 配置规则（业务约束）

### 5.1 绑定规则

| # | 规则 | 说明 |
|---|---|---|
| R1 | LP → SKU：一对多 | 一个 LP 至少绑定 1 个 SKU；可只绑 1 个（单品投放） |
| R2 | SKU 可被多个 LP 复用 | 例：沙特 Snapchat / KOL 共用同一组 SKU |
| R3 | SKU → Coupon：一对多 | 同一 SKU 可挂多张不同力度的券 |
| R4 | Coupon 归属单一 SKU | 券不可跨 SKU 使用；校验码时必须匹配当前选中 SKU |
| R5 | Coupon → PromoCode：一对多 | 一张券可批量生成多个码 |
| R6 | 同 LP 内 Best Value ≤ 1 | 若多个 SKU 标 Best Value，以前台配置的第一个为准并告警 |
| R7 | 渠道码全局唯一 | 同于一期；新建 LP 时生成或选定渠道码 |

### 5.2 渠道差异化场景（必须支持）

来自二期示意表，系统需覆盖三类场景：

| 场景 | 含义 | 示例（沙特） |
|---|---|---|
| A. 渠道不同、SKU 不同 | 不同渠道卖不同货盘 | Meta：周/月/年三件套；Google Ads：仅周包 `7827` |
| B. 渠道不同、SKU 相同 | 归因分开，货盘一致 | Snapchat / KOL / 商店渠道共用同一组 SKU |
| C. 渠道不同、优惠力度不同 | 同一 SKU，不同渠道挂不同券/码 | 年包在 Meta 挂 20% 券，在 KOL 挂立减券 |

### 5.3 示意配置（仅举例）

#### SKU × 优惠券

| 国家 | SKU ID | 名称 | 原价 | Best Value | 券 ID | 折扣类型 | 力度 | 优惠码 |
|---|---|---|---|---|---|---|---|---|
| 沙特 | 7827 | 周包 | SAR 51.99 | — | 6666 | 百分比 | 10% | 可生成多个 `DINO****` |
| | | | | | 6667 | 立减 | 20 | 同上 |
| | | | | | 6668 | 百分比 | 20% | 同上 |
| | | | | | 6669 | 立减 | 50 | 同上 |
| 沙特 | 7828 | 月包 | SAR 174.99 | — | 6670 | 百分比 | 10% | |
| 沙特 | 7829 | 年包 | SAR 1099.99 | ✓ | 6671 | 百分比 | 20% | |
| 韩国 | 7830–7832 | 周/月/年 | KRW … | 年包 ✓ | 6672–6674 | 百分比 | 10%/10%/20% | |
| 马来 | 7833–7834 | 月/年 | RM … | 月包 ✓ | 6675–6676 | 百分比 | 40%/45% | |
| 印尼 | 7835–7836 | 月/年 | IDR … | 月包 ✓ | 6677–6678 | 百分比 | 40%/45% | |

#### 渠道 × SKU × LP

| 国家 | 渠道 | 渠道码 | 绑定 SKU | LP 说明 |
|---|---|---|---|---|
| 沙特 | Meta Ads | `Zr7Gx4d` | 7827, 7828, 7829 | LP-1：完整货盘 |
| 沙特 | Google Ads | `Uw5Tn8f` | 7827 | LP-2：渠道不同，SKU 不同 |
| 沙特 | Snapchat | `Xb3Mq6s` | 7827 | LP-3：渠道不同，SKU 相同 |
| 沙特 | KOL / GP / AS / 默认 | … | 同左或按运营配置 | LP-4~7 |
| 韩国 | 各渠道 | … | 7830, 7831, 7832 | 默认完整货盘 |
| 马来 | Meta / KOL | … | 7833 | 侧重月包 |
| 马来 | Google / Snap / 商店 / KOL_* | … | 7834 | 侧重年包 |
| 印尼 | Meta | … | 7835, 7836 | 双 SKU |
| 印尼 | 其他渠道 | … | 7835 或 7836 | 单 SKU 投放 |

> 完整渠道码表沿用一期；二期在既有渠道码上**追加 SKU 绑定**，不重建渠道体系。

---

## 6. 功能需求

### 6.1 管台 / CMS（配置端）— 核心交付

#### F1. SKU 管理

- 新建 / 编辑 / 上下架 SKU
- 字段见 §4.2.1；`sku_id` 系统生成（四位随机，可手工覆盖但需唯一）
- 列表支持按国家、状态筛选

#### F2. 优惠券管理

- 在指定 SKU 下新建优惠券
- 选择折扣类型（百分比 / 立减），互斥校验
- 上下架；过期自动不可用

#### F3. 优惠码生成与管理

- 在指定优惠券下「生成优惠码」：输入数量 → 批量生成 `DINO` + 四位随机数
- 列表展示：码、所属券、兑换次数、状态
- 支持单个禁用；支持导出 CSV（供投放 / KOL 分发）

#### F4. Landing Page 绑定

- 选择国家 + 渠道（或已有渠道码）→ 勾选可售 SKU（有序）
- 预览：该 LP 前端将展示的套餐列表 + 默认 Best Value
- 保存后立即生效（或按「定时生效」字段，二期可选）

#### F5. 配置校验与防呆

- LP 未绑定任何 SKU → 禁止上架，C 端走国家默认货盘或报错页（产品需二选一，**建议：回落国家默认 LP**）
- 优惠码校验失败原因可在管台日志查看
- 删除 SKU 前检查是否仍被 LP 引用；有引用则禁止硬删，仅允许下架

### 6.2 C 端 Landing Page（消费端）— 变更点

一期流程不变，以下为差分：

| 步骤 | 一期 | 二三期变更 |
|---|---|---|
| 进入 LP | 按国家域名加载固定套餐 | 解析 `channel` → 查询该 LP 绑定的 SKU 列表 |
| 套餐页 | 展示国家全量套餐 | **仅展示本 LP 绑定的 SKU**；默认选中 Best Value |
| 优惠码页 | 校验码是否存在/未过期 | **额外校验：码所属券必须绑定当前选中 SKU**；否则提示 `Incorrect promotion code` |
| 价格计算 | 原价 − 优惠 | 按券的 percent / fixed 计算；如果是定金(Deposit)模式，前端重新计算今日应付金额。 |
| 支付方式选择 | 仅支持国际信用卡 | 根据国家下发支持的支付方式。**越南新增**：`Bank Transfer` / `Installment` / `Deposit` / `Visa` / `Mastercard`。 |
| 支付动作 | 调起卡支付网关 | **【新增】Bank Transfer / Installment / Deposit 逻辑**：不调起卡网关，而是跳转至「转账指引页」，展示收款虚拟账号与 Reference Code。 |
| 支付 / 成功 | 收到 Webhook 发放 VIP | 新增**异步 Webhook 监听机制**（针对银行转账）。收到 `succeeded` 通知后系统才发放 VIP；遇到金额多转/少转触发异常流处理。 |

#### 优惠码校验伪逻辑

```
input code → normalize(upper)
→ find PromoCode
→ if not found / disabled / expired → toast Incorrect / expired
→ Coupon = code.coupon
→ if Coupon.sku_id ≠ selected_sku_id → toast Incorrect promotion code
→ if Coupon / SKU / LP offline → toast Incorrect promotion code
→ apply discount → show saved amount
```

#### 无优惠码

行为同一期：只展示套餐名 + 原价合计。

### 6.3 越南本地银行转账 (Bank Transfer) 核心流程设计

基于 Airwallex 的底层能力，我们在收银台需新增以下交互与系统逻辑以支持越南（以及未来的其他国家）本地银行转账：

#### 6.3.1 支付方式与计价选择 (C端)
越南市场的 `Payment Method` 列表将细分为以下选项：
- **Bank Transfer (全款银行转账)**：用户支付订单全额。
- **Installment (分期银行转账)**：系统自动将订单金额除以期数（如3期），今日应付金额 (`Due Today`) 更新为首期金额。
- **Deposit (定金锁定)**：系统将今日应付金额强制定为 `VND 50,000`。
- **Visa / Mastercard**：传统的国际信用卡代扣。

#### 6.3.2 生成转账指引页 (C端 & 后端)
当用户选择上述前三种（基于银行转账的模式）并点击 Pay Now 时：
1. **创建 Payment Intent**：后端向 Airwallex 发起 `bank_transfer` 类型的 Payment Intent（如果是 Installment 或 Deposit，金额按首付/定金传给 Airwallex）。
2. **展示 Transfer Instructions 页面**：页面不跳出系统，而是展示 Airwallex 返回的收款信息，包括：
   - Transfer Amount (转账金额，必须精确)
   - Bank Name (如 Vietcombank)
   - Account Name (如 DINO ENGLISH PTE LTD)
   - Account Number (唯一虚拟账号)
   - **Reference Code (自定义的对账参考码，如 DINO-XXXXX)**，并强提示用户在打款备注中填写。
3. 用户去自己的手机银行完成打款，并点击“I have transferred”进入等待/成功页。

#### 6.3.3 Webhook 异步对账与发货 (后端)
银行转账是强异步流程，系统必须通过监听 Airwallex 的 Webhook 来判断是否发货：
- **精确匹配 (`succeeded`)**：用户转了精确的金额。系统根据订单中的模式发货：
  - 如果是全款/首期分期：立刻发放约定时间的 VIP。
  - 如果是定金 (Deposit)：根据业务确认的规则（发短期 VIP 体验卡 或 暂不发货仅留存名额）。
- **金额不匹配处理**：
  - 用户多转了钱：依然视为 `succeeded`，后台可记录退款差价工单。
  - 用户少转了钱：触发 `requires_payment_method`，订单判定为未结清（失败/异常），前端或通过邮件提醒用户继续补差价，不发放会员。

### 6.4 数据与 CRM

- 订单入库字段在一期基础上增加：`sku_id`、`coupon_id`、`promo_code`、`discount_type`、`discount_value`、`origin_price`、`final_price`、`channel_code`、`lp_id`
- 用户表继续记录渠道码；管台可按渠道 / SKU / 券码维度筛订单

### 6.4 埋点差分

在一期漏斗上补充参数（不改事件名）：

| 事件 | 新增 / 强调参数 |
|---|---|
| `page_view` / `login` | `channel_code`, `lp_id` |
| `view_item_list`（套餐曝光） | `sku_ids[]` |
| `select_item` | `sku_id` |
| `apply_promo` | `promo_code`, `coupon_id`, `result` |
| `purchase` | `sku_id`, `coupon_id`, `promo_code`, `origin_price`, `final_price`, `channel_code` |

---

## 7. 异常与边界

| 场景 | 处理 |
|---|---|
| 渠道码无效 / 缺失 | 走该国「默认」渠道 LP 货盘（一期默认码） |
| LP 绑定的 SKU 全部过期或下架 | 展示空态 + 客服引导；或回落默认 LP（需产品确认，建议回落） |
| 用户切换套餐后已应用的码不适用于新 SKU | 自动清除优惠，提示重新输入 |
| 优惠码兑换次数达上限 | toast：`Incorrect promotion code`（不暴露库存，防刷）或独立文案（可选） |
| 并发生成优惠码碰撞 | 服务端重试直至唯一 |
| 百分比与立减同时提交 | 接口 400，前端互斥禁用 |

---

## 8. 权限与发布

| 角色 | 权限 |
|---|---|
| 运营 / 业务 | SKU / 券 / 码 / LP 绑定的读写 |
| 管台研发 | 全量 + 渠道码生成 |
| 只读分析 | 配置与订单只读 |

发布策略建议：

1. 先灰度一国（建议马来或印尼单 SKU 渠道）验证绑定链路
2. 再放开四国全量渠道
3. 一期硬编码价格表下线条件：四国默认 LP 均已完成配置且验收通过

---

## 9. 验收标准（Acceptance Criteria）

### 9.1 配置端

- [ ] 可为任意国家创建 SKU，并设置原价、有效期、Best Value
- [ ] 可在 SKU 下创建优惠券，百分比 / 立减互斥生效
- [ ] 可为一张券批量生成 ≥ 2 个 `DINO****` 优惠码，码全局唯一
- [ ] 可为渠道码绑定不同 SKU 列表；支持「同 SKU 不同渠道」「不同 SKU 不同渠道」两种配置
- [ ] 导出优惠码 CSV 可用

### 9.2 C 端

- [ ] 同一国家两个不同渠道码，进入套餐页看到的 SKU 列表可不同（对照沙特 Meta vs Google 示意）
- [ ] 选中 SKU A 时，仅 SKU A 下绑定的优惠码可核销成功
- [ ] 用 SKU B 的码套在 SKU A 上 → 失败 toast
- [ ] 无码购买路径仍可用；有码路径展示原价 / 立减 / 合计正确
- [ ] 支付成功订单含 `sku_id` + `promo_code` + 原价/折后价

### 9.3 兼容

- [ ] 一期默认渠道码仍可完成完整购买
- [ ] 登录、支付方式、VIP 发放、退款规则与一期一致

---

## 10. 与一期文档的边界对照

| 模块 | 一期 | 二期 |
|---|---|---|
| 注册 / 登录 | ✅ 完整定义 | 不变 |
| 支付方式 | ✅ 按国 | 不变 |
| 支付成功 / 复访 | ✅ | 不变 |
| 退款 | ✅ | 不变 |
| 渠道码生成规则 | ✅ | 复用；增加 SKU 绑定 |
| 套餐定价 | 按国静态表 | **改为 LP 动态货盘** |
| 优惠码 | 全局码表示意 | **券 → 多码，且绑定 SKU** |
| 管台配置 | 弱 / 偏导出 | **SKU / 券 / 码 / LP 绑定为正式能力** |

---

## 11. 开放问题（需评审拍板）

1. **默认回落策略**：无效渠道 / 空货盘时，回落国家默认 LP，还是展示错误页？
2. **优惠码失败文案**：跨 SKU 误用是否统一「Incorrect」，还是单独「Not valid for this plan」？
3. **SKU 有效期 vs 券有效期**：取交集，还是以券为准、SKU 仅控可售？
4. **Best Value 冲突**：同 LP 多个 Best Value 时，前端选第一个还是强制配置校验拦截保存？
5. **二期是否包含「自动带入优惠码」**（URL `?promo=DINO3356`）？当前默认不做，可作二期+。

---

## 12. 里程碑建议

| 阶段 | 内容 | 产出 |
|---|---|---|
| M1 | 数据模型 + 管台 CRUD（SKU / 券 / 码） | 可配置、可导出 |
| M2 | LP ↔ SKU 绑定 + C 端动态货盘 | 渠道差异化卖货可用 |
| M3 | 优惠码按 SKU 校验 + 订单字段补齐 + 埋点 | 完整优惠闭环 |
| M4 | 四国全量迁移 + 一期静态表下线 | 二期正式接量 |
| M5 | 越南市场 Bank Transfer / Installment / Deposit 上线 | 支持本地大额支付转化 |
| M6 | 马来 FPX 及 E-wallets 上线 | 马来支付拓维完成 |

---

## 13. 待业务确认清单 (Action Items)

在进入实质性开发前，必须由业务/财务团队确认以下细节规则：

1. **Installment (分期) 的底层实现方式**：
   - 是让用户按月手动进行**银行转账**？（会有高坏账和人工催收成本）。
   - 还是接入类似 Atome / SPayLater 等第三方 **BNPL 平台**一键免密分期？（*💡 排期建议：纯技术开发只需 1~2 周即可复用 Airwallex 逻辑。但商务合规开通通常需 2~4 周。需财务立刻确认新加坡主体能否开通越南 BNPL 及对应费率。*）
2. **Deposit (定金) 后的发货与关停规则**：
   - 用户交了定金（如 5 万 VND）后，系统立刻给他发几天会员？还是不发会员仅保留名额？
   - 规定用户最迟必须在几天内付清尾款？超时了定金退不退？

---

## 附录 A · 优惠计算示例

| 场景 | 原价 | 券 | 折后 |
|---|---|---|---|
| 沙特周包 + 10% | SAR 51.99 | percent 10 | SAR 46.79 |
| 沙特周包 + 立减 20 | SAR 51.99 | fixed 20 | SAR 31.99 |
| 马来月包 + 40% | RM 166.50 | percent 40 | RM 99.90 |
| 印尼年包 + 45% | IDR 4,890,909 | percent 45 | IDR 2,690,000 |

## 附录 B · 核心参考来源与对接文档

- 一期 PRD：`后期规划文档 / Dino English - Landing page (sa_kr_in_my)`
- 二期配置草稿：`后期规划文档 / Landing Page-二期.md`
- 越南/马来本地支付需求源：`后期规划文档 / DinoAI_Malaysia_Local_Payments_PRD_v1.0.md`
- 一期交互式 PRD：仓库 `prototype.html`
- **Airwallex 官方开发文档：** 
  - [Accept bank transfer payments - Airwallex Docs](https://www.airwallex.com/docs/payments/payment-methods/global/bank-transfer/accept-bank-transfer-payments) （用于指导后端对接越南 NAPAS 银行转账及 Webhook 回调处理）
