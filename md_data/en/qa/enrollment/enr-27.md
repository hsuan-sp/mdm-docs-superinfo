---
id: enr-27

title: "Zero-Wipe MDM Migration: Moving devices from MOE Managed Jamf Pro to an In-House MDM."

category: "Section 2: Device Enrollment & Deployment"

important: true

tags: ["iOS 26", "MDM Migration", "Zero-Wipe", "Asset Transfer", "Jamf Pro"]
---

**As educational projects evolve, many schools look to migrate devices from a centrally managed instance (like Taiwan's MOE Jamf Pro) to their own in-house MDM server. Prior to iOS 26, this required a full erase, which was a barrier for students with extensive learning data. iOS 26 solves this with 'Zero-Wipe MDM Migration.'**

## The Migration Workflow (SOP)

### 1. Preparation in ASM/ABM

The MDM server change must originate at the root of the ownership chain:

- In **Apple School Manager**, go to **Devices**.

- Select the target devices and choose **Edit MDM Server**.
- Point them to your new "In-House" MDM server.

### 2. Configure the Migration Payload

In your _existing_ (MOE) MDM server, you must configure the migration instructions:

- **Target MDM URL**: The enrollment URL of your new server.

- **Enforcement Deadline**: Define the date and time when the transfer _must_ occur.

### 3. The Device Experience

- The student receives a notification that their device will be moved to a new management system.
- Up until the deadline, they can choose "Later."
- At the **Enforcement Deadline**, the device silently unenrolls from the MOE server and immediately enrolls in the school's server.
- **Crucial**: All local student files, photos, and project data are **not touched**.

## Risks and Mitigation for Schools

- **App Licensing**: VPP app licenses belong to the MDM server. You must ensure you have enough VPP licenses in the _new_ server for all apps. We recommend setting the new server as the license owner prior to migration.
- **Configuration Conflicts**: If the old server had a "Restriction" that the new server doesn't, those "ghost" restrictions might linger if not handled correctly. We recommend a "Cleanup" script run by the new MDM upon first check-in.
- **Teacher/Staff vs. Student**: This feature is highly recommended for Teacher/Staff devices to avoid disrupting their administrative files. For student devices, if the storage is already cluttered, a traditional "Return to Service" (Wipe) remains the better option for long-term stability.
