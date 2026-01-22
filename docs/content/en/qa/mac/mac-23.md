---
id: mac-23
title: "Classroom Order: How to manage or disable 'iPhone Mirroring' to prevent student distractions."
category: "Section 7: Mac Management"
important: false
tags: ["iPhone Mirroring", "Classroom Management", "Restrictions", "macOS 26", "Security"]
---

**macOS 26 provides granular MDM controls for 'iPhone Mirroring.' IT coordinators can set different permission levels for 'Shared Lab Macs' versus 'Teacher Presentation Macs.'**

## Management Modes (SOP)

Using Jamf Pro's **Restrictions** payload, you should apply one of these three strategies based on the machine's location:

1. **Full Disable (High Security labs)** :

* **Best For** : Library open-access Macs, Computer Labs.
* **Setting** : Uncheck `Allow iPhone Mirroring`.
* **Effect** : If a student tries to pair their iPhone, they will see a message: "This feature is disabled by your organization." This prevents students from showing social media or personal photos on school monitors.

1. **Forced View-Only (Presentation Focus)** :

* **Best For** : Classroom podium Macs used by teachers.
* **Setting** : Enable `Force View-Only Mirroring`.
* **Effect** : The iPhone screen can be displayed on the Mac (perfect for demonstrating a student's mobile project), but the teacher's Mac keyboard and mouse cannot control the iPhone. This prevents accidental interaction with the student's personal notifications.

1. **Restricted Data Transfer (DLP Focus)** :

* **Best For** : Faculty/Staff administrative computers.
* **Setting** : Disable `Allow File and Clipboard Sync with iPhone Mirroring`.
* **Effect** : Personal iPhone mirroring is allowed, but the ability to drag-and-drop files between the school Mac and the personal iPhone is blocked to prevent data leakage.

## Administrative Insight:

Don't forget the **Purple indicator** ! macOS 26 shows a prominent purple bar in the menu bar whenever iPhone Mirroring is active. During classroom rounds, teachers can easily spot if a student is mirroring a device that shouldn't be.
