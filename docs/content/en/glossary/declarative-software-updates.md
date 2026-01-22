---
category:
  - DDM
term: Declarative Software Updates
---
## Term Definition

* **Declarative Software Updates**is the mandatory, modern method for managing OS updates in Apple's ecosystem.

Fundamental changes:

* **Phase-out**: Legacy MDM update commands (like `ScheduleOSUpdate`) are being replaced by the DDM "Configuration" mechanism.
* **Deadlines**: Supports strict**Enforcement Deadlines**where the device will force an update at a specific date and time.
* **Betas**: Allows administrators to remotely enroll or restrict devices in Apple’s**Beta Software Programs**.
* **Reporting**: Provides real-time progress updates through the**Status Channel**(e.g., "Downloading," "Verifying," "Installing").

* **Note**: Organizations had to transition to this method starting in late 2024 to maintain update control over modern versions of iOS and macOS.

## Analogy

Previously, updating was like**"A teacher personally chasing every student"**to turn in their homework (the MDM server sending individual, repeated commands).

Now, it's like**"Posting the due date on the bulletin board"**and letting the students manage their own time. The device knows the deadline and handles the update autonomously when the time is right, just reporting back to the teacher when it's done.
