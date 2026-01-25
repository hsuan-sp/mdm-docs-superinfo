---
id: hw-7

title: "Must 'Find My' be turned off before repair? How?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: true

tags: ["Repair", "Find My", "Activation Lock", "Maintenance", "Activation Lock"]
---

**Yes, this is almost always a requirement for repair. Failure to disable 'Find My' triggers 'Activation Lock,' which prevents service centers from performing the necessary diagnostics or parts replacement, leading to the device being returned unrepaired.**

Based on how the device is managed in your school, follow the appropriate method:

## Option 1: Admin Remote Unlock via Jamf Pro (Recommended)

If the device is Supervised, the administrator has the highest authority and can handle this remotely:

1. Locate the device in Jamf Pro.

2. Send the **"Disable Activation Lock"** command.
3. **Effect**: Even if a student is logged in with a personal account, this command overrides the lock on Apple's servers, allowing for repair.

## Option 2: Student Manually Turns Off on iPad

1. Go to **Settings > [User Name] > Find My**.
2. Tap **"Find My iPad"** and toggle it OFF.
3. The system will require the password for that Apple ID.

## Option 3: Web-Based Remote Removal

If the device screen is broken and unusable:

1. Ask the student to log in at [iCloud.com/find](https://www.icloud.com/find).

2. Select the specific iPad from "All Devices".
3. Click **"Remove from Account"**.
4. **Note**: Do _not_ select "Erase iPad," as this can complicate the post-repair setup.

## Institutional Advice:

When collecting devices for repair, the IT lead must verify that every unit sent to the vendor has been "Removed from Account." Failure to do so can cause repair delays of several weeks.
