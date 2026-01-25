---
id: enr-26

title: "How does the 'Preserve Managed Apps' feature in iOS 26 Return to Service work?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
  [
    "Return to Service",

    "iOS 26",

    "Shared iPad",

    "App Preservation",

    "Rapid Deployment",
  ]
---

**In iOS 26, iPadOS 26, and visionOS 26, 'Return to Service' introduces the ability to 'Preserve Managed Apps.' This allows you to wipe user data while keeping the actual app binaries on the device, eliminating the massive time and bandwidth cost of redownloading gigabytes of educational software.**

## Technical Principles

### Traditional Return to Service (v25 and earlier)

1. Wipes all data and apps.
2. Preserves Wi-Fi settings.
3. Reboots and auto-enrolls in MDM.
4. **MDM re-installs all apps** (This is the slowest part of the process).

### iOS 26 Enhanced Return to Service

1. MDM sends the command and the device creates a **Filesystem Snapshot**.
2. **Snapshot includes installed Managed App binaries.**
3. User data (documents, photos, settings) is wiped.
4. Device reboots and restores to the snapshot state.
5. Device auto-enrolls; **Apps are re-licensed and ready immediately** without a single download.

## Efficiency Comparison

| Step                 | Traditional Method | iOS 26 (Preserve Apps)     |
| :------------------- | :----------------- | :------------------------- |
| Wipe Data            | 2–3 mins           | 2–3 mins                   |
| Reboot               | 1–2 mins           | 1–2 mins                   |
| Re-enroll            | 1–2 mins           | 1–2 mins                   |
| App Download/Install | **30–60 mins**     | **0 mins** (Already there) |
| **Total Time**       | **35–65 mins**     | **5–10 mins**              |

## Best Use Cases

- **Semester Rotation**: Assigning a 1:1 iPad to a new student for the next term.
- **Public/Shared iPads**: Periodic clearing of student data in libraries or computer labs.
- **Bulk Deployment**: Resetting 30+ iPads at once without crashing the school's internet connection.

## Implementation in Jamf Pro

When sending a **Return to Service** command:

1. Select the **Clear Activation Lock** option.

2. Select **Retain Wi-Fi Profile**.
3. Select the new **Preserve Managed Apps** option.

## Key Limitations

- Requires **iOS/iPadOS 26** or later.
- Only works for apps deployed as **Managed Apps** via MDM.
- If the app itself requires an update, it will still trigger a download after the reset.
