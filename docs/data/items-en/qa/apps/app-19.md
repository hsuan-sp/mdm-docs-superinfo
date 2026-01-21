---
id: app-19
title: "How do I lock an iPad into a 'Single App' for exams? Can students exit themselves?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: true
tags: ["Single App Mode","ASAM","Assessment Mode","Risk Warning"]
---

## Q: How do I lock an iPad into a 'Single App' for exams? Can students exit themselves?

## Answer

**Standard 'Single App Mode' cannot be exited by the user. If you need exit flexibility, you should use 'Autonomous Single App Mode (ASAM)'.**

Choosing the wrong mode is a leading cause of "bricked" devices during school deployments:

## Mode 1: MDM-Enforced Single App Mode

* **Logic**: The administrator sends a lock command. The device remains locked until a second "unlock" command is received.
* **Risk**: **Network Dependency**. If Wi-Fi fails while locked, the device cannot receive the unlock command. Since the user cannot access Settings to reconnect Wi-Fi, the device is "stuck" and may require an Ethernet adapter (RJ45) or a full restore to rescue.
* **Use Case**: Kiosks, digital signage, library lookup stations.

## Mode 2: Autonomous Single App Mode (ASAM) — Recommended for Exams

* **Logic**: Permission is delegated to the app. When a student starts an exam, the **App locks itself**. Once the exam is submitted, the **App unlocks itself**.
* **Benefit**: No network dependency for unlocking. Even if the Wi-Fi drops, the student can finish the exam and the app can release the lock locally.
* **Setup**: In Jamf Pro, add the app's Bundle ID to the "Autonomous Single App Mode" allowlist in a Restrictions profile.

## Mode 3: Guided Access — Small Scale

* **Logic**: A local iOS feature (not MDM). A teacher triples-clicks the power button to lock.
* **Benefit**: Controlled by the person in the room; no "network bricking" risk.

## Practical Advice for 2026:

* **Formal Assessments**: Require your software vendor to support **ASAM** (e.g., LockDown Browser). This is the enterprise standard. **OS 26 integrates ASAM into the DDM framework, ensuring stability even during transient network drops.**
* **Informal Quizzes**: Use **Guided Access** for manual control.
* **Avoid**: MDM-Enforced Single App Mode for large groups of student devices unless you have 100% Wi-Fi confidence and Ethernet adapters on standby.
