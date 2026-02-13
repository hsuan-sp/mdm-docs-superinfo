---
id: mac-7

title: "What special restrictions apply to managing Apple Silicon (M-series) Macs?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Apple Silicon", "Bootstrap Token", "Secure Boot", "Kernel Extensions"]
---

**The security architecture of Apple Silicon (M1-M5) is fundamentally different from Intel Macs. The core of management lies in the "Bootstrap Token" and "Volume Ownership."**

Without proper configuration, MDM will be unable to perform software updates or install kernel plugins.

## Key Technical Indicators:

### 1. Bootstrap Token

- **The Issue**: On Apple Silicon, certain high-privilege operations (such as installing software updates or enabling kernel extensions) require a "Secure Token."
- **The Solution**: Ensure that **"Allow MDM to upload Bootstrap Token"** is checked in the Jamf Pro **PreStage Enrollment** settings.
- **Verification**: In the Jamf Pro computer record, confirm that `Bootstrap Token Allowed` is set to `Yes`. If it is "No," many management commands will fail.

### 2. Volume Ownership

- Only users designated as "Owners" can perform system resets or updates.
- The first account created through ADE enrollment automatically gains ownership. MDM escorts this privilege via the Bootstrap Token.

### 3. Kernel Extensions (KEXTs)

- Apple Silicon **blocks** all third-party KEXTs by default.
- If they must be installed (e.g., for older antivirus software), the device must be rebooted into Recovery Mode to lower the security setting to "Reduced Security."
- **Modern Recommendation**: Use **System Extensions** instead. This is Apple's recommended architecture, which can be authorized directly via MDM configuration profiles without lowering system security.
