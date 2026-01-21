---
id: dl-5
title: "Students are deleting the Jamf Trust app. How does this affect compliance, and how do we prevent it?"
category: "Section 5: Digital Initiatives (MOE Project)"
important: false
tags: ["Compliance","Security","Restrictions","Jamf Trust"]
---

## Q: Students are deleting the Jamf Trust app. How does this affect compliance, and how do we prevent it?"

## Answer

**Deleting Jamf Trust effectively blinds your reporting system. The device will be marked as "Unused" in official compliance audits, even if the student is using it for class every day.**

To ensure your school meets its Key Performance Indicators (KPIs), you must implement technical safeguards.

## Barrier 1: Prevent App Deletion (Most Effective)

1. In Jamf Pro, edit the **Restrictions** profile assigned to the student devices.
1. Uncheck the box for **"Allow removing apps."**
1. **The Result**: When a student long-presses any icon, the "Delete" option simply does not appear. This is the most robust way to ensure the agent remains on the device.

## Barrier 2: Automated Self-Healing

1. In the Jamf Pro settings for the Jamf Trust app, ensure the Distribution Method is set to **"Install Automatically."**
1. Make sure the app is "In Scope" for all student groups.
1. Even if a student manages to bypass restrictions and delete the app, the device will detect the "Missing App" status during its next check-in and forcefully reinstall Jamf Trust in the background.

## Institutional Advice:

Create a Smart Group for "Devices Missing Jamf Trust" (Logic: Application Title *does not have* Jamf Trust). Set this as a tile on your Jamf dashboard. If the number is greater than zero, your ICT team knows exactly which students need to be called in for a hardware check.
