---
id: acc-23

title: "How do I configure the feature to prevent personal Apple Account logins on organizational devices?"

category: "Section 1: Account & Server Management"

important: true

tags:
  [
    "Managed Apple Account",

    "DLP",

    "iOS 26",

    "Organizational Devices",

    "WWDC 2025",
  ]
---

**Announced at WWDC 2025, the 'Restrict Apple Account to Managed Only' feature allows organizations to enforce that only Managed Apple Accounts can sign into organizational devices. This works at the system level, covering the Setup Assistant and System Settings, and provides robust data separation without relying solely on MDM profiles.**

## Configuration Steps (Apple School Manager / Apple Business Manager)

This is an organization-level security policy that must be enabled by an **Administrator**:

1. Log in to **Apple School Manager (ASM)** or **Apple Business Manager (ABM)**.

2. Go to **Access Management**.
3. Select **Apple Services**.
4. Find the option: **'Apple Account on Organization Devices'**.
5. Enable the option to **'Allow Only Managed Apple Accounts to Sign In'**.
6. Save settings.

Once configured, this policy automatically applies to all eligible devices owned by the organization.

## Technical Characteristics and Limitations

- **System-Level Enforcement**:
  - The restriction operates at the OS level and does not require a specific MDM configuration profile once the organization-level policy is set.
  - It applies during the "Setup Assistant" phase and within "System Settings."
  - The device validates that the signing-in account domain matches the verified domains in your ASM/ABM.

- **System Version Requirements**:
  - Requires **iOS 26**, **iPadOS 26**, **macOS 26 (Tahoe)**, or later.
  - macOS 26 (Tahoe) was officially released on September 15, 2025.

- **Device Conditions**:
  - Devices must be owned by the organization and managed via ASM/ABM.
  - We recommend combining this with **Automated Device Enrollment (ADE)** and **Supervised Mode** for complete protection.

## Deployment Advice

- **Domain Verification First**: Ensure your organization's domains are verified in ASM/ABM before enabling this feature.
- **Account Preparation**: Ensure Managed Apple Accounts are pre-created for all users via Federated Authentication (Google/Entra ID) or SCIM sync.
- **Functionality Trade-offs**: Once enabled, personal features (personal App Store purchases, iCloud Photos, personal iMessage) will be unavailable on these devices. Evaluate if this aligns with your organizational policy.
- **Access Management Pairing**: This feature can be paired with other "Access Management" settings in ASM/ABM to further restrict Managed Accounts to only log in on "Managed" or "Supervised" devices, creating a bidirectional security loop.
