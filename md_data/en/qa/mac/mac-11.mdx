---
id: mac-11

title: "Why does my Mac show 'Unidentified Developer' or 'Cannot be opened' when installing software?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Gatekeeper", "Security", "Notarization", "Software Installation"]
---

**This is macOS's Gatekeeper security mechanism. For software required for teaching that has not been notarized by Apple, we recommend using 'Right-click to Open' or deploying via MDM to bypass quarantine flags.**

Apple requires all macOS software to undergo **Notarization** to ensure it is free of malicious code. If software is older or the developer is not registered with Apple, it will be blocked.

## User-Side Solutions (SOP):

### Option 1: Right-click to Open (Single Override)

This is the standard way to bypass the block without lowering overall system security.

1. Find the app in **Finder**.

2. Hold the **Control** key (or right-click) and select **Open**.
3. The resulting dialog will now include an **Open** button. Once selected, the system adds this app to a local allowlist.

### Option 2: System Settings Override

1. When the block message appears, click "OK."
2. Go to **System Settings > Privacy & Security**.
3. Under the "Security" section, look for "[App Name] was blocked" and click **Open Anyway**.
4. Authenticate with an administrator password to run the app.

## Administrator Solutions (Jamf Pro):

### Strategy 1: Deploy via Policy (Recommended)

When software is installed via a Jamf Pro Policy, it is written by the Jamf Binary with Root privileges. This typically **does not** apply the "Download Quarantine" attribute (`com.apple.quarantine`), allowing the app to open without a Gatekeeper warning.

### Strategy 2: Remove Quarantine Attribute via Script

If software was downloaded or copied manually, you can use a Jamf script to strip the quarantine flag:

```bash

# Remove quarantine attribute for a specific app

xattr -r -d com.apple.quarantine /Applications/AppName.app

```

## Practical Advice:

If you see a message stating the app is **"Damaged and should be moved to the Trash,"** it often isn't actually corrupt. Instead, its signing certificate may have expired or it hasn't been notarized. Using the script command above often resolves this issue.
