---
id: app-24
title: "How do I restrict student iPads to download apps only over Wi-Fi to save cellular data?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["Cellular Data", "Wi-Fi", "App Download", "Traffic Management", "iOS 26"]
---

## Q: How do I restrict student iPads to download apps only over Wi-Fi to save cellular data?

## Answer

**In iOS 26 and iPadOS 26, the 'Declarative Device Management' (DDM) framework includes a new 'Restrict App Download Over Cellular' setting. This allows schools to force apps to download or update only in Wi-Fi environments, effectively managing SIM card data costs.**

## Configuration

This feature is implemented via **DDM** configurations. In **Jamf Pro**:

1. Go to **Blueprints** or **App Declarations**.
1. Define the policy for individual managed apps or a group of apps.
1. Set the **'CellularDataPolicy'** in the deployment declaration:

* **Disallow**: Forces download/update to happen only over Wi-Fi.
  * **Allow**: Permits installation over any available network.

1. Deploy to the target group (Requires **iOS 18+** and a **Supervised** device).

## Use Cases and Benefits

* **Subsidized SIM Cards**: Many government projects provide iPads with limited monthly data (e.g., 10GB). This prevents students from accidentally exhausting the plan by downloading large apps or updates outside of school.
* **BYOD/Parent-Paid Plans**: For personal devices where parents pay for the data, this setting helps prevent high bills caused by background app activity.

## Impact and Limitations

* **Applies to**:
  * Manual App Store downloads.
  * MDM-initiated (DDM) automated installs.
  * App auto-updates.
  * **Does NOT apply to**:
  * General web browsing or video streaming (YouTube still consumes data unless managed by a Content Filter).
  * In-app content updates (e.g., additional data packs inside a game).
  * **User Experience**: When a student tries to download an app on 4G/5G, the button will be grayed out or a prompt will appear: "Please connect to Wi-Fi to download."

## Expert Strategy

Restricting app downloads is only one part of data management. For complete control, combine this with:

* **Content Filtering**: To block data-heavy sites or streaming.
* **Per-App VPN**: To route specific app traffic only through school-approved gateways.
* **User Education**: Teaching students to identify high-bandwidth behaviors.
