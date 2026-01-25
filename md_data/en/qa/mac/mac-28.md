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
  ]
---

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
