---
category: Setup Assistant & ADE
id: enr-25
important: false
tags:
  - ADE
  - Setup Assistant
  - Deployment
  - Best Practices
title: Which Setup Assistant steps should IT skip during ADE enrollment?
---

## Q: Which Setup Assistant steps should IT skip during ADE enrollment?

## Answer

Automated Device Enrollment (ADE) allows IT to skip most of the initial configuration screens on an iPad or Mac. This significantly speeds up the deployment process and prevents students from setting up personal features that may conflict with school policies.

### Recommended Steps to SKIP (Set to "Hidden" in Jamf Pro)

To provide the fastest out-of-box experience, we recommend skipping almost everything except for**Remote Management**and**Wi-Fi**.***✅ App Analytics**: Skip. The school representative organization makes this decision for the fleet.***✅ Siri / New Feature Highlighting**: Skip. This accelerates the "Hello" to "Home Screen" transition.***✅ Apple Intelligence (iOS 26)**: Skip. You can enable or manage these AI features later via MDM.***✅ iMessage & FaceTime**: Skip. Prevents students from signing into personal messaging services during setup.***✅ Screen Time**: Skip. This is a parental control feature; schools should manage screen restrictions via MDM profiles.***✅ Apple Pay**: Skip. Students typically do not have credit cards for school devices.***✅ True Tone**: Skip. Non-essential for classroom use.***✅ Display Zoom**: Skip. Use the system default.***✅ Appearance (Light/Dark)**: Skip. Standardize on the system default for a uniform look.***✅ Liquid Glass (iOS 26)**: Skip. Standardizes the UI across the fleet.***✅ Terms and Conditions**: Skip. IT accepts these on behalf of the organization in ASM/ABM.***✅ Diagnostics**: Skip for privacy and speed.

### Required Steps to SHOW***❌ Remote Management**:**Cannot be skipped**. This is the core step of ADE that informs the user the device is managed by the school.***⚠ ️ Biometrics (Touch ID / Face ID)**: We recommend showing this step for staff devices or personal-use faculty iPads to ensure security. For shared student carts, it is safer to skip it to avoid confusion or local lockouts.***⚠ ️ Apple Account Login**: Typically shown for 1:1 deployments where Managed Apple Accounts are used, but skipped for shared classroom iPads where no user login is required at the initial setup.

---

### Pro Tip for 2026:
With the arrival of**DDM (Declarative Device Management)**, some of these settings can now be "self-healed" if a user manually changes them later. Always ensure your "Skip" list in Jamf Pro is synchronized with your organization's latest security audit.
