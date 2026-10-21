# QA Plan, Deployment Boundaries and Release Acceptance

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

## Test pyramid
Unit: rates, validations, quote expiry, ledger balancing and shipment transitions. Integration: MongoDB transactional writes, gateway test payments, signed webhook replay, notifications and private POD. Role matrix: customers, merchants, carrier A/B, drivers, platform staff. Browser E2E: responsive quote, booking, tracking, merchant and courier dashboard. Security: tampered price, wrong-org shipment, forged event, malicious file, wrong-intent paid confirmation. Load test peak quotes/tracking and sustained retry queues.

## Mandatory E2E scenarios
Unapproved vendor invisible; out-of-zone quote rejected; server quote immutable; paid booking created once; replay/invalid payment webhook rejected; carrier A cannot see carrier B; only assigned driver updates; invalid status transition blocked; tracking masks PII; POD inaccessible to unrelated user; payout ledger reconciles; refund reverses balance; exception ticket tracked; notifications retry; restore staging DB/storage backup.

## GitHub and deployment
**EchoHaulage remains GitHub-only** until a separate deployment request. Commit checks should enforce lint, build, dependency review, tests and scanning. When deployment is later authorized, isolate staging/production MongoDB, provider credentials, storage and workers; TLS, health checks, dashboards and rollback ready. Don't deploy default README claims as operational evidence.

## Launch acceptance
Record tested commit SHA, environment, pass/fail matrix, privacy/security findings, signed partner pilot, finance payout process, backup restoration, monitored support and owner signoff. No P0 failures; P1 require written risk exception with owner/date. Product owner approves final production release.
