---
category: 'Section 8: Education Scenarios'
id: edu-17
important: true
tags:
  - Screen Recording
  - Restrictions
  - Control Center
title: Why is the 'Screen Recording' button missing or grayed out on student iPads?
---
## Q: Why is the 'Screen Recording' button missing or grayed out on student iPads?

## Answer

* **This is typically because 'Screen Recording' is restricted in the school's MDM Profile, or the button simply hasn't been added to the Control Center.**

## Troubleshooting Steps:

1. **Check MDM Restrictions (Most Common)**:

* **Many schools disable ** Allow screen recording**in the ** Restrictions**profile to prevent students from recording lessons or non-educational content.
* **Fix**: If a teacher requires this for a project, the IT Coordinator must enable it in Jamf Pro for that specific classroom group.

1. **Check Control Center Settings**:

* **If not restricted but still missing, the button might not be in the menu.**
* **Fix **: Go to** Settings > Control Center **and tap the green**+** next to **Screen Recording**.

1. **Check Screen Time**:

* **If a student (or parent) enabled local Screen Time restrictions, this can also block the feature. Check ** Settings > Screen Time > Content & Privacy Restrictions**.
