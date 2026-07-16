# DinoAI\_Malaysia\_Local\_Payments\_PRD\_v1\.0



**PRODUCT REQUIREMENTS DOCUMENT**

**Malaysia Local Payment Methods**
**for DinoAI Web Checkout**

FPX • BNPL • DuitNow QR • E\-wallets




|**Field**|**Detail**|
|---|---|
|Version|1\.0|
|Status|Draft for Cross\-functional Review|
|Document Owner|Product Management – Growth \& Payments|
|Target Market|Malaysia|
|Merchant Entity|Singapore entity \(current state\)|
|Gateway|Airwallex|
|Last Updated|15 July 2026|
|Priority Sequence|P0 FPX; P1 BNPL; P2 DuitNow QR; P3 E\-wallets|



|**Decision required before development**<br>Confirm which requested payment methods are commercially and technically available to DinoAI’s Singapore merchant entity, the settlement currency for each method, and whether additional Airwallex onboarding is required\.|
|---|



---

# 1\. Document Control

|**Item**|**Details**|
|---|---|
|Product|DinoAI / Dino English|
|PRD Title|Enable Malaysia Local Payment Methods on Existing Web Checkout|
|Version|1\.0|
|Status|Draft|
|Owner|Product Management|
|Reviewers|Engineering, QA, UX, Finance, Operations, Customer Support, Data, Legal/Compliance, Airwallex|
|Approvers|Business Owner, Head of Engineering, Finance Owner|
|Target Launch|Phased rollout; dates to be confirmed after provider enablement|
|Related Systems|Web checkout, identity/UID, order service, payment service, subscription entitlement, CRM/admin, analytics, reconciliation|



# 2\. Executive Summary

DinoAI currently accepts Visa and Mastercard payments through an existing Airwallex API integration on its web checkout\. This creates a conversion constraint for Malaysian parents who prefer online banking, QR, e\-wallets, or instalment products\. The proposed change extends the existing checkout to local Malaysian payment methods while preserving DinoAI’s current UID, order, payment confirmation, and Premium entitlement architecture\.

- P0: FPX / online banking through supported Malaysian banks\.

- P1: BNPL through SPayLater and Atome\. Grab PayLater is excluded from committed scope until provider support is confirmed; Airwallex currently states that PayLater by Grab is not available\.

- P2: DuitNow QR, subject to entity and bank availability constraints\.

- P3: Touch ‘n Go eWallet, Boost, and GrabPay e\-wallet\.

- All methods are one\-time purchases for MVP\. Recurring charging is out of scope unless separately confirmed and approved\.

|**Recommended architecture**<br>Reuse the existing Airwallex PaymentIntent and webhook pattern\. Extend the payment\-method selection, PaymentIntent confirmation payload, state handling, device\-specific redirect/QR behaviour, analytics, reporting, and operational controls\. Do not create a separate payment platform for each method\.|
|---|



# 3\. Business Problem

|**Type**|**Statement**|
|---|---|
|Confirmed|The existing web checkout supports only Visa and Mastercard\.|
|Confirmed|DinoAI collects SEA customer payments through its Singapore entity and settlement account\.|
|Hypothesis|1. Customers without internationally enabled cards are unable or less willing to complete checkout\. Card payments are tend to used more for recurring payments, while bank transfers are best for one\-time purchase\.<br>2. Local payment methods will reduce checkout abandonment and increase paid conversion\.<br>3. BNPL option will yield higher conversion|
|Risk|Some Malaysia methods may be unavailable, restricted, or settled differently for a Singapore merchant entity\.|



# 4\. Objectives and Success Metrics

|**Objective**|**Metric**|**Target**|
|---|---|---|
|Increase payment accessibility|Payment\-method coverage|TBC|
|Increase paid conversion|Checkout completion rate|TBC after baseline|
|Improve payment reliability|Success rate by method|TBC|
|Protect customer experience|Entitlement activation SLA|≤ 60 seconds target; Engineering confirmation|
|Protect operations|Unresolved payment exceptions|0 critical; threshold TBC|
|Protect finance|Reconciliation mismatch rate|TBC|
|Control support cost|Payment\-related contact rate|TBC|

# 5\. Scope

## 5\.1 In Scope

- Malaysia web checkout for new and existing registered users with UID\.

- One\-time subscription purchases priced in MYR\.

- FPX, Atome, SPayLater, DuitNow QR, Touch ‘n Go, Boost, and GrabPay e\-wallet, subject to provider enablement\.

- Payment\-method display, selection, redirect, QR, app\-switch, return, status handling, verified webhooks, entitlement activation, analytics, reporting, refunds, and reconciliation\.

- Existing member extension logic and cross\-device payment completion\.

## 5\.2 Out of Scope

- Apple App Store or Google Play Billing\.

- Recurring debit through local methods\.

- Grab PayLater until Airwallex or another approved provider confirms availability\.

- Payment methods outside Malaysia\.

- Multi\-gateway orchestration or smart routing\.

- Saving bank or wallet credentials in DinoAI\.

- Custom underwriting or credit decisioning for BNPL\.

- Native app checkout changes beyond entitlement refresh/deep\-link return support\.

# 6\. Stakeholders and RACI

|**Workstream**|**Product**|**Engineering**|**Finance**|**Ops/CS**|**Legal**|**Airwallex**|
|---|---|---|---|---|---|---|
|Scope and priority|A/R|C|C|C|C|C|
|Technical design|C|A/R|C|C|I|C|
|Method onboarding|A|C|C|I|C|R|
|Commercial/settlement|C|I|A/R|C|C|R|
|UX and localisation|A|C|I|C|C|I|
|UAT and launch|A|R|C|R|I|C|
|Reconciliation|C|C|A|R|I|C|
|Refund operations|C|C|A|R|C|C|

**R**esponsible \(does the work\), **A**ccountable \(owns the result\), **C**onsulted \(gives advice\), and **I**nformed \(gets updates\)

# 7\. Current\-State Assessment

|**Area**|**Confirmed**|**Assumed**|
|---|---|---|
|Customer journey|Registered user selects package and pays on web checkout using Visa/Mastercard\.|Payment result page exists\.|
|Identity|Customer UID exists and web/app accounts are connected\.|One UID is linked to one order\.|
|Order|Existing payment record creation is confirmed\.|Internal order ID exists and is passed to Airwallex\.|
|Gateway|Airwallex API handshake and card integration are complete\.|PaymentIntent model is used\.|
|Webhook|Card payment success/failure handling exists\.|Verified webhook triggers entitlement\.|
|Entitlement|VIP/Premium is activated after successful payment\.|Activation is backend\-driven\.|
|Reporting|Payment records exist\.|Basic transaction export exists\.|
|Analytics|Web funnel tracking is planned/available\.|Payment events exist\.|

# 8\. Current\-to\-Future Gap Analysis

|**Component**|**Current State**|**Future State**|**Treatment**|**Owner**|
|---|---|---|---|---|
|Checkout UI|Cards only|Dynamic local\-method list by market, device, currency and availability|Modify|UX/Frontend|
|Order Service|Existing order/payment record|Store method, provider, expiry, payment\-intent ID and local\-method status|Modify|Backend|
|Airwallex API|Cards integration|Confirm PaymentIntent with method\-specific payload and next\_action handling|Modify|Backend|
|Webhooks|Card result events|Subscribe to and process all relevant PaymentIntent states|Modify|Backend|
|Entitlement|Activate after card success|Activate only after verified SUCCEEDED event for every method|Reuse/Modify|Backend|
|QR/Redirect|Not required for cards|QR render, redirect, app switch, return URL and polling|New|Frontend/Backend|
|Refunds|Card process|Method\-specific full/partial refund handling and entitlement recalculation|Modify|Finance/Ops|
|Reporting|Card\-focused|Method/provider/settlement/exception dimensions|Modify|Data/Finance|
|Monitoring|Existing unknown|Pending\-age, webhook failure, entitlement failure, and mismatch alerts|New|Engineering/Ops|
|Merchant setup|Cards enabled|Provider activation and commercial approval for each method|New|Product/Finance/Airwallex|

# 9\. Architecture Review and Recommendation

## 9\.1 Recommended Architecture

UID → DinoAI Order ID → Airwallex Payment Intent → Selected Payment Method → Customer Action → Verified Webhook / Status Inquiry → Order PAID → Premium Entitlement → Reporting \& Reconciliation

- DinoAI Order ID remains the business source of truth and must map to exactly one UID and one package purchase\.

- Airwallex PaymentIntent ID remains the gateway reference and must be stored against the DinoAI order\.

- The browser return page is informational only; it must not activate Premium\.

- Only a verified backend status of SUCCEEDED may activate Premium\.

- Webhook processing and entitlement updates must be idempotent\.

- Payment status inquiry must recover missed or delayed webhook events\.

## 9\.2 Trade\-off Analysis

|**Option**|**Time to Market**|**Control**|**Operational Risk**|**Scalability**|**Recommendation**|
|---|---|---|---|---|---|
|Extend existing Airwallex integration|Fast|High enough|Low if webhooks/recon are extended|High|Recommended|
|Separate local gateway for each method|Slow<br>\(4 weeks onboarding\)|High|High operational fragmentation|Medium|Reject for MVP|

# 10\. Lifecycle Models

## 10\.1 Order Lifecycle

|**State**|**Definition**|**Allowed Next States**|
|---|---|---|
|CREATED|Order created and linked to UID; payment not initiated\.|PAYMENT\_PENDING, CANCELLED, EXPIRED|
|PAYMENT\_PENDING|Payment Intent created or customer action initiated\.|CUSTOMER\_ACTION\_REQUIRED, PROCESSING, PAID, FAILED, CANCELLED, EXPIRED, UNKNOWN|
|CUSTOMER\_ACTION\_REQUIRED|Customer must authenticate, scan QR, or approve in provider app\.|PROCESSING, PAID, FAILED, CANCELLED, EXPIRED|
|PROCESSING|Gateway accepted payment and final result is pending\.|PAID, FAILED, UNKNOWN|
|PAID|Verified successful payment\.|REFUNDED, PARTIALLY\_REFUNDED|
|FAILED|Final failed payment\.|PAYMENT\_PENDING via new attempt|
|CANCELLED|Customer or system cancelled attempt\.|PAYMENT\_PENDING via new attempt|
|EXPIRED|Order or QR/payment session expired\.|New order required|
|UNKNOWN|Final status cannot be confirmed\.|PAID, FAILED, REQUIRES\_REVIEW|
|REFUNDED / PARTIALLY\_REFUNDED|Refund confirmed and entitlement recalculated\.|Closed|

## 10\.2 Entitlement Lifecycle

|**Trigger**|**Entitlement Action**|
|---|---|
|Order created / pending / failed / cancelled|No entitlement change|
|Verified PAID|Activate or extend Premium exactly once|
|Duplicate succeeded webhook|No duplicate extension|
|Full refund confirmed|Remove or recalculate entitlement according to approved refund policy|
|Partial refund confirmed|Apply approved proportional entitlement rule; open question|
|Payment reversed/chargeback|Suspend and route to review according to policy|

# 11\. Payment\-Method Comparison

|**Method**|**Priority**|**Experience**|**Settlement / Limits**|**Key Notes**|
|---|---|---|---|---|
|FPX|P0|Select bank → redirect to online banking → authenticate → return to merchant|MYR processing; exact settlement for Prime Edu account|Real\-time online banking; one\-time MVP|
|Atome|P1|Redirect to Atome → login → eligibility/plan → complete → return|Merchant settled upfront; commercial terms TBC|BNPL provider owns credit decision|
|SPayLater \(Beta\)|P1|Redirect/app flow → provider approval → payment result|Terms/limits TBC|Treat beta readiness as launch risk|
|Grab PayLater|P1 request|Not available through current gateway|N/A|Remove from committed scope; vendor alternative decision required|
|DuitNow QR|P2|Display/redirect to QR → scan using bank/e\-wallet → return|T\+2; MYR 1–1,100 default; 5\-minute checkout timeout per docs|CIMB availability noted as MY\-entity\-only by Airwallex|
|Touch ‘n Go|P3|Desktop QR; mobile redirect/app switch|QR/URL expires after 10 minutes in desktop flow|Device\-specific UX and polling|
|Boost|P3|Redirect/app or QR according to provider flow|TBC|Confirm supported integration flow|
|GrabPay e\-wallet|P3|Redirect to GrabPay; mobile/desktop flow differs|MY transactions for non\-MY entities may settle in USD/default currency; confirm|GrabPay is available; Grab PayLater is not|

# 12\. End\-to\-End User Flows

## 12\.1 FPX / Online Banking

1. Logged\-in user selects a MYR subscription package\.

2. Checkout displays FPX only if enabled and available for the current session\.

3. User selects FPX and a supported bank\.

4. DinoAI creates/updates the order and confirms the Airwallex PaymentIntent with the selected bank\.

5. User is redirected to bank authentication and approves or rejects the payment\.

6. User returns to DinoAI; the return page displays Processing until backend confirmation is received\.

7. Airwallex sends the final webhook; DinoAI verifies order ID, payment ID, amount, currency, and status\.

8. On SUCCEEDED, order becomes PAID and Premium is activated once\. On failure/cancel/expiry, no entitlement is granted\.

## 12\.2 DuitNow QR

1. User selects DuitNow QR\.

2. DinoAI confirms PaymentIntent and obtains QR/redirect instructions\.

3. Desktop: display dynamic QR and countdown\. Mobile: use gateway\-supported redirect flow\.

4. User scans/approves in a participating bank or e\-wallet\.

5. DinoAI polls status while awaiting webhook and stops at final state or timeout\.

6. If QR expires, the order is not marked paid and the customer may create a new attempt\.

7. Premium is activated only after verified success\.

## 12\.3 E\-wallet

1. User selects Touch ‘n Go, Boost, or GrabPay\.

2. DinoAI determines desktop, mobile web, or app\-compatible flow\.

3. Desktop may display QR; mobile may redirect or app\-switch\.

4. Customer authorises in the provider app and returns to DinoAI\.

5. Frontend displays status from backend; backend verifies webhook/status inquiry\.

6. Premium is activated only after success\.

## 12\.4 BNPL

1. User selects Atome or SPayLater\.

2. Checkout clearly states the provider and that eligibility/repayment terms are determined by the provider\.

3. DinoAI redirects to provider flow through Airwallex\.

4. Provider performs authentication and eligibility assessment\.

5. If approved and payment succeeds, Airwallex confirms merchant payment\.

6. DinoAI activates Premium only after verified payment success; rejected applications do not change entitlement\.

# 13\. User Stories

As a Malaysian parent, I want to: 

- choose an available local payment method so that complete checkout without an internationally enabled card

- choose to break the annual subscription package into a 3\-month, 6\-month or 12\-month split depending on the availability of our the partner 

- see the exact amount, currency, provider, and required next action before leaving DinoAI so that understand how payment will be completed

- see an accurate success, processing, cancelled, or failed state so that avoid retrying an uncertain payment

- receive an invoice / payment receipt via transactional email confirming my payment has been completed in real\-time or near real\-time so that I have future reference

- enjoy premium access instantly after the payment is made when I launched the DinoAI app

- request for a refund through the appropriate channel \(customer service\) within the appropriate time frame and receive a refund according to the regulation of the payment channel



As a busines \(DinoAI\), I want to: 

- enable localised payment channels stated Payment\-Method Comparison section so that conversion can be increased

- ensure all payment channels maintain a success rate of XX, complying with the SLA of the payment type

- ensure payment is received within the agreed SLA of each payment type

- reconcile every payment using DinoAI order ID and Airwallex payment ID so that prove that payment, settlement, and entitlement agree

- store payment data such as UID, order ID, gateway payment ID, date, amount, method/type, and time stamp in our database for future reference

- make payment searchable by UID, order ID, gateway payment ID, date, amount, method/type through our CRM so that payment complaints can be resolved without engineering effort when the business scale

- track all payment initiated, payment complete successfully or failed via Firebase and Appsflyer, detailing the payment method and amount to identify which channels drive incremental revenue \(refer to section Analytics / Tracking

- Prevent customers from making duplicate transactions through a controlled mechanism should the customer fail to receive a payment response due to time\-out  

# 14\. Functional Requirements

|**ID**|**Requirement**|**Precise Behaviour**|**Trigger**|**Inputs**|**Outputs**|**Success**|**Failure**|**Priority**|
|---|---|---|---|---|---|---|---|---|
|FR\-001|Payment method availability|When a Malaysian checkout session loads, the backend must return only payment methods enabled for the merchant account, MYR currency, customer region, package amount, browser/device, and current provider availability\.|Checkout load|country, currency, package, device, gateway capability|ordered method list|Unavailable methods are hidden; cards remain fallback|Checkout remains usable if capability call fails|P0|
|FR\-002|Order creation|Before any local payment is initiated, DinoAI must create a unique order linked to one UID, package, amount, currency, country, campaign and selected method\.|User confirms method|UID, package, amount, MYR, method|order\_id, status CREATED|Order can be paid once; expiry stored|No gateway request if order creation fails|P0|
|FR\-003|PaymentIntent creation/confirmation|Backend must create or confirm an Airwallex PaymentIntent and store its ID against the DinoAI order before redirecting or displaying QR\.|Valid order exists|order\_id, amount, currency, return URL, method payload|payment\_intent\_id, next\_action|Merchant order reference is passed where supported|Show initiation failure; order remains unpaid|P0|
|FR\-004|Device\-specific action|Frontend must execute the returned next\_action: redirect, QR render, or app switch according to device and method\.|PaymentIntent requires customer action|next\_action, device/OS|redirect/QR/app invocation|Do not hard\-code provider URLs|Show fallback link or retry if invocation fails|P0|
|FR\-005|Webhook verification|Backend must verify webhook authenticity and match payment ID, order ID, amount, currency, and final status before updating the order\.<br>|Webhook received|signature, event ID, payment intent, amount, currency|verified status update|Duplicate/out\-of\-order events are idempotent|Log and alert invalid or unmatched event|P0|
|FR\-006|Entitlement activation|Backend must activate or extend Premium once after the linked order reaches PAID from a verified backend event\.|Verified payment success|UID, order, package, paid\_at|subscription update|Existing entitlement is extended according to BR\-011|If activation fails, payment remains paid and exception is opened|P0|
|FR\-007|Return/result page|The return page must query DinoAI backend and display Success, Processing, Failed, Cancelled, Expired, or Unknown\.|Customer returns or refreshes|order token/session|current state and action|Frontend redirect result cannot set PAID|Provide retry/status refresh/support route|P0|
|FR\-008|Status inquiry fallback|Backend/Ops must retrieve PaymentIntent status when webhook is missing, delayed, or disputed\.|Pending age threshold or manual inquiry|payment\_intent\_id|latest gateway status|Inquiry can resolve to PAID only after validation|Unresolved items move to review|P0|
|FR\-009|Refund processing|Authorized Ops/Finance must initiate eligible refunds against the original payment and track gateway outcome before entitlement adjustment\.|Approved refund|order, payment ID, refund amount, reason|refund ID/status|Full/partial rules follow approved policy and method support|Failed refund leaves entitlement unchanged and opens exception|P1|
|FR\-010|Support visibility|Authorized users must search and view payment, order, entitlement and refund state without exposing credentials\.|Support search|UID/order/payment/date/amount/method|read\-only case view|Manual entitlement action requires controlled approval|Unavailable data triggers escalation|P1|

# 15\. Business Rules

|**Rule ID**|**Rule**|
|---|---|
|BR\-001|Only logged\-in or registered users with a UID may purchase through this flow\.|
|BR\-002|Every order must map to exactly one UID and one selected package\.|
|BR\-003|One successful order may activate entitlement only once\.|
|BR\-004|The order amount and currency must match the verified gateway result\.|
|BR\-005|The customer\-facing redirect result is not proof of payment\.|
|BR\-006|Only verified backend SUCCEEDED status may set an order to PAID\.|
|BR\-007|All local methods in MVP are one\-time payments\.|
|BR\-008|Unavailable or disabled methods must be hidden rather than selectable\.|
|BR\-009|Expired QR/session requires a new payment attempt; an expired order must not be reused if the amount or offer changed\.|
|BR\-010|A failed or cancelled attempt may be retried without creating duplicate entitlement\.|
|BR\-011|For an existing member, the purchased package duration is added to the current valid expiry date; if expired, it starts from successful payment time\.|
|BR\-012|Refund and entitlement rules must be approved by Finance/Legal before launch\.|
|BR\-013|Payment credentials remain with the gateway/provider and must not be stored by DinoAI\.|
|BR\-014|Discount and BNPL compatibility must be configured explicitly per offer; no implicit combination is allowed\.|

# 16\. Data Model

|**Entity**|**Existing/New**|**Key Fields**|**Relationships**|**Lifecycle / Audit**|
|---|---|---|---|---|
|User|Existing|uid, country, account\_status|1\-to\-many Orders; 1\-to\-many Subscriptions|Existing retention policy|
|Order|Modify|order\_id PK, uid FK, package\_id, amount, currency, method, campaign\_id, status, expires\_at|Belongs to User; has Payment Attempts|Immutable commercial fields after initiation; full audit|
|Payment Attempt|Modify/New|attempt\_id PK, order\_id FK, airwallex\_payment\_intent\_id, provider, status, next\_action\_type, created\_at, resolved\_at|Belongs to Order; has Webhook Logs|Retain for finance/audit; no credential storage|
|Subscription|Existing/Modify|subscription\_id, uid, package, start\_at, expiry\_at, source\_order\_id, status|Belongs to User and source Order|Idempotent extension; audit changes|
|Webhook Log|New/Confirm|event\_id PK, payment\_intent\_id, event\_type, received\_at, signature\_valid, processed\_at, result|References Payment Attempt|Retain raw payload securely per policy|
|Refund|New/Modify|refund\_id, order\_id, payment\_id, amount, reason, status, approved\_by|Belongs to Order/Payment|Maker\-checker and audit|
|Reconciliation Record|New/Modify|settlement\_ref, payment\_id, order\_id, amount, currency, fee, matched\_status|References Payment|Daily lifecycle and exception ageing|

# 17\. API Contracts \(High Level\)

|**API**|**Caller → Receiver**|**Purpose**|**Required Controls**|**Unknowns**|
|---|---|---|---|---|
|Get Available Methods|Web → DinoAI Backend|Return eligible and enabled methods|Authenticated session; market/device/currency checks; cache fallback|Exact Airwallex capability endpoint or configured list|
|Create Order|Web → DinoAI Backend|Create unique commercial order|Idempotency key; UID ownership; amount/offer validation|Current endpoint/schema|
|Create/Confirm PaymentIntent|DinoAI Backend → Airwallex|Initiate selected method and obtain next action|Airwallex auth; request\_id idempotency; order reference; timeout/retry|Exact method payloads and settlement configuration|
|Payment Status|DinoAI Backend → Airwallex|Retrieve authoritative state|Auth; payment ID; rate limits; audit|Polling interval and threshold|
|Webhook Receiver|Airwallex → DinoAI Backend|Deliver payment/refund state changes|Signature verification; event idempotency; replay protection; logging|Current endpoint and retry policy|
|Activate Entitlement|Payment Service → Subscription Service|Activate/extend Premium|source\_order\_id idempotency; transaction integrity|Current service contract|
|Refund|DinoAI Backend → Airwallex|Initiate approved refund|RBAC; maker\-checker; original payment reference|Method\-level refund/partial refund support|

# 18\. Analytics, Funnels and Dashboards

|Event|Trigger|Mandatory Parameters|Priority|
|---|---|---|---|
|`checkout_viewed`|Checkout renders|`uid`, `package_id`, `amount`, `currency`, `country`, `campaign_id`, `device`, `browser`|**P0**|
|`payment_method_viewed`|Eligible methods displayed|`available_methods`, `disabled_methods`, `gateway`|**P2**|
|`payment_method_selected`|User selects method|`method`, `provider`, `order_id`|**P0**|
|`payment_initiated`|Order and gateway request created|`order_id`, `payment_intent_id`, `method`, `amount`, `currency`|**P0**|
|`payment_redirected`|Customer sent to provider|`method`, `provider`, `flow_type`|**P2**|
|`payment_qr_displayed`|QR rendered|`method`, `expires_at`, `order_id`|**P2**|
|`payment_returned`|Customer returns from provider|`order_id`, `return_source`, `backend_status`|**P2**|
|`payment_pending`|Backend state becomes pending or processing|`order_id`, `method`, `elapsed_time`|**P1**|
|`payment_succeeded`|Verified payment success|`order_id`, `payment_intent_id`, `method`, `amount`, `currency`|**P0**|
|`payment_failed`|Final payment failure|`order_id`, `method`, `failure_code`, `failure_stage`|**P0**|
|`payment_cancelled`|Customer or provider cancels payment|`order_id`, `method`|**P1**|
|`payment_expired`|Order, session, or QR expires|`order_id`, `method`|**P2**|
|`subscription_purchase_result`|Premium subscription status is updated|Follow existing parameters|**P0**|
|`entitlement_activation_failed`|Payment succeeds but Premium is not activated|`uid`, `order_id`, `error_code`|**P0**|

## 18\.1 Required Funnels

- Checkout viewed → method selected → payment initiated → customer action → payment succeeded → entitlement activated\.

- Payment initiated → failed/cancelled/expired/pending by payment method and provider\.

- Payment succeeded → entitlement activation within SLA\.

- Campaign ID → local method selection → successful purchase\.

# 19\. Reporting and Reconciliation

|**Report**|**Purpose**|**Owner**|**Frequency**|**Core Fields / Matching**|
|---|---|---|---|---|
|Daily Transaction Report|All attempts and final statuses|Ops/Data|Daily|order\_id, payment\_intent\_id, uid, method, provider, timestamps, amount, currency, status, failure code|
|Payment Method Performance|Conversion and reliability by method|Product/Data|Daily/Weekly|exposure, selection, initiation, success, failure, elapsed time, revenue|
|Settlement Report|Confirm amounts settled by Airwallex|Finance|Per settlement cycle|settlement ref, payment ID, gross, fee, net, currency, settlement date|
|Reconciliation Report|Match order/payment/settlement/entitlement|Finance/Ops|Daily|order ID, payment ID, amount, currency, status, entitlement source order, settlement ref|
|Exception Report|Action unresolved mismatches|Ops/Engineering|Real time/Daily|exception type, age, owner, action, SLA|
|Refund Report|Track requests and confirmed refunds|Finance/CS|Daily|refund ID, order/payment ID, amount, reason, status, entitlement action|
|Fee/FX Report|Understand method cost and conversion|Finance|Monthly|method, gross, gateway fee, FX, net, settlement currency|

# 20\. Negative and Edge Scenarios

|**ID**|**Scenario**|**Trigger**|**Status**|**Web Response**|**Backend Action**|**Customer Action**|**Ops Action**|**SLA**|
|---|---|---|---|---|---|---|---|---|
|NS\-001|Method unavailable after page load|Provider/capability changes|METHOD\_UNAVAILABLE|Remove/disable method; explain and offer alternatives|Do not initiate; log availability change|Choose another method|Monitor only|Immediate|
|NS\-002|Customer closes page before approval|Browser/app closed|CUSTOMER\_ACTION\_REQUIRED|On return show current backend status|Keep pending until expiry/inquiry|Resume or retry after expiry|None unless aged|Method expiry|
|NS\-003|Bank/wallet authentication fails|Provider rejects auth|FAILED|Show failure and safe retry|Record final failure; no entitlement|Retry or choose another method|Support if debited|Immediate|
|NS\-004|Customer cancels|Provider cancellation|CANCELLED|Show cancelled; no charge message|No entitlement; allow new attempt|Retry|None|Immediate|
|NS\-005|Redirect says success; webhook pending|Return URL reached first|PROCESSING|Show “Confirming payment”|Poll/inquire; do not activate yet|Wait/refresh|Alert if over threshold|TBC; target \<5 min|
|NS\-006|Webhook arrives before redirect|Async event first|PAID|Result page reads backend and shows success|Activate once|No action|None|Immediate|
|NS\-007|Duplicate webhook|Gateway retry|PAID unchanged|No duplicate message|Idempotently ignore duplicate activation|None|Log|Immediate|
|NS\-008|Wrong amount/currency in callback|Integrity mismatch|REQUIRES\_REVIEW|Show processing/support message|Do not activate; open critical exception|Contact support|Finance/Engineering review|Immediate alert|
|NS\-009|Paid after order expiry|Late provider completion|REQUIRES\_REVIEW or PAID by approved rule|Do not falsely show failed if money received|Resolve using authoritative gateway status and pricing rule|Contact support if delayed|Manual review if offer expired|TBC|
|NS\-010|Paid but entitlement update fails|Subscription service error|PAID \+ ENTITLEMENT\_ERROR|Show payment received; access being activated|Retry entitlement; open exception|Wait/contact support|Priority recovery|≤60 sec target; alert after|
|NS\-011|Entitlement granted but payment not confirmed|Logic defect|CRITICAL\_EXCEPTION|Avoid showing payment success|Suspend/review according to policy|Support path|Immediate incident|Immediate|
|NS\-012|BNPL rejected|Provider credit decision|FAILED|Explain provider could not approve; offer other methods|No entitlement|Choose another method|No override|Immediate|
|NS\-013|Wallet app not installed|App switch unavailable|CUSTOMER\_ACTION\_REQUIRED|Show QR/web fallback or another method|Keep order pending until action/expiry|Use fallback|None|Immediate|
|NS\-014|QR expires|Countdown reaches expiry|EXPIRED|Show expired and Generate New Payment|Invalidate attempt; no entitlement|Start new attempt|None|5/10 min by method|
|NS\-015|Refund succeeds; entitlement update fails|Post\-refund error|REFUNDED \+ ENTITLEMENT\_ERROR|Confirm refund processing; access update may follow|Retry/review entitlement|Contact support|Ops priority|TBC|

# 21\. Non\-Functional Requirements

|**ID**|**Category**|**Requirement**|
|---|---|---|
|NFR\-001|Security|All gateway API calls must use Airwallex\-approved authentication; secrets must remain server\-side and be rotated according to security policy\.|
|NFR\-002|Webhook security|Every webhook must be authenticated, replay\-protected, logged, and processed idempotently\.|
|NFR\-003|Data privacy|DinoAI must not store bank credentials, wallet credentials, OTPs, or BNPL credit data\.|
|NFR\-004|Performance|Checkout method availability and order creation should complete within P95 targets agreed during technical design; target ≤2 seconds excluding gateway response\.|
|NFR\-005|Reliability|A gateway or provider failure must not make the entire checkout unusable when another enabled method is available\.|
|NFR\-006|Entitlement SLA|Verified successful payment should activate entitlement within 60 seconds; unresolved failures must alert Operations\.|
|NFR\-007|Availability|Payment services must meet the existing checkout SLA; exact target requires Engineering confirmation\.|
|NFR\-008|Audit|Order, payment, webhook, refund, manual action, and entitlement changes must be traceable by actor, timestamp, source, and reference ID\.|
|NFR\-009|Access control|Refunds and manual entitlement changes require role\-based access and maker\-checker where money/access is affected\.|
|NFR\-010|Monitoring|Dashboards and alerts must cover failure rate, pending age, webhook errors, unmatched payments, entitlement failures, and settlement mismatches\.|
|NFR\-011|Compatibility|Checkout must support current supported mobile and desktop browsers; device\-specific provider behaviour must be tested\.|
|NFR\-012|Localisation|All customer\-facing payment and error messages must support English and Malay for Malaysia launch\.|
|NFR\-013|Accessibility|Payment selection, QR instructions, status, errors, and buttons must be keyboard accessible and screen\-reader labelled\.|
|NFR\-014|Recovery|Missed webhook events must be recoverable through status inquiry and reconciliation without duplicate entitlement\.|
|NFR\-015|Scalability|Data model and method configuration must allow additional SEA methods without new order or entitlement architecture\.|

# 22\. High\-Level Test Cases

|**Test ID**|**Method**|**Scenario**|**Precondition**|**Steps**|**Frontend Result**|**Backend Result**|**Entitlement**|**Priority**|
|---|---|---|---|---|---|---|---|---|
|TC\-001|FPX|Successful bank payment|Eligible logged\-in MY user|Select FPX, bank, authenticate successfully|Success after backend confirmation|Order PAID; payment stored|Premium active once|P0|
|TC\-002|FPX|Bank authentication rejected|Valid order|Reject at bank|Failure with retry option|Order FAILED; no activation|Unchanged|P0|
|TC\-003|DuitNow|QR success before browser return|Valid QR|Pay via bank app; delay return|Success when page reopened|Webhook sets PAID|Premium active|P0|
|TC\-004|DuitNow|QR expiry|Generated QR|Wait beyond expiry|Expired; generate new payment|Attempt EXPIRED|Unchanged|P0|
|TC\-005|TNG|Desktop QR success|Desktop browser|Scan and approve|Processing then success|Status resolved|Premium active|P1|
|TC\-006|TNG|Mobile app unavailable|Mobile browser|Select TNG without app|Fallback or alternative offered|No false failure/activation|Unchanged|P1|
|TC\-007|Atome|BNPL approved|Eligible provider user|Complete Atome approval|Success|Order PAID|Premium active|P1|
|TC\-008|SPayLater|BNPL rejected|Provider rejects|Attempt payment|Failure; choose another method|Order FAILED|Unchanged|P1|
|TC\-009|All|Duplicate webhook|Successful payment|Replay same event|No duplicate visible effect|Idempotent processing|No extra extension|P0|
|TC\-010|All|Webhook missing|Gateway succeeded|Suppress webhook; run inquiry|Processing then success|Inquiry sets PAID|Premium active once|P0|
|TC\-011|All|Wrong amount|Mismatched event|Process event|Processing/support state|Critical exception; no activation|Unchanged|P0|
|TC\-012|All|Cross\-device completion|Open checkout on laptop; pay using phone|Complete provider action|Accurate result on laptop/app|Order resolved by IDs|Correct UID active|P0|
|TC\-013|All|Existing member purchase|Active Premium|Complete payment|Success with new expiry|Order PAID|Expiry extended|P0|
|TC\-014|All|Entitlement service down|Successful payment|Fail activation call|Payment received; activation pending|Retry \+ alert|Eventually active once|P0|
|TC\-015|Refund|Full refund|Paid order|Approve and process refund|Refund confirmation|Refund tracked|Entitlement recalculated|P1|



# 23\. User Acceptance Criteria

**UAC\-001: **Given a logged\-in Malaysian user has selected a MYR package, when FPX is enabled and the user successfully authorises payment through a supported bank, then the order must become PAID only after DinoAI verifies the Airwallex payment ID, DinoAI order ID, amount, currency, and successful status; Premium must then activate exactly once\.

**UAC\-002: **Given a customer returns from a provider before the final webhook arrives, when DinoAI has not yet verified success, then the page must display Processing and must not activate Premium\.

**UAC\-003: **Given the same successful webhook is delivered more than once, when DinoAI processes subsequent copies, then no duplicate order update or entitlement extension may occur\.

**UAC\-004: **Given a QR payment expires without confirmed success, when the customer views the checkout, then the attempt must show Expired, Premium must remain unchanged, and the customer must be able to create a new attempt\.

**UAC\-005: **Given a verified payment succeeds while the entitlement service is unavailable, when activation fails, then DinoAI must keep the order PAID, create an operational exception, retry safely, and inform the customer that payment was received and access is being activated\.

**UAC\-006: **Given an existing Premium member successfully purchases another package, when entitlement is applied, then the purchased duration must extend from the later of the current expiry date or payment date and must reference the source order\.

**UAC\-007: **Given an Airwallex event contains an amount or currency different from the order, when the event is received, then DinoAI must not activate Premium and must create a critical exception for review\.

**UAC\-008: **Given a payment method is not enabled or available for the current device/session, when checkout loads, then the method must not be selectable and the remaining checkout must continue to function\.

# 24\. Dependencies

|**Dependency**|**Type**|**Owner**|**Impact**|
|---|---|---|---|
|Airwallex enablement for each method under Singapore merchant entity|Vendor/Commercial|Product/Finance|Blocker per method|
|Settlement currency and account configuration|Finance/Vendor|Finance|Pricing, FX and reconciliation|
|Current Order ID and PaymentIntent mapping|Engineering|Backend|Core architecture|
|Verified webhook and inquiry capability|Engineering/Vendor|Backend|Entitlement safety|
|Subscription extension/refund logic|Engineering/Product|Backend|Customer access|
|Localised UX and legal copy|UX/Legal|Product|Launch readiness|
|Refund policy and operational SOP|Finance/Legal/Ops|Finance|Support and compliance|
|Analytics schema and dashboard|Data|Data/Product|Measurement|
|UAT accounts/test environments for methods|Vendor/QA|Airwallex/QA|Testing|

# 25\. Risks and Mitigations

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Method unavailable to SG merchant|Medium|High|Get written Airwallex capability confirmation before committing launch date|Product|
|Grab PayLater unavailable|High|Medium|Remove from committed scope; assess another provider only if business case warrants|Product|
|Settlement/FX economics reduce margin|Medium|High|Finance models gross\-to\-net by method before launch|Finance|
|Paid but Premium not activated|Low/Medium|Critical|Verified webhook \+ inquiry fallback \+ retry \+ exception alert|Engineering/Ops|
|Pending states confuse customers|Medium|Medium|Accurate processing page, status refresh, clear SLA and support path|UX/Product|
|Duplicate events cause over\-entitlement|Medium|High|Idempotency by event ID, order ID and source order on entitlement|Engineering|
|BNPL approval rate is low|Medium|Medium|Track approval/failure; keep bank and card alternatives visible|Product|
|Refund and entitlement mismatch|Medium|High|Maker\-checker, refund webhook/status, reconciliation and exception report|Finance/Ops|
|Beta method instability|Medium|Medium/High|Limited pilot, feature flag, rollback, method\-specific monitoring|Engineering/Product|

# 26\. Rollout Plan

|**Phase**|**Scope**|**Readiness Criteria**|**Pilot / Monitoring**|**Go / No\-Go**|
|---|---|---|---|---|
|P0|FPX|Provider enabled; settlement confirmed; end\-to\-end UAT; recon ready|Internal \+ limited traffic for 3–5 business days|Success/failure/pending within agreed thresholds; no critical mismatches|
|P1|Atome \+ SPayLater|Commercial approval; provider test users; BNPL copy/legal review|Limited eligible traffic; beta flags|Stable payment and entitlement; acceptable provider rejection handling|
|P2|DuitNow QR|Entity/bank availability confirmed; QR expiry/polling tested|Limited browser/device matrix|No QR expiry defects; reconciliation complete|
|P3|TNG \+ Boost \+ GrabPay|Device flows and app\-switch fallbacks tested|Gradual percentage rollout|Stable success rate and low support contacts|



- All methods must be controlled by backend feature flags\.

- Rollback means hide the affected method while preserving card and other functioning methods\.

- No launch phase may proceed without a live low\-value transaction, entitlement verification, refund test where supported, and settlement/reconciliation check\.

# 27\. Assumptions Register

|**Assumption**|**Why It Matters**|**Owner**|**Risk if Incorrect**|**Status**|
|---|---|---|---|---|
|Existing card integration uses Airwallex PaymentIntent and verified webhooks|Determines reusable architecture|Engineering|More integration work|Pending|
|DinoAI has an internal Order ID linked to UID|Required for safe payment\-entitlement mapping|Engineering|Blocker architecture change|Pending / Blocker|
|FPX can be enabled for DinoAI’s SG merchant account|P0 feasibility|Airwallex/Product|P0 blocked|Pending|
|Atome and SPayLater can be enabled for SG merchant and Malaysia shoppers|P1 feasibility|Airwallex/Product|P1 scope changes|Pending|
|DuitNow QR can be enabled for SG merchant with acceptable bank coverage|P2 value|Airwallex/Product|Reduced coverage or entity dependency|Pending|
|Settlement to SG account is legally and commercially acceptable|Finance model|Finance/Legal|Blocker or entity change|Pending / High Risk|
|Existing subscription service supports idempotent extension|Prevents duplicate access|Engineering|Over\-entitlement risk|Pending|
|Refunds can be processed through current Airwallex account|Customer support|Finance/Airwallex|Manual refund process|Pending|

# 28\. Sources and Current Capability Notes

The following public, official sources were reviewed on 15 July 2026\. Account\-level availability, commercial terms, and exact settlement configuration still require written confirmation from Airwallex\.

- [Airwallex Payment Methods Overview](https://www.airwallex.com/docs/payments/payment-methods?utm_source=chatgpt.com)

- [Airwallex FPX](https://www.airwallex.com/docs/payments/payment-methods/apac/fpx?utm_source=chatgpt.com)

- [Airwallex DuitNow](https://www.airwallex.com/docs/payments/payment-methods/apac/duitnow?utm_source=chatgpt.com)

- [Airwallex DuitNow Integration Guide](https://www.airwallex.com/docs/payments/payment-methods/apac/duitnow/desktopmobile-website-browser?utm_source=chatgpt.com)

- https://www\.airwallex\.com/docs/developer\-tools/partner\-connections/integration\-guides/dispute\-management

- [Online payment acceptance \- Airwallex Docs](https://www.airwallex.com/docs/developer-tools/partner-connections/integration-guides/online-payment-acceptance)

- https://www\.airwallex\.com/docs/developer\-tools/webhooks/listen\-for\-webhook\-events

- https://www\.airwallex\.com/docs/developer\-tools/sdks

- https://www\.airwallex\.com/docs/developer\-tools/overview

# 29\. Launch Approval Checklist

|**Category**|**Must Be Complete**|
|---|---|
|Commercial|Provider enablement, fees, settlement currency, FX, payout account, refund terms|
|Product|Scope, priority, customer copy, pricing, offer compatibility, entitlement rules|
|Engineering|Order mapping, method configuration, next\_action flows, webhook verification, inquiry fallback, idempotency|
|QA|Positive/negative/cross\-device/refund/duplicate/pending tests complete|
|Finance/Ops|Settlement, reconciliation, exception, refund and support SOP tested|
|Data|Events, dashboards, alerts and reporting validated|
|Legal|Terms, privacy, refund and BNPL/payment disclosures approved|
|Go Live|Low\-value live transaction, entitlement, settlement and rollback verified|

