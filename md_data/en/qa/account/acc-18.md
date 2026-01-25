---
id: acc-18

title: "How do I transfer VPP App licenses smoothly when changing MDM providers?"

category: "Section 1: Account & Server Management"

important: false

tags: ["VPP", "MDM Migration", "License Reclamation"]
---

**You do not need to repurchase anything. App licenses are tied to the 'Location' in Apple School Manager (ASM), not to a specific MDM software.**

As long as your licenses are in your ASM backend, you can rotate them between different MDM servers.

## Standard Transfer Flow:

1. **Reclaim Licenses in Old MDM**: This is the most critical step. You must remove the app assignment tasks in your old MDM to ensure the license status returns to "Available."
2. **Update Token in New MDM**: Upload the VPP Token for that specific location to your new MDM (e.g., Jamf Pro).
3. **Sync Content**: The new MDM will immediately pull the counts for all remaining licenses from ASM.

## Advanced Tech (MDM Migration API):

If both your old and new providers support the migration APIs introduced in iOS 17.5, a **"Silent Migration"** may be possible under specific conditions. This means apps remain on the device while ownership is "re-assigned" to the new MDM server in the background, making the transition completely transparent to the user.
