---
term: "RADIUS"

category: ["Network"]
---

## Term Definition

**RADIUS** (Remote Authentication Dial-In User Service) is a networking protocol that enables centralized Authentication, Authorization, and Accounting (AAA).

Use cases in education:

- **Wi-Fi Security** : Often paired with **802.1X** to verify that a user is allowed on the network.

- **VPN Access** : Checks credentials before allowing remote access to internal servers.
- **Centralization** : Instead of every Wi-Fi router needing its own list of passwords, they all check a single central server (the RADIUS server) to approve access requests.

## Analogy

Think of RADIUS as the **"Central Security Server"** for a building's smart locks.

When you try to open a door (connect to Wi-Fi) with your ID card (your device's certificate), the lock itself doesn't decide if you can enter.

Instead, it sends your data to the central server (RADIUS) to check the main list. If the server says **"Yes, they are a current student,"** the door unlocks and you're online.
