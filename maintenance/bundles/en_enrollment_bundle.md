---
File: enr-1.md
---

---

id: enr-1

title: "My new iPad didn't show the 'Remote Management' screen during setup. How do I fix this?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["ADE", "ASM", "Enrollment Failure", "Automated Device Enrollment"]

**If your iPad goes straight to the standard personal setup screens instead of the school's "Remote Management" prompt, it usually means the device serial number hasn't been linked to your MDM server by Apple.**

This automated process—known as **Automated Device Enrollment (ADE)**—relies on the device "checking in" with Apple's servers the moment it connects to Wi-Fi. If no assignment is found, Apple treats it as a private retail device.

## Troubleshooting Steps:

1. **Verify Status in Apple School Manager (ASM)**:
   - Log in to [school.apple.com](https://school.apple.com).
   - Search for the serial number under **"Devices."**
   - Check the **"MDM Server"** field. If it’s blank, you need to manually assign it to your Jamf Pro server.

2. **Check with your Reseller**:
   - If the serial number is not found in ASM at all, your authorized Apple reseller hasn't uploaded the purchase record yet. Large orders during the back-to-school season can occasionally cause a delay of a few business days. Contact your vendor with the Purchase Order (PO) number to expedite the sync.

3. **Audit Jamf Pro PreStage Scope**:
   - Ensure the device is included in the **"Scope"** of your active PreStage Enrollment profile in Jamf Pro. We recommend setting your primary PreStage as the **"Default"** so new assignments are captured automatically.

4. **Network Requirements**:
   - The device must be on a Wi-Fi network that allows traffic to Apple’s activation servers (and doesn't block APNs) to trigger the setup.

## How to Relink the Device:

If the device has already reached the Home Screen (skipping management):

- **The device must be erased**: Go to **Settings > General > Transfer or Reset iPad > Erase All Content and Settings**.

- Once wiped and restarted, ensure the Wi-Fi connection is stable. The device will check again and should now present the "Remote Management" screen.

---

## File: enr-2.md

---

id: enr-2

title: "Can we just install a profile manually? What is the difference between Manual and Automated Enrollment?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags:
["Manual Enrollment", "Account-Driven", "Supervised", "Apple Configurator"]

---

**Yes, you can, but manual enrollment (User-Initiated) provides significantly less administrative control compared to Automated Device Enrollment (ADE).**

Manual enrollment is typically reserved for personal "Bring Your Own Device" (BYOD) scenarios or donated legacy hardware that cannot be added to Apple School Manager (ASM).

## Key Differences:

1. **Management Authority**:
   - **Automated (ADE)**: Devices are placed in **"Supervised Mode"** by default. This grants the school the highest level of authority, enabling features like silent app updates, forcing restrictions (kiosk mode), and preventing the removal of the management profile.
   - **Manual**: Devices are "Unsupervised." The school has limited control and cannot force certain high-level restrictions.

2. **Removal Rights**:
   - **Automated (ADE)**: The school can make the management profile **"Non-Removable."** The student cannot delete the profile from settings.
   - **Manual**: The user can delete the management profile at any time via **Settings > General > VPN & Device Management**, instantly disconnecting the device from the school's control.

3. **Modern Methods**:
   - While old-fashioned manual enrollment required visiting a web URL in Safari, the modern approach is **"Account-Driven Enrollment."** Users simply sign in with their Managed Apple Account in Settings, and the system automatically guides them through the enrollment.

## How to Upgrade Manual Devices to "Supervised" Status:

If you have a device that wasn't bought through school channels but you want full control over it:

1. **Physical Link**: Connect the iPad to a Mac running **Apple Configurator**.

2. **Prepare**: Use the "Prepare" wizard and select **"Add to Apple School Manager."**
3. **Wipe & Bridge**: This process **will erase the device**. Once completed, the device enters a 30-day "provisional period" during which the user can still opt-out. After 30 days, the device is permanently merged into your ASM organization as a fully Supervised asset.

## Institutional Advice:

For school-owned assets, always insist on **Automated Device Enrollment (ADE)**. Manual enrollment should only be used as a temporary workaround or for personal devices joining the campus network.

---

## File: enr-3.md

---

id: enr-3

title: "What is 'Supervised Mode'? Why is it essential for school-owned devices?"

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["Supervised", "Management Levels", "ADE"]

**Supervised Mode is a special state that gives the school "Institutional Ownership" over the device's operating system.**

A standard iPad bought from a store is "Unsupervised" (private). A school-owned device, however, should always be in Supervised Mode—enabled through **ADE** or **Apple Configurator**—to ensure a safe and focused learning environment.

## Critical Differences:

| Feature                     | Unsupervised (Personal) | Supervised (School)                  |
| :-------------------------- | :---------------------- | :----------------------------------- |
| **MDM Profile Removal**     | User can delete anytime | **Can be made permanent**            |
| **Kiosk Mode (Single App)** | Not supported           | **Supported (Lock to one activity)** |
| **Global Network Proxy**    | Not supported           | **Supported (Filter web content)**   |
| **AirDrop Control**         | User choice             | **Can be forced Off by school**      |
| **Activation Lock Bypass**  | Impossible for IT       | **Managed by the school**            |
| **Silent Updates**          | Requires user consent   | **IT can force OS & App updates**    |

## How to Check the Status:

Open **Settings** on the iPad. Look at the very top, just below the user’s name. You should see a line of text:

> _This iPad is supervised and managed by [Your School Name]._

## Institutional Advice:

If a school iPad is not Supervised, students can easily bypass web filters, delete management profiles, or factory reset the device. Supervised Mode is the first line of defense in maintaining campus digital standards.

---

## File: enr-4.md

---

id: enr-4

title: "What is the difference between 'User Enrollment' and standard Device Enrollment?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["BYOD", "Privacy", "Partitioning", "Account-Driven"]

**User Enrollment is a privacy-first management mode specifically designed for "Bring Your Own Device" (BYOD) scenarios.**

Unlike standard enrollment used for school-owned iPads, User Enrollment (User-Driven) creates a **secure partition** on the device to separate school data from the student's personal photos, messages, and apps.

## Comparison Table:

| Feature                | Device Enrollment (Standard/ADE) | User Enrollment (BYOD)                                            |
| :--------------------- | :------------------------------- | :---------------------------------------------------------------- |
| **Ownership**          | Institutional Asset              | Personal Property                                                 |
| **Supervision**        | Mandatory (Supervised)           | Prohibited                                                        |
| **Data Isolation**     | Full Device control              | **Managed Data Partition only**                                   |
| **Privacy Protection** | Standard school visibility       | **Strict User Privacy** (IT cannot see personal apps or location) |
| **Remote Wipe**        | Wipes the entire device          | **Wipes school data only** (Personal photos remain safe)          |
| **Removal**            | Can be prevented by IT           | **User can opt-out anytime**                                      |

## Modern Approach (Account-Driven):

Apple now recommends **Account-Driven User Enrollment**. Instead of downloading a profile from a website, the student goes to **Settings > General > VPN & Device Management** and signs in with their **Managed Apple Account**. The device recognizes the campus ID and automatically sets up the school partition.

## Institutional Advice:

- **For School iPads**: Never use User Enrollment. You need the ability to lock and track the device if it’s lost.
- **For Staff/Shared personal use**: User Enrollment is the perfect balance for teachers who want to access school email on their personal iPhones without the school being able to see their private data.

---

## File: enr-5.md

---

id: enr-5

title: "How do we set up 'Service Discovery' for Account-Driven Enrollment on the campus network?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Account-Driven", "Service Discovery", ".well-known", "Technical Setup"]

**Account-Driven Enrollment relies on "Service Discovery," allowing users to enroll simply by entering their school email address.**

## How it Works:

When a user enters their email (e.g., `student@tes.tp.edu.tw`) during the enrollment process, the device attempts to find a secret instruction file on the school’s web domain.

1. The device sends an HTTP GET request to:

   `https://school.domain.com/.well-known/com.apple.remotemanagement`

2. The school’s web server must respond with a JSON file that points the device to the correct MDM server URL.

## Technical Requirements:

- **Web Server Access**: Your school’s main website server must be configured to host this specific `.well-known` directory.
- **MIME Type**: The server must return the file with the `application/json` header.
- **SSL Certificate**: The server MUST have a valid, trusted HTTPS certificate.

## Alternative Options:

If your school’s website is managed by a third party and you cannot modify the server files, you can still enroll devices using these methods:

1. **Direct URL/QR Code**: Provide students with a direct enrollment URL from Jamf Pro (e.g., `https://school.jamfcloud.com/enroll`). Converting this into a QR Code and posting it in the ICT department is a highly effective way to handle BYOD walk-ins.

2. **Automated Enrollment (ADE)**: For school-purchased hardware, always use ADE. It bypasses the need for service discovery entirely, as the hardware is already "pre-linked" to the school in Apple’s database.

---

## File: enr-6.md

---

id: enr-6

title: "The setup is stuck spinning on 'Retrieving remote management configuration'. How do I troubleshoot?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Enrollment Stuck", "Troubleshooting", "ADE", "DDM"]

**This indicates a communication delay or interruption while the device attempts to fetch the MDM configuration profile from Apple's servers.**

It is usually related to the network environment or MDM server response. "Retrieving remote management configuration" is a key step in **Automated Device Enrollment (ADE)**. Ideally, it should complete within 30 seconds to 2 minutes. If it hangs for more than 5 minutes, proceed with the following checks:

## Cause 1: Network Restrictions

- **Firewall Blocking**: The school network might be blocking access to Apple's device management hosts. Ensure traffic to `iprofiles.apple.com` and your MDM server URL is allowed.
- **Solution**: Try connecting the iPad to a mobile hotspot (4G/5G). If it proceeds successfully, the issue lies with the campus firewall.

## Cause 2: Jamf Pro Performance or Settings

- **Server Latency**: If hundreds of devices are enrolling simultaneously, Jamf Cloud might experience queuing delays.
- **Corrupt PreStage**: Occasionally, a PreStage configuration can have logic errors. Try re-saving the PreStage setting in Jamf Pro to force a refresh.

## Cause 3: Time Desynchronization

- If the device's clock deviates significantly from standard time out-of-the-box, the SSL secure connection will fail.
- Usually, restarting the device and connecting to a stable Wi-Fi network will automatically correct the time.

## Remedial Action:

Force restart the device (hold the Power button/Home button combo). The device will restart the Setup Assistant, and the second attempt often succeeds.

---

## File: enr-7.md

---

id: enr-7

title: "Why does the device get stuck on 'Installing Apps' during PreStage enrollment/Setup Assistant?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["PreStage Enrollment", "App Deployment", "ADE", "DDM", "Troubleshooting"]

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

---

## File: enr-8.md

---

id: enr-8

title: "Enrollment fails with 'Profile Installation Failed'. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Troubleshooting", "Network", "Declarative Management", "Profile"]

**This error typically stems from the device's inability to establish a stable, trusted secure connection with the MDM server or Apple servers.**

If you encounter this prompt during Enrollment, check the following common causes in order:

## Check 1: Verify Date and Time Precision

SSL certificate validation relies heavily on correct time. If the iPad's clock is off by more than a few minutes, the connection is treated as invalid.

- **Solution**: On the device, check **Settings > General > Date & Time**. Ensure **Set Automatically** is on and it has connected to the network to fetch the time zone.

## Check 2: Check Campus Firewall and Network Filtering

MDM commands are delivered via **Apple Push Notification service (APNs)**. If the school network blocks specific hosts, enrollment fails.

- **Critical Domains**: Ensure the firewall allows connections to `apple.com` and all its subdomains.

- **Ports**: Must open **TCP 443, 2197, and 5223**.
- **Test**: Try enrolling the iPad using an external mobile hotspot. If successful, it confirms a campus network restriction.

## Check 3: Declarative Device Management (DDM) Sync Issues

In the latest OS versions, Apple heavily utilizes "Declarative Management" for enrollment. If there are logic conflicts in Jamf Pro settings (e.g., assigning multiple PreStages overlap), the profile download may be interrupted.

- **Solution**: Admins should check PreStage settings in Jamf Pro to ensure the device falls into only one enrollment scope and the corresponding VPP Token is healthy.

## Check 4: Is the APNs Certificate Expired?

If the APNs Push Certificate in the MDM backend has expired, Apple will reject all enrollment requests.

- **Solution**: Ask an administrator to check the certificate validity in Jamf Pro's "Global Management".

## Check 5: Clear Activation Lock

If the device serial number is still locked to a previous user's Apple Account, you might be able to download the profile, but installation may fail due to identity conflict. Ensure Activation Lock is cleared before re-enrolling.

---

## File: enr-9.md

---

id: enr-9

title: "Jamf Pro commands are stuck in 'Pending', but the device is definitely online. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags:
[
"Stuck Commands",

    "Push Notification Service",

    "APNs",

    "Declarative Management",

    "Blank Push",

## ]

**'Pending' means the command has been sent to Apple's servers, but the device has not yet contacted the server to report its status.**

In the current architecture where **Declarative Device Management (DDM)** runs alongside traditional MDM protocols, command status updates rely heavily on device response. If commands stall, check these core factors:

1. **APNs Communication Blocked**:
   - This is the most common cause. Even if the device can browse the web, if the firewall blocks **TCP Port 5223** (used for communicating with Apple servers), push commands will never reach the device.
   - **Test**: Switch the device to a mobile hotspot. If the status immediately changes from "Pending" to "Completed", it proves a campus network restriction.

2. **Device entered Deep Sleep**:
   - iPads in deep sleep (screen locked for a long time without power) enter power-saving mode, potentially delaying push responses.
   - **Solution**: Wake the screen by pressing the Home or Top button to force the device to contact the server.

3. **Send a 'Blank Push' Command**:
   - In the device record in Jamf Pro, click **Management > Send Blank Push**.
   - This is a non-destructive command used purely to "wake up" the device. It forces the device to reconnect to Apple APNs, which then triggers the retrieval of subsequent queued commands.

4. **Date & Time Accuracy**:
   - If the device time drifts by more than a few minutes, the SSL secure connection fails. Ensure "Set Automatically" is enabled in Settings.

## Practical Advice:

If a single device is frequently Pending, it's usually a local network or hardware sleep issue. If devices across the entire school are Pending simultaneously, prioritize checking if the **APNs Certificate** in Jamf Pro is still valid.

---

## File: enr-10.md

---

id: enr-10

title: "I changed the device name in Jamf Pro, but the iPad still shows the old name locally. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Renaming", "Name Sync", "Inventory Preload", "PreStage", "The MUT"]

**This is usually because you only modified the 'text record' in the Jamf Pro database but haven't sent the 'Remote Rename Command' to the physical device.**

Changing the name field directly in Jamf Pro's "General Search" or device details only updates the backend label; it does not actively trigger a change on the device. To ensure the local name matches, successful admins use three correct methods:

## 1. Automatic Naming via 'PreStage Enrollment'

This is the recommended automated solution, naming the device the moment it activates:

- Configure in **PreStage Enrollment > Mobile Device Names**.

- **Use Variables**: You can use `$SERIALNUMBER` or `$ASSET_TAG` to generate names like `EDU-$SERIALNUMBER`.
- **Critical Checkbox**: You must check **Enforce Mobile Device Name on devices**. This ensures the device renames itself upon connecting to the network during setup.

## 2. Manual Sync via 'Remote Commands'

If you have already edited the name in the Jamf Pro device record, you must take the following actions:

- Click **Edit** on the device record and confirm the name change.

- Check the box **Enforce Mobile Device Name** below the name field and save.
- The system will immediately queue a `DeviceName` command to the iPad. Once the device receives it (must be unlocked and online), the local name will update.

## 3. Batch Updates using 'Mass Actions' or The MUT

When hundreds of devices need renaming:

- **Mass Actions**: Select specific devices in a Smart Group, then choose **Action > Send Remote Commands > Set Device Name**.

- **The MUT**: Upload a CSV file containing "Serial Number" and "Desired Name". This tool updates the record and simultaneously triggers Jamf Pro to send rename commands to the physical devices.

## Why do commands get stuck?

- **Unsupervised**: If the iPad is not in "Supervised" mode (via ADE), MDM cannot forcibly change its local name.
- **Command Pending**: If the device is off, offline, or sleeping, the rename command will sit in the `Pending` queue until the next Check-in.

## Practical Advice

Admins should always check "Enforce Mobile Device Name" within Jamf Pro. This prevents students from arbitrarily changing names on the iPad, ensuring the backend inventory always matches the physical device.

---

## File: enr-11.md

---

id: enr-11

title: "'Allow App Deletion' is enabled, but students still can't delete apps. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
["App Management", "Restriction Profiles", "Screen Time", "Troubleshooting"]

---

**This is usually due to a 'System Permission Conflict' or specific 'App Management Attributes.' Check the following three areas in order:**

## 1. Distinguish between "Remove from Home Screen" and "Delete"

In recent versions of iPadOS, long-pressing an app brings up "Remove App." Upon selection, the system asks to either "Delete App" or "Remove from Home Screen." If the "Delete" option is missing, the function is locked.

## 2. Screen Time Interference

- **Local Settings Priority**: If a student has manually gone to **Settings > Screen Time > Content & Privacy Restrictions > iTunes & App Store Purchases** and set "Deleting Apps" to "Don't Allow," this local setting will block the MDM policy.
- **Solution**: Push a new "Restrictions" profile from Jamf Pro and ensure the relevant options are checked to forcibly override local restrictions.

## 3. App-Specific Management Attributes

- **Non-Removable Apps**: When deploying an app via Jamf Pro, check its settings. If "Make app non-removable" is checked, students cannot delete that specific app even if they have global deletion permissions.
- **Solution**: Return to the App configuration in Jamf Pro and uncheck "Make app non-removable" if applicable.

## Troubleshooting Tips:

- **Sync Issues**: Sometimes devices don't refresh permissions immediately. Try sending a **Blank Push** or **Update Inventory** command.
- **System Apps**: Note that certain native Apple apps (e.g., Settings, App Store, Messages) cannot be deleted under any circumstances as part of the core system protection.

---

## File: enr-12.md

---

id: enr-12

title: "What is 'Shared iPad'? How can students share devices and keep their data private?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
["Shared iPad", "Managed Apple Account", "PreStage Enrollment", "Multi-User"]

---

**'Shared iPad' is an Apple feature designed for non-1:1 environments. It allows multiple students to sign in to the same iPad using their 'Managed Apple Accounts' while maintaining independent workspaces.**

This solves the problem of student data (Safari history, projects, etc.) getting mixed up when sharing devices.

## Core Requirements:

1. **Managed Apple Accounts**: This is mandatory. Students must use their school-issued accounts so the system can identify and sync their personal data.
2. **Supervised Mode & ADE**: The device must be Supervised and enrolled via Automated Device Enrollment (ADE).
3. **Storage Planning**: The system divides the iPad's internal storage into multiple "User Spaces." For example, a 128GB iPad set for 10 users will pre-allocate a disk quota for each individual.

## How to Configure (via Jamf Pro):

1. **Navigate**: Go to **Mobile Devices > PreStage Enrollments**.
2. **Enable**: In your PreStage profile, find and check the **Shared iPad** option.
3. **Set User Capacity**: Define the **Maximum Number of Users**.
   - **Storage Tip**: While iPadOS supports "Dynamic Quota," we recommend no more than 3 users for 64GB models. Larger models (128GB+) can accommodate more users.

4. **Wipe and Re-enroll**: If the device is not currently in Shared Mode, you **must wipe the device** and re-enroll it via the updated PreStage profile for the feature to take effect.

## Pros and Cons:

- **Pros**:
  - **Privacy**: Once a student logs out, the next user cannot access their data.
  - **Cloud Sync**: Projects started on Device A will sync (via iCloud) when the student logs into Device B.

- **Cons**:
  - **Login Time**: The initial login requires downloading the user profile, which can take time on slower networks.
  - **Limited Storage**: If too many users are assigned, students may run out of space when installing large apps or filming high-res video.
  - **Guest Sessions**: You can enable Temporary Sessions for account-free login, but all data is wiped immediately upon logout.

## Practical Advice:

Shared iPad relies heavily on stable, high-speed campus Wi-Fi. Before deployment, perform a "First Login Test" to ensure sync speeds meet your instructional needs.

---

## File: enr-13.md

---

id: enr-13

title: "How do I prevent students from removing the MDM management profile?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
[
"Prevent Unenrollment",

    "Supervised",

    "PreStage Enrollment",

    "ADE",

    "Return to Service",

## ]

**The key to preventing profile removal is using the 'Automated Device Enrollment (ADE)' process and enabling mandatory locking in the 'PreStage Enrollment' settings.**

If a device is enrolled manually (e.g., via a manual link or temporary Apple Configurator enrollment), students can remove the profile at any time under **Settings > VPN & Device Management**.

## Steps for Mandatory Control (Jamf Pro):

1. **PreStage Enrollment**: Ensure the device is assigned to the correct **Automated Device Enrollment** instance.
2. **Enable Mandatory Supervision**: Under the **Supervised Devices** section, ensure **Supervise Devices** is checked. This is the foundation for all advanced management; unsupervised devices cannot lock profiles.
3. **Lock the Profile (Crucial Step)**:
   - Check **Prevent Unenrollment**.
   - **Result**: The "Remove Management" button will disappear from the iPad settings. Unless the device was added via Apple Configurator (which has a 30-day grace period), the student cannot manually remove the MDM profile.

## Supporting Security Measures:

- **Prevent Resets**: In a "Restrictions" profile, uncheck "Allow Erase All Content and Settings" to prevent students from wiping the device to bypass management.
- **Enable 'Return to Service'**: We recommend checking **Allow Return to Service** in the PreStage settings. This ensures that if a device must be reset, it can automatically reconnect and re-enroll.
- **Prevent Activation Lock**: Check **Prevent user from enabling Activation Lock** to stop students from locking the device to a personal Apple Account.

## Practical Advice:

- **Cannot be Retroactive**: If a student has _already_ removed the profile, you cannot fix it remotely. You must wipe the device and have it go through the PreStage process with "Prevent Unenrollment" enabled.
- **Version Requirements**: For modern environments, we recommend setting a **Minimum Required iPadOS Version** (e.g., iPadOS 17+) in PreStage to ensure "Return to Service" and latest security features function correctly.

---

## File: enr-14.md

---

id: enr-14

title: "How do I make an iPad automatically connect to Wi-Fi and re-enroll after a reset? (Return to Service)"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Automation", "Wi-Fi", "Return to Service", "Zero-Touch"]

**'Return to Service' is a command feature introduced by Apple in iOS 17. It allows a device to automatically bypass the initial setup screens, connect to Wi-Fi, and re-enroll after a remote wipe.**

This feature eliminates the need for technicians to manually select language, region, and Wi-Fi settings after a device is cleared.

## How it Works:

When an administrator sends the "Wipe Device" command from Jamf Pro, they can include a **Wi-Fi Profile** as part of the instruction. After the device clears all data and reboots, it automatically applies the Wi-Fi credentials to get online and immediately requests **Automated Device Enrollment (ADE)** from Apple's servers.

## Prerequisites:

- **Hardware**: iPad must be running iPadOS 17 or later.
- **Management Status**: The device must be already enrolled via ADE and in a **Supervised** state.
- **Configuration**: A corresponding PreStage Enrollment must be configured in Jamf Pro with the appropriate Wi-Fi settings.

## Recommended Steps:

1. Search for and select the target device in Jamf Pro.
2. Click **Management > Send Remote Commands > Wipe Device**.
3. In the command options, check **Return to Service**.
4. Specify the Wi-Fi configuration to be sent to the device.
5. If Activation Lock might be present, ensure **Clear Activation Lock** is also checked.
6. Send the command.

## Risks and Limitations:

- **Network Dependency**: If the specified Wi-Fi SSID changes or the password is incorrect, the device will be stuck at the "Hello" screen, requiring manual intervention to solve the connectivity issue.
- **Processing Time**: It typically takes 5 to 10 minutes from sending the command to the device returning to the Home Screen, depending on network speed and the size of the configurations/apps being downloaded.
- **Data Erasure**: This feature still performs a full device wipe. Always ensure any critical instructional data has been backed up to the cloud before execution.

---

## File: enr-15.md

---

id: enr-15

title: "The iPad shows 'iPad Unavailable' or is locked due to too many failed passcode attempts. What should I do?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
["Passcode Lock", "Restore", "Apple Configurator", "Apple Devices App", "DFU"]

---

**When a device displays 'iPad Unavailable' or 'Security Lockout,' it must be erased before it can be used again. If the device is MDM-managed, the solution depends on its connectivity status.**

A security mechanism is triggered when a user enters the wrong passcode multiple times. In newer OS versions, the screen will show "iPad Unavailable" or "Security Lockout" instead of the older "Disabled" message.

## Recommended Solutions:

### Option 1: Send 'Wipe Device' Command via MDM (Preferred)

If the iPad is still connected to Wi-Fi or a cellular network (previously joined networks usually remain active even while locked):

1. Log in to Jamf Pro and find the device record.

2. Click **Management > Remote Commands > Wipe Device**.
3. **Benefit**: This is the fastest method. If the device was enrolled via **Automated Device Enrollment (ADE)**, it will reboot and immediately enter the automated setup process without further manual intervention.

### Option 2: Restore using a Computer

If the device cannot connect to the network or the MDM command cannot reach it:

1. **Prepare Tools**:
   - **macOS**: Use the built-in **Finder** or **Apple Configurator**.
   - **Windows**: Install the **Apple Devices app** from the Microsoft Store (or use iTunes for older environments).

2. **Enter Recovery Mode**:
   - **Models without a Home Button (iPad 10, Air, Pro M-series)**: Press and quickly release Volume Up, press and quickly release Volume Down, then hold the Top Button until the computer connection icon appears.
   - **Models with a Home Button (iPad 9)**: Hold both the Home Button and the Top Button simultaneously until the computer connection icon appears.

3. Click **Restore** on your computer. This will download the latest system software and erase all device content.

### Option 3: DFU Mode Restore (Advanced Troubleshooting)

If Recovery Mode fails, try DFU (Device Firmware Update) mode. The screen will remain black, but the computer will detect the device. This is typically used for repairing corrupt firmware.

## Important Notes:

- **Data Loss**: Unless an automated iCloud backup was enabled, all data will be lost upon erasure.
- **Activation Lock**: If the device was signed into a personal Apple Account with "Find My" enabled, it will require that account's password after restoration. For school property, administrators can retrieve the Bypass Code from ASM or Jamf Pro.

---

## File: enr-16.md

---

id: enr-16

title: "The device shows 'Invalid Profile' or is running extremely slow, even after a reset. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags:
[
"Invalid Profile",

    "Troubleshooting",

    "Wipe Device",

    "Declarative Management",

## ]

**'Invalid Profile' typically indicates that the 'Trust Anchor' (the identity chain between the device and the MDM server) has been broken.**

In this state, the device appears managed but has lost its ability to communicate. Instructions and configurations cannot be delivered correctly.

## Recommended Solutions:

### Option 1: Send 'Wipe Device' (If online)

1. Log in to Jamf Pro and attempt to send a **Wipe Device** command.
2. If the device receives it, performing a fresh **Automated Device Enrollment (ADE)** after the wipe usually establishes a new, healthy trust relationship.

### Option 2: Manual Wipe and Re-enrollment (The thorough fix)

If remote commands fail:

1. **Manual Wipe**: On the iPad, go to **Settings > General > Transfer or Reset iPad > Erase All Content and Settings**.

2. **Re-enroll**: Once back at the "Hello" screen, connect to stable Wi-Fi and re-download the "Remote Management" profile during the Setup Assistant.

## Why does a reset sometimes fail?

- **Command Residue**: If you don't clear pending or failed commands in Jamf Pro before re-enrolling, the device might immediately receive the same old error commands upon reconnecting, causing it to hang again.
- **Hardware Limitations**: Older hardware combined with bloated configuration profiles or heavy apps can lead to severe lag.
- **Actionable Advice**: Always click "Cancel Pending/Failed Commands" for that serial number in Jamf Pro before the device re-enrolls.

---

## File: enr-17.md

---

id: enr-17

title: "The device is locked by 'Activation Lock'. How do I unlock it?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Activation Lock", "Bypass Code", "Apple Devices App"]

**Activation Lock is an Apple security feature. If you have ownership of the device, there are several technical pathways to unlock it.**

When an iPad is erased, if it previously had "Find My" enabled, it will request the original Apple Account login. As a school administrator, your options are:

## Option 1: Use an Activation Lock Bypass Code (Fastest)

If the device was Supervised and managed by Jamf Pro before being locked:

1. Log in to Jamf Pro and find the device record.

2. Under **Inventory > Security**, look for the **Activation Lock Bypass Code**.
3. Enter this code in the password field on the iPad (leave the Apple ID field blank) to skip verification.

## Option 2: Remove via Apple School Manager (The New Standard)

1. Log in to [Apple School Manager (ASM)](https://school.apple.com).
2. Click **Devices** and search for the serial number.
3. If the device belongs to your organization, click **Turn off Activation Lock**.
4. Wait a few moments, then restart the iPad to enter the setup screen normally.

## Option 3: Restore using a Computer

If the device is in an abnormal state and cannot receive commands:

1. Use **Finder / Apple Configurator** (macOS) or the **Apple Devices app** (Windows).

2. Enter Recovery Mode and perform a Restore.
   - **Note**: This clears the data, but the Activation Lock screen may still appear (requiring Option 1 or 2 to unlock).

## Option 4: Contact Apple Support

If automated tools fail (e.g., a device was not enrolled before being locked by a student), prepare the original purchase invoice or packing slip and contact **Apple Support** to open a case for manual removal.

## Practical Advice:

In your Jamf Pro **PreStage Enrollment** settings, always check **Prevent Activation Lock**. This ensures devices do not enter a locked state when erased, reducing administrative overhead.

---

## File: enr-18.md

---

id: enr-18

title: "Can I remove Activation Lock directly in ASM now? Do I still need Apple Support?"

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["Activation Lock", "ASM", "Automated Device Enrollment", "Unlock"]

**Yes. As long as the device belongs to your organization, you can now self-service Activation Lock removal directly through the Apple School Manager (ASM) interface.**

This eliminates the need to call support or provide invoices for managed hardware, significantly streamlining school administration.

## Self-Service Unlocking Steps:

1. Log in to **[Apple School Manager (ASM)](https://school.apple.com)**.
2. Select **Devices** from the sidebar and search for the target serial number.
3. Open the device details and look for the toolbar button (or "More" menu).
4. Click **Turn Off Activation Lock** and confirm.
   - **Success Flow**: Apple's servers will de-link the serial number from the previous account. Wait 2-10 minutes, then restart the device or perform a Restore via computer to bypass the password screen.

## Prerequisites and Limitations:

- **Ownership**: The device must appear in your ASM device list.
- **Management Mode**: This applies to Supervised devices assigned via **Automated Device Enrollment (ADE)** or added via Apple Configurator.
- **Connectivity**: The device must be connected to Wi-Fi to communicate with Apple's activation servers and confirm the unlock.

## Why Prioritize This Method?

- **No Red Tape**: No need for invoices, official documents, or waiting 3-10 days for Apple Support to review the case.
- **Last Resort**: If a device was accidentally deleted from the MDM (losing the Bypass Code), ASM is your only remaining self-service path.

## Practical Advice:

If you need to reinstall the OS after unlocking, Windows users should use the **Apple Devices app**, and Mac users should use **Finder** or **Apple Configurator**. Once restored, the lock will be gone.

---

## File: enr-19.md

---

id: enr-19

title: "A Mac returned from repair is locked by Activation Lock. How do I fix it?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Mac Security", "Activation Lock", "Apple Silicon", "Apple Configurator"]

**Activation Lock for Macs with Apple Silicon (M1-M5) or the Apple T2 Security Chip is fully integrated into Apple School Manager (ASM).**

The key to unlocking it depends on which organization currently owns the serial number in Apple's database.

## Option 1: The serial number is in your ASM list

If the serial number appears in ASM (common for original-unit repairs):

1. Log in to **ASM** > **Devices** > Search for the serial number.

2. Click **Manage Activation Lock > Turn off Activation Lock**.
3. **Result**: Wait about 10 minutes, restart the Mac, and connect to Wi-Fi. The lock will be cleared via Apple's servers.

## Option 2: The serial number is NOT in ASM (Retail unit/New board)

If the repair involved a new logic board that wasn't auto-transferred to your ASM:

1. **Tools**: Use another Mac with **Apple Configurator** or an iPhone with the **Apple Configurator app**.

2. **Steps**: Put the target Mac on the "Setup Assistant" (Hello) screen. Use the iPhone app to scan the cloud pattern or the Mac app to **Add to Apple School Manager**.
3. **Follow-up**: Once the serial appears in your ASM, proceed with **Option 1**.

## Option 3: The 'Locked to Another Organization' scenario

If the repair shop used a "pre-owned" or "test" board that is still managed by another school or enterprise:

- **Symptom**: Apple Configurator will throw an error saying "This device is owned by another organization."

- **Risk**: **You cannot unlock this yourself.** Legally and technically, the hardware ownership remains with another entity.
- **Fix**: Demand that the repair vendor either contacts the original owner for a "Release" in ASM or replaces the board with a clean, unmanaged unit.

## Last Resort: DFU Mode Restore

If the unlock command has been sent but the Mac remains stuck:

1. Put the Mac into **DFU Mode**.

2. Connect to another Mac (Finder/Configurator) or Windows PC (Apple Devices app).
3. Perform a **Restore**. This reflashes firmware and wipes the drive. If the ASM unlock was successful, the Mac will now activate normally.

---

## File: enr-20.md

---

id: enr-20

title: "How do I quickly restore settings to a replacement device from a repair vendor?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Repair", "Replacement", "ADE", "Automated Device Enrollment"]

**A 'Service Replacement' unit has a brand-new serial number. To automate the setup, you must handle the serial transfer and use Automated Device Enrollment (ADE).**

Note: **Return to Service (RTS)** only applies to devices already in management and is not for unboxing new replacement units.

## Standard SOP:

### 1. Update Apple School Manager (ASM)

- **Auto-Transfer**: If repaired by an Apple Authorized Service Provider, the asset ownership often transfers to the new serial automatically.
- **Manual Assignment**: If it appears in ASM, search for the new serial and click **Edit MDM Server** to assign it to your Jamf server.
- **Release Old Unit**: Once the new unit is in service, "Release" the old, scrapped serial from ASM to keep your inventory clean.

### 2. Sync Jamf Pro

1. Go to **Settings > Global Management > Device Enrollment > [Your Server]**.
2. Click **Sync Now** to ensure the new serial number is pulled into your PreStage Enrollments scope.

### 3. Initial Enrollment (ADE Flow)

1. Power on the device to the **Setup Assistant**.
2. Manually connect to Wi-Fi (the device isn't managed yet).
3. The device will fetch the **Remote Management** screen. Click "Download Profile" to begin the automated app and setting installation.

### 4. Future Resets (Using RTS)

- Once the device has completed the above steps, it is now "Managed."
- **Next time** you need to wipe it for a new student, you can use the **Return to Service (RTS)** command for a zero-touch wipe and Wi-Fi reconnect.

## Troubleshooting:

- **Serial Not Found**: If the new unit isn't in ASM, contact the repair shop and ask them to upload the "Case Number" and replacement record to Apple’s educational asset system.
- **Stuck on Activation Lock**: If the "new" machine asks for an Apple Account, contact the vendor; this is likely residue from their testing or a previous owner.

---

## File: enr-21.md

---

id: enr-21

title: "Can I use Apple Configurator to manually add devices that don't appear in ASM?"

category: "Section 2: Device Enrollment & Deployment"

important: false

## tags: ["Apple Configurator", "Manual ASM Addition", "Provisional Period"]

**Yes. For devices not purchased through an authorized education reseller, you can use Apple Configurator to manually enroll them into your Apple School Manager (ASM) organization.**

This allows "retail" iPads or Macs to achieve the same management status (Supervised) as those purchased through official channels.

## Preparation:

1. **Hardware**: A Mac with **Apple Configurator** installed, or an iPhone with the **Apple Configurator app** (for adding Macs to ASM).
2. **Permissions**: An ASM account with "Device Enrollment Manager" or "Administrator" roles.
3. **Device State**: The iPad must be on the **Setup Assistant** (Hello) screen. If it is already in use, it must be erased first.

## The 30-Day Provisional Period:

Devices added manually to ASM have a **30-day "grace period"**:

- **User Rights**: During these 30 days, a user can manually remove the MDM profile via the device Settings.

- **Permanent Enrollment**: After 30 days, the device becomes a permanent part of the organization. The MDM profile becomes unremovable, just like a device purchased via ADE.

## Important Reminders:

- **Windows Limitation**: The **Apple Devices app** for Windows can perform restores, but it **cannot** manually add devices to an ASM organization.
- **Release Risk**: If you "Release" a manually-added device from ASM, it can only be added back using Apple Configurator again; it will not reappear automatically.

---

## File: enr-22.md

---

id: enr-22

title: "The school is changing its Wi-Fi SSID. How do I prevent iPads from losing connectivity?"

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["Wi-Fi Migration", "SSID", "Disaster Prevention", "Network Config"]

**This is a common maintenance task that frequently leads to mass disconnections. You must follow the 'Parallel Deployment' principle: Never delete the old setting until the new network is verified as functional.**

If handled incorrectly, iPads will lose contact with the old Wi-Fi and be unable to receive the MDM command for the new Wi-Fi, leaving them as "unmanaged" devices that must be manually connected one by one.

## Standard Safe Migration SOP:

### Step 1: Push the New Profile

- Create a new Wi-Fi configuration profile in Jamf Pro (with the new SSID and password).
- Deploy this to all devices. At this point, the iPads will have _both_ the old and new Wi-Fi settings.

### Step 2: Field Testing

- Take a test iPad to various locations in the school. Manually turn off the old SSID (if broadcasting) to confirm the device switches to and successfully connects via the new SSID.

### Step 3: Grace Period

- Keep both SSIDs active for at least **2 to 3 days**.
- This ensures that devices that were asleep, powered off, or off-site have a chance to wake up and receive the new Wi-Fi profile before the old network disappears.

### Step 4: Decommission Old Config

- Once you verify that the majority of devices have connected via the new network (checked via inventory reports), remove the "Scope" for the old Wi-Fi profile in Jamf Pro.

## WARNING: Why you should NOT just edit the old profile

If you simply modify the existing Wi-Fi profile (changing SSID A to SSID B), the iPad will disconnect from A the moment it receives the command. If there is a typo in the password or the APs aren't ready for B, the iPad is now offline and cannot receive the "correction" command you send later. This creates a dead loop.

## Practical Advice:

Always perform the full workflow on a single "test classroom" before rolling it out to the entire school.

---

## File: enr-23.md

---

id: enr-23

title: "What is 'Zero-Wipe MDM Migration'? Is this new iOS 26 feature suitable for schools?"

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["MDM Migration", "Zero-Wipe", "iOS 26", "macOS 26", "Risk Assessment"]

**iOS 26, iPadOS 26, and macOS 26 support 'Zero-Wipe MDM Migration,' allowing for the change of MDM systems without resetting the device. While impressive, we recommend schools prioritize 'Return to Service' to ensure devices remain clean and stable.**

## How it Works

1. Configure the target (new) MDM in **Apple School Manager (ASM)**.
2. Set an **Enrollment Deadline**.
3. The device notifies the user as the deadline approaches.
4. At the deadline, the device automatically:
   - Removes the old MDM management profile.
   - **Preserves** user data, apps, and settings.
   - Registry automatically with the new MDM.

## Use Cases

- Changing MDM vendors (e.g., migrating from a legacy system to Jamf Pro).
- Regional education bureaus merging multiple MDM instances into one.

## Considerations for Education

### Potential Challenges:

1. **Configuration Residue**:
   - Certain settings from the old MDM (certificates, Wi-Fi profiles) may not clear perfectly.
   - Conflicts between old and new policies could occur, potentially breaking features like Apple Classroom or AirPlay.

2. **App License Management**:
   - VPP App licenses must be re-assigned between the old and new MDMs.
   - If handled poorly, apps may fail to update or require re-installation, increasing IT overhead.

3. **Shared iPad Environments**:
   - Preserving data means residual caches from previous users remain on the device. If you need a "Clean" device for the next user, this feature is not ideal.

4. **System Bloat**:
   - Long-term technical debt and system caches are preserved. This can impact the efficiency of new MDM commands.

## Recommended Alternative: Return to Service (RTS)

For student devices that require periodic resets, **Return to Service** remains the gold standard.

- **Total Wipe**: Ensures the device starts from a 100% clean state.

- **Wi-Fi Persistence**: Reconnects to Wi-Fi automatically after the wipe.
- **Auto-Enrollment**: Automatically completes the ADE flow.
- **App Preservation (iOS 26+)**: You can now choose to preserve the Managed App binaries, saving significant redownload time while still clearing user data.

## When to use Zero-Wipe Migration:

- **1-to-1 Teacher/Staff Devices**: Avoids forcing administrative staff to re-configure their personal data and settings.
- **BYOD Programs**: Transitions management on teacher-owned devices without touching their personal photos or files.

## When NOT to use it:

- Shared iPads or iPad trolleys.
- Student devices that require a seasonal "Fresh Start."
- Devices exhibiting buggy or abnormal behavior.

---

## File: enr-24.md

---

id: enr-24

title: "How do I set an 'Enforcement Deadline' for MDM enrollment or system updates?"

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["Enforcement Deadline", "DDM", "Enforcement", "Deadline", "Compliance"]

**Using Declarative Device Management (DDM), you can set 'Enforcement Deadlines.' The device will autonomously manage notifications and, once the deadline is reached, remove the 'Later' option to force the update or enrollment.**

## Key Principles

- The device receives a **Declaration** containing the deadline.
- The device manages its own notification frequency locally.
- At the deadline, the action is forced without needing the MDM server to push a real-time command.

## Scope

- **OS Versions**: iOS 26, iPadOS 26, macOS 26, visionOS 26, tvOS 26.
- **Applications**: Software Update enforcement, MDM Migration deadlines, and Configuration Profile installations.

## Implementation (Jamf Pro Example)

### Software Update Deadline:

1. Go to **Devices > Blueprints** or **Computers > Blueprints**.
2. Create/Edit a **Software Update Declaration**.
3. Set the **Target Version** (e.g., Latest version).
4. Enable **Enforcement Deadline**.
   - Set the specific date and time (e.g., 2026-02-28 17:00).
   - Choose the time zone (Local device time is recommended).

5. Deploy to the target group.

## User Experience Timeline

| Time until Deadline | Notification Frequency    | User Options          |
| :------------------ | :------------------------ | :-------------------- |
| 30–14 Days          | Banner in Settings        | Can select "Later"    |
| 7 Days              | Once per day              | Can select "Later"    |
| 3 Days              | Twice per day             | Can select "Later"    |
| 24 Hours            | Once per hour             | Can select "Later"    |
| **At Deadline**     | **Immediate Enforcement** | **No "Later" option** |

### Behavior at Deadline:

- **Power On**: Immediately begins download and installation.
- **Power Off**: Provides a 1-hour grace period upon the next boot, then forces the action.
- **Restart**: If a restart is required, the user may be given a brief warning, but the system will eventually force the reboot.

## Deployment Advice for Schools

- **Buffer Time**: Provide 2–4 weeks for users to update voluntarily.
- **Scheduling**: Avoid exam weeks or major school events. Friday afternoons or weekends are often best.
- **Capacity**: Ensure school bandwidth can handle the concurrent downloads if a large number of devices reach the deadline at once.

## Communication:

- **Teachers**: Explain _why_ the update is necessary (security/new features) and encourage them to update manually before the deadline to avoid interruptions.
- **Students**: Remind them to leave their iPads connected to power at home to allow for automatic background updates.

---

## File: enr-25.md

---

id: enr-25

title: "Which Setup Assistant steps should I skip during PreStage Enrollment? What are the best practices for schools?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
["PreStage", "Setup Assistant", "ADE", "Deployment Speed", "Best Practices"]

---

**PreStage Enrollment allows you to suppress multiple steps during the initial device setup. For educational settings, we recommend skipping most non-essential steps to accelerate deployment and prevent students from misconfiguring the device.**

## Recommended Steps to SKIP (Education)

### Privacy and Location

- **✅ Location Services**: Skip. IT should enable this globally to support "Find My" and time zone accuracy.
- **✅ App Analytics**: Skip. The organization makes this decision on behalf of the fleet.
- **✅ Screen Time**: Skip. This is a consumer-level parental control. Use MDM restrictions for fleet-wide management instead.

### Apple Services

- **✅ Apple Pay**: Skip. Students typically do not have credit cards for school devices.
- **✅ Siri / New Feature Highlighting**: Skip. This accelerates the "Hello" to "Home Screen" transition.
- **✅ Apple Intelligence (iOS 26)**: Skip. You can enable or manage these AI features later via MDM.
- **✅ iMessage & FaceTime**: Skip. Prevents students from signing into personal messaging services during setup.

### UI and Appearance

- **✅ True Tone**: Skip. Non-essential for classroom use.
- **✅ Display Zoom**: Skip. Use the system default.
- **✅ Appearance (Light/Dark)**: Skip. Standardize on the system default for a uniform look.
- **✅ Liquid Glass (iOS 26)**: Skip. Standardizes the UI across the fleet.

### Other

- **✅ Terms and Conditions**: Skip. IT accepts these on behalf of the organization in ASM.
- **✅ Diagnostics**: Skip for privacy and speed.

## Items you should NOT skip (or should keep)

- **❌ Remote Management**: **Cannot be skipped**. This is the core Step of ADE that informs the user the device is managed by the school.
- **⚠️ Biometrics (Touch ID / Face ID)**:
  - **Elementary**: Skip. Prevents confusion for young students.
  - **Middle/High School**: Keep. Enhances local security and convenience.
  - **Staff**: Keep.

- **⚠️ Apple Account Login**:
  - **Shared iPad**: Skip. Managed via the MDM login screen.
  - **1:1 iPad**: Keep or Skip depending on whether students are expected to use Managed Apple Accounts.

## Practical Benefits of a Lean PreStage

- **Efficiency**: A full Setup Assistant takes 10–15 minutes. An optimized PreStage takes **under 2 minutes**.
- **Support**: Prevents students from getting stuck on "Siri can't hear me" or confusion over Apple Pay prompts.
- **Uniformity**: Ensures every device in the classroom looks and behaves exactly the same.

---

## File: enr-26.md

---

id: enr-26

title: "How does the 'Preserve Managed Apps' feature in iOS 26 Return to Service work?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags:
[
"Return to Service",

    "iOS 26",

    "Shared iPad",

    "App Preservation",

    "Rapid Deployment",

## ]

**In iOS 26, iPadOS 26, and visionOS 26, 'Return to Service' introduces the ability to 'Preserve Managed Apps.' This allows you to wipe user data while keeping the actual app binaries on the device, eliminating the massive time and bandwidth cost of redownloading gigabytes of educational software.**

## Technical Principles

### Traditional Return to Service (v25 and earlier)

1. Wipes all data and apps.
2. Preserves Wi-Fi settings.
3. Reboots and auto-enrolls in MDM.
4. **MDM re-installs all apps** (This is the slowest part of the process).

### iOS 26 Enhanced Return to Service

1. MDM sends the command and the device creates a **Filesystem Snapshot**.
2. **Snapshot includes installed Managed App binaries.**
3. User data (documents, photos, settings) is wiped.
4. Device reboots and restores to the snapshot state.
5. Device auto-enrolls; **Apps are re-licensed and ready immediately** without a single download.

## Efficiency Comparison

| Step                 | Traditional Method | iOS 26 (Preserve Apps)     |
| :------------------- | :----------------- | :------------------------- |
| Wipe Data            | 2–3 mins           | 2–3 mins                   |
| Reboot               | 1–2 mins           | 1–2 mins                   |
| Re-enroll            | 1–2 mins           | 1–2 mins                   |
| App Download/Install | **30–60 mins**     | **0 mins** (Already there) |
| **Total Time**       | **35–65 mins**     | **5–10 mins**              |

## Best Use Cases

- **Semester Rotation**: Assigning a 1:1 iPad to a new student for the next term.
- **Public/Shared iPads**: Periodic clearing of student data in libraries or computer labs.
- **Bulk Deployment**: Resetting 30+ iPads at once without crashing the school's internet connection.

## Implementation in Jamf Pro

When sending a **Return to Service** command:

1. Select the **Clear Activation Lock** option.

2. Select **Retain Wi-Fi Profile**.
3. Select the new **Preserve Managed Apps** option.

## Key Limitations

- Requires **iOS/iPadOS 26** or later.
- Only works for apps deployed as **Managed Apps** via MDM.
- If the app itself requires an update, it will still trigger a download after the reset.

---

## File: enr-27.md

---

id: enr-27

title: "Zero-Wipe MDM Migration: Moving devices from MOE Managed Jamf Pro to an In-House MDM."

category: "Section 2: Device Enrollment & Deployment"

important: true

## tags: ["iOS 26", "MDM Migration", "Zero-Wipe", "Asset Transfer", "Jamf Pro"]

**As educational projects evolve, many schools look to migrate devices from a centrally managed instance (like Taiwan's MOE Jamf Pro) to their own in-house MDM server. Prior to iOS 26, this required a full erase, which was a barrier for students with extensive learning data. iOS 26 solves this with 'Zero-Wipe MDM Migration.'**

## The Migration Workflow (SOP)

### 1. Preparation in ASM/ABM

The MDM server change must originate at the root of the ownership chain:

- In **Apple School Manager**, go to **Devices**.

- Select the target devices and choose **Edit MDM Server**.
- Point them to your new "In-House" MDM server.

### 2. Configure the Migration Payload

In your _existing_ (MOE) MDM server, you must configure the migration instructions:

- **Target MDM URL**: The enrollment URL of your new server.

- **Enforcement Deadline**: Define the date and time when the transfer _must_ occur.

### 3. The Device Experience

- The student receives a notification that their device will be moved to a new management system.
- Up until the deadline, they can choose "Later."
- At the **Enforcement Deadline**, the device silently unenrolls from the MOE server and immediately enrolls in the school's server.
- **Crucial**: All local student files, photos, and project data are **not touched**.

## Risks and Mitigation for Schools

- **App Licensing**: VPP app licenses belong to the MDM server. You must ensure you have enough VPP licenses in the _new_ server for all apps. We recommend setting the new server as the license owner prior to migration.
- **Configuration Conflicts**: If the old server had a "Restriction" that the new server doesn't, those "ghost" restrictions might linger if not handled correctly. We recommend a "Cleanup" script run by the new MDM upon first check-in.
- **Teacher/Staff vs. Student**: This feature is highly recommended for Teacher/Staff devices to avoid disrupting their administrative files. For student devices, if the storage is already cluttered, a traditional "Return to Service" (Wipe) remains the better option for long-term stability.
