---
id: app-14
title: "Can teachers use Managed Apple Accounts to test school-developed Beta apps in TestFlight?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["TestFlight","App Store Connect","Managed Apple Account","Service Access"]
---

## Q: Can teachers use Managed Apple Accounts to test school-developed Beta apps in TestFlight?

## Answer

**Yes. Apple allows 'Managed Apple Accounts' to act as TestFlight testers, but permissions must first be enabled within Apple School Manager (ASM).**

## Prerequisites (ASM Side):

The administrator must log into **Apple School Manager** and go to **Settings > User Assignments > Service Access**. Ensure that the **TestFlight** service is set to **On**. If this toggle is off, users will be unable to sign in to TestFlight even if they receive an invitation.

## Standard Deployment Flow:

1. **App Store Connect Setup**: The school developer adds the teacher's Managed Apple Account to the **External Testing** group. An invitation email will be sent to the teacher's inbox.
1. **Deploy the TestFlight App**: The administrator "purchases" free **TestFlight** licenses in ASM and installs them on teacher iPads via **Device-based Assignment** in Jamf Pro.
1. **Redeem Invitation**: The teacher opens the invitation email on the iPad and taps "View in TestFlight." The TestFlight app will launch automatically, and the teacher can sign in with their Managed Apple Account to begin testing.

## Difference from Personal Accounts:

Managed Apple Accounts cannot perform In-App Purchases (IAP). Therefore, they cannot test Beta features involving real financial transactions unless conducted within a sandbox environment.
