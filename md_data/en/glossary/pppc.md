---
term: "PPPC"

category: ["Security", "macOS"]
---

## Term Definition

**Privacy Preferences Policy Control (PPPC)** is a macOS security framework managing application access to sensitive user data and hardware.

Protected resources include:

- **Hardware** : Camera, Microphone.

- **Data** : Desktop folder, Documents folder, Photos, Downloads.
- **System** : Screen Recording, Accessibility features.

**MDM Role** : Administrators deploy a PPPC Payload to **pre-approve** trusted school apps (like Zoom or Teams) so they can access the camera/mic without users needing to click "Allow" on pop-up prompts. Note that for privacy reasons, MDM can*allow*access or*deny*access, but it cannot silently enable the Camera/Mic without*some* user awareness in certain contexts.

## Analogy

Think of this as a **"Standing Permission Slip."** Usually, your Mac is very protective and asks you, _"Are you SURE you want to let this app use your camera?"_ every single time a new app opens.

With **PPPC** , the school has already **"signed the permission slip"** for you. This means official school apps can start working instantly without annoying you with questions, because the Mac knows the school trusts them.
