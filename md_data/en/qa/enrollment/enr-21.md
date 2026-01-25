---
id: enr-21

title: "Can I use Apple Configurator to manually add devices that don't appear in ASM?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags: ["Apple Configurator", "Manual ASM Addition", "Provisional Period"]
---

**Yes. For devices not purchased through an authorized education reseller, you can use Apple Configurator to manually enroll them into your Apple School Manager (ASM) organization.**

This allows "retail" iPads or Macs to achieve the same management status (Supervised) as those purchased through official channels.

## Preparation:

1. **Hardware**: A Mac with **Apple Configurator** installed, or an iPhone with the **Apple Configurator app** (for adding Macs to ASM).
2. **Permissions**: An ASM account with "Device Enrollment Manager" or "Administrator" roles.
3. **Device State**: The iPad must be on the **Setup Assistant** (Hello) screen. If it is already in use, it must be erased first.

## The 30-Day Provisional Period:

Devices added manually to ASM have a **30-day "grace period"**:

- **User Rights**: During these 30 days, a user can manually remove the MDM profile via the device Settings.

- **Permanent Enrollment**: After 30 days, the device becomes a permanent part of the organization. The MDM profile becomes unremovable, just like a device purchased via ADE.

## Important Reminders:

- **Windows Limitation**: The **Apple Devices app** for Windows can perform restores, but it **cannot** manually add devices to an ASM organization.
- **Release Risk**: If you "Release" a manually-added device from ASM, it can only be added back using Apple Configurator again; it will not reappear automatically.
