---
id: mac-13

title: "Google Meet or Zoom keeps asking for 'Screen Recording' permissions. Can MDM enable this automatically?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["PPPC", "Privacy", "TCC", "Screen Recording", "Standard Users"]
---

**This is governed by macOS TCC (Transparency, Consent, and Control) privacy mechanisms. For 'Screen Recording,' 'Microphone,' and 'Camera,' Apple mandates that the user must 'personally click to allow.'**

MDM cannot forcibly "turn on" these permissions. However, you can use a **PPPC (Privacy Preferences Policy Control)** profile in Jamf Pro to authorize "Standard Users" (teachers) to approve these requests without needing an administrator password.

## MDM Control Capability Matrix (2026 Edition)

| Permission              | Forced ON by MDM? | User Consent Needed? | Admin Strategy                     |
| :---------------------- | :---------------- | :------------------- | :--------------------------------- |
| **Screen Recording**    | ❌ No             | ✅ Yes               | Authorize Standard Users to allow  |
| **Microphone / Camera** | ❌ No             | ✅ Yes               | Set to "Allow" (prevents blocking) |
| **Accessibility**       | ✅ Yes            | ❌ No                | Can be fully authorized silently   |
| **Full Disk Access**    | ✅ Yes            | ❌ No                | Can be fully authorized silently   |

## Best Practices for Schools (SOP):

### 1. Solve the 'Standard User' Block (Crucial)

Since teachers are rarely administrators, they get stuck when a system prompt asks for an admin password to allow screen sharing.

- **Fix**: Create a PPPC payload in Jamf Pro for the specific app (e.g., Zoom).

- **Setting**: Set `Screen Recording` to **Allow Standard Users to allow access**.
- **Result**: When the teacher clicks allow, the system **no longer asks for an admin password**.

### 2. Silent Authorization

For specialized tools, set **Accessibility** to **Allow** to reduce pop-up fatigue for your users.

## Practical Advice:

If your PPPC profile isn't working, check your **Bundle ID** and **Code Requirement**. Use the "PPPC Utility" (free open-source tool) to generate exact signature codes for Jamf Pro.

**Note**: macOS 26 has increased the frequency of "Screen Recording" persistence notifications. Even when authorized, the system will occasionally remind users that an app is observing the screen. Inform staff that this is a normal security feature.
