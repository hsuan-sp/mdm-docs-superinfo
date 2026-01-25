---
File: platform-sso-in-setup-assistant.md
---

---

term: "Platform SSO in Setup Assistant"

## category: ["Mac"]

## Term Definition

**Platform SSO in Setup Assistant** is a streamlined deployment feature introduced in **macOS Tahoe** .

Workflow improvements:

- **Early Login** : Allows the user to authenticate with their cloud identity (Google/Microsoft/Okta) during the very first "Hello" setup screens.

- **Auto-Account Creation** : Automatically creates the local computer account using the cloud identity's full name and password.
- **FileVault Sync** : Ensures the disk encryption password matches the cloud password from day one.
- **Token Exchange** : Retrieves the necessary SSO tokens immediately so apps are logged in as soon as the Desktop appears.

## Analogy

Previously, setting up a new school Mac meant **"Creating a local account first, then connecting your school ID later."** Now, it's like **"Swiping your employee badge to enter the building."** You use your official work login from the very first second you turn on the computer, and the system sets up your desk, your keys, and your ID card automatically before you even sit down.

---

## File: platform-sso.md

---

term: "Platform SSO"

## category: ["Security", "macOS"]

## Term Definition

**Platform Single Sign-On (Platform SSO)** is a framework that deeply integrates a Mac's local user account with an external Identity Provider (IdP).

Capabilities:

- **Sync** : Keeps the local Mac password in sync with the cloud password (e.g., Entra ID or Okta).

- **Kerberos/Tokens** : Automatically acquires authentication tickets in the background.
- **Experience** : When a user unlocks their Mac, they are implicitly signed in to Safari, corporate apps, and file shares without needing to re-authenticate.

## Analogy

This is the **"All-Access School Pass."** In the past, you might have needed one password for your computer and another for your email. **Platform SSO** connects them.

As soon as you unlock your Mac with your face or fingerprint, the computer automatically "tells" all the school apps like Google Drive and Zoom, **"It's really them, let them in!"** so you don't have to type your password again and again.

---

## File: policy.md

---

term: "Policy"

## category: ["Core"]

## Term Definition

In **Jamf Pro** , a **Policy** is the primary mechanism for executing management tasks on macOS computers.

A Policy consists of:

- **Payload** : What to do (e.g., install Adobe Photoshop, run a script, dock settings).

- **Trigger** : When to do it (e.g., at Startup, at Login, or on a recurring check-in schedule).
- **Scope** : Who to do it to (e.g., "All Staff Macs" but excluding "Student Macs").
- **Frequency** : How often to do it (e.g., "Once per computer" or "Once every week").

## Analogy

A Policy is like a **"School Bell Schedule"** combined with a **"Lesson Plan."** You don't have to announce "Go to Math Class" to every student individually. The bell ( **Trigger** ) automatically signals to the students ( **Scope** ) that it is time to do a specific task ( **Payload** ).

Similarly, a policy tells the computer: _"Every time you wake up (Trigger), check if the printer is installed (Payload)."_

---

## File: pppc.md

---

term: "PPPC"

## category: ["Security", "macOS"]

## Term Definition

**Privacy Preferences Policy Control (PPPC)** is a macOS security framework managing application access to sensitive user data and hardware.

Protected resources include:

- **Hardware** : Camera, Microphone.

- **Data** : Desktop folder, Documents folder, Photos, Downloads.
- **System** : Screen Recording, Accessibility features.

**MDM Role** : Administrators deploy a PPPC Payload to **pre-approve** trusted school apps (like Zoom or Teams) so they can access the camera/mic without users needing to click "Allow" on pop-up prompts. Note that for privacy reasons, MDM can*allow*access or*deny*access, but it cannot silently enable the Camera/Mic without*some* user awareness in certain contexts.

## Analogy

Think of this as a **"Standing Permission Slip."** Usually, your Mac is very protective and asks you, _"Are you SURE you want to let this app use your camera?"_ every single time a new app opens.

With **PPPC** , the school has already **"signed the permission slip"** for you. This means official school apps can start working instantly without annoying you with questions, because the Mac knows the school trusts them.

---

## File: prestage-enrollment.md

---

term: "PreStage Enrollment"

## category: ["Enrollment", "Jamf"]

## Term Definition

**PreStage Enrollment** is the Jamf Pro configuration profile that controls the **Automated Device Enrollment (ADE)** experience.

Customization options:

- **Setup Assistant** : Choose which screens to skip (e.g., skip "Apple Pay," "Siri," and "Terms of Service" screens) to speed up setup.

- **Authentication** : Require LDAP or SSO login credentials to ensure only authorized users can set up the device.
- **Identity** : Automatically set the device name and create a local administrator account during setup.
- **Supervision** : Enforce supervision status and mandatory MDM profile installation.

## Analogy

PreStage Enrollment is like a **"VIP Express Check-In"** at the airport.

Before the student even turns on their new iPad, the ICT department has already pre-filled all their paperwork.

When the student turns it on, they skip the long lines (the boring "Click Next" screens) and go straight to their destination: a fully functional device ready for class.

---

## File: private-relay.md

---

term: "iCloud Private Relay"

## category: ["Security", "Apple"]

## Term Definition

**iCloud Private Relay** is an Apple privacy service available to iCloud+ subscribers that obscures a user's web browsing behavior.

Technical mechanism:

- **Encryption** : DNS requests are encrypted so the ISP/School cannot see where the user is going.

- **Anonymization** : Traffic is routed through two separate internet relays. The first knows*who*you are (IP) but not*where*you are going. The second knows*where*you are going but not*who* you are.
- **Conflict** : This prevents the destination website from seeing the user's IP. However, it also prevents school web filters from identifying the user, which is why it is often blocked on managed networks.

## Analogy

Think of this as an **"Invisibility Cloak"** for the internet.

It hides who you are and where you are going. However, at school, teachers and the IT team need to make sure you are staying on safe websites.

Because the "Invisibility Cloak" stops them from being able to protect you, the school usually **"asks you to take the cloak off"** (blocks the feature) while you are using school Wi-Fi.

---

## File: private-wi-fi-address.md

---

term: "Private Wi-Fi Address"

## category: ["Network", "Security"]

## Term Definition

**Private Wi-Fi Address** is a privacy feature in iOS, iPadOS, and macOS that uses MAC address randomization.

How it works:

- **Randomization** : Instead of using its permanent hardware MAC address, the device generates a unique, random MAC address for each Wi-Fi network (SSID) it joins.

- **Rotation** : In some settings, this address may rotate periodically (e.g., every 24 hours or 2 weeks).
- **Pro** : Prevents marketing trackers in shopping malls from building a profile of your movement.
- **Con** : Breaks education networks that rely on **MAC Address Filtering** or **DHCP Reservations** to identify specific student devices.

## Analogy

This is a **"Digital Stage Name."** When your iPad connects to Wi-Fi at a Starbucks, it uses a fake name so the shop can't track that you come there every day.

However, at school, the **"Gatekeeper"** (the Wi-Fi router) needs to know your **"Real Name"** (Hardware ID) to confirm you are a student and let you in. If you keep using a fake name, the school Wi-Fi might not recognize you and could lock you out.

---

## File: provisioning-profile.md

---

term: "Provisioning Profile"

## category: ["Apps", "Security"]

## Term Definition

A **Provisioning Profile** is a digital signing asset that links a developer's certificate, an App ID, and a device (or list of devices) to authorize an app to run.

Usage contexts:

- **App Store Apps** : Signed by Apple, valid indefinitely for the user.

- **In-House Enterprise Apps** : Signed by the organization. These profiles typically expire after **1 year** .
- **Expiration** : If the profile expires, the app will crash immediately upon launch. It must be renewed and pushed via MDM to restore functionality.

## Analogy

Think of this as a **"Temporary Work Visa"** for apps.

Most apps get a "Permanent Citizenship" from the public App Store. However, if the school creates its own private app just for students, that app only gets a **"1-Year Visa"** (the Provisioning Profile).

If the school forgets to renew the visa, the app gets **"deported"** (stops working) and won't open anymore until it gets its new paperwork stamped.

---

## File: proxy.md

---

term: "Proxy"

## category: ["Network"]

## Term Definition

A **Proxy Server** acts as an intermediary gateway between a user's device and the internet.

Functions:

- **Filtering** : Inspects URL requests and blocks dangerous or inappropriate content before it reaches the device.

- **Caching** : Stores copies of frequently accessed websites (e.g., the school homepage) to speed up loading times for everyone.
- **Anonymity** : Hides the internal IP structure of the school network from the public internet.
- **Logging** : Keeps a record of which websites are accessed by which user for accountability.

## Analogy

Think of a Proxy as a **"Personal Shopper"** for the internet.

Instead of you going directly to a store (a website) yourself, you hand a shopping list to your device, which gives it to the **Personal Shopper** (the Proxy).

They go out, verify the store is safe, buy the item, and bring it back to you. This ensures that no "forbidden items" are brought onto campus because the shopper checks everything first.

---

## File: push-notification.md

---

term: "Push Notification"

## category: ["Apple"]

## Term Definition

A **Push Notification** is a small, efficient data packet sent via the **Apple Push Notification service (APNs)** to wake a device.

How MDM uses it:

1. **Trigger** : The admin sends a command (e.g., "Install Microsoft Word").

2. **Push** : The MDM server sends a "Poke" to APNs.

3. **Wake** : APNs forwards this small packet to the iPad.

4. **Check-in** : The iPad wakes up from sleep and contacts the MDM server to ask, "What do you want me to do?"

5. **Action** : The iPad receives the instruction to install Word.

## Analogy

Think of this as a **"Digital Tap on the Shoulder."** To save battery, your iPad sleeps whenever it can. When the tech team wants to give you a new app, they can't shout at a sleeping iPad.

Instead, they send a **Push Notification** . It’s like a gentle tap that wakes the iPad up and whispers, _"Hey, the teacher has some new work for you; go call the server to get it!"_

---

## File: qr-code-enrollment.md

---

term: "QR Code Enrollment"

## category: ["Enrollment"]

## Term Definition

**QR Code Enrollment** is a streamlined method for enrolling mobile devices into an MDM environments.

The process:

- **Scan** : The user points the device camera at a unique QR code provided by IT.

- **Decode** : The device reads the embedded URL and enrollment token.
- **Connect** : Safari automatically opens to the specific enrollment portal.
- **Install** : The user is prompted to download and install the MDM profile immediately.

This reduces typing errors and significantly speeds up "User-Initiated Enrollment" (UIE).

## Analogy

Think of this as **"Scan-to-Check-In."** Instead of requiring a student to manually type a long, complicated web address like `https://enroll.myschool.edu/manage/enroll` into Safari, they just open the Camera and scan a square code.

All the setup information is automatically filled in, allowing the iPad to start its first day of school instantly without any typing mistakes.

---

## File: radius.md

---

term: "RADIUS"

## category: ["Network"]

## Term Definition

**RADIUS** (Remote Authentication Dial-In User Service) is a networking protocol that enables centralized Authentication, Authorization, and Accounting (AAA).

Use cases in education:

- **Wi-Fi Security** : Often paired with **802.1X** to verify that a user is allowed on the network.

- **VPN Access** : Checks credentials before allowing remote access to internal servers.
- **Centralization** : Instead of every Wi-Fi router needing its own list of passwords, they all check a single central server (the RADIUS server) to approve access requests.

## Analogy

Think of RADIUS as the **"Central Security Server"** for a building's smart locks.

When you try to open a door (connect to Wi-Fi) with your ID card (your device's certificate), the lock itself doesn't decide if you can enter.

Instead, it sends your data to the central server (RADIUS) to check the main list. If the server says **"Yes, they are a current student,"** the door unlocks and you're online.

---

## File: rapid-security-response.md

---

term: "Rapid Security Response (RSR)"

## category: ["Security"]

## Term Definition

**Rapid Security Response (RSR)** is a nimble update mechanism designed by Apple to deploy urgent security fixes.

Differences from standard updates:

- **Agility** : Delivers important vulnerability patches*between* major software updates.

- **Speed** : RSR files are smaller and install significantly faster than a full OS upgrade.
- **Uptime** : Often requires only a quick restart (or sometimes no restart at all for Safari-only patches), minimizing classroom disruption.
- **Version** : Indicated by a letter after the version number (e.g., iOS 16.4.1 (a)).

## Analogy

Think of this as a **"Digital Emergency Band-Aid."** Instead of performing a major multi-hour surgery (a full system update) that forces you to stop working, Apple can quickly slap on a small "patch" to fix a specific cut (security hole).

It’s fast, simple, and makes sure your iPad is protected from a new threat the moment it's discovered, without making you wait through a 20-minute update screen.

---

## File: recon.md

---

term: "Recon"

## category: ["Jamf", "macOS"]

## Term Definition

**Recon** (short for the `Jamf recon` command) is the inventory collection process on managed Macs.

What it collects:

- **Hardware** : Model, serial number, battery health, and storage capacity.

- **Software** : List of all installed applications and their versions.
- **Identity** : Current logged-in user and local account lists.
- **Custom Data** : Results from any scripts defined as "Extension Attributes" (e.g., checking if SSH is enabled).

Running `sudo Jamf recon` in Terminal forces the Mac to submit this report immediately.

## Analogy

Think of this as an **"Instant Health Checkup."** Normally, a computer might only send its status report once a day.

If you run the "Recon" command, you're telling the Mac to **"Stop everything, count your apps, check your storage, and tell the main office how you are feeling right now!"** It ensures IT has the absolute latest information to help fix a problem.

---

## File: recovery-lock.md

---

term: "Recovery Lock"

## category: ["Security"]

## Term Definition

**Recovery Lock** is a hardware-level security feature for Mac computers with Apple Silicon.

Functionality:

- **Block** : Prevents users from entering macOS Recovery Mode unless they have authorization.

- **Requirement** : Users must enter a predefined password (managed by MDM) to access tools like Disk Utility or Terminal in the recovery environment.
- **Goal** : Stops students or thieves from wiping the Mac, disabling security settings (like SIP), or downgrading the OS to bypass management.

## Analogy

Think of this as a **"Digital Lock on the ER Door."** In the past, anyone could take a computer that wasn't working to the "Emergency Room" (Recovery Mode) and reset everything to factory settings.

Now, the ER door has a keypad. Without the secret code from IT, a thief can't even "reinstall" the computer to erase their tracks, making a stolen school Mac useless to them.

---

## File: recovery-mode.md

---

term: "Recovery Mode"

## category: ["Apple", "macOS"]

## Term Definition

**Recovery Mode** is a special boot partition on Apple devices designed for emergency maintenance and troubleshooting.

Available tools:

- **Disk Utility** : Repair or erase the hard drive.

- **Reinstall macOS** : Download and install a fresh copy of the operating system.
- **Restore from Backup** : Recover data from a Time Machine backup.
- **Terminal** : Advanced command-line tools for fixing system errors.
- **Security Utility** : Change startup security policies (e.g., allow booting from external drives).

## Analogy

Think of this as the **"Emergency Operating Room."** If your computer gets so "sick" that it can't even start up normally, you boot it into this special mode.

Here, the **"Doctors"** (the built-in tools) can perform surgery on its hard drive or completely transplant its brain (reinstall the OS) to get it working like new again. It’s the final safety net for fixing a broken device.

---

## File: remote-management.md

---

term: "Remote Management"

## category: ["Core", "Jamf"]

## Term Definition

**Remote Management** is the specific screen presented by the Setup Assistant on a new Apple device during the **Automated Device Enrollment** process.

Signifies:

- **Detection** : The device has "called home" to Apple and recognized that it belongs to an organization (e.g., specific school).

- **Consent** : The user must click "Next" or "Enroll" to download the MDM profile.
- **Mandate** : If the device is in ADE, this screen is usually mandatory and cannot be skipped, ensuring no device enters the fleet unmanaged.

## Analogy

Remote Management is the **"School’s Digital Stamp."** When you first open a brand new iPad box, this screen is like the device holding up a badge saying: **"I belong to Taipei European School."** It’s the official hand-off where the iPad accepts the school’s rules and begins its life as a managed learning tool.

---

## File: restrict-app-downloads-over-cellular.md

---

term: "Restrict App Downloads over Cellular"

## category: ["Network"]

## Term Definition

**Restrict App Downloads over Cellular** is a modern policy configuration available via Declarative Device Management (DDM).

Functionality:

- **Constraint** : It explicitly forbids the App Store and MDM from downloading or updating apps while using a cellular (4G/5G) connection.

- **Enforcement** : Downloads will pause and wait until the device connects to a Wi-Fi network.
- **Purpose** : Prevents students with cellular-enabled iPads from accidentally exhausting the school's data plan quota with large game or OS updates.

## Analogy

Think of this as **"Wi-Fi Only Mode"** for heavy lifting.

It’s like a parent setting a rule that says: **"You can only download new video games when you are at home on Wi-Fi, not while you're on the bus using expensive phone data."** This creates a safety net so that one student downloading a huge game doesn't use up the entire class's data budget for the month.

---

## File: restricted-software.md

---

term: "Restricted Software"

## category: ["Security"]

## Term Definition

**Restricted Software** is a blocking mechanism in Jamf Pro used to prohibit specific applications from running.

Capabilities:

- **Detection** : Monitors the system for the launch of a specific process name (e.g., `Steam.app` or `Install macOS Beta.app`).

- **Kill Process** : The moment the user tries to open the app, the system immediately forces it to quit.
- **Remediation** : Can be configured to delete the application entirely and display a warning message explaining why it is not allowed.

## Analogy

Think of this as the school's **"Digital Hall Monitor."** The hall monitor is always watching. If they see you trying to pull a "prohibited item" (like a video game console) out of your backpack, they immediately **take it away** and give you a warning note.

It helps keep the classroom focused on learning by ensuring distractions (unapproved games) don't even have a chance to start.

---

## File: return-to-service.md

---

term: "Return to Service"

## category: ["Enrollment"]

## Term Definition

**Return to Service** is a high-efficiency command for iOS and iPadOS devices that automates the device reset cycle.

Workflow:

1. **Wipe** : IT sends the "Erase Device" command.

2. **Persist** : The command includes a "Return to Service" package (Wi-Fi profile + Language settings).

3. **Reboot** : The device erases all user data.

4. **Reconnect** : Instead of stopping at the "Hello" screen, the device automatically connects to Wi-Fi using the saved profile.

5. **Re-enroll** : It contacts the MDM and re-enrolls itself automatically, ready for the next user.

## Analogy

Think of this as **"Reincarnation with Memory."** Usually, when you wipe an iPad, it "forgets" everything and acts like it was just born.

With **Return to Service** , the iPad is wiped clean, but it keeps a **"sticky note in its pocket"** (the Wi-Fi password). When it wakes up, it reads the note, connects to the internet, and reports back to the office for its duties immediately—without a human needing to touch it.

---

## File: root-certificate.md

---

term: "Root Certificate"

## category: ["Security"]

## Term Definition

A **Root Certificate** is the fundamental anchor of trust in a Public Key Infrastructure (PKI).

Role in a school:

- **Trust Anchor** : It is the "Parent" certificate. If a device trusts the Parent, it automatically trusts all "Children" certificates signed by that Parent.

- **Internal Security** : Schools generate their own internal "School Root CA."
- **Deployment** : This Root Certificate must be installed on every student iPad. Once installed, the iPad will trust the school's private secure Wi-Fi and internal websites, which otherwise would be rejected as "unsafe."

## Analogy

Think of this as the **"Trusted Founder"** of a family.

Trust in digital security works like a family tree. If your device trusts the **"Grandfather"** (the Root Certificate), it will automatically trust all of his **"Children and Grandchildren"** (the other certificates).

However, if your device doesn't know the Grandfather, it will block the entire family from entering—which means you won't be allowed to connect to the secure school Wi-Fi.

---

## File: rosetta-2.md

---

term: "Rosetta 2"

## category: ["macOS"]

## Term Definition

**Rosetta 2** is a dynamic binary translator developed by Apple for the transition from Intel chips to Apple Silicon (M-series).

Function:

- **Translation** : It instantly converts instructions written for Intel processors (x86_64) into instructions that Apple Silicon (ARM64) can understand.

- **transparency** : Users typically don't realize it is running; apps just open and work.
- **Deployment** : IT can use MDM to pre-install Rosetta 2 on all new Macs. This prevents users from seeing a confusing "You need to install Rosetta" prompt when they try to open older software like Adobe Photoshop or older printer drivers.

## Analogy

Think of this as a **"Live Language Translator."** The new M-series Macs speak one language (English), while older software speaks another (French). **Rosetta 2** sits in the middle and translates everything instantly, so your favorite older apps can still talk to your brand-new computer. It's like having a dedicated interpreter follow you around so you don't even notice the language barrier.

---

## File: roster.md

---

term: "Roster"

## category: ["Education"]

## Term Definition

In educational technology, a **Roster** is the digital dataset defining the relationship between students, teachers, and classes.

Data flow:

1. **Source** : Originates from the school's **Student Information System (SIS)** (e.g., PowerSchool, iSAMS).

2. **Sync** : Uploaded to **Apple School Manager** via SFTP or API.

3. **Usage** : Populates apps like **Apple Classroom** and **Schoolwork** .

Accurate rostering ensures that when a teacher opens their iPad, they automatically see the correct list of 25 students sitting in front of them for "Period 1 Math," without manual data entry.

## Analogy

This is the **"Digital Roll Call List."** Instead of a teacher having to create a spreadsheet and type in every student's name one by one, the school's central computer system automatically **"pushes"** the list to the teacher's iPad.

It means that when Mr. Smith walks into Biology class, his iPad already knows exactly who is supposed to be there.

---

## File: scep.md

---

term: "SCEP (Simple Certificate Enrollment Protocol)"

## category: ["Security"]

## Term Definition

**Simple Certificate Enrollment Protocol (SCEP)** is a standard allowing devices to request and retrieve digital certificates automatically.

The workflow:

1. **Request** : The MDM pushes a "SCEP Profile" to the device.

2. **Generation** : The device generates a private key and sends a request to the server.

3. **Issuance** : The Certificate Authority (CA) verifies the request and issues a signed certificate.

4. **Access** : The device presents this certificate to the school's Wi-Fi network to prove, "I am a managed, trusted device."

This automation is critical for zero-touch deployments, removing the need for manual password entry.

## Analogy

Think of this as an **"Automatic ID Booth."** Instead of every single student having to go to the office and wait in line to get their ID badge printed, the MDM sends them a digital **"Voucher."** The student's iPad takes that voucher to a machine (the CA), and the machine prints out their official ID card instantly. It allows the iPad to get its own **"Hall Pass"** for the school Wi-Fi without you lifting a finger.

---

## File: schoolwork-app.md

---

term: "Schoolwork App"

## category: ["Education"]

## Term Definition

**Schoolwork** is an iPad app developed by Apple to streamline the assignment and collection of digital work.

Key features:

- **Handouts** : Teachers can create assignments that include app activities, PDFs, web links, or photos.

- **Deep Linking** : Teachers can direct students to a specific chapter or activity*inside* a compatible educational app (e.g., "Open GeoGebra to Level 3").
- **Progress Tracking** : Provides real-time data to teachers on student progress (e.g., "Time spent," "Quiz score," or "Completion status").
- **Privacy** : Student data is encrypted and visible only to the teacher and the school.

## Analogy

Think of this as the **"Digital Homework Diary and Dropbox."** It’s the central place where teachers post assignments ("Read Chapter 4") and share materials.

Students can submit their finished work directly in the app, and teachers can see who has finished and how everyone is doing, all in one organized dashboard—no more lost papers.

---

## File: scope.md

---

term: "Scope"

## category: ["Core", "Jamf"]

## Term Definition

In device management, **Scope** refers to the defined set of targets (users or devices) that will receive a specific policy, app, or configuration.

A scope is built using three logic gates:

- **Targets** : Who*should* get it? (e.g., "All Grades 9-12").

- **Limitations** : Specific subsets required (e.g., "Only users in the Art Department").
- **Exclusions** : Who should*definitely not* get it? (e.g., "Exclude the 'Lost/Stolen' device group").

Correct scoping is the most critical skill for an MDM administrator to prevent accidents (like wiping the wrong iPads).

## Analogy

This is the **"Invite List"** for a party.

Just as you might say, **"Invite everyone in the soccer club (Target), but only the ones who live in Taipei (Limitation), and definitely do NOT invite John (Exclusion),"** Scope is exactly how IT decides who gets the new app and who doesn't.

It ensures the right tools end up in the right hands without cluttering everyone else's screen.

---

## File: screen-time.md

---

term: "Screen Time"

## category: ["Apple", "Core"]

## Term Definition

**Screen Time** is Apple's built-in framework for monitoring device usage and setting digital boundaries.

MDM capabilities:

- **Downtime** : Scheduling specific blocks of time (e.g., School Hours: 8 AM - 3 PM) where only educational apps are allowed.

- **App Limits** : Setting daily time allowances for specific categories (e.g., "Social Networking").
- **Content Usage** : Providing reports to parents and teachers on how much time a student spends in productivity apps versus games.
- **Communication Safety** : Filtering inappropriate content in Messages.

## Analogy

Screen Time is like a **"Classroom Concentration Assistant."** It helps students understand how they are spending their digital time. If the school wants to ensure students aren't distracted by social media during lunch or playing games after bedtime, the school can set **"Quiet Hours"** standards to help promote a healthy digital-life balance automatically.

---

## File: script.md

---

term: "Script"

## category: ["macOS"]

## Term Definition

A **Script** is a custom administrative program (typically written in Bash, zsh, or Python) executed on managed Macs.

Power and utility:

- **Beyond MDM** : While MDM profiles have standard checkboxes (like "Turn on Wi-Fi"), Scripts allow IT to code **anything** the computer is capable of doing.

- **Automation** : Can automatically repair broken printer settings, delete temporary cache files, or modify hidden system preferences.
- **Extension** : Used to calculate custom inventory data (Extension Attributes) that MDM doesn't collect natively.

## Analogy

Think of a Script as a **"Special Magic Spell."** The standard control panel has buttons for normal things like "Volume" or "Brightness." But sometimes, you have a weird problem that doesn't have a button.

So, the IT wizard writes a specific **Spell** (the Script) and tells the computer to cast it. The computer follows the spell's exact instructions to perform a complicated repair task that no standard button could ever do.

---

## File: secure-token.md

---

term: "Secure Token"

## category: ["Security"]

## Term Definition

A **Secure Token** is a macOS cryptographic attribute that grants a user account the authority to perform critical security operations.

Key functions:

- **FileVault** : Only users with a Secure Token can enable encryption or unlock the disk at boot.

- **Chain of Custody** : The first user created on a Mac (often via automated setup) gets the first token. That user must then "grant" tokens to subsequent users.
- **MDM Escrow** : In a managed environment, the MDM uses a **Bootstrap Token** to automatically grant Secure Tokens to mobile accounts, preventing students from being locked out of encryption management.

## Analogy

Think of this as an **"Authorization Stamp"** for the computer’s bank vault.

Even if you have the key (your login password), the bank guard won't let you open the **Main Vault** (the encrypted hard drive) unless your ID card has the official **"Manager's Stamp"** (Secure Token) on it.

It’s an extra layer of protection to make sure only authorized people can touch the computer's most sensitive security locks.

---

## File: security-update.md

---

term: "Security Update"

## category: ["Core", "Jamf"]

## Term Definition

A **Security Update** is a software patch dedicated solely to fixing vulnerabilities and protecting the operating system integrity.

Characteristics:

- **Focus** : Does not add new features (like new Emojis); only closes security holes.

- **Mandate** : MDM policies often force these updates to install immediately (0-day deadline) to protect the network.
- **Invisibility** : Modern **Rapid Security Responses** can sometimes be installed without the user even noticing, as they don't always require a restart.

## Analogy

Think of this as a **"Booster Shot"** for your device.

Just as a vaccine helps your body recognize and fight off new diseases without changing your personality, a **Security Update** teaches your iPad how to beat new computer viruses.

It doesn't change how the device looks or give you new cool tricks, but it keeps you alive and safe from invisible threats.

---

## File: self-service.md

---

term: "Self Service"

## category: ["Apps", "Jamf"]

## Term Definition

**Self Service** is a custom app portal provided by Jamf Pro, acting as a corporate "App Store."

Benefits:

- **Autonomy** : Allows students and staff to install approved apps, printers, and scripts on-demand without needing IT help.

- **Security** : Actions run with admin privileges, meaning users don't need to know the administrator password to install software.
- **Troubleshooting** : Often includes "Fix It" buttons (scripts) that users can run to reset their own Wi-Fi or clear cache.

## Analogy

Self Service is the **"Campus Supply Store."** If a student needs a specific calculator app or a teacher needs a new version of Zoom, they don't have to fill out a request form and wait for IT.

They just **"walk into the store"** (open the app), click install, and the item is delivered to their device immediately—all pre-approved, free, and safe to use.

---

## File: setup-assistant.md

---

term: "Setup Assistant"

## category: ["Enrollment"]

## Term Definition

The **Setup Assistant** is the initial configuration wizard presented on Apple devices (starting with the "Hello" screen).

MDM customization:

- **Streamlining** : Using **Automated Device Enrollment (ADE)** , organizations can hide unnecessary panes (e.g., Apple Pay, Siri, True Tone).

- **Mandatory Fields** : Can force the user to connect to Wi-Fi and install the management profile before proceeding.
- **Goal** : Reduces the "Time to Desktop" from 20 minutes of questions down to 30 seconds of waiting.

## Analogy

Think of this as the **"Beginner's Tutorial"** for your new device.

Just like a video game asks you to choose your character’s name and settings at the start, the Setup Assistant asks you how you want your iPad to work.

However, the school can choose to **"Skip the Tutorial"** for you. So when you turn the iPad on, it bypasses the boring questions and goes straight to the home screen, all set up and ready for class.

---

## File: setup-pane-skipping.md

---

term: "Setup Pane Skipping"

## category: ["Mac"]

## Term Definition

**Setup Pane Skipping** is a configuration feature within **Declarative Device Management (DDM)** that suppresses specific UI interruptions.

DDM Improvements in macOS Tahoe:

- **Granular Control** : Admins can skip post-update "What's New" screens that typically appear after a major OS upgrade.

- **Context Awareness** : Can suppress prompts purely based on the device state (e.g., skip "Sign in to iCloud" if the device is a shared lab machine).
- **Efficiency** : Prevents students from getting stuck on configuration screens that are irrelevant to their classroom needs.

## Analogy

In the past, every time a Mac was updated, you had to **"watch a short commercial"** about the new features before you could start working.

With **Setup Pane Skipping** , the school tells the Mac to **"Skip the Intro."** This saves time and allows students to get straight to their work without having to click "Next" on five different screens just to open a web browser.

---

## File: shared-ipad.md

---

term: "Shared iPad"

## category: ["Education", "Enrollment"]

## Term Definition

**Shared iPad** is a multi-user enrollment mode for iPadOS designed for classroom carts.

How it works:

- **Cloud Storage** : Users sign in with their Managed Apple Account. Their personal data is downloaded from iCloud to the device.

- **Caching** : The iPad caches the data locally for the most recent users (e.g., last 5 students) so they can log in instantly next time.
- **Privacy** : Each user's data is encrypted separately. Student A cannot see Student B's photos or files.
- **Guest Mode** : Allows temporary usage without a login for quick research tasks.

## Analogy

Shared iPad is like a **"Library Computer Terminal"** but for tablets.

Many different students sit at the computer throughout the week. When you log in with your ID, your specific folders and desktop background appear.

When you log off, the computer resets for the next student, but all your hard work is safely **"on the server"** (iCloud) waiting for your next visit.

---

## File: single-app-mode.md

---

term: "Single App Mode"

## category: ["Apps"]

## Term Definition

**Single App Mode** (also known as Kiosk Mode or App Lock) is a restrictive state that forces an iOS/iPadOS device to run only one specific application.

Use cases:

- **Assessment** : Locking the iPad to a test app so students cannot Google answers.

- **Kiosks** : Using an iPad as a dedicated visitor sign-in station or library catalog.
- **Ordering** : Restaurant menus.
- **Behavior** : Teachers using **Apple Classroom** to temporarily lock all student screens to a specific learning app ("Eyes on the textbook").

## Analogy

Think of this as **"Special Purpose Mode."** Just as a ticket machine at a train station is actually a computer but only lets you "buy tickets," Single App Mode turns an iPad into a **one-tool machine** .

If a student is taking an exam, they can't leave the test to check messages—they are **locked into the test** until the teacher says otherwise.

---

## File: sip.md

---

term: "SIP (System Integrity Protection)"

## category: ["Security"]

## Term Definition

**System Integrity Protection (SIP)** is a kernel-level security feature in macOS that protects operating system files from modification.

Protection scope:

- **Restricted Areas** : `/System`, `/usr`, `/bin`, `/sbin`, and pre-installed apps.

- **Rootless** : Even the "root" (superuser) account cannot modify these protected locations.
- **Defense** : Prevents malware from injecting code into system processes or modifying critical system binaries to gain persistence.

Disabling SIP generally requires booting into Recovery Mode, a step often taken by developers but strictly prohibited on managed enterprise devices.

## Analogy

Think of this as a **"Bulletproof Glass Shield"** for the computer’s heart.

Even if you are the owner of the house (the administrator) and you are holding a hammer, the system puts its most important "brain parts" behind this unbreakable glass where no one can touch them.

This makes it almost impossible for a virus or even an accidental mistake to **"break"** the core parts of your Mac.

---

## File: sites.md

---

term: "Sites"

## category: ["Core"]

## Term Definition

**Sites** is a multi-tenancy architecture feature within Jamf Pro.

Functionality:

- **Segmentation** : Allows a single MDM server to be virtually divided into distinct administrative zones.

- **Granular Access** : "Site Administrators" can only see and manage devices, users, and policies that belong to their specific site.
- **Independence** : Actions taken in "High School Site" do not affect devices in "Primary School Site."

This is essential for large districts or university systems where different departments need autonomy but share a central infrastructure.

## Analogy

Think of this as **"Separate Private Offices in a Shared Building."** The school district might own the whole building (the server), but inside, there are locked private offices (Sites) for each individual school.

The Primary School staff can't see the High School’s iPads, and each school can set their own rules without interfering with the other.

---

## File: smart-group.md

---

term: "Smart Group"

## category: ["Core", "Jamf"]

## Term Definition

A **Smart Group** is a dynamic collection of devices in Jamf Pro that updates automatically based on live criteria.

How it works:

- **Criteria** : Admin sets a rule (e.g., "OS Version is less than 17.0" OR "Battery Level is less than 20%").

- **Automation** : The MDM constantly checks inventory reports.
- **Membership** : If a device matches the rule, it is instantly added to the group. If it updates and no longer matches, it is removed.
- **Action** : These groups are used to trigger policies (e.g., "Update OS" policy targets the "Old OS" Smart Group).

## Analogy

A Smart Group is an **"Automatic Sorting Bin."** You set a rule: **"If a student iPad has less than 10% battery, put it in the 'Needs Charge' list."** The system constantly checks every device; as soon as one drops to 9%, it’s moved to that list automatically. No one has to check manually.

---

## File: software-update.md

---

term: "Software Update"

## category: ["macOS", "Jamf"]

## Term Definition

**Software Update** is the system mechanism for downloading and installing new versions of the operating system (macOS/iOS) and its built-in apps (Safari).

Management controls (via DDM):

- **Deferral** : IT can hide an update for up to 90 days to allow for testing.

- **Enforcement** : IT can force an update to install by a specific date and time.
- **Verification** : The device must reach out to Apple's servers to cryptographically verify the update package before installing.

## Analogy

Think of this as **"Device Schooling."** Every once in a while, your device needs to **"go back to class"** to learn new skills (new features) or get stronger (security fixes).

IT is the **Teacher** who decides when it’s the best time for all school iPads to learn these new things, making sure they are ready for the next lesson without surprising you in the middle of an exam.

---

## File: ssid.md

---

term: "SSID (Service Set Identifier)"

## category: ["Network"]

## Term Definition

An **SSID (Service Set Identifier)** is the technical term for the name of a Wi-Fi network broadcast by a router.

Common school setup:

- **School-Secure** : Encrypted network using WPA2/WPA3-Enterprise (802.1X) for managed devices.

- **School-Guest** : Open or password-protected network for visitors, isolated from internal servers.
- **Hidden SSID** : A network that does not broadcast its name (a weak security measure, often discouraged).

## Analogy

An SSID is the **"Name Above the Classroom Door."** When you walk through the hallway, you see "Year 5", "Year 6", and "Staff Room." You choose the room that matches your badge.

On your iPad, you choose the Wi-Fi **"Room"** (the SSID) that matches your actual campus role to get the right level of internet access.

---

## File: status-channel.md

---

term: "Status Channel"

## category: ["Core"]

## Term Definition

The **Status Channel** is a real-time communication pipeline used in **Declarative Device Management (DDM)** .

Key shift from legacy MDM:

- **Legacy (Polling)** : The server has to proactively ask the device, "Do you have this app installed?" repeatedly.

- **Modern (Status)** : The device automatically subscribes to "status items" (like Battery Health or Passcode Compliance). When a value changes, the device **immediately** notifies the server.
- **Efficiency** : Reduces network traffic and server load while increasing data accuracy.

## Analogy

Think of this as **"The Emergency Radio."** In the old days, a boss had to call every employee every hour to ask, "Is the project done yet?" (this is called polling). It was annoying.

With the **Status Channel** , the employee just radios the boss the moment they finish a task: **"I'm done!"** It’s faster, uses less energy, and keeps the boss informed instantly without constant phone calls.

---

## File: student-information-system.md

---

term: "Student Information System (SIS)"

## category: ["Education", "Other"]

## Term Definition

A **Student Information System (SIS)** is the authoritative database used by schools to manage student data.

Key functions:

- **Records** : Stores attendance, grades, medical info, and family contacts.

- **Integration** : Syncs with **Apple School Manager (ASM)** to provide accurate, up-to-date rosters for Managed Apple Accounts.
- **Automation** : When a new student is entered into the SIS, their digital identity and class assignments are automatically created in the school's technology systems.

## Analogy

This is the **"Digital Brain of the School Office."** It's the central hub that knows every student's name, which class they are in, and who their parents are.

By connecting this **"Brain"** to the school's iPad system, everything stays synchronized. If a new student joins the school, the system automatically gives them an iPad account and puts them in the correct classes without any extra paperwork.

---

## File: supervision.md

---

term: "Supervision"

## category: ["Core"]

## Term Definition

**Supervision** is a higher level of device management ownership available for institutional Apple devices.

Capabilities unlocked by Supervision:

- **Silent App Install** : Push apps without asking the user for permission.

- **Kiosk Mode** : Lock the device into a single app (Single App Mode).
- **Web Filtering** : Enforce global HTTP proxies to filter content.
- **Lost Mode** : Locate the device if it goes missing.
- **Security** : Prevent the user from removing the MDM profile or erasing the device.

Devices enrolled via **Automated Device Enrollment (ADE)** are supervised by default.

## Analogy

Supervision is the device's **"School Asset Mode."** A personal iPhone you buy from a store is in **"Personal Mode"** —most settings cannot be locked down.

Once a device is **Supervised** , it is recognized as **"School Property."** This unlocks full management capabilities for IT, allowing them to lock down any feature and ensuring the device is always safe and ready for learning.

---

## File: system-extension.md

---

term: "System Extension"

## category: ["Core"]

## Term Definition

A **System Extension** is a modern macOS framework that allows software to extend the functionality of the operating system without endangering its stability.

Advantages over Kernel Extensions (Kexts):

- **User Space** : Runs outside the kernel. If the extension crashes, the app restarts, but the whole Mac does*not* crash (no Kernel Panic).

- **Security** : Easier for macOS to police, preventing malware from gaining "root" access to the core of the system.
- **Ease of Management** : Can be installed and authorized via MDM without requiring a reboot into Recovery Mode.

## Analogy

Think of this as **"Keyhole Surgery"** for a computer.

In the past, to add a new security feature (like an antivirus), you had to perform **"open-heart surgery"** on the computer's most vital part (the Kernel), which was very risky.

System Extensions are a safer, modern way to add those same features without touching its **"heart."** It makes the Mac more stable and much harder for hackers to break.

---

## File: temporary-session.md

---

term: "Temporary Session"

## category: ["Education"]

## Term Definition

A **Temporary Session** (often called Guest functionality) is a feature of the **Shared iPad** environment.

Workflow:

- **Login** : User taps "Guest" on the login screen (no username/password needed).

- **Usage** : User has full access to apps and Safari for the duration of the session.
- **Logout** : When the user logs out, the cryptographic keys for that session are destroyed.
- **Wipe** : All data—browsing history, documents, photos, caches—is instantly and permanently erased.

## Analogy

Think of this as a **"Public Library Computer."** You don't need a library card to sit down and start using it. However, the moment you stand up and **"log out,"** the keyboard auto-cleans itself and the computer **shreds any papers** you left on the desk.

This ensures the next person can't see what you were doing, and the iPad stays fresh and fast for everyone.

---

## File: testflight.md

---

term: "TestFlight"

## category: ["Apps"]

## Term Definition

**TestFlight** is Apple's platform for beta testing pre-release applications.

Workflow:

1. **Invite** : Developers send an email invitation or public link to testers.

2. **Install** : Testers download the TestFlight app to install the beta version of the software.

3. **Feedback** : Testers can take screenshots or send crash reports directly to the developer from within the app.

4. **Expiry** : Beta builds typically expire after 90 days.

This is useful for schools piloting new ed-tech apps before deploying them to the entire student body.

## Analogy

Think of this as a **"Sneak Peek Movie Screening."** Before a movie (an app) comes out in theaters (the App Store), the filmmakers might show a **"work-in-progress"** version to a small group of fans to get their advice.

TestFlight is the **"private theater"** where students and teachers can try out new educational tools and help fix the bugs before the app is released to the whole world.

---

## File: tls-ssl.md

---

term: "TLS / SSL"

## category: ["Security"]

## Term Definition

**TLS (Transport Layer Security)** and its predecessor **SSL (Secure Sockets Layer)** are the cryptographic protocols that secure internet communications.

Function:

- **Encryption** : Scrambles data so it cannot be read by anyone except the sender and receiver.

- **Identity** : Uses **Certificates** to prove that the server you are talking to is the real one (e.g., verifying that `apple.com` is really Apple).
- **Usage** : Critical for MDM commands, Wi-Fi authentication, and secure web browsing (HTTPS).

## Analogy

Think of this as the internet’s **"Armored Truck."** When you put a letter (your data) inside, the truck automatically locks it with a code that only the destination bank can open.

This ensures that while the truck (the network) is driving from your house to the bank, no highway robbers can peek inside or change the money in the bags.

---

## File: token.md

---

term: "Token"

## category: ["Security"]

## Term Definition

A **Token** is a temporary digital key used for authentication in modern security systems (like OAuth or OIDC).

How it differs from a password:

- **Temporary** : A password lasts forever until changed; a token expires automatically (e.g., in 1 hour).

- **Specific** : A password unlocks everything; a token grants access only to specific resources (e.g., "Read Email" but not "Delete Email").
- **Invisible** : The user types their password once; the system exchanges tokens in the background for all subsequent actions, keeping the password safe.

## Analogy

Think of a Token as an **"All-Day Wristband"** at an amusement park.

You go to the front gate, show your ID, and pay (this is entering your password).

Instead of having to show your ID at every single ride, the park gives you a **wristband** (the Token). As long as you are wearing it, you can walk onto any ride instantly. If it falls off (expires), you just go back to the gate to get a new one.

---

## File: touch-id.md

---

term: "Touch ID"

## category: ["Hardware"]

## Term Definition

**Touch ID** is Apple's biometric fingerprint identity sensor.

Usage in education:

- **Unlock** : Teachers and older students can unlock iPads without typing a passcode.

- **Purchase** : Authorize App Store requests (if allowed).
- **Security** : MDM settings can mandate that Touch ID is*allowed* to unlock the device but require the passcode after a restart (Biometric Unlock).
- **Constraint** : On Shared iPads, Touch ID is generally disabled because the sensor cannot store fingerprints for 30 different students.

## Analogy

Think of this as your **"Fingerprint Key."** Instead of having to type in a 6-digit code every time you want to use your iPad, you just rest your finger on the button.

The machine recognizes your unique print and lets you in instantly. It’s faster than a key and much harder for someone to steal (unless they steal your finger!).

---

## File: transfer-to-android-tool.md

---

term: "Transfer to Android Tool"

## category: ["Core"]

## Term Definition

The **Transfer to Android Tool** is a migration utility introduced in iOS 26.3 to facilitate data portability.

Functionality:

- **Direction** : Moves data*from*an iPhone*to* an Android device.

- **Content** : Transfers contacts, message history, photos, videos, and DRM-free music.
- **MDM Restriction** : Administrators can block this feature on supervised devices to prevent corporate or school data (like contacts) from being exported to unmanaged personal devices.

## Analogy

This is the **"Exit Migration Helper."** Just as Apple has a tool to help people move _in_(Move to iOS), this tool helps people pack up their boxes and move*out* to a different house (Android).

For schools, it's something to watch out for. You don't want a student packing up the school's "furniture" (school data) and taking it to their personal house where the school keys no longer work.

---

## File: unified-logging.md

---

term: "Unified Logging"

## category: ["Core"]

## Term Definition

**Unified Logging** is the central system for capturing and storing diagnostic messages on Apple platforms.

Key features:

- **Centralization** : Collects logs from the kernel, drivers, and user apps into one single database.

- **Privacy** : Automatically redacts sensitive info (like passwords) unless a special profile is installed.
- **Troubleshooting** : Administrators use the `log` command or **Console.app** to view these streams. It is the definitive way to find out*why*a profile failed to install or*why* an app is crashing.

## Analogy

Think of this as the **"Black Box Flight Recorder"** for your iPad or Mac.

It silently keeps a detailed diary of everything the computer is doing—from "Connected to Wi-Fi" to "Opened Calculator."

If the **"plane"** (your device) crashes, the **"Investigators"** (the tech team) look at the black box diary to see exactly what happened in the seconds before the trouble started.

---

## File: universal-binary.md

---

term: "Universal Binary"

## category: ["macOS"]

## Term Definition

A **Universal Binary** is a macOS application package that contains executable code for multiple processor architectures.

Structure:

- **Fat Binary** : It includes code for both **Intel** (x86_64) and **Apple Silicon** (ARM64) chips inside a single app file.

- **Workflow** : When the user double-clicks the app, macOS automatically chooses the correct code for the computer's chip.
- **Benefit** : Ensures the app runs at maximum native speed on an M3 MacBook Air*and*an old Intel iMac, without needing **Rosetta 2** .

## Analogy

Think of this as a **"Bilingual Book."** Instead of buying one book in English and another in French, you buy one book that has every page written in both languages side-by-side.

If you are an English reader (Apple Silicon), you just read the English parts. If you are a French reader (Intel), you read the French parts. It works perfectly for everyone without needing a translator.

---

## File: universal-control.md

---

term: "Universal Control"

## category: ["Apple", "macOS"]

## Term Definition

**Universal Control** is a Continuity feature that allows a single keyboard and mouse to control multiple nearby Apple devices.

Functionality:

- **Zero Setup** : Devices signed into the same iCloud account automatically detect each other.

- **Cross-Platform** : A cursor can move from a Mac screen onto an iPad screen seamlessly.
- **Drag & Drop** : Files can be dragged from one device to another.
- **MDM Control** : Schools often disable this on shared or lab computers to prevent students from accidentally (or intentionally) moving files between machines during exams.

## Analogy

Think of this as **"Cursor Teleportation."** If you place your iPad next to your Mac, your mouse has the superpower to **glide right off the edge** of the computer screen and appear instantly on the iPad screen.

You can even grab a photo from your iPad and drag it onto your Mac to paste it into a report. It makes your two separate devices feel like one giant, powerful workspace.

---

## File: update-inventory.md

---

term: "Update Inventory"

## category: ["Core"]

## Term Definition

**Update Inventory** is the standard MDM command that forces a device to refresh its data record on the server.

Data points refreshed:

- **Device Info** : OS Version, Battery Level, Storage usage.

- **Apps** : List of all installed applications and versions.
- **Security** : Current status of Passcode, Encryption, and System Integrity Protection.
- **Profiles** : List of installed configuration profiles.

This command is the "heartbeat" of management; if a device hasn't updated its inventory in 30 days, the data on the server is considered stale and unreliable.

## Analogy

Think of this as a **"Digital Roll Call."** Just like a teacher needs to scan the room to count the students and check if everyone has their textbooks ready before starting a lesson, the tech office sends this command to **count all your apps** and check your iPad's health.

It ensures the school's records are 100% accurate and up-to-date.

---

## File: usb-c.md

---

term: "USB-C"

## category: ["Hardware"]

## Term Definition

**USB-C** is the universal connector standard used by modern Apple devices (iPad 10+, MacBook, iPhone 15+).

Capabilities:

- **Power** : High-wattage charging (Power Delivery).

- **Data** : High-speed file transfer (up to 40Gbps with Thunderbolt).
- **Video** : Connects directly to projectors and monitors.
- **Accessories** : Supports ethernet dongles, microphones, and hard drives.

**MDM Context** : Because USB-C makes it so easy to plug in flash drives, schools often use **"USB Restricted Mode"** profiles to stop students from copying school data onto personal drives.

## Analogy

Think of this as the **"Universal Connection Hole."** In the old days, you had different cables for charging (Lightning), connecting to a screen (HDMI), and moving files (USB-A). Now, one single **USB-C** port does it all.

It’s faster, the cable works even if you flip it upside down, and it makes it much easier to keep your iPad charged and ready for the school day.

---

## File: user-approved-mdm.md

---

term: "User Approved MDM"

## category: ["Enrollment", "macOS"]

## Term Definition

**User Approved MDM (UAMDM)** is a trusted status for macOS enrollments.

Distinction:

- **Automated Enrollment** : Automatically "User Approved" because the device was registered by the organization (Apple Business Manager).

- **Manual Enrollment** : If a user manually installs a profile, they*must* also go into System Settings and click "Approve" to grant UAMDM status.
- **Privileges** : Only UAMDM devices can accept sensitive security payloads (like Kernel Extensions or Full Disk Access controls) silently. Without this status, the MDM is considered "Untrusted" for deep system changes.

## Analogy

Think of this as a **"Certificate of High Trust."** If you hire a cleaner for your house, they can clean the windows. But if you want to give them the keys to the **Main Security Gate** , you need to sign a special legal document saying, **"Yes, I trust them completely."** User Approved MDM is that signature. Without it, the MDM can only do basic cleaning; it's not allowed to touch the locks.

---

## File: user-enrollment.md

---

term: "User Enrollment"

## category: ["Enrollment"]

## Definition

User Enrollment is a specialized MDM onboarding mode designed specifically for **Bring Your Own Device (BYOD)** programs. It creates a dedicated "managed volume" for school data (such as school email and managed apps) that is completely separate from the user’s personal data. The school’s IT department has NO access to the user’s personal photos, messages, or apps, and the user can unenroll their device at any time to remove all school data instantly.

## Plain English

This is the "Church and State" of device management. It’s like having a secure "School Locker" inside your personal phone. The school can see and manage what’s inside the locker (your school work and email), but it’s completely impossible for them to see what’s in the rest of your phone. Your private photos and games stay 100% private, and the school can't even "remote wipe" your personal device.

---

## File: user-initiated-enrollment.md

---

term: "User-Initiated Enrollment (UIE)"

## category: ["Enrollment"]

## Term Definition

**User-Initiated Enrollment (UIE)** is a voluntary onboarding workflow for Apple devices.

Characteristics:

- **Trigger** : The user manually visits an enrollment URL or scans a QR code.

- **Ownership** : Often implies the device is "User Owned" (BYOD), though sometimes used for organization-owned devices that were not purchased via Apple/Reseller channels.
- **Supervision** : By default, UIE devices are **not** Supervised (unless enrolled via Apple Configurator).
- **Control** : The user retains the ability to remove the MDM profile (and thus unenroll the device) at any time.

**Education Context** : Generally not recommended for student-owned 1:1 programs because students can easily remove the management profile to bypass restrictions.

## Analogy

This is a **"Voluntary Enrollment Plan."** Instead of the school "drafting" the iPad into service automatically (the ADE method), the student chooses to sign up for school management themselves.

However, because it's voluntary, the student can also choose to **"quit"** the plan at any time, meaning the school’s security rules will stop working the moment they decide to leave.

---

## File: vlan.md

---

term: "VLAN"

## category: ["Network"]

## Definition

A Virtual Local Area Network (VLAN) is a logical subnetwork within a physical network. Schools often use VLANs to separate different types of traffic—such as "Academic Network," "Administrative Network," and "Guest Wi-Fi"—onto their own isolated channels. This prevents "broadcast noise" from slowing down the network and ensures that guests cannot access sensitive school servers.

## Plain English

Think of this as "Invisible Walls" inside your network cable. Even though everyone is using the same physical "Internet Pipe," the VLANs act like dividers that slice the pipe into several smaller, private tunnels. Water in Tunnel A (the guest Wi-Fi) can never leak into Tunnel B (the school's private exam server), keeping everything organized and secure.

---

## File: volume-owner.md

---

term: "Volume Owner"

## category: ["Security"]

## Term Definition

The **Volume Owner** is a security designation within the macOS architecture on Apple Silicon (M-series) Macs.

Privileges:

- **Exclusivity** : Only a Volume Owner can authorize software updates, modify startup security settings (e.g., enable booting from external drives), or authorize a factory reset in Recovery Mode.

- **Creation** : The first user to claim the Mac setup becomes the first Volume Owner.
- **MDM Role** : MDM uses a **Bootstrap Token** to act as a "Virtual Volume Owner," allowing it to push updates and manage security without needing the physical user's password.

## Analogy

Think of this as the **"Homeowner with the Title Deed."** Even if many people live in a house (the Mac), only the legal owner has the right to renovate the kitchen or change the front door locks.

If you aren't the official **"Volume Owner,"** the Mac will refuse to let you install a major system update or change its deepest security settings, making the machine much harder to "break" or hack.

---

## File: vpp.md

---

term: "VPP (Volume Purchase Program)"

## category: ["Apple"]

## Term Definition

**VPP (Volume Purchase Program)** is the Apple licensing framework for bulk app and book distribution.

Mechanics:

- **Ownership** : The organization buys the licenses (e.g., 500 copies of Procreate), not the user.

- **Distribution** : Licenses are assigned to devices or Apple IDs via MDM ("Managed Distribution").
- **Revocation** : If a student leaves or graduates, the school can **revoke** the license and reclaim it to the central pool, ready to be assigned to a new incoming student.
- **Cost** : Eliminates the need to repurchase software every year.

## Analogy

Think of this as the school's **"Digital Library."** Instead of every student having to use their own money to buy a textbook, the school buys 500 copies. The school **"lends"** a copy to each student.

When the school year is over, the school **"takes the book back"** electronically and puts it back on the shelf, ready for the next class to use.

---

## File: web-clip.md

---

term: "Web Clip"

## category: ["Apps"]

## Term Definition

A **Web Clip** is a configuration profile payload that places a website shortcut on an iOS or iPadOS Home Screen.

Features:

- **Appearance** : Looks exactly like a regular app icon.

- **Function** : When tapped, it launches Safari (or a dedicated full-screen web view) directly to a specified URL.
- **Customization** : IT can define the icon image, the display name, and whether the clip is removable by the user.
- **Use Case** : Commonly used for quick access to school portals, library catalogs, or IT help desks.

## Analogy

Think of this as a **"Smart Bookmark."** Instead of having to open a browser and type in a long address for the school's learning website, IT places a special **Button** on your iPad that looks just like an app.

You tap it, and it **teleports** you straight to the correct website instantly. It’s a great time-saver for students.

---

## File: wi-fi-payload.md

---

term: "Wi-Fi Payload"

## category: ["Network"]

## Term Definition

A **Wi-Fi Payload** is the section of an MDM profile that configures wireless connectivity settings.

Contents:

- **SSID** : The name of the network to join.

- **Auto-Join** : Whether the device should connect automatically when in range.
- **Security Type** : E.g., WPA2/WPA3 Personal (Password) or Enterprise (RADIUS/Certificate).
- **Credentials** : The pre-filled password or identity certificate required to authenticate.

By deploying this payload, IT ensures devices connect to the secure network immediately without user intervention.

## Analogy

Think of this as an **"Automatic Login Sheet."** Instead of a teacher having to shout the Wi-Fi password across the room 30 times, IT **"whispers"** the password directly into the iPad's memory through the MDM.

The iPad **"reads"** the password and connects to the internet automatically, so you're ready to start working the moment you walk into the building.

---

## File: wifi-5.md

---

term: "Wi-Fi 5"

## category: ["Network"]

## Term Definition

**Wi-Fi 5** (IEEE 802.11ac) is an older wireless standard introduced in 2014, operating exclusively in the 5 GHz frequency band.

Key characteristics:

- **Speed** : significantly faster than Wi-Fi 4 (802.11n), allowing for HD video streaming.

- **MU-MIMO** : Introduced the ability for routers to talk to multiple devices simultaneously (Wave 2), though less efficiently than Wi-Fi 6.
- **Legacy Status** : While still functional, it struggles in high-density environments like modern classrooms where every student has a device.

## Analogy

Think of this as a **"Wide Highway."** Before Wi-Fi 5 (Wi-Fi 4), we drove on narrow country roads (2.4 GHz). Wi-Fi 5 built a **wide, fast highway** (5 GHz) that allowed cars to drive much faster.

However, as more cars (Ipads) joined the road, the highway started to get congested because the traffic lights (router) weren't smart enough to manage the flow efficiently.

---

## File: wifi-6.md

---

term: "Wi-Fi 6"

## category: ["Network"]

## Term Definition

**Wi-Fi 6** (IEEE 802.11ax) is the wireless standard that succeeded Wi-Fi 5, focusing on **efficiency** and capacity in crowded environments rather than just raw peak speed.

Key improvements for schools:

- **OFDMA** : Allows one transmission to deliver data to multiple devices at once (like a delivery truck making multiple stops), reducing latency in classrooms with 30+ iPads.

- **Target Wake Time (TWT)** : Allows devices to "sleep" and wake up only when scheduled to send data, significantly saving battery life on iPads and MacBooks.
- **BSS Coloring** : Reduces interference from neighboring classrooms' Wi-Fi networks.

## Analogy

Think of this as a **"Smart Bus System."**

**Wi-Fi 5** was like a fleet of cars carrying one person each. If 30 students needed data, 30 cars had to line up, causing a traffic jam. **Wi-Fi 6** uses **OFDMA** , which is like a **bus** . One bus can pick up data for 30 students at once and deliver it in a single trip. The road is less crowded, and everyone gets to their destination (website) smoother and faster, even during a busy lesson.

---

## File: wifi-6e.md

---

term: "Wi-Fi 6E"

## category: ["Network"]

## Term Definition

**Wi-Fi 6E** is the extension of the Wi-Fi 6 standard into the 6 GHz frequency band.

Advantages for schools:

- **Spectrum** : Adds huge amounts of new "airspace" (1200 MHz) exclusively for 6E devices, avoiding interference from older Wi-Fi 5 devices.

- **Speed** : Supports **160MHz channels** , effectively doubling the throughput for compatible devices (iPad Pro M2+, MacBook Pro M2+).
- **Latency** : Significantly reduces lag, critical for AR/VR applications and high-density classroom testing.

## Analogy

Think of this as **"Adding a Double-Decker Express Highway"** to the school's internet.

Most Wi-Fi works on "crowded local streets." Wi-Fi 6E opens up a brand-new, wider highway where modern iPads can travel twice as fast without getting stuck in **"internet traffic"** caused by older phones and laptops.

It makes downloading large textbooks and projects feel almost instant.

---

## File: wifi-7.md

---

term: "Wi-Fi 7"

## category: ["Network"]

## Term Definition

**Wi-Fi 7** (IEEE 802.11be) is the cutting-edge wireless standard designed for extremely high throughput and low latency.

Key innovations for education:

- **320MHz Channels** : Doubles the bandwidth of Wi-Fi 6E, offering massive capacity for 8K video and AR/VR classrooms.

- **Multi-Link Operation (MLO)** : Allows a device (like an iPhone 16) to connect to multiple bands (e.g., 5GHz and 6GHz)_simultaneously_ to send and receive data. This dramatically reduces latency and connection drops.
- **4K QAM** : Packs 20% more data into each signal transmission for higher peak speeds.

## Analogy

Think of this as a **"Multi-Lane Superhighway."** Previous Wi-Fi was like a car that could only drive in one lane at a time. If that lane got jammed, you slowed down.

Wi-Fi 7 with **MLO** is like a futuristic car that can drive on the Local Road (2.4GHz), the Highway (5GHz), and the Express Lane (6GHz) **all at the same time** . It splits your data across all empty lanes so you never get stuck in traffic, making it perfect for real-time virtual reality lessons.

---

## File: window-app.md

---

term: "Window App"

## category: ["Core"]

## Term Definition

**Window App** is the advanced windowing environment introduced in iPadOS 26, evolving from Stage Manager.

Capabilities:

- **Floating Windows** : Apps can be resized, overlapped, and moved freely, similar to macOS.

- **Grouping** : Users can create "App Pairs" or workspaces (e.g., Safari + Notes for research) that are saved together.
- **External Display** : Full support for extending the desktop to a monitor (up to 6K) rather than just mirroring, effectively turning the iPad into a desktop workstation.

## Analogy

In the past, using apps on an iPad was like **"reading one book at a time"** on your lap.

With **Window App** , using your iPad is like sitting at a **"Professional Desk."** You can have your textbook open, your notepad next to it, and a calculator floating on top—all at once. You can resize them and move them around just like you do on a laptop, making homework much faster.

---

## File: wipe.md

---

term: "Wipe"

## category: ["Core"]

## Term Definition

A **Wipe** (or Remote Wipe) is the MDM command to factory reset a device.

Consequences:

- **Deletion** : Permanently erases all user data, apps, accounts, and settings.

- **Reset** : Returns the operating system to its "out-of-box" state ("Hello" screen).
- **Security** : Used as a last resort for lost/stolen devices to prevent data theft.
- **lifecycle** : Used at the end of a school year to prepare an iPad for a new student.

## Analogy

This is the **"Digital Reset Button."** When IT sends this command, it tells the iPad to completely **"forget"** everything it knows—every photo, every app, and every setting is erased.

The iPad then wakes up looking exactly as it did the day it was first taken out of its box, clean and ready for a fresh start.

---

## File: wpa.md

---

term: "WPA / WPA2 / WPA3"

## category: ["Network", "Security"]

## Term Definition

**WPA (Wi-Fi Protected Access)** is the family of security protocols used to secure wireless networks.

Generations:

- **WPA3 (Latest)** : Mandatory for Wi-Fi 6E. Provides stronger encryption (SAE) and protection against password guessing attacks.

- **WPA2 (Standard)** : The current standard for most devices.
- **Enterprise Mode** : Schools typically use WPA2/WPA3-Enterprise, which authenticates each user individually (via **802.1X** ) rather than using a single shared class password.

## Analogy

Think of these as the **"Different Levels of Locks"** on your school's front door.

- **WPA1** was like a simple latch (too easy to break).

- **WPA2** is like a strong deadbolt lock.
- **WPA3** is the newest **"Smart Lock"** that is nearly impossible for a thief to pick.

The school uses these high-level locks to make sure only students and teachers can get onto the school Wi-Fi, keeping everyone's data safe.

---

## File: zero-touch.md

---

term: "Zero-Touch Deployment"

## category: ["Enrollment"]

## Term Definition

**Zero-Touch Deployment** is a hands-off distribution model for Apple devices.

Workflow:

1. **Purchase** : School buys devices from Apple/Reseller.

2. **Assign** : Devices are automatically added to **Apple School Manager (ASM)** .

3. **Ship** : Unopened boxes are shipped directly to students' homes.

4. **Setup** : Student opens the box and connects to Wi-Fi.

5. **Enroll** : The device checks in with Apple, sees it belongs to the school, downloads the MDM profile, and installs all apps automatically.

## Analogy

Think of this as **"Instant School iPad Magic."** The school's IT team doesn't even have to open the box. They can send a brand-new iPad straight to your home.

The moment you turn it on and connect to your home Wi-Fi, the iPad **"realizes"** it belongs to the school and automatically begins setting itself up with your email, textbooks, and apps—all by itself!

---

## File: zero-trust.md

---

term: "Zero Trust"

## category: ["Security"]

## Term Definition

**Zero Trust** is a modern security architecture based on the principle: **"Never Trusted, Always Verified."** Key concepts:

- **No Perimeter** : Being "inside the school building" does not automatically grant access.

- **Continuous Auth** : Every request (opening a file, accessing email) is checked.
- **Context** : Access depends on*Who*you are (User ID),*What*device you have (Managed?), and*Where* you are.
- **Risk Assessment** : If a device is outdated or infected, access is blocked immediately, even if the password is correct.

## Analogy

Think of this as the **"Strict Security Guard"** mode.

In the past, if you were inside the school building, everybody assumed you belonged there.

Under **Zero Trust** , the building is full of **"locked doors."** No matter who you are, the school's system asks to see your **"ID card"** and check your **fingerprints** every single time you want to open a door. It’s strict, but it keeps everyone’s data much safer.

---

## File: zero-wipe-mdm-migration.md

---

term: "Zero-Wipe MDM Migration"

## category: ["MDM"]

## Term Definition

**Zero-Wipe MDM Migration** is a transition feature in iOS/iPadOS and macOS that allows devices to switch MDM servers without erasing user data.

Mechanism (Declarative Device Management):

1. **Unenroll** : The device gracefully leaves the old MDM server.

2. **Transfer** : It retains user data (photos, files) and apps.

3. **Re-enroll** : It immediately enrolls into the _new_ MDM server designated in Apple School Manager.

4. **Takeover** : The new server takes ownership of the existing managed apps.

**Warning for Schools** : While promising, this process can be risky for **Shared iPads** or devices with complex profiles, often leading to "zombie" apps that cannot be updated.

## Analogy

In the past, switching to a new management system was like **"tearing down a house and rebuilding it"** just to change the landlord.

Now, **Zero-Wipe Migration** is like **"keeping your house and furniture exactly as is, but just hiring a new security guard."** All your photos and homework stay on the iPad, but the school gets to manage it using a newer, better system.
