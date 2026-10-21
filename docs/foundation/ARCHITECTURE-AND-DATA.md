# Technical Architecture, Data Model and API Contracts

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

## Existing baseline
React/Vite frontend routes and Express API with MongoDB/Mongoose; authentication, shipments, service zones, rates, tracking, payments and admin controllers. Current user roles customer/admin/agent cannot enforce independent carrier tenancy. Some rates/addresses and Stripe checkout default to USD/US; migrate deliberately.

## Proposed target services
Frontend → versioned Express API → MongoDB with transactions/constraints → durable job workers for notifications, payment events and merchant webhook retries. Private object storage for carrier verification and proof-of-delivery. Payment gateway interface accepts a Nigeria-supported processor after commercial review. Optional geocoding/map adapter. No invented live GPS feed.

## Proposed entities
User; Organization(type platform/merchant/carrier,status); OrganizationMembership(user_id,org_id,role); CourierVerification(org_id,private_documents,approved_at); ServiceZone; CarrierService; RateCard; Quote(expires_at,price_minor,currency,carrier_id); Shipment(owner_org_id,carrier_org_id,tracking_id unique,locked_quote,status); ShipmentEvent; DriverAssignment; ProofOfDelivery(private_asset_id); Payment(reference unique,amount_minor,currency,status); WebhookEvent(event_id unique); LedgerEntry(account,amount_minor,shipment_id); PayoutBatch; Refund; Dispute; Notification; ApiCredential; WebhookDelivery; AuditEvent.

## Planned API contracts (not yet implemented)
POST /api/v1/carriers/apply; POST /api/v1/admin/carriers/:id/approve; GET /api/v1/carriers/services; POST /api/v1/quotes; POST /api/v1/shipments (Idempotency-Key); GET /api/v1/me/shipments; GET /api/v1/tracking/:code; POST /api/v1/carrier/shipments/:id/assign; POST /api/v1/shipments/:id/events; POST /api/v1/shipments/:id/pod; POST /api/v1/payments/initialize; POST /api/v1/webhooks/payments; GET /api/v1/vendor/settlements; POST /api/v1/disputes; GET /api/v1/admin/reconciliation.

## Invariants and ADRs
Only server determines carrier, payment price and ownership. Every carrier-owned DB query constrained by orgId. Quote expiry and currency checked before booking; paid shipment ties to exact gateway transaction. Shipment transitions are state-machine validated and append-only auditable. POD access is scoped. Ledger entries must balance and reversing entries represent refunds. ADR-001 v5 provisional canonical stack; ADR-002 Nigeria NGN first; ADR-003 event tracking before GPS; ADR-004 controlled merchant API; ADR-005 staging and production separated; ADR-006 no automatic legacy merges.
