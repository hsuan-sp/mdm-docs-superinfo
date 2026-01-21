---
id: app-17
title: "I 'purchased' an app in ASM, but it's not appearing in my Jamf Pro list. Why?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["VPP Sync","ASM","Troubleshooting","Volume Purchase"]
---

## Q: I 'purchased' an app in ASM, but it's not appearing in my Jamf Pro list. Why?

## Answer

**This is usually due to a synchronization delay between Apple’s servers and your MDM server.**

## The Sync Mechanism:

By default, Jamf Pro usually syncs with Apple School Manager (ASM) once a day (or as configured). When you click "Get" in ASM, the data does not appear "instantly" in Jamf Pro.

## Solution (Force Manual Sync):

1. Log in to Jamf Pro.
1. Navigate to **Settings > Global Management > Volume Purchasing**.
1. Click on the **Location** associated with the app purchase.
1. Switch to the **Content** tab and click the **Force Update** or **Update** button at the bottom.
1. Wait 1-2 minutes and refresh the page; the newly purchased apps should appear.

## Checkpoint:

If it still doesn't appear after a forced sync, double-check that you selected the correct **Location** in ASM during purchase. A purchase made for "Campus A" will not be visible to an MDM server linked to "Campus B."
