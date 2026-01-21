---
id: app-9
title: "Do I need the student's Apple ID password to update apps? How can I achieve silent updates?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["App Updates","Device-based Assignment","Automated Updates","DDM"]
---

## Q: Do I need the student's Apple ID password to update apps? How can I achieve silent updates?

## Answer

**No password is required. As long as you use "Device-based Assignment," the update process is completely hands-off.**

## The Preferred 2026 Method: Declarative Device Management (DDM)

Under the latest OS architecture, **DDM** is the best path for silent updates:

* **Autonomy**: The device itself monitors app versions based on the MDM declaration and triggers downloads in the background. It no longer relies on a one-way "push" command from the server.
* **Status Transparency**: Admins get real-time progress reports (e.g., "Downloading" or "Insufficient Space") instead of the vague "Pending" status seen in older MDM versions.

## Traditional MDM Configuration (Compatibility Layer):

1. **License Mode**: Must be set to "Device-based" (bound to serial number).
1. **Supervised Mode**: The iPad must be in a "Supervised" state.
1. **Jamf Configuration**: In the app's distribution settings, enable **"Automatically Update App."**

* *Note: On DDM-supported devices, this checkbox automatically triggers a DDM declaration.*

## Common Troubleshooting for Failed Updates:

* **App in Use**: If a student is currently using the app, the system will typically wait until the app is in the background or the device is idle before updating.
* **Insufficient Storage**: Updates require temporary space to download the installer. If the device is full, the update will fail.
* **Stuck Commands**: If you see many pending update commands, try sending a **"Blank Push"** to force the device to check in with Apple servers.

**Note**: DDM makes the device more proactive in scheduling updates, reducing its real-time dependency on the MDM server for simple maintenance tasks.
