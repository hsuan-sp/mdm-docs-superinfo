---
id: enr-9

title: "Jamf Pro commands are stuck in 'Pending', but the device is definitely online. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags:
  [
    "Stuck Commands",

    "Push Notification Service",

    "APNs",

    "Declarative Management",

    "Blank Push",
  ]
---

**'Pending' means the command has been sent to Apple's servers, but the device has not yet contacted the server to report its status.**

In the current architecture where **Declarative Device Management (DDM)** runs alongside traditional MDM protocols, command status updates rely heavily on device response. If commands stall, check these core factors:

1. **APNs Communication Blocked**:
   - This is the most common cause. Even if the device can browse the web, if the firewall blocks **TCP Port 5223** (used for communicating with Apple servers), push commands will never reach the device.
   - **Test**: Switch the device to a mobile hotspot. If the status immediately changes from "Pending" to "Completed", it proves a campus network restriction.

2. **Device entered Deep Sleep**:
   - iPads in deep sleep (screen locked for a long time without power) enter power-saving mode, potentially delaying push responses.
   - **Solution**: Wake the screen by pressing the Home or Top button to force the device to contact the server.

3. **Send a 'Blank Push' Command**:
   - In the device record in Jamf Pro, click **Management > Send Blank Push**.
   - This is a non-destructive command used purely to "wake up" the device. It forces the device to reconnect to Apple APNs, which then triggers the retrieval of subsequent queued commands.

4. **Date & Time Accuracy**:
   - If the device time drifts by more than a few minutes, the SSL secure connection fails. Ensure "Set Automatically" is enabled in Settings.

## Practical Advice:

If a single device is frequently Pending, it's usually a local network or hardware sleep issue. If devices across the entire school are Pending simultaneously, prioritize checking if the **APNs Certificate** in Jamf Pro is still valid.
