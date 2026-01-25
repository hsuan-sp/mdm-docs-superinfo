---
File: hw-1.md
---

---

id: hw-1

title: "We have both older Lightning iPads and newer USB-C models. How do we manage accessories and Apple Pencils?"

category: "Section 6: Hardware & Maintenance"

important: true

tags:
[
"Hardware Compatibility",

    "Lightning",

    "USB-C",

    "Apple Pencil",

    "Charging Carts",

## ]

**As your school transitions to newer hardware, managing a mixed fleet of Lightning (iPad 9 and older) and USB-C (iPad 10 and newer) devices requires careful planning regarding peripherals and charging infrastructure.**

## Apple Pencil Compatibility:

1. **iPad 9 (Lightning)**: Only compatible with **Apple Pencil (1st Generation)**. It pairs by plugging the pencil directly into the iPad's Lightning port.
2. **iPad 10 (USB-C Base Model)**:
   - **Using 1st Gen Pencil**: Requires the **"USB-C to Apple Pencil Adapter."** Because this adapter is small and easily lost, we recommend teachers manage these centrally.
   - **Using USB-C Pencil**: Pairs via a USB-C cable. Note that this model _does not_ support pressure sensitivity.

3. **iPad Pro/Air (M-series Chips)**:
   - **Major Change**: These high-end models use a different magnetic structure and **do not support Apple Pencil (2nd Gen)**.
   - **Compatible**: Only **Apple Pencil Pro** (recommended for "Find My" support) or **Apple Pencil (USB-C)**.

## Charging Cart & Cable Management:

1. **Zoning the Cart**: We strongly recommend "Hard-wiring" regions of your charging carts. For example, dedicate slots 1-15 for Lightning cables (Year 5) and slots 16-30 for USB-C cables (Year 6). Use clear external labels to guide students.
2. **Cable Quality**: USB-C carries higher power and uses complex protocols. Ensure you use certified, high-quality cables. Poor-quality cables are the leading cause of "ghost touching" and charging IC failures in classroom environments.
3. **Avoid Adapters**: Do not use small "Lightning to USB-C" dongles inside a charging cart. Students often snap these off inside the iPad's port, leading to expensive repairs. Replacing the entire cable is a much more durable long-term solution.

## Institutional Advice:

Maintain a "Hardware Mapping Table" that matches device serial numbers to specific peripherals. When upgrading hardware, evaluate the total cost of ownership, including the required new adapters or Pencils.

---

## File: hw-2.md

---

id: hw-2

title: "An iPad isn't charging inside the cart. Is the device faulty or the cart?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Charging Issues", "Diagnostics", "Hardware Maintenance"]

**When an iPad fails to charge, we recommend a "Systematic Cross-Testing" approach to isolate the failure point between the device, the cable, and the cart’s power module.**

## Cross-Testing Workflow:

### Stage 1: Slot and Cable Test

1. Move the non-charging iPad to a **known working slot** in the cart (one that successfully charged another iPad).
2. Wait 30 seconds. Does the "Lightning bolt" icon appear in the status bar?
   - ✅ **If it charges**: The original cable or the power brick for that specific slot is likely faulty.
   - ❌ **If it still doesn't charge**: Move to Stage 2.

### Stage 2: Independent Power Test

1. Remove the iPad from the cart and use a **trusted standalone 20W charger** and cable (direct to a wall outlet).
2. Connect it directly to a wall power outlet.
   - ✅ **If it charges**: The issue is with the cart’s internal power distribution or a tripped breaker.
   - ❌ **If it still doesn't charge**: The issue is almost certainly a **hardware failure on the iPad**.

### Stage 3: Physical Inspection

- **Port Check**: Use a flashlight to inspect the Lightning or USB-C port for lint, dust, or student-inserted debris. Carefully clear it using a non-conductive tool (like a wooden toothpick) or compressed air.
- **Deep Discharge**: If an iPad has been dead for months, the battery voltage may be critically low. Keep it plugged into a high-wattage wall charger for at least **60 minutes** before declaring it a hardware failure.

## Institutional Advice:

- **Warranty**: If the device is found to be faulty (e.g., a burned-out charging IC), verify its warranty status before sending it for repair.
- **Spare Parts**: Cables are consumables. IT departments should keep a 5-10% stock of spare cables to quickly swap out damaged ones in classroom carts.

---

## File: hw-3.md

---

id: hw-3

title: "AirDrop won't find other devices, or AirPlay can't see the classroom Apple TV. Why?"

category: "Section 6: Hardware & Maintenance"

important: true

## tags: ["AirDrop", "AirPlay", "Network Management", "mDNS", "Troubleshooting"]

**AirDrop and AirPlay operate differently: AirDrop uses Peer-to-Peer communication, while AirPlay relies heavily on your campus network configuration.**

## AirDrop Troubleshooting (Point-to-Point):

1. **Interface State**: AirDrop requires both Bluetooth (for discovery) and Wi-Fi (for transfer). Even if there is no internet, Wi-Fi must be toggled ON.
2. **Privacy Settings**: Since iOS 16.2, "Everyone" mode automatically reverts to "Contacts Only" after 10 minutes. Ensure the recipient has manually re-enabled "Everyone" for the transfer.
3. **Physical Interference**: In crowded classrooms with many devices, Bluetooth discovery can be inconsistent. Ensure devices are within 3 meters and have a clear line of sight.

## AirPlay Troubleshooting (Network-Based):

1. **VLAN Consistency**: This is the most common campus issue. If a teacher’s iPad is on the `Staff-Wi-Fi` network but the Apple TV is on the `Student-IoT` network, and those networks are isolated, AirPlay packets cannot find their destination.
2. **Multicast/mDNS Filtering**: AirPlay uses the **Bonjour (mDNS)** protocol on UDP port 5353. If the school’s wireless access points have "Client Isolation" enabled, or if the firewall blocks Multicast traffic, the Apple TV won't appear in the list.
3. **Network Optimization (mDNS Gateway)**: For complex campus networks with multiple VLANs, IT should enable an **mDNS Gateway (or Bonjour Proxy)** on the core switch or firewall. This allows discovery packets to "jump" across different network segments.

## Institutional Advice:

If AirPlay issues occur frequently in specific rooms, check the wireless load. When an Access Point (AP) is overloaded with 40+ devices, it will often drop low-priority mDNS discovery packets first, causing the "list of TVs" to appear empty.

---

## File: hw-4.md

---

id: hw-4

title: "The screen is cracked or the touch response is failing. How is warranty vs. accidental damage determined?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Warranty Policy", "VMI", "Inspection Standards", "Repairs"]

**Apple hardware inspections follow the "Visual Mechanical Inspection (VMI)" standard to determine if a repair is covered by the limited warranty or considered out-of-warranty accidental damage.**

## How Damage is Classified:

| Symptom                       | Classification        | Diagnostic Standard                                                                                                                |
| :---------------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Single Hairline Crack**     | **Warranty**          | A single, thin crack with **no visible impact point**. This is often treated as a manufacturer’s defect in the glass stress.       |
| **Spiderweb/Multiple Cracks** | **Accidental Damage** | Multiple cracks originating from a central impact point. This is considered user-inflicted damage.                                 |
| **Enclosure Bending**         | **Accidental Damage** | If the iPad frame is warped or dented, it is considered out-of-warranty damage, even if the screen is intact.                      |
| **Black Ink Spots (LCD)**     | **Accidental Damage** | Localized pressure has "leaked" the liquid crystal inside. This is almost always caused by heavy items being placed on the screen. |
| **Touch Failure (No Damage)** | **Warranty**          | If the device is physically perfect but doesn't respond to touch, it is usually replaced as a hardware defect.                     |

## Institutional Repair Options:

1. **Official Repair (Replacement)**: Apple typically replaces the entire unit rather than repairing the screen. This ensures the device maintains its security and water-resistance standards.
2. **Third-Party Repairs**: While cheaper, using non-authorized repair shops **voids the remaining original warranty** and may cause compatibility issues with MDM commands later.
3. **Disabling Activation Lock**: Before sending any device for repair, IT must send the **"Disable Activation Lock"** command via Jamf Pro. Apple cannot service a device that is locked to a user's account.

## Institutional Advice:

We recommend that schools maintain an "Internal Insurance Fund" or accidental damage protection (like AppleCare+ for Schools) to cover the high cost of screen replacements, which can often be up to 60-80% of the cost of a new device.

---

## File: hw-5.md

---

id: hw-5

title: "How should we store iPads during the summer break to prevent battery damage?"

category: "Section 6: Hardware & Maintenance"

important: true

## tags: ["Battery Health", "Storage", "Summer Break", "Prevention"]

**To protect the long-term health of your iPad's lithium-ion battery during extended breaks, you should follow the "50% Power + Full Shutdown" rule.** Storing a device improperly for 2-3 months can lead to "Deep Discharge," where the battery becomes chemically unable to hold a charge ever again.

## The Three Golden Rules for Storage:

1. **Charge to ~50%**:
   - **Do not store at 0%**: This can lead to the battery falling into a deep discharge state, making the device impossible to turn on come September.
   - **Do not store at 100%**: Keeping a battery at maximum capacity for months can cause it to lose some of its total lifespan permanently.

2. **Power Off Completely**:
   - After reaching 50%, go to **Settings > General > Shut Down**. This ensures the device isn't slowly draining power while sitting in the cart.

3. **Cool, Dry Environment**:
   - Store the iPads (and the charging cart) in a temperature-controlled room. Excessive heat (like a non-air-conditioned classroom in the height of summer) accelerated chemical degradation.

## Operational Advice for IT:

Before the final day of the term, send a message to all students/teachers asking them to leave their devices at ~50% charge before handing them in. When you move the devices to storage, verify they are fully powered off to ensure a smooth "Back to School" experience with minimal "dead" hardware.

---

## File: hw-6.md

---

id: hw-6

title: "How do I handle 'Ghost Touch' or issues with auto-rotation on the screen?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: false

tags:
[
"Touch Issues",

    "Gyroscope",

    "Accelerometer",

    "Ghost Touch",

    "Troubleshooting",

## ]

**'Ghost Touch' (erratic touch input) typically involves Electromagnetic Interference (EMI) or a damaged digitizer layer. Auto-rotation issues are usually related to hardware failure of internal sensors (accelerometer and gyroscope).** These issues directly impact the usability of the device. Administrators should distinguish between software settings, environmental interference, and pure hardware failure before deciding on a repair.

## Part 1: Troubleshooting Ghost Touch

1. **Eliminate Electrical Noise and EMI**:
   - **Common Cause**: Using non-original cables or unstable charging carts can generate "ripple noise" that interferes with the screen's capacitive sensor, causing erratic touches.
   - **The Big Test**: **Unplug all charging cables.** If touch returns to normal while running strictly on battery, the problem lies with the charging equipment (cables or the PDU module in the cart). Switch to MFi-certified cables or inspect the cart.

2. **Physical Cleaning and Pressure Check**:
   - **Cleaning**: Ensure the screen edges are free from sweat, oils, or liquid seepage.
   - **Case Pressure**: Check if a rugged case is too tight or if a screen protector is damaged at the edges, as this can transmit constant "false" pressure signals to the digitizer.

3. **Hard Reset**:
   - **iPad 9th Gen (with Home Button)**: Press and hold the Top button and the Home button until the Apple logo appears.
   - **iPad 10th Gen (no Home Button)**: Press and release Volume Up, press and release Volume Down, then press and hold the Top button until the logo appears.

## Part 2: Determining Sensor Hardware Failure (Rotation)

If the iPad screen won't rotate with the device, check the following in order:

1. **Control Center Lock**: Ensure the "Rotation Lock" icon (a lock with a circular arrow) is not highlighted in red.

2. **MDM Restriction Check**: Admins should verify that a **Restrictions** profile in Jamf Pro hasn't accidentally enabled "Lock Screen Orientation," which would disable rotation for all scoped devices.
3. **Sensor Self-Diagnosis**:
   - **Logic**: Rotation relies on the internal **Accelerometer** and **Gyroscope**.
   - **Test Method**: Open the built-in **Compass** app. If the needle is completely frozen, or the level feature doesn't react to tilt, the internal sensor hardware is likely damaged.

## Practical Advice: Repair Strategy

- **When to Repair**: If Ghost Touch persists after removing external power and cleaning, or if the Compass app is unresponsive, it typically indicates a damaged **digitizer layer** or **logic board sensor**.
- **Contract Coverage**: Provided there is no obvious physical damage or screen cracks, these issues are generally considered natural hardware failures. Contact support immediately to facilitate repair or replacement under your project's warranty.

---

## File: hw-7.md

---

id: hw-7

title: "Must 'Find My' be turned off before repair? How?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: true

## tags: ["Repair", "Find My", "Activation Lock", "Maintenance", "Activation Lock"]

**Yes, this is almost always a requirement for repair. Failure to disable 'Find My' triggers 'Activation Lock,' which prevents service centers from performing the necessary diagnostics or parts replacement, leading to the device being returned unrepaired.**

Based on how the device is managed in your school, follow the appropriate method:

## Option 1: Admin Remote Unlock via Jamf Pro (Recommended)

If the device is Supervised, the administrator has the highest authority and can handle this remotely:

1. Locate the device in Jamf Pro.

2. Send the **"Disable Activation Lock"** command.
3. **Effect**: Even if a student is logged in with a personal account, this command overrides the lock on Apple's servers, allowing for repair.

## Option 2: Student Manually Turns Off on iPad

1. Go to **Settings > [User Name] > Find My**.
2. Tap **"Find My iPad"** and toggle it OFF.
3. The system will require the password for that Apple ID.

## Option 3: Web-Based Remote Removal

If the device screen is broken and unusable:

1. Ask the student to log in at [iCloud.com/find](https://www.icloud.com/find).

2. Select the specific iPad from "All Devices".
3. Click **"Remove from Account"**.
4. **Note**: Do _not_ select "Erase iPad," as this can complicate the post-repair setup.

## Institutional Advice:

When collecting devices for repair, the IT lead must verify that every unit sent to the vendor has been "Removed from Account." Failure to do so can cause repair delays of several weeks.

---

## File: hw-8.md

---

id: hw-8

title: "Can I clean the iPad screen with alcohol? Is there a risk of damage?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: true

tags:
["Cleaning", "Maintenance", "Disinfection", "Alcohol", "Oleophobic Coating"]

---

**Yes, Apple explicitly allows the use of specific alcohol concentrations to clean iPads. According to the latest official guidelines, you can use 70% Isopropyl Alcohol, 75% Ethyl Alcohol, or disinfectant wipes on the hard, non-porous surfaces of the device.**

In a classroom environment with multiple users, a proper disinfection routine is essential. Here is the Standard Operating Procedure (SOP) based on Apple's recommendations:

## 1. Approved Cleaning Agents:

- **70% Isopropyl Alcohol (IPA) wipes**.
- **75% Ethyl Alcohol wipes**.
- **Clorox Disinfecting Wipes**.
- **A soft, lint-free microfiber cloth dampened with water** (for basic cleaning only).

## 2. Prohibited Substances & Tools:

- ❌ **Bleach** or products containing **Hydrogen Peroxide**.
- ❌ **Window cleaners or household detergents**.
- ❌ **Aerosols, solvents, or abrasives**.
- ❌ **Compressed air** sprayed directly into openings (can damage microphone or speaker membranes).
- ❌ **Rough fabrics, paper towels, or napkins** (may cause micro-scratches).

## 3. Standard Cleaning Steps:

1. **Power Down**: Unplug all external power, accessories, and cables, and turn off the iPad.
2. **Spray the Cloth**: **Never spray cleaners directly onto the iPad.** Spray the alcohol onto a soft, lint-free microfiber cloth until it is "slightly damp."
3. **Wipe Gently**: Avoid excessive wiping, which may cause damage. Avoid any openings (such as the charging port, speakers, or microphone holes) to prevent liquid from entering the interior.
4. **Accessory Cleaning**: The body of an Apple Pencil (USB-C) can be wiped with a dampened cloth, but **do not wipe the tip itself or allow liquid to enter the USB-C connector.**

## 4. Risk Warnings and Material Differences:

- **Oleophobic Coating**: iPad screens have an oil-resistant coating that naturally wears over time. While alcohol is allowed, frequent or excessive cleaning will accelerate the degradation of this coating.
- **Nano-texture Models (Special Note)**: If your iPad Pro (M4) is equipped with **Nano-texture glass**, only use the dedicated polishing cloth provided by Apple. For stubborn grime, you may dampen the cloth with 70% IPA.
- **Leather and Fabric Accessories**: **Stay away** from alcohol on official Apple leather, FineWoven, or Smart Folio fabrics, as it will cause discoloration or material damage.

## Practical Advice:

For school-wide management, we recommend placing a dedicated microfiber cloth in each charging cart and having teachers manage the alcohol spray to ensure students don't spray liquid directly into the devices, which could cause internal hardware damage (liquid damage is not covered under Apple's standard warranty).

---

## File: hw-9.md

---

id: hw-9

title: "The Smart or Magic Keyboard is not responding. How do I troubleshoot it?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: false

tags:
[
"Keyboard",

    "Smart Connector",

    "Magic Keyboard",

    "Hardware Compatibility",

    "Troubleshooting",

## ]

**Keyboard failures typically stem from model incompatibility, oxidized contacts, or physical misalignment of the magnets. Since original Apple keyboards do not require Bluetooth pairing, if cleaning doesn't work, it usually involves a hardware circuit failure.**

In a 2026 classroom environment where iPad 9th, 10th, and 11th generations coexist, the keyboard structures are not always interchangeable. Follow these professional steps to troubleshoot:

## Phase 1: Verify Physical Compatibility (Core Check)

- **iPad 9th Gen**: Only supports the **Smart Keyboard** using a Lightning-based connector on the vertical side.
- **iPad 10th / 11th Gen**: Only supports the two-piece **Magic Keyboard Folio**, which uses Smart Connector pins on the horizontal side.
- **Warning**: Forcing an iPad 9th Gen keyboard onto a newer model will not work; the magnets and electronic protocols are fundamentally different.

## Phase 2: Deep Cleaning the Smart Connector

1. **Inspect Contacts**: Locate the three circular metal pins on the iPad (either side or back) and the corresponding pins on the keyboard.
2. **Remove Oxidation**: Use a **70% Isopropyl Alcohol wipe** to gently clean the metal contacts. If there is visible discoloration, you can use a clean pencil eraser to gently rub the metal surface, then wipe clean with a microfiber cloth.
3. **Remove Debris**: Ensure no metallic debris (like staple bits or pencil lead shavings) is stuck in the magnetic channel, which could cause a short circuit or poor contact.

## Phase 3: Installation and Software Check

1. **Reseat**: Completely remove the iPad from the keyboard case and reinstall it. For the Magic Keyboard Folio, ensure both the back panel and keyboard are properly aligned.
2. **Remove Interference**: Some third-party cases or extra-thick screen protectors may prevent the Smart Connector from making a solid connection. Try testing without any case.
3. **Hard Reset**:
   - **iPad 9th Gen**: Hold the Power and Home buttons.
   - **Newer Models**: Press Vol Up, Vol Down, then hold Power until the Apple logo appears.

## Phase 4: Administrator Cross-Testing

- **Cross-Validation**: Try a known-working keyboard of the same model with the iPad.
- If it still doesn't work, the **iPad's internal Smart Connector IC** is likely at fault.
- If it works with a different keyboard, the **internal ribbon cable** of the original keyboard is likely broken (common at the hinge).
- **Repair Reminder**: Apple keyboards are covered under the project's hardware warranty. If there are no signs of accidental damage (like spills or tears) before the 2026 warranty expires, contact your vendor for a replacement.

## Practical Advice:

If an original keyboard is out for repair, IT staff can temporarily issue a standard **Bluetooth keyboard** to maintain instructional continuity.

---

## File: hw-10.md

---

id: hw-10

title: "Apple Pencil won't pair or write?"

category: "Section 6: Hardware Maintenance & Troubleshooting"

important: false

## tags: ["Apple Pencil", "Pairing", "Stylus"]

**Apple Pencil issues can usually be solved by re-pairing, tightening the tip, or charging. Different generations have different pairing and charging methods.**

The Apple Pencil has four main versions as of 2026:

| Generation                 | Pairing / Charging Method                                   | Compatibility                                              | Key Features                                   |
| :------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------- | :--------------------------------------------- |
| **Apple Pencil (1st Gen)** | Plug into iPad Lightning port to pair; charge via Lightning | iPad (6th-10th Gen), mini (5th), Air (3rd), Pro (pre-2018) | Pressure & Tilt sensitivity                    |
| **Apple Pencil (2nd Gen)** | Magnetic attachment to side                                 | iPad mini (6th), Air (4th-5th), Pro (2018-2022)            | Double-tap, Wireless charging                  |
| **Apple Pencil (USB-C)**   | Pair and charge via USB-C cable                             | USB-C iPads (including M4 iPad Pro)                        | No pressure sensitivity                        |
| **Apple Pencil Pro**       | Magnetic attachment to side                                 | M4 iPad Pro, M2/M3 iPad Air, iPad mini 7                   | Squeeze, Barrel roll, Haptic feedback, Find My |

## Troubleshooting Steps:

1. **Check Battery Level**:
   - **1st Gen**: Plug into iPad port.
   - **2nd Gen / Pro**: Attach magnetically to the side.
   - **USB-C**: Connect via cable.
   - Wait 10 minutes and check the "Batteries" widget on the iPad.

2. **Tighten the Tip**: A loose tip disrupts the signal. Gently twist the nib clockwise to secure it.

3. **Re-pair**:
   - Go to **Settings > Bluetooth**.
   - Find "Apple Pencil" in "My Devices".
   - Tap the **"i"** icon > **"Forget This Device"**.
   - Re-connect the Pencil to the iPad to pair again.

4. **Check Bluetooth**: Ensure Bluetooth is toggled ON.

## Institutional Advice:

If an Apple Pencil is left uncharged for more than 3 months (like over summer break), the tiny internal battery may enter "Deep Discharge" fail state. We recommend charging Pencils fully before storing them separately from iPads during long breaks.

---

## File: hw-11.md

---

id: hw-11

title: "How do I check iPad battery health? Why can't I see this data in the MDM console?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Battery Health", "Longevity", "Troubleshooting", "Asset Management"]

**For base models like the iPad 9 and the later iPad 11 (A16), technical limitations prevent "Battery Maximum Capacity (%)" from being displayed directly in System Settings or the Jamf Pro console.** However, newer models released in 2024 (such as the M4 iPad Pro and M2/M3 iPad Air) now include a comprehensive Battery Health menu similar to the iPhone.

## 1. Check "Battery Usage History" (Most Reliable Indicator):

1. Go to **Settings > Battery**.
2. View the Last 24 Hours or Last 10 Days chart.
3. **Observe the Slope**: If the battery percentage curve shows a "cliff dive" or drops more than 20% in a short time while performing simple tasks (like browsing), significant chemical aging has occurred.
4. **Unexpected Shutdowns**: If the device shuts down suddenly while still showing 10-20% charge, this is a classic sign of battery failure.

## 2. Check Performance Throttling:

Go to **Settings > Battery > Battery Health & Charging**.

- **New Models (M4/M2)**: Displays "Maximum Capacity" and "Cycle Count" directly.

- **Older Models (iPad 9)**: If you see a message saying "This iPad has experienced an unexpected shutdown...", the system is actively throttling the CPU to prevent crashes due to a weak battery.

## 3. Use Jamf Pro's "Last Battery Level" Tracking:

In your Jamf Pro inventory, add the "Battery Level" column.

- **Method**: If a batch of devices finishes a charging cycle (should be 100%) but consistently reports less than 60% after just one class period, create a Smart Group to flag these units for inspection.

## 4. Advanced Management for 2024+ Models:

For the latest iPads, administrators can use a Restrictions Profile to enable the **"80% Charge Limit."** This is critical for devices stored in charging carts for long periods, as it significantly extends battery lifespan.

## Practical Advice:

Lithium batteries typically show noticeable degradation after **800-1,000 charge cycles**. For project devices that have been in use for three years, if battery life is severely impacting teaching, prepare for a repair or battery replacement service.

---

## File: hw-12.md

---

id: hw-12

title: "I heard that moisture exposure voids the warranty. Where is the iPad Liquid Contact Indicator (LCI)?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Liquid Damage", "LCI", "Moisture", "Repair Policy", "VMI"]

**Unlike the iPhone, no current iPad models (including the iPad 9th, 10th, and 11th generations) have an 'externally visible' Liquid Contact Indicator (LCI).** Moisture determination is made by authorized technicians after disassembling the device to inspect internal indicators.

## How Service Centers Determine Liquid Damage:

1. **Internal LCI Inspection**: During a **Visual Mechanical Inspection (VMI)** at an Apple Authorized Service Provider (AASP), technicians check LCI stickers placed on the logic board or near critical flex cables. If the sticker has turned **red** due to liquid contact, the device is classified as having liquid damage.

2. **External Secondary Indicators (Corrosion)**: Even if internal stickers aren't visible, technicians look for:
   - White powder or green corrosion on the charging port (Lightning/USB-C) or speaker meshes.
   - Liquid residue or "water spots" behind the screen assembly.

3. **Warranty Impact**: Liquid damage is not covered under the standard Apple one-year limited warranty. In most maintenance contracts, it is treated as accidental damage caused by the user.
   - **Disposal**: If localized repair is impossible, a "Paid Whole Unit Replacement" is required, typically costing around **NT$10,200** (subject to actual quote).

## Practical Advice & Prevention:

- **Storage Environment**: Avoid storing devices near water dispensers or in unventilated, high-humidity warehouses during breaks. Long-term exposure to extreme humidity can trigger internal LCIs even without direct liquid spills.
- **Cleaning Risks**: **Never spray cleaning liquids directly** onto the iPad screen or into any openings. Capillary action can pull liquid inside, leading to a "liquid damage" diagnosis during repair.
- **Pre-submission Check**: If an iPad fails to charge, visually inspect the port for discoloration or debris. Be honest when describing the issue to the service center to avoid disputes over repair quotes.

## Practical Advice: Summary

Since the determination lies entirely with the service center's internal inspection, report observed symptoms truthfully to avoid controversies arising from concealing moisture issues.

---

## File: hw-13.md

---

id: hw-13

title: "My iPad is lagging. Is it because of battery aging or old hardware?"

category: "Section 6: Hardware & Maintenance"

important: false

tags:
[
"Power Management",

    "Performance Throttling",

    "Hardware Aging",

    "Asset Replacement",

## ]

**iPad performance is a balance between battery health, software demands, and hardware degradation. As a device enters its 4th or 5th year, multiple factors combine to cause noticeable lag.**

For project devices (like iPad 9) showing lag in late 2025, assess using these dimensions:

## 1. Power Management Throttling:

When a lithium battery’s ability to provide peak power declines, iPadOS limits the CPU/GPU speed to prevent unexpected shutdowns during high-load tasks (like AR or video editing).

- **Symptoms**: Apps take longer to launch, scrolling stutters, and keyboard input lags.

- **Status**: If cycle count is high, the system may throttle performance for stability even if the charge percentage looks full.

## 2. Software Resource Evolution (Software Bloat):

Modern versions of iPadOS (OS 18/26) and teaching apps require significantly more RAM (Random Access Memory) than they did four years ago.

- **Hardware Bottleneck**: Base models with only 3GB of RAM (like iPad 9) frequently perform "Memory Swapping" when handling complex web content, which creates a "stuck" feeling for the user.

## 3. Physical Hardware Decay:

Besides the battery, internal **NAND Flash storage** has a finite number of write cycles. After thousands of read/write operations, latency increases. Additionally, motherboard components degrade over time under constant thermal cycles. This is irreversible physical aging.

## Recommended Troubleshooting Steps:

1. **Clear System Cache**: Go to **Settings > General > iPad Storage**. Ensure free space is greater than 10GB.
2. **Hard Restart**: Helps free up residual memory resources.
3. **Evaluate Replacement**: If running basic learning platforms or making slides feels significantly slow, the hardware spec may no longer support modern teaching needs.

## Practical Advice:

For iPads that have served over 4 years, schools should plan a "Tier 2" or "Retirement" program (e.g., repurposing them as library kiosks or admin-only single-app devices) and purchase new models with higher RAM and A/M series chips to maintain teaching quality.

---

## File: hw-14.md

---

id: hw-14

title: "Why can't our firewall see the iPad's real MAC address?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["MAC Address", "Private Wi-Fi Address", "Network Admin", "DHCP"]

**This is because iPadOS enables 'Private Wi-Fi Address' by default, generating a randomized virtual MAC address for each SSID.** This prevents commercial tracking but can break campus network systems that rely on "MAC Address Binding" for IP assignments or access control.

## Solution (via MDM):

Do not ask students to manually disable this. Instead, handle it centrally via Jamf Pro:

1. **Modify Profile**: Navigate to the **Wi-Fi Configuration Profile** assigned to students.

2. **Key Option**: In the Wi-Fi profile payload, check **"Disable MAC Address Randomization"**.
3. **Result**: When the device connects to that specific SSID, it will be forced to report its real hardware MAC address, allowing network infrastructure to identify the asset correctly.

## Why is this necessary?

- **Asset Auditing**: Network traffic logs can be matched precisely to physical serial numbers.
- **Security Tracing**: If improper network behavior occurs, the specific device can be located via its MAC address.
- **IP Assignment**: Ensures the DHCP server assigns the reserved static IP to the correct equipment.

## Important Note:

This setting only applies to the Wi-Fi network defined in the MDM profile. If students connect to a personal hotspot or home Wi-Fi, the system will still enable Private Address to protect their privacy—this does not affect school management.

---

## File: hw-15.md

---

id: hw-15

title: "How do I restrict USB/Thunderbolt drive access on macOS to prevent data leaks?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["macOS", "Disk Management", "Security", "USB Restrictions"]

**Starting with macOS 15, Apple introduced a new 'Media Management' framework that allows for granular control over external storage devices. macOS 26 (Tahoe) further strengthens this security.** Controlled USB access is vital in computer labs or administrative offices to prevent unauthorized file copying or malware injection.

## Important Background: macOS 26 (Tahoe) and Intel Mac End-of-Life:

- **Final Support**: macOS 26 is the **last supported version** for Intel-based Macs (announced WWDC 2025).
- **Eligible Models**: Only four Intel Macs can upgrade: 16" MacBook Pro (2019), 13" MacBook Pro (2020), iMac (2020), Mac Pro (2019).
- **Future**: Starting with macOS 27 (2026), only Apple Silicon is supported. Intel Macs get security updates until 2028.
- **Strategy**: Plan for Apple Silicon upgrades for computer labs.

## Implementation Strategies in Jamf Pro:

1. **Read-Only Mode**:
   - Set external drives to read-only. Students can read teaching materials from a flash drive but **cannot copy files out** of the computer.

2. **Full Block**:
   - For high-security administrative Macs, you can disable the mounting of external storage devices entirely.

3. **Thunderbolt Accessory Security**:
   - On Apple Silicon (M-series) Macs, you can restrict new Thunderbolt accessories to require "User Approval" or "Admin Authorization" for data transfer, preventing attacks.

## Practical Advice:

For Mac computer labs, administrators can create a Smart Group that automatically applies a "Block External Disks" profile during exam times, and reverts to normal read/write permissions afterwards.

---

## File: hw-16.md

---

id: hw-16

title: "Will the Apple Pencil break if left in its tray for 3 months without charging?"

category: "Section 6: Hardware & Maintenance"

important: true

## tags: ["Apple Pencil", "Battery Maintenance", "Deep Discharge", "Hardware Life"]

**There is a risk of damage. Apple Pencils use tiny lithium-polymer batteries. If left at 'zero' or 'low' charge for an extended period, they can experience 'Deep Discharge,' rendering them unable to take a charge again.** This is a common cause for support tickets after summer or winter breaks.

## Risk Factors & Diagnosis:

- **Tiny Capacity**: Because the battery is so small, self-discharge is more impactful.
- **Safety Lock**: If voltage drops below a safe threshold, the battery's protection circuit "locks" the battery for safety. Symptoms include the pencil being warm when plugged in but showing 0% charge, or failing to pair via Bluetooth.

## Practical Maintenance Tips (SOP):

1. **Pre-Holiday SOP**:
   - **1st Gen / USB-C (Wired)**: Fully charge it, then store it separately from the iPad.
   - **2nd Gen / Pencil Pro (Magnetic)**: **Warning**: If the iPad is powered off and unplugged, the pencil attached to its side will continue to slowly drain power from the iPad to monitor the magnetic signal. Fully charge the pencil and **store it separately** from the iPad.
   - **Apple Pencil Pro Benefit**: These support the "Find My" network. Even if stored separately, you can still locate them via the Find My app after the break.

2. **Mid-Break Check**: If storing for over 2 months, try to give the pencil a 15-minute "top-off" charge once to keep the chemistry active.

3. **Troubleshooting**: If a pencil is unresponsive after a break, leave it charging for at least **30-60 minutes**. Waking a deeply discharged battery takes significantly longer than normal charging.

## Practical Advice:

For a Pencil that is confirmed dead (won't charge) and is within the warranty period (without physical damage), you can usually claim a hardware failure replacement.

---

## File: hw-17.md

---

id: hw-17

title: "Can I see device warranty expiration dates directly in the MDM console?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Warranty", "Asset Management", "GSX", "Extension Attributes"]

**Yes. Jamf Pro integrates with Apple’s Global Service Exchange (GSX) database to automatically pull 'Limited Warranty' status for every device.** This is extremely helpful for auditing the Digital Initiative fleet in 2026.

## How to View:

1. **Individual**: Search for a specific device in Jamf Pro > **Purchasing** tab.
2. **Field Interpretation**:
   - **Warranty Expires**: The date Apple’s official system shows the warranty ends.
   - **AppleCare ID**: Shows the contract number if you have AppleCare+.

## The 'Project Warranty' Blind Spot:

In many MOE projects, schools receive a 4-year warranty. If this extra coverage is provided by a **"Reseller agreement"** rather than official AppleCare+:

- **Symptom**: Jamf may show the warranty as "Expired" (because it only sees the original 1-year Apple warranty).

- **Fix**: You must record the project-specific dates. Use **Extension Attributes** in Jamf Pro to create a custom field titled "Project Warranty End Date" and batch-upload the correct contract dates.

## Practical Advice: Recommended Workflow

- **Advanced Search**: Create a search criteria for **"Warranty Expiration"** is **"Before [Date]"** (e.g., today or end of semester).
- **Usage**: Quickly generate a "Repair Priority List" to ensure all faulty hardware is fixed before the contract expires.

## Monitoring Strategy:

In the final year (2026), export this warranty report monthly. If any device approaching expiration shows signs of battery aging or screen flicker, initiate the repair process immediately.

---

## File: hw-18.md

---

id: hw-18

title: "How do I enable Wi-Fi 6E 160MHz on iPad Pro and Mac? Why isn't my speed improving?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Wi-Fi 6E", "160MHz", "Network Velocity", "iPadOS 26", "macOS Tahoe"]

**iPadOS 26.2 and macOS Tahoe 26.2 unlock support for 160 MHz bandwidth on compatible Wi-Fi 6E hardware, significantly increasing throughput.** M5 devices launched in 2025 further support Wi-Fi 7, offering higher speeds and lower latency. If your speeds haven't improved, it is likely an Access Point (AP) configuration or interference issue.

## Enabling Conditions:

### Wi-Fi 6E (160 MHz) Support

1. **Compatible Hardware**:
   - iPad Pro 11"/13" (M2, M4 chips)
   - MacBook Pro (M2 Pro/Max, M3, M4 series)
   - Mac mini (M2 Pro, M4)

2. **OS Version**: Must be updated to **iPadOS 26.2** or **macOS Tahoe 26.2** or later.
3. **Access Point (AP)**:
   - Must support **802.11ax 6 GHz**.
   - Must constitute **160 MHz** channel width on 6 GHz (configured by network admin).
   - Security must be **WPA3** (Mandated by Wi-Fi 6E specs).

### Wi-Fi 7 Support (2025+ Models)

1. **Supported Devices**:
   - **M5 iPad Pro** (11"/13", released Oct 2025)
   - **M5 MacBook Pro** (14", released Oct 2025)
   - **iPhone 16 Series** (Sep 2024, first Apple devices with Wi-Fi 7)

2. **Note**:
   - **M4 Series Devices** (2024-2025 MacBook Air/iMac/Mac mini) only support Wi-Fi 6E, not Wi-Fi 7.
   - Wi-Fi 7 requires compatible APs and routers; current campus deployments are mostly Wi-Fi 6/6E.

## Troubleshooting: Why is it still slow?

- **Reason 1: Connected to 5 GHz instead of 6 GHz (Wi-Fi 6E)**
  - Many schools use Band Steering on a single SSID. If the 6 GHz signal is weak, the device drops back to 5 GHz.
  - **Solution**: Set a dedicated 6 GHz SSID (e.g., `School-6E`) for high-performance needs.

- **Reason 2: Hardware supports Wi-Fi 7 but AP is only Wi-Fi 6/6E**
  - If you bought M5 iPad Pros but the APs are older, they will downgrade connection speed.
  - **Solution**: Evaluate if infrastructure upgrade to Wi-Fi 7 APs is needed.

- **Reason 3: WPA3 Compatibility**: Wi-Fi 6E forces WPA3. Old RADIUS servers may reject the connection.
- **Reason 4: Ethernet Bottleneck**: If the AP's uplink port is only 1 Gbps, 2.4 Gbps Wi-Fi is bottlednecked. Upgrade to **2.5 GbE or 10 GbE** switches.

---

## File: hw-19.md

---

id: hw-19

title: "How do I avoid AirPods pairing confusion in Shared iPad environments? Does iOS 26 fix this?"

category: "Section 6: Hardware & Maintenance"

important: true

## tags: ["AirPods", "Beats", "Pairing", "Shared iPad", "Audio Accessories"]

**iOS 26 finally solves the Bluetooth headset nightmare for Shared iPads! A new 'Audio Accessory Configuration' allows for 'Ephemeral Pairing' that doesn't sync to iCloud, perfectly solving the chaos in shared environments.**

## The Old Problem (Prior to v26):

When Student A paired their personal AirPods to a Shared iPad:

1. The pairing record was written to their "Managed Apple Account."

2. When Student B logged in later, the iPad might try to automatically connect to Student A's AirPods in the next classroom due to residual Bluetooth cache.
3. Or Student A goes home and finds their headphones keep trying to reconnect to the school iPad.

## The iOS 26 Solution: Ephemeral Pairing

MDM can now push the `com.apple.configuration.audio-accessory.settings` payload:

- **Function**: Allows pairing of AirPods/Beats but **blocks** writing that data to the iCloud Keychain.

- **Result**:
  - Once the student **Logs out**, the iPad immediately "forgets" the headset.
  - The headset doesn't "remember" the iPad as its primary owner.
  - Every use session is treated as a clean, one-time connection.

## Configuration Advice:

- If your school provides headsets for language labs or allows students to bring their own Bluetooth buds, **enable this setting immediately**.
- It will drastically reduce "Teacher, I'm hearing someone else's music!" support tickets.

## Note:

This feature requires compatible headset firmware and iPadOS 26. We recommend testing one pair to confirm the "auto-disconnect on logout" behavior before full deployment.

---

## File: hw-20.md

---

id: hw-20

title: "Students are reporting the screen looks 'Blurry' (Liquid Glass Design). How do I handle this?"

category: "Section 6: Hardware & Maintenance"

important: false

## tags: ["Liquid Glass", "UI Design", "iOS 26", "macOS Tahoe", "visionOS"]

**This is usually not a hardware failure! The 'Liquid Glass' design language introduced in iOS 26 uses heavy 'Frosted Glass' and 'Depth of Field' effects that can be mistaken for a foggy or defective screen.**

## How to tell if it's a design effect:

1. **The Screenshot Test**:
   - Have the student take a screenshot (Power + Volume Up).
   - View the screenshot in the Photos app. If the image is sharp but the screen physically looks blurry ➡️ **Hardware failure (NAND/Panel)**.
   - If the image inside the screenshot is blurry (e.g., the Lock Screen background) ➡️ **Software effect**.

2. **Check Liquid Glass Settings**:
   - Go to **Settings > Display & Brightness > Appearance**.
   - Check the **"Liquid Glass Transparency"** setting. If set too high, backgrounds will be extremely blurred.

## How to Resolve:

- **Case A: Software Intent (Normal)**
  - Explain to the student that this is the new iOS 26 style (similar to visionOS).
  - If it impacts readability, go to **Accessibility > Display & Text Size** and turn on **Reduce Transparency**. This disables the Liquid Glass effect and returns to solid backgrounds.

- **Case B: Hardware Failure**
  - If the screenshot is sharp but the physical view is blurry, and a restart doesn't fix it, the screen coating may be delaminating or the panel may be failing. Report for repair!

## Defensive Management:

When upgrading to **iOS 26**, spend 2 minutes during homeroom explaining that "Looking a bit blurry on the Lock Screen is the new style." This will prevent a flood of false repair reports.

---

## File: hw-21.md

---

id: hw-21

title: "2024-2025 iPad Hardware Differences: M4 Pro, M2/M3 Air, iPad mini 7 (A17 Pro)."

category: "Section 6: Hardware & Maintenance"

important: true

## tags: ["Hardware Specs", "M4", "M2", "A17 Pro", "Procurement", "Compatibility"]

**Newer iPads released in 2024–2025 feature significant hardware and management upgrades, specifically regarding Pencil compatibility, battery health, and high-speed networking.**

## Core Hardware Differences:

| Feature          | iPad 9 (Digital Initiative) | New iPad Pro (M4)           | New iPad Air (M2)      | iPad mini 7 (A17 Pro)  |
| :--------------- | :-------------------------- | :-------------------------- | :--------------------- | :--------------------- |
| **Processor**    | A13 Bionic                  | **M4 (High AI Perf)**       | M2                     | A17 Pro                |
| **Screen**       | 10.2" LCD                   | **Ultra Retina XDR (OLED)** | Liquid Retina (LCD)    | 8.3" Liquid Retina     |
| **Port**         | Lightning                   | **Thunderbolt / USB 4**     | USB-C (10Gbps)         | USB-C (10Gbps)         |
| **Front Cam**    | Portrait Top                | **Landscape Center**        | **Landscape Center**   | Portrait Top           |
| **Apple Pencil** | 1st Gen                     | **Pencil Pro / USB-C**      | **Pencil Pro / USB-C** | **Pencil Pro / USB-C** |

## Management and Hardware Upgrades:

### 1. Advanced Battery Health Management

- **Exclusive Feature**: Only on M2/M4/A17 Pro models, "Cycle Count" and "Maximum Capacity" are visible.
- **Charge Limit**: Can be forced to **"80% Limit"**, which significantly extends battery life for devices stored in charging carts.

### 2. Apple Intelligence Support

- **Requirement**: Must be M1 chip or newer, or A17 Pro or newer.
- **Advice**: Create a Smart Group (Criteria: Chip contains M or A17) to scope AI restrictions or guides specifically to these high-end models.

### 3. Apple Pencil Pro Tracking

- **Find My**: The new Pencil Pro supports the "Find My" network. Admins can require teachers to bind the pencil to their "Managed Apple Account," drastically reducing loss rates.

## Procurement & Deployment Advice:

- **Color Coded Accessories**: Since Pencil Pro is incompatible with older models, we recommend using color-coded stickers (e.g., Metallic Blue) on both the new iPad and its Pencil to avoid mix-ups.
- **Charging Infrastructure**: M4 iPad Pro supports PD fast charging. Ensure your charging carts support 30W+ USB-C PD output to maintain charging efficiency.

---

## File: hw-22.md

---

id: hw-22

title: "The iPad 9 (2021) in 2026: Performance evaluation and end-of-life planning."

category: "Section 6: Hardware & Maintenance"

important: true

tags:
[
"iPad 9",

    "Digital Initiative",

    "Performance Evaluation",

    "Replacement Planning",

    "iOS 26",

## ]

**The iPad 9 (released in 2021), a staple of the Digital Initiative, is now entering its 4th or 5th year of service as of 2026. While it still supports iOS 26, schools are beginning to face hardware aging and performance bottlenecks.**

## Fleet Evaluation Standards for 2026:

### 1. Performance vs. Modern Apps

- **Advantage**: iOS 26 still supports iPad 9, meaning security updates and MDM commands work.
- **Disadvantage**: The A13 chip with 3GB RAM causes noticeable lag when multitasking or using modern AI "Writing Tools."

### 2. Battery & Physical Health

- **Battery Aging**: Most units are expected to be under 80% capacity, failing to last a full school day.
- **Storage**: 64GB is often insufficient for modern teaching apps and student projects.

## Renewal vs. Replacement Indicators:

### Suitable for Continued Use:

- **Single-Purpose**: E-reader, simple quizzes, or listening exercises.
- **Kiosk**: Fixed library search station or attendance scanner.

### Recommended for Replacement:

- **Creative Classes**: A13 struggles with 4K video export or complex layers.
- **AR/AI Labs**: Cannot run latest AI models or advanced AR tracking.
- **All-Day Usage**: Battery life is insufficient.

## Transition Strategy (The 2026 Shift):

1. **Tier 2 Redeployment**: Move aging iPad 9 units to "light duty" carts for reading or testing only.
2. **Batttery Repair Project**: Before the contract ends in 2026, identify units with critical battery failure for warranty repair.
3. **Phased Replacement**: Procure new M-series iPads (8GB RAM+) as the primary devices for "Creation and Exploration" classes.

## IT Advice:

Use Jamf Pro to generate health reports. If an iPad 9 takes 3x longer to boot an app compared to a new model, flag it for priority replacement.

---

## File: hw-23.md

---

id: hw-23

title: "How do I use 'Find My' to track lost Apple Pencil Pro styluses on campus?"

category: "Section 6: Hardware & Maintenance"

important: true

tags:
[
"Apple Pencil Pro",

    "Find My",

    "Asset Management",

    "Lost Property",

    "Campus Management",

## ]

**The Apple Pencil Pro (released May 2024) is the first Apple stylus to support the 'Find My' network. This is a game-changer for schools, as it allows for tracking even when the pencil is not magnetised to an iPad.**

## How Tracking Works:

- **Bluetooth Discovery**: Pencil Pro sends a secure Bluetooth signal that nearby Apple devices can detect and relay to the Find My network.
- **Precision Finding**: If the pencil is lost nearby (e.g., behind a cabinet), you can use an iPhone or iPad to get "Warm/Cold" guidance to its exact location.

## Setup Steps (Teachers & Admins):

1. **Account Binding**: The Pencil Pro must be paired with a "Managed Apple Account" or personal Apple ID.
2. **Enable Find My**: On the paired iPad, ensure **Settings > [User Name] > Find My > Find My iPad** is ENABLED. This automatically enables tracking for the Pencil.

## When a Student Reports it Lost:

1. Open the **Find My App** on the iPad.
2. Tap the **Items** tab.
3. Select the specific Apple Pencil Pro.
4. **Choose Action**:
   - **Play Sound**: Not applicable (Pencil has no speaker).
   - **Directions**: Shows the last known location on a map.
   - **Find**: (Precision Finding) Shows distance and direction when within ~10 meters.

## Limitations & Notes:

- **Battery Dependency**: If the Pencil is dead for over 24 hours, the signal will fade and stop.
- **iCloud Restrictions**: If "Find My" is disabled via MDM on the student account, this feature won't work.
- **Model Specific**: This only works for **Apple Pencil Pro**. 1st Gen, 2nd Gen, and USB-C models do not have this hardware.

## Practical Advice:

When issuing Apple Pencil Pros, require teachers to rename each pencil to a unique ID (e.g., "104-Pencil-01") for easy identification in the Find My list.

---

## File: hw-24.md

---

id: hw-24

title: "Managing Wi-Fi 6, 6E, and 7: How to plan school network upgrades for a mixed fleet."

category: "Section 6: Hardware & Maintenance"

important: true

tags:
[
"Wi-Fi 7",

    "Wi-Fi 6E",

    "Wireless Networking",

    "Infrastructure",

    "Procurement",

## ]

**With the introduction of M4/M5 iPads and Macs, school networks are now 'Tri-generational.' Handling Wi-Fi 6, 6E, and 7 simultaneously requires careful planning to prevent newer devices from being throttled while ensuring older iPads (like the iPad 9) remain connected.**

## Wi-Fi Tech Specs Comparison:

| Generation             | Main Bands | Max Theory Speed | Key Tech            | Education Devices       |
| :--------------------- | :--------- | :--------------- | :------------------ | :---------------------- |
| **Wi-Fi 6 (802.11ax)** | 2.4/5GHz   | 9.6 Gbps         | OFDMA, TWT          | iPad 9, iPad 10         |
| **Wi-Fi 6E**           | **+ 6GHz** | 9.6 Gbps         | 160MHz Width        | M4 iPad Pro, M3 MacBook |
| **Wi-Fi 7 (802.11be)** | 2.4/5/6GHz | **46 Gbps**      | MLO, 320MHz, 4K-QAM | M5 iPad Pro, iPhone 16  |

## Upgrade Planning Strategy:

### 1. Isolate 6GHz for High Performance

Newer M4/M5 devices support 6GHz (Wi-Fi 6E/7), which has almost zero interference.

- **Recommendation**: Create a separate SSID for 6GHz (e.g., `Roaming-HighSpeed`) for "Video Editing" or "VR Labs" that need high bandwidth and low latency.

### 2. WPA3 Compatibility

- **Mandatory**: Wi-Fi 6E/7 **requires** WPA3 encryption.
- **Legacy Risk**: Older iPads (5th/6th Gen) might struggle with WPA3.
- **Plan**: Keep a "Mixed Mode" (WPA2/WPA3) SSID for general classrooms.

### 3. Benefit of MLO (Multi-Link Operation)

Wi-Fi 7's MLO allows M5 iPad Pros to transmit on 5GHz and 6GHz simultaneously.

- **Benefit**: Even if Bluetooth interferes with one band, the stream continues uninterrupted on the other.

### 4. Infrastructure Bottleneck

- If upgrading to Wi-Fi 7 APs, your core switches must support **Multi-Gig (2.5GbE or 5GbE)**. Plugging a 46Gbps AP into a 1Gbps port is a waste of money.

## Practical Advice:

For most general classrooms, **Wi-Fi 6E** offers the best cost-performance ratio. Reserve **Wi-Fi 7** for "Future Labs" or multimedia centers where M5 devices are deployed.
