---
id: enr-18

title: "Can I remove Activation Lock directly in ASM now? Do I still need Apple Support?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags: ["Activation Lock", "ASM", "Automated Device Enrollment", "Unlock"]
---

**Yes. As long as the device belongs to your organization, you can now self-service Activation Lock removal directly through the Apple School Manager (ASM) interface.**

This eliminates the need to call support or provide invoices for managed hardware, significantly streamlining school administration.

## Self-Service Unlocking Steps:

1. Log in to **[Apple School Manager (ASM)](https://school.apple.com)**.
2. Select **Devices** from the sidebar and search for the target serial number.
3. Open the device details and look for the toolbar button (or "More" menu).
4. Click **Turn Off Activation Lock** and confirm.
   - **Success Flow**: Apple's servers will de-link the serial number from the previous account. Wait 2-10 minutes, then restart the device or perform a Restore via computer to bypass the password screen.

## Prerequisites and Limitations:

- **Ownership**: The device must appear in your ASM device list.
- **Management Mode**: This applies to Supervised devices assigned via **Automated Device Enrollment (ADE)** or added via Apple Configurator.
- **Connectivity**: The device must be connected to Wi-Fi to communicate with Apple's activation servers and confirm the unlock.

## Why Prioritize This Method?

- **No Red Tape**: No need for invoices, official documents, or waiting 3-10 days for Apple Support to review the case.
- **Last Resort**: If a device was accidentally deleted from the MDM (losing the Bypass Code), ASM is your only remaining self-service path.

## Practical Advice:

If you need to reinstall the OS after unlocking, Windows users should use the **Apple Devices app**, and Mac users should use **Finder** or **Apple Configurator**. Once restored, the lock will be gone.
