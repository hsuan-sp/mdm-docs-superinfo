---
id: enr-7

title: "Why does the device get stuck on 'Installing Apps' during PreStage enrollment/Setup Assistant?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags: ["PreStage Enrollment", "App Deployment", "ADE", "DDM", "Troubleshooting"]
---

**When you configure 'Install Apps' in PreStage enrollment, the device waits for apps to download before allowing access to the Home Screen.**

**Any network issues or VPP license failures will cause a deadlock.** This is extremely common during **Automated Device Enrollment (ADE)**. Admins often want students to see essential apps immediately upon boot, but if the environment isn't perfect, it leads to disaster during mass deployments.

## Core Causes:

1. **Insufficient VPP Licenses or Invalid Token**:
   - If the assigned app has 0 remaining licenses, Apple servers cannot issue a download token, causing the device to wait indefinitely.
   - **Solution**: Check the "Volume Purchasing" status in Jamf Pro to ensure sufficient licenses.

2. **Campus Wi-Fi Saturation**:
   - If a class of 30 iPads tries to download a 2GB app (e.g., GarageBand) at the Setup screen simultaneously, the Wi-Fi bandwidth will collapse, leading to timeouts.
   - **Solution**: Avoid forcing large apps during PreStage. Let students reach the Home Screen first, then allow apps to download in the background.

3. **Declarative Device Management (DDM) State Changes**:
   - In modern architectures, app deployment is handled by **DDM**.
   - If your **Service Access** terms haven't been accepted in ASM, DDM may fail to trigger the silent download from the App Store.

4. **Configuration Error: Mandatory Install**:
   - In Jamf Pro's PreStage settings, if an app is marked as "Required" and cannot be skipped, the student cannot click "Continue" until the download finishes.

## Best Practices:

- **Minimize Initial Payload**: PreStage should only enforce critical configuration profiles or extremely small "Guide Apps".
- **Background Install**: Set main educational apps to deploy _after_ enrollment is complete, rather than intercepting the user during the Setup Assistant.
- **Pilot Test**: Before unboxing remotely, take one device through the full process to verify VPP sync and download speeds.
