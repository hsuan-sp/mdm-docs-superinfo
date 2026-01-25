---
term: "APNs (Apple Push Notification service)"

category: ["Core", "Apple"]
---

## Term Definition

**Apple Push Notification service (APNs)** is the critical "Messenger" between an MDM server and an Apple device.

Because an MDM server cannot communicate directly with a device (due to firewalls and battery-saving sleeps), it follows this workflow:

1. **Signal** : The MDM server sends a push command to Apple’s APNs servers.

2. **Wake up** : APNs "wakes up" the device via a persistent low-power connection.

3. **Check-in** : The device is instructed to check in with the MDM server to receive its tasks.

**Crucial Note** : If the connection to APNs is blocked (e.g., by a school firewall or misconfigured network), management of the devices will fail entirely.

## Analogy

APNs is the **"Tap on the Shoulder"** for your iPad.

When the school’s management system wants to install an app, it can't just shout—it has to ask Apple to "tap" the iPad's shoulder and say, "Hey, go check the school server for a new mission."

If this messenger can't get through the school gate (the firewall), the iPad will never know it has new work to do.
