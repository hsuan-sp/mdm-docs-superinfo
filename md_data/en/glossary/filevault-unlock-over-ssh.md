---
term: "FileVault Unlock over SSH"

category: ["Mac"]
---

## Term Definition

A remote management capability introduced in **macOS Tahoe** that improves troubleshooting workflows for encrypted Macs.

Functional details:

- **Capability** : Allows an administrator to remotely unlock a **FileVault-encrypted** startup disk using a secure shell (SSH) connection.

- **Prerequisite** : The Mac must have "Remote Login" enabled via MDM and be connected to the network.
- **Utility** : Highly useful for remote maintenance on devices that have been rebooted but are stuck at the pre-boot login screen.

## Analogy

In the past, unlocking an encrypted Mac was like **"Having to be there in person to turn the combination lock on a heavy safe."** Now, with SSH unlocking, it's like having a **"Verified Remote Remote Control."** As long as the computer is online, IT can securely unlock the "digital vault" from their office to fix a software error, saving them from having to walk across the entire campus to your specific desk just to type a password.
