---
term: "Platform SSO in Setup Assistant"
category: ["Mac"]
tags: ["Platform SSO", "ADE", "FileVault"]
---

## Definition

Introduced in macOS Tahoe, this feature allows Platform SSO (Single Sign-On) to be integrated directly into the Setup Assistant during Automated Device Enrollment (ADE). It enables users to log in with their corporate cloud credentials (e.g., Entra ID or Google) at the very first screen. This process can automatically unlock FileVault and create a local user account synchronized with the organization’s identity provider.

## Plain English

Previously, setting up a new Mac meant "Creating a local account first, then binding your company account later." Now, it's like "Swiping your employee badge to enter the building." You use your work login from the very first second you turn on the computer, and everything is set up for you automatically.

## MDM Context

This significantly simplifies Mac deployment by unifying the cloud identity with the physical device from the start, ensuring that FileVault encryption and user permissions are aligned with organizational policies immediately.
