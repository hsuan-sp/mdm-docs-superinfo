---
term: "Enforcement Deadline"
category: ["DDM"]
tags: ["DDM", "Software Update", "Compliance"]
---

## Definition

An Enforcement Deadline is a core feature of Declarative Device Management (DDM) that allows administrators to set a strict "must-comply" date and time for actions like software updates or MDM migrations. As the deadline approaches, the device increases the frequency of notifications to the user. Once the deadline passes, the user can no longer dismiss the update prompt, and the action is executed autonomously by the device.

## Plain English

Think of it as a "Library Book Due Date." One week before it's due, you get a gentle reminder. One day before, you get a more urgent alert. Once the deadline hits, the library "locks your account" until you return the book. Enforcement Deadlines ensure that critical security updates are finished on time across the entire school.

## MDM Context

This is often used in conjunction with Zero-Wipe MDM Migrations or mandatory OS updates to ensure 100% fleet compliance without the need for the MDM server to constantly poll the device.
