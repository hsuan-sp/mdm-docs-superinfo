---
File: cls-1.md
---

---

id: cls-1

title: "Can teachers see every student's screen using the Apple Classroom app?"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

## tags: ["Classroom App", "Screen View", "Privacy", "AirPlay"]

**Yes. This is a core feature of the Apple Classroom app, though it includes built-in privacy safeguards to ensure student awareness.**

## How it Works:

- **Real-time Monitoring**: From their iPad or Mac, the teacher can view live thumbnails of every student's screen in the class.
- **Individual Inspection**: Tapping a thumbnail allows the teacher to zoom in and view a specific student's work or progress in detail.

## Privacy Safeguards:

- **The Blue Status Bar**: When a teacher is actively viewing a student’s screen, a **blue AirPlay icon** (or a blue pill-shaped bubble) appears in the status bar at the top of the student's iPad.
- **Indelible Notification**: This notification is a hard-coded system feature of iPadOS. It cannot be disabled by IT or the MDM, ensuring students always know when their screen is being shared.

## Technical Requirements:

- **Bluetooth & Wi-Fi**: Both teacher and student devices must have Bluetooth and Wi-Fi enabled and be within physical proximity (the same classroom).
- **Supervised Status**: Student iPads must be in **Supervised Mode** for the teacher to view the screen without the student needing to tap "Accept" for every session.
- **MDM Permissions**: The management profile pushed to the student device must explicitly allow "AirPlay and Screen View."

---

## File: cls-2.md

---

id: cls-2

title: "Can I restrict students to using only one specific app during my lesson?"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

## tags: ["App Lock", "Single App Mode", "Focus", "Compliance"]

**Yes. Teachers can use Apple Classroom to temporarily "lock" students into a specific application.** This is particularly useful for assessments (e.g., Kahoot, Quizlet), focused writing tasks, or ensuring everyone is on the same page during a science lab.

## How to Execute:

1. In the Classroom app, select the entire class or specific students.
2. Tap the **"Open"** tool.
3. Select the target app from the list.
4. Toggle on the switch for **"Lock in app after opening."**
5. Tap "Done." The student devices will automatically launch the app and disable the Home button and multitasking.

## How to Unlock:

- Tap the **"Unlock"** button in the teacher’s toolbar.
- The devices will also automatically unlock when the teacher ends the class session.

## Practical Tip:

This feature triggers a temporary "Single App Mode." If a student device becomes disconnected from the network, the unlock command might be missed. If a device remains stuck after class, a simple restart usually resolves the issue.

---

## File: cls-3.md

---

id: cls-3

title: "Why is the web navigation failing when I try to push a URL to student iPads?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Web Navigation", "Safari", "Content Filtering", "Troubleshooting"]

**Navigation failures are typically caused by browser restrictions, content filters, or excessive open tabs.**

## Troubleshooting Checklist:

1. **Safari is Disabled**: Verify if Safari has been hidden or disabled via a management profile. If the browser is unavailable, the push command has nowhere to go.
2. **Web Content Filtering**: If your school uses a strict "allowlist," and the URL you are pushing (e.g., a specific YouTube video or external blog) is not on that list, Safari will block the page from loading.
3. **Tab Fatigue**: If a student has dozens of open tabs, older iPad models may run out of memory and fail to open a new one. Ask students to clear their Safari tabs and try again.
4. **URL Format**: Ensure the URL you are typing includes the full `https://` prefix.

## Best Practice for Teachers:

Save your frequently used teaching links in your own iPad’s **Safari Bookmarks**. When using the "Navigate" tool in Classroom, you can select these bookmarks directly, reducing the chance of typing errors or formatting issues.

---

## File: cls-4.md

---

id: cls-4

title: "The class is too loud! How do I 'Lock' all student screens at once?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Screen Lock", "Classroom Order", "Eyes on Me"]

**By using the "Lock" feature in Apple Classroom, you can instantly turn all student iPad screens black to get the class’s attention.** This is a favorite "Eyes on Me" tool for teachers when they need the class to stop working and look at the front of the room.

## How it Works:

1. Tap the **"Lock"** icon in the Classroom toolbar.
2. Every student iPad screen will immediately turn black and display a lock message (e.g., "This device is locked by your teacher").
3. Touch input and physical buttons will be disabled until the teacher taps **"Unlock."**

## Technical Note:

This command is triggered via Bluetooth, making it nearly instantaneous. While the screen is locked, the iPad’s background processes (like app downloads or file uploads) will **not** be interrupted. It only blocks the user interface.

---

## File: cls-5.md

---

id: cls-5

title: "Troubleshooting: Bluetooth is on, but why does Apple Classroom show the students as 'Offline'?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Troubleshooting", "Bluetooth", "Local Network Permissions"]

**This is usually caused by missing 'Local Network' permissions or an expired teacher certificate.**

## Troubleshooting Checklist:

1. **Check 'Local Network' Privacy (Most Common)**:
   - On both teacher and student iPads, go to **Settings > Privacy & Security > Local Network**.
   - Ensure the toggle for **Classroom** is turned **ON**. If this is off, the app is blocked from "seeing" other devices on the same Wi-Fi.

2. **Reset the Bluetooth Stack**:
   - Toggle Bluetooth OFF and ON for both the teacher and several students. If this fails, a device restart is the next step.

3. **Education Profile Status**:
   - If the entire class is showing as offline, the **"Education Configuration Profile"** issued by your MDM (Jamf Pro) may have expired or been revoked. Contact the ICT department to re-push the education settings.

4. **Wi-Fi Segmentation**:
   - While devices are discovered via Bluetooth, data is exchanged over Wi-Fi. Ensure everyone is on the same **SSID** and that "Client Isolation" is disabled on your campus wireless access points.

---

## File: cls-6.md

---

id: cls-6

title: "Can students leave or remove 'Classroom' classes created by the teacher?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Classroom", "ASM", "Restrictions Profile", "Prevent Leaving"]

**This depends on the source of the class. Classes synced from your school system cannot be removed, but teacher-created ad-hoc classes can—unless restricted via MDM.**

## Difference Between the Two Class Types:

### 1. ASM-synced Classes (Apple School Manager)

- **Source**: Created by administrators in ASM or a Student Information System (SIS) and deployed via MDM.
- **Student Rights**: **Cannot be removed.** These are considered permanent educational configurations. On the iPad under **Settings > Classroom**, students can view class info but will find no "Remove Class" option.

### 2. Teacher-created Classes (Ad-hoc)

- **Source**: Created by a teacher directly in the Classroom app. Students join via an invite code (often referred to as "Nearby Classes").
- **Student Rights**: **Can be removed by default.** In **Settings > Classroom**, students can tap "Edit" in the top right to select **"Remove Class"** and exit management.

## Management Solution (For Teacher-created Classes):

If the school allows teachers to create their own classes but wants to prevent students from leaving them, the administrator must modify the **Restrictions** profile in Jamf Pro. **Uncheck** (disable) the following option:

- **"Allow leaving classes created by the teacher"**

_(Note: This restriction only applies to Supervised devices.)_

---

## File: cls-7.md

---

id: cls-7

title: "The teacher iPad shows 'Waiting for devices...' or 'Offline'. Why aren't commands sending?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

tags:
["Command Latency", "Network Environment", "Bluetooth", "Client Isolation"]

---

**This is usually caused by a "Bluetooth Discovery Failure" or "Wi-Fi LAN communication being blocked."** Apple Classroom relies on two layers of communication to function:

1. **Bluetooth (Discovery)**: Used to find nearby students.

2. **Wi-Fi (Transport)**: Used to transmit commands and screen data.

## Troubleshooting Checklist:

1. **Check for 'Client Isolation' on the Wi-Fi Access Point (AP)**:
   - This is the most common culprit. If your school's AP has this feature enabled, devices connected to the same AP **cannot communicate with each other**.
   - **Symptoms**: The teacher can "see" students online (discovered via Bluetooth), but when attempting to view a screen or send a command, it spins indefinitely (the Wi-Fi packet cannot be delivered).
   - **Solution**: Ask your network administrator to disable "Client Isolation" on the SSIDs used for instruction.

2. **Bluetooth Signal Interference**:
   - If the classroom is crowded with other Bluetooth devices (keyboards, mice, microphones), it may interfere with the Classroom broadcast.
   - **Tip**: Try having the teacher move closer to the student devices to test connectivity.

3. **Confirm Devices are on the Same Subnet**:
   - Both teachers and students must be connected to the same SSID, and their IP addresses must be within the same subnet for screen sharing and data transfer to function correctly.

---

## File: cls-8.md

---

id: cls-8

title: "Will simultaneous downloads by the whole class crash the network? What is 'Content Caching'?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

tags:
["Network Optimization", "Content Caching", "Bandwidth Management", "iCloud"]

---

**Yes. Without a caching mechanism, 30 iPads requesting data individually from the internet will likely saturate your school's outbound bandwidth.**

## The Role of Content Caching:

Content Caching is a feature on a local Mac (e.g., a Mac mini) that stores content from **Apple's official servers** locally.

- **Supported Content**:
  - iOS / iPadOS system updates (the single largest bandwidth consumer).
  - Apps downloaded from the App Store.
  - Course files stored in iCloud Drive (e.g., Keynote, Pages, PDFs).
  - Photos and backups uploaded to iCloud.

- **Unsupported Content**:
  - **YouTube videos, Netflix, and general web browsing.** This traffic does **not** go through Content Caching and will still consume outbound bandwidth.

## Practical Benefits:

When the first student in a class downloads 2GB of GarageBand, a copy is cached on the local Mac. When the remaining 29 students download the same app, it is served directly from that Mac at local network speeds, consuming zero outbound bandwidth from the school.

---

## File: cls-9.md

---

id: cls-9

title: "How do I manage 'Screen Brightness' and 'Auto-Lock' on student iPads?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Device Settings", "Power Saving", "Auto-Lock", "Restrictions Profile"]

**MDM can enforce an 'Auto-Lock' timeout, but it 'cannot' directly control screen brightness.**

According to Apple's MDM protocol specifications:

## 1. Auto-Lock

- **Manageable**: Administrators can use a configuration profile (Passcode Payload) to enforce a specific "Timeout before Auto-Lock" (e.g., force locking after 5 minutes of inactivity).
- **Advice**: Set this to between 2 and 5 minutes. Too short interferes with reading; too long wastes battery.

## 2. Screen Brightness

- **NOT Manageable**: Currently, there is no MDM command to lock brightness at a specific percentage (e.g., 50%). This is by design to ensure accessibility and visibility across varying lighting environments.
- **Advice**: Teachers should instruct students to enable "Auto-Brightness" or manually adjust it via Control Center.

## 3. Wallpaper

- **Manageable**: MDM can unify the Lock Screen and Home Screen wallpapers (Supervised devices only). This helps in identifying school assets visually.

---

## File: cls-10.md

---

id: cls-10

title: "How can a teacher 'Log Out' all students from Shared iPads after class?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Shared iPad", "Log Out Command", "Intelligent Caching"]

**When using 'Shared iPad' deployments, teachers should trigger a 'Log Out' action at the end of class to prepare the devices for the next group of users.**

## How to Operate:

In the **Classroom** app, tap **End Class** in the top left and confirm **Log Out Students**.

## Technical Logic (Based on Apple Official Specs):

### 1. Session Termination

- The log-out command forces the device back to the login screen.
- This prevents upcoming users from accessing the previous student's app windows or local drafts, ensuring data privacy.

### 2. Intelligent Caching

- **Definition**: Data is **not** immediately deleted from the device after log-out; it is retained in the iPad's local storage.
- **Purpose**: If the same student happens to use the **same iPad** next time, the system reads the local cache, enabling a "near-instant login."
- **OS 26 Enhancement**: Under the latest architecture, hardware-accelerated user switching has reduced log-in/out cycle times by approximately 30% compared to older versions.

### 3. Cloud Sync

- **Correction**: Syncing data happens continuously in the background; it is **not** triggered by the log-out action itself. Even if the network is unstable during log-out, data remains safely cached locally. Once the device is connected to Wi-Fi and idle, the system automatically completes the iCloud upload.

## Practical Advice:

While Intelligent Caching exists, if storage runs low, the system will automatically purge the "oldest" user cache. Therefore, critical work should always be saved to cloud storage (Google Drive / OneDrive) to be safe.

---

## File: cls-11.md

---

id: cls-11

title: "Why can't I see the device's real MAC address after iPadOS 17? (Private Wi-Fi Address)"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

tags:
[
"MAC Address",

    "Private Wi-Fi Address",

    "Privacy Features",

    "Network Management",

## ]

**This is because Apple enables the 'Private Wi-Fi Address' feature by default.**

In newer versions of iOS/iPadOS, this feature offers two modes:

- **Fixed Mode** (Default): Provides a unique, random MAC address for a specific Wi-Fi network to prevent cross-network tracking.

- **Rotating Mode**: Changes the MAC address approximately every two weeks for maximum security.

Since the device broadcasts a virtual MAC, traditional network management systems cannot identify the hardware.

## Impact:

- **DHCP Assignments**: If your school DHCP server relies on MAC binding for static IPs, this feature causes IPs to change constantly.
- **Audit Logging**: Firewalls cannot track specific student activity via hardware MAC.

## MDM Solution (School-wide Disable):

1. Edit a **Wi-Fi** configuration profile in Jamf Pro.
2. In the Wi-Fi payload, check **Disable MAC Address Randomization** (also known as Disable Private Address).
3. Deploy this profile to your devices.

## Result:

When the device connects to the _specific SSID_ (e.g., School-Student) defined in the profile, it will be forced to use its **Real Hardware MAC Address**.

_(Note: This only applies to the Wi-Fi network specified in that profile. When students connect to their home Wi-Fi, the privacy feature will automatically re-enable.)_

---

## File: cls-12.md

---

id: cls-12

title: "How do I prevent students from cheating using Apple Intelligence (Writing Tools) or Math Notes?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

tags:
[
"Apple Intelligence",

    "Writing Tools",

    "Math Notes",

    "Anti-Cheating",

    "iOS 18",

## ]

**For devices running iOS 26+, administrators should use 'Declarative Device Management (DDM)' for real-time control.**

## Risk Features and Controls:

- **Writing Tools**: Disable via the DDM **Restrictions** declaration using `allowWritingTools`.
- **Math Notes**: Disable using `allowMathNotes`.
- **Genmoji and Image Playground**: Disable using `allowGenmoji` and `allowImagePlayground`.

## Setup Path (Jamf Pro):

1. Go to **Blueprints** or **Declarations**.
2. Add a **Restrictions** declaration.
3. Block the AI features listed above. DDM is "instant," making it ideal for deployment right before an exam.

## Unmanaged Devices:

If students use personal devices, administrators can turn off Apple Intelligence permissions for Managed Apple Accounts at the tenant level in **ASM (Apple School Manager) > Service Access**.

## Hardware Requirements:

- Apple Intelligence is only supported on devices with **M-series chips** or **A17 Pro and later**.
- _Note: Entry-level iPads (e.g., 10th and 11th Gen with A14/A16 chips) do not support these AI features natively. Focus your management efforts on iPad Air and iPad Pro models with M-series chips._

---

## File: cls-13.md

---

id: cls-13

title: "On a [Shared iPad], can students log in without a password? Is there a 'Guest Mode'?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Shared iPad", "Guest Session", "Library"]

**Yes. Shared iPad supports 'Guest Sessions', allowing users to log in without an account.**

## Features and Limitations:

1. **Login**: Tap the **Guest** button below the user icons on the sign-in screen.
2. **Temporary Storage**: Any Safari history, photos, or documents created during the session are only stored locally.
3. **Wipe on Logout**: This is the most important feature. **Once the user logs out, all guest data is permanently wiped and cannot be recovered.**

## Use Cases:

- Public kiosks in the library.
- Temporary sessions for younger students who haven't yet received Managed Apple Accounts.

## Configuration:

In the Jamf Pro **PreStage Enrollment** settings, find the "Shared iPad" section and check **Allow Temporary Session** (previously known as Guest Login).

---

## File: cls-14.md

---

id: cls-14

title: "How do I manage AirDrop to prevent students from sending distracting images during class?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["AirDrop", "Restrictions", "Classroom Order", "Jamf Teacher"]

**AirDrop is a primary source of classroom distraction. We recommend either constant restrictions via MDM or dynamic control by the teacher.**

## Three Levels of Control:

1. **Fully Disable (Strict - Ideal for Exams)**:
   - In a Restrictions profile, **uncheck 'Allow AirDrop'**.
   - **Result**: The AirDrop icon disappears from the Control Center, and no one can send or receive files.

2. **Force 'Contacts Only' (Balanced)**:
   - Check **Force AirDrop to be treated as unmanaged destination** (or similar "Contacts Only" profile restriction).
   - Since student iPads typically lack each other's contact info, this blocks pranks from strangers while allowing communication with the teacher (if stored as a contact).

3. **Jamf Teacher Dynamic Control (Most Flexible)**:
   - Keep AirDrop enabled normally for file submissions.
   - During a lesson, the teacher can tap **Disable AirDrop** in the Jamf Teacher app. AirDrop is immediately disabled for the class and automatically restores once the session ends.

---

## File: cls-15.md

---

id: cls-15

title: "If a student iPad fails and they use a loaner, will their data still be there?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Backup", "Loaner Device", "iCloud", "Data Restore"]

**This depends on whether the data is stored 'Locally' or in the 'Cloud'.**

## Fate of Data Types:

1. **Cloud Data (Safe)**:
   - If the student routinely saves work to **Google Drive, OneDrive, or iCloud Drive**.
   - Signing into the cloud app or the Managed Apple Account on the new device will cause files to appear automatically.

2. **Local Data (High Risk)**:
   - If the student saves Keynote/Pages projects only to the "On My iPad" location and the school **has not enabled** Managed iCloud backups.
   - That data will disappear along with the failing device and **cannot** be retrieved on a loaner.

## Practical Advice:

Education versions of iCloud provide 200GB of space. Administrators can enable **Allow iCloud Backup** in Jamf Pro. This allows students to select "Restore from iCloud Backup" when signing into a new device, restoring their wallpaper, app layout, and local data.

---

## File: cls-16.md

---

id: cls-16

title: "Students are disabling Wi-Fi or Bluetooth to avoid Apple Classroom monitoring. What can I do?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Bluetooth", "Wi-Fi", "Restrictions", "Classroom Management"]

**This is a common student deflection tactic. Administrators can use MDM to prevent students from 'modifying' these settings, but the logic differs between Wi-Fi and Bluetooth.**

## MDM Countermeasures (Restrictions Profile):

In the Jamf Pro **Restrictions** payload, there are two key options:

1. **Wi-Fi: Force On**:
   - Check **Force Wi-Fi on**.
   - **Result**: If a student attempts to turn it off, the system will immediately toggle it back on, or the button will be grayed out. This ensures the device remains online.

2. **Bluetooth: Lock State (High Risk!)**:
   - Uncheck **Allow modifying Bluetooth settings**.
   - **Result**: This "freezes" the Bluetooth toggle in its **current state**.
   - **⚠️ Severe Risk**: If you push this restriction while a student's Bluetooth is **OFF**, that device’s Bluetooth will be **permanently locked in the off state**. The student cannot turn it on, and the teacher cannot connect via Apple Classroom.

## Practical Advice:

- **Announcement first**: Before pushing a Bluetooth restriction, ensure all students have their Bluetooth **ON**.
- **Remedy**: If a device gets "locked in the OFF state," the administrator must remove the device from the restriction scope, wait for the profile to clear, manually turn Bluetooth ON, and then re-scope it.
- **Scope wisely**: We recommend enforcing this only on school-owned specialized sets; for BYOD, locking Bluetooth may interfere with personal peripherals like headphones.

---

## File: cls-17.md

---

id: cls-17

title: "How do I prevent students from manually deleting apps?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["App Deletion", "Restrictions", "Home Screen Management"]

**You can disable 'Allow App Removal' in a Restrictions profile, but be mindful of the difference between 'Deleting' and 'Removing from Home Screen'.**

## Configuration:

In the Jamf Pro **Restrictions** profile, uncheck **Allow removing apps**.

## Practical Effects:

1. **Deletion Blocked**: When a student long-presses an app icon, the red "Delete App" option will **not appear** in the menu.

2. **Removal from Home Screen (Critical Detail)**:
   - Even if deletion is blocked, students can still select **Remove from Home Screen**, which hides the app in the "App Library" on the far right.
   - **Solution**: To prevent "hidden apps," pair this with a **Home Screen Layout** profile to pin icons permanently to the desktop.

## Practical Advice:

For younger students or shared iPads, we recommend always enabling this restriction to prevent the accidental loss of educational software mid-lesson.

---

## File: cls-18.md

---

id: cls-18

title: "What is the difference between 'Jamf Teacher' and 'Apple Classroom'? Which one should I use?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Jamf Teacher", "Apple Classroom", "Tool Comparison"]

**These are complementary tools. Apple Classroom excels at 'Close-range Monitoring,' while Jamf Teacher is built for 'Remote Restriction'.**

## Feature Comparison:

| Feature           | Apple Classroom                               | Jamf Teacher                                                     |
| :---------------- | :-------------------------------------------- | :--------------------------------------------------------------- |
| **Connectivity**  | **Bluetooth/Wi-Fi** (Proximity required)      | **Wi-Fi/Cellular** (Works remotely)                              |
| **Strengths**     | **View Student Screens**, Launch URLs         | **App Locking**, **Feature Restrictions** (e.g., disable camera) |
| **Locking Level** | Locks to a single app; ends when disconnected | Create "Lessons" allowing multiple apps; others are hidden       |
| **Duration**      | Ends when class session is manually stopped   | Can set a timer (e.g., 40 mins) to auto-restore                  |

## Best Use Cases:

- **During Lesson Monitoring**: Use **Apple Classroom** to keep an eye on active screens.
- **Focus/Exam Mode**: Use **Jamf Teacher**. It is more powerful for hiding irrelevant apps (games, browsers) and doesn't rely on Bluetooth proximity.

---

## File: cls-19.md

---

id: cls-19

title: "Troubleshooting: Apple Pencil won't pair or write. How do I fix it?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Apple Pencil", "Bluetooth", "Hardware Compatibility", "Troubleshooting"]

**Apple Pencil issues are usually caused by 'Model Incompatibility' or 'Bluetooth Pairing Cache' errors.**

## Troubleshooting Flow:

1. **Verify Compatibility (Most Common Error)**:
   - **1st Gen (Lightning)**: Does not work with common USB-C iPads (unless using an adapter).
   - **2nd Gen (Magnetic)**: Only for iPad Air/Pro models with the magnetic charging strip.
   - **USB-C Model**: Does not support magnetic pairing; must be connected via **cable** for initial setup.

2. **Reset Bluetooth**:
   - Go to **Settings > Bluetooth**, find the old Apple Pencil entry, and select **Forget This Device**.
   - Re-attach or re-plug the Apple Pencil to re-pair.

3. **Check the Tip**:
   - If it pairs but won't write, the **tip is often loose**. Try tightening it by turning it clockwise.

4. **MDM Restrictions**:
   - Ensure the MDM "Restrictions" profile does not have **Disallow modifying Bluetooth settings** checked, as this may block new pairing attempts.

---

## File: cls-20.md

---

id: cls-20

title: "Students are using the 'Clock' app for pranks (alarms/timers). Can MDM control this?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Clock App", "Alarm Restrictions", "Classroom Order"]

**MDM cannot detect or block the 'setting' of specific alarms, but you can solve the problem by 'Hiding the App'.**

## Why can't we manage alarms directly?

The Apple MDM protocol does not grant permissions to read or modify local alarm settings. Therefore, an administrator cannot remotely delete a student's set alarms or prevent them from ringing.

## Strategic Solutions:

1. **Hide the Clock App (Most Effective)**:
   - In Jamf Pro, add `com.apple.mobiletimer` (the Clock App Bundle ID) to your **Restricted Software** list or a "Hide Apps" profile.
   - **Result**: The Clock icon disappears. Students cannot set new alarms. _(Note: Alarms set before the app was hidden may still ring; see below.)_

2. **Reset All Settings**:
   - If an alarm is already set and ringing, perform a remote **Reset All Settings** command (this clears settings/alarms without deleting user data).

3. **Jamf Teacher 'App Restrictions'**:
   - During class, teachers can use Jamf Teacher to "Allow only Educational Apps," which temporarily hides the Clock app and prevents interference.

---

## File: cls-21.md

---

id: cls-21

title: "Can a teacher force a student's screen to project to an Apple TV?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["AirPlay", "Apple TV", "Screen Sharing", "Instructional Display"]

**Yes. Using the 'Classroom' app, a teacher can direct any student's screen to project via AirPlay without the student needing to take any action.**

## Operation:

1. In the **Classroom** app, tap on the student.
2. Tap the **AirPlay** icon.
3. Select the **Apple TV** or AirPlay-compatible display in the room.
4. The student's screen will immediately be projected.

## Essential Security Settings:

To prevent students from "hijacking" the screen, administrators should configure the **Apple TV** to **Require Passcode** or be **On-Network only**. In Jamf Pro, you can also enable **Force AirPlay outgoing requests to accept pairing password** in a Restrictions profile to ensure the teacher maintains control.

> [!TIP]
> This is a powerful feature for showcasing student's work in real-time.

---

## File: cls-22.md

---

id: cls-22

title: "The school network is divided into 'Teacher' and 'Student' VLANs. Will Apple Classroom still work?"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

## tags: ["Network Architecture", "VLAN", "Bonjour", "mDNS"]

**By default, no. Apple Classroom relies on Bonjour (mDNS) broadcast packets, which do not cross different subnets or VLANs.**

If your school network separates teachers (e.g., 192.168.10.x) and students (e.g., 192.168.20.x), you must implement a specific network configuration.

## Solution: Configure a Bonjour Gateway (or mDNS Reflector)

The network administrator must configure the core switch or Wireless LAN Controller (WLC) to:

1. **Enable mDNS Bridging/Relay**: This allows Bonjour packets to flow between VLANs.

2. **Permit Specific Services**: Specifically allow `_classroom._tcp` (Apple Classroom) and `_airplay._tcp` (AirPlay).

## Alternative Workaround:

If the network hardware does not support mDNS relay, the simplest solution is to have the teacher connect their iPad to the **'Student Wi-Fi'** SSID. This places both parties in the same broadcast domain, enabling a seamless connection.

---

## File: cls-23.md

---

id: cls-23

title: "iPads are making noise and disrupting class. Can the teacher 'Mute All' at once?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["Mute", "Volume Control", "Classroom Order"]

**Yes, the teacher can 'Mute' the whole class with one click, but they cannot 'Unmute' them remotely.**

## Operation:

Within the **Classroom** app's main screen, tap the **Mute** icon. The media volume on all student iPads will immediately drop to zero.

## Technical Restriction (Privacy Policy):

- **Down, not Up**: For privacy and security reasons, the Apple MDM protocol **does not allow** remote volume increases or unmuting. This prevents potential abuse, such as an administrator blasting loud audio at night.
- **Restoration**: After a mute command is sent, students must **manually** use the physical volume buttons on their iPads to turn the sound back up. The teacher cannot do this for them.

---

## File: cls-24.md

---

id: cls-24

title: "How do I prevent students from getting distracted by 'Windowed Apps' in iPadOS 26?"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

tags:
[
"Windowed Apps",

    "Multitasking",

    "Focus",

    "iPadOS 26",

    "Classroom Management",

## ]

**iPadOS 26 introduces a new 'Windowed Apps' multitasking system, allowing apps to appear in resizable, overlapping windows. While great for productivity, it can lead to distraction. Schools can manage this via segmented MDM restrictions or use the 'Classroom' app for temporary focus locking.**

## Multitasking in iPadOS 26

- **Full Screen**: Default single app view.
- **Windowed Apps**: Resizable windows that can overlap and move.
- **Split View**: Two apps side-by-side.
- **Slide Over (v26.2+)**: A floating window pinned above others.

## Three Management Strategies

### Strategy 1: Fully Disable Multitasking (Best for lower grades)

Younger students may find the windowed interface confusing or use it to hide apps from the teacher.

- **Path**: Jamf Pro > Configuration Profiles > Restrictions > Functionality.

- **Action**: Uncheck **Allow Multitasking**.
- **Effect**: The iPad returns to a strict single-app-at-a-time interface. Simple and intuitive.

### Strategy 2: Temporary Lock during Lessons (Best for middle/high school)

Allow multitasking normally, but lock it down when focus is required.

- **Tool**: **Apple Classroom** or **Jamf Teacher**.

- **Action**:
  1. Select the class or specific students.
  2. Select **Open App** and check **Lock in App after opening**.
  3. Select the required app (e.g., Keynote).

- **Effect**: The student’s iPad is locked into that specific app in Full Screen mode. They cannot switch to windows or other apps until the teacher clicks "Unlock."

### Strategy 3: Digital Literacy & Guided Use

Maintain multitasking but enforce class norms.

- **Approach**: Establish a "Courseware Only" policy.

- **Monitoring**: Use the "Screen View" feature in Apple Classroom to perform spot checks.
- **Education**: Teach students multitasking gestures (like the three-finger swipe up) to manage their workspace professionally.

## Comparison Table

| Strategy           | Ideal For                | Management Effort                 |
| :----------------- | :----------------------- | :-------------------------------- |
| **Fully Disable**  | Elementary, strict labs  | Low (One-time setup)              |
| **Temporary Lock** | Middle school, mixed-use | Medium (Requires teacher action)  |
| **Guided Use**     | High school, BYU/1:1     | High (Requires ongoing education) |

---

## File: cls-25.md

---

id: cls-25

title: "Classroom vs. Schoolwork apps: What's the difference, and which should teachers use?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

tags:
[
"Schoolwork",

    "Classroom",

    "Feature Comparison",

    "Teaching Tools",

    "Assignment Management",

## ]

**The 'Classroom' app is for active classroom management (the 'Now'), while the 'Schoolwork' app is for assignment distribution and progress tracking (the 'Long-form'). Most successful teachers use both in tandem.**

## Core Comparison Table

| Feature             | Classroom (v6.0+)                                  | Schoolwork                                       |
| :------------------ | :------------------------------------------------- | :----------------------------------------------- |
| **Primary Goal**    | Classroom order and guidance.                      | Handing out materials, collecting work, grading. |
| **Real-time Level** | **High** (Immediate).                              | **Low** (Asynchronous).                          |
| **Proximity**       | Supports local and remote classes (Cloud classes). | **Unlimited** (Distance learning).               |
| **Screen View**     | ✅ (View student screens in real-time).            | ❌                                               |
| **Device Lock**     | ✅ (Lock screen or lock into a specific app).      | ❌                                               |
| **File Exchange**   | AirDrop or Cloud share.                            | ✅ End-to-end assignment workflow.               |
| **Tracking**        | Current app usage only.                            | ✅ Progress down to the minute.                  |
| **Teacher Device**  | iPhone, iPad, Mac.                                 | iPad.                                            |
| **Student Device**  | iPad, Mac.                                         | **iPad** (Optimized for Apple Pencil).           |

## Teaching Scenarios

### Scenario 1: Starting the Lesson

- **Use Classroom**:
  - Use "Navigate" to push the day's news article or website to everyone's iPad.
  - Use "Lock" to freeze their screens on that page for a 5-minute introduction.

### Scenario 2: Individual Practice

- **Use Schoolwork**:
  - Send a "Handout" containing a PDF worksheet and a link to a tutorial video.

- **Use Classroom**:
  - Unlock the iPads.
  - Use "Screen View" to remotely monitor if anyone has drifted off-task to a game or social media.

### Scenario 3: Homework & Assessment

- **Use Schoolwork**:
  - Students finish their worksheet at home and upload it back to the handout.
  - Teacher grades and provides feedback.
  - The teacher checks the dashboard and notices a student spent 3 hours on a math problem, indicating a need for intervention.

## Summary Advice

- If you need to manage order, push web pages, and watch screens ➡️ Use **Classroom**.
- If you need to distribute, collect, and grade assignments ➡️ Use **Schoolwork**.

---

## File: cls-26.md

---

id: cls-26

title: "Will the 'AirDrop Code' in iOS 26.2 affect school management policies? Can students use it to bypass restrictions?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

## tags: ["AirDrop", "Code", "Privacy", "Policy Adjustment", "iOS 26.2"]

**The 'AirDrop Code' is a privacy enhancement in iOS 26.2. It does NOT allow students to bypass MDM-enforced 'Disable AirDrop' settings. Your existing security policies remain effective.**

## How AirDrop Codes Work

In iOS/iPadOS/macOS 26.2, a 6-digit temporary authorization code can be used to establish a "trusted relationship" between two people who are not in each other's contacts.

- **Security**: This is a way to safely add "Known Contacts" temporarily (for 30 days) without exchanging permanent phone numbers or emails.

- **Termination**: The relationship automatically expires after 30 days, or can be manually "forgotten" in the Contacts app.

## Impact Analysis for Schools

### Scenario 1: MDM set to 'AirDrop - Receiving Off'

- **Result**: AirDrop is completely disabled.
- **Impact of Code**: **None**. Even if a student generates a code, the AirDrop system remains powered down and unreachable.

### Scenario 2: MDM set to 'AirDrop - Contacts Only'

- **Result**: Students can only swap files with people in their address book.
- **Impact of Code**: **Applicable**. Students can use an AirDrop Code to temporarily treat a classmate as a "Known Contact" for 30 days. This makes a lot of sense for collaborative projects where students don't need to be permanent friends. It is a privacy-friendly way to enable file sharing without relaxing the "Everyone" restriction.

### Scenario 3: MDM set to 'AirDrop - Everyone for 10 Minutes'

- **Result**: Open to all.
- **Impact of Code**: Irrelevant, as the system is already open.

## Administrative Advice

1. **For Exams**: Keep AirDrop set to **'Receiving Off'** via MDM. This renders all codes useless and prevents illicit file sharing.
2. **For Daily Lessons**: **'Contacts Only'** is the recommended setting. The AirDrop Code feature actually makes this setting _more_ useful for schools, as students can share files for class projects without the privacy risk of exchanging personal contact details.
3. **Governance**: Remind students that an AirDrop Code is a key—only give it to people you trust to send you academic material.

---

## File: cls-27.md

---

id: cls-27

title: "How does the 'Audio Accessory Configuration' in iOS 26 solve AirPods pairing confusion in labs?"

category: "Section 4: Classroom Management & Instructional Tools"

important: false

tags:
[
"AirPods",

    "Audio Accessories",

    "Shared iPad",

    "iOS 26",

    "Headset Management",

## ]

**In a 'Shared iPad' environment, pairing Bluetooth headsets has historically been a major pain point. Previously, AirPods would try to sync to a student's iCloud account, leading to disconnections or cross-room interference when the next student used the same iPad.**

## The 'Audio Accessory Configuration' Solution

Introduced in **iOS 26 (Tahoe)**, this MDM payload completely changes how accessories behave in a shared setting.

## Key Logic:

1. **Ephemeral Pairing**: When the MDM pushes the `com.apple.configuration.audio-accessory.settings` payload, the iPad allows AirPods or Beats to pair but **flagged as temporary**.
2. **No iCloud Sync**: The pairing record is **not** written to the iCloud Keychain. It lives only in the local RAM of that session.
3. **Logout Purge**: The moment the current student logs out of the Shared iPad, the pairing record is deleted.
4. **Ready for Next**: When the next student logs in, the iPad is a "clean slate." They can pair their own headset without fighting for the connection with the previous user.

## Why this matters for the classroom:

- **Language Labs**: Students can bring their own headsets without corrupting the school iPad's Bluetooth list.
- **Privacy**: Students don't need to worry about their classmates inheriting their headset name or history.
- **Sanity**: Teachers no longer have to spend 10 minutes helping 5 students "Forget this Device" so they can reconnect.

## Deployment Tip:

Make sure your Apple Classroom "Bluetooth" requirement is enabled. If Bluetooth is disabled via MDM, this accessory payload will not work.
