---
category: 'Section 2: Device Enrollment & Deployment'
id: enr-2
important: false
tags:
  - Manual Enrollment
  - Account-Driven
  - Supervised
  - Apple Configurator
title: >-
  Can we just install a profile manually? What is the difference between Manual
  and Automated Enrollment?
---
## Q: Can we just install a profile manually? What is the difference between Manual and Automated Enrollment?

## Answer

* **Yes, you can, but manual Enrollment (User-Initiated) provides significantly less administrative control compared to Automated Device Enrollment (ADE).**

Manual Enrollment is typically reserved for personal "Bring Your Own Device" (BYOD) scenarios or donated legacy hardware that cannot be added to Apple School Manager (ASM).

## Key Differences:

1. **Management Authority**:

* **Automated (ADE) **: Devices are placed in**"Supervised Mode"** by default. This grants the school the highest level of authority, enabling features like silent app updates, forcing restrictions (kiosk mode), and preventing the removal of the management profile.
* **Manual**: Devices are "Unsupervised." The school has limited control and cannot force certain high-level restrictions.

1. **Removal Rights**:

* **Automated (ADE) **: The school can make the management profile**"Non-Removable."** The student cannot delete the profile from settings.
* **Manual **: The user can delete the management profile at any time via** Settings > General > VPN & Device Management**, instantly disconnecting the device from the school's control.

1. **Modern Methods**:

* **While old-fashioned manual Enrollment required visiting a web URL in Safari, the modern approach is **"Account-Driven Enrollment."** Users simply sign in with their Managed Apple Account in Settings, and the system automatically guides them through the Enrollment.

## How to Upgrade Manual Devices to "Supervised" Status:

If you have a device that wasn't bought through school channels but you want full control over it:

1. **Physical Link **: Connect the iPad to a Mac running** Apple Configurator**.
2. **Prepare **: Use the "Prepare" wizard and select**"Add to Apple School Manager."**
3. **Wipe & Bridge **: This process** will erase the device**. Once completed, the device enters a 30-day "provisional period" during which the user can still opt-out. After 30 days, the device is permanently merged into your ASM organization as a fully Supervised asset.

## Institutional Advice:

For school-owned assets, always insist on **Automated Device Enrollment (ADE)**. Manual Enrollment should only be used as a temporary workaround or for personal devices joining the campus network.
