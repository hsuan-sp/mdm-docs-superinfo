---
id: mac-29

title: "How to push system updates (iOS/iPadOS/macOS) via Jamf Pro?"

category: "Section 1: Hardware & OS Updates"

important: true

tags:
  [
    "System Updates",

    "Jamf Pro",

    "DDM",

    "Software Update Blueprints",

    "iOS Update",

    "macOS Update",
  ]
---

**By 2026, software update management in Jamf Pro has fully transitioned to the "Declarative Device Management (DDM)" framework.** This approach is more stable than legacy remote commands and allows devices to autonomously handle the download and installation process, significantly reducing server load.

## 1. Using "Software Update Blueprints"

This is the recommended and most professional method:

1. Navigate to **`Settings` > `Device Management` > `Software Update Blueprints`**.

2. Click `New` and set the target version (e.g., iOS 26.x or macOS 26 Tahoe).
3. **Key Setting: Enforcement Deadline**:
   - Set a specific date and time (e.g., Three days from now at 5:00 PM).
   - Before the deadline, users will receive gentle system notifications.
   - **Once the deadline is reached, the device will ignore the user's state, force a restart, and install the update.**

4. Assign this blueprint to the target device group.

## 2. Using Mass Actions for Remote Commands (Legacy Way)

If you need to send an update immediately to a specific set of search results:

1. On the search results page for `Mobile Devices` or `Computers`, click **`Action`** at the bottom right.

2. Choose **`Send Remote Commands`**.
3. Select **"Update OS version on supervised devices"** from the list.
4. On the **"Update OS Options"** page, choose your desired settings:
   - **Target Version**: Recommended to select "Latest version based on device eligibility."
   - **Action**:
     - **Download the update for users to install**: The device will pre-download the files, and students can install them at their convenience.
     - **Download and install the update, and restart devices after installation**: This forces the update immediately; ideal for scheduling after school hours.

## 3. Management Highlights for 2026: macOS 26 Tahoe and Intel Macs

- **Legacy Support**: macOS 26 is the final version to support Intel-based Macs. For these older devices, allow double the download time and ensure the **Bootstrap Token** is correctly escrowed.
- **DDM Autonomy**: In the latest systems, devices use DDM declarations to automatically perform updates when connected to power and idle (e.g., overnight), with much higher success rates than traditional push commands.

## Best Practices:

1. **Avoid Exam Weeks**: While updates can be enforced, avoid doing so during exam periods or presentations to prevent devices from entering the 15–30 minute update screen unexpectedly.
2. **Power Confirmation**: Remind students to plug in their iPad/Mac overnight when an update is scheduled. Constant power is the most critical factor for a successful update.
