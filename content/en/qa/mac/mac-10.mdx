---
id: mac-10

title: "Default Jamf Pro inventory lacks specific info (like file versions or last reboot). How do I collect custom data?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Extension Attributes", "Scripts", "Inventory", "Custom Fields"]
---

**Use the "Computer Extension Attributes" feature. This is the core tool in Jamf Pro for expanding database fields and collecting non-standard hardware/software information.**

While standard inventory includes specs, OS versions, and app lists, specific needs (such as checking if a config file was tampered with, battery cycle counts, or custom asset tags) require Extension Attributes.

## 2026 Model: DDM Status Channel

In addition to traditional inventory updates, macOS 26 recommends using the DDM Status Channel:

- **Real-time**: When a state changes (e.g., CPU load, disk space, FileVault status), the device actively reports to Jamf Pro rather than waiting for the next scheduled scan.

- **Low Load**: Only changed fields are reported, significantly reducing server overhead.
- **Recommendation**: For fields where accuracy is critical (e.g., whether security software is running), prioritize the DDM Status Channel.

## Setup Steps (SOP):

### 1. Navigate

Go to **Settings > Computer Management > Extension Attributes**.

### 2. Add

Click **+ New**.

### 3. Configure

- **Display Name**: e.g., "Last Reboot Time".
- **Input Type**: Select **Script**.
- **Data Type**: String, Integer, or Date. This affects Smart Group logic (e.g., "greater than/less than" vs. "contains").

### 4. Write Script

- Paste your Shell Script in the editor.
- **Crucial Syntax**: Jamf Pro only reads values enclosed in `<result>` and `</result>` tags. Any other `echo` output will only appear in debug logs and won't be written to the database.

## Practical Example: Collecting "System Uptime Days"

```bash
#!/bin/bash

# Get system uptime days and report to Jamf Pro

# Uses awk to grab the 'days' part of the uptime command output

days=$(uptime | awk '{ print $3 }')

echo "<result>$days</result>"

```

## Advanced Application Scenarios:

- **Compliance Check**: Use a script to check if a security daemon (like CrowdStrike or SentinelOne) is running. If it returns "Stopped," the computer can automatically fall into a "Non-Compliant Group" and trigger a remediation policy.
- **Administrative Management**: Set Input Type to **Pop-up Menu** for fields like "Department" (e.g., Academic, Administrative, IT). This allows admins to manually assign units during device issuance for easier group management.

## Practical Advice: Expert Tips

- **Execution Performance**: Extension Attribute scripts run during **every** inventory update. Avoid time-consuming scripts (like `find /` scanning the whole drive), as they can slow down inventory reporting across the school or cause system lag.
