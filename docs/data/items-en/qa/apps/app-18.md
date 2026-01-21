---
id: app-18
title: "The App Store icon disappeared! How do I get it back?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["App Store","Missing Icon","Troubleshooting","Screen Time","Restrictions"]
---

## Q: The App Store icon disappeared! How do I get it back?

## Answer

**A missing App Store icon usually results from 'Screen Time' restrictions on the device or a 'Restrictions' profile from the MDM. Follow these steps to troubleshoot:**

## Step 1: Check Local 'Screen Time' (Most Common)

* **Path**: Go to **Settings > Screen Time > Content & Privacy Restrictions > iTunes & App Store Purchases**.
* **Key Setting**: Ensure **Installing Apps** is set to **Allow**.
* *Note: This is a local iOS restriction; even if the MDM doesn't lock it, a user can accidentally disable it.*

## Step 2: Check MDM Restrictions Profile

* **Path**: Go to **Settings > General > VPN & Device Management** and inspect the "Restrictions" profile.
* **Key Setting**: Look for an entry stating **Allow installing apps using App Store** is disabled.
* *Note: This restriction only applies to Supervised devices.*

## Step 3: Home Screen Search

Sometimes the icon is buried in a folder or has been "Removed from Home Screen" but remains in the App Library. Try pulling down on the Home Screen and searching for "**App Store**."

## Step 4: Reset Home Screen Layout (Last Resort)

If the icon is truly missing from the view, go to **Settings > General > Transfer or Reset iPad > Reset > Reset Home Screen Layout**.

* *Warning: This will undo all customized app groupings and folders.*
