---
id: enr-22

title: "The school is changing its Wi-Fi SSID. How do I prevent iPads from losing connectivity?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags: ["Wi-Fi Migration", "SSID", "Disaster Prevention", "Network Config"]
---

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
