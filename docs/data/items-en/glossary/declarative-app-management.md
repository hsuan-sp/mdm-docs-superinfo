---
term: "Declarative App Management"
category: ["DDM"]
tags: ["DDM", "App Management", "Required Apps", "Auto-Updates"]
---

## Definition

Introduced in OS version 26, this is the core mechanism for managing apps via Declarative Device Management (DDM). It supports the deployment of App Store apps, Custom apps, and `.pkg` packages. Administrators can define specific behaviors for each app, such as forcing an update, pinning a specific version, or disabling auto-updates, all while receiving real-time status reporting.

## Plain English

In the past, sending an app was like "Delivering a package—once it's there, it's done." Now, it's more like a "Subscription Service." You can set rules for each app (like "always keep this one updated" or "never update this specific version"), giving the school much finer control over the software students are using.

## MDM Context

* **Required Apps**: Automatically installed and cannot be removed by the user.
* **Optional Apps**: Available for the user to download at their own choice.
* **Per-App Update Control**: High-stakes testing apps can be "frozen" at a specific version to ensure stability.
