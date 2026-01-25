---
File: dl-1.md
---

---

id: dl-1

title: "The VPN icon disappeared after updating to iPadOS 17. Is this normal?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

## tags: ["iPadOS 17", "VPN", "Jamf Trust", "MOE Project", "Architecture"]

**Yes, this is completely normal. It reflects a shift in the management architecture designed to optimize connection speeds and ensure compatibility with local educational network standards.** In alignement with the latest digital learning policies, the **Jamf Trust** agent has transitioned from a full-tunnel VPN to a more efficient **"DNS Proxy"** and **"Content Filter"** architecture.

## Key Changes:

1. **Icon Removal**: Because the system no longer creates a global VPN tunnel, the "VPN" label is no longer displayed in the status bar. This does **not** mean the device is unprotected.
2. **Improved Performance**: This new architecture significantly reduces battery drain and resolves common issues such as network lag during classroom app updates.
3. **Local Network Compatibility**: By moving away from a traditional VPN tunnel, devices can communicate more efficiently with local campus caching servers, ensuring that heavy educational content (like video lessons) loads faster.

## How to Verify Protection is Active:

- **Check the App**: Open the **Jamf Trust** app on the iPad. If you see a **Green Shield (Protected)**, the filtering and data reporting functions are operating correctly.
- **Inventory Status**: In the Jamf Pro dashboard, verify that the "Content Filter" and "DNS Proxy" configuration profiles are listed as "Installed" for that device.

## Institutional Advice:

If you see yellow or red warnings inside the Jamf Trust app regarding "Passcode not set" or "OS outdated," you can usually ignore these as long as the main shield remains green. The device is still successfully reporting its status for compliance purposes.

---

## File: dl-2.md

---

id: dl-2

title: "The MOE dashboard shows some devices as 'Unused' or failing to upload data. How do we fix this?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

## tags: ["Data Reporting", "Troubleshooting", "Jamf Trust", "Usage Metrics"]

**Incomplete usage data is usually caused by the Jamf Trust agent being closed, devices staying offline, or missing configuration profiles.** For institutional compliance, the Jamf Trust app must remain active in the background to report student engagement. If a device shows zero activity, follow these steps:

## Common Causes & Solutions:

### 1. App being Force-Closed (Most Common)

- **The Issue**: Students often "swipe up" to close all apps in the multitasking view. This kills the Jamf Trust background process, stopping all data reporting.
- **The Fix**: Educate students that Jamf Trust is a "System Service" that must always be left open in the background. Note: You can also use MDM restrictions to prevent students from removing the app entirely.

### 2. Network Firewall Blocks

- **The Issue**: The device is on Wi-Fi, but the campus firewall is blocking the specific AWS or Jamf Cloud ports required for reporting.
- **Test**: Connect the device to a mobile hotspot. If the data uploads immediately, you need to ask the network administrator to allowlist Jamf’s reporting domains.

### 3. Profile Desynchronization

- **The Issue**: The app is installed, but the **DNS Proxy** or **Content Filter** profile is missing or inactive.
- **The Fix**: Send an **"Update Inventory"** command via Jamf Pro. If the problem persists, re-push the Jamf Trust configuration profile to the affected devices.

## Operational Note:

Usage dashboards often have a **T+1 delay** (24-hour lag). If you fix a device today, you likely won't see the updated status in the official MOE portal until the following day.

---

## File: dl-3.md

---

id: dl-3

title: "How do I perform a 'Reset Network Settings'? What are the risks to my MDM connection?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Troubleshooting", "Reset", "Network", "Connection Help"]

**Resetting network settings is a powerful way to solve stubborn Wi-Fi issues, but it carries the risk of making the device an "unmanaged device" if not handled carefully.**

## The "unmanaged device" Risk:

If you are in the middle of a Wi-Fi migration (transitioning from an old SSID to a new official school network), **do not delete the old profile first**.

- **Correct Process**: Push the new Wi-Fi profile via MDM -> Verify connection -> Only then remove the old setting.

- **The Danger**: If you reset all network settings and the iPad cannot "auto-join" any available school Wi-Fi, it will lose its connection to Jamf Pro. You will then have to manually reconnect every device by hand to restore management.

## When to Perform a Reset:

Use this only when the device shows "Unable to Join Network," fails to see any Bluetooth devices, or Jamf Trust is permanently stuck in a "Connecting" loop that a restart won't fix.

## Steps to Reset:

1. Navigate to **Settings > General > Transfer or Reset iPad > Reset**.
2. Select **Reset Network Settings**. The iPad will reboot.
3. **After Reboot**: All saved Wi-Fi passwords and Bluetooth pairings are wiped. Managed Wi-Fi profiles pushed by the school should automatically re-apply once the device is unlocked and detects the campus signal.

## Practical Tip:

Before resorting to a full network reset, always try toggling **Airplane Mode** for 10 seconds or performing a hard restart. These solve 90% of connectivity hang-ups without erasing your saved configurations.

---

## File: dl-4.md

---

id: dl-4

title: "How do I create Smart Groups specifically for tracking different phases of our hardware rollout?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Group Management", "Automation", "Smart Groups", "Asset Tracking"]

**Smart Groups are the "sorting bins" of Jamf Pro. They allow you to automatically categorize devices based on their purchase year, model, or health status.** Using Smart Groups, you can target specific "batches" of hardware with unique apps or restrictions without having to manually select each iPad.

## Common Logic Examples:

### 1. Based on Naming Conventions (Recommended)

- If you named your new arrivals with a year prefix (e.g., `2025-iPad-001`).
- **Criterion**: Device Name **like** `2025-%`.
- **Result**: All devices from the 2025 intake are instantly grouped for easy management.

### 2. Based on Asset Tags

- If you uploaded a CSV of your asset tags into Jamf.
- **Criterion**: Asset Tag **is** `EDU-PROJ-A`.

### 3. To Monitor Failure Points

- **Criterion**: Application Title **does not have** `Jamf Trust`.
- **Purpose**: This creates a "Live Hit List" of every device that has accidentally lost its reporting agent, allowing the ICT team to intervene precisely.

## How to Set it Up:

Log in to Jamf Pro > **Devices > Smart Device Groups > New**. After defining your criteria, check the box for **"Show in Dashboard."** This gives you a real-time "progress bar" on your management homepage to see how many devices are compliant with your school standards.

---

## File: dl-5.md

---

id: dl-5

title: "Students are deleting the Jamf Trust app. How does this affect compliance, and how do we prevent it?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Compliance", "Security", "Restrictions", "Jamf Trust"]

**Deleting Jamf Trust effectively blinds your reporting system. The device will be marked as "Unused" in official compliance audits, even if the student is using it for class every day.** To ensure your school meets its Key Performance Indicators (KPIs), you must implement technical safeguards.

## Barrier 1: Prevent App Deletion (Most Effective)

1. In Jamf Pro, edit the **Restrictions** profile assigned to the student devices.
2. Uncheck the box for **"Allow removing apps."**
3. **The Result**: When a student long-presses any icon, the "Delete" option simply does not appear. This is the most robust way to ensure the agent remains on the device.

## Barrier 2: Automated Self-Healing

1. In the Jamf Pro settings for the Jamf Trust app, ensure the Distribution Method is set to **"Install Automatically."**
2. Make sure the app is "In Scope" for all student groups.
3. Even if a student manages to bypass restrictions and delete the app, the device will detect the "Missing App" status during its next check-in and forcefully reinstall Jamf Trust in the background.

## Institutional Advice:

Create a Smart Group for "Devices Missing Jamf Trust" (Logic: Application Title _does not have_ Jamf Trust). Set this as a tile on your Jamf dashboard. If the number is greater than zero, your ICT team knows exactly which students need to be called in for a hardware check.

---

## File: dl-6.md

---

id: dl-6

title: "How can I temporarily unblock certain websites needed for teaching?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Content Filtering", "Exclusions", "YouTube", "Jamf Trust", "DNS Proxy"]

**Filtering rules for the Digital Learning Project are typically managed by higher-level authorities (Educational Bureaus). Modifying the blocklist is not recommended, but if an immediate exception is required for teaching, an "Exclusion" strategy is preferred.**

Depending on your specific needs, you can choose one of the following solutions:

## Method 1: Temporarily Exclude the Device (Jamf Trust Scope Exclusion)

1. Log in to Jamf Pro.
2. Navigate to the Jamf Trust **Configuration Profile (DNS Proxy / Content Filter)**.
3. Go to **Scope > Exclusions**.
4. Add the teacher's iPad or a specific class group to the exclusion list.
5. Once saved, the device will remove the filtering settings upon its next check-in, allowing access to sites like YouTube.

**Important**: Ensure you remove the exclusion after class. Otherwise, the device will permanently lack protection and data reporting.

## Method 2: AirPlay via Teacher Device

If students only need to "view" content rather than "interact" with it, it is recommended that the teacher play the video on their own device (which typically has less restrictive filtering) and project it to the classroom Apple TV via AirPlay.

## Practical Advice: Risk Management

- **Data Interruption**: Once a device is excluded from the Jamf Trust scope, **traffic data reporting stops completely.** Avoid long-term exclusions for student devices, as this will affect the school's usage rate KPIs.
- **Content Control**: Once unblocked, students can access all websites (including inappropriate content). Teachers must closely monitor student activity during this time.

---

## File: dl-7.md

---

id: dl-7

title: "Why is 'iCloud Private Relay' forced off on school iPads? Does this affect privacy?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["iCloud", "Private Relay", "Digital Learning Project", "Policy Info"]

**This policy ensures that 'Jamf Trust' functions correctly. Enabling this feature would disable the school's content filtering and stop usage data reporting.**

## Current Situation:

On Supervised devices within the Digital Learning Project, you will typically find the "Private Relay" switch under **Settings > iCloud** is **greyed out and set to 'Off'.** This is a mandatory restriction enforced via MDM configuration profiles.

## Why Must it be Disabled? (Technical Conflict)

1. **Filtering Failure**: iCloud Private Relay encrypts DNS queries and routes them through Apple's relays. This prevents Jamf Trust from identifying whether a student is visiting inappropriate or malicious sites, effectively bypassing the "Safe Search" features.
2. **Data Loss**: Because traffic is encrypted and hidden, Jamf Trust cannot calculate traffic volume or usage time. This leads to **anomalous usage data (showing as zero or very low)** on official reports, which affects school KPI evaluations.

## Does this Invade Privacy?

- **No.** Disabling Private Relay simply means traffic does not go through Apple's dual-encryption tunnel; it returns to standard network transmission.
- The school's MDM and filtering mechanisms follow strict cybersecurity regulations. They only block harmful sites and track "usage hours." Administrators cannot see specific Google search keywords or private messages.

## Practical Advice:

If you find a student iPad that **can enable** Private Relay, it means the device has likely **fallen out of management** or **missed the restriction profile.** Ensure you run "Update Inventory" or redeploy the restriction settings in Jamf Pro for that device.

---

## File: dl-8.md

---

id: dl-8

title: "If school Wi-Fi is poor, can I connect the iPad to a wired network (Ethernet)?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Network", "Wired Connection", "Ethernet", "Lightning", "iPad 9"]

**Yes. Whether it's an older Lightning-based iPad or a newer USB-C model, they all support wired network connections via adapters.**

## Hardware Requirements & Choices:

### 1. Lightning Models (e.g., iPad 9th Gen)

- **Dedicated Adapter**: We recommend the **Belkin Ethernet + Power Adapter with Lightning Connector**.
- **Limitation**: Lightning ports have very limited power output. You **must** use an adapter with a charging port and connect a power source; otherwise, you will see a "device uses too much power" error.

### 2. USB-C Models (e.g., iPad 10th Gen, iPad Air, iPad Pro)

- **Universal USB-C to RJ45**: Standard USB-C network adapters are typically "plug-and-play."
- **Recommendation**: While an external power source isn't always required to drive the adapter, we still suggest using a **Hub with a PD charging port** to ensure the device stays charged during instruction.

### 3. RJ-45 Cable

Connect the adapter to the Ethernet wall jack in the classroom.

## Setup Steps:

1. Plug the adapter into the iPad.
2. **Crucial Step: Connect Power.** Plug the charging cable into the adapter's power port (especially for Lightning models).
3. Connect the Ethernet cable.
4. An **Ethernet** option will appear in the iPad **Settings**.
5. Check if the IP address is fetched correctly (usually via DHCP).

## Practical Advice:

- **Jamf Trust Support**: Protection and traffic tracking function normally over both Wi-Fi and Ethernet.
- **Priority**: When an Ethernet cable is connected, the iPad automatically prioritizes the wired connection, reducing the load on the Wi-Fi AP.
- **Firewall Rules**: Ensure the wired network VLAN also allows the necessary communication ports for Apple and Jamf services.

---

## File: dl-9.md

---

id: dl-9

title: "Does MDM monitor the student's location (GPS) at all times?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Privacy", "Location", "GPS", "Lost Mode"]

**No. Apple's privacy architecture strictly limits MDM's location permissions. Under normal conditions, schools cannot obtain a device's GPS coordinates.**

## The Only Exception: Lost Mode

Administrators can only trigger location tracking if a device is specifically marked as "Lost."

## Privacy Comparison Table:

| Status                 | Administrator Access             | Student Notification                         |
| :--------------------- | :------------------------------- | :------------------------------------------- |
| **Normal Usage**       | **Cannot Locate**                | None                                         |
| **Lost Mode Enabled**  | **Can Get One-time Coordinates** | Lock screen displays "This iPad is lost..."  |
| **Lost Mode Disabled** | **Location Stops Immediately**   | Notification shows "MDM located this device" |

## Practical Advice:

- School MDM **cannot see** a student's photos, messages, or browsing history (it can only filter domains, not see specific page content).
- The location feature is used solely for "asset recovery," never for monitoring a student's movements after school hours. This complies with GDPR and national cybersecurity standards.

---

## File: dl-10.md

---

id: dl-10

title: "Can students remove school management by 'Resetting' or 'DFU Restoring' the iPad?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["ADE", "ASM", "DFU", "Reset", "Activation Lock", "Remote Management"]

**No. This will only result in the loss of all local data, and the device will be forcibly re-locked into the school's MDM during setup.** Students often mistakenly believe that MDM is just an app that can be wiped by "formatting" the device. In reality, management is tied to the **Hardware Serial Number** and **Cloud Activation Servers**, not just local software.

## Technical Workflow (Why it doesn't work):

### 1. Back to the Hello Screen (Setup Assistant)

After a DFU restore or factory reset, the system is wiped and returns to the "Hello" welcome screen. The device appears new at this stage.

### 2. Cloud Verification (The Gatekeeper)

**The Crucial Moment**: When the student selects a language and connects to Wi-Fi to activate the device, the iPad's underlying system MUST report to **Apple's Activation Servers**. The server immediately checks the **Serial Number**.

### 3. Forced Recall (Chain of Trust)

Once the Apple server confirms the serial number belongs to the school via **Apple School Manager (ASM)**, it refuses to let the user set it up as a personal device. It forces the device into the **Remote Management** screen.

- **Result**: The screen will display "This iPad will be automatically configured by [Your School Name]."

### 4. The Dead End

- If the MDM is set to "Mandatory Enrollment," the student cannot skip this step.
- If the school has enabled account authentication, the student will be **stuck at the login screen** without the correct credentials, rendering the device unusable.
- Failed restore attempts can also leave the device in Recovery Mode, creating an administrative burden for the ICT Support Team.

## Practical Advice:

- **Data Disaster**: Restoring a device is almost always an irreversible operation for local data. Students will likely **permanently lose** unsynced photos, Goodnotes, and homework.
- **Administrative Burden**: When a student fails a restore attempt, they ultimately have to return the bricked device to the IT staff, who must then spend time restoring it in DFU mode and re-enrolling it for classroom use.

---

## File: dl-11.md

---

id: dl-11

title: "How do I transfer 'Digital Initiative' iPads from graduating students to new students?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Graduation", "Asset Transfer", "Return to Service", "Automation"]

**Utilize the 'Return to Service (RTS)' feature to achieve a seamless transition from 'Wipe' to 'Redeploy' without manual Wi-Fi configuration.** Graduation season is a major event for device management. We recommend the following automated workflow:

## Standard Operating Procedure (SOP):

1. **Backup for Graduates (T-minus 2 weeks)**:
   - Notify students to export personal photos and projects to Google Drive or external storage.
   - Encourage students to manually sign out of personal Apple or Google accounts to avoid cloud-lock disputes (though MDM can forcibly clear the device).

2. **Execute Return to Service (Recommended)**:
   - Select the graduate devices in Jamf Pro.
   - Send the **Wipe Device** command.
   - **Crucial Step**: Check **Return to Service** in the command options and specify the school's Wi-Fi profile.
   - **Result**: The device will erase, automatically reconnect to Wi-Fi, skip initial setup, and land on the "Remote Management" screen awaiting the new student.

3. **Physical Inspection & Cleaning**:
   - Inspect hardware for damage. Clean using 75% ethyl alcohol wiped onto a cloth (avoid direct spraying).
   - For summer storage, maintain battery levels between 50%-60% and power the device off to prevent deep discharge.

4. **Issuance to New Students**:
   - New students power on the device to see the "Remote Management" screen. They follow the updated PreStage Enrollment settings (e.g., login with student ID) to complete activation.

---

## File: dl-12.md

---

id: dl-12

title: "Why can't my device get online even when connected to Wi-Fi, or why is it blocked by the firewall?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

## tags: ["Network", "MAC Address", "Private Address", "DHCP", "Troubleshooting"]

**This is usually because the iPad has 'Private Wi-Fi Address' enabled, preventing the school firewall or DHCP server from identifying the device by its hardware MAC address.**

## Technical Background:

The Private Address feature was introduced in iOS 14. Starting with **iOS 18**, it is further categorized as:

- **Fixed**: Uses a consistent random address for a specific Wi-Fi network (Default).

- **Rotating**: Changes the address approximately every two weeks. This high security level often causes campus network systems (which rely on MAC binding) to fail.

## MDM Solution (Universal Disable):

Administrators should not ask students to adjust this one-by-one. Instead, use Jamf Pro to push a unified Wi-Fi profile:

1. In Jamf Pro, go to **Configuration Profiles > Wi-Fi**.

2. In the **Private Wi-Fi Address** (or "MAC Address Randomization") option, select **Disabled**.
3. **Result**: When the iPad connects to this SSID, it is forced to use its real hardware MAC address, allowing network infrastructure (like MAC authentication and security logs) to function correctly.

## Practical Advice:

This setting only applies to Wi-Fi networks deployed via MDM profiles. If a student manually joins a Wi-Fi network, they must still manually go to **Settings > Wi-Fi > (i) Icon** to disable the Private Address.

---

## File: dl-13.md

---

id: dl-13

title: "How do I prevent students from signing into personal Apple Accounts and installing non-educational apps?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Apple Account", "App Store", "Restrictions", "Asset Policy"]

**This is a fundamental control for school-owned deployments. To avoid app ownership confusion and privacy risks, you must use a 'Restrictions' profile to lock account settings and App Store access.** School-issued devices are public assets and should not allow personal account usage.

## Standard Protection Settings (Jamf Pro):

1. **Lock Account Modification (Crucial)**:
   - In the **Restrictions > Functionality** section.
   - **Uncheck** `Allow modifying account settings`.
   - **Result**: The Apple Account section at the top of the iPad Settings menu will turn gray and become unclickable. Students will be unable to sign in or out of any account.

2. **Disable App Store**:
   - **Uncheck** `Allow installing apps using App Store`.
   - **Result**: The App Store icon will disappear from the Home Screen entirely.
   - **Management**: All apps should be pushed via the MDM using **Volume Purchase (VPP)** with Device-based Assignment.

---

## File: dl-14.md

---

id: dl-14

title: "Students keep changing their iPad names, making it hard to track assets. How can I fix this?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Device Naming", "Asset Management", "The MUT", "Batch Update"]

**This is a common classroom management headache. Beyond 'Blocking Changes,' you need a 'Batch Renaming' tool to quickly correct your entire fleet.**

## The Three-Step Solution:

### 1. Stop the Bleed: Disable Local Modification

- In the Jamf Pro **Restrictions** profile, **uncheck** `Allow modifying device name`.
- **Result**: The "Name" field in **Settings > General > About** will turn gray and become unclickable.

### 2. The Treatment: Batch Rename with 'The MUT'

To correct hundreds of already-mislabeled iPads, use **The MUT (Mass Update Tool)**.

- **Download**: Search for "The MUT" in the Mac App Store (Free tool developed by Jamf employees).

- **Action**:
  1. Prepare a CSV with two columns: **Serial Number** and **Device Name**.
  2. Open The MUT, log in with your Jamf Pro credentials.
  3. Upload the CSV and click **Update**.
  4. The system will instantly push renaming commands to all targeted devices.

### 3. Prevention: Enforce Naming

Enable **Enforce Mobile Device Name** in your smart groups or device records in Jamf Pro.

- **Result**: This background mechanism monitors the fleet. If a device name deviates from the record (e.g., if a student bypasses a restriction), the MDM automatically pushes a correction command.

## Practical Advice:

For future deployments, define your naming convention (e.g., `Class-2026-%SERIALNUMBER%`) directly within the **PreStage Enrollment** settings. New devices will be named automatically upon activation without any manual effort.

---

## File: dl-15.md

---

id: dl-15

title: "Updating all iPads at once crashes our school network. What is the standard solution? (Content Caching)"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Content Caching", "Bandwidth Optimization", "VLAN", "mDNS Relay"]

**For schools with high-density Wi-Fi, deploying macOS 'Content Caching' is key to solving bandwidth bottlenecks. However, you must address cross-VLAN communication hurdles.** By using an existing Mac (e.g., a teacher's Mac mini or a lab iMac) as a cache server, only the first iPad downloads the update from Apple; all subsequent devices fetch the file locally via the LAN at high speed.

## Standard Setup Steps:

1. **Hardware**: Use an Apple Silicon Mac (M1-M5) running **macOS 15 (Sequoia)** or later.
2. **Enable**: Go to **System Settings > General > Sharing** and toggle on **Content Caching**. A green light indicates it is active.

## Solving Cross-VLAN Discovery (Three Solutions):

### Option 1: Mac Joins Student Wi-Fi (Simple/Self-service)

If you cannot change network infrastructure settings, this is the quickest fix.

- **Action**: Turn on Wi-Fi on the Mac and connect it to the same SSID as the students (e.g., `School-Student`).

- **Logic**: Placing the Mac on the same subnet as the iPads allows mDNS to work instantly.
- **Downside**: Distributing data via Wi-Fi consumes wireless "Airtime," making it slower than a wired connection.

### Option 2: mDNS Relay / Bonjour Gateway (Network Admin Level)

The best architectural solution.

- **Action**: Ask your network administrator to enable **mDNS Relay** or **Bonjour Gateway** on your core switches or firewall.

- **Logic**: Allow **UDP Port 5353** traffic to pass between your "Wired VLAN" and "Wireless VLAN." iPads can then discover the Mac across different subnets.

### Option 3: DNS TXT Records (Official Enterprise Standard)

- **Action**: Add a `_aaplcache._tcp` **TXT Record** to your internal DNS pointing to the Mac’s IP. This tells iPads exactly where the cache server is without relying on mDNS.

## Verification:

Open **Activity Monitor** on the Mac and press `Command + 2` to see the **Cache** tab. You can monitor "Data served from cache" in real-time as iPads update.

## Practical Advice:

Ensure the Mac is set to **Prevent the computer from sleeping automatically when the display is off**. If the Mac sleeps, the cache service stops, and iPads will revert to the external internet, crashing your bandwidth.

---

## File: dl-16.md

---

id: dl-16

title: "MOE Jamf Pro accounts can't use 'Scheduled Updates'. How do I increase update success rates?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Software Update", "Jamf Pro", "Permissions", "Inventory"]

**Because the MOE Jamf Pro environment uses 'legacy' update commands, the key to success is 'Verifying Connectivity' before sending the update.** Many failures occur because devices are "unmanaged" (e.g., Wi-Fi disconnected or long-term sleep). Sending an OS update command to an unresponsive device is futile.

## Standard Operating Procedure (SOP):

### 1. Wake Devices and Update Inventory

Before sending a massive OS update, push an **Update Inventory** command to the group.

- **Goal**: Confirm the device is "alive" and get the latest **Battery Level** and **Available Space** data.

- **Tip**: If "Update Inventory" remains "Pending," the device is offline. Do not send the OS update yet; it needs to be physically unlocked and connected.

### 2. Filter Eligible Devices (Smart Group)

Use the fresh inventory data to filter for a "Ready to Update" group:

- **Battery > 50%**: (Apple hard-requirement; the command will fail below this).

- **Available Space > 10 GB**: To prevent download failures.

### 3. Send the Remote Command

- Use **Mass Actions > Send Remote Commands**.
- Select **Update OS version on supervised devices**.
- **Key Settings**:
  - Target Version: `Latest version based on device eligibility`.
  - Action: **`Download and install the update, and restart devices after installation`**. (If you only select 'Download', the update will never finish).

### 4. Batched Deployment

If the school lacks a **Content Caching** server, send updates in batches (e.g., one class at a time) to avoid crashing the school's external bandwidth.

---

## File: dl-17.md

---

id: dl-17

title: "How do I set a unify school wallpaper and prevent students from changing it?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Wallpaper", "Lock Screen", "Restrictions", "Automated Management"]

**This is a common requirement for asset branding. We recommend using 'Automated Management' to set the image and 'Restrictions' to lock the permission.**

## Implementation Steps (Jamf Pro):

### 1. Automated Management (Recommended)

- **Scenario**: The wallpaper is set automatically the moment a device is assigned to a group (e.g., "Freshmen iPads").
- **Path**: Go to a **Smart Device Group > Automated Management** tab.
- **Setting**: Click **Set Wallpaper**.
- **Upload**: Upload your school logo/wallpaper (JPG/PNG). Apply it to both the "Lock Screen" and "Home Screen."

### 2. Manual Mass Action

- **Scenario**: Setting a one-time wallpaper for a school anniversary or event.
- **Path**: In the group view, click **Action > Send Remote Commands > Set Wallpaper**.

### 3. Critical Step: Lock Modification

- **Path**: In a **Restrictions** profile > **Functionality**.
- **Setting**: Uncheck **Allow modifying wallpaper**.
- **Effect**: The "Wallpaper" option in the iPad Settings menu will be grayed out, preventing students from changing it.

### 4. Advanced: Lock Screen Message

Instead of editing every image, use the **Lock Screen Message** payload.

- **Setting**: Use Jamf variables like `Owned by: $DEVICENAME` or `Asset: $ASSET_TAG`.

- **Effect**: This dynamic text appears at the bottom of the Lock Screen, making physical audits much easier.

---

## File: dl-18.md

---

id: dl-18

title: "A student forgot their iPad passcode. Do I have to factory reset the whole device?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

## tags: ["Passcode", "Unlock", "Clear Passcode", "Troubleshooting"]

**No. MDM provides a 'Clear Passcode' command that removes the lock while 'Keeping All Data'.**

## Standard Rescue Steps (Jamf Pro):

1. **Verify Status**: Ensure the device is powered on and connected to the internet.

2. **Send Command**:
   - In Jamf Pro, go to the device record.
   - Click **Management > Remote Commands > Clear Passcode**.

3. **Result**:
   - Within 3-5 seconds, the iPad screen should flicker.
   - The passcode is removed. You can swipe to enter the Home Screen immediately. **Note: Biometric data (Touch ID / Face ID) is also cleared and must be re-registered.**

## What if the iPad has no internet?

If the device is in Airplane Mode or the Wi-Fi is disconnected, the MDM command cannot reach it.

- **The Pro Move: Force Ethernet**:
  - **Lightning Models (iPad 9)**: Use a "Lightning to Ethernet Adapter" (must be connected to a power source).
  - **USB-C Models (iPad 10/Pro)**: Use a standard "USB-C to Ethernet Adapter."
  - **Action**: Plug the adapter into the locked iPad and connect a network cable. The iPad will automatically fetch an IP via DHCP. Once online, the "Clear Passcode" command waiting in the cloud will execute instantly, unlocking the device.

## Final Resort:

Only if Ethernet and Wi-Fi both fail should you perform a full DFU/Recovery mode reset.

---

## File: dl-19.md

---

id: dl-19

title: "Troubleshooting: Apple Classroom keeps losing student connections or showing 'Offline'."

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

tags:
[
"Apple Classroom",

    "Classroom Management",

    "Troubleshooting",

    "Bluetooth",

    "mDNS",

## ]

**Apple Classroom is highly dependent on 'Bluetooth Proximity' and 'Peer-to-Peer Interoperability'. If connections fail, follow this three-stage checklist.** As an IT Coordinator, first eliminate front-end environment issues before escalating network-layer problems to higher-level authorities.

## Phase 1: Local Device Check (Most Common)

1. **Bluetooth Permissions**: Ensure Bluetooth is enabled on both teacher and student devices. In **iOS 26**, go to **Settings > Privacy & Security > Bluetooth** and confirm the "Classroom" app permission is toggled **ON**.

2. **Same Wi-Fi SSID**: Verify both the teacher and student are on the exact same SSID (e.g., `School-Wi-Fi`). Even if they are on different radio bands (2.4G/5G), using different SSIDs can sometimes lead to client isolation.

3. **App State**: If a student's iPad is asleep or locked, the teacher will see them as offline. Ask students to unlock their screens and try again.

## Phase 2: MDM Profile Check

- **Education Profile**: Go to **Settings > General > VPN & Device Management** and verify the "Education Profile" is present and has not expired.
- **Inventory Update**: If the roster is incorrect, send an **Update Inventory** command to the class in Jamf Pro to force a re-sync of the educational configuration.

## Phase 3: School Network Environment

- If the devices are local and configured correctly but still won't talk, the Wi-Fi infrastructure is likely blocking **mDNS (Bonjour)**.
- **Action**: IT coordinators often cannot fix this at the school level. Contact your regional network center or vendor and request that they allow **mDNS Relay** and open **TCP/UDP Ports 3283 and 3284**. Ensure "Client Isolation" is disabled for the classroom VLAN.

## Practical Advice:

If connection issues only occur in specific rooms, check if that specific Access Point (AP) is overloaded or has a firmware issue causing packet drops.

---

## File: dl-20.md

---

id: dl-20

title: "Maintenance: The Digital Initiative contract ends in 2026. What should I do if iPads fail or die?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags:
[
"Hardware Repair",

    "No Power",

    "Charging Issues",

    "Display Lines",

    "Wi-Fi Failure",

    "Replacement Units",

## ]

**As the Digital Initiative enters its final contract year, hardware failures will reach their peak. If a device shows no signs of accidental damage, you must report it early to secure a replacement or repair before the contract expires.** After four years of high-intensity classroom use, various internal components in the initial iPad 9 batch are reaching their natural limit. IT Coordinators should audit their fleet for the following:

## Common Hardware Failure Categories:

### 1. Power Issues

- **No Power**: Typically a motherboard power management IC or CPU rail failure.
- **Charging Failure**: Aging battery modules, charging IC damage, or physical wear inside the Lightning port.
- **Battery Swelling**: The screen is physically pushing away from the frame. This is a safety risk—report immediately.

### 2. Display and Connectivity

- **Screen Lines**: LCD ribbon cable aging, causing static lines or flickering.
- **Functional Failure**: Wi-Fi toggle grayed out, Bluetooth failure, or gyroscope (accelerometer) damage preventing screen rotation.

## Warranty and Replacement Rights:

- **Non-Accidental Damage**: As long as the device is physically intact (no cracked screen, no bent frame, no major impact dents), these failures are usually classified as "Natural Hardware Failure" and are covered by the warranty and maintenance contract.
- **Act Fast**: If you find these issues, contact us immediately. During the maintenance period, if a failure is deemed non-accidental, the school should exercise its right to a **Replacement Unit** to ensure classroom sets remain full.

## Using Jamf Pro for Your Audit:

1. **Lost Connection Filter**: Create a Smart Group where the "Last Inventory Update" is more than 30 days ago. These devices are likely dead, uncharged, or experiencing network failure.

2. **Hardware Health**: Review the `Wi-Fi Address` field in the device record. if it shows `Unknown` or other anomalies, the hardware requires physical inspection.

## Practical Advice:

Audit your entire fleet by **Summer 2026**. Once the maintenance contract expires, subsequent repairs will fall back on the school’s independent budget. Ensure all public assets are functional while the protection of the initiative's contract is still in place.

---

## File: dl-21.md

---

id: dl-21

title: "How should Digital Initiative iPads be managed after 2026? Should we keep the MDM?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

## tags: ["2026", "MDM Management", "Device Maintenance", "Asset Management"]

**Digital Initiative iPads are permanent school assets. We strongly recommend continuing to manage them via MDM to maintain device security, instructional quality, and asset integrity.**

## Why keep the MDM?

### 1. Security

Continued web filtering protects students from inappropriate content, and MDM-enforced restrictions prevent the installation of games or unauthorized apps.

### 2. Instructional Continuity

Maintain the ability to push apps, manage Wi-Fi settings, and support Apple Classroom.

### 3. Asset Integrity

MDM tracking helps locate misplaced devices and monitors battery health, ensuring the hardware lasts as long as possible.

## Recommended Strategies for 2026 and Beyond:

### 1. Unified Health Checks

- **Battery Health**: Identify units needing battery replacement before they become unusable.
- **OS Updates**: Evaluate if the entire fleet should move to **iOS 26**.
- **Audit**: Record physical damage and update the school’s overall asset registry.

### 2. Modernizing Use Case: Graduation and Rotation

When a student graduates and the device must be reassigned, use the **Return to Service (RTS)** feature. This is the fastest way to reset a device in **iOS 26**.

**The Return to Service Advantage**:

- **Secure Wipe**: Erasure of student data and browsing history.

- **App Preservation**: Unlike a traditional wipe, you can choose to keep the Managed Apps on the device. This saves 50–70% of the total reset time and significantly reduces network bandwidth strain.
- **Auto-Reconnect**: The device remembers its Wi-Fi settings and re-enrolls automatically.

| Feature          | Traditional Wipe       | Return to Service (iOS 26+) |
| :--------------- | :--------------------- | :-------------------------- |
| **Wipe Data**    | ✅                     | ✅                          |
| **Keep Apps**    | ❌ (Redownload needed) | ✅ (Ready immediately)      |
| **Keep Network** | ❌ (Manual setup)      | ✅ (Automatic)              |
| **Time Reg.**    | 30–60 Minutes          | 5–15 Minutes                |

### 3. Usage Flexibility

As the project's strict usage quotas subside, consider a more flexible "Teacher-Driven" model:

- **Flexible Checkout**: Use iPad trolleys for specific projects rather than fixed 1-to-1 assignments.

- **Quality over Quantity**: Encourage deep integration in relevant subjects rather than forcing daily use in every class.

### 4. Technical Checklist for 2026

- **Stay Online**: Keep devices connected to Wi-Fi so the MDM can push critical safety patches.
- **Backup Configs**: Export your current Jamf Pro XML/Configuration profiles as a backup.
- **Monitor unmanaged devices**: Use Smart Groups to catch devices that have been offline for over 60 days, as these are often tucked away in drawers and forgotten.

---

## File: dl-22.md

---

id: dl-22

title: "How does the iOS 26 Network Extension URL Filtering API impact school content filters?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags:
["Jamf Trust", "URL Filtering", "iOS 26", "Content Filter", "Cybersecurity"]

---

**The 'Network Extension URL Filtering API' introduced in iOS 26, iPadOS 26, and macOS 26 is a major technical upgrade for content filtering services. While schools should be aware of this development, project-assigned devices should prioritize following regional guidelines (such as the MOE's DNS Proxy or Content Filter architectures).**

## Evolution of Content Filtering Technologies

| Era            | Technology        | Advantage                                      | Limitation                                                              |
| :------------- | :---------------- | :--------------------------------------------- | :---------------------------------------------------------------------- |
| **Pre-iOS 15** | Per-App VPN       | High maturity.                                 | VPN icon in status bar; higher battery drain.                           |
| **iOS 16–25**  | DNS Proxy         | Lightweight; no VPN icon.                      | Limits filtering to the domain level (cannot filter specific sub-URLs). |
| **iOS 26+**    | URL Filtering API | High performance; granular; battery efficient. | Requires iOS 26 or later.                                               |

## Technical Characteristics of the iOS 26 API

### 1. Granular Filtering

- **Past**: Could only block a domain (e.g., `example.com`). All pages on that site were treated the same.
- **New API**: Can identify full URL paths (e.g., `example.com/bad-content`). This allows a school to block a specific inappropriate page while leaving the rest of the educational domain accessible.

### 2. Privacy-First Design

- **On-Device Processing**: Most filtering decisions happen locally on the device using a Bloom Filter, meaning private browsing history isn't sent to a cloud server.
- **Private Information Retrieval (PIR)**: When a cloud check is needed, it uses PIR technology so the server cannot see exactly which URL was queried.
- **Oblivious HTTP (OHTTP)**: Queries are anonymized through a relay, ensuring neither Apple nor the provider can link a query to a specific student ID.

### 3. Performance

- Integrated at the system level for faster processing and minimal impact on battery life.

## Practical Advice for Schools

If you use a service like **Jamf Trust**, the transition to this new API is typically handled automatically by the provider. IT administrators usually don't need to manually change settings. However, we recommend:

- **Testing**: When upgrading a classroom to iOS 26, verify that your regional teaching platforms (educational portals) remain accessible.

- **Battery Monitoring**: Observe if the newer API reduces "battery drain" complaints from students, as this is a common side effect of older VPN-based filters.

---

## File: dl-23.md

---

id: dl-23

title: "Will the iOS 26 'Background Security Improvements' install automatically? Should I leave it on or off?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

tags:
[
"Background Security Improvements",

    "iOS 26",

    "Security Update",

    "Automation",

    "System Update",

## ]

**The 'Background Security Improvements' feature in iOS 26 automatically installs critical security patches at appropriate times. We strongly recommend that schools keep this feature ON to ensure devices maintain a baseline of security protection.**

## What are Background Security Improvements?

- **Goal**: Rapidly patch major security vulnerabilities (especially in Safari and system frameworks) without requiring a full OS update or a device reboot.
- **Evolution**: This is an evolution of the "Rapid Security Response" (RSR) technology.
- **Execution**: Updates are small (tens of megabytes) and install silently when the device is idle and charging. In most cases, a restart is not required.

## Why it matters for Schools

### 1. Reduces IT Burden

Managing hundreds of iPads across different classrooms is difficult. Background patching ensures devices are safe even if school IT doesn't have time to perform a "Mass OS Update" that week.

### 2. Teaching Continuity

Standard system updates take 30–60 minutes and render the device unusable. These background patches happen after hours or during charging, ensuring no disruption to lesson time.

### 3. Zero-Day Protection

Schools are often targets for network-based exploits. These silent patches ensure students are protected as soon as a fix is released.

## Management Advice

### Recommendation: Leave it ON

For the vast majority of schools, the default behavior (ON) is best. It provides a "Set it and forget it" security layer that requires zero manual labor from the staff.

### Exception: When to Turn it OFF

If your school uses highly customized, proprietary teaching apps that are extremely sensitive to system changes, you can disable this via MDM:

- **MDM Restriction**: Disable the "Allow Background Security Improvements" toggle in your Restrictions payload.

- **Note**: If you do this, you assume the risk of leaving your fleet exposed to known exploits until you perform a manual full system update.

## Practical Tip:

Check the status in **Settings > General > Software Update**. If you see a small 'letter' next to the version (e.g., iOS 26.1 (a)), it means a background security patch is active. If a specific app starts behaving strangely after a patch, you can remove a background repair in the "About" section, though this should rarely be necessary.

---

## File: dl-25.md

---

id: dl-25

title: "Integration Recommendations for New iPads (M4/A17 Pro) in the Digital Learning Project (2024–2026)"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags:
[
"Mixed Environment",

    "M4",

    "A17 Pro",

    "Accessory Management",

    "Charging Cart Planning",

## ]

**Many schools have purchased newer iPad models (e.g., M4 iPad Pro, M2 iPad Air, iPad mini 7) during the project period (2022–2026) due to class expansion, hardware failure, or specific requirements. These newer models have significant hardware differences compared to the base iPad 9 used in the primary project fleet. Mixed management requires attention to accessory compatibility, charging logistics, and MDM configurations.**

## Key Integration Considerations

### 1. Accessory Compatibility (The Apple Pencil Gap)

- **The Conflict**: The Apple Pencil (1st Gen) and (2nd Gen) used with older project devices are **not compatible** with the M4 iPad Pro or M2 iPad Air.
- **Recommendation**: Ensure that procurement for new M4/M2 units includes the **Apple Pencil Pro** or **Apple Pencil (USB-C)**. Label these styluses clearly to prevent students from trying to pair the wrong pencil with the wrong iPad.

### 2. Charging and Power Logistics

- **The Conflict**: Older iPad 9 units use Lightning cables (USB-A to Lightning), while all new models (A17 Pro / M-series) use **USB-C**.
- **Infrastructure Impact**: Existing charging carts may need cable replacements. We recommend "Hybrid Carts" where specifically marked slots are equipped with USB-C cables for the newer high-performance units.

### 3. High-Performance Features in MDM

- **The Conflict**: New M-series iPads support features like **External Display Support (Stage Manager)** and **Windowed Apps (iPadOS 26)** that the iPad 9 does not.
- **Recommendation**: Use **Smart Groups** in Jamf Pro to move M-series iPads into a "High-Performance Group." Enable Stage Manager and Windowed Apps for these students to allow for more advanced creative projects while keeping the standard iPad 9 fleet on a simplified single-app interface.

### 4. Apple Intelligence Management

- **The Conflict**: Only the newer M-series and A17 Pro iPads support **Apple Intelligence**.
- **Recommendation**: Schools must decide on the AI policy specifically for these newer units (e.g., enabling Writing Tools for advanced students while disabling it during exams). Use MDM Restrictions to target only these "AI-capable" models.

## Expert Advice

When managing a mixed fleet, labeling is your best friend. Use laser engraving or color-coded protective cases to distinguish between "Standard Project iPads" (iPad 9) and "High-Performance Creative iPads" (M-series). This helps teachers quickly identify which students have access to the newer iPadOS 26 pro features.

---

## File: dl-26.md

---

id: dl-26

title: "How to use the iOS 26 'Background Security Improvements' to maintain security for project devices."

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags:
[
"iOS 26",

    "Security Updates",

    "Automated Management",

    "Background Security Improvements",

    "Asset Maintenance",

## ]

**For network administrators managing a large fleet of project devices, the biggest security risk is 'unpatched systems' due to users ignoring update prompts. iOS 26 introduces the 'Background Security Improvements' framework, allowing critical security patches to be installed automatically without a device reboot or disruption to teaching activities.**

## Implementation for School Fleets

### 1. Zero-Touch Security

- Unlike standard OS updates that require 30–60 minutes and a restart, Background Security Improvements are tiny patches (often involving Safar or system libraries).
- **Result**: The device remains secure against the latest exploits even if the student never manually clicks "Update."

### 2. MDM Configuration

- We recommend keeping the **"Allow Background Security Improvements"** restriction enabled (ON) in your global MDM profile.
- By default, this feature is ON in iOS 26. Unless your school has a specific compatibility reason to delay these (virtually non-existent for educational apps), leaving it on ensures the best protection.

### 3. Monitoring via DDM

- In macOS/iOS 26, you can use the **DDM Status Channel** to see which devices have successfully applied these background patches.
- This provides a much cleaner audit trail for the Ministry of Education or school board to verify that 100% of the active fleet has mitigated a specific high-profile security vulnerability.

## Practical Tip for Teachers

Explain to students that if they see a small 'letter' next to their iPad version (e.g., iPadOS 26.1 (b)), it means their iPad has automatically protected itself from a security threat overnight while it was charging. This is an excellent opportunity for a brief 'Digital Citizenship' lesson on the importance of staying updated.
