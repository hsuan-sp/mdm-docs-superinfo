---
File: mac-1.md
---

---

id: mac-1

title: "Should we still bind our Macs to Active Directory (AD)? What is the modern recommendation?"

category: "Section 7: Advanced Mac Management"

important: true

## tags: ["AD", "Identity", "Jamf Connect", "Platform SSO", "No-Bind"]

**We strongly recommend a "No-Bind" strategy. Instead of traditional AD binding, schools should adopt Platform SSO or Jamf Connect.**

The traditional method of "Binding" a Mac to a Domain Controller (DC) is increasingly unreliable in a modern campus environment characterized by mobile laptops and Zero Trust security.

## Why Move Away from AD Binding?

1. **Mobility Barriers**: If a teacher takes their MacBook home, they are disconnected from the DC. This often causes slow logins or failures when trying to sync password changes made on campus.
2. **Keychain Synchronization Issues**: When an AD password is changed, the local Mac "Keychain" often falls out of sync, leading to constant and frustrating password prompts for the user.
3. **Legacy Technology**: Apple is no longer actively developing the AD Plugin. Modern macOS management is built around Cloud Identity Providers (IdP).

## Modern Alternatives for 2026:

### Option A: Platform SSO 2.0 (The Standard for macOS 26 Tahoe)

Introduced in macOS 13 and fully matured in **macOS 26**, Platform SSO is the Apple-native way to link your Cloud ID (Google, Microsoft Entra ID) to the local Mac login.

- **Simplified Setup**: During the out-of-box "Setup Assistant," the Mac requires the student to log in with their campus ID, which then automatically creates their local account.

- **Seamless Sync**: The local Mac password is kept perfectly in sync with the cloud password.
- **Passwordless Future**: macOS 26 supports authorized logins using Face ID or Touch ID, significantly reducing "forgotten password" tickets.

### Option B: Jamf Connect

For schools requiring more granular control or custom branding (e.g., displaying the school logo and Acceptable Use Policy on the login screen).

- **Just-in-Time Provisioning**: It creates the local account the first time a user logs in with their cloud credentials.

- **Enforced Multi-Factor Authentication (MFA)**: You can require students or staff to pass an MFA check (phone app or security key) before they can even reach the Mac desktop.

## Institutional Advice:

If your school still has a large fleet of AD-bound Macs, we recommend a phased "Unbind" project. Migrating to **Platform SSO** will drastically reduce the support burden associated with "Password Desynchronization" and login delays.

---

## File: mac-2.md

---

id: mac-2

title: "How do we manage Local Admin privileges for staff and students on Macs?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Privilege Management", "LAPS", "Security", "Standard User"]

**The Gold Standard is to provide "Standard User" accounts for daily tasks, supplemented by a "just-in-time" Admin elevation tool or a Managed LAPS solution.**

Granting permanent Admin rights to students or teachers is a major security risk. It allows for the disabling of security software, the installation of unauthorized apps, and makes the campus network more vulnerable to ransomware.

## The Three-Tier Management Strategy:

### 1. Standard User by Default

- All school-issued Macs should be set up with "Standard User" accounts. This prevents users from altering core system settings or installing system-wide software without oversight.

### 2. Native LAPS (Local Administrator Password Solution)

- **2026 Status**: As of **macOS 26**, Apple includes a native LAPS protocol.
- **How it works**: Jamf Pro creates a hidden admin account on every Mac. The password for this account is a long, random string that **rotates automatically** every few days.
- **Operational use**: If a technician needs to fix a Mac, they look up the _current_ random password in the Jamf dashboard. Once used, the password is refreshed, ensuring the old one can never be used again.

### 3. Self-Service Elevation (Privileges App)

For staff members who occasionally need to install a printer driver or specialized software:

- **Tool**: Deploy the **Privileges** app (or Jamf’s equivalent).

- **Workflow**: The teacher clicks a lock icon in the Dock, justifies the need, and is granted **Admin rights for 20 minutes**. After the timer expires, the system automatically demotes them back to a Standard User.

## Institutional Advice:

Adopting the "Principle of Least Privilege" does not mean making life difficult for teachers; it means providing them with the tools to be productive while ensuring the school’s digital assets remain secure and compliant with insurance standards.

---

## File: mac-3.md

---

id: mac-3

title: "How do we distribute non-App Store software like Chrome, Adobe CC, or Office?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Software Distribution", "App Installers", "PKG", "Auto-Update"]

**Move away from manual packaging. Use Jamf Pro's "App Installers" for high-frequency apps, and DDM-based distribution for mission-critical software.**

Managing Mac software used to involve a tedious cycle of downloading DMGs, repackaging them into PKGs, and uploading them. Today, there are much more efficient pathways.

## Modern Software Deployment Tiers:

### Tier 1: Jamf App Installers (Preferred)

- **The Workflow**: You choose "Google Chrome" from the Jamf catalog. Jamf handles the downloading, packaging, and—crucially—the **Automatic Updates**.
- **Self-Healing**: In **macOS 26**, this is backed by DDM. If a student deletes Chrome, the Mac notices the "State Desync" and automatically reinstalls the app in the background without any IT intervention.

### Tier 2: Mac App Store (VPP)

- Best for classroom favorites like Goodnotes, Keynote, or GarageBand.
- Purchase licenses in bulk via Apple School Manager and push them to devices. Installation is silent and updates are managed by the system.

### Tier 3: Adobe Creative Cloud (Shared Device License)

- For computer labs, use the **Adobe Admin Console** to create a "Shared Device License" package.
- Push this package via a Jamf Pro policy. This ensures that any student who sits at the Mac can use the software using their individual school ID.

### Tier 4: Custom PKGs (Last Resort)

- Use **Jamf Composer** to package specialized local curriculum software or niche drivers that are not found in public catalogs.

## Institutional Advice:

Focus on the "App Installers" catalog for 90% of your needs. Ensuring that apps like Chrome and Zoom are automatically kept on the latest version is the single best way to reduce security vulnerabilities across the campus.

---

## File: mac-4.md

---

id: mac-4

title: "How should we design our macOS update strategy for 2026? How does DDM change things?"

category: "Section 7: Advanced Mac Management"

important: true

## tags: ["Software Updates", "DDM", "macOS 26", "Compliance", "IT Strategy"]

**In the macOS 26 (Tahoe) era, Apple has fully transitioned to Declarative Device Management (DDM) for software updates. IT teams no longer "send a command" to update; they "declare a state."**

This shift solves the old problem of update commands being ignored or failing due to network timing.

## I. Traditional vs. Declarative (DDM) Updates

| Feature             | Old MDM Command                    | New DDM (macOS 23+)                      |
| :------------------ | :--------------------------------- | :--------------------------------------- |
| **Logic**           | Server pushes, Device might ignore | **Device self-monitors** and enforces    |
| **Deadlines**       | Optional / Flaky                   | **Hard Enforcement Deadlines**           |
| **User Experience** | Random popups                      | Clear countdowns and notifications       |
| **Visibility**      | "Unknown" status until done        | Real-time status: "Downloading," "Ready" |

## II. 2026 Standard Operating Procedure for IT

### 1. Set Enforcement Deadlines

- **Major Updates (e.g., 26.1)**: Set a deadline for **14-21 days** after release. This gives everyone time to choose a convenient moment.
- **Security Patches (RSR)**: Set a deadline for **48 hours**. Critical security shouldn't wait.
- **The Result**: Users get multiple gentle reminders. If they haven't updated by the deadline, the Mac will **force a restart and install** automatically at the specified time.

### 2. Utilize DDM Status Channels

- Administrators no longer need to manually "Scan for Inventory" to see who is updated.
- DDM actively reports its progress: "I have downloaded the update and scheduled installation for 17:00."

### 3. Campus Network Infrastructure

- Massive simultaneous DDM updates place extreme stress on school bandwidth.
- **Key Infrastructure**: Ensure each administrative or classroom building has at least one Mac mini acting as a **"Content Caching"** server. This ensures 90% of the update traffic stays on the local network.

## III. Practical Reminders

- **Avoid Exam Weeks**: DDM enforcement is highly strictly. During assessment weeks or high-stakes exams, please temporarily unassign the update profile to prevent a student's Mac from automatically restarting mid-exam because a deadline was reached.

## Institutional Advice:

Transitioning to DDM Enforcement Deadlines is the only way to ensure 100% compliance across a laptop fleet. It moves the responsibility of "staying updated" from the student to the hardware itself.

---

## File: mac-5.md

---

id: mac-5

title: "How do I force a Mac to perform system updates? Students keep clicking 'Remind Me Later'."

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["System Updates", "DDM", "Nudge", "IT Operations"]

**The modern solution is to use "Declarative Device Management (DDM)."** If you need more visual urgency, you can supplement this with the open-source tool "Nudge."

Unlike iPads, Mac updates often require a lengthy restart, which leads students to postpone them indefinitely, creating a fragmented and insecure fleet.

## Strategy 1: DDM Enforced Updates (Recommended for macOS 14+)

- **The Logic**: This is Apple's newest management protocol. IT administrators set an **"Enforcement Deadline."**
- **The Workflow**:
  1. In the days leading up to the deadline, the system gently notifies the student.
  2. As the deadline approaches, the notifications become more persistent.
  3. **Once the deadline is reached**, the Mac will automatically download the update and force a restart. The student cannot postpone it further.

- **Configuration**: This is set in Jamf Pro under **Configuration Profiles > Software Update**, where you define the target version and the specific cut-off date and time.

## Strategy 2: Nudge (Visual Urgency)

If the subtle system notifications aren't enough, the community-standard tool **Nudge** is the best solution.

- **Functionality**: It pops up a non-dismissible window (which can be branded with the school logo) that clearly states: "Your Mac is out of date and insecure. Please update now."

- **Escalation**: As the deadline nears, Nudge can dim the screen or blur the background, making it impossible for the student to ignore the update while they try to use other apps.
- **Deployment**: Deploy the Nudge package and JSON configuration via Jamf Pro.

## Institutional Advice:

For computer labs that are unoccupied at night, use Jamf Pro to schedule a "Wake Up" command at 2:00 AM followed by a "Force Update" command. This allows the heavy lifting to happen while the students are asleep, ensuring the labs are ready and updated for the first period.

---

## File: mac-6.md

---

id: mac-6

title: "How can I quickly reset (wipe) a Mac lab, similar to using recovery cards?"

category: "Section 7: Advanced Mac Management"

important: false

tags:
["Reset", "EACS", "Erase All Content and Settings", "Computer Lab", "Imaging"]

---

**In the era of Apple Silicon (M-series), using "recovery cards" or "Ghost" imaging is no longer recommended and often not even possible. Instead, use the "Erase All Content and Settings (EACS)" command.**

Traditional monolithic imaging has been completely retired by Apple. The modern reset logic is "Clear user data + Keep operating system + Automatically re-enroll."

## Comparison of Reset Methods

| Feature              | Legacy Re-imaging                       | Erase All Content and Settings (EACS)     |
| :------------------- | :-------------------------------------- | :---------------------------------------- |
| **Principle**        | Format drive > Re-download & install OS | Destroy encryption keys > Clear user data |
| **Time Required**    | 1-2 hours                               | **5-10 minutes**                          |
| **Network Demand**   | Requires 12GB+ OS download              | **Minimal bandwidth**                     |
| **Data Security**    | Disk formatting (recoverable)           | Cryptographic destruction (unrecoverable) |
| **Hardware Support** | All Intel/Apple Silicon Macs            | Macs with T2 or Apple Silicon chips       |

## Standard Reset SOP (Jamf Pro)

### 1. Send Command

- Send the **"Wipe Computer"** command to the target computer group in Jamf Pro.
- **Crucial**: For Apple Silicon and T2-equipped Macs, this command automatically triggers **EACS (Erase All Content and Settings)**.

### 2. Execution (Within minutes)

- The system instantly discards the encryption keys (Cryptographic Erase), making data unreadable within seconds.
- The computer reboots to the "Hello" (Setup Assistant) screen.

### 3. Automated Deployment (Zero-Touch)

- The computer connects to the network (Ensure a non-authenticated Wi-Fi or wired network is provided).
- **ADE (Automated Device Enrollment)** is triggered automatically.
- PreStage Enrollment settings are downloaded, admin accounts are created, and software is installed automatically.

## Difference from Traditional Recovery Cards

- Traditional cards "restore on every reboot."
- Modern Mac management uses EACS reset at the "end of a semester or project."
- If daily restoration is required (e.g., for library public kiosks), consider using **"Guest User" mode** (which deletes data upon logout) or specialized kiosk software (like Deep Freeze for Mac).

---

## File: mac-7.md

---

id: mac-7

title: "What special restrictions apply to managing Apple Silicon (M-series) Macs?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Apple Silicon", "Bootstrap Token", "Secure Boot", "Kernel Extensions"]

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

---

## File: mac-8.md

---

id: mac-8

title: "Why does MDM require FileVault? How do I recover a forgotten login password?"

category: "Section 7: Advanced Mac Management"

important: true

tags:
[
"FileVault",

    "Full Disk Encryption",

    "Data Security",

    "Recovery Key",

    "Jamf Pro",

    "Inventory",

## ]

**FileVault is macOS's built-in "Full Disk Encryption" technology, ensuring that data cannot be stolen if the computer is lost. By escrowing the "Recovery Key" to MDM, administrators can help unlock the device if a user forgets their password.**

## Technical Principles:

- **XTS-AES-128 Encryption**: Before login, the hard drive data is encrypted and unreadable.
- **Performance Impact**: Modern Macs handle encryption via the Secure Enclave hardware, resulting in virtually zero impact on daily performance.
- **2026 Experience: Platform SSO (PSSO)**: In macOS 26, using PSSO allows users to enter their password just once at the FileVault screen to boot directly to the desktop. The system automatically handles subsequent identity provider (IdP) verification and login. This eliminates the legacy "double login" frustration.

## Jamf Pro Deployment and Escrow Flow (SOP):

### 1. Create Configuration Profile

- Go to **Configuration Profiles > New > FileVault**.
- Set to **Require FileVault**.
- **Crucial Step**: Set to **Create Personal Recovery Key** and choose **Escrow Personal Recovery Key to MDM**.

### 2. User-Side Activation

- After deployment, the system will prompt the user to enable encryption at the next logout or reboot.
- **Note**: Jamf Pro will only receive the key once the user completes this step and the status changes to "Encrypted."

## Recovery Scenario: Looking up the Recovery Key

If a user forgets their password, the administrator must retrieve the key from the console.

### 1. Navigate to Inventory

- Log in to Jamf Pro and search for the target computer.
- Go to the detail page and select the **Inventory** tab > **Disk Encryption**.

### 2. Verify Encryption and Key

- First, check if **FileVault 2 Enabled** is set to **Encrypted** or **Enabled**.
- **If Encrypted**: You will see a **Personal Recovery Key** field. Click **Show Key** to reveal the code.
- **If Not Encrypted**: This field will not appear, meaning encryption is incomplete or the escrow failed. Recovery via MDM is not possible in this state.

### 3. Perform the Unlock

- On the Mac login screen, click the question mark (?) or enter the wrong password three times. Select **Reset password using Recovery Key** and enter the code.

## Practical Advice & Warnings:

- **Data Loss Risk**: If FileVault is enabled but Jamf Pro shows "Unknown" or no key, the escrow failed. If the password is forgotten in this state, **data is permanently unrecoverable**, and the device must be wiped.
- **Institutional Recovery Key (IRK)**: Modern management favors the "Personal Recovery Key (PRK)" mechanism for higher security.

---

## File: mac-9.md

---

id: mac-9

title: "What can Jamf Scripts do? How do I create and run them?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Automation", "Shell Script", "Zsh", "Policies", "Scripts", "jamfHelper"]

**Scripts allow administrators to execute shell commands with Root privileges on a Mac, enabling advanced customization that standard MDM payloads cannot achieve.**

Jamf Pro's power lies in its proprietary binary. When combined with **Policies**, you can achieve the following advanced scenarios:

## Common Application Scenarios:

| Scenario                  | Script Example                                                                                        |
| :------------------------ | :---------------------------------------------------------------------------------------------------- |
| **User Interaction**      | Use `jamfHelper` to pop up full-screen announcements or countdown windows.                            |
| **System Cleanup**        | Periodically delete specific cache files, temporary files, or reset the printing system.              |
| **Advanced Install**      | Install Homebrew, Rosetta 2, or call Installomator for automated software updates.                    |
| **Inventory Reporting**   | Collect info outside standard fields (e.g. battery health) and report it to **Extension Attributes**. |
| **Permission Management** | Temporarily grant Admin rights to a user and remove them after a set duration.                        |
| **AI Automation**         | Pre-trigger local indexing or semantic search initialization for Apple Intelligence models.           |
| **Swift Scripting**       | **2026 Trend**: Use Swift for safer, more efficient automation supporting native APIs.                |

## 2026 Trend: DDM is Replacing "Repetitive Scripts"

While scripts were previously used to check system states periodically, macOS 26 recommends using **Declarative Device Management (DDM)**.

- **Example**: Instead of a script that periodically deletes large caches in `/tmp/`, you can define a DDM policy that allows the system to perform "Self-Healing" in place, which is more efficient and real-time.

## Setup and Deployment Flow (SOP):

### 1. Write the Script

- Use **Zsh** (`#!/bin/zsh`), the default shell for modern macOS. **Note**: Python 2.7 has been removed since macOS 12.3; you must deploy your own interpreter to run Python scripts.

### 2. Upload to Jamf Pro

- Go to **Settings > Computer Management > Scripts**.
- Click **+ New**, enter a name, and paste your script content.
- **Parameters**: You can set labels for variables `$4` through `$11`, allowing the same script to take different inputs (e.g., a printer IP) via different policies.

### 3. Execute via Policy

- Go to **Computers > Policies > + New**.
- Set a **Trigger** (e.g., Recurring Check-in, Login).
- Add the **Scripts** payload and select your uploaded script.
- Set the **Scope** for the target computers.

### 4. Execution Frequency

- Define the frequency (e.g., **Once per computer** or **Ongoing** for every trigger).

## Practical Example: Displaying a Notice with `jamfHelper`

`jamfHelper` is a powerful notification tool built into Jamf, located at `/Library/Application Support/Jamf/bin/jamfHelper.app`.

```bash
#!/bin/bash

# Define variables

HELPER="/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper"

TITLE="School IT Department Announcement"

HEADING="Software Update Notification"

DESC="Your computer will undergo a security update in 10 minutes. Please save your work and connect to power."

# Execute window

"$HELPER" -windowType utility -title "$TITLE" -heading "$HEADING" -description "$DESC" -button1 "I understand" -defaultButton 1

```

## Practical Advice & Expert Tips:

- **Permissions**: Scripts run by Jamf Pro default to **Root** status. Always test on a pilot device to avoid accidental deletion of critical system files.
- **Running as User**: To run a command as the currently logged-in user (e.g., to modify their Dock), use: `sudo -u $(stat -f%Su /dev/console) command`.

---

## File: mac-10.md

---

id: mac-10

title: "Default Jamf Pro inventory lacks specific info (like file versions or last reboot). How do I collect custom data?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Extension Attributes", "Scripts", "Inventory", "Custom Fields"]

**Use the "Computer Extension Attributes" feature. This is the core tool in Jamf Pro for expanding database fields and collecting non-standard hardware/software information.**

While standard inventory includes specs, OS versions, and app lists, specific needs (such as checking if a config file was tampered with, battery cycle counts, or custom asset tags) require Extension Attributes.

## 2026 Model: DDM Status Channel

In addition to traditional inventory updates, macOS 26 recommends using the DDM Status Channel:

- **Real-time**: When a state changes (e.g., CPU load, disk space, FileVault status), the device actively reports to Jamf Pro rather than waiting for the next scheduled scan.

- **Low Load**: Only changed fields are reported, significantly reducing server overhead.
- **Recommendation**: For fields where accuracy is critical (e.g., whether security software is running), prioritize the DDM Status Channel.

## Setup Steps (SOP):

### 1. Navigate

Go to **Settings > Computer Management > Extension Attributes**.

### 2. Add

Click **+ New**.

### 3. Configure

- **Display Name**: e.g., "Last Reboot Time".
- **Input Type**: Select **Script**.
- **Data Type**: String, Integer, or Date. This affects Smart Group logic (e.g., "greater than/less than" vs. "contains").

### 4. Write Script

- Paste your Shell Script in the editor.
- **Crucial Syntax**: Jamf Pro only reads values enclosed in `<result>` and `</result>` tags. Any other `echo` output will only appear in debug logs and won't be written to the database.

## Practical Example: Collecting "System Uptime Days"

```bash
#!/bin/bash

# Get system uptime days and report to Jamf Pro

# Uses awk to grab the 'days' part of the uptime command output

days=$(uptime | awk '{ print $3 }')

echo "<result>$days</result>"

```

## Advanced Application Scenarios:

- **Compliance Check**: Use a script to check if a security daemon (like CrowdStrike or SentinelOne) is running. If it returns "Stopped," the computer can automatically fall into a "Non-Compliant Group" and trigger a remediation policy.
- **Administrative Management**: Set Input Type to **Pop-up Menu** for fields like "Department" (e.g., Academic, Administrative, IT). This allows admins to manually assign units during device issuance for easier group management.

## Practical Advice: Expert Tips

- **Execution Performance**: Extension Attribute scripts run during **every** inventory update. Avoid time-consuming scripts (like `find /` scanning the whole drive), as they can slow down inventory reporting across the school or cause system lag.

---

## File: mac-11.md

---

id: mac-11

title: "Why does my Mac show 'Unidentified Developer' or 'Cannot be opened' when installing software?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Gatekeeper", "Security", "Notarization", "Software Installation"]

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

---

## File: mac-12.md

---

id: mac-12

title: "How do I prevent students from entering Recovery Mode to format the computer?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Tamper Proofing", "Recovery Lock", "Firmware Password", "Security"]

**The protection mechanism differs depending on the Mac architecture: Intel-based Macs require a 'Firmware Password,' while Apple Silicon (M-series) Macs require a 'Recovery Lock.' Both can be deployed via Jamf Pro.**

Recovery Mode is powerful. If left unprotected, anyone with physical access can "Erase Disk" or "Reinstall OS" to bypass school management.

## Comparison of Mechanisms:

| Architecture              | Protection Mechanism  | Deployment Method                                   |
| :------------------------ | :-------------------- | :-------------------------------------------------- |
| **Apple Silicon (M1-M5)** | **Recovery Lock**     | Configured via **MDM Remote Command** only          |
| **Intel Mac**             | **Firmware Password** | Configured via **Configuration Profile** or Command |

### 1. Recovery Lock (For Apple Silicon)

Starting with macOS 11.5, MDM can set a Recovery Lock. When enabled, the Mac will prompt for the administrator-defined password before allowing entry into Recovery Mode.

- **Jamf Pro Action**: Select a computer > **Management > Remote Commands > Set Recovery Lock**.

- **Management Note**: Jamf Pro will escrow the password so you can retrieve it later from the inventory record.

### 2. Firmware Password (For Intel Macs)

This prevents the Mac from booting from anything other than the designated startup disk without a password.

- **Jamf Pro Action**: Create a **Computer Configuration Profile** with the **EFI Password** payload.

## Practical Advice:

Setting these locks is a fundamental security requirement for shared labs or student 1:1 laptops. Without them, "Remote Management" can be circumvented via a hard reset and disk wipe in the Recovery environment.

---

## File: mac-13.md

---

id: mac-13

title: "Google Meet or Zoom keeps asking for 'Screen Recording' permissions. Can MDM enable this automatically?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["PPPC", "Privacy", "TCC", "Screen Recording", "Standard Users"]

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

---

## File: mac-14.md

---

id: mac-14

title: "How do I deploy multiple network printers to teacher Macs using Jamf Pro?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Printers", "AirPrint", "lpadmin", "Policy", "Self Service"]

**Modern Mac printing should prioritize the 'AirPrint (driverless)' protocol. For advanced configurations, use 'Policies' or Shell scripts executing the `lpadmin` command.**

Since macOS 12 Monterey, Apple has shifted towards IPP/AirPrint, significantly reducing the need for vendor-specific PPD drivers.

## Deployment Strategies:

### Method 1: Native Jamf Pro UI (Best for Beginners)

1. **Add Printer**: Go to **Settings > Computer Management > Printers**.
2. Enter the IP and Display Name.
3. **Key**: If the printer supports AirPrint, select **Generic PCL Laser Printer** or **Generic PostScript Printer**. No vendor driver is needed.
4. **Policy**: Create a policy to install this printer. Set the trigger to **Self Service** so teachers can install only the printers they need for their specific office.

### Method 2: Shell Script (Advanced / Driverless)

For precise control, use a script to call `lpadmin`:

```bash
#!/bin/bash

# Define Variables

PRINTER_NAME="Office_HP_M404"

DISPLAY_NAME="Admin Office HP M404"

ADDRESS="ipp://192.168.1.100/ipp/print"

# Execute lpadmin with -m everywhere for auto-AirPrint

/usr/sbin/lpadmin -p "$PRINTER_NAME" -D "$DISPLAY_NAME" -E -v "$ADDRESS" -m everywhere -o printer-is-shared=false

echo "Printer $DISPLAY_NAME installed successfully."

```

### Method 3: Handling Older Printers (Driver Required)

1. Download the vendor `.pkg` and upload it to Jamf Pro.
2. Create a policy to install the `.pkg` first.
3. Use `lpadmin` with the specific PPD path (e.g., `-P "/Library/Printers/PPDs/Contents/Resources/HP.gz"`).

## Practical Advice:

**Use Self Service**. Deploying dozens of printers automatically creates a cluttered menu for teachers. By placing printers in Self Service with clear names (e.g., "Install - 2F Staff Room Printer"), you minimize confusion and support calls.

---

## File: mac-15.md

---

id: mac-15

title: "How do I mass-deploy Microsoft Office and activate licenses? Lab vs. Administrative Macs?"

category: "Section 7: Advanced Mac Management"

important: false

tags:
[
"Office",

    "Microsoft 365",

    "Serializer",

    "Volume License",

    "Jamf App Installers",

## ]

**The best practice is to use 'Jamf App Installers' for automated deployment, combined with either the 'Volume License Serializer' or 'User-based Login' depending on the scenario.**

Always use the Microsoft CDNs or Jamf-provided installers. **Avoid the Mac App Store versions**, as they do not support Volume Licensing (VL) features correctly for all scenarios.

## Scenario 1: Computer Labs / Shared Kiosks (Device-Based)

Labs must be "ready-to-use" without requiring individual student logins for Office.

1. **Installer**: Deploy Office 365 via Jamf Pro **App Installers**.

2. **Activation (Crucial)**: Download the **Volume License Serializer (.pkg)** from the Microsoft VLSC.
3. **Policy**: Create a Jamf Pro policy to install this Serializer.
4. **Result**: Office will activate against "the machine" itself. Any user can open Word and begin working immediately without a prompt.

## Scenario 2: Faculty / Staff Macs (User-Based)

Staff typically have individual Microsoft 365 (A3/A5) accounts.

1. **Installer**: Deploy via **App Installers** to keep software updated automatically.

2. **Activation**: Do **not** deploy the Serializer. The user simply signs in with their school email when they first open the app.
3. **Benefit**: Enables personal cloud storage (OneDrive) and document syncing.

## Practical Advice:

If you encounter license conflicts, it’s usually because of residual older Serializers. Use the official **Microsoft License Removal Tool** (run as a script via Jamf) to clean the machine before a fresh deployment.

---

## File: mac-16.md

---

id: mac-16

title: "How do I manage or disable 'iPhone Mirroring' in macOS Sequoia?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["macOS 15", "iPhone Mirroring", "Privacy", "Restrictions", "DLP"]

**While convenient, 'iPhone Mirroring' in macOS 15+ poses Data Loss Prevention (DLP) risks on shared school computers. It should be managed via MDM.**

## The Privacy Risk:

When a personal iPhone is mirrored to a school Mac, notifications, photos, and app content are visible on the Mac screen. It also supports file drag-and-drop, which could lead to unauthorized data transfer.

## Jamf Pro Configuration:

1. Go to **Computers > Configuration Profiles > Restrictions**.
2. Navigate to the macOS 26 (Tahoe) section.
3. **Option A (Full Block)**: Uncheck **Allow iPhone Mirroring**.
4. **Option B (Granular)**: Use the **View Only** mode or uncheck **Allow file and clipboard sync**.

## Result:

Once applied, the iPhone Mirroring app on the Mac will display a "Disabled by Administrator" message when launched. We recommend disabling this in computer labs while potentially allowing it on assigned teacher laptops with restrictions on file sync.

---

## File: mac-17.md

---

id: mac-17

title: "What are the advantages of using the Mac mini (M4/M5) for school labs?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Mac mini", "M4", "Lab Setup", "Zero-Touch", "ADE"]

**The Mac mini (M4/M5), paired with macOS 26, offers 'Zero-Touch Deployment' and extreme energy efficiency, making it the ideal PC replacement for modern schools.**

## Why Administrators Choose Mac mini:

### 1. Zero-Wipe Migration

- **Traditional PC**: Requires "Ghosting" or heavy image deployment via network.
- **Mac mini (M5)**: Supports **Zero-Wipe MDM Migration** in macOS 26. This means if you change MDM providers, you can migrate the machine's ownership "in place" without wiping the drive or reinstalling educational software.
- **ADE Automation**: Unbox, plug in, and the machine automatically installs Office, Adobe, and network settings based on its serial number.
- **Reset**: Execute an EACS command to reset to factory state in minutes.

### 2. Space and Energy Efficiency

- The M4/M5 Mac mini has a tiny footprint (approx. 12.7cm wide) and can be mounted behind monitors.
- Its power consumption is significantly lower than a traditional PC, reducing long-term school electricity costs.

### 3. Local AI Readiness

- The M4/M5 chips feature a powerful Neural Engine (NPU), capable of running local AI models and 4K video editing without relying on cloud credits, perfectly aligning with modern digital curricula.

---

## File: mac-18.md

---

id: mac-18

title: "A Mac is locked by a former user's Apple ID (Activation Lock). How do I recover it?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Activation Lock", "ASM", "Unlocking", "Asset Recovery"]

**If the Mac is a school asset (enrolled in ASM), administrators can bypass Activation Lock directly from the Apple School Manager portal without the original user's password.**

This is a critical failsafe for when staff leave or students graduate without signing out of their personal accounts.

## Standard Recovery SOP:

1. **Log in to ASM**: Use your administrator account at [school.apple.com](https://school.apple.com).
2. **Search Device**: Click **Devices** in the sidebar and enter the Mac's serial number.
3. **Execute Unlock**:
   - Locate the **Activation Lock** status in the details pane.
   - Click **Turn Off** or **Clear Unlock Code**.

4. **Reset Device**:
   - Wait a few minutes for the command to propagate.
   - Put the Mac into **Recovery Mode** and reinstall macOS. The lock screen will no longer appear.

## Prerequisites:

- The device must be part of your **Automated Device Enrollment (ADE)** pool and assigned to your MDM.
- For older machines purchased outside the project, they must have been added to ASM via Apple Configurator for this feature to work.

---

## File: mac-19.md

---

id: mac-19

title: "2026 macOS Deployment: Advanced strategies for large-scale enrollment."

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Deployment", "ADE", "Offline Install", "Content Caching", "macOS 26"]

**In 2026, Zero-Touch deployment via ADE is the enterprise standard. However, the bottleneck for high-volume rollouts (like a 50-unit Mac mini lab) remains network bandwidth and MDM server load.**

## I. Core Strategies for 2026

### 1. Content Caching Server

This is the lifeblood of mass deployment.

- **Implementation**: Dedicate one Mac mini (M5) to this role for each computer lab or department building.

- **Benefit**: When the first Mac downloads Office or a macOS update, the other 49 units will pull it locally from the cache at near-instant speeds, protecting your school's external internet pipe.

### 2. Declarative Enrollment (DDM)

macOS 26 supports a more resilient enrollment engine.

- **Feature**: Instead of waiting for the server to push commands, the device "declares" its target state the moment it joins.

- **Result**: This improves software install success rates by approx. 30% especially on campus Wi-Fi environments.

## II. Offline Installation and Special Environments

For schools with unstable internet, use a hybrid strategy:

1. **PKG Pre-load Strategy**: Use an external high-speed SSD to pre-load large offline packages (like Adobe CC). Use a post-enrollment script to call `/usr/sbin/installer` locally from the internal drive to finish the setup quickly.

2. **IP Signal Staggering**: Stagger the deployment volume into different time slots, utilizing Jamf Pro's "Staggered execution" features if available.

## III. 2026 NPU Considerations

The **M4/M5** chips feature powerful Neural Engines. During your initial deployment, ensure you aren't over-restricting background tasks, as macOS uses this time to initialize local AI models (for Writing Tools and Siri). Allowing this process to finish during setup ensures students have a smooth "Day One" experience.

---

## File: mac-20.md

---

id: mac-20

title: "How do I configure 'Unlock FileVault via SSH' in macOS 26?"

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["FileVault", "SSH", "Remote Unlock", "macOS 26", "Remote Management"]

**macOS 26 introduces the ability to unlock FileVault at the 'Pre-boot' stage via SSH, solving a major pain point for headless server management.**

## Problem Background

Historically, a Mac with FileVault enabled would stop at the login screen after a reboot, before the network or remote access services started. This required physical keyboard access to unlock and "lost" the machine to remote admins.

## Requirements

1. **Remote Login**: Must be enabled in System Settings > General > Sharing. (Or pushed via MDM `com.apple.RemoteManagement`).
2. **Network**: A hardwired Ethernet connection is most reliable for Pre-boot networking.
3. **Authorization**: The SSH user must be a FileVault-enabled user.
4. **OS**: macOS 26 or later.

## Remote Unlock Command

From a remote terminal:

`SSH -o PreferredAuthentications=password -o PubkeyAuthentication=no username@mac-ip`

After entering the password, the SSH session will momentarily drop as the encryption keys are released and the system finishes its boot sequence.

## Security Risks & Mitigation

| Risk              | Mitigation Measure                                                   |
| :---------------- | :------------------------------------------------------------------- |
| Brute Force       | Limit source IP, use firewall, strong passwords, change default port |
| Man-in-the-Middle | Verify host keys, use VPN                                            |
| Network Sniffing  | Dedicated management VLAN, Network Access Control (NAC)              |

## 2026 Safety Warning (M5 Macs)

On **M5 Silicon** Macs, Apple has tightened **Secure Enclave** protections.

- If you have enabled "Lockdown Mode" or "Advanced Data Protection," the Pre-boot SSH stack may be crippled for safety.

- **Recommendation**: For server-room units requiring remote telemetry, ensure these high-restriction security toggles are managed carefully via MDM to allow the network stack to initialize.

## Deployment Advice

- **Recommended**: Server-room Mac minis, headless units, and multi-campus environments.
- **Not Recommended**: Student labs, public kiosks, or unsecured network segments.

---

## File: mac-21.md

---

id: mac-21

title: "macOS 26 Transparency: Students can see MDM privacy settings. How do I handle questions?"

category: "Section 7: Advanced Mac Management"

important: false

tags:
["Privacy Permissions", "Transparency", "PPPC", "macOS 26", "Communication"]

---

**macOS 26 explicitly labels privacy permissions (Camera, Mic, Screen Recording) that are managed by the organization in System Settings.**

## Interface Changes

### Pre-macOS 26 (Before macOS 15 Sequoia)

- Users saw toggles as grayed out but often didn't know _why_.
- Permission switches were simply locked without explanation.

### macOS 26

- Displays a badge: **"Managed by [Organization Name]"**.
- Displays management icons.
- Users can see what has been authorized but still cannot change it, but now they know it is set by the school.

## Common Questions and Response Angles

### "Why is the Microphone forced ON?"

- Response: This ensures apps like Zoom, Google Meet, or recording software for language classes work instantly.
- Having the permission does not mean it is "Recording"—macOS still shows a hardware-level **Orange Light** whenever the mic is active (this cannot be bypassed by software).

### "Is Screen Recording for monitoring me?"

- Response: This allows students to share their screen during presentations or remote lab sessions.
- Having the permission allows the app to share; it does not mean continuous monitoring.
- macOS displays a **Green indicator** when the screen is being shared or recorded.

### "Why can't I turn it OFF?"

- Response: Managing these via MDM ensures that critical educational tools don't fail due to a student accidentally clicking "Deny."
- This reduces the support burden of repeatedly troubleshooting permission prompts.

## Practical Advice:

### Preparation

- List the permissions the school has set and explain the purpose of each.
- Prepare an FAQ for students/staff.
- Explain that this is a new design feature of macOS 26, not a new monitoring initiative.

### Response Principles

- Acknowledge that privacy concerns are valid.
- Explain the pedagogical necessity of each permission.
- Emphasize macOS's built-in protections (hardware indicators, notifications).

---

## File: mac-22.md

---

id: mac-22

title: "macOS 26: The end of the Intel Mac era. How much longer can Intel Macs be used?"

category: "Section 7: Advanced Mac Management"

important: true

tags:
[
"Intel Mac",

    "Apple Silicon",

    "System Support",

    "macOS 26",

    "Lifecycle Planning",

## ]

**macOS 26 (Tahoe) has been confirmed as the final major version of macOS to support Intel-based Macs. Starting with macOS 27 in 2027, the operating system will exclusively support Apple Silicon (M1–M5 series).**

## Support Roadmap and Retirement Timeline

### 1. The Last Supported Intel Macs

- **iMac (Retina 5K, 27-inch, 2020)**: The peak of Intel Mac performance.
- **MacBook Pro (16-inch, 2019)**.
- **Mac Pro (2019+)**.
- **Note**: Older models (2017 and prior) are already unsupported by modern macOS versions and can only run older system versions.

### 2. macOS 27 (Expected Late 2026/2027)

- Exclusively supports Apple Silicon (M1/M2/M3/M4/M5).
- Intel Macs will be unable to upgrade.

## Lifecycle Expectations

### 1. Security Updates

- After macOS 26 stops receiving major feature updates, Apple typically provides **2-3 additional years of Security Updates**.
- We expect Intel Macs on macOS 26 to be safe for school use until approximately **late 2028 or early 2029**.

### 2. App Support

- Major developers (Adobe, Microsoft, Google) usually support the current OS plus two versions back.
- Once security updates for macOS 26 cease, these vendors will likely stop releasing Intel-compatible versions or updates.

## Assessing Existing Intel Macs

### 1. Audit via MDM

Use Jamf Pro to identify all Intel-based Macs:

- Create a **Smart Computer Group**.

- Criteria: `Architecture Type` is `x86_64`.

### 2. Impact assessment by Scenario

| Scenario                 | Impact Assessment                                                               |
| :----------------------- | :------------------------------------------------------------------------------ |
| **Professional Labs**    | Software vendors may gradually phase out Intel support.                         |
| **Administrative Tasks** | Office and browsers have lower requirements; usable until security updates end. |
| **Teacher Laptops**      | Depends on specific software requirements.                                      |

## Timeline Summary

- **2026–2027**: Intel Macs running macOS 26 remain fully functional with security patches.
- **2027–2028**: Third-party software support begins to dwindle.
- **2029+**: Security updates end; devices should be replaced or used for non-networked tasks.

## Why Apple Silicon?

- M1-M5 series offer revolutionary performance and battery life over Intel.
- macOS and core apps are optimized for the Apple Silicon architecture.
- Native support for running iOS/iPadOS apps.

---

## File: mac-23.md

---

id: mac-23

title: "Classroom Order: How to manage or disable 'iPhone Mirroring' to prevent student distractions."

category: "Section 7: Advanced Mac Management"

important: false

tags:
[
"iPhone Mirroring",

    "Classroom Management",

    "Restrictions",

    "macOS 26",

    "Security",

## ]

**macOS 26 provides granular MDM controls for 'iPhone Mirroring.' IT coordinators can set different permission levels for 'Shared Lab Macs' versus 'Teacher Presentation Macs.'**

In a school environment, the primary concern is a student operating a shared Mac and mirroring their personal iPhone's social messages or inappropriate game content, disrupting the class.

## I. 2026 Management Modes (SOP)

Using Jamf Pro's **Restrictions** payload, you should apply one of these three strategies based on the machine's Smart Group:

1. **Full Disable (High Security labs)**:
   - **Best For**: Library open-access Macs, Computer Labs.
   - **Setting**: Uncheck `Allow iPhone Mirroring`.
   - **Effect**: If a student tries to pair their iPhone, they will see a message: "This feature is disabled by your organization."

2. **Forced View-Only (Presentation Focus)**:
   - **Best For**: Classroom podium Macs used by teachers for projection.
   - **Setting**: Enable `Force View-Only Mirroring`.
   - **Effect**: The iPhone screen can be displayed on the Mac (perfect for demonstrating a student's mobile project), but the teacher's Mac keyboard and mouse cannot control the iPhone.

3. **Restricted Data Transfer (DLP Focus)**:
   - **Best For**: Faculty/Staff administrative computers.
   - **Setting**: Disable `Allow File and Clipboard Sync with iPhone Mirroring`.
   - **Effect**: Personal iPhone mirroring is allowed, but the ability to drag-and-drop files between the school Mac and the personal iPhone is blocked to prevent data leakage of school records.

## II. Operational Recommendations

- **Automation Strategy**: Consider using Jamf Pro's "Time-Based" policies to switch to "View Only" during instructional hours and allow full mirroring after school.
- **Monitoring Indicators**: Remind teachers and students that when iPhone Mirroring is active, macOS 26 shows a prominent purple bar in the menu bar, making it easy for teachers to spot during classroom rounds.

**Administrator's Insight**: For M5 Macs, the mirroring latency is extremely low. We recommend using "View Only" mode as a tool for "Student Work Showcase" rather than outright blocking it, to maximize the value of teaching technology.

---

## File: mac-24.md

---

id: mac-24

title: "Exam Security: Managing Safari 'Distraction Control' to prevent cheating during web-based tests."

category: "Section 7: Advanced Mac Management"

important: true

tags:
["Safari", "Distraction Control", "Exam Security", "macOS 26", "Proctoring"]

---

**Safari in macOS 26 introduces 'Distraction Control,' which allows users to hide specific web elements (like ads or sidebars). However, in a Computer-Based Testing (CBT) environment, students could abuse this to hide timers, navigation menus, or proctoring warnings.**

## I. Risk Scenarios

- **Practice Mode**: Students hide "Hints" or "Rules."
- **Official Testing**: Students hide the "Remaining Time (Countdown)" to claim they didn't know the exam was ending, or hide the "Proctoring Status Label."

## II. MDM Management Solutions (SOP)

IT coordinators should enforce the following settings via Jamf Pro during major exams:

### 1. Lock via Configuration Profile (Recommended)

- **Domain**: `com.apple.Safari` advanced settings.
- **Setting**: `AllowDistractionControl` = `false`
- **Effect**: The "Distraction Control" option in the Safari menu will be grayed out and unavailable, ensuring the website UI remains exactly as intended by the test publisher.

### 2. Assessment Mode (AAC)

For high-stakes exams, use a specialized testing app or a managed browser that invokes Apple's **'Automatic Assessment Configuration (AAC).'**

- This mode forces the device into a secure workspace, automatically disabling non-essential features including Distraction Control, Siri, notifications, and multitasking.

## III. Operational Advice

1. **Smart Group Segmentation**: Create a "Testing Mode" group and push the restriction profile only 15 minutes before the exam begins.
2. **Script Verification**: Use an Extension Attribute to verify that the Safari `DistractionControl` override is successfully active before the exam starts.

**Administrator's Insight**: While "Distraction Control" improves daily reading efficiency, it represents a significant loophole for proctoring in school assessment scenarios. We recommend evaluating it alongside the "Safari Translation" feature for potential disabling during tests.

---

## File: mac-25.md

---

id: mac-25

title: "Security Auditing: Using PSSO 2.0 to achieve 'Boot-to-Desktop' and meet strong password requirements."

category: "Section 7: Advanced Mac Management"

important: false

tags:
[
"Platform SSO",

    "Passwordless",

    "Security Standards",

    "MOE Requirements",

    "Authentication",

## ]

**In 2026, Platform SSO (PSSO) 2.0 allows schools to solve two major operational problems: weak teacher passwords and the 'double login' (FileVault + OS) frustration.** By synchronizing the local Mac login with organizational cloud accounts (Microsoft Entra ID or Google Workspace), you can enforce compliant strong password policies while providing a streamlined single-entry experience for the user.

## I. Implementation Workflow (SOP)

1. **Configure PSSO in MDM**:
   - Set up the Platform SSO configuration in Jamf Pro.
   - Select the authentication mode: **'Shared Secret'** (standard) or **'Hardware Bound Key'** (highest security using the Secure Enclave).

2. **Enable Boot-to-Desktop**:
   - Enable **'FileVault Login & PSSO Synchronization.'**
   - **Result**: When the teacher enters their password at the initial FileVault disk-unlock screen, the system automatically uses those credentials to complete the cloud authentication in the background. The Mac loads straight to the desktop without asking for a second password.

3. **Enforce Strong Policies via IdP**:
   - Password strength (length, complexity, rotation) is managed centrally by your Cloud Identity Provider (IdP).
   - **Benefit**: The school IT lead no longer needs to manually audit every Mac’s local password. As long as the IdP authentication is successful, the device is automatically compliant with national cybersecurity audit standards.

## II. Frequently Asked Questions

- **Can users log in while offline?**
  - Yes. PSSO maintains a local cached credential to ensure teachers can still teach in areas with poor connectivity or while at home.

- **If a teacher changes their password in the cloud, does it update on the Mac?**
  - Yes. On the next login, the Mac will detect the mismatch, prompt the user to enter their new cloud password, and immediately synchronize the local account.

## III. Operational Recommendations

1. **Phased Rollout**: We recommend starting with "Administrative Offices" before expanding to "General Teacher Laptops."
2. **MDM Monitoring**: Utilize Jamf's DDM Status Channel to monitor each Mac's PSSO sync status and ensure they remain `Healthy`.

**Administrator's Insight**: PSSO is the most important "Quality of Life" improvement for Mac management in 2026. It satisfies both the strict "Security Compliance" requirements of the education department and the "User Convenience" demands of the teaching staff.

---

## File: mac-26.md

---

id: mac-26

title: "Mixed Fleet Management: Using Smart Groups to distinguish between Intel and Apple Silicon software packages."

category: "Section 7: Advanced Mac Management"

important: false

tags:
[
"Hybrid Environment",

    "Intel Mac",

    "Apple Silicon",

    "Smart Group",

    "Deployment Strategy",

## ]

**2026 is the sunset year for Intel Macs. Most schools have a hybrid environment containing both 'x86_64 (Intel)' and 'arm 64 (M1–M5)' architectures. Assigning the wrong software package can lead to non-functional apps or system instability.**

## I. Creating Precise Smart Groups (SOP)

IT coordinators should establish these baseline groups in Jamf Pro for accurate deployment:

### 1. Apple Silicon Group (Primary)

- **Criteria**: `Architecture Type`
- **Operator**: `is`
- **Value**: `arm 64` (or `Apple Silicon`)

### 2. Intel Mac Group (Legacy)

- **Criteria**: `Architecture Type`
- **Operator**: `is`
- **Value**: `x86_64`

### 3. Rosetta 2 Status Group

- Create a group for "Apple Silicon Macs MISSING Rosetta 2" to automatically trigger the installation of the Rosetta translation environment if you still rely on legacy Intel apps.

## II. Recommended Deployment Strategy

1. **Prioritize Universal Binaries**: If a developer provides a Universal installer (e.g., Google Chrome or Microsoft Office), use it. macOS will automatically run the correct architecture.
2. **Architecture-Specific .pkgs**:
   - For professional software (Adobe Creative Cloud, specialized lab tools), upload separate packages: `App_v1.0_AppleSilicon.pkg` and `App_v1.0_Intel.pkg`.
   - Scope the former to the Apple Silicon group and the latter to the Intel group.

3. **App Store Apps (VPP)**: This is the most efficient method. Apple’s servers automatically detect the client architecture and download the optimized version. Use VPP whenever possible.

## III. Operational Advice

- **System Updates**: macOS 26 handles updates differently for each architecture. Always use **Declarative Device Management (DDM)** for OS updates; the system will autonomously verify and install the correct update files without manual intervention.
- **Asset Tagging**: Add an "Expiring Support 2028" tag to your Intel Smart Group. This helps in visually tracking budget requirements for the final phase-out of the Intel fleet.

**Administrator's Insight**: The key to managing a mixed environment is "precise grouping." Once your Smart Groups are set, subsequent software deployment becomes error-proof, and it allows for a more scientific understanding of your school's hardware health.

---

## File: mac-27.md

---

id: mac-27

title: "Automated Maintenance: Using macOS 26 DDM for 'Smart Energy Management' (Eco-friendly vs. Scheduled Updates)."

category: "Section 7: Advanced Mac Management"

important: false

## tags: ["Energy Policy", "DDM", "Auto-Update", "Power Management", "macOS 26"]

**In the past, school IT wanted computers ON for updates, while the facility manager wanted them OFF to save electricity. macOS 26 and DDM provide a perfect automated balance.**

## I. DDM Power Configuration Strategy (SOP)

Using macOS 26 **System Configurations**, you can set the following intelligent logic:

1. **Dynamic Sleep Schedule**:
   - **School Hours**: Set a 20-minute idle-to-sleep timer for immediate student access.
   - **Night Mode**: After 6:00 PM, transition to a deep sleep state (Power Nap).

2. **Update-Initiated Wake**:
   - **Configuration**: Enable `Allow Wake for Managed Activity` in the DDM payload.
   - **Effect**: Even if the Mac is asleep, when Jamf Pro pushes a **Security Response (RSR)** or a **DDM Software Declaration**, the Mac will briefly "wake," complete the background installation, and return to deep sleep once the task is reported as successful.

3. **Energy Auditing (Status Channel)**:
   - You can monitor "Battery Cycle Counts" or "Up-time in High Performance Mode" via the DDM Status Channel to use as quantitative data for future hardware replacement cycles.

## II. Operational Recommendations

- **Avoid Hard Power Cuts**: Discourage the facility team from cutting the main circuit to the lab at night. This prevents M4/M5 Macs from performing essential background maintenance tasks like AI indexing, Spotlight optimization, and system cache cleaning.
- **Nudge Integration**: If an update requires a restart, use a **Nudge** notification to ask the teacher to "Restart Now" the next morning, rather than forcing a midnight reboot that could cause loss of unsaved teaching materials.

## III. Real-World Case Study

A school with 100 M5 Mac minis configured a "2:00 AM Power Nap" DDM window. These machines check for updates and security patches nightly. The average electricity cost increase per machine was less than $0.20 per month, yet 100% of the fleet remained on the latest secure version without a single man-hour of IT labor.

**Administrator's Insight**: Declaring your energy policy via DDM allows the library and labs to be "Smarter, not just off," solving the long-standing conflict between IT maintenance and school energy savings.

---

## File: mac-28.md

---

id: mac-28

title: "First-Aid: What to do if Mac Enrollment hangs after a 'Wipe All Content and Settings' (EACS) reset."

category: "Section 7: Advanced Mac Management"

important: true

tags:
[
"EACS",

    "ADE Troubleshooting",

    "Network Auth",

    "Terminal Commands",

    "Recovery Mode",

## ]

**While 'Erase All Content and Settings (EACS)' is highly stable, school environments with captive-portal Wi-Fi or strict firewalls can cause the Mac to hang at the 'Remote Management' enrollment screen.**

## I. Initial Diagnosis: Why is it hanging?

1. **Time Sync (Most Common)**: If the Mac's system time differs significantly from the Apple servers, SSL certificate validation will fail.
2. **Network Restrictions**: The school Wi-Fi requires a certificate that hasn't been deployed yet, or the firewall is blocking port 443 to `*apple.com`.
3. **ASM Assignment**: The serial number in Apple School Manager has not been properly assigned to the target MDM server.

## II. Recovery Techniques (SOP)

### Technique 1: Force System Time Sync (Terminal)

At the Setup Assistant screen, press **Command + Option + T** to open the Terminal (or access it from the Utilities menu):

```bash

# Sync with Apple's time server

sntp -sS time.apple.com

# OR set manually (Format: MMDDhhmmYY)

date 0115100026

```

### Technique 2: Manually Trigger the Cloud Query

Run the following command to force the Mac to ask Apple, "Who is my manager?":

```bash

sudo profiles renew -type enrollment

```

### Technique 3: The iPhone Hotspot Bypass

If the school firewall is the bottleneck, connect the Mac to an administrator's **iPhone Hotspot**. This bypasses campus network restrictions and allows the small "Enrollment" packet to reach the server. Once the Mac reaches the desktop, the MDM policies will take over and switch the Wi-Fi back to the school network.

## III. Advanced Offline Recovery

If EACS fails completely to trigger, enter **Recovery Mode**:

1. **Apple Silicon (M1–M5)**: Hold the Power button until "Loading startup options" appears.

2. **Intel Mac (T2)**: Hold `Command + R` during startup.
3. **Action**: Select "Erase Mac" from the Recovery menu. This forces a complete reset of the Secure Enclave and all hardware-bound security keys, allowing for a fresh start.

**Administrator's Insight**: Don't panic when a batch of Macs hangs during enrollment. 90% of failures are solved by simply "Syncing the Time" or "Changing the Hotspot." We recommend IT leads keep a USB drive with a list of required Apple domains/ports to assist the networking team in troubleshooting.

---

## File: mac-29.md

---

id: mac-29

title: "How to push system updates (iOS/iPadOS/macOS) via Jamf Pro?"

category: "Section 1: Hardware & OS Updates"

important: true

tags:
[
"System Updates",

    "Jamf Pro",

    "DDM",

    "Software Update Blueprints",

    "iOS Update",

    "macOS Update",

## ]

**By 2026, software update management in Jamf Pro has fully transitioned to the "Declarative Device Management (DDM)" framework.** This approach is more stable than legacy remote commands and allows devices to autonomously handle the download and installation process, significantly reducing server load.

## 1. Using "Software Update Blueprints"

This is the recommended and most professional method:

1. Navigate to **`Settings` > `Device Management` > `Software Update Blueprints`**.

2. Click `New` and set the target version (e.g., iOS 26.x or macOS 26 Tahoe).
3. **Key Setting: Enforcement Deadline**:
   - Set a specific date and time (e.g., Three days from now at 5:00 PM).
   - Before the deadline, users will receive gentle system notifications.
   - **Once the deadline is reached, the device will ignore the user's state, force a restart, and install the update.**

4. Assign this blueprint to the target device group.

## 2. Using Mass Actions for Remote Commands (Legacy Way)

If you need to send an update immediately to a specific set of search results:

1. On the search results page for `Mobile Devices` or `Computers`, click **`Action`** at the bottom right.

2. Choose **`Send Remote Commands`**.
3. Select **"Update OS version on supervised devices"** from the list.
4. On the **"Update OS Options"** page, choose your desired settings:
   - **Target Version**: Recommended to select "Latest version based on device eligibility."
   - **Action**:
     - **Download the update for users to install**: The device will pre-download the files, and students can install them at their convenience.
     - **Download and install the update, and restart devices after installation**: This forces the update immediately; ideal for scheduling after school hours.

## 3. Management Highlights for 2026: macOS 26 Tahoe and Intel Macs

- **Legacy Support**: macOS 26 is the final version to support Intel-based Macs. For these older devices, allow double the download time and ensure the **Bootstrap Token** is correctly escrowed.
- **DDM Autonomy**: In the latest systems, devices use DDM declarations to automatically perform updates when connected to power and idle (e.g., overnight), with much higher success rates than traditional push commands.

## Best Practices:

1. **Avoid Exam Weeks**: While updates can be enforced, avoid doing so during exam periods or presentations to prevent devices from entering the 15–30 minute update screen unexpectedly.
2. **Power Confirmation**: Remind students to plug in their iPad/Mac overnight when an update is scheduled. Constant power is the most critical factor for a successful update.
