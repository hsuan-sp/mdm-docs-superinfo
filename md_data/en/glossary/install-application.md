---
term: "Install Application"

category: ["Core"]
---

## Term Definition

**"Install Application"** is the fundamental MDM command sent to a device to initiate software deployment.

Operational flow:

1. **Command Issuance** : The MDM server sends a directive containing the app's unique identifier (App Store ID or Bundle ID).

2. **Device Reception** : The device acknowledges the command and checks its network status.

3. **Execution** : The device contacts the **App Store** (or a local VPP distribution point) to securely download and install the software.

4. **Acknowledgment** : Once complete, the device reports the successful installation status back to the MDM console.

## Analogy

This is like sending a **"Digital To-Do List"** to the device.

Instead of the teacher having to walk around and manually download an app on every single student's iPad, the teacher creates a master list of required tools and sends it out as a command.

Every iPad in the fleet receives the list and immediately goes to the **"Digital Library"** (the App Store) to pick up the specific tools it needs for the upcoming lesson.
