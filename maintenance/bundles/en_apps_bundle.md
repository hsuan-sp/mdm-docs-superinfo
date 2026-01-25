---
File: app-1.md
---

---

id: app-1

title: "Apps on the iPad are stuck on 'Waiting' or failing to install. How do I troubleshoot this?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["Troubleshooting", "App Installation", "VPP", "DDM"]

**A 'Waiting' status usually indicates that the installation process is stalled at either the 'License Verification' or the 'Download Queue' stage.**

When an MDM sends an installation command, a complex handshake occurs between the device and Apple’s servers. Please check these common failure points:

## Common Causes & Solutions:

1. **Insufficient VPP Licenses (Most Common)**:
   - **Check**: Log in to Jamf Pro and verify the license count for that app.
   - **Solution**: If **Used Count = Total Count**, Apple's servers will reject the download request. Go to Apple School Manager (ASM) and acquire more licenses. _Tip: For free apps, always "purchase" a large quantity (e.g., 5,000) to account for future growth._

2. **Campus Network Restrictions**:
   - App downloads require access to Apple’s **Content Delivery Network (CDN)**. If your school’s firewall blocks these domains, the download will sit at 0%.
   - **Test**: Connect the iPad to a mobile hotspot. If the progress bar starts moving immediately, the issue lies with your campus network configuration.

3. **Assignment Mode Conflict**:
   - Ensure the app is set to **"Device-based Assignment"** in Jamf Pro. If it’s incorrectly set to "User-based," the device will wait indefinitely for a student to log into a personal Apple ID.

4. **Declarative Management (DDM) Desync**:
   - In the latest iPadOS versions, app status is reported via DDM. If the status seems "stuck" in the dashboard, try sending a **"Cancel All Pending Commands"** followed by an **"Update Inventory"** command to the device.

5. **Storage Constraints**:
   - If the iPad’s storage is nearly full, the OS will automatically pause background downloads. Check **Settings > General > iPad Storage** to ensure enough overhead remains for the new apps.

---

## File: app-2.md

---

id: app-2

title: "Can we install apps on iPads without signing into an Apple ID?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["VPP", "Device-based Assignment", "Apple ID", "Managed Apple Account"]

**Yes. This is called "Device-based Assignment," and it is the standard and most efficient method for school environments.**

By using the **Volume Purchase Program (VPP)** within Apple School Manager (ASM), the school links app licenses to the device’s **Serial Number** rather than a specific student’s Apple ID.

## Advantages for the School:

- **Zero-Login Deployment**: Students can receive all necessary classroom apps immediately upon unboxing the device without ever needing a personal or Managed Apple Account.
- **Asset Reclamation**: App licenses remain school property. When a student graduates or an iPad is erased, the license is automatically "returned" to your school’s pool, ready to be redistributed to another device.
- **Simplified Maintenance**: There are no prompts for passwords when apps need to be updated or reinstalled.

## Important Limitation: In-App Purchases

Since the device is not signed into a personal account, **In-App Purchases (IAP) are not supported** in this mode. If your curriculum requires premium features within an app, we strongly recommend choosing apps that offer a "Pro" or "Full" version available as a one-time VPP purchase.

## Technical Requirement:

In the Jamf Pro App settings, ensure the **"Assign VPP Content"** checkbox is selected and the distribution method is set to **"Install Automatically/Prompt users to install."**

---

## File: app-3.md

---

id: app-3

title: "If the App Store is hidden, how can students get the apps they need for class?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Self Service", "App Store", "Restrictions", "Student Autonomy"]

**Even when the official App Store is disabled via a management profile, students can still safely acquire apps through the "Self Service" app.**

## The Role of Self Service:

Self Service is the school’s private, curated app portal. Instead of giving students access to the millions of apps on the public App Store, IT "publishes" specific, pre-approved titles into Self Service.

## Why this is the preferred setup:

1. **Safety & Focus**: It prevents students from downloading non-educational games, social media, or inappropriate content.
2. **Bandwidth & Storage Efficiency**: Instead of forcing 50 large apps onto every iPad (which uses up storage and slows down the network), IT can make them "Optional." Students only download the specific tools required for their current project.
3. **Independence**: Students can reinstall apps or trigger manual updates for their school tools without needing to ask an ICT administrator for a password.

## Troubleshooting:

- **Missing Self Service**: If the app is missing, ensure the device is correctly enrolled and has a stable Wi-Fi connection.
- **Web Clips**: The school can also place direct links to web-based platforms (like ManageBac or Google Classroom) inside Self Service for easy one-tap access.

---

## File: app-4.md

---

id: app-4

title: "What details should we keep in mind when 'purchasing' free apps in bulk?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["VPP", "ASM", "Location Tokens", "Inventory Management"]

**In the Apple ecosystem, even $0 free apps must go through the "Purchase" workflow in Apple School Manager (ASM) to be authorized for school distribution.**

## Key Details to Consider:

1. **Location Token (VPP Token) Match**:
   - If your school has multiple "Locations" in ASM (e.g., "Primary Campus" vs. "Secondary Campus"), you must purchase the apps for the _exact same_ location that is linked to your Jamf Pro server. Licenses bought for Location A cannot be used by a server linked to Location B.

2. **Sync Lag**:
   - After hitting "Get" in ASM, the licenses don't appear in Jamf Pro instantly. There is usually a **2-10 minute synchronization delay** between Apple’s servers and your MDM dashboard.

3. **Purchase Quantity**:
   - Since the licenses are free, we recommend "purchasing" a quantity that far exceeds your current needs (e.g., if you have 500 iPads, buy 2,000 licenses). This prevents deployment failures if you add more devices later.

## Troubleshooting Tip:

If an app is showing a "0 available" count in Jamf Pro despite being purchased in ASM, check the Location settings first and then manually trigger a **"Sync VPP Content"** in the Jamf Global Management settings.

---

## File: app-5.md

---

id: app-5

title: "How do we balance automated app installs with limited school bandwidth?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Deployment Strategy", "Content Caching", "Bandwidth Management"]

**During large-scale deployments (e.g., the first day of the school year), having hundreds of iPads simultaneously downloading the same apps can paralyze the campus network.** To manage this, we recommend a "Tiered Deployment" strategy.

## Recommended Solutions:

- **Implement Content Caching (Highly Recommended)**:
  - Set up a dedicated Mac (connected via Ethernet) on your campus network and enable **"Content Caching"** in the System Settings.
  - **The Result**: The first iPad downloads the app from the internet; the Mac saves a copy. The remaining 99 iPads then pull the app from that Mac over the high-speed local network, preserving your external internet bandwidth.

- **Prioritize Essential vs. Optional Apps**:
  - Configure only your core tools (e.g., MDM agents, browsers, LMS apps) as **"Auto-Install."**
  - Place large, non-essential creative tools (e.g., GarageBand, iMovie, or heavy 3D titles) in **Self Service**. This allows students to download them gradually throughout the week as needed.

- **Stagger the Enrollment**:
  - Instead of letting an entire grade level unbox and enroll at the exact same minute, try staggering the classes by 30-minute intervals. This reduces the initial "burst" of traffic on your Wi-Fi access points.

## Operational Note:

If devices are showing a "Waiting" status during a major rollout, simply restarting the download in MDM often makes the problem worse by adding more requests to a choked network. Prioritizing **Content Caching** is the single most effective way to solve bandwidth fatigue.

---

## File: app-6.md

---

id: app-6

title: "What is the difference between Managed Apps and personally installed apps? Can students take their apps with them after graduation?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Managed Apps", "License Ownership", "VPP", "Data Protection"]

**It depends on the "purchaser" identity and the "management attributes" of the app. App licenses and the data inside them should be considered separately.**

In a managed environment, apps are categorized as either "Managed" or "Personal," each with a completely different lifecycle:

## 1. School-assigned "Managed Apps"

- **Source**: Purchased by administrators via **Apple School Manager (ASM)** and deployed through an MDM using "Device-based assignment."
- **Ownership**: The license belongs to the **school**.
- **Graduation/Departure Process**:
  - **License Recovery**: When a student leaves and the device is unenrolled, the MDM revokes the license. The app will either disappear from the device or become inaccessible. The license is then returned to the school's VPP (Volume Purchase Program) pool for the next student to use.
  - **Data Risk**: If the "Remove app when management profile is removed" setting is enabled, all data stored within the app (e.g., unsaved projects, local notes) will be **permanently erased**.

## 2. Apps purchased with a student's personal Apple Account

- **Source**: Purchased by the student on a personal or unrestricted device using their private Apple Account.
- **Ownership**: The license belongs permanently to the **individual student**.
- **Graduation/Departure Process**:
  - **Permanent Access**: The student can redownload the app on any new device by signing in with the same Apple Account, unaffected by the school's MDM.
  - **Note**: On internal "Supervised" school iPads, admins often restrict personal Apple Account logins to the App Store, so these apps are less common on school-owned hardware.

## Key Technical Mechanism: Converting Unmanaged to Managed

- **Conversion Behavior**: If a student has already manually installed an app (e.g., Notability), and the MDM attempts to deploy the same app, administrators can trigger a request to "take over" management of the app.
- **Impact**: Once converted, the app is subject to school policies, such as being prohibited from backing up to a personal iCloud account.

## Institutional Advice & Risk Management

- **Data Migration**: Teachers and students should ensure important projects are exported to cloud storage (e.g., Google Drive) or sent via AirDrop before graduation. **Once management is revoked, Managed Apps and any un-synced data within them cannot be recovered.**
- **BYOD Recommendation**: For student-owned devices, using the "User Enrollment" mode is recommended. This maintains a clear separation between personal and school data, allowing the school to remove its apps without affecting the student's personal photos or purchases.

---

## File: app-7.md

---

id: app-7

title: "I cannot find the app I want in ASM (due to regional restrictions or removal). How do I solve this?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["ASM Search", "Regional Restrictions", "Developer Settings", "App Store"]

**Search results in Apple School Manager (ASM) can sometimes differ from the consumer App Store. If you cannot find a specific item, check these factors in order:**

## 1. Search by Apple ID String (Recommended)

Don't search by name. Instead, find the app on the web-based App Store and locate its unique ID (e.g., `id123456789`). Paste this ID directly into the ASM search bar. This is the most accurate way to find a specific entry.

## 2. Regional Store Consistency

ASM only searches the App Store associated with your organization's registered region (e.g., the Taiwan store). If a developer has released an app exclusively for the U.S. store, it will not appear in a Taiwan-based ASM account.

## 3. B2B / Custom Apps

Some proprietary or school-specific apps are distributed as "Custom Apps." Ensure the developer has added your **Organization ID** to their distribution list in App Store Connect.

## Risk Warning:

If an app has been removed (delisted) from the App Store, you may be unable to download it to new devices even if you have remaining VPP licenses. Administrators should periodically audit the status of critical teaching apps in the store to avoid deployment gaps.

---

## File: app-8.md

---

id: app-8

title: "Can I deploy Web Clips to student home screens? Are they considered apps?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Web Clip", "Safari", "Configuration Profile", "Teaching Tools"]

**Yes. A Web Clip is not a true app; rather, it is a bookmark icon on the home screen that points to a specific URL.**

This is highly effective for guiding students to specific learning portals.

## Technical Details & Configuration Advice:

### 1. Full-Screen Experience

In your Jamf Pro configuration, ensure the "Full Screen" option is enabled.

- **Effect**: Opening the link will hide the Safari address bar and toolbar.

- **Benefit**: This makes the website look like a standalone native app, reducing the chance of students getting distracted by other sites.

### 2. Custom Icons and Visuals

- **Recommended Specification**: Upload a **180x180 pixel PNG file** for maximum clarity.
- **Transparency Support**: Modern systems support PNG icons with transparency, allowing for more professional-looking home screen layouts.

### 3. Prevent Removal (Non-removable)

For shared classroom devices, you can set the Web Clip as "Non-removable."

- **Advantage**: This ensures essential portals are not accidentally deleted by students, saving you the trouble of redeploying them.

## Limitations & Risks:

- **Browser Dependency**: Web Clips rely on the built-in Safari engine. If you have a restriction profile that completely disables the Safari app, Web Clips will not open.
- **Internet Connectivity**: Since these are essentially web pages, the device must be online to load the content. For offline use, you must look for Progressive Web Apps (PWAs) that support offline caching or install native apps.

---

## File: app-9.md

---

id: app-9

title: "Do I need the student's Apple ID password to update apps? How can I achieve silent updates?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["App Updates", "Device-based Assignment", "Automated Updates", "DDM"]

**No password is required. As long as you use "Device-based Assignment," the update process is completely hands-off.**

## The Preferred 2026 Method: Declarative Device Management (DDM)

Under the latest OS architecture, **DDM** is the best path for silent updates:

- **Autonomy**: The device itself monitors app versions based on the MDM declaration and triggers downloads in the background. It no longer relies on a one-way "push" command from the server.

- **Status Transparency**: Admins get real-time progress reports (e.g., "Downloading" or "Insufficient Space") instead of the vague "Pending" status seen in older MDM versions.

## Traditional MDM Configuration (Compatibility Layer):

1. **License Mode**: Must be set to "Device-based" (bound to serial number).
2. **Supervised Mode**: The iPad must be in a "Supervised" state.
3. **Jamf Configuration**: In the app's distribution settings, enable **"Automatically Update App."** (_Note: On DDM-supported devices, this checkbox automatically triggers a DDM declaration._)

## Common Troubleshooting for Failed Updates:

- **App in Use**: If a student is currently using the app, the system will typically wait until the app is in the background or the device is idle before updating.
- **Insufficient Storage**: Updates require temporary space to download the installer. If the device is full, the update will fail.
- **Stuck Commands**: If you see many pending update commands, try sending a **"Blank Push"** to force the device to check in with Apple servers.

**Note**: DDM makes the device more proactive in scheduling updates, reducing its real-time dependency on the MDM server for simple maintenance tasks.

---

## File: app-10.md

---

id: app-10

title: "Why does the iPad prompt for an Apple ID password when opening an app?"

category: "Section 3: App Management & Distribution"

important: false

tags:
[
"Troubleshooting",

    "License Conflicts",

    "Managed Apps",

    "Device-based Assignment",

## ]

**This usually happens because the "License Source" does not match the "Installation Identity," causing the system to attempt to verify the original purchaser's ID.**

On managed iPads, these prompts typically stem from three types of technical conflicts:

## Cause 1: Personal vs. Organizational License Conflict (Most Common)

- **Scenario**: A student previously downloaded the app using a **Personal Apple Account** (e.g., YouTube), and the administrator later tried to deploy the same app via MDM.
- **Logic**: Even if the app name is the same, the system knows it was originally acquired by a personal account. If the MDM fails to successfully "Take Over" the app as a **Managed App**, the system will keep asking for the personal password used for the original purchase.
- **Solution**: **"Delete and Redeploy."** Manually delete the app from the iPad and have the administrator re-send the install command via Jamf Pro. This ensures the app is reinstalled using a "Device-based" license.

## Cause 2: Incorrect Assignment Mode

- **Scenario**: The admin configured the app distribution in Jamf Pro using **"User-based Assignment"** instead of "Device-based."
- **Logic**: This mode requires an Apple ID to "hold" the license. If the device is not signed in or the signed-in ID doesn't match the assigned user, a login prompt appears.
- **Solution**: Edit the app settings in Jamf Pro and change the distribution method to **"Device-based Assignment"** (select "Assign VPP Content" and scope to devices or device groups).

## Cause 3: VPP License Handshake Failure

- **Scenario**: The command was sent, but the Apple VPP server has not yet completed the license registration for that specific serial number.
- **Logic**: The device has downloaded the app but cannot find a valid device-based license token during its initial check, so it defaults to asking the user to sign in for verification.
- **Solution**: Wait a few minutes or send a **"Blank Push"** to the device from Jamf Pro to force the device to re-verify its licensing status with Apple servers.

## Practical Advice:

On shared school devices, always strictly enforce **Device-based Assignment**. If a single device keeps prompting for a password, the most efficient fix is to delete the app and redownload it via **Self Service**, which re-establishes the correct licensing link.

---

## File: app-11.md

---

id: app-11

title: "How do I distribute E-books (PDF/ePub) to student iPads?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["E-books", "Material Distribution", "PDF", "Restrictions"]

**Apple School Manager (ASM) in many regions (including Taiwan) does not support the direct purchase or distribution of content from the Apple Books Store.**

However, you can still distribute your own PDFs or ePub files to students using several methods:

## Option 1: Distribution via MDM

1. **Upload to Jamf Pro**: In the "eBooks" section of Jamf Pro, you can directly upload PDF or ePub files.
2. **Assign to Devices**: Scope these custom e-books to your target device groups.
3. **Student Access**: Students will find these materials ready for reading in the native **Books** app on their iPads.

## Option 2: Using the 'Files' App or Cloud Storage

1. **Cloud Hosting**: Upload materials to a school cloud service (e.g., Google Drive or Microsoft OneDrive).
2. **Deploy the Cloud App**: Distribute the corresponding app via Jamf Pro.
3. **Student Access**: Students open the app to view and download the teaching materials.

## Option 3: Learning Management Systems (LMS)

- Upload materials to your LMS (e.g., Google Classroom, Canvas). Students access the content via the LMS app or web browser.

## Key Considerations:

- **Regional Restrictions**: You cannot "purchase" books from the Apple Books Store in bulk through ASM like you do with apps in certain regions.
- **Copyright**: Ensure you have the legal right to distribute any materials you upload to these platforms.

## Practical Advice:

Focus on distributing custom PDF/ePub files or leveraging existing cloud and LMS platforms rather than trying to deploy content directly from the Apple Books Store through ASM.

---

## File: app-12.md

---

id: app-12

title: "Can paid app licenses be shared between different schools? (Cross-school VPP)"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["VPP Locations", "Resource Sharing", "ASM"]

**Yes. This is achieved through 'Location' management within Apple School Manager (ASM).**

This is highly effective for centralized procurement by a school district or a main campus.

## How it Works:

1. **Centralized Purchase**: A Super Admin purchases 10,000 licenses at a "Main Office" location in ASM.
2. **Internal Transfer**: Use the **Transfer Licenses** feature to move, for example, 1,000 licenses to "Elementary School A" and 500 to "Junior High B."
3. **Independent Management**: The administrators at each school log in to their local MDM and see only the licenses allocated to their specific location.

## Benefits:

Allows for "Bulk Procurement / Negotiated Pricing" while maintaining "Independent School Management," greatly simplifying the accounting process.

---

## File: app-13.md

---

id: app-13

title: "What is 'Managed App Configuration'? How is it used for mass deployment?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["AppConfig", "XML", "Variables", "Jamf Pro"]

**'Managed App Configuration' uses the MDM protocol to inject XML-based settings into apps that support the AppConfig standard, enabling 'Zero-touch Configuration'.**

This goes beyond just pre-filling data; it can lock specific app behaviors to prevent user modification.

## Technical Implementation with Jamf Pro Variables:

In the mobile device app details page in Jamf Pro, switch to the **App Configuration** tab. You will need to paste a **Plist (Property List)** XML code that follows the developer's specifications.

## The Jamf Advantage: Variable Substitution

You can use Jamf Pro's built-in variables to dynamically fill in specific information for each device, eliminating the need for individual configuration files.

- **Common Variables**:
  - `$SERIALNUMBER`: Automatically fills the device serial number.
  - `$EMAIL`: Fills the user's email (if linked in Inventory).
  - `$USERNAME`: Fills the username.
  - `$JSSID`: Fills the Jamf Pro ID.

## Practical Example (Setting Zoom SSO Domain):

```xml

<dict>

    <key>SetSSOURL</key>

    <string>true</string>

    <key>SSOURL</key>

    <string>yourschool.zoom.us</string>

    <key>PrepopulateUsername</key>

    <string>$EMAIL</string>

</dict>

```

_(Note: Specific Key-Value pairs must be referenced from the official management documentation of the app developer, e.g., Zoom, Chrome, or Microsoft.)_

---

## File: app-14.md

---

id: app-14

title: "Can teachers use Managed Apple Accounts to test school-developed Beta apps in TestFlight?"

category: "Section 3: App Management & Distribution"

important: false

tags:
["TestFlight", "App Store Connect", "Managed Apple Account", "Service Access"]

---

**Yes. Apple allows 'Managed Apple Accounts' to act as TestFlight testers, but permissions must first be enabled within Apple School Manager (ASM).**

## Prerequisites (ASM Side):

The administrator must log into **Apple School Manager** and go to **Settings > User Assignments > Service Access**. Ensure that the **TestFlight** service is set to **On**. If this toggle is off, users will be unable to sign in to TestFlight even if they receive an invitation.

## Standard Deployment Flow:

1. **App Store Connect Setup**: The school developer adds the teacher's Managed Apple Account to the **External Testing** group. An invitation email will be sent to the teacher's inbox.
2. **Deploy the TestFlight App**: The administrator "purchases" free **TestFlight** licenses in ASM and installs them on teacher iPads via **Device-based Assignment** in Jamf Pro.
3. **Redeem Invitation**: The teacher opens the invitation email on the iPad and taps "View in TestFlight." The TestFlight app will launch automatically, and the teacher can sign in with their Managed Apple Account to begin testing.

## Difference from Personal Accounts:

Managed Apple Accounts cannot perform In-App Purchases (IAP). Therefore, they cannot test Beta features involving real financial transactions unless conducted within a sandbox environment.

---

## File: app-15.md

---

id: app-15

title: "How do I prevent apps from updating during class time to avoid network congestion?"

category: "Section 3: App Management & Distribution"

important: false

tags:
[
"App Updates",

    "Classroom Management",

    "Update Strategy",

    "Bandwidth Control",

## ]

**The key is to disable 'Automatic Updates' and adopt a 'Manual Push during Maintenance Window' strategy.**

The App Store's automatic update mechanism can be unpredictable. To ensure classroom stability, use the following settings for critical apps:

## 1. Disable Automatic Updates for Specific Apps

In the app details page within Jamf Pro, **uncheck 'Automatically update app'**. Perform this for critical tools like Google Classroom, Meet, or exam apps to prevent a sudden update from introducing bugs mid-lesson.

## 2. Establish a 'Maintenance Window'

Coordinate a fixed time with the school (e.g., every Friday after 5 PM). Use Jamf Pro's **Mass Actions** to select the target device groups and manually send the **Update Application** command.

## 3. Leverage Version Pinning

If your environment uses **Volume Purchase (VPP)**, while you cannot technically "downgrade" an app, you can choose not to trigger the update command. This keeps all devices on a stable, current version until a planned upgrade during breaks.

---

## File: app-16.md

---

id: app-16

title: "Can I standardize the iPad Home Screen layout for students?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Home Screen Layout", "Restrictions", "Folders"]

**Yes. Using a 'Home Screen Layout' configuration profile, administrators can precisely define the placement of apps on student devices.**

## Configuration Method:

1. In Jamf Pro, go to **Mobile Devices > Configuration Profiles**.
2. Select the **Home Screen Layout** payload.
3. Define the contents of the **Dock** and specific **Pages**.
4. You can create "Folders" to group similar apps (e.g., iWork productivity tools).

## Important Constraints and Risks:

- **Locked Layout**: Once applied, **students cannot move or delete app icons** on the Home Screen. The entire layout is "frozen" in the state defined by the administrator.
- **The Overflow Effect**: Any apps not specified in your layout will be pushed to the final page or hidden in the App Library.
- **Recommendation**: This is ideal for younger students or special education needs where a simplified, consistent interface is required. For older students, we recommend allowing flexibility for them to organize their own learning environments.
- **Note**: Many regional MOE/School District setups already include a default layout. Verify yours before creating a competing profile.

---

## File: app-17.md

---

id: app-17

title: "I 'purchased' an app in ASM, but it's not appearing in my Jamf Pro list. Why?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["VPP Sync", "ASM", "Troubleshooting", "Volume Purchase"]

**This is usually due to a synchronization delay between Apple’s servers and your MDM server.**

## The Sync Mechanism:

By default, Jamf Pro usually syncs with Apple School Manager (ASM) once a day (or as configured). When you click "Get" in ASM, the data does not appear "instantly" in Jamf Pro.

## Solution (Force Manual Sync):

1. Log in to Jamf Pro.
2. Navigate to **Settings > Global Management > Volume Purchasing**.
3. Click on the **Location** associated with the app purchase.
4. Switch to the **Content** tab and click the **Force Update** or **Update** button at the bottom.
5. Wait 1-2 minutes and refresh the page; the newly purchased apps should appear.

## Checkpoint:

If it still doesn't appear after a forced sync, double-check that you selected the correct **Location** in ASM during purchase. A purchase made for "Campus A" will not be visible to an MDM server linked to "Campus B."

---

## File: app-18.md

---

id: app-18

title: "The App Store icon disappeared! How do I get it back?"

category: "Section 3: App Management & Distribution"

important: false

tags:
[
"App Store",

    "Missing Icon",

    "Troubleshooting",

    "Screen Time",

    "Restrictions",

## ]

**A missing App Store icon usually results from 'Screen Time' restrictions on the device or a 'Restrictions' profile from the MDM. Follow these steps to troubleshoot:**

## Step 1: Check Local 'Screen Time' (Most Common)

- **Path**: Go to **Settings > Screen Time > Content & Privacy Restrictions > iTunes & App Store Purchases**.
- **Key Setting**: Ensure **Installing Apps** is set to **Allow**. (_Note: This is a local iOS restriction; even if the MDM doesn't lock it, a user can accidentally disable it._)

## Step 2: Check MDM Restrictions Profile

- **Path**: Go to **Settings > General > VPN & Device Management** and inspect the "Restrictions" profile.
- **Key Setting**: Look for an entry stating **Allow installing apps using App Store** is disabled. (_Note: This restriction only applies to Supervised devices._)

## Step 3: Home Screen Search

Sometimes the icon is buried in a folder or has been "Removed from Home Screen" but remains in the App Library. Try pulling down on the Home Screen and searching for "**App Store**."

## Step 4: Reset Home Screen Layout (Last Resort)

If the icon is truly missing from the view, go to **Settings > General > Transfer or Reset iPad > Reset > Reset Home Screen Layout**. (_Warning: This will undo all customized app groupings and folders._)

---

## File: app-19.md

---

id: app-19

title: "How do I lock an iPad into a 'Single App' for exams? Can students exit themselves?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["Single App Mode", "ASAM", "Assessment Mode", "Risk Warning"]

**Standard 'Single App Mode' cannot be exited by the user. If you need exit flexibility, you should use 'Autonomous Single App Mode (ASAM)'.**

Choosing the wrong mode is a leading cause of "bricked" devices during school deployments:

## Mode 1: MDM-Enforced Single App Mode

- **Logic**: The administrator sends a lock command. The device remains locked until a second "unlock" command is received.
- **Risk**: **Network Dependency**. If Wi-Fi fails while locked, the device cannot receive the unlock command. Since the user cannot access Settings to reconnect Wi-Fi, the device is "stuck" and may require an Ethernet adapter (RJ45) or a full restore to rescue.
- **Use Case**: Kiosks, digital signage, library lookup stations.

## Mode 2: Autonomous Single App Mode (ASAM) — Recommended for Exams

- **Logic**: Permission is delegated to the app. When a student starts an exam, the **App locks itself**. Once the exam is submitted, the **App unlocks itself**.
- **Benefit**: No network dependency for unlocking. Even if the Wi-Fi drops, the student can finish the exam and the app can release the lock locally.
- **Setup**: In Jamf Pro, add the app's Bundle ID to the "Autonomous Single App Mode" allowlist in a Restrictions profile.

## Mode 3: Guided Access — Small Scale

- **Logic**: A local iOS feature (not MDM). A teacher triples-clicks the power button to lock.
- **Benefit**: Controlled by the person in the room; no "network bricking" risk.

## Practical Advice for 2026:

- **Formal Assessments**: Require your software vendor to support **ASAM** (e.g., LockDown Browser). This is the enterprise standard. **OS 26 integrates ASAM into the DDM framework, ensuring stability even during transient network drops.**
- **Informal Quizzes**: Use **Guided Access** for manual control.
- **Avoid**: MDM-Enforced Single App Mode for large groups of student devices unless you have 100% Wi-Fi confidence and Ethernet adapters on standby.

---

## File: app-20.md

---

id: app-20

title: "What is 'Declarative App Management' (DDM)?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["DDM", "App Deployment", "Status Monitoring", "New Tech"]

**Declarative Device Management (DDM) is a major evolution of the Apple MDM protocol, allowing devices to autonomously maintain their state based on 'Declarations' from the server.**

## Core Differences from Traditional MDM:

1. **Desired State Management**:
   - **Old Way**: Server sends an "Install App" command. If a user deletes the app later, the server must wait to scan the device again and re-send the command.
   - **New Way (DDM)**: Server declares "This app MUST exist." The device **continuously monitors itself**. If it detects the app is missing, it triggers a redownload automatically without waiting for a server command.

2. **Status Channel**:
   - The device **proactively** reports detailed app installation progress (e.g., waiting, installing, verification failed) to Jamf Pro via a lightweight status channel. This is much faster and uses less bandwidth than traditional "Server Polling."

3. **Predicates (Local Logic)**:
   - Administrators can set installation conditions (e.g., "Only install if OS version > 17"). The device performs this logic evaluation locally, removing the need for the server to perform heavy calculations for every device.

---

## File: app-21.md

---

id: app-21

title: "How do I prevent students from 'hiding' or 'locking' Managed Apps in iOS 18?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["iOS 18", "Hide App", "Lock App", "Restrictions"]

**The privacy features in iOS 18 allow users to lock or hide apps behind Face ID. This can interfere with classroom asset audits and instructional management.**

## MDM Countermeasures (Requires Jamf Pro 11.9+ and iOS 18+):

Administrators must enable two new restrictions in the **Restrictions** profile for **Supervised** devices:

1. **Disallow Locking Apps (allowLockedApps)**:
   - Prevents users from enabling Face ID/Touch ID verification for any app.
   - **Note**: Disabling this item also automatically disables the ability to hide apps.

2. **Disallow Hiding Apps (allowHiddenApps)**:
   - Prevents users from moving apps into the "Hidden" folder.

## Technical Detail:

These settings are deployed via **Declarative Device Management (DDM)** configurations in iOS 18+, which are more immediate than traditional profiles. Once applied, the options to "Require Face ID" or "Hide and Require Face ID" will be grayed out or removed from the app's long-press menu.

---

## File: app-22.md

---

id: app-22

title: "Purchasing Procreate vs. Procreate Pocket: What's the difference, and what if we bought the wrong version?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Procreate", "App Purchasing", "VPP", "Universal Purchase", "Refund"]

**Buying the wrong version of a high-profile app is a common clerical error in educational procurement.** These two apps are distinct product lines and do **not** support "Universal Purchase."

## Specification Comparison:

- **Procreate (iPad version)**: Designed specifically for iPadOS and Apple Pencil. Supports large canvases and the full brush engine. This is the industry standard for art classes. **Higher price point**.
- **Procreate Pocket (iPhone version)**: Designed for the smaller iPhone interface. While it _can_ be installed on an iPad (via compatibility mode), it will have black bars around the interface and lacks support for Pencil pressure sensitivity and tilt. **Lower price point**.

## Standard Process for Correction:

1. **Request a VPP Refund**:
   - The administrator should log in to **Apple School Manager**, go to **Settings > Payments and Billing > View Purchase History**.
   - Alternatively, log in to **reportaproblem.apple.com** using the Managed Apple Account used for the purchase.
   - Select the order and "Request a refund," citing "Purchased wrong version." (_Note: Apple typically decides on refunds within 24–48 hours._)

2. **Re-purchase**:
   - Because the licenses are not interchangeable, you must purchase the correct iPad version to deploy it to student iPads.

3. **Clean Up**:
   - In Jamf Pro, ensure you remove the "Pocket" version from any scopes to prevent students from installing the low-resolution version, which would degrade the classroom experience.

---

## File: app-23.md

---

id: app-23

title: "What is 'Declarative App Management' (DDM), and how does it differ from traditional VPP?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["DDM", "App Management", "Declarative", "Auto-Update", "iOS 26"]

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

---

## File: app-24.md

---

id: app-24

title: "How do I restrict student iPads to download apps only over Wi-Fi to save cellular data?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["Cellular Data", "Wi-Fi", "App Download", "Traffic Management", "iOS 26"]

**In iOS 26 and iPadOS 26, the 'Declarative Device Management' (DDM) framework includes a new 'Restrict App Download Over Cellular' setting. This allows schools to force apps to download or update only in Wi-Fi environments, effectively managing SIM card data costs.**

## Configuration

This feature is implemented via **DDM** configurations. In **Jamf Pro**:

1. Go to **Blueprints** or **App Declarations**.

2. Define the policy for individual managed apps or a group of apps.
3. Set the **'CellularDataPolicy'** in the deployment declaration:
   - **Disallow**: Forces download/update to happen only over Wi-Fi.
   - **Allow**: Permits installation over any available network.

4. Deploy to the target group (Requires **iOS 18+** and a **Supervised** device).

## Use Cases and Benefits

- **Subsidized SIM Cards**: Many government projects provide iPads with limited monthly data (e.g., 10GB). This prevents students from accidentally exhausting the plan by downloading large apps or updates outside of school.
- **BYOD/Parent-Paid Plans**: For personal devices where parents pay for the data, this setting helps prevent high bills caused by background app activity.

## Impact and Limitations

- **Applies to**:
  - Manual App Store downloads.
  - MDM-initiated (DDM) automated installs.
  - App auto-updates.

- **Does NOT apply to**:
  - General web browsing or video streaming (YouTube still consumes data unless managed by a Content Filter).
  - In-app content updates (e.g., additional data packs inside a game).

- **User Experience**: When a student tries to download an app on 4G/5G, the button will be grayed out or a prompt will appear: "Please connect to Wi-Fi to download."

## Expert Strategy

Restricting app downloads is only one part of data management. For complete control, combine this with:

- **Content Filtering**: To block data-heavy sites or streaming.

- **Per-App VPN**: To route specific app traffic only through school-approved gateways.
- **User Education**: Teaching students to identify high-bandwidth behaviors.

---

## File: app-25.md

---

id: app-25

title: "How do I use 'Declarative .pkg Deployment' in macOS 26? How does it differ from Jamf Policies?"

category: "Section 3: App Management & Distribution"

important: false

## tags: ["macOS 26", "Package", "DDM", ".pkg", "Jamf Policy"]

**macOS 26 (Tahoe) extends Declarative Device Management (DDM) to support non-App Store software (.pkg). This allows you to deploy installation packages via 'Declarations' for a more modern, transparent, and resilient installation experience compared to the legacy Jamf Binary/Policy method.**

## DDM Package vs. Jamf Policy

| Feature             | Jamf Policy (Legacy)                                       | DDM Package Declaration (Modern)                                         |
| :------------------ | :--------------------------------------------------------- | :----------------------------------------------------------------------- |
| **Execution**       | Relies on the `Jamf` binary to run scripts and installers. | Relies on the macOS native MDM framework.                                |
| **Trigger**         | Requires a trigger (e.g., Login, Recurring Check-in).      | **Autonomous**. Device installs as soon as conditions are met.           |
| **Status Channel**  | Reported through Jamf logs with potential delay.           | **Real-time** reporting of progress and error codes to MDM.              |
| **Offline Support** | Must be online to trigger the check-in.                    | If the declaration is local, the device handles install retries offline. |
| **Suitability**     | Best for complex scripts and .dmg installs.                | Best for standard signed **Distribution Packages (.pkg)**.               |

## Requirements & Limitations

- **OS**: macOS 26 (Tahoe) or later.
- **Package Quality**:
  - Must be a **Distribution Package** (not a basic component pkg).
  - Must be **signed** with a valid Apple Developer ID Installer certificate.
  - Must be **notarized** by Apple. MDM deployment in macOS 26 is extremely strict regarding security; unsigned or un-notarized packages will fail with a `VerificationFailed` error in the status channel.

## When to use each?

- **Use DDM Packages**: For standard core software (Microsoft Office, Google Chrome, Adobe Acrobat) on macOS 26+ machines where you need high visibility of success rates.
- **Use Jamf Policies**: For legacy machines (v25 and below), complex workflows (requires post-install scripts or UI interaction), or non-standard installers (DMGs).

## Expert Tip: The Notarization Check

Before uploading a .pkg to Jamf for DDM deployment, run the following command on your admin Mac to ensure it will be accepted by macOS 26:

`pkgutil --check-signature path/to/your.pkg`

If the signature chain is not valid all the way to the Apple Root CA, the DDM deployment will be rejected by the client device's security framework.

---

## File: app-26.md

---

id: app-26

title: "How to manage the AI-assisted teaching apps in 2024–2025 (e.g., Writing Tools, Image Playground)?"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["AI", "Apple Intelligence", "App Management", "Privacy", "Exam Security"]

**With Apple Intelligence reaching full maturity in 2024–2025, teaching apps have entered the "AI-Assisted Era."**

For schools, the primary challenge is balancing the productivity gains of AI with academic integrity, data privacy, and security. iOS 26/iPadOS 26 provides granular MDM controls to manage these features.

## 1. Controlling Core AI Features

Administrators can manage these via a "Restrictions" profile in Jamf Pro:

- **Writing Tools**: Can be set to "Allow All," "On-Device Processing Only," or "Disabled." During formal exams, it is recommended to disable this via a DDM declaration to ensure students write independently.

- **Image Generation (Image Playground / Genmoji)**: Access can be restricted to specific grade levels or limited to certain apps (e.g., Freeform).

## 2. Auditing Third-Party AI Apps

For apps integrating third-party LLMs (e.g., OpenAI, Google Gemini):

- **Review Privacy Labels**: App Store requirements in 2026 demand transparent AI privacy labels. Admins should prioritize apps labeled as "Not tracking personal data" or "Contextual reasoning only."

- **VPP Distribution**: Distribute approved AI tools via Jamf Pro and restrict students from downloading unvetted AI apps from the App Store.

## 3. Flexible Management in the Classroom

- **Using Jamf Teacher/Classroom**: Teachers can use "App Lock" to keep students within a specific app, which automatically suppresses system-wide AI Writing Tools.
- **Network-Level Filtering**: Install a "Content Filtering" profile via MDM to precisely control access to AI model servers if there are concerns about over-reliance on browser-based AI tools.

## 💡 Strategy Tip:

Instead of a total ban, consider allowing AI tools for "Creative projects" while using Jamf Pro to push "Assessment Mode (ASAM)" to automatically disable all AI assistants during exams.

---

## File: app-27.md

---

id: app-27

title: "How to update apps via Jamf Pro? (Automated Enforcement and Manual Force Update)"

category: "Section 3: App Management & Distribution"

important: true

## tags: ["App Update", "Jamf Pro", "Manual Update", "Auto Update", "DDM"]

**In Jamf Pro, app updates are primarily managed through "Automated Enforcement" and the "Force Update" button.** To ensure classroom iPads remain up-to-date, it is recommended to combine automated checking with manual enforcement when necessary.

## 1. Configuring Automated Updates and Sync Schedules

Go to **Devices > Mobile Device Apps** and select the app you wish to manage. In the **"General"** tab, configure the following:

- **Schedule App Checks**: Check the option **"Automatically check for app updates"**. This ensures Jamf Pro stays informed about new descriptions, icons, and versions.

- **Automated Enforcement**: Check **"Automatically force app updates"**. The system will then automatically send update commands to mobile devices whenever a new version is detected.
- **Sync Time**: Adjust the **"App Store Sync Time"** to a time outside of school hours (e.g., midnight) to avoid peak network traffic.

## 2. Manually Forcing App Updates (Force Update)

For urgent updates, navigate to **Devices > Mobile Device Apps** and select the target app. You can trigger an update manually without waiting for the schedule:

1. Go to the detailed information page for the app.

2. Scroll down to the **"Force App Update"** section.
3. Click the **`Force Update`** button. Jamf Pro will immediately send a force update command to all devices within the app's **"Scope."**

## 3. Considerations for 2026: DDM and Update Constraints

In iOS 26 and the latest system environments, update execution is still subject to the following rules:

- **In-Use Limitation**: If a student is currently using the app, the update will remain "Pending." Forcing the update will attempt to close the app, which may cause a crash during teaching.

- **Single App Mode**: If an iPad is in "Guided Access" or "Single App Mode," it will not receive or install app updates. The mode must be deactivated first.
- **Silent Conversion**: If an app was originally installed manually by a student, ensure **"Convert unmanaged app to managed"** is enabled so Jamf Pro can take control.

**💡 Pro Tip**:

When pushing mass updates, ensure your school's **"Content Caching"** server is working properly to prevent all iPads from downloading from Apple simultaneously and saturating your bandwidth.
