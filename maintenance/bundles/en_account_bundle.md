---
File: acc-1.md
---

---

id: acc-1

title: "The system prompted to agree to 'New Terms and Conditions' when logging into Apple School Manager (ASM). Is this important?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["ASM", "Terms Update"]

**Yes, this is extremely important and should be prioritized immediately.** When Apple updates its service terms, a "Terms and Conditions" window will pop up when you log into [Apple School Manager (ASM)](https://school.apple.com). Ignoring this will impact several critical management functions.

## The Impact of Not Agreeing

- **Registration Blocked**: New devices will fail the **Automated Device Enrollment (ADE)** process. Apple’s servers will reject registration requests from your organization until the terms are accepted.
- **VPP Sync Interruption**: The synchronization of **Volume Purchase Program (VPP)** content will pause. You will be unable to assign new apps or book licenses to your devices.
- **Feature Lockout**: You may lose access to newer administrative features, such as **Apple Intelligence controls** or the ability to view **AppleCare coverage** within your MDM dashboard.
- **Management Delays**: While currently enrolled devices won't stop working, you won't be able to push any new configuration profiles or app updates to them.

## Who Can Accept the Terms?

Only users with the **"Administrator"** role in ASM have the authority to accept these terms. Users with "Content Manager" or "Site Manager" roles will see the notice but will not be able to clear it.

## Practical Steps

1. Log in to [school.apple.com](https://school.apple.com) using your Administrator account.
2. Follow the prompts in the banner or popup window.
3. Read the terms, check the "I have read and agree..." boxes, and click **"Agree."**

## Institutional Advice:

We recommend that every school has at least **two separate Administrator accounts** (e.g., the ICT Director and a designated systems administrator). This ensures that if one person is unavailable or leaves the school, global management of your Apple fleet can continue without interruption.

---

## File: acc-2.md

---

id: acc-2

title: "What happens if our APNs Push Certificate expires? How do we renew it?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["APNs", "Push Certificate", "Maintenance"]

**The consequences are severe: Your MDM system will lose the ability to manage your devices entirely.** The **Apple Push Notification service (APNs)** certificate is the "digital ID card" that allows your MDM (Jamf Pro) to talk to Apple’s servers. Every command—from installing an app to wiping a passcode—must be signed by this certificate.

## What Happens if it Expires?

- **Total Loss of Control**: Devices will not "leave" management, but they will become "unmanaged devices." You will not be able to send any new profiles, apps, or commands.
- **The Point of No Return**: If the certificate expires and you accidentally create a **new** one instead of **renewing** the old one, you will lose the link to all currently enrolled devices. You would then have to manually erase and re-enroll every single device in the school.

## How to Renew (Before Expiration):

1. **Preparation**: Log in to Jamf Pro and navigate to **Settings > Global Management > Push Certificates**. Download the **Certificate Signing Request (CSR)**.
2. **Apple Portal**: Go to the [Apple Push Certificates Portal](https://identity.apple.com/pushcert).
3. **Crucial Step**: Log in with the **EXACT SAME Apple ID** used to create the original certificate. _Warning: If you use a different ID, you will create a new certificate rather than a renewal, which will break the connection to your existing iPads._
4. **Renew**: Find the certificate that matches your Jamf server, click **"Renew,"** and upload the CSR from Step 1.
5. **Download & Upload**: Download the new `.pem` certificate from Apple and upload it back into Jamf Pro.

## Institutional Advice:

- **Use a Shared Account**: Always create your push certificate using a generic school IT email (e.g., `MDM-admin@school.tp.edu.tw`) rather than a personal teacher's Apple ID.
- **Calendar Alerts**: Set multiple calendar reminders (3 months, 1 month, and 2 weeks before expiration) to ensure this task is never forgotten.
- **Keep Backup codes**: Ensure the recovery phone number and backup keys for the management Apple ID are stored in the school’s secure password manager.

---

## File: acc-3.md

---

id: acc-3

title: "How do I reset a student's 'Managed Apple Account' password?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Password Reset", "ASM", "Managed Apple Account"]

**Password resets for Managed Apple Accounts are handled by administrators within Apple School Manager (ASM).** Because these are school-managed assets, students cannot use the standard "I forgot my password" link on their own.

## Individual Reset Steps:

1. Log in to [school.apple.com](https://school.apple.com).
2. Select **"Users"** from the sidebar and search for the student's name or ID.
3. Select the user from the list.
4. Click **"Reset Password"** in the right-hand panel.
5. ASM will provide a **temporary password**. Give this to the student; they will be prompted to create a new, permanent password the next time they sign in.

## Bulk Reset (Multiple Students):

1. In the **"Users"** list, filter for the specific grade or class.
2. Use keyboard shortcuts to select multiple students (Hold **Command** or **Shift** while clicking).
3. Click **"Create Sign-In Communications"** (or Reset Password) in the right-hand panel.
4. Download the results as a **PDF** or **CSV**. This file will contain a list of temporary passwords that you can print out or distribute to the teachers.

## Important Note: Federated Authentication

If your school has enabled **Federated Authentication** with Google or Microsoft (Microsoft Entra ID), you **cannot** reset passwords in ASM. Instead, you must reset the student's password in the Google Admin Console or Microsoft 365 Admin Center. The change will automatically sync to their Apple account.

---

## File: acc-4.md

---

id: acc-4

title: "Jamf Pro shows that the 'VPP Token' is about to expire. How do we update it?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["VPP", "Token", "Volume Purchasing"]

**The VPP (Volume Purchase Program) Token is the secure bridge that syncs app licenses between Apple School Manager (ASM) and Jamf Pro. It must be renewed annually.** If the token expires, Jamf Pro will lose the ability to fetch new licenses or update existing ones, causing app deployments to fail across the school.

## Renewal Workflow:

### Step 1: Download the Token from ASM

1. Log in to [school.apple.com](https://school.apple.com) with "Administrator" or "Content Manager" privileges.
2. Click your **Account Name** in the bottom-left corner and go to **Preferences**.
3. Select **Payments and Billing**.
4. Find the **Apps and Books** section and locate your specific location (e.g., "Main Campus").
5. Click **Download** next to the VPP Token for that location. A `.vpptoken` file will be saved to your computer.

### Step 2: Upload the Token to Jamf Pro

1. Log in to your Jamf Pro dashboard.
2. Navigate to **Settings > Global Management > Volume Purchasing**.
3. Click on the entry for your location and select **Edit**.
4. Select **Upload** and choose the `.vpptoken` file you just downloaded.
5. Click **Save**. The status should now reflect a new expiration date one year in the future.

## Troubleshooting Tips:

- **Location Mismatch**: If you have multiple sites in ASM, ensure you are downloading the token for the _same_ location currently configured in Jamf. Using the wrong token will cause your license counts to drop to zero.
- **Manual Sync**: After renewing, it is good practice to click the **"Sync"** button within Jamf Pro to ensure the immediate update of your app inventory.

## Institutional Advice:

Schedule this task during the school summer break. Renewing your tokens as part of your "Annual IT Health Check" ensures that all classroom apps are ready to be deployed the moment teachers and students return in the autumn.

---

## File: acc-5.md

---

id: acc-5

title: "My school uses Google Workspace / Microsoft 365. Can we use these IDs to sign into Apple services?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Federation", "Google Workspace", "Entra ID", "SSO"]

**Yes. This is called "Federated Authentication," and it allows students and staff to use their existing school credentials to create and sign into Managed Apple Accounts.** By linking Apple School Manager (ASM) with your Google Workspace or Microsoft Entra ID (Azure AD), you create a seamless "Single Sign-On" experience across all campus devices.

## Key Benefits:

- **One Password**: Users don't need to remember a separate password for their iPad or Mac. They use their official campus login.
- **Automatic Provisioning**: You can configure a **SCIM** bridge so that when a new student is added to Google or Microsoft, their Apple account is created automatically in ASM—no CSV imports required.
- **Security Alignment**: Password policies and Multi-Factor Authentication (MFA) are managed by your primary identity provider (Google or Microsoft).

## Technical Requirements:

1. **Domain Verification**: You must prove ownership of your school's email domain (e.g., `@tes.tp.edu.tw`) within ASM by adding a specific TXT record to your DNS settings.
2. **IdP Connection**: An administrator must authorize the link within the ASM **Preferences > Directory Sync** section.
3. **Conflict Resolution**: If staff members have previously used their school email to create _personal_ Apple IDs, Apple will provide a 60-day window for them to change their personal email address to a private one before the school "takes over" that domain.

## Operational Note:

Jamf Pro fully supports this through **Platform SSO** on macOS. When a teacher logs into their Mac for the first time, they simply use their Microsoft or Google credentials, and the system handles the rest. This drastically reduces the number of "I can't log in" tickets for the ICT team.

---

## File: acc-6.md

---

id: acc-6

title: "Students have graduated or left the school. How should I handle their Managed Apple Accounts?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Account Lifecycle", "Graduation", "Data Retention"]

**It is recommended to first 'Deactivate' the account, and strictly proceed to 'Delete' only after confirming the student has completed any necessary data migration. Please note that deletion is permanent and irreversible.**

The lifecycle of a Managed Apple Account should align with your school's administrative processes. Proper management ensures VPP licenses are reclaimed and complies with educational data retention regulations.

## Recommended Workflow:

### Phase 1: Deactivate Account

1. Log in to Apple School Manager ([school.apple.com](https://school.apple.com)).
2. Click **Users** in the sidebar, then search for and select the student.
3. In the details panel on the right, click **Change Account Status** (or click "Edit"/"Change" next to the status).
4. Change the status to **Deactivated**.

**Effects**:

- The student will be immediately signed out of all devices and can no longer access any Apple services.

- Data in iCloud (**200 GB free tier**) is retained on the server until the account is permanently deleted.
- Administrators can reactivate access at any time by switching the status back to "Active".

### Phase 2: Retention Period

It is advisable to retain accounts for 30 to 90 days after graduation. Since students cannot use the "Data and Privacy" page to download backups like personal accounts can, this period allows for temporary reactivation requests to transfer important coursework.

### Phase 3: Delete Account

1. Select the deactivated user.
2. Click **Delete User** in the right-hand panel.

**Consequences**:

- All cloud data (Drive files, Notes, Photos) associated with the account will be permanently erased.

- Any App licenses (VPP) assigned to the user will be automatically released back to the school's license pool.

## Batch Processing for Graduates:

1. In the **Users** list, use "Search" or "Filter" to locate students of a specific grade or class.
2. Select multiple students using keyboard shortcuts (hold **Command** or **Ctrl**, or use **Shift** for range selection).
3. Click **Change Account Status** in the panel to deactivate the entire class at once.

## Important Notes:

- **Federated Authentication Users**: If student accounts are federated via Google or Microsoft, you should first deactivate the user in the Google/Microsoft directory, then return to ASM to check the sync status.
- **License Reclaiming**: Whenever an account is deactivated or deleted, any app licenses previously assigned to that user are automatically returned to the school.

---

## File: acc-7.md

---

id: acc-7

title: "Can I use my personal Apple Account to sign in to a school iPad?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Personal Apple Account", "Managed Apple Account", "Access Control"]

**Standard Policy: Not Recommended. School devices should prioritize the use of a 'Managed Apple Account' or remain signed out.**

School administrators can now configure specific restrictions via Apple School Manager (ASM) to ensure organization-owned devices can only sign in with managed accounts. Even if your device does not enforce this yet, you should be aware of the following risks.

## Why Signing in with Personal Accounts is Discouraged:

| Risk Factor               | Details                                                                                                                                                                                         |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data Privacy**          | Personal photos, messages, and cloud files will automatically sync to the device. If you forget to sign out, your private data is exposed to the next user.                                     |
| **Activation Lock**       | Signing in and enabling "Find My" locks the device to your account. While admins can now release this via ASM, it adds unnecessary administrative overhead.                                     |
| **App License Conflicts** | Apps downloaded with a personal account differ in source from school VPP apps, potentially causing update failures, version conflicts, or invalid licenses.                                     |
| **Storage Limits**        | Personal accounts typically have only 5 GB of free space, whereas school-provided **Managed Apple Accounts come with 200 GB of free iCloud storage**, making them better suited for coursework. |
| **MDM Interference**      | Personal account restrictions (like Screen Time) may conflict with school MDM profiles, leading to unstable device behavior.                                                                    |

## If You Must Use Personal Apps for Teaching (Workaround):

> ⚠️ **Temporary Usage Guidelines**
>
> If you need to access specific purchases, strictly follow this "Account Separation" method:
>
> 1. **App Store Login Only**: Sign in to your personal account **only** under "Settings" > "App Store". **Do NOT** sign in at the very top of the Settings menu (iCloud).
> 2. **Disable Find My**: If prompted to enable "Find My" or iCloud Sync, select **No** or **Cancel**.
> 3. **Sign Out Immediately**: Once the required app is installed, sign out of the App Store immediately to keep the device clean.
> 4. **Notify Admin**: Some school policies automate the removal of unauthorized apps; ensure your actions comply with school regulations.

---

## File: acc-8.md

---

id: acc-8

title: "What should I do if I forget the Jamf Pro administrator password?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Password Reset", "Jamf Pro", "Disaster Recovery"]

**The recovery method depends on your Jamf Pro deployment (Cloud vs. On-Premise) and whether SSO is enabled.**

## Scenario 1: Jamf Pro Cloud (Jamf Cloud)

1. **Use the Login Page Link**:
   - Click **Forgot password?** on the Jamf Pro login screen.
   - Enter your administrator email address to receive a password reset link.

2. **Ask Another Administrator**:
   - If there are other admins in your organization, ask them to log in and navigate to **Settings > System Settings > Jamf Pro User Accounts & Groups**.
   - They can select your account and click "Edit" to manually reset your password.

3. **Contact Jamf Customer Success (Support)**:
   - If you are the sole administrator and cannot access your email, log a support case via **[Jamf Account](https://account.jamf.com)**.
   - The Jamf team can assist in restoring access to the primary admin account after verifying your identity.

## Scenario 2: Jamf Pro On-Premise

1. **Database Operation**:
   - Requires MySQL access. You can run a specific SQL command to update the admin password hash back to a default value. This is typically the last resort for on-premise deployments.

2. **Jamf Pro Server Tools**:
   - On the server hosting Jamf Pro, run the Jamf Pro Server Backup/Restore utilities. Some versions support resetting specific admin privileges via the command line.

## Scenario 3: SSO / Multi-Factor Authentication (MFA) Enabled

- **SSO Integration**: If your Jamf Pro uses **Microsoft Entra ID** or **Google Workspace**, reset your password directly on that provider's platform.
- **Lost MFA**: If you know your password but lost your MFA authenticator (e.g., new phone), ask another admin to "disable MFA temporarily" or "reset MFA registration" for your account.

## Best Practices:

- **Create a Break-glass Account**: Set up a local administrator account that is **not** bound to a personal email, uses a strong password, and is excluded from SSO policies. Physically store these credentials in a secure location.
- **Redundant Admins**: Organizations should maintain at least two personnel with administrative access to avoid a single point of failure.
- **Managed Password Storage**: Store admin credentials in an organization-grade password manager (e.g., 1Password or Bitwarden) rather than relying on browser memory.

---

## File: acc-9.md

---

id: acc-9

title: "The device shows 'Connection Failed' or won't update Inventory. How do I fix it?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Connection Issues", "APNs", "Network", "Troubleshooting"]

**This usually indicates a breakdown in communication between the device and the MDM server or Apple's services. Please check the following four core areas in order:**

## Check 1: APNs Certificate Status

- Log in to Jamf Pro and navigate to **Settings > Global Management > Push Certificates**.
- Ensure the certificate status is **Verified** (or Valid).
- **Note**: If the certificate has expired, the MDM completely loses control over devices and it must be renewed immediately.

## Check 2: Network Connectivity & Firewall Rules

The device needs to reach both the Jamf server and Apple's servers. Ensure the campus firewall is not blocking:

- **Apple Push Notification service (APNs)**:
  - Hostname: **apple.com** and all subdomains.
  - Ports: **TCP 443, 2197, 5223**.

- **Jamf Pro Server**: Devices must be able to load your Jamf Cloud URL via HTTPS (443).
- **Test**: Use Safari on the device to visit [appleid.apple.com](https://appleid.apple.com) and your Jamf login page to confirm connectivity.

## Check 3: Date & Time Sync

**Time drift is the most common cause of connection failures.** SSL/TLS encryption requires precise time.

- Check **Settings > General > Date & Time** on the device and ensure **Set Automatically** is enabled.

- If the time deviates by more than a few minutes, the device will reject the secure connection to the server.

## Check 4: MDM Profile & DDM Status

- **Check Profile**: On the iPad, go to **Settings > General > VPN & Device Management** and confirm the "Management Profile" is still "Verified".
- **Clear Pending Commands**:
  1. Open the device record in Jamf Pro.
  2. Go to **History > Management Commands**.
  3. If there are many **Pending** or **Failed** commands, click **Cancel All Pending and Failed Commands**.
  4. Click **Update Inventory** in the top right to trigger a fresh sync.

## Advanced Troubleshooting:

If all the above are normal but updates still fail, the device's **Declarative Device Management (DDM)** state might be stuck. You can try restarting the device or sending a **Blank Push** command via Jamf to forcibly wake up the device's connection process.

---

## File: acc-10.md

---

id: acc-10

title: "Our school email domain has changed (e.g., from .edu.tw to .xh.edu.tw). How do I update the Managed Apple Accounts?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Domain Change", "Account Management", "Major Migration"]

**This involves a major underlying system change.** Since the format of a Managed Apple Account changes with the domain, it directly affects user login identities.

## Pre-Migration Assessment:

- **Timing**: Strongly recommended to perform this during **long breaks (Summer/Winter)**. After the change, old accounts on all devices will become invalid, requiring re-login.
- **Data Continuity**: The unique internal ID of the Apple Account remains the same, so cloud data (iCloud Drive, Photos) will migrate with the new account name, but users must "Sign Out and Sign Back In" to regain access.

## Procedure:

### Step 1: Add and Verify the New Domain

1. Log in to Apple School Manager ([school.apple.com](https://school.apple.com)).
2. Go to **Preferences > Accounts** (or "User Sign-in & Directory Sync").
3. In the Domains section, click **Add** and enter the new domain (e.g., `@school.xh.edu.tw`).
4. Follow the instructions to add a TXT record to your DNS settings. Once verified, the domain can be assigned to users.

### Step 2: Batch Update Account Formats

- **For Manually Managed Accounts**:
  1. Export all users as a CSV from the "Users" list.
  2. Find & Replace the domain part of the "Managed Apple Account" column in the CSV with the new domain.
  3. Re-upload the updated CSV via the import function.

- **For Federated Authentication (Google / Microsoft)**:
  1. **Critical Order**: You must first complete the email domain migration on the Google or Microsoft side.
  2. Return to ASM to trigger a re-sync.
  3. ASM will detect the email changes and automatically update the corresponding Managed Apple Accounts.

### Step 3: Client-Side Action

- **Forced Re-login**: After the change, iPhones/iPads will prompt "Account Verification Failed" or request a password.
- **Correct Action**: Users should manually sign out of the old domain account and then sign in using the **new email format** (password usually remains unchanged).

## Important Notes:

- **Federation Conflicts**: If the new domain has already been used by staff/students for personal Apple Accounts, enabling federation will trigger the **60-day conflict resolution process**, requiring those users to change their personal account emails.
- **VPP Licenses**: App licenses are tied to the account's internal ID, so changing the domain does not cause license loss.
- **Shared iPad**: If deploying Shared iPad, the login screen will automatically update to reflect the domain change; students simply need to enter their new credentials.

## Practical Advice:

Before rolling this out globally, manually update 2-3 test accounts (e.g., IT staff) to verify that iCloud data and MDM commands continue to function correctly after switching domains.

---

## File: acc-11.md

---

id: acc-11

title: "Troubleshooting: Apple Classroom fails school-wide with 'Invalid Profile' (The Certificate Trap)"

category: "Section 1: Account & Server Management"

important: true

## tags: ["Certificate Expiration", "Apple Classroom", "Education Profile"]

**This is typically caused by the expiration of the 'Education Identity Certificate', which has a fixed validity period of 2 years.**

## Symptoms:

Teachers report that all students appear "Offline" or are unable to join classes in the Apple Classroom app. Upon checking the student device under **Settings > General > VPN & Device Management**, the "Education Configuration" profile appears in red or shows as "Invalid."

## Solution:

1. **Check Certificate Status**: Log in to Jamf Pro and navigate to **Settings > Global Management > Apple Education Support**.
2. **Regenerate**: Check the status of the "Education Identity Certificate." If it has expired, click **Regenerate**. This issues a new two-year certificate for your school's educational framework.
3. **Force Deployment**:
   - After renewal, Jamf Pro usually schedules the profile update automatically.
   - **Manual Acceleration**: If devices do not respond promptly, use the relevant buttons within the "Apple Education Support" interface to re-send the education configuration profiles.

4. **Wake Up Devices**: For any stubborn devices, send a **Blank Push** to the affected group. This forces the device to communicate with the MDM and download the latest DDM (Declarative Device Management) configurations.

## Practical Advice:

- **Proactive Scheduling**: Periodically renew the certificate during summer breaks (every two years) to prevent sudden classroom disruptions mid-semester.
- **Verify Managed Apple Accounts**: If certificates are valid but the issue persists, ensure that student/teacher Managed Apple Accounts are aligned and have not been affected by domain changes or federation issues.

---

## File: acc-12.md

---

id: acc-12

title: "Can I migrate to a new MDM provider without wiping device data?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["Migration", "MDM Transfer", "OS 26"]

**While System Version 26 supports 'Automated MDM Migration', it remains 'strongly discouraged' in educational environments due to potential configuration conflicts.**

According to the latest updates from WWDC 25, Apple has enhanced the `MigrateDevice` command in **Version 26** (iOS 26 / macOS 26 Tahoe), allowing devices to migrate silently from an old MDM to a new one. However, significant risks remain:

## 1. Educational Environment Constraints:

- **Profile Residue**: Non-wipe migrations often lead to residual "Restriction Profiles" or "Education Settings" from the old MDM conflicting with the new one, potentially breaking Apple Classroom.
- **Data Integrity**: Over time, student devices accumulate cache and temporary files. Without a clean reset, new MDM configurations may not apply correctly.
- **License Sync**: VPP app licenses may fail to transition smoothly, preventing subsequent updates.

## 2. Technical Context:

- Devices must be updated to **Version 26 (iOS/iPadOS 26, macOS 26 Tahoe)** for the most stable "wipe-free" migration experience.
- While this feature has been significantly bolstered since WWDC 2025, a clean reset remains the recommended option for complex educational deployments.

## Practical Advice:

To ensure device stability for a new semester, we prioritize the **Return to Service (RTS)** feature. Introduced in iOS 17 and optimized in **Version 26**, RTS allows administrators to send a single command that wipes the device and automatically re-enrolls it using cached Wi-Fi credentials. Crucially, **OS 26 supports retaining installed managed apps during the RTS process**, providing a "clean, stable, and fully automated" transition.

---

## File: acc-13.md

---

id: acc-13

title: "Can users reset their own Managed Apple Account passwords?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Password Reset", "ASM", "Administrator Action"]

**Standard Apple School Manager (ASM) accounts do not currently offer a global 'Self-Service Password Reset' toggle for end-users.** Apple maintains strict permission levels for Managed Apple Account security. Password reset logic depends on your setup:

## 1. Federated Authentication (Google / Microsoft)

- If your school uses Google or Microsoft credentials to log in, password resets are **handled entirely on the Google or Microsoft side.**
- The user simply changes their password on that platform, and the Apple Account syncs automatically. This is currently the only way to achieve true "Self-Service Reset."

## 2. Standard Managed Apple Accounts (Non-Federated)

- **Administrator Action Required**: Users cannot reset passwords via `iforgot.apple.com` (unless a recovery phone is linked, which is only supported in specific regions).
- **Authorized Roles**: Personnel with "Administrator," "Site Manager," or "People Manager" roles must manually click "Reset Password" or "Create Sign-In Information" in ASM.

## 3. Regarding Account Recovery

While Apple optimized account recovery in OS 26, the primary control for student accounts remains with the school IT administrator for security and compliance reasons.

## Practical Advice:

If your accounts are not federated, students **must contact the ICT Support Team** if they forget their password. We recommend that administrators use the batch selection feature at the start of the semester to generate PDFs or CSVs containing temporary passwords for distribution.

---

## File: acc-14.md

---

id: acc-14

title: "Newly purchased devices are not syncing from ASM to Jamf Pro? (ADE Server Token Renewal)"

category: "Section 1: Account & Server Management"

important: true

## tags: ["ADE", "Server Token", "Automated Device Enrollment"]

**If newly purchased devices do not appear in your MDM inventory, the most common reason is an expired 'Server Token' or unassigned devices in Apple School Manager (ASM).**

The Server Token acts as the secure bridge between ASM and Jamf Pro for hardware management (formerly known as the DEP process). It is responsible for syncing purchase serial numbers from Apple to your MDM console.

## Troubleshooting Steps:

1. **Token Expiration**: Server Tokens are valid for exactly one year. Once expired, Jamf Pro cannot fetch new serial numbers or update the enrollment status of existing ones from Apple.
2. **Unassigned Devices**: New devices must be assigned to your Jamf Pro "MDM Server" within ASM before Jamf Pro can "see" them.
3. **Unaccepted Terms**: As mentioned in `acc-1`, if new Apple terms and conditions have not been accepted, Apple will suspend all ADE synchronization activities.

## How to Renew the Server Token:

1. Log in to [school.apple.com](https://school.apple.com).
2. Click your name at the bottom left > **Preferences > Your MDM Servers**.
3. Select your server and click **Download Token**.
4. Log in to Jamf Pro, go to **Settings > Global Management > Device Enrollment**.
5. Select your server instance and upload the new token file to complete the renewal.

## Synchronization Context:

- **Sync Now**: While syncing occurs periodically, you can click "Sync Now" in Jamf Pro to force an immediate refresh after assigning devices in ASM.
- **Automation Trends**: In modern OS versions, Apple has enhanced background push mechanisms. Synchronization typically occurs automatically within minutes of assignment in ASM, but "Sync Now" remains the go-to tool for manual troubleshooting.

## Practical Advice:

We recommend setting a "Default Device Assignment" in ASM for iPad and Mac. This ensures all future purchases are automatically linked to your Jamf Pro server, requiring only the annual token renewal for a fully automated hardware intake workflow.

---

## File: acc-15.md

---

id: acc-15

title: "What are the main differences between Jamf Pro and Jamf School? How should we choose?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Jamf Pro", "Jamf School", "Product Comparison"]

**Both products are Apple-validated MDM solutions, but they differ significantly in design philosophy, language support, and depth of management capabilities.**

Based on official technical specifications, here is an objective comparison:

## 1. User Interface and Localization

- **Jamf Pro**: Offers full, official **Traditional Chinese** localization, making it more accessible for local technical staff and administrators.
- **Jamf School**: As of late 2025, the administrative interface **is not available in Traditional Chinese**, supporting only English and several European languages.

## 2. Management Logic and Technical Depth

- **Jamf Pro**: Utilizes a "Smart Groups" and "Policies" mechanism. Beyond standard configuration profiles, it supports extensive custom **Scripts** and **Extension Attributes**, allowing for granular, low-level automation and management.
- **Jamf School**: Designed specifically for K-12 environments with a simplified, intuitive interface. While it includes smart groups, its core focus is on the deployment of configuration profiles; its ability to execute low-level scripts is more limited compared to Jamf Pro.

## 3. Multi-Site Architecture and Scalability

- **Jamf Pro**: Features a powerful **"Sites"** capability, allowing for completely independent management environments within a single server instance (e.g., a district managing the primary instance while individual schools manage their specific sites).
- **Jamf School**: While it supports multi-school management, the depth of isolation and permissioning for global resource sharing is more streamlined.

## 4. API and Third-Party Integration

- **Jamf Pro**: Boasts the most robust Classic and Pro APIs in the industry, enabling deep integration with external asset management systems, automated reporting tools, and identity providers.
- **Jamf School**: Provides an API, but the structure and available data fields are more concise than those of Jamf Pro.

## Practical Advice:

- **Choose Jamf Pro**: If your institution requires a **Traditional Chinese interface**, involves large-scale multi-site management, or needs complex automation scripts and deep third-party system integrations.
- **Choose Jamf School**: If your deployment scale is smaller, technical resources are limited, and your administrators are comfortable navigating an English-only interface.

---

## File: acc-16.md

---

id: acc-16

title: "How do I handle 'Domain Conflicts' in Apple School Manager and reclaim account ownership?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["Domain Conflict", "Account Transfer", "ASM"]

**Once a school verifies its domain in Apple School Manager (ASM), the system automatically identifies 'Personal Apple Accounts' registered with school email addresses and initiates a migration process.**

This process, known as handling "Domain Conflicts," is designed to protect user privacy while ensuring organizational security.

## How it Works:

1. **Identification**: After verifying your domain (e.g., `@school.edu.tw`) in ASM, Apple scans for personal Apple Accounts using that domain.
2. **Notification**: Apple automatically emails these users, informing them that the organization has claimed ownership of the domain.
3. **60-Day Grace Period**: Users have 60 days to choose:
   - **Change Personal Email**: The user changes their personal Apple Account to a private email (e.g., Gmail). All data (photos, app purchases) remains intact, but the account name changes.
   - **Release for Organization Use**: If the account was used solely for work/teaching, the user can change the email to release it, allowing the school to recreate it as a **Managed Apple Account**.

4. **Forced Release (Domain Capture)**: If the user takes no action after 60 days, Apple requires them to change their email upon their next sign-in (using a temporary `@gtempaccount.com` name). The school email is then released for the organization to use. In 2025+ versions, administrators can further automate this via the "Domain Capture" feature.

## Important Privacy Note:

School administrators **cannot** view any personal data (photos, messages, etc.) through this process. You are only reclaiming the rights to the "Account Name" (the email address), not capturing the content.

## Admin Path:

Log in to ASM > **Settings > User Management > Domains**. You can view conflict status and remaining days next to your verified domains.

---

## File: acc-17.md

---

id: acc-17

title: "How do I use Platform SSO (PSSO) to unlock FileVault at system boot?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["PSSO", "FileVault", "macOS 15+", "Authentication"]

**Starting with macOS 15 (Sequoia), Platform SSO supports deep integration with FileVault, effectively eliminating the 'dual-password' friction point during startup.**

## The Solution:

Previously, even if a Mac was domain-joined, the initial FileVault unlock screen required a local password. With the Platform SSO extensions introduced in macOS 15, we can achieve:

1. **Password Synchronization**: Write network credentials (e.g., Microsoft Entra ID / Okta) directly into the FileVault unlock list.

2. **Single Sign-On Experience**: Users enter their organizational credentials at the boot screen. Once the disk is unlocked, the identity is passed through to the desktop, bypassing the second login screen.

## Technical Requirements:

- **System Version**: macOS 15 or later (upgrading to **macOS 26 Tahoe** is recommended for the most stable experience).
- **IdP Support**: Your Identity Provider must support the latest Platform SSO protocols (Microsoft Entra ID officially supported this from 2025).
- **MDM Configuration**: In the Jamf Pro "Single Sign-On Extensions" profile, you must enable settings for `Shared Device Keys` and `FileVault` integration.

## Benefits:

This significantly reduces support tickets caused by teachers forgetting their local Mac passwords, as they only need to remember one school-managed credential.

---

## File: acc-18.md

---

id: acc-18

title: "How do I transfer VPP App licenses smoothly when changing MDM providers?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["VPP", "MDM Migration", "License Reclamation"]

**You do not need to repurchase anything. App licenses are tied to the 'Location' in Apple School Manager (ASM), not to a specific MDM software.**

As long as your licenses are in your ASM backend, you can rotate them between different MDM servers.

## Standard Transfer Flow:

1. **Reclaim Licenses in Old MDM**: This is the most critical step. You must remove the app assignment tasks in your old MDM to ensure the license status returns to "Available."
2. **Update Token in New MDM**: Upload the VPP Token for that specific location to your new MDM (e.g., Jamf Pro).
3. **Sync Content**: The new MDM will immediately pull the counts for all remaining licenses from ASM.

## Advanced Tech (MDM Migration API):

If both your old and new providers support the migration APIs introduced in iOS 17.5, a **"Silent Migration"** may be possible under specific conditions. This means apps remain on the device while ownership is "re-assigned" to the new MDM server in the background, making the transition completely transparent to the user.

---

## File: acc-19.md

---

id: acc-19

title: "How do I control access to Apple Intelligence features for Managed Apple Accounts?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["Apple Intelligence", "Service Access", "ASM"]

**Administrators can determine whether to allow AI features through the 'Service Access' settings in Apple School Manager (ASM).**

As Apple expands **Apple Intelligence** through 2024 and 2025, ASM provides account-level toggles that complement MDM device restrictions.

## Configuration Methods:

1. **Account Level (ASM)**: Log in to ASM > **Settings > User Management > Service Access**. Here, you can enable or disable Apple Intelligence services for specific roles (e.g., students).
2. **Device Level (MDM)**: In the Jamf Pro Restrictions profile, you can specifically disable features like "Writing Tools" or "Image Playground."

## Why configure at the account level?

If you disable the service in ASM, the student will be unable to use Apple Intelligence cloud-based features even if they sign into their Managed Apple Account on a personal, unmanaged device. This ensures the educational institution maintains absolute control over data flow.

---

## File: acc-20.md

---

id: acc-20

title: "Do Managed Apple Accounts support Multi-Factor Authentication (MFA)? How is it managed?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["MFA", "Security", "Managed Apple Account"]

**Yes. Managed Apple Accounts support MFA via managed recovery phones or Federated Authentication.** Enables MFA is a basic security standard for high-privilege accounts, such as administrators or teachers.

## Implementation Methods:

1. **Federated Authentication (Recommended)**: If you have integrated with Google or Microsoft, MFA is handled by that platform. After entering the domain password, the user is prompted by Google Authenticator or Microsoft Authenticator. Apple only receives the successful authentication result.
2. **Standard ASM Accounts**: Users link a trusted phone number upon login. If a user loses their phone or changes numbers, a **Manager or Administrator** in ASM can select the user and click **Reset MFA Status**, allowing the user to bind a new device.

## Practical Advice:

We strongly recommend that all accounts with the "Administrator" role link at least two recovery channels or use physical hardware **Security Keys** to prevent a single lost device from locking the entire school out of the management console.

---

## File: acc-21.md

---

id: acc-21

title: "Is 'moemdm' the same as 'Jamf Pro'? Why does the school need two accounts?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["moemdm", "MOE", "Jamf Pro", "Architecture"]

**They are completely different. Jamf Pro is the actual 'Remote Control' (the management system), while moemdm is the MOE 'Dashboard' (the reporting platform).**

Many school administrators find this confusing. Please clarify the following roles:

## 1. Jamf Pro (School Management Core):

- **Function**: This is where you perform daily operations, such as deploying apps, configuring Wi-Fi, resetting passcodes, and restricting student features.
- **Nature**: An active management tool. Commands are sent directly from the Jamf server to student iPads.
- **Target Users**: IT coordinators, system administrators, and teachers.

## 2. moemdm (MOE Reporting Platform):

- **Function**: This is used by the Ministry of Education (MOE) to track the "Asset Health" and "Usage Rates" of devices in the Digital Initiative project.
- **Nature**: A data aggregation and statistics platform. Changing settings in the moemdm web portal does not directly change the behavior of the iPads.
- **Integration**: moemdm connects to Jamf Pro via APIs. As long as your Jamf Pro configuration is correct, data syncs to moemdm automatically for MOE audits.

## Why the distinction?

- **Security**: The MOE does not need—and should not have—direct control over every school's individual devices (avoiding a single point of failure).
- **Autonomy**: Schools retain pedagogical autonomy (via their own Jamf instances), while the MOE performs asset auditing and performance tracking via moemdm.

## Practical Advice:

To troubleshoot a device or change apps, log in to **Jamf Pro**. To check if school KPIs have been met or to fill out end-of-term reports, log in to **moemdm**.

---

## File: acc-22.md

---

id: acc-22

title: "How do I batch create Managed Apple Accounts? Should I use SFTP or CSV import?"

category: "Section 1: Account & Server Management"

important: true

## tags: ["ASM", "Batch Operations", "SFTP", "CSV", "Managed Apple Account"]

**According to official Apple documentation, there are three primary ways to create Managed Apple Accounts: SFTP Upload (SIS integration), Manual CSV Import, and Federated Authentication.**

## Comparison of Methods

| Method                       | Best For                                      | Key Features                                                       |
| :--------------------------- | :-------------------------------------------- | :----------------------------------------------------------------- |
| **Manual CSV Import**        | Small schools, no SIS, or temporary batches   | Straightforward web-based upload. Good for initial setup.          |
| **SFTP Upload**              | Schools with a SIS, requiring regular updates | Supports Apple templates and OneRoster. Highly automated.          |
| **Federated Authentication** | Schools using Google Workspace / Entra ID     | **Most Recommended**. Automatic account creation upon first login. |

## 1. Uploading Data via SFTP (Automation/SIS Integration)

If your school uses a Student Information System (SIS), you can upload data via Secure File Transfer Protocol (SFTP).

- **Supported Formats**:
  - **Apple CSV Format**: Using standard Apple-provided templates.
  - **OneRoster CSV**: Supporting OneRoster version 1.1 specifications.

- **Workflow**:
  1. **Setup Connection**: Obtain your SFTP URL, username, and password from ASM.
  2. **Prepare Files**: Export data and create a **ZIP archive** containing all necessary CSV files.
  3. **Upload**: Use an SFTP client to connect and drag the ZIP file into the **dropbox** folder (this is the default root folder on Apple’s SFTP server).
  4. **Processing**: ASM will process the files automatically. You can download logs to check for errors.

- **Note**: After the initial connection, every subsequent update must include "all" CSV files, even those that haven't changed.

## 2. Manual CSV Upload

Ideal for scenarios without an SFTP server, performed directly via the browser.

- **Path**: Log in to ASM > Select CSV options in the sidebar > "Upload CSV."

- **Process**: Choose your format (Apple or OneRoster) > Upload files > System validates and imports.

## 3. Federated Authentication (with Directory Sync)

This is the most modern approach, linking ASM to **Google Workspace** or **Microsoft Entra ID**.

- **Advantage**: Users log in with their existing organizational Email and password to create their Managed Apple Account on the fly.

- **Hybrid Mode**:
  - **Account Source**: Provided by Federated Authentication (IdP).
  - **Classes & Roster**: Can still be created via SFTP CSV uploads.
  - This perfectly combines existing identity providers with curriculum data.

## Expert Advice

- **Person ID is Key**: Regardless of the method, the `person_id` must be a **permanently unique** identifier. We strongly recommend using a Student ID number rather than a classroom seat number, as the latter changes every year and will cause account duplicates or data corruption.

---

## File: acc-23.md

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

## ]

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

---

## File: acc-24.md

---

id: acc-24

title: "How is the iCloud storage quota managed for Managed Apple Accounts? What if a student runs out of space?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["iCloud", "Storage", "Quota", "Managed Apple Account"]

**Managed Apple Accounts for education default to a 200GB iCloud storage quota. Administrators cannot adjust individual quotas or purchase additional space for specific users.**

## Storage Quotas by Organization Type

- **Education (ASM)**: Apple provides **200GB** of iCloud storage for every user (staff and students) at no additional cost.
- **Business (ABM)**: Defaults to 5GB. Organizations with **Apple Business Essentials (ABE)** may have 50GB or 200GB quotas. _Note: As of early 2026, ABE is not yet widely available in all regions (including Taiwan)._

## Handling a Full 200GB Quota

If a student's 200GB is full (often due to backing up large personal photo/video libraries), consider the following strategies:

1. **Utilize the 'Schoolwork' App**:
   - Files submitted via the **Schoolwork** app (Pages, Keynote, video assignments) are managed separately from the student’s personal iCloud quota, reducing pressure on their individual space.
   - Teach students to manage files effectively instead of storing all miscellaneous data in iCloud.

2. **Cleanup and Backup (SOP)**:
   - **Check Backup Content**: Go to Settings > Apple Account > iCloud > iCloud Backup and disable backups for non-essential apps.
   - **Offload Photos**: Guide students to move non-academic photos to personal devices or a school-provided Google Photos account.
   - **Purge Old Coursework**: At the end of the semester, export important files to a school NAS or external storage and clear the iCloud space for the next term.

3. **Alternative Cloud Services**:
   - If your school provides **Google Workspace for Education** or **Microsoft 365**, direct students to store large static files (like long-form video projects) on Google Drive or OneDrive. Keep iCloud reserved for app syncing and current documents.

## Expert Insight

- **Academic Opportunity**: Use this as a chance to teach students about "Digital Decluttering" and file management. Storage is always a finite resource, and organizing data is a key digital literacy skill.

---

## File: acc-25.md

---

id: acc-25

title: "What automation tasks can be performed using ABM/ASM APIs? Does it require development skills?"

category: "Section 1: Account & Server Management"

important: false

## tags: ["API", "Automation", "ABM", "ASM", "Advanced Management"]

**Apple provides APIs for ASM/ABM that allow developers to interact directly with organizational data, enabling advanced automations like "automated account creation," "device inventory queries," and "bulk MDM reassignment."**

## Key API Use Cases

1. **Roster Automation**:
   - Integrate directly with the school’s **SIS (Student Information System)**. When a registrar adds a transfer student to the SIS, the Roster API can automatically create the corresponding Managed Apple Account in ASM and assign it to the correct Class and Location.
   - This replaces traditional daily SFTP imports, achieving "real-time" synchronization.

2. **Device Inventory & Management**:
   - Third-party asset management systems can use the Device API to query the list of devices in ASM/ABM, including their model, warranty status, and MDM assignment.
   - Automate "MDM Server Assignment": For example, detecting newly purchased iPads and automatically assigning them to the "Student MDM" based on the order number, while assigning Macs to the "Staff MDM."

3. **Custom Reporting & Data Export**:
   - Build customized dashboards or export device data to other internal systems for audit and analysis using API endpoints.

## Technical Barriers & Development Requirements

- **Does it require development skills? Yes.**
- Using these APIs requires proficiency in **RESTful API** integration, understanding of OAuth 2.0 authentication flows, and the ability to write code (e.g., Python, Node.js) to send requests and handle JSON responses.
- Typically, this level of automation is performed by **large district IT departments** or **System Integrators (SI)**.

## Advice for Individual Schools

- **No need to build from scratch**: Most mainstream MDM solutions (like Jamf Pro) and Identity Providers (like Microsoft Entra ID or Google Workspace) already have built-in integrations with the ASM API.
- **Leverage existing tools**:
  - To sync accounts: Use Jamf Pro’s LDAP integration or Google Workspace Federation.
  - To manage devices: Use the MDM console directly without writing custom code to call the ASM API.

- **When is the API necessary?** Only consider custom development if off-the-shelf software cannot meet a highly specific requirement, such as integrating with a proprietary homegrown school administration system.

---

## File: acc-26.md

---

id: acc-26

title: "How should iCloud+ features (e.g., Hide My Email, Private Relay) be managed for Managed Apple Accounts in schools?"

category: "Section 1: Account & Server Management"

important: false

tags:
[
"iCloud+",

    "Managed Apple Account",

    "Privacy",

    "Private Relay",

    "Education Management",

## ]

**As Apple expands permissions for education users, modern 'Managed Apple Accounts' now enjoy benefit from certain advanced iCloud+ privacy features. However, in a school setting, these 'Privacy Enhancements' (such as Hide My Email and iCloud Private Relay) can sometimes conflict with network management and security auditing protocols.**

## Feature Breakdown and Management Strategy

### 1. iCloud Private Relay

- **How it works**: Encrypts DNS requests and HTTP traffic, masking the user’s IP and browsing activity from the ISP and network owner.
- **School Conflict**: Bypasses school-level content filters and firewalls, making it difficult to block inappropriate content or monitor for cyberbullying.
- **MDM Recommendation**: Use the **Restrictions** payload to disable **'Allow iCloud Private Relay'**. This ensures student web traffic remains subject to the school’s safety policies.

### 2. Hide My Email

- **How it works**: Generates random email addresses that forward to the user’s primary inbox, preventing third-party apps from knowing the student’s real email.
- **School Conflict**: Can make it difficult for IT to identify which student signed up for a specific service or tool during an audit.
- **MDM Recommendation**: While less critical than Private Relay, schools can disable **'Allow Hide My Email'** if strict identity tracking is required for all approved educational apps.

### 3. iCloud Private Email Domain

- **How it works**: Allows users to set up personal domains for iCloud Mail.
- **School Conflict**: Not typically applicable to students as their domains are managed by the school.
- **MDM Recommendation**: Generally disabled by default for Managed Apple Accounts.

## Expert Insight

For student devices, maintaining **Network Visibility** is the priority. We recommend disabling **Private Relay** via MDM to ensure your Content Filtering (DNS Proxy or Network Extension) remains effective. For teacher devices, you may choose to leave these features enabled to respect professional privacy.
