---
id: app-22

title: "Purchasing Procreate vs. Procreate Pocket: What's the difference, and what if we bought the wrong version?"

category: "Section 3: App Management & Distribution"

important: false

tags: ["Procreate", "App Purchasing", "VPP", "Universal Purchase", "Refund"]
---

**Buying the wrong version of a high-profile app is a common clerical error in educational procurement.** These two apps are distinct product lines and do **not** support "Universal Purchase."

## Specification Comparison:

- **Procreate (iPad version)**: Designed specifically for iPadOS and Apple Pencil. Supports large canvases and the full brush engine. This is the industry standard for art classes. **Higher price point**.
- **Procreate Pocket (iPhone version)**: Designed for the smaller iPhone interface. While it _can_ be installed on an iPad (via compatibility mode), it will have black bars around the interface and lacks support for Pencil pressure sensitivity and tilt. **Lower price point**.

## Standard Process for Correction:

1. **Request a VPP Refund**:
   - The administrator should log in to **Apple School Manager**, go to **Settings > Payments and Billing > View Purchase History**.
   - Alternatively, log in to **reportaproblem.apple.com** using the Managed Apple Account used for the purchase.
   - Select the order and "Request a refund," citing "Purchased wrong version." (_Note: Apple typically decides on refunds within 24–48 hours._)

2. **Re-purchase**:
   - Because the licenses are not interchangeable, you must purchase the correct iPad version to deploy it to student iPads.

3. **Clean Up**:
   - In Jamf Pro, ensure you remove the "Pocket" version from any scopes to prevent students from installing the low-resolution version, which would degrade the classroom experience.
