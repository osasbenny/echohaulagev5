# Master PRD — EchoHaulageExpress Multi-Vendor Logistics

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

## Vision and positioning
Nigerian-first logistics orchestration marketplace: individuals and merchants compare vetted independent courier providers, quote/book shipments, pay, schedule pickup, track parcel events, capture proof of delivery, resolve disputes and receive reports. It does **not** assume a fleet owned by Cactus or a partnership with DHL/FedEx.

## Personas
Guest (quote and privacy-limited tracking); customer/sender; ecommerce merchant; courier owner/administrator; courier dispatcher; driver; platform support; platform finance; platform administrator. Courier employees access only authorized organization shipments.

## P0 functional requirements
| ID | Capability | Acceptance criteria |
|---|---|---|
| E01 | Courier application/approval | Unapproved or suspended couriers cannot receive bookings |
| E02 | Merchant and courier organizations | Membership-based roles and hard server-side tenant isolation |
| E03 | Zones, services and rate cards | Only active providers serving requested route are quoted |
| E04 | Quote comparison and booking | Booking locks immutable server-computed price, provider and terms snapshot |
| E05 | NGN checkout | Gateway-verified amount/reference/currency; signed webhook; replay-safe updates |
| E06 | Shipment tracking | Valid timestamped transitions, public tracking redacts contacts/addresses |
| E07 | Dispatch | Carrier dispatcher assigns only authorized/eligible drivers |
| E08 | Pickup and POD | Timestamped evidence/authorized signatures/photos stored privately |
| E09 | Commissions/ledger | Server-calculated platform fee, carrier payable, refunds and payout liabilities reconcile |
| E10 | Disputes/returns | Exception tickets, ownership, timeline and audit trail |
| E11 | Admin ops | Provider approvals, rates, shipments, exceptions and reconciliation reports |
| E12 | Notifications | Email/SMS events retried and delivery results logged |
| E13 | Merchant API | Scoped keys, idempotent order creation and signed outbound webhooks |
| E14 | Responsive UX | Quote/book, carrier dispatch and basic driver workflow work on mobile |

## Out of scope at MVP
Owned delivery fleet, international customs brokerage, uncontracted global carrier API integrations, real-time GPS guarantee, COD, instant payouts, automatic international duty estimation, native mobile apps and full marketplace selling goods.

## Success metrics
Quote-to-book, paid bookings, carrier acceptance rate, pickup and delivery turnaround, on-time performance, exception/return and lost parcel rates, support response, dispute recovery, commissions, settlement variance and outstanding vendor liability. Targets require pilot baseline.

## Non-functional requirements
Authorization by role **and** carrier organization, audited status changes, integer money, idempotent payment/booking, private documentation/POD, rate limiting, robust input validation, backup/restore drills, monitoring, encryption in transit, secure secrets, access logs and resilient queue processing.

## Owner approval before release
Carrier contractual relationships, liability insurance, cancellation/refund/return rules, restricted goods, consent/location use, commission and settlement cadence, tax treatment, pilot coverage, claims evidence and escalation. No production launch before proven shipment-to-settlement E2E and security/finance acceptance.
