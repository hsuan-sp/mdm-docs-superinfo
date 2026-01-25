---
id: enr-15

title: "The iPad shows 'iPad Unavailable' or is locked due to too many failed passcode attempts. What should I do?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
  ["Passcode Lock", "Restore", "Apple Configurator", "Apple Devices App", "DFU"]
---

**When a device displays 'iPad Unavailable' or 'Security Lockout,' it must be erased before it can be used again. If the device is MDM-managed, the solution depends on its connectivity status.**

A security mechanism is triggered when a user enters the wrong passcode multiple times. In newer OS versions, the screen will show "iPad Unavailable" or "Security Lockout" instead of the older "Disabled" message.

## Recommended Solutions:

### Option 1: Send 'Wipe Device' Command via MDM (Preferred)

If the iPad is still connected to Wi-Fi or a cellular network (previously joined networks usually remain active even while locked):

1. Log in to Jamf Pro and find the device record.

2. Click **Management > Remote Commands > Wipe Device**.
3. **Benefit**: This is the fastest method. If the device was enrolled via **Automated Device Enrollment (ADE)**, it will reboot and immediately enter the automated setup process without further manual intervention.

### Option 2: Restore using a Computer

If the device cannot connect to the network or the MDM command cannot reach it:

1. **Prepare Tools**:
   - **macOS**: Use the built-in **Finder** or **Apple Configurator**.
   - **Windows**: Install the **Apple Devices app** from the Microsoft Store (or use iTunes for older environments).

2. **Enter Recovery Mode**:
   - **Models without a Home Button (iPad 10, Air, Pro M-series)**: Press and quickly release Volume Up, press and quickly release Volume Down, then hold the Top Button until the computer connection icon appears.
   - **Models with a Home Button (iPad 9)**: Hold both the Home Button and the Top Button simultaneously until the computer connection icon appears.

3. Click **Restore** on your computer. This will download the latest system software and erase all device content.

### Option 3: DFU Mode Restore (Advanced Troubleshooting)

If Recovery Mode fails, try DFU (Device Firmware Update) mode. The screen will remain black, but the computer will detect the device. This is typically used for repairing corrupt firmware.

## Important Notes:

- **Data Loss**: Unless an automated iCloud backup was enabled, all data will be lost upon erasure.
- **Activation Lock**: If the device was signed into a personal Apple Account with "Find My" enabled, it will require that account's password after restoration. For school property, administrators can retrieve the Bypass Code from ASM or Jamf Pro.
