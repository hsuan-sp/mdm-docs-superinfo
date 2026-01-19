---
term: "SCEP (Simple Certificate Enrollment Protocol)"
category: ["Security"]
---

## Definition

SCEP is a standard protocol used by managed devices to automatically request and install security certificates from a Certificate Authority (CA). By using SCEP, an MDM can provide a "voter registration card" (a SCEP profile) to an iPad, which the device then uses to prove its identity to the school's server and receive a "voting pass" (a Wi-Fi or VPN certificate) automatically. This is a core technology for secure, zero-touch network access.

## Plain English

Think of this as an "Automatic ID Booth." Instead of every student having to go to a physical office to get their ID badge, the MDM gives them an "Authorization Letter." The student takes that letter to a machine (the CA), and the machine types out their ID card automatically. It allows your iPad to get its own "hall pass" for the school Wi-Fi without you ever having to ask for a password.
