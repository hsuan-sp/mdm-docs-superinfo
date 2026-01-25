---
id: app-23

title: "What is 'Declarative App Management' (DDM), and how does it differ from traditional VPP?"

category: "Section 3: App Management & Distribution"

important: true

tags: ["DDM", "App Management", "Declarative", "Auto-Update", "iOS 26"]
---

**Declarative App Management is a new architecture introduced in iOS 26, iPadOS 26, and macOS 26. It allows devices to 'Autonomously' manage their app installation and update status, replacing the old model that relied on constant commands from the MDM server.**

## Comparison: Traditional VPP vs. Declarative App Management

| Feature               | Traditional MDM (InstallApplication)                                | Declarative App Management (App Declaration)                                           |
| :-------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------- |
| **Trigger Mechanism** | Server must 'push' the command; fails if device is briefly offline. | Server pushes a 'Declaration.' The device autonomously retries until successful.       |
| **Status Reporting**  | Passive. MDM must 'poll' the device to see if it finished.          | **Real-time**. Device pushes status updates (installing, failed, success) immediately. |
| **Update Control**    | Global 'Auto-Update' or manual pushes.                              | Granular control **per app**: Force update, defer, or follow user preference.          |
| **Scope**             | App Store Apps, VPP Apps.                                           | App Store, VPP, Custom Apps, and **.pkg** files on macOS.                              |

## Supported Platforms

- **iOS 26 / iPadOS 26**: Supports Declarative management for App Store and Custom apps.
- **macOS 26 (Tahoe)**: Extends DDM support to **.pkg** installers.
- **visionOS 26**: Full support for Declarative app management.

## Setup in Jamf Pro

On DDM-compatible versions of Jamf Pro:

1. Navigate to **Blueprints > App Management**.

2. Create an **App Declaration**.
3. Set **Installation Behavior**:
   - **Required**: App is mandatory and unremovable. If a user tries to delete it, the device reinstall it automatically.
   - **Optional**: Appears in Self Service; user can remove it.

4. Set **Update Behavior**:
   - **Automatic**: Always keeps the app at the latest version.
   - **Follow User Preference**: Respects the toggle in the local App Store settings.

## Deployment Strategy

- **New Fleet**: For devices running v26+, we recommend shifting entirely to Declarative deployment to reduce server load and increase success rates.
- **Mixed Fleet**: Use **Jamf Smart Groups** to distinguish between legacy (v25 and below) and modern (v26+) devices to apply the appropriate deployment method.
- **Monitoring**: Leverage the real-time Status Channel to quickly identify failed installs and take corrective action.
