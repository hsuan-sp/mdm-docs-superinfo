---
id: mac-9

title: "What can Jamf Scripts do? How do I create and run them?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Automation", "Shell Script", "Zsh", "Policies", "Scripts", "jamfHelper"]
---

**Scripts allow administrators to execute shell commands with Root privileges on a Mac, enabling advanced customization that standard MDM payloads cannot achieve.**

Jamf Pro's power lies in its proprietary binary. When combined with **Policies**, you can achieve the following advanced scenarios:

## Common Application Scenarios:

| Scenario                  | Script Example                                                                                        |
| :------------------------ | :---------------------------------------------------------------------------------------------------- |
| **User Interaction**      | Use `jamfHelper` to pop up full-screen announcements or countdown windows.                            |
| **System Cleanup**        | Periodically delete specific cache files, temporary files, or reset the printing system.              |
| **Advanced Install**      | Install Homebrew, Rosetta 2, or call Installomator for automated software updates.                    |
| **Inventory Reporting**   | Collect info outside standard fields (e.g. battery health) and report it to **Extension Attributes**. |
| **Permission Management** | Temporarily grant Admin rights to a user and remove them after a set duration.                        |
| **AI Automation**         | Pre-trigger local indexing or semantic search initialization for Apple Intelligence models.           |
| **Swift Scripting**       | **2026 Trend**: Use Swift for safer, more efficient automation supporting native APIs.                |

## 2026 Trend: DDM is Replacing "Repetitive Scripts"

While scripts were previously used to check system states periodically, macOS 26 recommends using **Declarative Device Management (DDM)**.

- **Example**: Instead of a script that periodically deletes large caches in `/tmp/`, you can define a DDM policy that allows the system to perform "Self-Healing" in place, which is more efficient and real-time.

## Setup and Deployment Flow (SOP):

### 1. Write the Script

- Use **Zsh** (`#!/bin/zsh`), the default shell for modern macOS. **Note**: Python 2.7 has been removed since macOS 12.3; you must deploy your own interpreter to run Python scripts.

### 2. Upload to Jamf Pro

- Go to **Settings > Computer Management > Scripts**.
- Click **+ New**, enter a name, and paste your script content.
- **Parameters**: You can set labels for variables `$4` through `$11`, allowing the same script to take different inputs (e.g., a printer IP) via different policies.

### 3. Execute via Policy

- Go to **Computers > Policies > + New**.
- Set a **Trigger** (e.g., Recurring Check-in, Login).
- Add the **Scripts** payload and select your uploaded script.
- Set the **Scope** for the target computers.

### 4. Execution Frequency

- Define the frequency (e.g., **Once per computer** or **Ongoing** for every trigger).

## Practical Example: Displaying a Notice with `jamfHelper`

`jamfHelper` is a powerful notification tool built into Jamf, located at `/Library/Application Support/Jamf/bin/jamfHelper.app`.

```bash
#!/bin/bash

# Define variables

HELPER="/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper"

TITLE="School IT Department Announcement"

HEADING="Software Update Notification"

DESC="Your computer will undergo a security update in 10 minutes. Please save your work and connect to power."

# Execute window

"$HELPER" -windowType utility -title "$TITLE" -heading "$HEADING" -description "$DESC" -button1 "I understand" -defaultButton 1

```

## Practical Advice & Expert Tips:

- **Permissions**: Scripts run by Jamf Pro default to **Root** status. Always test on a pilot device to avoid accidental deletion of critical system files.
- **Running as User**: To run a command as the currently logged-in user (e.g., to modify their Dock), use: `sudo -u $(stat -f%Su /dev/console) command`.
