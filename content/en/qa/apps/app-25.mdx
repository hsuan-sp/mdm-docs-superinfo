---
id: app-25

title: "How do I use 'Declarative .pkg Deployment' in macOS 26? How does it differ from Jamf Policies?"

category: "Section 3: App Management & Distribution"

important: false

tags: ["macOS 26", "Package", "DDM", ".pkg", "Jamf Policy"]
---

**macOS 26 (Tahoe) extends Declarative Device Management (DDM) to support non-App Store software (.pkg). This allows you to deploy installation packages via 'Declarations' for a more modern, transparent, and resilient installation experience compared to the legacy Jamf Binary/Policy method.**

## DDM Package vs. Jamf Policy

| Feature             | Jamf Policy (Legacy)                                       | DDM Package Declaration (Modern)                                         |
| :------------------ | :--------------------------------------------------------- | :----------------------------------------------------------------------- |
| **Execution**       | Relies on the `Jamf` binary to run scripts and installers. | Relies on the macOS native MDM framework.                                |
| **Trigger**         | Requires a trigger (e.g., Login, Recurring Check-in).      | **Autonomous**. Device installs as soon as conditions are met.           |
| **Status Channel**  | Reported through Jamf logs with potential delay.           | **Real-time** reporting of progress and error codes to MDM.              |
| **Offline Support** | Must be online to trigger the check-in.                    | If the declaration is local, the device handles install retries offline. |
| **Suitability**     | Best for complex scripts and .dmg installs.                | Best for standard signed **Distribution Packages (.pkg)**.               |

## Requirements & Limitations

- **OS**: macOS 26 (Tahoe) or later.
- **Package Quality**:
  - Must be a **Distribution Package** (not a basic component pkg).
  - Must be **signed** with a valid Apple Developer ID Installer certificate.
  - Must be **notarized** by Apple. MDM deployment in macOS 26 is extremely strict regarding security; unsigned or un-notarized packages will fail with a `VerificationFailed` error in the status channel.

## When to use each?

- **Use DDM Packages**: For standard core software (Microsoft Office, Google Chrome, Adobe Acrobat) on macOS 26+ machines where you need high visibility of success rates.
- **Use Jamf Policies**: For legacy machines (v25 and below), complex workflows (requires post-install scripts or UI interaction), or non-standard installers (DMGs).

## Expert Tip: The Notarization Check

Before uploading a .pkg to Jamf for DDM deployment, run the following command on your admin Mac to ensure it will be accepted by macOS 26:

`pkgutil --check-signature path/to/your.pkg`

If the signature chain is not valid all the way to the Apple Root CA, the DDM deployment will be rejected by the client device's security framework.
