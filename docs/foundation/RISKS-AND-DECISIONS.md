# Decision Register, Evidence Limitations and Risks

**Owner:** Cactus Digital Media · **Version:** 1.0 · **Date:** 2026-10-21 · **Status:** proposed; not evidence of deployed features.

Source verified: v5 has shipment, auth, tracking, payment and admin code, but runtime E2E unverified. Missing or incomplete: tenant-aware multi-vendor architecture, NGN payment control, carrier contracting, driver/POD workflows and settlement. README claims must not be interpreted as completed tests.

## Proposed decisions (pending business approval)
D01 v5 as baseline. D02 aggregator of independent couriers, not fleet-owning DHL substitute. D03 Lagos-first pilot. D04 NGN gateway, manual approved vendor settlement first. D05 shipment-event tracking before live GPS. D06 merchant API after tenant hardening.

## Open decisions
Pilot partners and areas, legal responsibility, vendor KYC/insurance, carrier/merchant agreements, package exclusions, commission, payout schedule/reserves, taxes, refund/claims SLA, consent/privacy and location policy, brand/domain, support staffing.

## Risk register
Cross-tenant data exposure (critical: query policy tests); payment manipulation/replay (critical: server price and signed callbacks); loss/damage claims (high: contracts/POD/dispute); absent vendor supply (high: pilot commitments); finance variance (high: reconciled ledger); unsafe document storage (high: private/malware-scanned); unsupported live tracking claim (medium: clear event-based statuses); legacy incompatible stacks (high: selective comparison only); deadline overrun (high: P0 scope freeze).
