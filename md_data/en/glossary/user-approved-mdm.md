---
term: "User Approved MDM"

category: ["Enrollment", "macOS"]
---

## Term Definition

**User Approved MDM (UAMDM)** is a trusted status for macOS enrollments.

Distinction:

- **Automated Enrollment** : Automatically "User Approved" because the device was registered by the organization (Apple Business Manager).

- **Manual Enrollment** : If a user manually installs a profile, they*must* also go into System Settings and click "Approve" to grant UAMDM status.
- **Privileges** : Only UAMDM devices can accept sensitive security payloads (like Kernel Extensions or Full Disk Access controls) silently. Without this status, the MDM is considered "Untrusted" for deep system changes.

## Analogy

Think of this as a **"Certificate of High Trust."** If you hire a cleaner for your house, they can clean the windows. But if you want to give them the keys to the **Main Security Gate** , you need to sign a special legal document saying, **"Yes, I trust them completely."** User Approved MDM is that signature. Without it, the MDM can only do basic cleaning; it's not allowed to touch the locks.
