---
id: dl-7
title: "Why is 'iCloud Private Relay' forced off on school iPads? Does this affect privacy?"
category: "Section 5: Digital Initiatives (MOE Project)"
important: false
tags: ["iCloud","Private Relay","Digital Learning Project","Policy Info"]
---

## Q: Why is 'iCloud Private Relay' forced off on school iPads? Does this affect privacy?

## Answer

**This policy ensures that 'Jamf Trust' functions correctly. Enabling this feature would disable the school's content filtering and stop usage data reporting.**

## Current Situation:

On Supervised devices within the Digital Learning Project, you will typically find the "Private Relay" switch under **Settings > iCloud** is **greyed out and set to 'Off'.** This is a mandatory restriction enforced via MDM configuration profiles.

## Why Must it be Disabled? (Technical Conflict)

1. **Filtering Failure**: iCloud Private Relay encrypts DNS queries and routes them through Apple's relays. This prevents Jamf Trust from identifying whether a student is visiting inappropriate or malicious sites, effectively bypassing the "Safe Search" features.
1. **Data Loss**: Because traffic is encrypted and hidden, Jamf Trust cannot calculate traffic volume or usage time. This leads to **anomalous usage data (showing as zero or very low)** on official reports, which affects school KPI evaluations.

## Does this Invade Privacy?

* **No.** Disabling Private Relay simply means traffic does not go through Apple's dual-encryption tunnel; it returns to standard network transmission.
* The school's MDM and filtering mechanisms follow strict cybersecurity regulations. They only block harmful sites and track "usage hours." Administrators cannot see specific Google search keywords or private messages.

## Practical Advice:

If you find a student iPad that **can enable** Private Relay, it means the device has likely **fallen out of management** or **missed the restriction profile.** Ensure you run "Update Inventory" or redeploy the restriction settings in Jamf Pro for that device.
