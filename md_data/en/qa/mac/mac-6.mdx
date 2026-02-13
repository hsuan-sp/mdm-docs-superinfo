---
id: mac-6

title: "How can I quickly reset (wipe) a Mac lab, similar to using recovery cards?"

category: "Section 7: Advanced Mac Management"

important: false

tags:
  ["Reset", "EACS", "Erase All Content and Settings", "Computer Lab", "Imaging"]
---

**In the era of Apple Silicon (M-series), using "recovery cards" or "Ghost" imaging is no longer recommended and often not even possible. Instead, use the "Erase All Content and Settings (EACS)" command.**

Traditional monolithic imaging has been completely retired by Apple. The modern reset logic is "Clear user data + Keep operating system + Automatically re-enroll."

## Comparison of Reset Methods

| Feature              | Legacy Re-imaging                       | Erase All Content and Settings (EACS)     |
| :------------------- | :-------------------------------------- | :---------------------------------------- |
| **Principle**        | Format drive > Re-download & install OS | Destroy encryption keys > Clear user data |
| **Time Required**    | 1-2 hours                               | **5-10 minutes**                          |
| **Network Demand**   | Requires 12GB+ OS download              | **Minimal bandwidth**                     |
| **Data Security**    | Disk formatting (recoverable)           | Cryptographic destruction (unrecoverable) |
| **Hardware Support** | All Intel/Apple Silicon Macs            | Macs with T2 or Apple Silicon chips       |

## Standard Reset SOP (Jamf Pro)

### 1. Send Command

- Send the **"Wipe Computer"** command to the target computer group in Jamf Pro.
- **Crucial**: For Apple Silicon and T2-equipped Macs, this command automatically triggers **EACS (Erase All Content and Settings)**.

### 2. Execution (Within minutes)

- The system instantly discards the encryption keys (Cryptographic Erase), making data unreadable within seconds.
- The computer reboots to the "Hello" (Setup Assistant) screen.

### 3. Automated Deployment (Zero-Touch)

- The computer connects to the network (Ensure a non-authenticated Wi-Fi or wired network is provided).
- **ADE (Automated Device Enrollment)** is triggered automatically.
- PreStage Enrollment settings are downloaded, admin accounts are created, and software is installed automatically.

## Difference from Traditional Recovery Cards

- Traditional cards "restore on every reboot."
- Modern Mac management uses EACS reset at the "end of a semester or project."
- If daily restoration is required (e.g., for library public kiosks), consider using **"Guest User" mode** (which deletes data upon logout) or specialized kiosk software (like Deep Freeze for Mac).
