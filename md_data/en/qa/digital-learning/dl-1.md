---
id: dl-1

title: "The VPN icon disappeared after updating to iPadOS 17. Is this normal?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags: ["iPadOS 17", "VPN", "Jamf Trust", "MOE Project", "Architecture"]
---

**Yes, this is completely normal. It reflects a shift in the management architecture designed to optimize connection speeds and ensure compatibility with local educational network standards.** In alignement with the latest digital learning policies, the **Jamf Trust** agent has transitioned from a full-tunnel VPN to a more efficient **"DNS Proxy"** and **"Content Filter"** architecture.

## Key Changes:

1. **Icon Removal**: Because the system no longer creates a global VPN tunnel, the "VPN" label is no longer displayed in the status bar. This does **not** mean the device is unprotected.
2. **Improved Performance**: This new architecture significantly reduces battery drain and resolves common issues such as network lag during classroom app updates.
3. **Local Network Compatibility**: By moving away from a traditional VPN tunnel, devices can communicate more efficiently with local campus caching servers, ensuring that heavy educational content (like video lessons) loads faster.

## How to Verify Protection is Active:

- **Check the App**: Open the **Jamf Trust** app on the iPad. If you see a **Green Shield (Protected)**, the filtering and data reporting functions are operating correctly.
- **Inventory Status**: In the Jamf Pro dashboard, verify that the "Content Filter" and "DNS Proxy" configuration profiles are listed as "Installed" for that device.

## Institutional Advice:

If you see yellow or red warnings inside the Jamf Trust app regarding "Passcode not set" or "OS outdated," you can usually ignore these as long as the main shield remains green. The device is still successfully reporting its status for compliance purposes.
