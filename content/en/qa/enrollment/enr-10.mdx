---
id: enr-10

title: "I changed the device name in Jamf Pro, but the iPad still shows the old name locally. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags: ["Renaming", "Name Sync", "Inventory Preload", "PreStage", "The MUT"]
---

**This is usually because you only modified the 'text record' in the Jamf Pro database but haven't sent the 'Remote Rename Command' to the physical device.**

Changing the name field directly in Jamf Pro's "General Search" or device details only updates the backend label; it does not actively trigger a change on the device. To ensure the local name matches, successful admins use three correct methods:

## 1. Automatic Naming via 'PreStage Enrollment'

This is the recommended automated solution, naming the device the moment it activates:

- Configure in **PreStage Enrollment > Mobile Device Names**.

- **Use Variables**: You can use `$SERIALNUMBER` or `$ASSET_TAG` to generate names like `EDU-$SERIALNUMBER`.
- **Critical Checkbox**: You must check **Enforce Mobile Device Name on devices**. This ensures the device renames itself upon connecting to the network during setup.

## 2. Manual Sync via 'Remote Commands'

If you have already edited the name in the Jamf Pro device record, you must take the following actions:

- Click **Edit** on the device record and confirm the name change.

- Check the box **Enforce Mobile Device Name** below the name field and save.
- The system will immediately queue a `DeviceName` command to the iPad. Once the device receives it (must be unlocked and online), the local name will update.

## 3. Batch Updates using 'Mass Actions' or The MUT

When hundreds of devices need renaming:

- **Mass Actions**: Select specific devices in a Smart Group, then choose **Action > Send Remote Commands > Set Device Name**.

- **The MUT**: Upload a CSV file containing "Serial Number" and "Desired Name". This tool updates the record and simultaneously triggers Jamf Pro to send rename commands to the physical devices.

## Why do commands get stuck?

- **Unsupervised**: If the iPad is not in "Supervised" mode (via ADE), MDM cannot forcibly change its local name.
- **Command Pending**: If the device is off, offline, or sleeping, the rename command will sit in the `Pending` queue until the next Check-in.

## Practical Advice

Admins should always check "Enforce Mobile Device Name" within Jamf Pro. This prevents students from arbitrarily changing names on the iPad, ensuring the backend inventory always matches the physical device.
