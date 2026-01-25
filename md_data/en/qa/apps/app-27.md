---
id: app-27

title: "How to update apps via Jamf Pro? (Automated Enforcement and Manual Force Update)"

category: "Section 3: App Management & Distribution"

important: true

tags: ["App Update", "Jamf Pro", "Manual Update", "Auto Update", "DDM"]
---

**In Jamf Pro, app updates are primarily managed through "Automated Enforcement" and the "Force Update" button.** To ensure classroom iPads remain up-to-date, it is recommended to combine automated checking with manual enforcement when necessary.

## 1. Configuring Automated Updates and Sync Schedules

Go to **Devices > Mobile Device Apps** and select the app you wish to manage. In the **"General"** tab, configure the following:

- **Schedule App Checks**: Check the option **"Automatically check for app updates"**. This ensures Jamf Pro stays informed about new descriptions, icons, and versions.

- **Automated Enforcement**: Check **"Automatically force app updates"**. The system will then automatically send update commands to mobile devices whenever a new version is detected.
- **Sync Time**: Adjust the **"App Store Sync Time"** to a time outside of school hours (e.g., midnight) to avoid peak network traffic.

## 2. Manually Forcing App Updates (Force Update)

For urgent updates, navigate to **Devices > Mobile Device Apps** and select the target app. You can trigger an update manually without waiting for the schedule:

1. Go to the detailed information page for the app.

2. Scroll down to the **"Force App Update"** section.
3. Click the **`Force Update`** button. Jamf Pro will immediately send a force update command to all devices within the app's **"Scope."**

## 3. Considerations for 2026: DDM and Update Constraints

In iOS 26 and the latest system environments, update execution is still subject to the following rules:

- **In-Use Limitation**: If a student is currently using the app, the update will remain "Pending." Forcing the update will attempt to close the app, which may cause a crash during teaching.

- **Single App Mode**: If an iPad is in "Guided Access" or "Single App Mode," it will not receive or install app updates. The mode must be deactivated first.
- **Silent Conversion**: If an app was originally installed manually by a student, ensure **"Convert unmanaged app to managed"** is enabled so Jamf Pro can take control.

**💡 Pro Tip**:

When pushing mass updates, ensure your school's **"Content Caching"** server is working properly to prevent all iPads from downloading from Apple simultaneously and saturating your bandwidth.
