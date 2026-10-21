# Courier Marketplace, Dispatch and Operating Policies

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

## Provider lifecycle
Apply → identity/company and operating-zone review → contract and insurance evidence when applicable → manual admin approval → publish active service/rate cards → monitor fulfillment → suspend/reinstate with reasons. Do not advertise partnerships or services not evidenced by actual contract and coverage.

## Shipment lifecycle
quote_created → booking_pending_payment → payment_verified → carrier_accepted → driver_assigned → pickup_scheduled → picked_up → in_transit → out_for_delivery → delivered (POD verified). Exceptions: declined, cancelled, failed_pickup, delivery_attempted, return_requested, returning, returned, damaged, lost, disputed. Define allowed predecessor transitions and actors in code; never accept arbitrary role-free status updates.

## Quote and finance logic
Server calculates route/weight/service quote using active rate card and stores a frozen breakdown: carrier charge, explicitly disclosed platform fee and taxes/insurance if applicable. Exact commission, carrier liability, refund windows and settlement periods require founder/finance/legal approval. Pilot with manually approved payout batches and provider reconciliation, not automatic split transfers without verification.

## Customer support
Track failed pickups, delivery evidence challenges, recipient unavailability, refunds, compensation and damaged goods. Tickets have severity, assigned owner, deadline, evidence and disposition. Protect recipient/sender addresses in customer-facing tracking. Gather only consented location data when essential.

## Pilot strategy
Start with vetted courier partners in limited Lagos corridors. Validate real collection, scanning/POD, late delivery, refunds and payable statements. Expand geography/carriers only after reliable measured pilot. Ecommerce checkout integrations (WooCommerce/Shopify) are post-core unless an authenticated merchant API is production-proven.
