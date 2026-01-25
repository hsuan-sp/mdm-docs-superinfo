---
File: enrollment-customization.md
---

---

term: "Enrollment Customization"

## category: ["Enrollment", "Apple"]

## Term Definition

**Enrollment Customization** allows organizations to deliver a tailored onboarding experience during the **Automated Device Enrollment (ADE)** process.

Customization options:

- **Branding** : Display school logos, custom welcome text, and contact information.

- **Policies** : Require users to read and accept Apple’s and the school’s **Acceptable Use Policy (AUP)** before proceeding.
- **Authentication** : Use modern identity providers (Azure AD, Okta, Google) to verify the user's identity before enrollment is completed.
- **Workflow** : Create a multi-step sequence of setup screens that are unique to the organization.

## Analogy

This is the device's **"Welcome Lobby"** or **"Registration Desk."** Just like a new student's first day involves visiting a welcome center to get their ID badge and sign the school rules, this feature puts that exact experience right on the iPad or Mac screen.

Before the student can even reach the Home Screen, they see the school's logo and must **"sign"** the rules, ensuring everyone is on the same page and properly identified from day one.

---

## File: enrollment-invitation.md

---

term: "Enrollment Invitation"

## category: ["Jamf", "Enrollment"]

## Term Definition

An **Enrollment Invitation** is a semi-automated method for adding existing or personal devices to the Jamf management system.

The typical process:

1. **Creation** : An administrator generates a unique invitation in the MDM console.

2. **Delivery** : The invitation is sent to the user via email, SMS, or displayed as a QR code.

3. **Execution** : The user clicks the link or scans the code, which directs them to a secure portal to install the management profile manually.

This method is primarily used for **User Enrollment (BYOD)** or for enrolling devices that were not purchased through official Apple corporate channels.

## Analogy

Think of this as a **"Digital Golden Ticket."** The school sends you a special, unique link. Once you click it, your personal device is "invited" to join the school's private network.

This allows you to get school services (like Wi-Fi and apps) automatically. However, because it's an invitation **you accepted** , the school still can't see your personal data, like photos or text messages.

---

## File: esim.md

---

term: "eSIM"

## category: ["Hardware"]

## Term Definition

An **eSIM** (embedded SIM) is a programmable digital SIM card built directly into the device's hardware, replacing the need for a physical plastic SIM.

In an MDM environment:

- **Remote Provisioning** : IT can push cellular data plans to a fleet of iPads or iPhones over-the-air.

- **Security** : The SIM cannot be physically removed or stolen from the device.
- **Logistics** : Eliminates the cost and delay of shipping physical SIM cards to staff or students.
- **Flexibility** : Devices can store multiple eSIM profiles, making it easy to switch between local and international data plans for school trips.

## Analogy

This is a **"Virtual SIM Card."** In the past, switching cellular providers meant using a paperclip to poke a tiny hole and swap a plastic chip. With **eSIM** , it's like "downloading" your phone number and data plan through the air, just like an app.

It’s faster, more secure, and you never have to worry about losing a tiny, fragile piece of plastic.

---

## File: ethernet.md

---

term: "Ethernet"

## category: ["Network"]

## Term Definition

**Ethernet** is the standard technology for wired local area network (LAN) connections, typically utilizing **RJ45** cables.

Deployment advantages:

- **Stability** : Provides a consistent connection unaffected by radio interference or physical obstacles that impact Wi-Fi.

- **Speed** : Offers significantly higher throughput for massive data tasks.
- **IT Labs** : Recommended for initial "Zero-Touch" provisioning, bulk software installations, and multi-gigabit OS updates where Wi-Fi congestion could lead to failures.

## Analogy

Think of Ethernet as a **"High-Speed Private Train Track."** Wi-Fi is like driving on a busy public highway—it's convenient and mobile, but it can get congested with traffic or lose signal in tunnels. **Ethernet** is a direct, solid, and dedicated line that is much faster and more reliable. It ensures that when the school is updating 100 iPads at once, the internet doesn't "stutter" or drop out, delivering the data directly to each station without delays.

---

## File: extension-attribute.md

---

term: "Extension Attribute"

## category: ["Core"]

## Term Definition

An **Extension Attribute** is a powerful customization feature in Jamf Pro that allows administrators to collect data points not covered by the standard MDM inventory protocol.

Capabilities:

- **Custom Scripts** : Run Bash, Zsh, or Python scripts to query deep system settings.

- **Specific Monitoring** : Report on unique items like the number of **battery cycles** , the presence of internal company files, or specific hardware daughterboard IDs.
- **Reporting** : The data collected is populated into the device record and can be used to trigger **Smart Groups** .

## Analogy

Think of this as a **"Custom Survey"** or a **"Specific Health Quiz"** for your computers.

A standard inventory check only asks basic questions like "What is your serial number?". An **Extension Attribute** lets IT ask much more specific and inquisitive questions, like "Did you restart your computer this month?" or "Is your hard drive feeling too full?".

It helps IT find small, hidden problems before they turn into major system failures.

---

## File: face-id.md

---

term: "Face ID"

## category: ["Hardware"]

## Term Definition

**Face ID** is Apple’s advanced facial recognition biometric authentication system.

Technical security:

- **TrueDepth Camera** : Projects and analyzes over 30,000 invisible infrared dots to create a 3D mathematical model of the user's face.

- **Security Enclave** : The mathematical model is stored and processed locally on the device and is never sent to Apple or the cloud.
- **MDM Control** : Administrators can enforce the use of Face ID (or Touch ID) to unlock devices or access specific managed educational apps, ensuring that sensitive data remains protected even if a device is physically accessed by an unauthorized person.

## Analogy

This is **"3D Facial Scanning."** It doesn't just take a flat photo; it scans the actual depth and shape of your face using invisible light beams. Even if someone has a high-quality 2D photo or a professional mask of you, they can’t trick the system.

It’s a fast, convenient, and incredibly secure way to make sure that the **correct student** —and only that student—is using the device.

---

## File: federated-authentication.md

---

term: "Federated Authentication"

## category: ["Apple"]

## Term Definition

**Federated Authentication** is an identity bridge that connects Apple Business/School Manager to an external **Identity Provider (IdP)** .

Supported Providers:

- **Microsoft Entra ID (Azure AD)**

- **Google Workspace**

Benefits:

- **Single Sign-On (SSO)** : Students and staff can log in to their **Managed Apple Accounts** using their standard school email and password.

- **Account Consolidation** : Reduces management overhead by eliminating the need to create and maintain separate passwords for Apple IDs.
- **Security** : Leveraging existing MFA (Multi-Factor Authentication) policies from the school's primary identity system.

## Analogy

Think of this as **"One Key for Every Door."** Just as many websites allow you to "Log in with Google," **Federated Authentication** lets you log in to your school iPad using your regular school email and password.

You don't have to remember a separate "Apple ID password" just for school assignments. If you change your password at the main office, it automatically updates for your iPad too, making your digital life much simpler.

---

## File: filevault-unlock-over-ssh.md

---

term: "FileVault Unlock over SSH"

## category: ["Mac"]

## Term Definition

A remote management capability introduced in **macOS Tahoe** that improves troubleshooting workflows for encrypted Macs.

Functional details:

- **Capability** : Allows an administrator to remotely unlock a **FileVault-encrypted** startup disk using a secure shell (SSH) connection.

- **Prerequisite** : The Mac must have "Remote Login" enabled via MDM and be connected to the network.
- **Utility** : Highly useful for remote maintenance on devices that have been rebooted but are stuck at the pre-boot login screen.

## Analogy

In the past, unlocking an encrypted Mac was like **"Having to be there in person to turn the combination lock on a heavy safe."** Now, with SSH unlocking, it's like having a **"Verified Remote Remote Control."** As long as the computer is online, IT can securely unlock the "digital vault" from their office to fix a software error, saving them from having to walk across the entire campus to your specific desk just to type a password.

---

## File: filevault.md

---

term: "FileVault"

## category: ["Security"]

## Term Definition

**FileVault** is the integrated full-disk encryption (FDE) technology for macOS.

Technical features:

- **Encryption** : Uses **XTS-AES-128** encryption with a 256-bit key to prevent unauthorized access to data on the startup disk.

- **Boot Security** : Data is only decrypted once the user successfully logs into an authorized account (or IT uses a recovery key).
- **Recovery Keys** : Organizations can use MDM to generate and securely store a unique **Personal Recovery Key (PRK)** for every Mac, ensuring IT can always regain access if a user forgets their password.

Enforcing FileVault is a cornerstone of modern organizational security and data privacy compliance.

## Analogy

Think of this as a **"Digital Vault"** for the entire computer.

On an unprotected computer, a thief could simply pull out the hard drive and put it into their own machine to read your private files.

With **FileVault** turned on, the entire drive is scrambled into a complex code that only your specific key can unlock. Without that key, the hard drive is nothing more than a useless piece of scrap metal to anyone who finds it.

---

## File: find-my.md

---

term: "Find My"

## category: ["Apple", "Security"]

## Term Definition

**Find My** is Apple’s distributed tracking and recovery network for hardware and accessories.

Organizational capabilities:

- **Managed Lost Mode** : MDM can remotely trigger a specialized "Lost Mode" on supervised devices. This locks the interface, displays a custom message, and provides coordinates to the IT department.

- **Activation Lock Bypass** : Even if a student signs in with a personal iCloud account, MDM can generate a bypass code to prevent the device from being "locked" to that student's account after a wipe.
- **Independence** : Managed Lost Mode does not require the device to be signed into a personal iCloud account to function.

## Analogy

This is the device's **"Built-in GPS Tracker"** and **"Loud Siren."** If a student leaves their iPad on a park bench, IT can immediately see exactly where it is on a satellite map. They can even make it play a loud "beeping" sound (even if it's on silent) or put an unmissable message on the screen saying, "This iPad belongs to the school. Please return it."

If it's truly gone, IT can remotely **"Self-Destruct"** all the data to keep it private.

---

## File: firmware-password.md

---

term: "Firmware Password"

## category: ["macOS"]

## Term Definition

A **Firmware Password** is a foundational security lock designed for Intel-based Macs. (Note: On modern Apple Silicon Macs, this has been superseded by **"Recovery Lock"** ).

What it protects:

- **Boot Control** : Prevents the Mac from booting from anything other than the designated startup disk (e.g., blocks booting from a USB drive).

- **Recovery Access** : Requires a password to enter macOS Recovery, preventing unauthorized users from wiping the computer or resetting the admin password.
- **Deep Security** : It acts as a barrier that exists before the operating system even starts to load.

## Analogy

Think of this as the **"Ignition Lock"** for a computer.

Standard login passwords are like the front door of your house—they keep uninvited people out of the rooms. A **Firmware Password** is like a specialized lock on the car's engine itself.

Without it, the computer won't even "start its engine" to let you reinstall the system. It makes the computer essentially worthless to a thief who wants to wipe and resell it.

---

## File: firmware.md

---

term: "Firmware"

## category: ["Hardware"]

## Term Definition

**Firmware** is persistent, low-level software programmed directly into a hardware chip (like the BIOS or iBoot) to control its basic operations.

Key roles:

- **Initialization** : It is the first code that runs when a device is turned on, telling the hardware how to start up.

- **Hardware Control** : Manages the interaction between the physical components (screen, battery, fans) and the higher-level operating system (macOS/iOS).
- **Security Updates** : Apple frequently bundles firmware updates with standard OS updates to patch vulnerabilities that exist at the chip level.

## Analogy

Think of this as the **"Built-in Reflexes"** or the **"Operating Instructions"** inside the computer's brain.

While the "Operating System" is like the language you speak and the apps you use, **Firmware** is like the instinct to blink or breathe. It tells the screen how to light up, the battery how to charge, and the fans how fast to spin.

If this deep-level "instinctive" software is broken, the computer won't even know how to wake up or show its name.

---

## File: gatekeeper.md

---

term: "Gatekeeper"

## category: ["Security"]

## Term Definition

**Gatekeeper** is a macOS internal security technology designed to protect users from malicious or untrusted software.

Protective measures:

- **Verification** : Checks downloaded applications for a valid Apple Developer ID signature.

- **Notarization** : Verifies that the app has been scanned and "notarized" by Apple’s automated security systems to be free of known malware.
- **In-Place Enforcement** : If an app is from an unknown source or has been tampered with, Gatekeeper prevents it from opening.

Administrators use MDM to standardize Gatekeeper settings across the school, ensuring only approved and safe software can be launched by students.

## Analogy

This is the Mac's **"Software Customs Officer."** Whenever you try to run a program you downloaded from the internet, the officer (Gatekeeper) stops it to check if it has a valid entry visa (notarization) from Apple.

If the program looks suspicious, comes from an untrusted source, or hasn't been properly cleared, the officer will block the door and refuse to let it run, keeping your Mac safe from viruses and digital "intruders."

---

## File: global-proxy.md

---

term: "Global Proxy"

## category: ["Network"]

## Term Definition

A **Global HTTP Proxy** setting is an MDM payload that enforces the routing of all device network traffic (HTTP/HTTPS) through a designated proxy server.

Typical organizational goals:

- **Content Filtering** : Denying access to inappropriate or dangerous websites at the gateway level.

- **Auditing** : Maintaining centralized logs of all internet usage for compliance and digital citizenship monitoring.
- **Bypass Prevention** : Ensuring that filtering remains active even when the device leaves the campus network.

**Technical Consideration** : While excellent for security, some high-bandwidth applications (like video conferencing or heavy streaming) may experience latency or connection issues if the proxy server is underpowered or misconfigured.

## Analogy

Think of this as a **"Mandatory Security Checkpoint"** for all internet traffic.

Every "car" (piece of data) trying to leave or enter the device must first drive through this single checkpoint to be inspected by a guard. While this allows the school to filter out "contraband" (blocked websites), it can sometimes cause a **"traffic jam"** (slower internet speeds) because every single thing has to stop and be checked before it's allowed through the gate.

---

## File: guided-access.md

---

term: "Guided Access"

## category: ["Education", "Apple"]

## Term Definition

**Guided Access** is a built-in iOS and iPadOS feature designed for accessibility and focused learning.

Key functionalities:

- **App Locking** : Temporarily restricts the device to a single application.

- **Hardware Control** : Disables the Home button or gestures (on newer iPads) to prevent the user from leaving the app.
- **Screen Customization** : Allows an administrator or teacher to disable specific areas of the screen to prevent accidental or unwanted interaction.
- **Time Limits** : Enables the setting of a specific duration for an activity.

Teachers frequently use Guided Access to transform an iPad into a dedicated assessment tool or a specific learning station.

## Analogy

This is the **"Single-App Lock Mode."** For example, before handing out an iPad for an end-of-unit exam, a teacher can triple-click a button to **"pocket"** the student into the testing app. The student won't be able to leave that app to peek at notes or switch to a game until the teacher enters a secret passcode to "unlock" the device back to normal. It’s a great way to help students stay 100% focused on their current work.

---

## File: handoff.md

---

term: "Handoff"

## category: ["Apple"]

## Term Definition

**Handoff** is a primary component of Apple’s **Continuity** framework that enables users to transfer an active task between nearby devices seamlessly.

How it works:

- **Synchronization** : As you work in a compatible app (like Mail, Safari, or Pages), the device broadcasts the state of that app.

- **Continuity** : A nearby device (Mac, iPad, or iPhone) detects the broadcast and displays a Handoff icon.
- **Resumption** : Clicking the icon instantly opens the same app on the second device, at the exact same point in the task.

**Requirements** : Both devices must be signed in to the same **Apple Account** , have Bluetooth and Wi-Fi enabled, and be within close proximity.

## Analogy

This is a **"Relay Race"** for your digital work.

Your iPhone runs the first lap (you start drafting an email while walking to school), and as soon as it reaches the "Handoff Zone" near your Mac in the classroom, the Mac can take the baton and finish the race.

You don't need to manually save a file or email it to yourself; the work just **"jumps"** from one screen to the other instantly, so you never lose your momentum.

---

## File: ibeacon.md

---

term: "iBeacon"

## category: ["Hardware"]

## Term Definition

**iBeacon** is Apple's location-aware technology that uses **Bluetooth Low Energy (BLE)** to detect proximity and trigger location-specific actions on mobile devices.

Educational applications:

- **Automation** : Automatically opening a specific textbook app when a student enters the library.

- **Restrictions** : Automatically muting iPad volume or disabling the camera as soon as a device "senses" it is inside the auditorium.
- **Inventory** : Helping IT locate sets of iPads within large buildings by identifying which beacon they are currently near.

## Analogy

Think of these as **"Invisible Sense-Posts"** or **"Digital Lighthouses"** placed around the school.

When an iPad walks past a post in the music room, it doesn't need to be scanned; the system just "senses" the location and can automatically tell the iPad, "You're in the music room now—please turn your volume down and open the sheet music app." It helps make the technology respond intelligently to exactly where the student is standing.

---

## File: icloud-backup.md

---

term: "iCloud Backup"

## category: ["Core", "Apple"]

## Term Definition

**iCloud Backup** is an automated cloud service that replicates a device's data and settings to Apple’s secure servers.

Execution criteria:

- **Connectivity** : The device must be connected to Wi-Fi.

- **Power** : The device must be plugged into a power source (charging).
- **State** : The device screen must be locked (usually occurring overnight).

**MDM Governance** : Depending on the school's data privacy policy, IT can either mandate iCloud Backup to ensure student work is never lost, or restrict it if data must remain strictly on-premises for legal reasons.

## Analogy

This is the **"Automatic Digital Safety Net."** Every night while the student's iPad is sleeping and charging, it quietly packs up all their school work, photos, and settings and stores a safety copy in the "Cloud" (a secure digital warehouse).

If the iPad is dropped and shattered the next morning, IT can just give the student a brand new iPad. Once they log in, their entire **"digital life"** will come back exactly as it was, like nothing ever happened.

---

## File: identity-provider.md

---

term: "Identity Provider (IdP)"

## category: ["Security"]

## Term Definition

An **Identity Provider (IdP)** is a specialized service that creates, maintains, and manages digital identities and authentication.

Common IdPs in Education:

- **Google Workspace\*\*\*** Microsoft Entra ID (formerly Azure AD)

**\*** Okta \***\* MDM Role **: In a modern setup, MDM does not manage passwords itself. Instead, it "outsources" authentication to the IdP. When a student tries to enroll an iPad, the MDM sends a request to the IdP (e.g., Google) to verify the password. This enables** Single Sign-On (SSO) ** , allowing students to use one single password for their iPad, their email, and their learning portal.

## Analogy

Think of this as the **"Global School ID Office."** Instead of every individual website, app, or iPad needing to keep its own private list of 500 students and their passwords, they all just call the **ID Office** and ask, "Is this person actually who they say they are?".

Once the ID Office confirms it's them, the person is granted access to the building. This means students only have **one single "Master Password"** to remember for everything related to school.

---

## File: imei.md

---

term: "IMEI"

## category: ["Hardware"]

## Term Definition

The **International Mobile Equipment Identity (IMEI)** is a unique 15-digit serial number used to identify an individual mobile device on a cellular network.

Key features:

- **Hardcoded** : Unlike a phone number, the IMEI is permanently assigned to the hardware and cannot be easily changed or replaced.

- **Cellular Only** : Exists only on devices with cellular capabilities (iPhones and cellular-enabled iPads).
- **Security** : If a device is lost or stolen, the IMEI can be provided to carriers to **blocklist** the device, preventing it from ever connecting to a mobile network again, even if the SIM card is swapped.

## Analogy

This is the device's **"Engine Number"** or **"Social Security Number."** While the "Phone Number" can change (like a car's license plate), the **IMEI** is permanently engraved into the machine's "Digital DNA."

If a school iPad goes missing, knowing this number allows the school to tell all cellular companies to "block" this specific machine. Even if a thief tries to put their own SIM card into the iPad, the network will recognize the blocked IMEI and refuse to let the machine go online.

---

## File: install-application.md

---

term: "Install Application"

## category: ["Core"]

## Term Definition

**"Install Application"** is the fundamental MDM command sent to a device to initiate software deployment.

Operational flow:

1. **Command Issuance** : The MDM server sends a directive containing the app's unique identifier (App Store ID or Bundle ID).

2. **Device Reception** : The device acknowledges the command and checks its network status.

3. **Execution** : The device contacts the **App Store** (or a local VPP distribution point) to securely download and install the software.

4. **Acknowledgment** : Once complete, the device reports the successful installation status back to the MDM console.

## Analogy

This is like sending a **"Digital To-Do List"** to the device.

Instead of the teacher having to walk around and manually download an app on every single student's iPad, the teacher creates a master list of required tools and sends it out as a command.

Every iPad in the fleet receives the list and immediately goes to the **"Digital Library"** (the App Store) to pick up the specific tools it needs for the upcoming lesson.

---

## File: install-later.md

---

term: "Install Later"

## category: ["Core"]

## Term Definition

**"Install Later"** is a smart deployment strategy used for macOS and iOS system updates to minimize user disruption.

Workflow details:

- **Background Download** : The device downloads the large update files while the user continues their work, ensuring the "heavy lifting" is done without interruption.

- **Scheduling** : The actual installation—which requires a restart—is scheduled for a later time, typically when the device is inactive (e.g., late at night).
- **Flexibility** : The user can also choose to manually trigger the installation at a more convenient time once the files are ready.

This strategy ensures that critical security patches are delivered without suddenly "kicking a student off" their device during a class or exam.

## Analogy

Think of this as **"Scheduling a Home Renovation."** The school IT team **"delivers the building materials"** (downloads the update) while the student is busy using the iPad for class. However, the actually noisy and disruptive **"construction work"** (the installation and restart) doesn't start until the student is finished with their homework and has gone to sleep.

This way, the iPad is fully updated and ready to go the next morning without ever interrupting a single minute of learning.

---

## File: intel-mac-end-of-support-milestone.md

---

term: "Intel Mac End-of-Support Milestone"

## category: ["Mac"]

## Term Definition

The **Intel Mac End-of-Support Milestone** refers to the transition point where Apple’s modern operating systems no longer provide compatibility for older Macs powered by Intel processors.

Critical timelines:

- **Final Supported OS** : **macOS Tahoe (v26)** is the absolute final major release to support any Intel-based hardware.

- **Affected Hardware** : Includes the 2020 iMac and 2019 Mac Pro—the last Intel machines sold by Apple.
- **Management Impact** : Starting with the next major macOS release in 2027, many modern MDM commands and security features will require **Apple Silicon** (M-series) to function.

## Analogy

Think of this as the **"Final Stop for the Old Train."**

**macOS Tahoe** is the last version of the system that will work on older Macs with Intel chips. After this, any "New Trains" (future macOS versions) will only run on the newer, faster tracks (the Apple Silicon chips).

For a school's budget planning, this means that any Intel Macs still in classrooms are now in their "final years" and should be replaced soon so they don't become outdated, slow, and insecure.

---

## File: intelligent-hub.md

---

term: "Intelligent Hub"

## category: ["Apps"]

## Definition

Intelligent Hub is the user-facing application for VMware Workspace ONE. While this is a different platform than the Jamf ecosystem used at TES, the concept is identical to **Jamf Self Service** . It serves as a centralized "Productivity Portal" where students and staff can install approved school software, check their device compliance status, and receive important technical notifications from the IT department.

## Plain English

This is the "School Productivity App." Just as Jamf has "Self Service," this app acts as a private, school-only store. If you need a new app for a class, you don't go to the regular public App Store—you open this "Hub" and download the specific tools the school has provided for you.

---

## File: inventory-collection.md

---

term: "Inventory Collection"

## category: ["Jamf", "Core"]

## Definition

Inventory Collection is the core management process where Jamf Pro gathers detailed information from school devices, including hardware specs, installed apps, system settings, and battery health. While this typically happens automatically once a day, administrators can manually trigger an "Update Inventory" command to get an immediate snapshot of a device's current state. This data is the foundation for all school IT reports and **Smart Groups** .

## Plain English

Think of this as the "Daily School Census." Every day, each iPad sends a quick report back to the school headquarters saying, "I have this much battery left," "I am using this version of the system," and "I have these apps installed." It allows IT to make sure all school property is healthy and up-to-date without ever having to touch the physical device.

---

## File: inventory.md

---

term: "Inventory"

## category: ["Core"]

## Term Definition

In a device management context, **Inventory** refers to the comprehensive database containing the current state of every organizational hardware and software asset.

Key inventory data points:

- **Hardware details** : Serial number, model, processor type, and total RAM.

- **Software details** : Current OS version and a list of all installed applications.
- **Security status** : Encryption status (FileVault/Activation Lock), security patch level, and passcode compliance.
- **Network status** : Current IP address, MAC address, and last check-in time.
- **User assignment** : Which specific student or staff member is the primary user of the hardware.

This centralized record is essential for IT teams to perform security audits, plan for hardware refresh cycles, and provide fast technical support.

## Analogy

This is the school IT's **"Central Asset Registry"** or **"Master List."** Just as a school library keeps a detailed list of every book it owns, where it's shelved, and who has currently borrowed it, the IT inventory is a centralized record of every iPad and Mac in the school.

It tells IT exactly where each device is, how old it is, and whether it's "healthy" or needs a repair, making it much easier to ensure every student has the tools they need to succeed.

---

## File: ip-address.md

---

term: "IP Address"

## category: ["Network"]

## Term Definition

An **IP Address** (Internet Protocol Address) is a unique numerical label assigned to every device connected to a computer network.

It serves two primary functions:

- **Identification** : uniquely identifying a specific host or network interface.

- **Addressing** : Providing the location of the host in the network so data reaches the correct destination.

## Common Types:

- **Dynamic IP (DHCP)** : Automatically and temporarily assigned by a server; the address may change over time.
- **Static IP** : Manually and permanently assigned; the address remains constant.
- **Private IP** : Used within the school's internal network (e.g., `10.x.x.x` or `192.168.x.x`).
- **Public IP** : The address seen by the rest of the world on the internet.

## Analogy

Think of this as your device's **"Digital Street Address."** Just like a mail carrier needs a physical address to deliver a letter to your house, the internet needs an **IP address** to send data to your specific iPad.

Some addresses are owned forever ( **Static** ), while others are like a hotel room number ( **Dynamic** )—you use it while you're checked in, but it might be given to someone else after you "check out" and leave the network.

---

## File: ipaas.md

---

term: "iPaaS"

## category: ["Other"]

## Definition

iPaaS (Integration Platform as a Service) is a suite of cloud services that enables organizations to integrate disparate applications, data sources, and business processes. In an enterprise environment, MDM systems can leverage iPaaS to connect with other management systems (such as HR databases or ERP software) to automate workflows, like automatically creating a user account when a new staff member is hired.

## Plain English

Think of this as the "Universal Adapter" for the digital world. A large organization like a school uses many different types of software that don't always speak the same language. iPaaS acts as a "Middleman" that translates between them, allowing the IT system to automatically talk to the HR system without a human having to type the data twice.

---

## File: iphone-mirroring.md

---

term: "iPhone Mirroring"

## category: ["macOS", "Security"]

## Definition

iPhone Mirroring is a continuity feature introduced in macOS 15 that allows users to view and fully interact with their iPhone directly on their Mac screen. While highly productive, MDM administrators can disable this feature on shared school hardware to prevent personal data leakage or to ensure that users are not bypassing Mac-level security monitoring software by performing tasks within the mirrored iPhone window.

## Plain English

Think of this as a "Virtual Smartphone" inside your computer. You can use your phone apps and send texts right from your Mac screen. However, because this can show personal photos and messages on a school computer, or allow someone to work in a "hidden window" that the school's safety software can't see, IT may choose to turn this feature off on certain computers to keep everyone safe.

---

## File: jamf-aad.md

---

term: "JamfAAD"

## category: ["Jamf", "Security"]

## Definition

JamfAAD is a background process on macOS responsible for coordinating with Microsoft Entra ID (formerly Azure AD) for device registration and **Compliance** verification. When a user tries to access a protected school resource like Office 365 or Microsoft Teams, JamfAAD provides proof to Microsoft that the Mac is managed and meets all required school security standards before allowing the user to sign in.

## Plain English

Think of this as a "Digital Diplomat" who speaks to Microsoft. When you try to open Word or Teams, the "Microsoft Security Guard" might block you. JamfAAD steps in and shows the guard an official letter that says, "Don't worry, this computer is safe and belongs to the school." Once the guard sees the letter, they let you in to do your work.

---

## File: jamf-binary.md

---

term: "Jamf Binary"

## category: ["Jamf", "macOS"]

## Term Definition

The **Jamf Binary** (frequently referred to as the `Jamf` command-line tool) is the management agent that powers advanced control on macOS.

Operational roles:

- **Local Engine** : It is the "brain" on the Mac that executes instructions sent from the Jamf Pro server.

- **Policies** : Unlike standard MDM profiles, the binary allows for complex "Policies" that can run scripts, install specialized software packages, and perform system maintenance.
- **Check-ins** : The binary periodically "checks in" with the server to see if there are any new tasks to perform.

**Note** : While iPads use Apple’s built-in MDM framework alone, Macs use a combination of standard MDM and the Jamf Binary to provide deeper management capabilities.

## Analogy

Think of this as the **"On-Site Manager"** living inside your Mac.

While the main school office (the MDM server) gives the big-picture orders, the **On-Site Manager** is the person who actually does the heavy physical work—like unpacking and installing your apps, fixing your system settings, and making sure the computer is following all the school’s safety rules.

Without this silent helper working in the background, the school wouldn't be able to fix your Mac's problems from their office.

---

## File: jamf-connect.md

---

term: "Jamf Connect"

## category: ["Jamf", "Security", "macOS"]

## Term Definition

**Jamf Connect** is a security and identity solution designed to synchronize local Mac accounts with cloud-based identity providers.

Key benefits:

- **Unified Login** : Allows users to log in to their Mac using their institutional cloud credentials (e.g., Google Workspace or Microsoft Entra ID).

- **Password Sync** : Ensures that if a user changes their school password online, their Mac login password is automatically updated to match.
- **MFA Enforcement** : Enables Multi-Factor Authentication during the initial setup of a new Mac, significantly improving security.
- **Zero-Touch** : Facilitates the creation of a local user account on-the-fly during the first login.

## Analogy

This is the **"Cloud ID Portal"** for your Mac.

Instead of having a separate, confusing password just for your laptop, **Jamf Connect** lets you log in using your regular school email and password.

It's like having a **"Single Master Key"** —if you change your school password in your browser, your Mac password automatically updates to match, so you only ever have to remember one single set of login details for everything you do at school.

---

## File: jamf-data-policy.md

---

term: "Jamf Data Policy"

## category: ["Jamf", "Security"]

## Definition

Jamf Data Policy is a Data Loss Prevention (DLP) capability within the Jamf ecosystem. It allows administrators to set specific rules to prevent sensitive institutional data from being leaked via methods like AirDrop, screenshots, or copy-pasting into unauthorized apps. All violations are logged and can be audited by the IT department to ensure compliance with school data security policies.

## Plain English

Think of this as a "Digital Safety Net." It prevents sensitive school information (like exam papers or student records) from being shared where it shouldn't be. If someone tries to take a screenshot of a secret document or AirDrop it to a personal device, this "Safety Net" catches it and stops it, making sure school secrets stay safe.

---

## File: jamf-helper.md

---

term: "jamfHelper"

## category: ["macOS", "Jamf"]

## Definition

jamfHelper is a built-in messaging utility for macOS management. IT administrators use it via scripts to display custom dialog boxes, notification windows, or progress bars to the user. It is the primary tool for informing users about required software updates, gathering simple user input, or providing visual feedback during the execution of a management policy.

## Plain English

Think of this as the "Digital Bulletin Board." It’s the tool the IT team uses to put a message on your screen when something important is happening—like when your computer needs to restart for an update. It’s a simple way for the tech team to talk to you through your computer screen so you always know what’s going on.

---

## File: jamf-now.md

---

term: "Jamf Now"

## category: ["Jamf"]

## Definition

Jamf Now is a streamlined, cloud-based MDM solution designed for small organizations or individual departments. It offers a simplified interface for essential tasks like device enrollment, app distribution, and security setting enforcement. While it lacks the advanced scripting and complex automation features of **Jamf Pro** , it is highly user-friendly and ideal for smaller schools or businesses with basic management needs.

## Plain English

Think of this as the "Essentials Version" of the management software. While Jamf Pro is like a professional "Swiss Army Knife" with hundreds of tools, Jamf Now is more like a simple, reliable pocketknife. It has just the right tools for smaller schools to get the job done quickly and easily without needing a team of expert engineers.

---

## File: jamf-private-access.md

---

term: "Jamf Private Access"

## category: ["Jamf", "Security", "Network"]

## Definition

Jamf Private Access (managed through the **Jamf Trust** app) is a Zero Trust Network Access (ZTNA) solution. It ensures that only authorized, secure, and compliant devices can access private school resources. Unlike a traditional VPN that gives a user full access to a network, Private Access creates a "Micro-tunnel" only for the specific apps required, while also checking the "health" of the device before allowing a connection.

## Plain English

Think of this as a "Smart Security Gate" for school files. Instead of just checking your ID card at the entrance, this system also checks if you have a fever (if your device has a virus) and if you are wearing the right uniform (if your device follows school security rules). Only if you and your device pass all the checks will the gate open—and even then, it only lets you go to the specific "room" (the app) you need, not the whole building.

---

## File: jamf-pro-api.md

---

term: "Jamf Pro API"

## category: ["Jamf", "Other"]

## Definition

The Jamf Pro API (specifically the Pro API v2) is a developer interface that allows IT administrators to automate management tasks via code. Instead of manually clicking through the web interface, administrators can use scripts to perform bulk operations—such as creating hundreds of policies at once, importing large lists of devices, or generating custom reports. It enables a high level of efficiency and integration with other school systems.

## Plain English

Think of this as the "Remote Control" for the school's management system. Instead of an IT person having to manually click a button 500 times to set up 500 iPads, they can use the "Remote Control" (the API) to do it all with a single command. It saves a massive amount of time and ensures that everything is set up perfectly without any human errors.

---

## File: jamf-pro.md

---

term: "Jamf Pro"

## category: ["Core", "Jamf"]

## Term Definition

**Jamf Pro** is an enterprise-grade Apple device management (MDM) solution, considered the flagship of the Jamf ecosystem.

Distinguishing features:

- **Scalability** : Designed to manage tens of thousands of devices across global organizations.

- **Power** : Offers deep customization through custom scripts, extension attributes, and complex policy engines.
- **Automation** : Features robust "Smart Group" logic that can trigger actions automatically as device conditions change.
- **Ecosystem** : Integrates extensively with third-party tools via a powerful REST API.

Jamf Pro is the preferred choice for schools and businesses that require the highest level of administrative control and automation for their Apple fleet.

## Analogy

Think of this as the **"Professional DSLR Camera"** of device management.

It has hundreds of specialized buttons, menus, and settings that can be customized to do almost anything you can imagine. While it takes an expert (the school's IT team) to learn and operate it correctly, it is the most powerful tool available to ensure that every iPad and Mac in the school is set up perfectly for a safe and productive learning experience.

---

## File: jamf-protect.md

---

term: "Jamf Protect"

## category: ["Jamf", "Security", "macOS"]

## Definition

Jamf Protect is a specialized endpoint security solution built specifically for the Mac. It uses Apple's native **Endpoint Security Framework** to monitor for malicious behavior, provide real-time threat detection, and automate responses to malware. Because it is built "for Mac, by Jamf," it does not slow down system performance the way traditional cross-platform antivirus software often does, while providing superior visibility into macOS-specific threats.

## Plain English

Think of this as a "Professional Bodyguard" that only protects Macs. Most antivirus programs are like heavy, clunky suits of armor that slow the computer down. Jamf Protect is different—it's like a highly trained bodyguard who is invisible and doesn't slow you down, but is always watching for "bad people" (malware) trying to break into your computer. If it sees something suspicious, it acts instantly to keep you safe.

---

## File: jamf-remote.md

---

term: "Jamf Remote Assist"

## category: ["Jamf", "macOS"]

## Definition

Jamf Remote Assist is a built-in remote desktop tool within Jamf Pro. It allows IT administrators to securely connect to a user’s Mac directly through a web browser to perform screen sharing, terminal commands, and file transfers for troubleshooting. It supports both "Attended" mode (where the user must grant permission) and "Unattended" mode for remote maintenance, eliminating the need for third-party remote control software.

## Plain English

Think of this as a "Digital Window" for the IT team. If you're having trouble with your Mac, the IT person can look through this digital window (with your permission) to see your screen and help you fix the problem from their office. It’s like having a tech expert sitting right next to you, even if they are in another building or another city.

---

## File: jamf-safe-internet.md

---

term: "Jamf Safe Internet"

## category: ["Jamf", "Security", "Network"]

## Term Definition

**Jamf Safe Internet** is a comprehensive network security and content filtering service designed specifically for educational institutions.

Protective features:

- **Filtering** : Blocks access to inappropriate or dangerous categories of websites (e.g., adult content, gambling, or piracy).

- **Phishing Defense** : Identifies and blocks malicious links designed to steal school login credentials.
- **Reporting** : Provides administrators with insights into web usage trends and security threats.
- **Deployment** : Integrated directly into Jamf Pro or Jamf School for easy "no-touch" rollout to student devices.

Because it operates at the DNS level, it protects students whether they are using the school Wi-Fi or their home network.

## Analogy

Think of this as your **"Digital Bodyguard."** Before you load any website, the bodyguard quickly checks the "address" to make sure it isn't a scam or a dangerous hidden site. If it's a **"bad neighborhood"** on the internet, the bodyguard steps in and blocks the site immediately.

It works everywhere—protecting you and the school's private data from hackers and harmful content whether you're in the classroom or at the park.

---

## File: jamf-school.md

---

term: "Jamf School"

## category: ["Jamf", "Education"]

## Term Definition

**Jamf School** is a specialized MDM solution tailored explicitly for the K-12 educational landscape.

Focus areas:

- **Ease of Use** : A simplified interface designed to be managed by educators or dedicated IT staff with less engineering experience than Jamf Pro requires.

- **Teacher Tools** : Includes the **Jamf Teacher** app, which gives classroom teachers direct, simple control over student iPads during their lessons.
- **Integration** : Deeply synchronized with **Apple School Manager (ASM)** for easy roster and class management.
- **Parental Control** : Includes a parent-facing app to extend management logic to the home environment.

## Analogy

Think of this as the **"Education Edition"** of the management software.

While the "Professional" version (Jamf Pro) is built for systems engineers managing thousands of computers, **Jamf School** is built for teachers and school staff.

It makes it easy for a teacher to manage a classroom of 30 iPads without needing a degree in computer science, while still giving the school all the security and control it needs to keep students safe.

---

## File: jamf-student.md

---

term: "Jamf Student"

## category: ["Jamf", "Education"]

## Term Definition

**Jamf Student** is a dedicated companion application for student iPads that facilitates a managed learning environment.

Key functions:

- **Lesson Participation** : Allows students to receive websites, documents, and app links pushed directly from the **Jamf Teacher** app.

- **Communication** : Provides a secure portal for students to ask for help or submit specific classroom assignments.
- **Restrictions** : It is the endpoint that receives and executes "focused learning" commands, such as locking the iPad into a single required app for a test.

## Analogy

Think of this as the **"Learner's Digital Portal"** on the iPad.

It's the app that "listens" for the teacher's instructions. When a teacher wants everyone to look at the same specific webpage, they send the link, and the **Jamf Student** app automatically "catches" it and opens it for the student.

It helps keep every student in the room synchronized during a lesson so nobody falls behind or gets distracted.

---

## File: jamf-teacher.md

---

term: "Jamf Teacher"

## category: ["Jamf", "Education"]

## Term Definition

**Jamf Teacher** is a classroom management application that empowers educators to manage student technology directly and instantly.

Core capabilities:

- **App Lock** : Force a class of iPads into a single specific app (e.g., a calculator or a quiz app).

- **Web Restrictions** : Create a "Safe List" of websites that students are allowed to visit during a specific lesson.
- **Content Pushing** : Instantly send links, documents, or apps to every student at once.
- **Attention Request** : Send notifications to student screens to get their attention during a transition.

Teachers can manage their own specific classes based on synchronized rosters from **Apple School Manager** .

## Analogy

Think of this as the **"Digital Pointer"** or **"Classroom Remote Control"** for the modern teacher.

Instead of a teacher having to walk around the room to see what every student is doing on their screen, they can use this app on their own iPad to keep everyone focused. With one single button, the teacher can make sure all 30 students are looking at the exact same textbook page at the same time, preventing anyone from getting lost or distracted by games.

---

## File: json.md

---

term: "JSON (JavaScript Object Notation)"

## category: ["Other"]

## Definition

JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. In MDM, JSON is frequently used to write advanced configuration schemas or to transmit data between systems via APIs. Its structure is based on "Key-Value pairs."

## Plain English

Think of this as a "Digital Standard Form." It’s a very organized way for computer systems to send information to each other. For example, instead of a messy paragraph, a system sends: `{ "Name": "Student A", "Grade": 5 }`. Because the format is always the same, the receiving computer knows exactly where to find each piece of information without making mistakes.

---

## File: kernel-extension.md

---

term: "Kernel Extension (Kext)"

## category: ["Core"]

## Term Definition

A **Kernel Extension (Kext)** is a specialized bundle of code that extends the native functionality of the macOS kernel.

Key characteristics:

- **Deep Access** : Operates at the "Ring 0" level, the absolute core of the operating system.

- **Risk Profile** : Because Kexts run with the highest possible privileges, a bug in a Kext can cause a complete system crash (Kernel Panic), and a vulnerability can compromise the entire machine.
- **Modern Status** : Apple is actively deprecating Kexts. Modern macOS versions require **System Extensions** (which run in user space) instead. Installing a legacy Kext now requires booting into Recovery Mode and manually downgrading system security settings.

## Analogy

Think of this as **"Open-Heart Surgery"** for your computer's operating system.

It's a way to add new features by changing the most vital, core part of the body (the Kernel). While this makes the computer very powerful, it's also very risky—one slip could stop the heart completely.

This is why Apple now prefers **"Minimally Invasive Surgery"** (System Extensions) instead, which is much safer and easier to recover from if something goes wrong.

---

## File: keychain.md

---

term: "Keychain"

## category: ["Security"]

## Term Definition

The **Keychain** is Apple’s integrated password management system included in macOS, iOS, and iPadOS.

Stored items include:

- **Credentials** : Usernames and passwords for websites, servers, and apps.

- **Certificates** : Digital identities used for Wi-Fi (802.1X) and VPN authentication.
- **Encryption** : Private keys used for secure communication.
- **Secure Notes** : Confidential information entered by the user.

Once a user logs in to their device, the Keychain automatically unlocks, providing seamless authentication across the system without requiring constant re-entry of passwords.

## Analogy

Think of this as the system's **"Universal Key Ring"** or **"Secure Lockbox."** You don't have to carry around dozens of individual keys (your passwords) in your pocket; you just keep them all in this secure, encrypted box (the Keychain).

Once you unlock the box with your fingerprint or startup password, the system automatically reaches in and grabs whichever specific key you need to unlock a website or the school Wi-Fi, so you don't even have to think about it.

---

## File: laps.md

---

term: "LAPS (Local Administrator Password Solution)"

## category: ["Security"]

## Term Definition

**Local Administrator Password Solution (LAPS)** is a security framework designed to manage and rotate local admin credentials on fleet devices.

Security mechanism:

- **Uniqueness** : Ensures every single managed computer has a different, unique local administrator password.

- **Rotation** : Automatically changes the password after a set period (e.g., every 30 days) or after it has been viewed by IT.
- **Escrow** : The current password is typically stored securely in the MDM or directory service for authorized retrieval.
- **Defense** : Prevents **"Lateral Movement"** attacks where compromising one computer's password would otherwise grant access to every computer in the organization.

## Analogy

Think of this as an **"Automatic Lock-Changing System."** In the past, every classroom door in a school might have used the same "Master Key." If a thief stole that key, they could enter every room.

With **LAPS** , every single door has a different, unique code that changes every few days. Even if someone steals a code today, it won't work on the next door, and it won't even work on the _same_ door tomorrow.

---

## File: ldap.md

---

term: "LDAP"

## category: ["Apple"]

## Term Definition

**Lightweight Directory Access Protocol (LDAP)** is an open, vendor-neutral standard for accessing and maintaining distributed directory information services.

Common uses in MDM:

- **User Lookup** : Connecting the MDM to **Active Directory** or **OpenLDAP** to search for users.

- **Group Sync** : Importing student and teacher groups (e.g., "Grade 5 Staff") directly into the MDM for scoping policies.
- **Authentication** : Verifying a username and password against the central database during enrollment.

## Analogy

This is the **"Common Language"** used to check the school's central phonebook.

Just as two people from different countries might use English to communicate, different computer systems (like your MDM and your Email Server) use **LDAP** to "ask" the central database for information.

It allows the MDM to ask questions like: "Who is in Grade 5?" or "Is this password correct for Mr. Smith?".

---

## File: lightning-connector.md

---

term: "Lightning Connector"

## category: ["Hardware"]

## Term Definition

The **Lightning Connector** is Apple's proprietary 8-pin physical data and power interface.

Hardware context:

- **Usage** : Standard port for iPhone 5 through iPhone 14, and entry-level iPads up until the 9th Generation.

- **Comparison** : Supports USB 2.0 speeds (slower than modern USB-C).
- **Phased Out** : While modern devices now use **USB-C** to comply with international regulations, Lightning is still prevalent in education due to the long lifespan of iPad fleets.
- **Design** : Reversible design, allowing the cable to be plugged in face up or face down.

## Analogy

This is the **"Classic"** Apple charging port.

Unlike the new, oval-shaped **USB-C** ports that you see on the latest iPads and laptops, the Lightning cable is the smaller, flat connector that only works with older Apple devices.

While it's getting phased out like old DVD players, school "iPad carts" often still have hundreds of these cables to keep the older student tablets charged and ready for class.

---

## File: liquid-glass.md

---

term: "Liquid Glass"

## category: ["Core"]

## Term Definition

**Liquid Glass** is the advanced visual design language introduced by Apple in **OS version 26** , drawing heavy inspiration from the spatial computing interface of visionOS.

Visual characteristics:

- **Materiality** : Features increased transparency, dynamic light reflections, and real-time blurring logic.

- **Depth** : Creates a fluid sense of depth where interface elements (like windows or dock icons) feel like they are floating on different layers of glass.
- **Adaptability** : The interface reacts subtly to environmental lighting conditions captured by the device's sensors.

**MDM Context** : Administrators should note that users can adjust the "opacity" of this effect in settings. Onboarding materials should clarify that this transparency is a stylistic choice, not a display hardware defect.

## Analogy

Imagine your iPad screen as a sheet of **"Living Glass."** When you move the device or change the lighting in the room, the icons and windows subtly catch the light and reflect it, just like real glass objects would. It makes the interface feel lighter, more breathable, and more "alive" than the flat, painted-on buttons of the past.

---

## File: local-account.md

---

term: "Local Account"

## category: ["Core"]

## Term Definition

A **Local Account** is a user profile that resides strictly on the individual computer's hard drive.

Key differences from Network Accounts:

- **Authentication** : Usage is verified against a local database on the machine, not a central server.

- **Scope** : Credentials work **only** on that specific Mac; they cannot be used to log in to other computers.
- **Use Case** : Typically reserved for the primary "Administrator" account used by IT for maintenance, or for specialized stations (like a theater lighting controller) that do not require network connectivity.

## Analogy

Think of this as a **"Room-Specific Key."** This key (the account) only opens one specific door (one computer). If you try to use it on any other computer in the building, it won't work.

It’s different from a school **"ID Badge"** (Network Account) which scans you into any classroom, library, or lab computer across the entire campus.

---

## File: location-services.md

---

term: "Location Services"

## category: ["Apple", "Core"]

## Term Definition

**Location Services** is the framework that allows Apple devices to determine their geographical position.

Inputs used for positioning:

- **GPS/GLONASS** : Satellite signals (most accurate outdoors).

- **Wi-Fi** : Triangulation based on known Wi-Fi hotspot locations.
- **Cellular** : Proximity to cell towers.
- **iBeacons** : Micro-location awareness indoors.

**MDM Policy** : For school-owned devices, administrators often force Location Services to be **"On"** to ensure that **Lost Mode** functions correctly if a device goes missing.

## Analogy

Think of this as your device's **"Digital Map and Radar."** When it's on, your iPad always knows exactly where it is in the world. For the school, this is like having a **"Safety Tracker."** If you lose your iPad in a park or forget it in a classroom, the IT team can look at a map to see exactly where it is so they can go pick it up and return it to you.

---

## File: lost-mode.md

---

term: "Lost Mode"

## category: ["Security"]

## Term Definition

**Lost Mode** is a powerful recovery protocol available for supervised iOS and iPadOS devices.

When activated by IT:

- **Lock Down** : The device is immediately locked and cannot be unlocked by the user.

- **Messaging** : A custom message (e.g., "Property of School - Call 555-0199") is displayed on the Lock Screen.
- **Tracking** : The device begins reporting its GPS coordinates to the MDM server, even if Location Services were previously disabled.
- **Privacy** : Personal data remains encrypted and inaccessible during the lock state.

## Analogy

Think of this as a **"Remote Digital Handcuff."** If a student leaves their iPad on a bus, IT can press a button to instantly freeze it. The screen will display a "Return to..." message, and the iPad will start shouting its location to the school's map.

It renders the device completely useless to a thief while helping the school get it back safely.

---

## File: mac-address.md

---

term: "MAC Address"

## category: ["Network"]

## Term Definition

A **MAC Address** (Media Access Control Address) is the unique hardware identifier assigned to a network interface (Wi-Fi or Ethernet card).

Privacy developments:

- **Hardware MAC** : The permanent, physical ID burned into the chip.

- **Private Wi-Fi Address** : A feature where the device generates a **randomized** MAC address for each Wi-Fi network it joins. This prevents tracking across different locations (e.g., a coffee shop cannot see that the same device visited yesterday).

**MDM Impact** : Schools often need to disable "Private Wi-Fi Address" on their internal networks so they can reliably identify and filter specific devices.

## Analogy

Think of this as the **"Fingerprint"** of your device's Wi-Fi card.

Technically, every device has a unique fingerprint. However, to stop strangers from tracking your movements as you visit different shops, your device now wears **"Digital Gloves"** (Private Wi-Fi Address).

Every time you enter a new building, you put on a different pair of gloves, so the network sees a different print and can't trace it back to the real you.

---

## File: managed-app-framework.md

---

term: "Managed App Framework"

## category: ["DDM"]

## Term Definition

The **Managed App Framework** (announced at WWDC 2025) is the modern successor to the legacy "Managed App Configuration" standard.

Capabilities:

- **Dynamic Updates** : Allows apps to receive configuration changes (settings, server URLs) in real-time without needing a restart.

- **Secure Channel** : Establishes a direct, encrypted pipeline between the MDM and the app for delivering sensitive items like identity certificates.
- **Pull Model** : Apps can proactively request updated settings from the system, rather than waiting passively for a push.

## Analogy

In the past, giving an app its settings was like **"Leaving a note in a mailbox"** —the app could only read the note when it first opened.

The new **Managed App Framework** is more like **"Instant Messaging."** The app can talk to the school system _while_ you are using it to get the latest security updates or server changes instantly. It’s faster, safer, and means your apps are always set up perfectly without you having to restart them.

---

## File: managed-apple-account.md

---

term: "Managed Apple Account"

## category: ["Apple"]

## Term Definition

A **Managed Apple Account** (formerly known as Managed Apple ID) is a professional identity owned and governed by the organization, not the individual.

Key differences from personal IDs:

- **Ownership** : Created and managed in bulk through **Apple School Manager (ASM)** or Apple Business Manager.

- **Services** : Provides access to core collaboration tools like iCloud Drive, Notes, and Schoolwork/Classroom.
- **Restrictions** : Users cannot make private App Store purchases, and features like "Find My" are disabled (organizations use MDM Lost Mode instead).
- **Federation** : Can be linked to Microsoft Azure or Google Workspace so students use their existing school email password to sign in.

## Analogy

Think of this as your **"Official School ID Card"** for the digital world.

Just like your school email address belongs to the school, this specific Apple account belongs to the school too. It is strictly for school work, storing your class files, and using school apps.

Because the school owns it, they can help you if you forget your password, but you shouldn't use it for your personal TikTok or for buying personal games.

---

## File: managed-classes.md

---

term: "Managed Classes"

## category: ["Education", "Jamf"]

## Term Definition

**Managed Classes** are pedagogical groupings defined within the MDM or synchronized from Apple School Manager.

Data structure includes:

- **Roster** : A list of student Managed Apple IDs and their assigned devices.

- **Instructors** : The teacher(s) authorized to manage these specific students.
- **Schedule** : Timeframes when the class is active (optional).
- **Automation** : This data automatically populates the **Apple Classroom** app, allowing teachers to view screens and launch apps for their students without manual setup.

## Analogy

Think of this as your **"Digital Class Register."** When a teacher walks into a room and opens the Apple Classroom app, the system has already organized everything: the names of the 30 students for that specific period and their iPad connection details are all loaded and ready to go.

The teacher operates the "dashboard" to instantly have the whole class open a textbook or check if anyone is playing a game, without having to manually type in serial numbers or names.

---

## File: managed-device-attestation.md

---

term: "Managed Device Attestation"

## category: ["Security"]

## Term Definition

**Managed Device Attestation** is a high-security feature that cryptographically verifies the identity and integrity of a device.

How it works:

- **Secure Enclave** : The device uses its built-in hardware security chip to generate a cryptographic key.

- **Apple Server** : This key is sent to Apple's attestation servers to verify that the device is a genuine Apple product (not a hackintosh or simulator) and has not been compromised.
- **Outcome** : The device receives a "certificate of authenticity" that it presents to the MDM or Wi-Fi network to gain access.

## Analogy

Think of this as **"Digital Biometric Verification"** for the device itself.

In the past, the system just asked for an "ID Card" (the serial number), which could be forged. Now, the system asks for a **"Fingerprint"** or **"DNA Scan"** of the machine's actual hardware.

It proves beyond a doubt that the device is a real, physical iPad following the rules, and not an impostor or a fake computer program pretending to be a school device.

---

## File: managed-open-in.md

---

term: "Managed Open In"

## category: ["Security"]

## Term Definition

**Managed Open In** is a foundational Data Loss Prevention (DLP) for iOS and iPadOS.

Functionality:

- **Separation** : It creates a virtual wall between "Managed Apps" (installed by the school) and "Unmanaged Apps" (installed by the user).

- **Restriction** : Administrators can prevent school documents (e.g., from Managed Mail) from being opened in personal apps (e.g., WhatsApp or personal Dropbox).
- **Flow Control** : Conversely, it can also prevent personal data from entering corporate apps to maintain a sterile work environment.

## Analogy

This is the school's **"Data Boundary Rule."** It's like saying, "You can use these confidential school documents on the school’s official desks ( **Managed Apps** ), but you are strictly forbidden from taking those documents over to the coffee shop across the street ( **Personal Apps** )."

It ensures that sensitive school secrets and student grades stay safely inside the school's "fenced" digital garden.

---

## File: mdm-profile.md

---

term: "MDM Profile"

## category: ["Core"]

## Term Definition

The **MDM Profile** (Mobile Device Management Profile) is the critical configuration file that establishes trust between a device and the management server.

Its lifecycle:

- **Installation** : Marks the official "Enrollment" of the device. Grants the MDM server permission to send commands.

- **Operation** : Acts as the conduit for all subsequent settings (Wi-Fi, apps, restrictions).
- **Removal** : If this single profile is removed, the trust relationship is broken. All managed settings, managed apps, and secure certificates are immediately wiped from the device.

## Analogy

Think of this as the device's **"Employment Contract."** By installing this profile, the device agrees to follow the school's rules in exchange for getting access to school resources (like an ID card, office keys, and a desk).

If you **"tear up the contract"** (remove the profile), you are no longer an employee. You have to immediately give back your ID card and keys—meaning all your school apps and Wi-Fi access disappear instantly.

---

## File: mdm.md

---

term: "MDM (Mobile Device Management)"

## category: ["Core"]

## Term Definition

**Mobile Device Management (MDM)** is the standard framework for managing Apple hardware in an organization.

Core capabilities:

- **Configuration** : Pushing settings for Wi-Fi, Email, and VPN.

- **Security** : Enforcing passcodes, encryption, and restricting features like the camera.
- **Deployment** : Installing and updating apps and books remotely.
- **Inventory** : Reporting on device status, OS version, and installed software.

MDM relies on the Apple Push Notification service (APNs) to maintain constant contact with devices.

## Analogy

Think of MDM as a **"Remote Control for the School District."** Instead of an IT person having to physically touch and configure every single student's iPad one by one, they have a centralized dashboard.

If a new library app is needed or a security update is released, the school can **"broadcast"** these changes to hundreds of devices at once, ensuring every student has the exact same set of tools ready for class.

---

## File: mdns.md

---

term: "mDNS (Multicast DNS)"

## category: ["Network"]

## Term Definition

**Multicast DNS (mDNS)** is the underlying "zero-configuration" network protocol that powers Apple’s **Bonjour** service.

How it works:

- **Discovery** : Devices use UDP port 5353 to broadcast their availability on the local network.

- **Resolution** : It allows devices to translate local hostnames (like `My-iPad.local`) into IP addresses without a central DNS server.
- **Challenge** : By default, mDNS signals do not cross between different network subnets (VLANs). In large schools, IT creates an **"mDNS Gateway"** or **"Bonjour Reflector"** to allow AirPlay and AirPrint to work across the entire campus.

## Analogy

Think of this as a **"Local PA System"** for computers.

Devices use this to shout, "I'm a printer in Hallway A!" or "I'm an AirPlay screen in Room 302!" to anyone nearby who is listening.

Because it's a "local shout," the signal usually can't be heard in other buildings or floors unless the school's **"Sound Engineers"** (the network team) set up a special relay system to broadcast the message further.

---

## File: n-1-strategy.md

---

term: "N-1 Strategy"

## category: ["Core"]

## Term Definition

An **N-1 Strategy** is a standard IT policy for defining software support lifecycles.

The formula:

- **N** : The current, latest major version of the operating system (e.g., iOS 18).

- **N-1** : The immediately preceding major version (e.g., iOS 17).

**Policy** : IT commits to fully supporting only these two versions. Devices running older software ( **N-2** , e.g., iOS 16) are considered "End of Life" for support purposes. They may still work, but IT will not troubleshoot issues or guarantee that new apps will function on them.

## Analogy

Think of this as the **"Manufacturer's Warranty"** for software.

Just as a car company might keep spare parts for the newest model and the previous one, software companies (and school IT) focus their energy on the current version and the one just before it.

If your iPad is running a system that is 3 or 4 years old, it’s like driving a vintage car—parts are hard to find, and the mechanic might not be able to fix it anymore.

---

## File: network-extension-url-filtering-api.md

---

term: "Network Extension URL Filtering API"

## category: ["Network"]

## Term Definition

The **Network Extension URL Filtering API** is a modern, privacy-preserving framework in iOS and macOS for content filtering.

Key advantages over legacy VPNs:

- **Performance** : Filtering happens directly on the device's network stack, eliminating the bottleneck of routing traffic through a tunnel.

- **Privacy** : The API evaluates web requests (URLs) without needing to decrypt the actual data packets (SSL Inspection), maintaining user privacy.
- **Selective Blocking** : Used by tools like **Jamf Safe Internet** to instantly block specific categories (e.g., Gambling) while allowing everything else to flow freely.

## Analogy

Previously, school web filtering was like a **"Security Checkpoint"** where every single car (piece of data) had to stop and be searched, which made traffic very slow.

This new technology is like a **"Smart GPS"** built inside every car.

The car itself knows which "roads" (websites) are dangerous and simply **refuses to turn down those streets** . This makes the internet faster and saves battery because the car just drives normally without waiting in line at a checkpoint.

---

## File: nist-benchmarks.md

---

term: "NIST Benchmarks"

## category: ["Security", "Education"]

## Term Definition

The **NIST (National Institute of Standards and Technology) Benchmarks** are a globally recognized set of cybersecurity best practices.

Educational adoption:

- **Baseline** : Many government education departments adopt these standards as the minimum requirement for school-owned devices.

- **Requirements** : Typically mandate a 6-digit complex passcode, automatic OS updates, 15-minute auto-lock timers, and full-disk encryption.
- **Compliance** : MDM systems use these benchmarks to "audit" device fleets and flag any iPad that is not secure enough.

## Analogy

Think of this as the **"Digital Safety Inspection Certificate."** Just as a school building has to pass a fire safety inspection (checking for fire extinguishers and clear exits), every iPad must pass this **"Digital Inspection"** to prove it is safe enough for students to use.

It ensures that the tablet has strong locks, stays up-to-date, and keeps your private work safe from hackers, just like a building code keeps you safe from fires.

---

## File: notarization.md

---

term: "Notarization"

## category: ["Security"]

## Term Definition

**Notarization** is an automated security screening system provided by Apple for macOS software distributed outside the App Store.

The process:

1. **Submission** : A developer sends their app to Apple's notarization service.

2. **Scan** : Apple scans the code for known malware and security issues (but does not review the content).

3. **Ticket** : If clean, Apple issues a digital "ticket" (stapled to the app).

4. **Execution** : When a user opens the app, macOS **Gatekeeper** checks for this ticket. If present, the app is allowed to run. If missing, it is blocked.

## Analogy

Think of this as a **"Certificate of Good Health"** for software.

Just as food is inspected for safety before it reaches the supermarket shelf, Apple inspects software for "viruses" and "bugs."

If it passes the inspection, it gets a **"Safety Seal"** (the notarization). When you try to open the app, your Mac checks for that seal to make sure it’s safe for you to eat (use).

---

## File: oidc.md

---

term: "OIDC (OpenID Connect)"

## category: ["Security"]

## Term Definition

**OpenID Connect (OIDC)** is a modern identity authentication protocol built on top of the OAuth 2.0 framework.

Key features:

- **Standard** : Used by major providers like Google, Microsoft, and Okta.

- **Workflow** : It allows a client (like an iPad or Jamf Connect) to verify the identity of a user based on authentication performed by an authorization server.
- **Tokens** : Instead of sending actual passwords back and forth, it uses secure "ID Tokens," reducing the risk of password theft.
- **MFA** : Natively supports Multi-Factor Authentication workflows.

## Analogy

Think of this as the **"Global Digital Passport"** for the internet.

Instead of having to create a new name and password for every single school website or app, OIDC is the technology that lets you use your one **"Official ID"** (your Google or Microsoft account).

Once you show your ID once, you get a **"Visitor's Badge"** (a Token) that lets you walk into all the school's other "Digital Rooms" without having to stop and show your ID card again at every single door.

---

## File: ota.md

---

term: "OTA (Over-The-Air)"

## category: ["Core"]

## Term Definition

**Over-the-Air (OTA)** refers to the wireless transmission method used to distribute software updates, settings, and commands to devices.

Operational benefits:

- **No Cables** : Eliminates the need to physically connect devices to a computer (like Apple Configurator) via USB.

- **Remote Management** : Allows IT to manage devices that are off-campus, such as iPads being used for homework at a student's house.
- **Efficiency** : Enables simultaneous updates to thousands of devices across a network without manual intervention.

## Analogy

This is **"Wireless Magic."** In the old days, if you wanted to update a phone or install a program, you had to plug it into a computer with a cable and wait.

Now, the "updates" just **fly through the air** and land on your device automatically. As long as you have Wi-Fi, the school's IT team can fix problems or give you new apps without ever having to touch your iPad.

---

## File: package.md

---

term: "Package (.pkg)"

## category: ["macOS"]

## Term Definition

A **Package (.pkg)** is the standard flat-file installation format for macOS software deployment.

Components:

- **Payload** : The actual files (apps, fonts, scripts) to be installed.

- **Scripts** : "Pre-install" and "Post-install" scripts that run commands to set up the environment (e.g., activate a license key).
- **Receipts** : A record left on the Mac so the system knows what was installed.

**MDM Usage** : Admins wrap complex software (like Microsoft Office or Adobe Creative Cloud) into PKG files to deploy them silently to thousands of Macs at once.

## Analogy

Think of this as a **"Digital IKEA Box."** It doesn't just contain the furniture (the software); it also includes the tools and an **"Instruction Manual"** (scripts) for the computer.

When the school sends this box to a Mac, the Mac opens it, reads the manual, and puts every piece in exactly the right place automatically—building the furniture while the student is busy doing something else.

---

## File: passcode-policy.md

---

term: "Passcode Policy"

## category: ["Security", "Core"]

## Term Definition

A **Passcode Policy** is an MDM payload that defines the mandatory password requirements for a managed device.

Configurable rules:

- **Complexity** : Determine if the code can be simple logic (4 digits) or must be complex (alphanumeric).

- **History** : Prevent users from reusing old passwords (e.g., "Cannot use previous 5 passwords").
- **Age** : Force users to change their password every X days (e.g., 90 days).
- **Attempts** : Set the maximum number of failed attempts before the device is automatically wiped (e.g., 10 attempts).

## Analogy

A Passcode Policy is like **"Setting the Standards for Classroom Keys."** Instead of letting students use a cheap, simple lock that anyone can guess (like "1234"), the school creates a rule saying every lock must be a **"Heavy Duty 6-Pin Lock."** This ensures that if a student forgets their iPad on the bus, the thief can't just guess the code, keeping the important school records inside locked up tight.

---

## File: passkeys.md

---

term: "Passkeys"

## category: ["Security"]

## Term Definition

**Passkeys** are a next-generation authentication standard developed by Apple and the FIDO Alliance to replace traditional passwords.

Security advantages:

- **Biometric** : Credentials are unlocked using Face ID or Touch ID, ensuring only the physical user can access them.

- **Cryptography** : Based on public-key infrastructure (PKI). A unique key pair is generated for each account; the private key never leaves the user's device.
- **Phishing Resistant** : Because the user does not know a "text string" to type in, they cannot accidentally give their password to a fake website.
- **Recovery** : Passkeys can be synchronized via iCloud Keychain, ensuring they are available across all user devices.

## Analogy

Think of this as **"Replacing your password with your face."** Instead of having to remember and type a complicated code like "P@ssw0rd123," your device creates a secret, un-copyable **"Digital Key"** just for you.

When you want to log in, you simply look at the camera. It’s faster, impossible to forget, and a hacker can't "guess" it or steal it from you because it doesn't exist as a word you can write down.

---

## File: patch-management.md

---

term: "Patch Management"

## category: ["macOS", "Jamf"]

## Term Definition

**Patch Management** is the automated workflow for identifying, distributing, and installing software updates for third-party applications.

Jamf Pro capabilities:

- **Monitoring** : Checks the fleet for vulnerable versions of common software (e.g., Google Chrome, Zoom, Microsoft Office).

- **Automation** : Subscribes to manufacturer feeds to detect when a new version is released.
- **Enforcement** : Automatically pushes the update package to computers that need it, minimizing the "window of vulnerability."
- **Reporting** : Provides real-time dashboards showing exactly which computers are patched and which are still risky.

## Analogy

Think of this as **"Automatic Security Repairs."** When a software company finds a "hole" (a bug) in their program, they release a **"patch"** to fix it.

IT uses Patch Management to make sure that as soon as a fix is available, it is automatically applied to every computer in the school. It’s like having a maintenance team that automatically fixes every leaky pipe in school the moment it's found, without you having to call them.

---

## File: payload.md

---

term: "Payload"

## category: ["Core"]

## Term Definition

A **Payload** is the fundamental unit of configuration within an MDM **Configuration Profile** .

Structure:

- **A Profile** = The container (e.g., "Student Wi-Fi Policy").

- **A Payload** = The specific setting item inside that container (e.g., "The Wi-Fi Password" or "The Root Certificate").

Multiple payloads can be bundled into a single profile to deliver a complete configuration (e.g., setting up Email, Wi-Fi, and VPN all at once).

## Analogy

This is a **"Single Instruction"** inside a rulebook.

If a **Profile** is the complete "Student Handbook," a **Payload** is just one specific paragraph inside it—like "Rule 1: Use the school Wi-Fi" or "Rule 2: Don't use the camera."

IT combines these individual instructions (payloads) into one big package (the profile) to tell the iPad exactly how to behave.

---

## File: pending-command.md

---

term: "Pending Command"

## category: ["Core"]

## Term Definition

A **Pending Command** is an administrative instruction sent by the MDM server that has not yet been executed by the target device.

Common causes for pending status:

- **Offline** : The device is turned off or has no internet connection.

- **Sleep** : The device is in a low-power sleep mode and hasn't received the APNs "wakeup" push yet.
- **Busy** : The device is currently processing other commands (a queue backlog).
- **Locked** : Some commands (like OS updates) cannot run if the device is passcode-locked.

The command remains in the queue and will automatically execute the moment the device checks in again.

## Analogy

Think of this as a **"Letter Waiting in the Mailbox."** The school's main computer (the MDM) has already "mailed" the task to your iPad. However, if your iPad is turned off or unconnected, it can't "open the mail" yet.

As soon as you turn your iPad on and connect to Wi-Fi, it **"checks the mail"** and does whatever work (installing apps, locking screen) is waiting for it.
