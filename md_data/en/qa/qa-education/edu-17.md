---
id: edu-17

title: "Why is the 'Screen Recording' button missing or grayed out on student iPads?"

category: "Section 8: Education Scenarios"

important: true

tags: ["Screen Recording", "Restrictions", "Control Center"]
---

**This is typically because 'Screen Recording' is restricted in the school's MDM profile, or the button simply hasn't been added to the Control Center.**

## Troubleshooting Steps:

### 1. Check MDM Restrictions (Most Common)

- Many schools disable **Allow screen recording** in the **Restrictions** profile to prevent students from recording lessons or non-educational content.
- **Fix**: If a teacher requires this for a project, the IT Coordinator must enable it in Jamf Pro for that specific classroom group.

### 2. Check Control Center Settings

- If not restricted but still missing, the button might not be in the menu.
- **Fix**: Go to **Settings > Control Center** and tap the green **+** next to **Screen Recording**.

### 3. Check Screen Time

- If a student (or parent) enabled local Screen Time restrictions, this can also block the feature. Check **Settings > Screen Time > Content & Privacy Restrictions**.
