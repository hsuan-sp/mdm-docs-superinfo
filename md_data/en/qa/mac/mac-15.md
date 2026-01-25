---
id: mac-15

title: "How do I mass-deploy Microsoft Office and activate licenses? Lab vs. Administrative Macs?"

category: "Section 7: Advanced Mac Management"

important: false

tags:
  [
    "Office",

    "Microsoft 365",

    "Serializer",

    "Volume License",

    "Jamf App Installers",
  ]
---

**The best practice is to use 'Jamf App Installers' for automated deployment, combined with either the 'Volume License Serializer' or 'User-based Login' depending on the scenario.**

Always use the Microsoft CDNs or Jamf-provided installers. **Avoid the Mac App Store versions**, as they do not support Volume Licensing (VL) features correctly for all scenarios.

## Scenario 1: Computer Labs / Shared Kiosks (Device-Based)

Labs must be "ready-to-use" without requiring individual student logins for Office.

1. **Installer**: Deploy Office 365 via Jamf Pro **App Installers**.

2. **Activation (Crucial)**: Download the **Volume License Serializer (.pkg)** from the Microsoft VLSC.
3. **Policy**: Create a Jamf Pro policy to install this Serializer.
4. **Result**: Office will activate against "the machine" itself. Any user can open Word and begin working immediately without a prompt.

## Scenario 2: Faculty / Staff Macs (User-Based)

Staff typically have individual Microsoft 365 (A3/A5) accounts.

1. **Installer**: Deploy via **App Installers** to keep software updated automatically.

2. **Activation**: Do **not** deploy the Serializer. The user simply signs in with their school email when they first open the app.
3. **Benefit**: Enables personal cloud storage (OneDrive) and document syncing.

## Practical Advice:

If you encounter license conflicts, it’s usually because of residual older Serializers. Use the official **Microsoft License Removal Tool** (run as a script via Jamf) to clean the machine before a fresh deployment.
