---
term: "Push Notification"
category: ["Core", "Apple"]
---

## Definition

A Push Notification is a core technology used by Apple's **APNs** (Apple Push Notification service) to allow an MDM server to "wake up" a device. Because managed devices often enter a low-power "Sleep" state to save battery, they do not constantly check the MDM server for new instructions. When the server has a new task (like an app to install), it sends a "Push" (a wakeup packet). The device receives this "Poke," wakes up, and immediately checks in with the server to receive its new commands.

## Plain English

Think of this as a "Digital Tap on the Shoulder." To save its battery, your iPad sleeps whenever it can. When the tech team at school wants to give you a new app, they can't just shout—they send a "Push Notification." It’s like a tap on the shoulder that wakes the iPad up and whispers, "The teacher has some new work for you; go check the server!"
