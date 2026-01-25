---
File: 802-1x.md
---

---

term: "802.1X"

## category: ["Network"]

## Term Definition

**802.1X** is an IEEE standard for port-based **Network Access Control (PNAC)** . It provides a robust authentication mechanism for devices wishing to attach to a LAN or WLAN.

In enterprise and school environments (such as **eduroam** ), 802.1X requires:

- Deployment of valid **digital certificates** or credentials to devices.

- Verification of these credentials by a **RADIUS server** before granting network access.

This is significantly more secure than a shared Wi-Fi password, as it ensures that only authorized devices with unique identities can enter the internal network.

## Analogy

Think of 802.1X as an **"Airport Security Checkpoint"** for your network.

- **Standard home Wi-Fi** is like a house key—anyone who has the key can walk in.

- **802.1X** requires everyone to show their own **passport** (certificate) and **ticket** (credentials).

If the identity doesn't match the security list, they aren't allowed through the gate.

---

## File: aac-automatic-assessment-configuration.md

---

term: "AAC (Automatic Assessment Configuration)"

## category: ["Education"]

## Term Definition

**Automatic Assessment Configuration (AAC)** is a specialized lock-down mode in iOS, iPadOS, and macOS designed for high-stakes standardized testing.

When a student opens a supported testing app, AAC automatically manages the device environment:

- **Disables assistive features** : Dictionary, spell check, and lookup.

- **Blocks interruptions** : Screenshots, screen recording, and push notifications are suppressed.
- **Prevents multitasking** : The student is locked into the specific testing app.

Once the test is completed and the student exits the app, the device automatically restores all features without requiring manual IT intervention.

## Analogy

This is the iPad's **"Proctored Exam Mode"** .

When the test starts, the system temporarily **"confiscates"** all potential cheating tools (like copy-paste, Siri, or auto-correct). As soon as the test is over, these tools are automatically returned to the student, ensuring a fair and secure testing environment for everyone.

---

## File: abm-apple-business-manager.md

---

term: "ABM (Apple Business Manager)"

## category: ["Apple"]

## Term Definition

**Apple Business Manager (ABM)** is a web-based portal designed for IT administrators to manage Apple deployments at scale. It serves as the foundation for modern device management.

Key functionalities include:

- **Device Management** : Assigning devices to MDM servers via **Automated Device Enrollment (ADE)** .

- **Content Distribution** : Purchasing apps and books in volume through the **Volume Purchase Program (VPP)** .
- **Identity Management** : Creating and managing **Managed Apple Accounts** for employees.

An MDM server must be linked to ABM to prove organizational ownership of devices and enable **Zero-Touch deployment** .

## Analogy

ABM is the **"Central Assets Headquarters"** for an organization's Apple devices.

Every piece of hardware the company buys and every software license is registered here first. Think of the **MDM** as a third-party management company that must get a **"Central Key"** from the Headquarters (ABM) before it is allowed to enter and manage the company's property.

---

## File: accessibility-features.md

---

term: "Accessibility Features"

## category: ["Apple"]

## Term Definition

**Accessibility Features** are built-in tools across the Apple ecosystem (iOS, iPadOS, macOS, visionOS) designed to assist users with various physical or cognitive needs.

Key tools include:

- **Vision** : VoiceOver (screen reading), Zoom, and Magnifier.

- **Hearing** : Live Captions, Made for iPhone hearing aid support.
- **Motor** : Voice Control, Switch Control, and AssistiveTouch.
- **Cognitive** : Assisted Access and Background Sounds.

MDM allows administrators to **pre-configure** or lock these settings, ensuring that students with special needs have the correct tools ready as soon as they receive their device.

## Analogy

Think of these as the **"Universal Accessibility Ramps"** of the digital world.

Just as public buildings must have ramps and braille signs, Apple builds these tools directly into every device so that everyone, regardless of their physical needs, can learn and explore.

Schools can turn these on automatically for students who need them, saving time for both the student and the teacher.

---

## File: account-driven-device-enrollment.md

---

term: "Account-Driven Device Enrollment"

## category: ["Enrollment"]

## Term Definition

**Account-Driven Device Enrollment** is a modernized method for enrolling personal devices in a **Bring Your Own Device (BYOD)** environment.

The process is streamlined:

1. Users sign in with their **Managed Apple Account** directly in the Settings app.

2. The system automatically detects the organization's MDM and guides the user through enrollment.

This method enforces a strict **separation between work and personal data** . The organization can only manage business apps and specific professional settings, while personal photos, messages, and accounts remain completely private and inaccessible to the IT department.

## Analogy

This is a **"Log-in to Manage"** mechanism.

It is as simple as signing into your work email. Once you log in, your phone creates a separate **"Work Partition"** for company apps and files.

If you ever leave the company and log out, that entire partition disappears instantly, leaving your personal data completely untouched.

---

## File: acme.md

---

term: "ACME (Automated Certificate Management Environment)"

## category: ["Security"]

## Term Definition

**Automated Certificate Management Environment (ACME)** is a standard protocol for automating the management of digital certificates.

It allows devices to automatically:

- **Request** : Ask for a new identity certificate.

- **Verify** : Prove the device's identity to the Certificate Authority (CA).
- **Renew** : Refresh expiring certificates without manual IT intervention.

In modern Apple management, ACME is increasingly replacing the older **SCEP** protocol to ensure that device identity certificates remain valid and secure indefinitely.

## Analogy

ACME is an **"Auto-Renewal Status"** for your security certificates.

Think of it like a digital ID card that expires every few months. Instead of you having to fill out a paper form to renew it, the system automatically handles the paperwork and issues you a new ID in the background.

You never lose access to the network because a certificate "expired" while you weren't looking.

---

## File: activation-lock-bypass-code.md

---

term: "Activation Lock Bypass Code"

## category: ["Security"]

## Term Definition

An **Activation Lock Bypass Code** is a unique alphanumeric string that an MDM server automatically collects from **Supervised** devices.

This code is essential for device lifecycle management:

- If a user leaves the organization without signing out of their personal **Apple Account** (leaving the device "locked").

- An IT administrator can enter this specific code in the password field to bypass the lock.
- This allows the device to be erased and prepared for a new user.

## Analogy

This is the **"Emergency Override Key"** for institution-owned hardware.

If someone leaves the school and forgets to unlock their iPad, IT doesn't have to guess the student's personal password. They can pull this code from the MDM system, enter it into the device, and the "theft lock" is instantly removed. The iPad can then be wiped and given to a new student.

---

## File: activation-lock.md

---

term: "Activation Lock"

## category: ["Security"]

## Term Definition

**Activation Lock** is an Apple security feature designed to prevent unauthorized use of a lost or stolen device. It is a part of the **"Find My"** service.

How it works:

- It is automatically enabled when **Find My** is turned on.

- Once a device is reset, the original user's Apple ID and password are required to reactivate it.

While highly effective for anti-theft, it can be a challenge for organizations if a student or staff member leaves without signing out. In such cases, administrators must use an **Activation Lock Bypass Code** or request a lock removal from Apple Support.

## Analogy

Think of this as the device's **"Anti-Theft Deadbolt."** Even if a thief completely wipes the iPad, they will be greeted by a lock screen requiring your specific password. It makes the device useless to anyone but the rightful owner.

However, it can become a **"Zombie Device"** if a student graduates and forgets to unlock it—leaving the school with hardware that can't be reused without an IT "Override Key."

---

## File: ade.md

---

term: "ADE (Automated Device Enrollment)"

## category: ["Enrollment"]

## Term Definition

**Automated Device Enrollment (ADE)** is the gold standard for deploying Apple devices at scale (formerly known as **DEP** ).

The workflow involves:

1. **Purchasing** : Devices are bought through an authorized reseller or Apple directly.

2. **Assignment** : Serial numbers are automatically added to the organization's **Apple School Manager (ASM)** or **Apple Business Manager (ABM)** account.

3. **Activation** : The moment the device is turned on and connected to Wi-Fi, it automatically downloads the school's MDM profile.

This process is mandatory and cannot be skipped by the end-user, enabling true **"Zero-Touch"** deployment.

## Analogy

This is the device's **"Factory-Level Identity."** It's as if every school iPad was born with the school's stamp on its digital forehead. No matter who holds the device or how many times it's reset, the moment it touches the internet, it **"calls home"** to the school’s management system and sets itself up according to the rules automatically.

---

## File: admin-account.md

---

term: "Admin Account"

## category: ["Security"]

## Term Definition

An **Admin Account** is a privilege level in macOS that grants full control over the system.

Users with Admin rights can:

- **Install Software** : Add or remove applications at the system level.

- **Modify Settings** : Change network configurations, security policies, and system-wide preferences.
- **Manage Users** : Create, delete, or reset passwords for other local accounts.

In managed environments, IT departments typically maintain a hidden **management Admin account** for maintenance while downgrading regular users to **"Standard User"** status to prevent unauthorized changes.

## Analogy

This is the **"Grand Commander"** of the computer.

Whoever has this account can change anything, delete anything, or install any software. For safety, only IT staff usually have this level of access.

Everyone else is given a **"Standard Account,"** meaning they can use the computer to do their work, but they can't mess with the "engine" under the hood.

---

## File: airdrop-codes.md

---

term: "AirDrop Codes"

## category: ["Network"]

## Term Definition

Introduced in **iOS 26.2** , **AirDrop Codes** add an extra layer of privacy and security for wireless file sharing.

Key features include:

- **One-time Codes** : Users can generate a temporary code (valid for up to 30 days) for sharing with people not in their contacts.

- **Verification** : The recipient must enter this code to verify and accept the incoming transfer.
- **Privacy Protection** : Prevents unsolicited AirDrop requests and ensures files are only sent to the intended recipient.
- **MDM Context** :

Schools should evaluate how this affects their AirDrop policies. While it increases privacy, IT admins must ensure it doesn't bypass institutional restrictions. If MDM has disabled AirDrop entirely, the code functionality will also be unavailable.

## Analogy

In the past, AirDrop was like an **"Open Mailbox"** —anyone nearby could try to drop something in.

With **AirDrop Codes** , it's like adding a **"Combination Lock"** to your mailbox. Only the people you give the code to can send you files, making the experience much more private and secure.

---

## File: airdrop-for-business.md

---

term: "AirDrop for Business"

## category: ["Security"]

## Term Definition

**AirDrop for Business** (also known as **Managed AirDrop** ) is a management capability that allows IT administrators to control data flow via AirDrop.

The system distinguishes between:

- **Managed Storage** : Organizational apps and data.

- **Unmanaged Storage** : Personal apps and data.

IT can prevent users from sharing sensitive school documents with personal devices while still allowing AirDrop for legitimate schoolwork between managed devices.

## Analogy

Think of this as an **"Information Filter"** for AirDrop.

The school can set a rule that says: "You can AirDrop files between school iPads, but you are blocked from sending school work to your personal phone." This ensures that homework and sensitive data stay within the school's safe environment.

---

## File: airdrop.md

---

term: "AirDrop"

## category: ["Core"]

## Term Definition

**AirDrop** is Apple’s proprietary peer-to-peer wireless file-sharing service. It uses **Bluetooth** for discovery and creates a high-speed **Wi-Fi Direct** connection for the actual transfer.

Management considerations:

- **Collaboration** : Excellent for quick document sharing in classrooms.

- **Security Risks** : Can be used for unsolicited or unauthorized file transfers.
- **Restrictions** : MDM can restrict AirDrop to **"Managed Contacts Only"** or disable it entirely to maintain a safe learning environment.

## Analogy

This is **"Wireless Hand-to-Hand"** file transfer.

You don't need a cable or a USB drive; if two devices are close enough, you can "throw" a file from one to the other instantly. It’s perfect for sharing a project with a classmate.

However, if not managed, it could lead to students accidentally sharing distracting files with people nearby.

---

## File: airplay.md

---

term: "AirPlay"

## category: ["Core"]

## Term Definition

**AirPlay** is Apple’s wireless streaming protocol that allows for screen mirroring or streaming audio/video to an **Apple TV** or AirPlay-enabled display.

In classroom environments, MDM can:

- **Pre-configure permissions** : Specify which Apple TV a specific iPad is allowed to use.

- **Security** : Pre-fill security passwords or set required verification steps.
- **Automation** : Ensure that teachers can present without navigating complex Wi-Fi or Bluetooth settings.

## Analogy

This is the **"Wireless Projector"** feature.

With one tap, a teacher can put their iPad screen up on the big classroom TV. To keep things orderly, IT can pre-program the passwords so teachers can just walk in and start teaching without having to hunt for a cable or ask for a complicated setup.

---

## File: airprint.md

---

term: "AirPrint"

## category: ["Core"]

## Term Definition

**AirPrint** is Apple’s driverless printing technology. It allows Apple devices to print directly to supported printers on the same local network.

Key advantages for IT:

- **No Drivers** : Eliminates the need for manual driver installation on individual devices.

- **Payloads** : MDM can use an AirPrint payload to push an **"Allowlist"** of specific school printers to student and staff devices.
- **Automation** : Printers appear automatically in the print menu when the device connects to the school network.

## Analogy

Think of this as **"Driver-Free Printing."** In the old days, you had to download and install complicated software for every new printer. With AirPrint, your iPad **"sees"** the printer instantly.

IT sets it up so that as soon as you connect to the school Wi-Fi, all the authorized school printers just show up in your menu, ready to go.

---

## File: always-on-vpn.md

---

term: "Always-on VPN"

## category: ["Network"]

## Term Definition

**Always-on VPN** is a mandatory network security policy for managed devices that ensures all traffic is tunnelled through a secure gateway.

Key characteristics:

- **Automatic Connection** : When the device detects any network connection (Wi-Fi or Cellular), it immediately establishes an encrypted tunnel to the organizational network.

- **Lockdown Mode** : If the VPN fail to connect, the device can block all network traffic.
- **Privacy & Security** : Ensures that sensitive data is never transmitted over unencrypted public networks.

## Analogy

This is a **"Mandatory Security Tunnel."** Whether a student is at a cafe or an airport, the system forces all internet usage to go through the school's private, encrypted lane first. If the tunnel isn't available, the internet simply won't work. This ensures that no matter where the device goes, the data stays safe from hackers on public Wi-Fi.

---

## File: apns.md

---

term: "APNs (Apple Push Notification service)"

## category: ["Core", "Apple"]

## Term Definition

**Apple Push Notification service (APNs)** is the critical "Messenger" between an MDM server and an Apple device.

Because an MDM server cannot communicate directly with a device (due to firewalls and battery-saving sleeps), it follows this workflow:

1. **Signal** : The MDM server sends a push command to Apple’s APNs servers.

2. **Wake up** : APNs "wakes up" the device via a persistent low-power connection.

3. **Check-in** : The device is instructed to check in with the MDM server to receive its tasks.

**Crucial Note** : If the connection to APNs is blocked (e.g., by a school firewall or misconfigured network), management of the devices will fail entirely.

## Analogy

APNs is the **"Tap on the Shoulder"** for your iPad.

When the school’s management system wants to install an app, it can't just shout—it has to ask Apple to "tap" the iPad's shoulder and say, "Hey, go check the school server for a new mission."

If this messenger can't get through the school gate (the firewall), the iPad will never know it has new work to do.

---

## File: app-config.md

---

term: "App Config (App Configuration)"

## category: ["Apps"]

## Term Definition

**App Configuration** (Managed App Config) allows MDM to inject specific settings directly into an application during its deployment.

The benefits include:

- **Zero-Touch Setup** : Server URLs, license keys, and usernames are pre-filled.

- **Security** : Specific features within the app can be locked or hidden.
- **Consistency** : All students receive the exact same app configuration automatically.

This eliminates the need for manual setup by students or teachers and significantly reduces configuration errors.

## Analogy

Think of this as an app that comes **"Pre-filled."** When IT sends you an email app, the server settings and your email address are already typed in for you. All you have to do is open the app and start working. You don't need to call IT to ask for complicated IP addresses or secret port numbers.

---

## File: app-privacy-permissions-visibility.md

---

term: "App Privacy Permissions Visibility"

## category: ["Mac"]

## Term Definition

Introduced in **macOS Tahoe** , this transparency feature enhances user awareness of privacy management.

Key features include:

- **Explicit Display** : App privacy permissions managed via MDM (such as Screen Recording or Full Disk Access) are shown in **System Settings > Privacy & Security** .

- **Managed Labels** : These permissions are clearly labeled as **"Managed by Organization."**
- **User Insight** : Users can see exactly what has been authorized by IT, promoting a transparent security environment.
- **MDM Context** :

While this increases transparency, it may also lead to user questions about why certain apps have high-level permissions. IT should be prepared to explain these security authorizations to staff.

## Analogy

In the past, permissions granted by IT were "invisible." Now, they are listed on a **"Public Authorization List."** Users can easily see which apps have been granted special permissions by the school's management system, improving trust and transparency.

---

## File: app-store.md

---

term: "App Store"

## category: ["Apps"]

## Term Definition

The **App Store** is Apple’s official platform for downloading and updating applications.

In managed school environments:

- **Restriction** : On supervised devices, IT administrators often use MDM to hide the App Store icon.

- **Focus** : This prevents students from downloading unapproved games or distracting applications.
- **Alternative** : Students are instead directed to use a curated **Self Service** portal to install approved educational tools.

## Analogy

This is Apple’s **"Official Software Mall."** To keep students focused and prevent the installation of unauthorized games, schools often choose to "Board up the mall doors" (hide the App Store icon). Students then go to the **"School Supply Room"** (the Self Service app) to get the specific tools their teachers have approved for the lesson.

---

## File: app-thinning.md

---

term: "App Thinning"

## category: ["Apps"]

## Term Definition

**App Thinning** is an Apple optimization technology designed to minimize the storage footprint of applications. It consists of three pillars:

- **Slicing** : The system only downloads the specific assets (e.g., graphics for that specific retina scale) required for the target device.

- **Bitcode** : Allows Apple to re-optimize an app binary for future hardware updates without the developer resubmitting the app.
- **On-Demand Resources** : Allows parts of an app (like advanced levels in a game) to be downloaded only when needed.

This significantly reduces download times and saves precious storage space on student iPads with limited capacity.

## Analogy

Think of this as **"Custom Tailoring"** for apps.

Instead of delivering every possible version of an app (for iPad Air, iPad Pro, and Mac mini) to your device, the App Store only sends the parts that actually fit your specific hardware.

It's like buying a shirt in your exact size rather than taking home a giant box containing every size from XS to XL.

---

## File: apple-classroom.md

---

term: "Apple Classroom"

## category: ["Education"]

## Term Definition

**Apple Classroom** is a specialized app that provides teachers with powerful classroom management and monitoring tools.

Key capabilities:

- **Screen View** : Teachers can monitor student screens in real-time.

- **App Lock** : Lock devices into a specific app or website for focused learning.
- **Resource Sharing** : Instantly share documents, web links, or students' screens to an Apple TV.

**Technical Note** : Because it operates over local Bluetooth and Wi-Fi, it is highly responsive and does not rely on the MDM server for its real-time interactions.

## Analogy

Think of this as the **"Classroom Remote Control"** for teachers.

On their iPad, a teacher can see exactly what every student is doing. If a student gets distracted, the teacher can instantly lock their screen or switch them to the correct textbook app, ensuring the whole class stays on task during the lesson.

---

## File: apple-configurator.md

---

term: "Apple Configurator"

## category: ["Core"]

## Term Definition

**Apple Configurator** is a physical management and diagnostic tool for macOS.

It is primarily used for:

- **Bulk Provisioning** : Setting up many devices via a wired connection.

- **ABM Addition** : Manually adding devices (not purchased through enterprise channels) into **Apple Business Manager** .
- **Restoration** : Reinstalling device firmware (IPSW) or reviving a "bricked" device.

It serves as the **"last resort"** tool for recovery when a device cannot be reached over the network via MDM.

## Analogy

Think of this as the **"IT Workbench."** If an iPad is completely frozen or won't connect to the internet, you use a USB cable to plug it into a Mac running Apple Configurator. It allows IT to **"reinstall the engine"** or force the device to register with the school's management system even if it was originally purchased at a regular retail store.

---

## File: apple-intelligence-management.md

---

term: "Apple Intelligence Management"

## category: ["Security"]

## Term Definition

**Apple Intelligence Management** refers to the MDM controls introduced in **iOS 18.1** and **macOS 15.1** to govern generative AI capabilities.

Organizations can manage:

- **Content Analysis** : Whether AI tools can analyze user content (emails, documents, and transcripts).

- **Data Transmission** : Control over data sent to the **Private Cloud Compute (PCC)** layer.
- **Privacy Compliance** : Ensuring that sensitive institutional data is not used for model training or inadvertently processed.

This maintains strict data privacy while allowing users to benefit from AI-powered productivity tools.

## Analogy

Think of this as a **"Privacy Shield for AI."** While Apple Intelligence provides powerful new tools to help with writing and organization, the school can choose to turn off certain features to make sure your work and private messages aren't being "read" or "learned" by the AI. It keeps the school’s most sensitive secrets safe from being analyzed by a computer program.

---

## File: apple-intelligence-reports.md

---

term: "Apple Intelligence Reports"

## category: ["Security"]

## Term Definition

**Apple Intelligence Reports** (and associated AI Management tools) provide auditing and restriction capabilities within MDM to maintain academic integrity.

Administrators can use MDM to:

- **Disable Summaries** : Turn off AI-generated summaries in Safari, Mail, and Messages.

- **Writing Tools Control** : Restrict the use of AI for rewriting or proofreading.
- **Auditing** : Monitor the availability of AI features across the device fleet.

This ensures students are reading, synthesizing, and writing content based on their own comprehension rather than relying on automated assistance.

## Analogy

This is a mechanism to prevent **"AI Plagiarism."** Just as a teacher might require a student to write their own book report rather than copying from an older sibling, MDM can turn off the "AI Summarize" button. This ensures that students are actually reading the full text and learning to express their own thoughts.

---

## File: apple-intelligence.md

---

term: "Apple Intelligence"

## category: ["Core"]

## Term Definition

**Apple Intelligence** is the personal intelligence system introduced by Apple in **2024 (OS version 18)** and further advanced in **2025 (OS version 26)** . It utilizes on-device large language models (LLMs) to power generative AI features.

Key features include:

- **Writing Tools** : Proofreading, rewriting, and summarization of text.

- **Visual Intelligence** : Genmoji (custom emojis) and Image Playground (image generation).
- **Mail & Messages** : Notification prioritization and smart replies.

**Technical Specifications** :

- **Privacy** : Most processing occurs locally on-device. Complex tasks use **Private Cloud Compute (PCC)** without storing data.

- **Hardware Requirements** : Requires devices with **M-series** chips (M1 or later) or **A17 Pro** chips and later.

## MDM Context

Organizations can choose to fully enable or disable Apple Intelligence via MDM. In education, it is highly recommended to establish strong usage policies—especially during exams, where "Writing Tools" should be disabled to prevent academic dishonesty.

Entry-level iPads (9th/10th Gen) do not support these features.

## Analogy

Think of it as a **"Private Assistant"** living inside your iPad.

It can help you rewrite an essay, summarize a long email, or even create a custom emoji, all while keeping your data strictly on your device so no one else can see it. It's like having a brilliant helper who is sworn to secrecy.

---

## File: apple-pencil.md

---

term: "Apple Pencil"

## category: ["Hardware"]

## Term Definition

**Apple Pencil** is an active stylus designed specifically for supported iPad models. It features high precision, low latency, and pressure sensitivity.

In specialized assessment or highly controlled classroom scenarios, MDM can be used to:

- **Restrict Bluetooth** : Disable the connection to the stylus entirely.

- **Limit Gestures** : Restrict specific inputs like the **"Double-Tap"** feature (on Apple Pencil 2 and later) to prevent distractions.
- **Standardize Input** : Ensure a uniform writing experience during digital exams.

## Analogy

This is the **"High-Tech Pencil"** for the iPad.

In addition to writing, it has electronic features—like tapping the side of the pen to change to an eraser. During an exam, the school can **"lock"** these digital features, turning it back into a standard pencil that can only write. This prevents any unfair advantages or accidental distractions.

---

## File: apple-silicon.md

---

term: "Apple Silicon"

## category: ["Hardware"]

## Term Definition

**Apple Silicon** refers to the custom system-on-a-chip (SoC) family (M1, M2, M3, M4, and M5 series) designed by Apple for the Mac and iPad.

These chips introduce advanced hardware-level security concepts:

- **Volume Owner** : A security model that requires a physical user with an account on the crystal-level secure enclave to authorize certain system actions.

- **Boot Security** : Enhanced verification of the operating system during startup.
- **Authentication** : Certain management tasks (like OS updates or changing security levels) require local credentials (password or Touch ID).

This represents a significant shift from Intel Macs, where MDM could often perform administrative tasks with broader, purely software-based authority.

## Analogy

This is the **"High-Performance Engine"** inside modern Apple computers.

While it's incredibly fast, it's also much more secure. Think of it like a supercar that requires both a **physical key** and a **biometric scan** to start the engine.

While it makes the computer almost impossible for a thief to use, it also means the school’s IT team has to use more sophisticated methods to keep everything updated and secure.

---

## File: applecare.md

---

term: "AppleCare+"

## category: ["Hardware"]

## Term Definition

**AppleCare+** is Apple’s official extended warranty and accidental damage insurance service for hardware.

Key benefits for organizations:

- **Extended Support** : Extends the standard 1-year limited warranty and provides 24/7 priority access to Apple experts.

- **Accidental Coverage** : Covers repairs for "accidental damage" (such as cracked screens or liquid spills) for a set deductible per incident.
- **Fleet Management** : Purchasing AppleCare+ for a device fleet is a vital strategy for predictable budgeting and maintaining hardware longevity.

## Analogy

Think of this as **"Original Equipment Insurance."** While every device comes with a basic 1-year guarantee, AppleCare+ goes much further. If an iPad is accidentally dropped in the hallway and the screen shatters, the school doesn't have to buy a whole new device.

Instead, they pay a small **"Processing Fee"** and Apple repairs or replaces the iPad with a fresh one, keeping the fleet healthy and operational.

---

## File: ard.md

---

term: "ARD (Apple Remote Desktop)"

## category: ["Core"]

## Term Definition

**Apple Remote Desktop (ARD)** is a powerful desktop management application for macOS designed for local network administration.

While MDM handles broad, persistent settings, ARD is optimized for **real-time tasks** :

- **Screen Monitoring** : View multiple Mac screens simultaneously in a classroom or lab.

- **Remote Assistance** : Take control of a user's keyboard and mouse to provide technical support.
- **Software Distribution** : Rapidly push large packages or files directly to a group of student laptops.
- **Execution** : Run remote shell scripts on a selection of target Macs.

## Analogy

Think of this as the **"Immediate Control Console"** for IT.

If MDM is like posting school rules on a bulletin board for everyone to read, ARD is like a teacher standing in the room and helping you personally. IT can see your screen, move your mouse to show you a fix, or **"broadcast"** a file to every Mac in the room instantly.

---

## File: asm.md

---

term: "ASM (Apple School Manager)"

## category: ["Apple"]

## Term Definition

**Apple School Manager (ASM)** is the centralized web portal for education administrators to manage people, devices, and content.

It serves as the foundation for modern digital education:

- **Device Assignment** : Linking serial numbers to specific MDM servers for **Automated Device Enrollment (ADE)** .

- **Roster Management** : Syncing with **Student Information Systems (SIS)** to automatically create classes and student accounts.
- **Managed Apple Accounts** : Creating and managing organizational IDs for students and teachers.
- **Content** : Purchasing and distributing educational apps and books in volume.

## Analogy

ASM is the school's **"Digital Registrar's Office."** It's the headquarters where the school registers every iPad, buys every educational app, and creates IDs for every student and teacher.

It makes sure that when a teacher walks into a room, their iPad already **"knows"** exactly which students are in their class, what their names are, and which digital books they need for the lesson.

---

## File: asset-tag.md

---

term: "Asset Tag"

## category: ["Core"]

## Term Definition

An **Asset Tag** is a unique identifier assigned by an organization for internal property management and tracking purposes.

MDM interaction with Asset Tags:

- **Digital Assignment** : MDM can write this organization-specific number into the device’s system information.

- **Visibility** : The tag can be forced to display on the **Lock Screen** or the Login window.
- **Inventory** : Facilitates physical audits and cross-referencing between the MDM database and physical hardware.

## Analogy

This is a **"Digital Property Sticker."** Just like a school might put a physical barcode sticker on the back of a laptop, the MDM puts a digital version of that sticker right on the screen.

If an iPad is lost, anyone who finds it can see the **"Asset ID: A-101"** tag on the Lock Screen and return it to the correct department without ever having to unlock the device or check the serial number.

---

## File: audio-accessory-configuration.md

---

term: "Audio Accessory Configuration"

## category: ["Hardware"]

## Term Definition

Introduced in **iOS/iPadOS 26** (`com.apple.configuration.audio-accessory.settings`), this MDM payload improves audio accessory management in collaborative environments.

Key management features:

- **Temporary Pairing** : Allows supervised devices to pair with AirPods or Beats headphones temporarily.

- **iCloud Bypass** : Prevents pairing information from syncing to the user's personal iCloud account.
- **Shared iPad Optimization** : Designed specifically to ensure that accessory connections are cleared when a student logs out.

## MDM Context

This solves the long-standing problem of AirPods pairing conflicts in shared labs. It ensures that students don't accidentally connect to a set of headphones used by someone else in a previous class.

## Analogy

Previously, pairing AirPods was like **"Getting Married"** —the connection followed you everywhere via iCloud and was hard to break.

Now, in shared school environments, it's like a **"Temporary Rental."** You pair the headphones while you're in the lab, but when you log out, the iPad **"forgets"** the connection instantly so it doesn't interfere with the next student.

---

## File: automatic-app-updates.md

---

term: "Automatic App Updates"

## category: ["Apps"]

## Term Definition

**Automatic App Updates** is a background system mechanism that ensures applications are always current.

Functional aspects:

- **Automation** : The device automatically downloads and installs updates when connected to Wi-Fi and in an idle state.

- **MDM Control** : Administrators can force-enable this feature to maintain version consistency across the fleet or disable it to manage bandwidth during critical times.
- **Security** : Ensures that all devices have the latest security patches and features for their installed applications.

## Analogy

Think of this as **"Automatic Maintenance"** for your apps.

Just as a car dealership might automatically change your oil when you bring the car in, the system handles the updates behind the scenes so the apps are always ready to use.

This ensures that students are not exposed to security risks or missing features caused by running outdated, "sputtering" software.

---

## File: automatic-reboot.md

---

term: "Automatic Reboot"

## category: ["Security"]

## Term Definition

**Automatic Reboot** is a specialized security configuration introduced in **OS version 26** .

Configuration details:

- **Trigger** : MDM can configure a device to automatically reboot after a specific period of inactivity or extended lock time (e.g., 72 hours).

- **Security Goal** : The reboot clears sensitive decryption keys from the device’s volatile memory (RAM).
- **Protection** : Moving from **"Before First Unlock" (BFU)** to a cold-boot state makes the device significantly harder to compromise or decrypt if stolen.

## MDM Context

Schools should use this feature to ensure that lost or stolen devices automatically enter a more secure state. It is important to inform users that these reboots are an intentional security feature and not a hardware fault.

## Analogy

Think of this as a **"Timed Vault Lock."** If the vault hasn't been opened for a long time, the security system assumes something might be wrong and automatically adds an extra layer of heavy shielding.

If an iPad is lost and remains locked for several days, it reboots itself to **"forget"** any temporary passwords stored in its short-term memory, making it much harder for a thief to break into the data.

---

## File: background-app-refresh.md

---

term: "Background App Refresh"

## category: ["Apps"]

## Term Definition

**Background App Refresh** allows applications to periodically fetch new content and updates even while the device is in standby or the app is not actively in use.

Management through MDM:

- **Productivity** : Mail apps fetch new messages, and News apps pre-load headlines.

- **Battery Optimization** : MDM can disable this feature globally or for specific apps to extend the battery life of student devices.
- **Bandwidth** : Controlling background activity can help manage network congestion during the school day.

## Analogy

Think of this as the app's **"Standby Concierge."** While you aren't using the device, your apps are "tidying up" and "collecting mail" in the background so everything is ready the moment you unlock the iPad.

If the concierge is working too hard and draining the battery, IT can tell them to rest (disable the feature) so the iPad stays powered through the last period.

---

## File: background-security-improvements.md

---

term: "Background Security Improvements"

## category: ["Security"]

## Term Definition

Introduced in **iOS 26.3** , **Background Security Improvements** represent a modular approach to system security.

Key features:

- **Modular Patching** : Allows Apple to rapidly patch critical security vulnerabilities in specific components like **Safari** and **WebKit** .

- **No Restarts** : Updates are applied silently in the background without requiring a full OS update or a device restart.
- **Zero-Day Protection** : Ensures devices are protected against active exploits as soon as a fix is developed by Apple.

## MDM Context

School IT admins should note that these updates occur automatically and silently. This significantly improves the security posture of the fleet without requiring administrative action or disturbing class time.

## Analogy

Previously, fixing a security bug was like **"Shutting down the whole building for major construction"** (a full system update).

Now, "Background Security Improvements" are like **"Replacing a single broken lightbulb"** while the building stays open and active. It’s fast, automatic, and doesn't interrupt anyone's work or learning.

---

## File: battery-health.md

---

term: "Battery Health"

## category: ["Hardware"]

## Term Definition

**Battery Health** is a metric that indicates the current maximum capacity of a device’s battery relative to its capacity when new.

MDM integration allows:

- **Telemetry Collection** : Administrators can remotely monitor the health percentage of every device in the fleet.

- **Proactive Maintenance** : Identify devices with batteries below a critical threshold (e.g., 80%).
- **Prevention** : Schedule battery replacements before aging cells lead to performance throttling, unexpected shutdowns, or physical swelling (expanding batteries).

## Analogy

This is the **"Physical Exam Report"** for a battery.

A brand-new battery has 100% capacity, but it "loses its stamina" over time as it is used and recharged. IT doesn't need to manually check every iPad; they can just look at a digital report to see which students have **"tired" batteries** that need to be replaced, preventing a dead iPad in the middle of a lesson.

---

## File: blob-urls-and-managed-open-in-improvement.md

---

term: "Blob URLs and Managed Open-In Improvement"

## category: ["Security"]

## Term Definition

A security enhancement introduced in **OS version 26** that bridges a common loophole in data protection.

Functional details:

- **Scope** : **Blob URLs** (temporary, browser-generated links used to handle data inside a session).

- **Enforcement** : These links now strictly respect **"Managed Open-In"** restrictions.
- **Goal** : Prevents users from bypassing organization-level **Data Loss Prevention (DLP)** policies by using browser-based "Blob" links to export sensitive files from managed apps to unmanaged personal accounts.

## Analogy

Previously, there was a **"Hidden Secret Passage"** (Blob URLs) that allowed users to move files out of the school's secured area and bypass the "No Exporting" rules.

Now, the security guard ( **Managed Open-In** ) also monitors these secret passages, ensuring that school data remains strictly inside the approved school applications and doesn't "leak" out.

---

## File: blueprints.md

---

term: "Blueprints"

## category: ["Jamf", "Core"]

## Term Definition

**Blueprints** are an advanced automation framework within Jamf management tools used to maintain device consistency.

Key features:

- **Desired State** : Administrators define exactly how a device should be configured (apps, settings, security).

- **Continuous Monitoring** : The system periodically checks if the device matches the defined state.
- **Self-Healing** : If a device drifts from this standard (e.g., an app is removed), the Blueprint automatically triggers a corrective action.

This proactive mechanism ensures that devices remain compliant with the organization's security baseline without manual intervention.

## Analogy

Think of this as **"Autopilot Mode"** for computer management.

You set the destination (e.g., "This device must always have the security app and disk encryption turned on"), and the system automatically keeps the device on track.

If the device **"veers off course"** because someone changed a setting, the Blueprint pulls it back into alignment instantly, without IT needing to step in.

---

## File: bonjour.md

---

term: "Bonjour"

## category: ["Network", "Apple"]

## Term Definition

**Bonjour** is Apple’s implementation of **Zero Configuration Networking (zeroconf)** . It enables devices to discover services on a local network without manual setup.

Common use cases in schools:

- **Printing** : Discovering **AirPrint** enabled printers.

- **Display** : Finding **AirPlay** destinations like Apple TVs.
- **Collaboration** : Allowing **Apple Classroom** to discover student iPads.

Bonjour eliminates the need for users to know technical details like IP addresses or DNS records to connect nearby devices.

## Analogy

Think of this as the **"Automatic Handshake"** system for your devices.

It's like a new student walking into a classroom and announcing "I'm here, and I'm ready to learn!" Everyone else in the room (the other devices) immediately knows they are there and what they can do.

Without Bonjour, you would have to know every device's exact **"GPS Coordinates"** (IP Address) just to say hello to them.

---

## File: bootstrap-token.md

---

term: "Bootstrap Token"

## category: ["Security"]

## Term Definition

A **Bootstrap Token** is a secure authorization credential used within the macOS management framework to facilitate administration.

Operational flow:

- **Generation** : When the first user enables **FileVault** encryption on a Mac, the system generates this token.

- **Escrow** : The token is securely uploaded and stored in the MDM server.
- **Utility** : MDM uses this token to authorize other administrator accounts or to allow **software updates** that require a cryptographic "owner" to proceed.

This ensures that IT can maintain a device even when the primary user is not present or when the device is in a locked, encrypted state.

## Analogy

This is the **"Backup Recovery Key"** stored in the school's digital vault.

When a computer is locked down with encryption (FileVault), usually only the primary user can unlock the door. The **Bootstrap Token** allows IT to have a secure copy of the "Master Key" so they can enter the system for maintenance or give access to a new employee if the original user has left.

---

## File: bundle-id.md

---

term: "Bundle ID"

## category: ["Apps"]

## Term Definition

A **Bundle ID** (Bundle Identifier) is a unique string that serves as the official identity of an application across Apple’s platforms.

Key characteristics:

- **Format** : Conventionally follows reverse-DNS notation (e.g., `com.apple.Keynote` or `com.google.Chrome`).

- **Uniqueness** : No two apps can share the same Bundle ID in the App Store.
- **MDM Role** : IT administrators use this ID—rather than the app's display name—to target specific apps for deployment, configuration, or security policies.

## Analogy

This is the app's **"Social Security Number"** or **"ID Card Number."** While there might be many apps named "Calculator" or "Notes," the **Bundle ID** is guaranteed to be unique to just one app. The IT system uses this specific number to make sure it is helping or managing the exact right app and doesn't get confused by apps with similar-looking names.

---

## File: byod.md

---

term: "BYOD (Bring Your Own Device)"

## category: ["Enrollment"]

## Term Definition

**Bring Your Own Device (BYOD)** is a deployment model where students or staff use their personal hardware to access institutional resources.

Apple’s **User Enrollment** framework facilitates BYOD by:

- **Work Partitioning** : Creating a separate, encrypted file system for work data.

- **Privacy Focus** : Institutional management is limited to the work partition.
- **Separation** : The organization has **no access** to personal photos, messages, location data, or apps on the rest of the device.

This achieves a critical balance between maintaining institutional security and protecting personal user privacy.

## Analogy

This is a **"Church and State"** style of management.

Imagine you have your own house (your personal phone). You agree to set aside one specialized, locked **"Office Desk"** (Work Partition) for your school work.

The school can organize or collect papers from that desk at any time, but they have no right—and no way—to peek into your personal drawers or closets.

---

## File: camera-access-control-per-app.md

---

term: "Camera Access Control per App"

## category: ["Privacy"]

## Term Definition

A granular MDM restriction key introduced in **OS version 26** (`allowedCameraRestrictionBundleIDs`) that provides precise hardware governance.

Functional capabilities:

- **Granularity** : Allows administrators to grant or deny camera access for specific apps individually.

- **Improved Security** : Replaces the older global "Allow/Disallow Camera" toggle.
- **Privacy Compliance** : Ensures that only approved educational apps can use the camera and microphone, even on a fully managed device.

## MDM Context

In a classroom, IT can allow a specific science app to use the camera for capturing experiments while keeping the camera disabled for social media or distracting apps.

## Analogy

In the past, camera access was like a **"Main Front Door Key"** —it was either all open or all locked.

Now, it's like a **"Hotel Keycard System."** IT can program the card to let you into the "Science Lab" (the classroom app), while simultaneously keeping the "Game Room" (distracting apps) locked, protecting your privacy and focus.

---

## File: captive-portal.md

---

term: "Captive Portal"

## category: ["Network"]

## Term Definition

A **Captive Portal** is a web-based authentication page that intercepts network traffic before granting full internet access.

Common characteristics:

- **Locations** : Frequently used in hotels, airports, coffee shops, and public transportation.

- **Interactions** : Users are prompted to enter credentials, pay a fee, or simply click "Agree" to terms of service.
- **MDM Impact** : Managed devices may fail to check in or complete background enrollment tasks when blocked by a Captive Portal until a user manually interacts with the login page.

## Analogy

Think of this as a **"Security Questionnaire at the Front Door."** Before you can enter the coffee shop's Wi-Fi "building," you have to answer a few questions or sign a visitor log.

For school iPads, these portals can be a hurdle because the device can't "talk" to its school server until a person manually fills out that questionnaire on the screen.

---

## File: casper-suite.md

---

term: "Casper Suite"

## category: ["Jamf"]

## Term Definition

**Casper Suite** was the original product name for the enterprise Apple management platform now known as **Jamf Pro** .

Historical context:

- **Timeline** : The name was used from **2002 to 2015** .

- **Branding** : Includes the original logo of "Casper the Friendly Ghost" as a management assistant.
- **Legacy** : While the brand has been retired, references to "Casper" or the "Casper binary" are still common in older forum posts, scripts, and internal documentation.

In all modern contexts, "Casper" invariably refers to the features and functions of **Jamf Pro** .

## Analogy

This is simply an **"Old Brand Name"** or **"Classic Name."** Just as a famous company might change its name to stay modern, "Casper" was the original name of the tools we now call "Jamf Pro."

If you see an old manual mentioning Casper, don't be confused; it's talking about the same reliable management system you use today—it just got a new outfit.

---

## File: cdn.md

---

term: "CDN (Content Delivery Network)"

## category: ["Network"]

## Term Definition

A **Content Delivery Network (CDN)** is a system of geographically distributed servers that work together to provide fast delivery of internet content.

In Apple management environments:

- **Updates** : Apple uses CDNs to cache large files like **macOS installers** or **iOS updates** near the school.

- **Speed** : When hundreds of devices request an update simultaneously, the traffic is served by a local node rather than pulling from Apple’s primary servers.
- **Bandwidth** : This reduces latency and prevents school-wide internet congestion during major deployment phases.

## Analogy

Think of this as a **"Local Grocery Store"** for the internet.

Instead of every school having to drive to the main central warehouse (Apple’s headquarters in California) to get their supplies (updates), Apple sends the supplies ahead of time to local **"Convenience Stores"** (CDNs) right in your neighborhood.

When it's time to update, the school just picks up the files from the local store, which is much faster and doesn't clog up the main highways for everyone else.

---

## File: certificate-authority.md

---

term: "Certificate Authority (CA)"

## category: ["Security"]

## Term Definition

A **Certificate Authority (CA)** is a trusted third-party entity or internal service that issues and manages digital certificates used for authentication and encryption.

Operational principles:

- **Chain of Trust** : To establish a secure connection, a device must first install and trust the CA’s **Root Certificate** .

- **Validation** : Once the Root is trusted, the device will automatically accept all other "leaf" certificates (for Wi-Fi, VPN, or email) signed by that specific authority.
- **Revocation** : The CA can invalidate certificates if they are compromised, maintaining network integrity.

## Analogy

This is the **"ID Issuing Office"** of the internet.

Think of it like a government passport office. Because we trust the office (the CA), we trust any passport (certificate) they stamp and issue.

In a school, the IT department often runs its own private **"ID Office"** to give the school's iPads permission to use the campus Wi-Fi without needing a public company's approval.

---

## File: certificate.md

---

term: "Certificate"

## category: ["Security"]

## Term Definition

A digital **Certificate** is an electronic document used to verify a device's identity and enable encrypted communication.

In an MDM environment, certificates are used for:

- **Authentication** : Proving that a device is an authorized member of the organization.

- **TLS/SSL Encryption** : Establishing secure connections between devices and servers.
- **App Signing** : Verifying that an application comes from a trusted source and hasn't been modified.

**Maintenance Note** : If a certificate expires, the device will lose its ability to connect to Wi-Fi or communicate with the management server, requiring a renewal.

## Analogy

This is the **"Digital Identity Card"** for your device.

Just as you need a physical ID to open a bank account, your iPad uses this certificate to prove to the school’s network that it is an official, approved school device.

As long as the ID is valid and hasn't "expired," the network trusts the device and allows it to connect securely.

---

## File: client-isolation.md

---

term: "Client Isolation"

## category: ["Network"]

## Term Definition

**Client Isolation** (also known as **AP Isolation** or Wireless Isolation) is a network security configuration on a wireless access point (AP).

Effect on Managed Devices:

- **Security** : Prevents connected devices from communicating directly with each other on the same Wi-Fi network, stopping the spread of malware.

- **Functionality Loss** : It immediately disables peer-to-peer Apple services that rely on local discovery.
- **Affected Services** : **AirPlay** , **AirDrop** , and student monitoring features in **Apple Classroom** will fail to connect if Client Isolation is enabled.

## Analogy

Think of this as **"Anti-Social Mode"** for Wi-Fi.

Every device is put into its own soundproof, transparent room. They can all see the "Internet" outside, but they can't see or hear who else is in the next room.

While this makes the building very safe, it means students can't use AirPlay to project their screen or AirDrop files to their group members, because they aren't allowed to "talk across the hallway."

---

## File: command-history.md

---

term: "Command History"

## category: ["Core"]

## Term Definition

**Command History** is a comprehensive audit log within the MDM console that tracks every action sent to an individual device.

Administrators use this history to:

- **Audit** : Verify when a specific command (like "Lock Device" or "Clear Passcode") was issued.

- **Troubleshoot** : Investigate error codes associated with failed app installations or profile deployments.
- **Track Status** : Monitor whether a command is currently **Pending** (device offline), **Succeeded** , or **Failed** .

## Analogy

This is the device's **"Instruction Log"** or **"Receipt Book."** Just as a bank statement lists every withdrawal and deposit, Command History lists every single instruction the school IT team has sent to that specific iPad.

If something goes wrong, IT doesn't have to guess what happened; they can check the history to see exactly which command got "stuck in the mail" and why.

---

## File: compliance.md

---

term: "Compliance"

## category: ["Security"]

## Term Definition

**Compliance** measures whether a managed device currently satisfies the organization’s mandatory security and configuration standards.

Typical compliance checks include:

- **Passcode** : Is a secure passcode set up and active?

- **Version** : Is the device running an approved and patched OS version?
- **Integrity** : Is the device free from unauthorized modifications (e.g., is not "Jailbroken")?
- **Applications** : Are mandatory security apps installed and running?

If a device drifts out of compliance, MDM can automatically trigger alerts or restrict its access to institutional resources like email or Wi-Fi.

## Analogy

Think of this as a **"Digital Security Health Check."** Before entering a high-security lab, you must be checked for proper gear (safety goggles, ID badge). Similarly, the system checks every device to see if it is "healthy" and following the rules.

If a device has an old, unpatched system or no password, it’s **"out of compliance"** and might be blocked from the school network until it is "healed" and following the security rules again.

---

## File: composer.md

---

term: "Composer"

## category: ["macOS", "Jamf"]

## Term Definition

**Composer** is a professional software packaging application for macOS provided as part of the Jamf management suite.

Key functionalities:

- **Snapshots** : Monitors a Mac's filesystem during a software installation to identify exactly what files were added or modified.

- **Packaging** : Bundles these changes into a standardized **.pkg** or **.dmg** installer.
- **Customization** : Allows administrators to include specific configuration files or licenses within an app installer.

This tool is essential for deploying complex software that doesn't follow standard App Store installation methods.

## Analogy

Think of this as a **"Professional Gift Wrapper"** for software.

If you have a complicated app with many different parts scattered everywhere, you use Composer to neatly organize and pack them into a single, tidy **"Box"** (a .pkg file).

Once IT sends that box to other computers, the recipients just have to open it, and all the parts automatically jump out and go exactly where they belong on the new computer.

---

## File: configuration-profile-removal.md

---

term: "Configuration Profile Removal"

## category: ["Core"]

## Term Definition

**Configuration Profile Removal** is an MDM directive that remotely uninstalls a specific management profile and its associated payload from a device.

Consequences of removal:

- **Instant Deletion** : Wi-Fi credentials, VPN configurations, and security restrictions are removed immediately.

- **Certificate Revocation** : Any digital certificates included in the profile are deleted from the device's keychain.
- **Resource Recovery** : Essential for offboarding users or clearing organizational data before a device is reassigned.

## Analogy

This is the **"Take It Back"** button for IT.

When a student graduates or an employee leaves the company, IT can click one button to remotely **"reclaim"** all the school’s digital property—like the secret Wi-Fi password and specific campus settings—leaving the device clean and ready for its next owner.

---

## File: configuration-profile.md

---

term: "Configuration Profile"

## category: ["Core"]

## Term Definition

A **Configuration Profile** is a standardized XML file (`.mobileconfig`) that contains a set of instructions and settings for Apple devices.

Common payloads include:

- **Connectivity** : Wi-Fi passwords, VPN configurations, and Cellular settings.

- **Accounts** : Corporate email (Exchange, IMAP) and LDAP settings.
- **Restrictions** : Disabling the camera, blocking the App Store, or limiting Safari content.
- **Security** : Mandatory passcode requirements and FileVault encryption policies.

## Analogy

A Configuration Profile is like a **"Pre-filled Registration Form"** or a **"Instructional Blueprint."** Instead of asking 500 students to manually type in a 20-character Wi-Fi password and set up their campus email one by one, the school sends them a profile. It’s a "Master Key" that tells the device exactly how it should behave and connect on campus, saving everyone time and preventing typing errors.

---

## File: content-caching.md

---

term: "Content Caching"

## category: ["Network"]

## Term Definition

**Content Caching** is a built-in macOS service that optimizes the delivery of Apple software by storing data locally on the school's network.

How it works:

1. **Initial Download** : When the first device on a network downloads a new OS update or app, the "Caching Mac" saves a copy.

2. **Local Delivery** : When subsequent devices request that same content, they pull it directly from the local Mac at LAN speeds.

3. **Efficiency** : Dramatically reduces external internet usage and speeds up fleet-wide deployments.

## Analogy

Think of this as the school's **"Shared Resource Library."** Instead of every individual student having to travel all the way to the main city library (Apple's servers in the US) to get the same textbook (an update), one person goes to get it and leaves a copy at the school’s front desk.

Now, every other student can just grab a copy from the desk, saving everyone a long trip and keeping the main city roads (the internet) clear.

---

## File: continuity.md

---

term: "Continuity"

## category: ["Apple"]

## Term Definition

**Continuity** is the collective name for Apple's deep integration features that allow different devices to work together as a single ecosystem.

Core features include:

- **Handoff** : Start a task (e.g., an email) on an iPhone and finish it on a Mac.

- **Universal Clipboard** : Copy text or images on one device and paste them on another.
- **Sidecar & Mirroring** : Use an iPad as a second display for a Mac.
- **Universal Control** : Use a single mouse and keyboard to control multiple iPads and Macs.

**Technical Requirement** : Devices must be signed in to the same **Managed Apple Account** or personal Apple ID and have Bluetooth and Wi-Fi enabled.

## Analogy

This is **"Mind Reading"** for your Apple devices.

It makes all your gadgets act like one big, synchronized team. If you copy a photo on your iPhone, you can immediately **"paste"** it into a project on your Mac. It feels like there’s an invisible thread connecting all your devices, allowing your work to flow smoothly from one screen to the next without losing your place.

---

## File: custom-b2b-app.md

---

term: "Custom B2B App"

## category: ["Apps"]

## Term Definition

A **Custom B2B App** is a specialized application developed specifically for an organization and distributed privately.

Distribution through the **Volume Purchase Program (VPP)** includes:

- **Private Access** : These apps are not visible on the public App Store.

- **Organization Specific** : They are only accessible to specific organizations (identified by Apple Business Manager IDs).
- **Security** : Allows for the deployment of internal tools containing sensitive proprietary logic or curriculum without exposing them to the general public.

## Analogy

This is a **"Private Software Tool"** just for your school or company.

Think of it like a **"Secret Menu"** at a restaurant—regular customers can't see it, and it's not listed on the main board. Only authorized members can see and order (install) these items through the organization's private system.

---

## File: ddm-app-management.md

---

term: "DDM App Management"

## category: ["Apps"]

## Term Definition

**DDM App Management** is a modernized method for deploying and governing applications using the **Declarative Device Management** (DDM) framework.

Key differences from legacy MDM:

- **Device Agency** : The device itself takes full responsibility for handling downloads and managing installation retries.

- **Auto-Correction** : If a required managed app is accidentally deleted by a user, the device detects the discrepancy locally and automatically re-installs it.
- **Efficiency** : Eliminates the need for the MDM server to constantly monitor and resend installation commands.

This ensures that critical learning tools are always present on the device without administrative overhead.

## Analogy

Think of this as an **"Automatic Restocking"** system for your apps.

It’s like a smart vending machine that knows exactly what should be on each shelf. If someone takes an app off the "shelf" (deletes it), the machine immediately sees the empty spot and puts a new one back right away, ensuring the students always have the tools they need.

---

## File: ddm.md

---

term: "DDM (Declarative Device Management)"

## category: ["Core"]

## Term Definition

**Declarative Device Management (DDM)** is Apple’s next-generation management architecture designed for a more scaleable and reactive ecosystem.

Core concepts:

- **Declarations** : Instead of a stream of commands, the server sends "Declarations" (sets of rules and desires) to the device.

- **Autonomy** : The device manages itself based on these rules. It monitors its own state (e.g., OS version, app presence) without waiting for a server "poke."
- **Status Channel** : The device proactively reports changes in its state back to the server only when something relevant happens.

This shift significantly reduces server load, improves battery life, and makes device management far more responsive to real-world changes.

## Analogy

This is the shift from **"Following Orders"** to **"Autonomous Management."** Traditional MDM is like a remote-control car where you have to press a button for every single turn. **DDM** is like a **Self-Driving Car** —you give it the destination and the rules of the road (the declarations), and it handles the driving itself. It only lets you know when it has reached its destination or encountered a pothole it can't fix.

---

## File: declarative-app-management.md

---

term: "Declarative App Management"

## category: ["DDM"]

## Term Definition

Introduced in **OS version 26** , this core DDM mechanism allows for more sophisticated software governance. It supports the deployment of App Store apps, Custom apps, and **.pkg** packages for macOS.

Key management capabilities:

- **Required Apps** : Automatically installed and self-healed (cannot be permanently removed by users).

- **Optional Apps** : Available for users to download through a curated organizational portal.
- **Update Pinning** : Administrators can freeze high-stakes testing apps at a specific version to ensure stability.
- **Granular Control** : Detailed settings for forcing updates or disabling auto-updates per-application.

## Analogy

In the past, sending an app was like **"Delivering a package"** —once it arrived on the doorstep, the delivery driver's job was done.

Now, with DDM, it's more like a **"Managed Subscription Service."** You can set rules for each app (like "always keep this one updated" or "never update this version until I say so"), giving the school total control over the software students are using in the classroom.

---

## File: declarative-software-updates.md

---

term: "Declarative Software Updates"

## category: ["DDM"]

## Term Definition

**Declarative Software Updates** is the standard, modern method for managing software updates in the Apple ecosystem, expected to be the primary framework starting in 2026.

Fundamental changes:

- **Phase-out** : Legacy MDM update commands (like `ScheduleOSUpdate`) are being replaced by the DDM "Configuration" mechanism.

- **Deadlines** : Supports strict **Enforcement Deadlines** where the device will force an update at a specific date and time.
- **Betas** : Allows administrators to remotely enroll or restrict devices in Apple’s **Beta Software Programs** .
- **Reporting** : Provides real-time progress updates through the **Status Channel** (e.g., "Downloading," "Verifying," "Installing").

**Note** : While the transition began with iOS 17 and macOS 14, Apple has announced the full deprecation of legacy MDM update commands by late 2026.

## Analogy

Previously, updating was like **"A teacher personally chasing every student"** to turn in their homework (the MDM server sending individual, repeated commands).

Now, it's like **"Posting the due date on the bulletin board"** and letting the students manage their own time. The device knows the deadline and handles the update autonomously when the time is right, just reporting back to the teacher when it's done.

## MDM Outlook

⚠️ **Important Reminder**: To align with Apple's platform trajectory, schools are encouraged to transition their update strategies to DDM by late 2026 to ensure continuous management capabilities.

---

## File: deprecated.md

---

term: "Deprecated"

## category: ["Other"]

## Term Definition

**Deprecated** is a status indicator signal that a specific technology, feature, or API is slated for removal.

Key points for IT:

- **Functionality** : A deprecated feature usually still works in the current OS version, but it is no longer being updated.

- **Future Removal** : It serves as an official warning that the feature will be deleted in a future major OS update.
- **Action Required** : IT administrators should treat "Deprecated" notices as a deadline to migrate to a newer, supported replacement.

## Analogy

Think of this as a **"Notice of Demolition"** posted on an old building.

The building hasn't been torn down yet, and you can still walk inside, but the blueprint for the new park replacing it has already been approved. **IT administrators** should start moving their digital furniture out as soon as possible so they aren't caught inside when the "Update Bulldozers" finally arrive to clear the site.

---

## File: device-group.md

---

term: "Device Group"

## category: ["Core"]

## Term Definition

A **Device Group** is a logical container within an MDM console used to categorize and target sets of hardware for management.

Groups are categorized into two types:

- **Static Groups** : Devices are manually added or removed by an administrator. These are useful for fixed sets like "iPad Cart A" or "Board Member MacBooks."

- **Smart Groups** : Devices move in or out automatically based on criteria (e.g., "All devices running iOS 17" or "iPads with less than 5GB storage").

Groups are the primary target for deploying apps, profiles, and remote commands.

## Analogy

Think of this as the school's **"Classroom System."**

- A **Static Group** is like a fixed class list where students stay in the same room all year.

- A **Smart Group** is like an **"Advanced Math Club"** —students automatically "join" as soon as they get a high grade (or update their system), and they automatically "leave" the club if they no longer meet the requirements.

This allows IT to manage devices based on their current status without manual checking.

---

## File: device-name.md

---

term: "Device Name"

## category: ["Core"]

## Term Definition

The **Device Name** is a "friendly" text identifier assigned to a piece of hardware within an MDM environment.

Management features:

- **Identification** : IT can remotely set these names (e.g., `iPad-STUDENT-001`) to quickly identify hardware in a management portal.

- **Visibility** : The name appears in settings, but it is also visible on the local network via **AirDrop** and **Bonjour** lists.
- **Locking** : MDM can prevent students from changing the name themselves, ensuring consistent tracking across the school.

## Analogy

This is the device's **"Digital Name Tag."** Just as a school might require students to wear a uniform with a name badge, IT can remotely "label" every iPad with the student's name and ID.

If someone finds a lost iPad in the library, they can just see the name on the screen and know exactly who to return it to, without needing to check complicated serial numbers or "social security" codes.

---

## File: dfu-mode.md

---

term: "DFU Mode (Device Firmware Update)"

## category: ["Hardware"]

## Term Definition

**DFU (Device Firmware Update)** mode is the lowest-level recovery state for an Apple device, sitting beneath the standard Recovery Mode.

Key characteristics:

- **Low-Level Access** : Bypasses the standard OS and the iBoot bootloader, allowing for a deep firmware reinstallation.

- **Physical Connection** : Requires the device to be plugged into a Mac running **Apple Configurator** or Finder via a USB cable.
- **Visual State** : In DFU mode, the device's screen remains **entirely black** , providing no visual feedback to the user.

This is the "nuclear option" for restoring a device that is severely corrupted, stuck in a boot loop, or completely unresponsive.

## Analogy

Think of this as **"Digital Open-Heart Surgery."** When a patient (the iPad) is completely unconscious and standard medicine (a restart or recovery) isn't working, they have to go to the specialized surgical theatre.

It is a deep-level reset used to bring a **"dead"** device back to life when everything else has failed, essentially rebuilding the device's "brain" from scratch.

---

## File: dhcp.md

---

term: "DHCP (Dynamic Host Configuration Protocol)"

## category: ["Network"]

## Term Definition

**DHCP** is a foundational network protocol that automates the assignment of IP addresses and other network parameters to devices.

How it works:

- **Discovery** : When a device connects to a network (Wi-Fi or Ethernet), it broadcasts a request for an address.

- **Lease** : The DHCP server "leases" a temporary IP address to the device from a pool.
- **Renewal** : The device periodically renews its lease to keep using that address.
- **Efficiency** : Prevents "IP conflicts" where two devices accidentally try to use the same address at the same time.

## Analogy

Think of this as a **"Valet Parking Attendant"** for the internet.

When you drive your car (your iPad) into the school's parking garage (the Wi-Fi network), the attendant automatically points you to an **available parking spot** (an IP address).

You don't have to wander around looking for an empty spot yourself, and you'll never accidentally try to park in a space that another car is already using. The attendant makes sure everyone has a place to park so they can join the party.

---

## File: directory-service.md

---

term: "Directory Service"

## category: ["Network"]

## Term Definition

A **Directory Service** is a centralized system used to store, organize, and manage identity information such as users, devices, groups, and access permissions within an organization.

It serves as the authoritative source for answering:

- Who a user is

- Which organization or department they belong to
- What resources they are allowed to access

### Common Implementations

- **Microsoft Active Directory (AD)**
- **LDAP (Lightweight Directory Access Protocol)**
- **Cloud-based Identity Services**
  - Azure AD (Entra ID)
  - Google Workspace
  - Okta

### Integration with MDM

When integrated with a **Mobile Device Management (MDM)** system, a Directory Service allows users to enroll devices and access organizational resources using their existing credentials.

This enables:

- Centralized authentication

- Automatic assignment of apps and configurations based on group or role
- Immediate revocation of access across all managed devices when a user leaves the organization

## Analogy

A Directory Service is like an organization's **"Master Registry"**.

It maintains an official record of every member—who they are, which department they belong to, and what permissions they have.

Whenever a user tries to log in to systems such as Wi-Fi, email, or MDM enrollment, those systems consult this central registry to verify identity and permissions, ensuring consistent access control and preventing unauthorized entry.

---

## File: dmg.md

---

term: "DMG (Disk Image)"

## category: ["macOS"]

## Term Definition

**DMG** is a proprietary Apple Disk Image file format used primarily for software distribution on macOS.

Key characteristics:

- **Mounting** : When opened, it behaves like a virtual external drive or CD-ROM appearing on the Desktop.

- **Compression** : Often compressed to save space during download.
- **Usage** : Typically used to deliver `.app` bundles. Users install software by dragging the application icon from the DMG into the `/Applications` folder.

In enterprise management, DMG files are often converted into **.pkg** files for automated deployment, as standard DMGs usually require manual user interaction to "drag and drop" the app.

## Analogy

Think of this as a **"Virtual Software CD."** Downloading a DMG is like being handed a digital disc. When you open it, your Mac "inserts" the disc, and a window pops up showing you what's inside.

Once you've copied the software onto your Mac's hard drive, you just "eject" the digital disc and throw the DMG file in the trash. It’s a clean and organized way to deliver a new tool to your computer.

---

## File: dns-over-https-tls.md

---

term: "DNS over HTTPS/TLS (DoH/DoT)"

## category: ["Network"]

## Term Definition

**DNS over HTTPS (DoH)** and **DNS over TLS (DoT)** are encrypted protocols designed to secure the "last mile" of a DNS query between a device and a DNS resolver.

Technical details:

- **DoH (Port 443)** : Encapsulates DNS queries within standard HTTPS traffic, making them indistinguishable from regular web browsing.

- **DoT (Port 853)** : Wraps DNS queries in a dedicated TLS tunnel.
- **Goal** : Prevents eavesdropping, tampering, and "Man-in-the-Middle" attacks by ISPs or malicious actors on public networks.

## MDM Context

While beneficial for privacy, DoH can be used to bypass school content filters. Solutions like **Jamf Safe Internet** utilize a managed DoH/DoT gateway to provide filtering while still maintaining high encryption standards.

## Analogy

Traditional DNS is like a **"Postcard"** —anyone handling the mail (like the ISP or a hacker on public Wi-Fi) can easily see exactly which website you are looking for. **DoH/DoT** is like placing that same request inside a **"Sealed Security Envelope."** The people handling the mail know you sent a message, but they have no way of knowing exactly which "address" you are looking for inside the envelope.

---

## File: dns.md

---

term: "DNS (Domain Name System)"

## category: ["Network"]

## Term Definition

**DNS** is the foundational "Address Book" of the internet that translates human-readable domain names into numeric IP addresses.

Functional roles:

- **Translation** : It turns `www.apple.com` into `17.172.224.47`.

- **Filtering** : Many school networks use "Filtering DNS" (like Jamf Safe Internet) to block access to malicious or inappropriate content at the name-resolution level.
- **MDM Control** : Administrators can force devices to use specific DNS servers via a Wi-Fi or Global HTTP Proxy payload.

## Analogy

This is the internet's **"Directory Assistance"** or **"GPS."** You know the name of the store you want to visit (e.g., "Apple Support"), but you don't know exactly where it's located (the IP Address). You "call" the DNS server, it gives you the specific coordinates, and then your device can navigate directly to the correct destination and load the website.

---

## File: domain-capture.md

---

term: "Domain Capture"

## category: ["Apple", "Security"]

## Term Definition

**Domain Capture** is a powerful security feature within **Apple Business/School Manager** that allows an organization to assert authority over its email domain.

Requirements and Outcomes:

- **Verification** : The organization must prove ownership of the domain (e.g., `@school.edu`).

- **Conflict Resolution** : If a user previously created a personal Apple ID using an official institutional email address, the organization can "capture" it.
- **Migration** : The affected user is notified and must either change the email address of their personal account (to a personal email like Gmail) or allow the account to be converted into an official **Managed Apple Account** .

## MDM Context

Domain Capture is a prerequisite for **Federated Authentication** . It ensures that no unauthorized personal accounts can exist using the school's official identity, preventing data confusion and improving security.

## Analogy

Think of this as an **"Official Property Claim."** If a student used their school uniform (the school email) to go and open a private locker at the local train station (a personal Apple ID), the school is now saying, "That uniform belongs to us."

The student must then decide to either move their private belongings to their own locker at home or give the key to the school to be officially managed as part of the school's inventory.

---

## File: drag-and-drop-multitasking.md

---

term: "Drag and Drop Multitasking"

## category: ["Core"]

## Term Definition

Introduced in **iPadOS 26.2** , this feature enhances the speed and fluidity of multitasking on the iPad.

Workflow improvements:

- **Direct Interaction** : Users can ahora drag app icons directly from the **Dock** or **Spotlight** search results onto the active screen.

- **Dynamic Layouts** : Dragging an icon results in the instant creation of **Split View** , **Slide Over** , or complex multi-window layers.
- **Productivity** : Reduces the number of taps and swipes needed to arrange a workspace for research, writing, or collaboration.

## Analogy

Think of this as **"Organizing your physical desk"** with one hand.

Instead of opening apps one by one, you can just grab a tool from your shelf (the Dock) and drop it right onto the table to start working side-by-side with what's already there. It makes using two or three apps at once feel as natural as moving papers around on a real desk.

---

## File: enforcement-deadline.md

---

term: "Enforcement Deadline"

## category: ["DDM"]

## Term Definition

An **Enforcement Deadline** is a critical component of **Declarative Device Management (DDM)** that ensures mandatory actions are completed by a specific time.

Operational logic:

- **Notification Phase** : As the set date and time approach, the device provides increasingly frequent and persistent notifications to the user.

- **Enforcement Phase** : Once the deadline passes, the user can no longer dismiss or postpone the action (such as a software update).
- **Automation** : The device executes the task autonomously based on the server's declaration, ensuring fleet-wide compliance with security patches.

## MDM Context

Enforcement Deadlines are used for critical security remediations, such as mandatory macOS/iOS updates, to ensure 100% compliance without manual IT intervention or constant server polling.

## Analogy

Think of it as a **"Library Book Due Date."**

- One week before it's due, you get a gentle reminder.

- One day before, you get a more urgent alert.
- Once the **deadline** hits, the library "locks your account" or applies a fine until the book is returned.

Enforcement Deadlines ensure that critical rules are followed on time across the entire school, so no one is left vulnerable to old bugs.
