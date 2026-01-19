---
term: "Notarization"
category: ["Security"]
---

## Definition

Notarization is an automated security screening process provided by Apple for macOS applications. Before distributing software outside of the App Store, developers must submit their apps to Apple for a malware scan. If the app is clean, Apple issues a "Notarization Ticket" that is attached to the app. When a user tries to open the app, macOS **Gatekeeper** sees this ticket and allows the app to run, ensuring the software has not been tampered with.

## Plain English

Think of this as a "Certificate of Good Health" for software. Just as food is inspected for safety before it reaches the supermarket shelf, Apple inspects software for "viruses" and "bugs." If it passes the inspection, it gets a "Safety Seal" (the notarization). When you click the app to run it, your Mac checks for that seal to make sure it’s safe for you to use.
