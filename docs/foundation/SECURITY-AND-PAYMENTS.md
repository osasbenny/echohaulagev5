# Security, Nigerian Data Protection and Financial Integrity

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

## Existing risks requiring remediation
Inspected v5 payment intent accepts `amount` from request body; backend must instead price from locked server quote and compare gateway intent/reference, shipment owner, amount and currency. Payment confirmation must never accept an unrelated successful intent to mark arbitrary shipment paid. Existing roles lack carrier tenant boundaries. Default US/USD values are not Nigerian marketplace defaults. These are source-level risks, not tested exploit claims.

## Controls
Server-side organization scoped policies for every endpoint, driver assignment and POD; admin MFA; audited privileged overrides; deny-by-default permissions; secure JWT/cookies/CSRF as appropriate; secret vault and rotation; throttling; signed inbound payment webhooks and signed outbound merchant webhooks; replay-proof event stores; unique booking idempotency keys; malware and MIME validation for KYC/POD uploads; short-lived private asset URLs; logging with PII redaction; penetration review and automated scanning.

## Payment lifecycle
Create locked NGN quote/order amount in minor units → initialize with approved provider → validate signed webhook/raw request body → independently verify amount/reference/currency and ownership → atomic paid and journal update → send retryable notification. Daily reconcile gateway settlement, refunds and vendor balances; payout batches require finance approval. Double-entry or invariant-balanced ledger with append-only reversals. No browser redirect accepted as proof of payment.

## Privacy and compliance
Record who acts as controller/processor, lawful basis and notices for vendor documents, sender/recipient contacts, driver location and POD; data minimization, retention, rights/deletion process and breach plan under applicable Nigerian requirements. Terms must fairly allocate physical custody, insurance, loss/damage and return obligations and must be reviewed before pilot.
