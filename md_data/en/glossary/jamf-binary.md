---
term: "Jamf Binary"

category: ["Jamf", "macOS"]
---

## Term Definition

The **Jamf Binary** (frequently referred to as the `Jamf` command-line tool) is the management agent that powers advanced control on macOS.

Operational roles:

- **Local Engine** : It is the "brain" on the Mac that executes instructions sent from the Jamf Pro server.

- **Policies** : Unlike standard MDM profiles, the binary allows for complex "Policies" that can run scripts, install specialized software packages, and perform system maintenance.
- **Check-ins** : The binary periodically "checks in" with the server to see if there are any new tasks to perform.

**Note** : While iPads use Apple’s built-in MDM framework alone, Macs use a combination of standard MDM and the Jamf Binary to provide deeper management capabilities.

## Analogy

Think of this as the **"On-Site Manager"** living inside your Mac.

While the main school office (the MDM server) gives the big-picture orders, the **On-Site Manager** is the person who actually does the heavy physical work—like unpacking and installing your apps, fixing your system settings, and making sure the computer is following all the school’s safety rules.

Without this silent helper working in the background, the school wouldn't be able to fix your Mac's problems from their office.
