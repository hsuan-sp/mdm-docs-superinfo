---
category: 'Section 2: Device Enrollment'
id: enr-20
important: false
tags:
  - Repair
  - Replacement
  - ADE
  - Automated Device Enrollment
title: >-
  How do I quickly restore settings to a replacement device from a repair
  vendor?
---
## Q: How do I quickly restore settings to a replacement device from a repair vendor?

## Answer

***A 'Service Replacement' unit has a brand-new serial number. To automate the setup, you must handle the serial transfer and use Automated Device Enrollment (ADE).**Note:**Return to Service (Return to Service)**only applies to devices already in management and is not for unboxing new replacement units.

## Standard SOP:

## 1. Update Apple School Manager (ASM)

***Auto-Transfer**: If repaired by an Apple Authorized Service Provider, the asset ownership often transfers to the new serial automatically.
***Manual Assignment**: If it appears in ASM, search for the new serial and click**Edit MDM Server**to assign it to your Jamf server.
***Release Old Unit**: Once the new unit is in service, "Release" the old, scrapped serial from ASM to keep your inventory clean.

## 2. Sync Jamf Pro

***Go to**Settings > Global Management > Device Enrollment > [Your Server]**.
***Click**Sync Now**to ensure the new serial number is pulled into your PreStage Enrollments scope.

## 3. Initial Enrollment (ADE Flow)

***Power on the device to the**Setup Assistant**.

***Manually connect to Wi-Fi (the device isn't managed yet).*****The device will fetch the**Remote Management**screen. Click "Download Profile" to begin the automated app and setting installation.

## 4. Future Resets (Using Return to Service)

***Once the device has completed the above steps, it is now "Managed."*****Next time**you need to wipe it for a new student, you can use the**Return to Service (Return to Service)**command for a zero-touch wipe and Wi-Fi reconnect.

## Troubleshooting:

***Serial Not Found**: If the new unit isn't in ASM, contact the repair shop and ask them to upload the "Case Number" and replacement record to Apple’s educational asset system.
***Stuck on Activation Lock**: If the "new" machine asks for an Apple Account, contact the vendor; this is likely residue from their testing or a previous owner.
