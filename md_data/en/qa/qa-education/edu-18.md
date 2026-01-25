---
id: edu-18

title: "The iPad shows it's connected to Wi-Fi, but I can't open any web pages. Why?"

category: "Section 8: Education Scenarios"

important: false

tags: ["DNS", "DHCP", "Network Failure", "Troubleshooting"]
---

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
