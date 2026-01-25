---
id: mac-2

title: "How do we manage Local Admin privileges for staff and students on Macs?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Privilege Management", "LAPS", "Security", "Standard User"]
---

**The Gold Standard is to provide "Standard User" accounts for daily tasks, supplemented by a "just-in-time" Admin elevation tool or a Managed LAPS solution.**

Granting permanent Admin rights to students or teachers is a major security risk. It allows for the disabling of security software, the installation of unauthorized apps, and makes the campus network more vulnerable to ransomware.

## The Three-Tier Management Strategy:

### 1. Standard User by Default

- All school-issued Macs should be set up with "Standard User" accounts. This prevents users from altering core system settings or installing system-wide software without oversight.

### 2. Native LAPS (Local Administrator Password Solution)

- **2026 Status**: As of **macOS 26**, Apple includes a native LAPS protocol.
- **How it works**: Jamf Pro creates a hidden admin account on every Mac. The password for this account is a long, random string that **rotates automatically** every few days.
- **Operational use**: If a technician needs to fix a Mac, they look up the _current_ random password in the Jamf dashboard. Once used, the password is refreshed, ensuring the old one can never be used again.

### 3. Self-Service Elevation (Privileges App)

For staff members who occasionally need to install a printer driver or specialized software:

- **Tool**: Deploy the **Privileges** app (or Jamf’s equivalent).

- **Workflow**: The teacher clicks a lock icon in the Dock, justifies the need, and is granted **Admin rights for 20 minutes**. After the timer expires, the system automatically demotes them back to a Standard User.

## Institutional Advice:

Adopting the "Principle of Least Privilege" does not mean making life difficult for teachers; it means providing them with the tools to be productive while ensuring the school’s digital assets remain secure and compliant with insurance standards.
