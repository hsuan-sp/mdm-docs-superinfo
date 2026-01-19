---
term: "Volume Owner"
category: ["Security"]
---

## Definition

The Volume Owner is a specific security role associated with Apple Silicon Macs. Only the individual who performed the initial setup of the Mac (or an account subsequently granted a secure token) is considered a Volume Owner. This role is unique because ONLY a Volume Owner has the authority to authorize macOS updates or modify the device's boot security settings. MDM systems use a **Bootstrap Token** to simulate this "Owner" permission for remote management.

## Plain English

Think of this as the "Homeowner with the Title Deed." Even if many people live in a house, only the legal owner has the right to renovate the kitchen or change the front door locks. If you aren't the official "Volume Owner," the Mac will refuse to let you install a major system update or change its deepest security settings, making the machine much harder to "break" or hack.
