---
id: dl-2

title: "The MOE dashboard shows some devices as 'Unused' or failing to upload data. How do we fix this?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: true

tags: ["Data Reporting", "Troubleshooting", "Jamf Trust", "Usage Metrics"]
---

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
