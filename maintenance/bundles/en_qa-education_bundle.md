---
File: edu-01.md
---

---

id: edu-01

title: "The VPN icon is missing on iPadOS. Are network filtering and usage reporting still working?"

category: "Section 8: Education Scenarios & FAQ"

important: true

## tags: ["MOE Project", "VPN", "Jamf Trust", "Content Filtering", "Compliance"]

**Yes, everything is working perfectly. In modern iPadOS versions (17 through 26), Jamf Trust uses "DNS Proxy" and "Content Filter" technology which does not require a VPN tunnel.** This architectural shift is intentional and was implemented to improve device battery life and network stability across school campuses.

## Why the Icon is Gone:

- **Legacy (iOS 16 & older)**: Used "Always-On VPN" which displayed a permanent VPN icon.
- **Modern (iOS 17 - 26)**: Uses native **Content Filtering APIs**. These operate at the system level without needing a separate VPN connection, so the icon is no longer displayed in the status bar.

## How to Verify Protection is Active:

1. **Open the Jamf Trust App**: If it shows a **Green Shield (Protected)**, your data is being recorded and filtered correctly.
2. **Test the Filter**: Try navigating to a known blocked category (e.g., a gaming site) in Safari. If the page is blocked, the filter is active.
3. **Check Jamf Pro**: Reconfirm that the "DNS Proxy" and "Content Filter" profiles are marked as "Installed" in the device inventory.

## New for 2026: Return to Service (RTS) Protection

In macOS and **iOS 26**, these network filters are now protected by **RTS (Return to Service)**. Even if a device is erased, the management configuration is baked into the reactivation process, ensuring the device is "Born Protected" the moment it joins a network.

## Institutional Advice:

Occasionally, the Jamf Trust app might show a red warning if a passcode is missing or the OS is out of date. While you should encourage students to update, **these local warnings do not stop the usage statistics from being reported to the school dashboard.**

---

## File: edu-02.md

---

id: edu-02

title: "What is 'Shared iPad' and how does it differ from a standard iPad? When should we use it?"

category: "Section 8: Education Scenarios & FAQ"

important: false

## tags: ["Shared iPad", "Multi-User", "Deployment Modes", "iCloud"]

**Shared iPad allows multiple students to log into the same physical device using their individual Managed Apple Accounts. Their documents and app data are isolated and synced to iCloud.** This is the ideal solution for computer labs or "trolley systems" where iPads are moved between different year groups throughout the day.

## Comparison Table:

| Feature                  | Standard iPad (1-to-1)    | Shared iPad (Trolley/Lab)             |
| :----------------------- | :------------------------ | :------------------------------------ |
| **User Ownership**       | Assigned to one student   | Rotates between students              |
| **Data Storage**         | Stored locally on device  | **Synced to the Cloud**               |
| **Apple Account**        | Optional                  | **Mandatory (Managed Apple Account)** |
| **Login Speed**          | Instant (FaceID/Passcode) | Slower (Requires User Download)       |
| **Hardware Requirement** | Any modern iPad           | **128GB+ Storage Recommended**        |

## Modern Features for 2026:

- **Proximity Login**: Students can now tap their iPhone or Apple Watch near a Shared iPad to instantly select their profile and authenticate, saving time at the start of a lesson.
- **Return to Service (RTS) Optimization**: On **iOS 26**, the system performs an "Instant Flush" of the previous user's local cache when they log out, ensuring the next student has immediate access to maximum storage capacity.
- **Guest Access**: You can enable a "Guest Mode" where data is completely deleted the moment the student logs out. This is perfect for visiting students or parent demonstration days.

## Institutional Advice:

Because Shared iPad requires downloading user data from the cloud, it places a high demand on your school’s internet bandwidth. We strongly recommend implementing a **Content Caching** server to speed up the login process for large classes.

---

## File: edu-03.md

---

id: edu-03

title: "What are the configuration differences between Teacher iPads and Student iPads?"

category: "Section 8: Education Scenarios & FAQ"

important: false

## tags: ["Roles", "Permissions", "Group Policy", "Classroom"]

**Teacher and Student devices are usually assigned different management profiles, app catalogs, and restriction levels to provide teachers with the flexibility needed for classroom instruction.** In Jamf Pro, we use Smart Groups to separate these roles and ensure that the right rules are applied to the right person.

## Key Policy Differences:

| Setting                 | Teacher iPad                        | Student iPad                    |
| :---------------------- | :---------------------------------- | :------------------------------ |
| **Apple Intelligence**  | **Full Access** (Rewrite/Summarize) | **Restricted** (Summarize Only) |
| **AirDrop**             | Unrestricted                        | Restricted or "Teacher-Only"    |
| **App Installations**   | Allowed via Self Service Pro        | Managed strictly by IT          |
| **Content Filtering**   | Relaxed (Standard Web)              | Strict (Child Safety Enforced)  |
| **Apple Classroom**     | **Teacher Role** (Controller)       | **Student Role** (Managed)      |
| **Jamf Teacher App**    | Create Lessons / Clear Passcodes    | Receive Lessons                 |
| **Zero-Wipe Migration** | Available for data transfer         | Restricted to IT staff          |

## Implementation in Jamf Pro:

- **Automatic Naming**: We recommend using a prefix like `T-` (Teacher) and `S-` (Student) during enrollment.
- **Scoped Profiles**: Create a "Student Restrictions" profile and scope it _exclusively_ to the Student Smart Group. Create a separate, "Lighter Restrictions" profile for staff.
- **App Deployment**: Some specialized creative or assessment apps (like Goodnotes or Exam.net) might be deployed to all devices, while administrative tools (like ManageBac or PowerSchool Teacher) are scoped only to staff.

## Institutional Advice:

Periodically audit your Smart Groups. When a staff member leaves or replaces their hardware, ensure their new device is correctly tagged as a "Teacher" asset to avoid giving students unrestricted access to staff-level tools.

---

## File: edu-04.md

---

id: edu-04

title: "How do we quickly reset iPads between different classes or rotating groups?"

category: "Section 8: Education Scenarios & FAQ"

important: false

## tags: ["Classroom Management", "SOP", "Handoff", "RTS"]

**The best method depends on how much time you have between lessons. For the fastest handoff, use 'Shared iPad' mode or the 'Return to Service' remote command.**

## Scenario A: Shared iPad Mode (Most Common)

If your iPads are configured as **Shared iPads**:

1. **End of Lesson**: Student simply taps "Log Out."

2. **Handoff**: The iPad returns to the login screen. The next student arrives, selects their name/account, and is ready in under 60 seconds.

## Scenario B: Guest Mode (Temporary Use)

If the visiting student doesn't have a Managed Apple Account:

1. Tap **"Guest"** on the login screen.

2. Data is automatically wiped the moment the student logs out, leaving a clean device for the next guest.

## Scenario C: Deep Clean (Return to Service - 2026 Enhanced)

If you need to completely erase a device (e.g., between different year levels) but want it ready for the next student to unbox and use immediately:

1. **Trigger Remote Wipe**: In Jamf Pro, send the "Erase Device" command.

2. **Enable RTS**: Check the **"Return to Service"** option and include the campus Wi-Fi profile.
3. **Preserve Apps**: Check the box to **"Preserve Managed Apps."**
   - **Result**: The iPad wipes its data but **does not delete the large apps** (like GarageBand or iMovie). It automatically rejoins Wi-Fi, skips all setup screens, and returns to the home screen ready for use in **3-5 minutes**.

## Institutional Advice:

For 1-to-1 environments where a student is just borrowing a device for one period, remind them to log out of their Google or Microsoft accounts in Safari before handing the device back. This prevents the next student from accessing the previous user's private school records.

---

## File: edu-05.md

---

id: edu-05

title: "The iPad feels slow or laggy. Is it faulty? How do we fix it?"

category: "Section 8: Education Scenarios & FAQ"

important: false

## tags: ["Performance", "Troubleshooting", "Maintenance"]

**Most 'slowness' is caused by software fatigue rather than hardware failure. Regular maintenance steps can restore the device to its original speed.**

## Troubleshooting Checklist:

1. **Reboot (The Most Important Step)**:
   - iPads are often left on for weeks at a time. A simple **Hard Restart** clears out memory leaks and hung background processes. **Tip**: We recommend every student reboots their iPad once a week.

2. **Storage Overload**:
   - Check **Settings > General > iPad Storage**. If the device has less than **2GB** of free space, iPadOS will slow down significantly as it struggles to manage temporary files. Ask the student to delete large personal videos or unused games.

3. **Background Activity (Apple Intelligence)**:
   - On newer iPads (M-series, iPadOS 18-26), the system may be indexing data for school-managed AI features. If the iPad is warm and slow after a major update, plug it into power and leave it on Wi-Fi overnight to finish the process.

4. **Browser Fatigue**:
   - Students often have 50+ tabs open in Safari. Closing all tabs and clearing the history/metadata (**Settings > Safari > Clear History**) can instantly improve web-based learning performance.

5. **Operating System Version**:
   - Ensure the device is running the latest allowed version of iPadOS. Apple regularly releases patches that optimize performance for older hardware.

## When to contact the ICT Support Team:

If the device is still slow after a reboot and a storage cleanup, or if the screen is behaving erratically (ghost touching), it may have a failing digitizer or battery. At this point, the device should be sent to the ICT Support Team for a hardware diagnostic.

---

## File: edu-06.md

---

id: edu-06

title: "Can I sign into my personal Apple Account to download games I bought before?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Apple Account", "Personal vs. School", "Account Policies"]

**This is strongly discouraged, and most school policies explicitly forbid it. Signing into a personal Apple Account can lead to data mixing, Activation Lock risks, and VPP licensing conflicts.** This is a common question from students and even some teachers. From a management and technical perspective, doing so introduces multiple risks.

## Why it is Forbidden:

| Risk                            | Description                                                                                                        |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| **Data Mixing**                 | Once iCloud is enabled, your personal photos, contacts, and messages may sync to this public/school device.        |
| **Managed Account Enforcement** | **2026 Feature**: Schools can now lock devices to only allow login with **Managed Apple Accounts**.                |
| **Activation Lock**             | If you sign in and enable "Find My," the device may become bricked (Activation Locked) and unusable by the school. |
| **Management Difficulty**       | MDM cannot manage or track personal apps.                                                                          |

## 2026 Authentication Trends:

In the iOS 26 environment, teachers and students are advised to use school-provided **Managed Apple Accounts**. These accounts support **Tap to Login** for fast access and ensure strict separation between school and personal data within the Files app.

## If you absolutely must use a personally purchased app:

> ⚠️ **Exception Handling (Requires Administrator Approval)**
>
> 1. **Sign in to the App Store ONLY**: Go to **Settings > App Store** and sign in with your personal account. **DO NOT** sign in to the main iCloud account at the top of the Settings app.
> 2. **Sign Out Immediately**: Once the download is finished, sign out from **Settings > App Store**.
> 3. **Do NOT enable "Find My"**.
> 4. **Record for Audit**: Inform the MDM administrator which app was installed for tracking.
>
> Even following these steps can cause issues. **It is always recommended to request the school to purchase the app via VPP for deployment.**

## Practical Advice for Students:

School iPads are educational tools, not personal gaming consoles. If you need personal apps, please use your own private device.

---

## File: edu-07.md

---

id: edu-07

title: "I heard MDM drains the battery quickly. Is this true?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Battery", "Myths", "MDM", "Power Consumption"]

**This is a myth. MDM itself consumes very little resources and does not significantly impact battery life. The real battery drainers are typically screen brightness, video streaming, and GPS navigation.** Actually, MDM operates in an extremely energy-efficient way.

- **Declarative Management (DDM)**: **2026 Mainstream Tech**. Devices now monitor their own state (e.g., whether a profile is active) and only report to the server when a "change" occurs. This drastically reduces the power loss associated with traditional MDM "polling."

- **No Persistent Connection**: MDM does not need to maintain a continuous network connection or VPN tunnel.

## Jamf Trust Power Consumption:

The Jamf Trust app, which handles content filtering and data reporting, also uses very little power:

- It uses DNS Proxy technology at the system level.

- Background processes are highly optimized.
- Under **Settings > Battery**, Jamf Trust typically accounts for less than 1% of usage.

## The Real Battery Killers:

| Factor                                      | Impact           | Solution                                                    |
| :------------------------------------------ | :--------------- | :---------------------------------------------------------- |
| **Max Screen Brightness**                   | ⚡⚡⚡ Very High | Lower brightness to 50% or enable "Auto-Brightness."        |
| **Long Video Streaming (YouTube, Netflix)** | ⚡⚡⚡ Very High | Limit usage time.                                           |
| **GPS Navigation Apps**                     | ⚡⚡⚡ Very High | Close when not in use.                                      |
| **Background App Refresh**                  | ⚡⚡ Medium      | Disable in **Settings > General > Background App Refresh**. |
| **Email Push**                              | ⚡ Low           | Change to "Fetch" mode.                                     |
| **AirDrop Searching**                       | ⚡ Low           | Set to "Contacts Only" or "Off."                            |

## How to Check Battery Usage:

1. Go to **Settings > Battery**.
2. View usage for the "Last 24 Hours" or "Last 10 Days."
3. Identify which apps are consuming the most power.
4. If Jamf Trust or "MDM" exceeds 5%, contact your administrator.

## Practical Advice: Battery Health

If a device is several years old and doesn't last as long as it used to, it is likely due to battery aging. You can check battery cycle counts and health via Jamf Pro to evaluate if a replacement is needed.

---

## File: edu-08.md

---

id: edu-08

title: "I received an iOS update notification. Can I update immediately or should I wait?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["System Updates", "Stability", "iOS Updates"]

**It is recommended to wait for a school announcement before updating. New iOS versions can sometimes cause compatibility issues with teaching apps or MDM functions. The school will coordinate a mass update after verification.** While Apple releases updates every few weeks for security and features, "newest" isn't always "best" for an educational environment.

## Why Immediate Updates are Discouraged:

| Potential Risk        | Description                                                                                    |
| :-------------------- | :--------------------------------------------------------------------------------------------- |
| **App Compatibility** | Third-party teaching apps may not be optimized for the new version, leading to crashes.        |
| **MDM Instability**   | In rare cases, new versions may have temporary issues with certain Jamf Pro commands.          |
| **Unexpected Bugs**   | New versions may have bugs that Apple hasn't discovered yet; fixes often come weeks later.     |
| **Update Failures**   | Interruptions (low battery, network loss) during update can leave the device in Recovery Mode. |

## The "N-1" Principle:

Many IT teams follow the "N-1" principle: keeping production environments (student/teacher devices) on the previous stable version (N-1) rather than the absolute latest (N). Updates are only pushed when:

- The new version is fully tested.

- Critical app developers confirm compatibility.
- Security patches are deemed essential.

## School Update Strategies:

1. **Update Deferral**: MDM can set "Skip software updates for X days," so devices don't see the notification immediately.
2. **Pilot Groups**: Updates are pushed to IT or volunteer devices first for a week of validation.
3. **Scheduled Updates**: Updates are pushed via MDM during non-teaching hours (nights or weekends).
4. **Version Blocking**: If a specific version has a known bug, it can be temporarily blocked.

## Practical Advice:

- **Don't click "Install Now"**. Choose "Later" or "Tonight" (and then disable auto-install in Settings).
- **Wait for School Announcement**. IT will usually release a "Clear to Update" notice.
- **Ensure power is >50% and Wi-Fi is stable before updating.**

---

## File: edu-09.md

---

id: edu-09

title: "How do I project my iPad screen to a traditional TV or a classroom without Apple TV?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Projection", "Adapters", "AirPlay", "HDMI"]

**You can use a wired HDMI adapter (most stable) or third-party wireless projection software. For the best experience, we recommend the school acquire an Apple TV.**

## Option 1: HDMI Adapters (Highly Recommended)

**Required Equipment**:

- **Lightning Models**: Lightning Digital AV Adapter (Original Apple or MFi certified).

- **USB-C Models**: USB-C Digital AV Multiport Adapter.
- **HDMI Cable**.

**Steps**:

1. Plug the adapter into the iPad.

2. Connect one end of the HDMI cable to the adapter and the other to the TV/Projector.
3. Switch the TV input to the correct HDMI source.
4. The iPad screen will automatically mirror.

**Pros**:

- Near-zero latency, great for live demos.

- No network required.
- Compatible with any TV/Projector with an HDMI port.

**Cons**:

- Requires carrying an adapter and cable.

- The iPad is tethered to the cable length.

---

## File: edu-10.md

---

id: edu-10

title: "Why is the App Store missing? How do I download apps?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["App Store", "Self Service", "Restrictions"]

**This is an intentional setting by the school. The App Store is hidden to prevent students from downloading unauthorized apps. Use the 'Self Service' app to install school-approved applications instead.** Finding the App Store missing is a result of MDM restrictions, not a malfunction.

## Why the App Store is Hidden:

| Reason                 | Description                                                           |
| :--------------------- | :-------------------------------------------------------------------- |
| **Prevent Gaming**     | Keeps students focused on learning tools.                             |
| **Consistency**        | Ensures all devices have the same approved apps for teaching.         |
| **Account Safety**     | Prevents data mixing or Activation Lock from personal Apple Accounts. |
| **License Compliance** | Ensures all apps are legally licensed via VPP.                        |

## How to Install Apps: Using Self Service

**Self Service** is Jamf's "School App Store." Administrators choose which apps are available for students and staff.

**Steps**:

1. Find the **Self Service** app on the Home Screen (usually the school logo or Jamf icon).

2. Open the app and browse available resources.
3. Find the app you need and tap **Install**.
4. The app installs automatically **without needing an Apple Account password**.
5. Wait for the app to appear on the Home Screen.

## Benefits of Self Service:

- **No Password Required**: Uses silent VPP licensing.
- **Vetted Apps**: Only school-approved apps appear.
- **Instant Updates**: Admins can push new apps or updates remotely.

## If an App is missing from Self Service:

1. **Submit a request via the School Support Portal or to your Instructor**: Explain why it's needed for class.
2. **Institutional Purchase**: The school buys licenses via ASM/VPP.
3. **Deployment**: Once approved, the admin adds it to Self Service for everyone.

## Troubleshooting:

- **Self Service won't open**: Check your internet connection and try restarting the iPad.
- **Install button is grey**: Licensing may be low or a background process is active; try again later.
- **Can't find Self Service**: Check inside folders or the second page. You can also use Spotlight to search for it.

---

## File: edu-11.md

---

id: edu-11

title: "What is the difference between 'Guided Access' and 'Single App Mode'?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Locking", "Comparison", "Guided Access", "Single App Mode"]

**Both features lock the iPad into a single application, but they offer different levels of control: Guided Access is manually enabled by a user (e.g., a teacher), while Single App Mode is enforced remotely via MDM.** These two methods are often confused, but they serve different purposes:

## Feature Comparison:

| Feature                | **Guided Access**                        | **Single App Mode (ASAM)**                                 |
| :--------------------- | :--------------------------------------- | :--------------------------------------------------------- |
| **Activation**         | Manual (Triple-click Power/Home button)  | Remote MDM command or App-triggered                        |
| **Primary Use**        | Classroom focus, early childhood         | **High-stakes Testing (CBT)** , Kiosks                     |
| **Student Exit**       | Possible (if PIN is known)               | **Impossible to exit manually**                            |
| **AI Feature Control** | Requires manual Accessibility adjustment | **Automatically disables system AI** (e.g., Writing Tools) |
| **After Reboot**       | Disables (must be restarted)             | **Remains Locked**                                         |
| **MDM Required**       | ❌ No                                    | ✅ Yes                                                     |

## Practical Advice:

- **Use Guided Access** for quick, low-stakes classroom management where a teacher needs students to stay in one app for a short duration.
- **Use Single App Mode** for formal exams or public-facing informational kiosks where manual tampering must be completely prevented.

---

## File: edu-12.md

---

id: edu-12

title: "How do students submit their work (Keynote/Pages) to the teacher?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Submission", "File Sharing", "Google Drive"]

**The best method is via cloud storage (Google Drive, OneDrive, or iCloud Drive). Other options include AirDrop, Google Classroom assignments, or a school-designated submission portal.** In a digital learning environment, a smooth submission flow is key to efficiency.

## Method 1: Google Drive (Highly Recommended)

Ideal for schools already using Google Workspace for Education.

1. Ensure **Google Drive** and relevant apps (Docs/Slides) are installed.

2. In Keynote/Pages, tap **Share** (the share icon).
3. Select **Save to Files**.
4. In the Files app, select **Google Drive** (Enable it via the "..." menu if it doesn't appear).
5. Save to the folder designated by the teacher.

## Method 2: Google Classroom Assignments

If the teacher has created an "Assignment" in Classroom:

1. Open the Classroom app and tap the assignment.

2. Tap **Add Attachment**.
3. Select the file from the **Files** app.
4. Tap **Hand In**.

## Method 3: AirDrop (In-person)

Best for small groups or immediate collection.

1. Open the project and tap **Share**.

2. Select **AirDrop**.
3. Tap the teacher's iPad name.

**Pros**: Fast, works without internet.

**Cons**: Noisy in large groups; files must be accepted one by one.

## Recommended Export Formats:

| Goal                | Recommended Format                                       |
| :------------------ | :------------------------------------------------------- |
| **Retain Editing**  | Native format (.key, .pages) or Microsoft (.pptx, .docx) |
| **Read/Print Only** | PDF                                                      |
| **Video Project**   | Movie (.mov)                                             |

## Troubleshooting:

- **Cannot find Google Drive in Files app**: Open the **Files** app > Tap "..." > **Edit** > Toggle on **Google Drive**.
- **File too large**: Lower video resolution or share via a cloud link instead.

---

## File: edu-13.md

---

id: edu-13

title: "Can I use a mouse or a Bluetooth keyboard with my iPad?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Mouse", "Keyboard", "Accessibility", "Peripherals"]

**Yes. iPadOS 13.4 and later fully support mice, trackpads, and Bluetooth/USB keyboards, providing a laptop-like experience.**

## Keyboard Support:

Keyboards work instantly upon pairing. Command-key shortcuts (like Cmd+C/V) function similarly to a Mac.

## Mouse and Trackpad Support:

1. **Pairing**: Go to **Settings > Bluetooth** and put your mouse in pairing mode.
2. **Cursor**: Once connected, a circular cursor appears on the screen. It "snaps" to buttons and changes shape (e.g., turning into a bar for text editing).
3. **USB Mice**: USB-C iPads support wired mice directly (or via a USB-A adapter). Lightning iPads require a "Lightning to USB Camera Adapter."

## Customization:

Go to **Settings > Accessibility > Pointer Control** to adjust the cursor size, contrast, scrolling speed, and "Secondary Click" (Right-click) behavior.

---

## File: edu-14.md

---

id: edu-14

title: "Why is my iPad suddenly requiring a 6-digit (or longer) passcode?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Passcode Policy", "Security", "Compliance"]

**This is because an administrator has deployed a 'Passcode Configuration' profile to meet school security standards.**

## Common Requirements:

1. **Minimum Length**: Increased from the default 4 digits to 6 or more.
2. **Complexity**: May require letters or forbid simple sequences (like "123456").
3. **Grace Period**: Once the profile is pushed, you typically have 60 minutes to update your passcode. If ignored, the device will force a pop-up prompt until the requirement is met.

## Practical Advice:

Choose a passcode that is easy to remember but hard for others to guess. If you forget your passcode, you must contact the ICT Support Team to have the device cleared via MDM.

---

## File: edu-15.md

---

id: edu-15

title: "Does enabling 'Lost Mode' infringe on my privacy?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Lost Mode", "Privacy", "Location Tracking"]

**No. Lost Mode is designed specifically for asset recovery. Location services are only activated while the device is officially marked as 'Lost' by an administrator.**

## How it Works:

1. **Enforcement**: Even if a user has disabled Location Services, the MDM forcibly enables them upon receiving the "Lost Mode" command.
2. **Notification**: The device screen locks and displays a custom message (e.g., "This iPad is lost. Please contact the ICT Support Team at...") and a phone number.
3. **Privacy Guard**: Administrators can only receive coordinates while Lost Mode is active. Once Lost Mode is disabled, the device returns to the user’s previous privacy settings, and the administrator can no longer track the device.

---

## File: edu-16.md

---

id: edu-16

title: "Why can't iPads install 'APKs' (or third-party apps) like Android devices?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Security", "Sideloading", "App Store"]

**To ensure device security and stability, Apple restricts app installation to the App Store or trusted organizational MDM channels (preventing 'Sideloading').**

## Rationale:

- **Malware Prevention**: Third-party installation files (IPA) can contain trojans or keyloggers.
- **System Stability**: Unvetted apps can cause battery drain, system crashes, or data leaks.
- **Auditing**: School-issued devices must maintain authorized license counts and updates; manual sideloading makes asset management impossible.

## Practical Advice:

If an app is needed for teaching, please submit a request to the IT Coordinator. Once vetted for security, it will be purchased via VPP and deployed to your device automatically.

---

## File: edu-17.md

---

id: edu-17

title: "Why is the 'Screen Recording' button missing or grayed out on student iPads?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["Screen Recording", "Restrictions", "Control Center"]

**This is typically because 'Screen Recording' is restricted in the school's MDM profile, or the button simply hasn't been added to the Control Center.**

## Troubleshooting Steps:

### 1. Check MDM Restrictions (Most Common)

- Many schools disable **Allow screen recording** in the **Restrictions** profile to prevent students from recording lessons or non-educational content.
- **Fix**: If a teacher requires this for a project, the IT Coordinator must enable it in Jamf Pro for that specific classroom group.

### 2. Check Control Center Settings

- If not restricted but still missing, the button might not be in the menu.
- **Fix**: Go to **Settings > Control Center** and tap the green **+** next to **Screen Recording**.

### 3. Check Screen Time

- If a student (or parent) enabled local Screen Time restrictions, this can also block the feature. Check **Settings > Screen Time > Content & Privacy Restrictions**.

---

## File: edu-18.md

---

id: edu-18

title: "The iPad shows it's connected to Wi-Fi, but I can't open any web pages. Why?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["DNS", "DHCP", "Network Failure", "Troubleshooting"]

**This is often a 'False IP' or 'DNS failure' rather than a hardware defect in the iPad.**

## Troubleshooting Steps:

### 1. Verify IP Address

- Go to **Settings > Wi-Fi** and tap the **(i)** next to the connection.
- If the IP starts with `169.254.x.x`, it means the iPad failed to get a real IP from the school router (DHCP failure).
- **Fix**: Tap **Forget This Network** and reconnect, or ask the network admin if the DHCP pool is full.

### 2. Cross-Test with Hotspot

- Connect the iPad to a mobile hotspot.
- **Result**: If it works on a hotspot, the iPad is fine—the issue is the school's Wi-Fi or DNS config.

### 3. Check Content Filters

- If the school uses **Jamf Trust**, ensure it shows "Protected." A crash in the filtering app can block all traffic. Try restarting the iPad.

---

## File: edu-19.md

---

id: edu-19

title: "MOE Cybersecurity Audit: How does MDM help comply with NIST standards?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Cybersecurity Audit", "NIST", "Compliance"]

**Educational devices must comply with NIST (National Institute of Standards and Technology) 800-63 guidelines to ensure identity security and data privacy.**

## NIST Standards in MDM:

1. **Authenticator Assurance (Passcodes)**:
   - **2026 Standard**: Move away from simple periodic password changes toward "anti-guessing" and MFA.
   - **MDM Practice**: Force 6-digit minimum passcodes and enable Managed Apple Account MFA.

2. **Managed App Attestation**:
   - Utilize **iOS 26** hardware-backed attestation to ensure apps are installed via authorized MDM channels and haven't been compromised by Man-in-the-Middle (MitM) attacks.

3. **Vulnerability management**:
   - Use **DDM (Declarative Device Management)** to set strict update deadlines. Ensure all fleet devices are patched within 48 hours of a critical security release.

## Pro-Tip for IT Managers: Use a Lab Environment

Since the "MOE Centralized Jamf Pro" must manage millions of devices, some cutting-edge DDM features may have a rollout delay.

- **Advice**: If your school has an independent **Jamf School/Pro** instance, use it as a **"Beta Test Lab."**

- Test your iOS 26 profiles and DDM status channels there first. When the central MOE instance is updated, you will already be an expert on the configuration, ensuring your school passes cybersecurity audits with flying colors.

---

## File: edu-20.md

---

id: edu-20

title: "Troubleshooting: A student used the same password for their iPad and Apple Account, and now both are locked."

category: "Section 8: Education Scenarios"

important: false

## tags: ["Password Management", "Account Security", "Troubleshooting"]

**This is a common 'Serial Lock' risk. If a student tries the wrong password too many times, both the device and the account may be locked out simultaneously.**

## Recovery SOP:

1. **Unlock the Device**: First, send the **Clear Passcode** command via Jamf Pro.
2. **Reset the Apple Account**: Administrator logs into **ASM**, selects the student account, and clicks **Reset Password**.
3. **Education**: Advise the student that their 6-digit iPad pin and their Apple Account password should be different to prevent total lockouts in the future.

---

## File: edu-21.md

---

id: edu-21

title: "How do I manage the new 'Notification Summary' AI feature in iOS 18?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["iOS 18", "Apple Intelligence", "Notification Management"]

**iOS 18 introduces AI-powered notification summaries. While useful for filtering noise, it may cause students to miss critical full-context messages during class.**

## Management Strategies:

1. **MDM Restriction**: Administrators can use the Restrictions payload to disable **'Allow Intelligent Notification Preview'**. This prevents the AI from summarizing notifications.
2. **Classroom Tip**: Instead of a full block, encourage students to configure this within a "Classroom Focus" mode. This allows the AI to only show urgent educational alerts while summarizing distracting social notifications until the end of the school day.

---

## File: edu-22.md

---

id: edu-22

title: "The AirDrop Code Mechanism: Practical impact on classroom file sharing and how to adapt."

category: "Section 8: Education Scenarios"

important: false

## tags: ["AirDrop", "System Update", "File Transfer", "Classroom", "Operations"]

**In iOS 26.2, iPadOS 26.2, and macOS 26.2, the 'AirDrop Code' mechanism means that first-time transfers between people not in each other's contacts require a 6-digit code. This changes the 'Everyone open AirDrop' workflow but can be managed effectively.**

## The New Workflow:

1. **Sender**: Selects the file and clicks the student's name in AirDrop.
2. **Recipient**: Taps "Get AirDrop Code" (since they aren't in the teacher's contacts).
3. **Sender**: Enters the 6-digit code shown on the student's screen.
4. **Trust established**: For the next 30 days, these two devices can swap files without a code.

## School Challenges:

- Because school iPads often have iCloud Sync blocked or use Shared accounts, students almost never appear in each other's "Contacts."
- This makes the old way of "Everyone turn on AirDrop and I'll send the PDF" more time-consuming for the first session of the term.

## Strategies for the Classroom:

### 1. Prioritize the 'Classroom' App (Recommended)

- The **Classroom** app bypasses the AirDrop Code requirement entirely.
- **Action**: Teachers should use the "Navigate" or "Share" function within the Classroom app to push PDFs and URLs. It's faster, requires no student confirmation, and works for the whole class simultaneously.

### 2. 'Pairing Day' Routine

- If your curriculum requires formats that Classroom doesn't support (like large Keynote project files), dedicate 5 minutes at the start of the semester for "Pairing Day."
- Have students pair with their neighbors using the AirDrop code once. This trust will last for 30 days.

### 3. Cloud Relay

- Upload the material to Google Drive or a school NAS and push the _link_ via Classroom. Students can then download at their own pace without worrying about peer-to-peer pairing.

## Advice for Teachers:

Inform your staff that the AirDrop Code is a **Security Feature** to prevent "Airdropping" of inappropriate images from strangers. While it adds a small step to the first interaction, it creates a much safer digital environment for the students.

---

## File: edu-23.md

---

id: edu-23

title: "Boosting classroom productivity with iPadOS 26.2 'Windowed Apps' multitasking."

category: "Section 8: Education Scenarios"

important: false

tags:
[
"iPadOS 26",

    "Multitasking",

    "Windowed Apps",

    "Slide Over",

    "Teaching Efficiency",

## ]

**iPadOS 26.2 matures the 'Windowed Apps' system, allowing the iPad to behave more like a traditional computer. For students and teachers who need to cross-reference materials, this is a significant productivity boost.**

## Core Operations for Education:

### 1. Enabling the Mode

- Go to **Settings > Multitasking & Gestures** and select **Windowed Apps**. (Note: This is most effective on iPads with M1/M2/M4 chips and secondary displays).

### 2. Advanced Window Management

- **Resizable Windows**: Drag any corner to resize an app.
- **Overlapping**: Move a research browser (Safari) over a writing tool (Pages).
- **Slide Over (v26.2 Enhanced)**: Use the window control button to send a dictionary or calculator to "Slide Over." These windows now stay pinned on top and can be swiped away and back instantly from the screen edge.

### 3. The Menu Bar

- Swipe down from the very top to reveal the **Menu Bar**, giving students quick access to app commands without digging through menus, much like a Mac.

## Best Practices for Students:

- **The Split-Research Layout**: Open a teaching video on the left and a note-taking app on the right.
- **The Slide Over Dictionary**: Keep a dictionary or translation app in Slide Over so it can be summoned instantly over a reading assignment and dismissed just as fast.

## Teacher Insight:

While powerful, Windowed Apps can be overwhelming for younger students (K-3). We recommend only enabling this mode for secondary school students or as a reward for students who have demonstrated high digital literacy and focus.

---

## File: edu-24.md

---

id: edu-24

title: "Managing 'Writing Tools' (AI) during exams: Which features should be restricted?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["Writing Tools", "Apple Intelligence", "Exam Security", "iOS 26", "AI"]

**The 'Writing Tools' in Apple Intelligence can rewrite, proofread, and summarize text even while offline. This poses a significant risk for language and composition exams. On AI-capable devices, these features must be managed via MDM during assessments.**

## Potential for Misuse:

- **Rewrite**: A student enters fragmented notes, and the AI expands them into a polished, professional paragraph.
- **Proofread**: Automatically corrects grammar and syntax errors, making it impossible to grade a student's actual writing proficiency.
- **Summarize**: In a reading comprehension test, the AI can instantly identify the main points of a long text, bypassing the student's need to read.

## Management Solutions:

### Strategy A: The Exam Configuration Profile

Create a Jamf Pro profile specifically for the exam period:

1. **Restrictions**: Disable **'Allow Writing Tools'**.

2. **Optional**: Also disable **'Allow Math Notes'** to prevent cheating in mathematics exams.
3. **Deployment**: Push this profile 15 minutes before the exam and remove it immediately after.

### Strategy B: App Lock (Single App Mode)

Using the **Classroom** app's **'App Lock'** feature is the most secure method:

- When locked into a single app, the system-wide text selection menu is suppressed, and the student cannot access the Writing Tools interface. This is effective for both school-owned and BYOD devices.

## Device Capability Audit:

Remember that not all iPads have these features. Use Smart Groups to target only those that require the restriction:

- **Need Restrictions**: iPad Air (M1/M2+), iPad Pro (M1/M4+), iPad mini 7 (A17 Pro).

- **No Action Needed**: iPad 9, iPad 10 (These models lack the Neural Engine required for local Writing Tools).

---

## File: edu-25.md

---

id: edu-25

title: "Can iPads from the Digital Learning Project (MOE) still be used after the project expires? Is upgrading to iPadOS 26 safe?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["MOE Project", "2026", "System Upgrade", "iPadOS 26", "Sustainability"]

**iPads provided by the Digital Learning Project are school assets. Even after the initial project period concludes, they can continue to be used as long as the school maintains them. Upgrading to iPadOS 26 is technically viable and highly recommended, provided you consider MDM server compatibility.**

## Evaluation for the iPadOS 26 Upgrade

### 1. Hardware Longevity

- The primary project device is the **iPad (9th Gen, A13 chip)**.
- Follow-on purchases may include the **iPad (10th Gen, A14 chip)** or the **iPad (11th Gen, A16 chip)**.
- **All three models fully support iPadOS 26**.
- **Note**: While these models cannot run "Apple Intelligence" features due to hardware limitations, they still benefit from critical security updates and performance optimizations (like the improved Return to Service).

### 2. MDM Compatibility

- **Centralized Instance**: If your devices are managed by the Ministry’s central **Jamf Pro**, verify that the central server has been updated to a version that supports iPadOS 26.
- **Self-Managed**: If your school manages its own server (Mosyle, Intune, or a private Jamf instance), verify compatibility before a mass rollout.
- **Pilot Test**: Always upgrade one test unit to iPadOS 26 first. Verify that app distribution, restriction profiles, and Wi-Fi certificates function as expected before upgrading the whole fleet.

### 3. Benefits of Upgrading

- **Security**: Access to iOS 26 "Background Security Improvements" and the latest patches.
- **Stability**: Fixes for known Wi-Fi connectivity issues present in earlier versions (like iOS 18).
- **Support Cycle**: Ensures the 2022–2023 fleet remains supported by modern educational apps through at least 2027.

## Recommendations for Post-Project Use

We recommend maintaining your existing management framework to protect the learning environment:

- **Ownership**: The device remains school property; management settings should remain identical to when it was in use during the project.

- **App Guidelines**: If the App Store is currently blocked, keep it blocked to prevent the device from becoming a gaming console at home.
- **Safety**: Continue using your Content Filter (e.g., Jamf Safe Internet) to protect students from inappropriate content while using the device off-campus.

## Summary Advice

As long as the hardware is healthy and your MDM server is up to date, upgrading to iPadOS 26 is the safest and most efficient way to extend the lifespan and educational value of your project investment.

---

## File: edu-26.md

---

id: edu-26

title: "How do teachers manage Apple Intelligence 'Writing Tools' in the classroom?"

category: "Section 8: Education Scenarios"

important: true

tags:
["Apple Intelligence", "Writing Tools", "AI Management", "Academic Integrity"]

---

**Apple Intelligence's 'Writing Tools' are powerful assistants, but they raise concerns about academic integrity during composition or language exams. Teachers can manage these through MDM restrictions or real-time monitoring via the Classroom app.**

## Three Management Strategies

### 1. Administrative Restrictions via MDM (Mandatory)

IT administrators can configure specific restrictions in the Jamf Pro profile:

- **Full Disable**: Best for high-stakes exam periods.

- **Granular Block**: Schools can choose to disable the "Rewrite" feature (preventing AI from writing the essay) while allowing the "Proofread" and "Summarize" features for daily learning support.
- **Managed Apple Account Compliance**: On school-managed devices, Writing Tools data is processed with strict privacy protocols, ensuring student data is never used for model training.

### 2. Real-time Monitoring via 'Classroom' App

iOS 26 enhances a teacher’s visibility into the student's activity:

- **Screen View**: Teachers can see in real-time if a student has the Writing Tools floating panel open on their screen.

- **Class Summary**: After a session ends, the "Class Summary" report can indicate which students utilized AI assistance during their writing time.

### 3. Utilizing Assessment Mode

For formal testing, we recommend using **'Single App Mode'**. In iOS 26, entering Single App Mode **automatically suppresses** system-level Apple Intelligence features, ensuring a clean and fair testing environment.

## Pedagogical Recommendations

- **Transparency**: If AI tools are permitted, require students to add a disclosure note at the end of their work (e.g., "This essay was proofread using Apple Intelligence").
- **AI as a teaching tool**: Use the multiple "Rewrite" versions generated by AI as a starting point for class discussions on rhetoric and tone.

## Summary

AI is a critical future skill. Rather than a permanent ban, we recommend teachers allow AI during the "Brainstorming" phase while restricting it via MDM during the "Formal Drafting" and "Assessment" phases.

---

## File: edu-27.md

---

id: edu-27

title: "If a school changes MDM providers, is it mandatory to wipe all iPads?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["MDM Migration", "Zero-Wipe", "System Maintenance", "iOS 26 Technology"]

**Prior to 2026, the answer was yes. However, with the release of iOS 26 (Tahoe), Apple introduced 'Zero-Wipe MDM Migration.' If specific conditions are met, schools can migrate from Provider A to Provider B without erasing data or re-downloading apps.**

## Comparison: Traditional vs. Zero-Wipe Migration

| Feature             | **Traditional Migration (Legacy)** | **Zero-Wipe Migration (iOS 26+)**               |
| :------------------ | :--------------------------------- | :---------------------------------------------- |
| **Data Retention**  | All data wiped (must backup).      | **Full Retention** (files, settings, apps).     |
| **User Experience** | Must redo the Setup Assistant.     | **Silent Background Process** (needs internet). |
| **Network Impact**  | Massive (GBs of app downloads).    | **Minimal** (Management permission swap only).  |
| **Time per Device** | 30–60 minutes.                     | **2–5 minutes**.                                |

## Requirements for Zero-Wipe Migration

1. **OS Version**: All devices must be on **iOS/macOS 26** or later.
2. **DEP/ADE Support**: Devices must be owned in **Apple School Manager (ASM)** with Automated Device Enrollment.
3. **DDM Support**: Both the old and new MDM servers must support the **MDM Migration Payload** (Declarative Device Management).

## Why 'Zero-Wipe' can be Risky (The Expert View)

Even though the feature is available, education technology experts often consider it a **last resort** rather than a best practice.

- **'Profile Ghosting'**: Legacy settings from the old MDM (like specific Wi-Fi certificates or restrictions) can sometimes linger, creating "conflicts" with the new MDM policies that are difficult to troubleshoot.

- **VPP Licensing Lock**: Handing off app management is fragile. If the old MDM doesn't release the VPP license cleanly before the new one takes over, apps may stop updating or prompt students for a password.
- **Accumulated Technical Debt**: A wipe provides a "fresh start" for the filesystem. A migration carries over years of system logs and cache clutter, which can impact performance on older devices like the iPad 9.

## Expert Recommendation:

- **Use Zero-Wipe WHEN**: You must migrate in the middle of a semester with zero downtime and the devices contain critical teacher data that cannot be backed up.
- **Use Wipe & Re-enroll WHEN**: It is the summer break. A clean reset via **EACS (Erase All Content and Settings)** is the only way to guarantee 100% policy compliance and peak device performance for the new school year.

## Summary

While technology has made "Zero-Wipe" possible, a **clean start** remains the gold standard for IT management stability.

---

## File: edu-28.md

---

id: edu-28

title: "How should MDM administrators handle the 'Retirement' process for iPad/Mac hardware?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Device Retirement", "ESG", "Data Sanitization", "Asset Management"]

**Device retirement is more than just turning off the power. It involves data sanitization and the secure return of ownership rights in Apple School Manager (ASM). A proper retirement process ensures student privacy and meets ESG (Environmental, Social, and Governance) sustainability standards.**

## Retirement SOP (Standard Operating Procedure)

### 1. Secure Data Wipe (Zero-Touch Cleanup)

- **Execute Wipe**: Send a remote wipe command via Jamf Pro. Use the **"Erase All Content and Settings (EACS)"** command for modern Macs and iPads; it is faster and more secure than a traditional re-installation.
- **Verification**: Ensure the MDM console confirms the "Wipe Complete" status before physical disposal.

### 2. Disassociation in ASM (Release from ASM)

This is the most critical step. It prevents the device from trying to enroll back in the school MDM if it is resold or recycled:

- Log in to **Apple School Manager**.

- Search for the serial number and select **"Release Device."**
- **WARNING**: Once released, a device cannot be re-added to ADE/DEP without physical access and a tethered connection to Apple Configurator. Only release devices that are permanently leaving the organization.

### 3. Inventory Archiving

- Do not immediately delete the record from your MDM. Move it to a **"Retired/Decommissioned"** group for 12 months.
- Export a final report (Serial, Purchase Date, Retirement Date) to serve as an audit trail for asset disposal.

### 4. Sustainability & ESG

- **Second Life**: If the hardware is functional but cannot support newer OS versions, consider repurposing it as a "Library E-reader" or a dedicated "Sign-in Kiosk."
- **Certified Recycling**: For damaged units, choose a certified e-waste recycler and mark the device as **"Decommissioned"** in ASM for ESG reporting.

## Summary Advice

A rigorous retirement process protects the school from data breaches and ensures your MDM license count remains accurate. Conduct a "Fleet Health Audit" every semester to keep your inventory lists clean and secure.

---

## File: edu-29.md

---

id: edu-29

title: "In the AI Era (iOS 26), how can MDM assist with Digital Citizenship and behavior management?"

category: "Section 8: Education Scenarios"

important: false

## tags: ["Digital Citizenship", "AI Ethics", "Behavior Management", "iOS 26"]

**MDM should not just be a 'restrictor,' but a 'guardrail' for Digital Citizenship education. With the features in iOS 26, administrators can guide students toward responsible AI and technology habits.**

## The New Role of MDM in Behavior Management

### 1. Phased Access to Apple Intelligence

- **Not just ON/OFF**: Use **Managed App Config** to enable AI "Summarization" in science or history (to practice identifying key points) while disabling "Rewrite" in language arts (to practice original composition).
- **Contextual Boundaries**: Use MDM to restrict features like **iPhone Mirroring** on student devices to teach the difference between "Personal" and "Educational" tool usage boundaries.

### 2. Reinforcing Focus via DDM

- **Focus Patterns**: Use DDM to push specific "Study Focus" modes that automatically hide social apps but allow teacher notifications. This helps students learn to build their own "Digital Focus" habits.

### 3. Safari Distraction Control

- **Pedagogical Application**: Safari 26 allows users to hide distracting web elements. Admins can use configuration profiles to suggest "Distraction-Free Views" for approved educational portals, and then use this as a class discussion topic on how "content filtering" versus "critical thinking" affects how we consume information.

## Management Philosophy for IT Leads

- **Transparency**: Periodically share anonymized data on app usage and traffic with the students. Help them understand that management is about **"Protection,"** not "Spying."
- **Incremental Trust**: For senior students or classes with high digital literacy scores, use MDM to gradually relax certain restrictions (e.g., allowing "AirDrop Codes") as a reward for demonstrated digital maturity.

## Summary Advice

MDM provides the technical parameters, but education remains the core objective. The goal in the iOS 26 era is to create a digital environment that is "Low-distraction, safe, and AI-literate," preparing students for a world where these technologies are omnipresent.

---

## File: edu-30.md

---

id: edu-30

title: "Can MDM-managed iPads still be used if the school Wi-Fi is down? What are the backup plans?"

category: "Section 8: Education Scenarios"

important: true

## tags: ["Connectivity", "Backup Plan", "Offline Usage", "Network Instability"]

**One of the iPad’s greatest strengths is its 'Offline Productivity.' Even without Wi-Fi, most pre-installed apps and downloaded content remain fully functional. The role of MDM is to pre-configure 'Offline Grace Periods' and 'Local Caching' to ensure teaching never stops.**

## Strategies for Offline Teaching

### 1. Pre-Class Preparation: Caching and Syncing

- **Content Caching**: Ensure your school has a macOS **Content Caching** server. If the main internet line fails but the internal local network (LAN) is active, iPads can still download apps or updates from the local cache.
- **Asset Pre-loading**: Use Jamf Pro to push "Essential Courseware" directly into the student's **Files** app or **Books** beforehand, rather than relying on cloud links.

### 2. Handling the Outage in the Classroom

- **Apple Classroom**: As long as the teacher's Mac/iPad and the students' iPads are in the same room with Bluetooth and Peer-to-Peer Wi-Fi enabled, **the Classroom app will still function**. Teachers can still monitor screens and push PDFs or local bookmarks without any internet connection.
- **Creative Suite**: Professional tools like Keynote, Pages, GarageBand, and Swift Playgrounds all support full offline editing.

### 3. MDM Configuration for Reliability

- **Passcode Longevity**: Set a long "Offline Check-in Grace Period" in your MDM settings. This prevents devices from locking students out if they haven't "checked in" with the server for 24–48 hours due to a network outage.

## Administrator Backup SOP

1. **Bluetooth Awareness**: Remind teachers that during an outage, they must keep Bluetooth ON for "Classroom" app peer-to-peer functions to work.
2. **Hardwire Kits**: Keep a set of Lightning/USB-C to Ethernet adapters and a laptop with **Apple Configurator** to manually inject Wi-Fi profiles if a device loses its configuration during a prolonged outage.
3. **Offline Inventory**: Maintain a physical or local PDF copy of your asset list (Serial Numbers and Wi-Fi MAC addresses) for manual troubleshooting.

## Summary Advice

Network outages are inevitable. In the iOS 26 architecture, **Declarative Device Management (DDM)** is designed to keep the device in its "Last Known Good State," ensuring that even without a cloud connection, the iPad remains a stable and predictable teaching tool.

---

## File: edu-31.md

---

id: edu-31

title: "What is the difference between the 'MOE Managed Jamf Pro' and 'School-Purchased Jamf Pro'?"

category: "Section 8: Education Scenarios"

important: true

tags:
[
"MOE Instance",

    "Private Instance",

    "Permission Differences",

    "Integration",

    "IT Coordinator",

## ]

**The primary differences lie in administrative permissions, feature rollout speed, and 'Global Toggle' control. While assets can be moved between them, the daily management experience varies significantly.**

## Three Levels of Administrative Access

In the **MOE Managed Jamf Pro** architecture, permissions are layered to balance security with local flexibility:

1. **MOE Administrators (Full Admin)**: Hold the highest authority over the Jamf Pro instance. They set global security policies and decide when to enable major new DDM (Declarative Device Management) features.

2. **Vendor/Reseller Accounts**: Have broad access to assist multiple schools with deployment but cannot override core MOE-defined restrictions.
3. **School IT Coordinators (Site Admin)**: Have daily operational control over their specific "Site" (e.g., app distribution, smart groups, device naming). However, there are safety restrictions, such as the **inability to delete configuration profiles**. This is a protective measure to ensure critical MOE security settings aren't accidentally removed.

## Core Comparison Matrix

| Item                       | **MOE Managed Instance**                        | **Private/In-House Instance**                    |
| :------------------------- | :---------------------------------------------- | :----------------------------------------------- |
| **Highest Authority**      | **Ministry Central IT Team**                    | **School IT Team (100% Control)**                |
| **Server Hosting**         | Jamf Cloud (MOE Tenant)                         | Dedicated Jamf Cloud Instance                    |
| **Profile Management**     | **Protected**. Cannot delete core MOE profiles. | **Unrestricted**. Full control to create/delete. |
| **Software Updates (DDM)** | Managed by Central Admin schedule.              | Fully customizable by the School.                |
| **Automation & API**       | Restricted. Limited custom scripts/API tokens.  | **Fully Open**. Full API and Custom Scripting.   |
| **New Feature Testing**    | Must wait for Central IT to enable.             | Enable on day one of an Apple release.           |

## Important Repository Statement (Disclaimer)

- **Feature Availability**: All management technologies described in this site (e.g., DDM Self-Healing, AI Controls, PSSO) are standard Apple features.
- **'Hidden' Features**: If you cannot find a specific button or setting in your MOE Jamf Pro console, **it does not mean the technology is faulty or your devices are faulty**. It usually means the feature's "Global Toggle" (available only to Full Admins) has not yet been activated by the Ministry's central team.
- **Management Advice**: In the MOE Managed environment, focus on **instructional stability**. If you require a high-degree of experimentation or custom automation, we recommend using a "School-Purchased" private instance for those specific project devices.

## Summary

The MOE version provides a secure, "batteries-included" environment that protects the school from major configuration errors. The In-House version provides the "Absolute Freedom" required for advanced IT departments and custom coding projects.

---

## File: edu-32.md

---

id: edu-32

title: "What if a student forgets their iPad passcode? Can a teacher help reset it?"

category: "Section 8: Common Education Scenarios"

important: true

tags:
[
"Passcode",

    "Forgot Password",

    "Jamf Pro",

    "Remote Commands",

    "Troubleshooting",

## ]

**Yes. As long as the iPad is managed by the school's MDM (Jamf Pro) and remains connected to the internet, a teacher or IT administrator can "Clear Passcode" remotely without needing to wipe the device.** This is a very common scenario in the classroom.

## Method 1: Using Jamf Teacher (Recommended for Teachers)

If the school has deployed the Jamf Teacher app or web portal to teachers:

1. Open **Jamf Teacher**.

2. Select the class where the student is located.
3. Select the student's name.
4. Find and tap the **"Clear Passcode"** option in the feature list.
5. The passcode on the student's iPad will be removed instantly. The student can then simply swipe to open the device and set a new passcode.

## Method 2: Using the Jamf Pro Console (For Administrators)

1. Log in to the Jamf Pro dashboard and search for the iPad.
2. Go to **`Inventory` > `Management` > `Commands`**.
3. Click the **`Clear Passcode`** command.
4. As long as the device is connected to the network, the passcode lock will disappear moments later.

## ⚠️ Important Considerations:

- **Network Connection is Required**: If the iPad is locked out as "iPad Unavailable" because too many incorrect passcodes were entered, and **Wi-Fi has disconnected**, the command cannot be delivered. In this case, the device might need to be restored via a computer.
- **Different from Apple ID Password**: This method only removes the "Screen Lock Passcode." It does not solve issues with forgetting an "Apple ID/iCloud password."
- **Preventive Measures**: Encourage students to use passcodes related to their class number or seat number, or keep a record on a sticker on the back of the iPad (though not ideal for security, it is practical for younger students).

**💡 Teacher Tip**:

In iOS 26, if a student enters an incorrect passcode 5 times, the iPad displays a "Connect to School Network" prompt. If it stays on Wi-Fi, a teacher's "Clear Passcode" command usually takes effect within 5 seconds, minimizing classroom disruption.
