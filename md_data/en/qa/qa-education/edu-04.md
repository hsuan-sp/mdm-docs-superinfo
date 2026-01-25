---
id: edu-04

title: "How do we quickly reset iPads between different classes or rotating groups?"

category: "Section 8: Education Scenarios & FAQ"

important: false

tags: ["Classroom Management", "SOP", "Handoff", "RTS"]
---

**The best method depends on how much time you have between lessons. For the fastest handoff, use 'Shared iPad' mode or the 'Return to Service' remote command.**

## Scenario A: Shared iPad Mode (Most Common)

If your iPads are configured as **Shared iPads**:

1. **End of Lesson**: Student simply taps "Log Out."

2. **Handoff**: The iPad returns to the login screen. The next student arrives, selects their name/account, and is ready in under 60 seconds.

## Scenario B: Guest Mode (Temporary Use)

If the visiting student doesn't have a Managed Apple Account:

1. Tap **"Guest"** on the login screen.

2. Data is automatically wiped the moment the student logs out, leaving a clean device for the next guest.

## Scenario C: Deep Clean (Return to Service - 2026 Enhanced)

If you need to completely erase a device (e.g., between different year levels) but want it ready for the next student to unbox and use immediately:

1. **Trigger Remote Wipe**: In Jamf Pro, send the "Erase Device" command.

2. **Enable RTS**: Check the **"Return to Service"** option and include the campus Wi-Fi profile.
3. **Preserve Apps**: Check the box to **"Preserve Managed Apps."**
   - **Result**: The iPad wipes its data but **does not delete the large apps** (like GarageBand or iMovie). It automatically rejoins Wi-Fi, skips all setup screens, and returns to the home screen ready for use in **3-5 minutes**.

## Institutional Advice:

For 1-to-1 environments where a student is just borrowing a device for one period, remind them to log out of their Google or Microsoft accounts in Safari before handing the device back. This prevents the next student from accessing the previous user's private school records.
