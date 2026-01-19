---
term: "APNs (Apple Push Notification service)"
category: ["Apple"]
---

## Definition

Apple Push Notification service (APNs) is the "Messenger" between an MDM server and an Apple device. Since an MDM server cannot talk directly to a device, it must send a signal to Apple’s APNs servers first. APNs then "wakes up" the device and tells it to check in with the MDM server to receive its tasks. If the connection to APNs is blocked (e.g., by a school firewall), management of the devices will fail entirely.

## Plain English

APNs is the "Tap on the Shoulder" for your iPad. When the school’s management system wants to install an app, it can't just shout—it has to ask Apple to "tap" the iPad's shoulder and say, "Hey, go check the school server for a new mission." If this messenger can't get through the school gate (the firewall), the iPad will never know it has new work to do.
