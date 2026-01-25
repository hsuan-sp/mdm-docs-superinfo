---
id: enr-24

title: "How do I set an 'Enforcement Deadline' for MDM enrollment or system updates?"

category: "Section 2: Device Enrollment & Deployment"

important: true

tags: ["Enforcement Deadline", "DDM", "Enforcement", "Deadline", "Compliance"]
---

**Using Declarative Device Management (DDM), you can set 'Enforcement Deadlines.' The device will autonomously manage notifications and, once the deadline is reached, remove the 'Later' option to force the update or enrollment.**

## Key Principles

- The device receives a **Declaration** containing the deadline.
- The device manages its own notification frequency locally.
- At the deadline, the action is forced without needing the MDM server to push a real-time command.

## Scope

- **OS Versions**: iOS 26, iPadOS 26, macOS 26, visionOS 26, tvOS 26.
- **Applications**: Software Update enforcement, MDM Migration deadlines, and Configuration Profile installations.

## Implementation (Jamf Pro Example)

### Software Update Deadline:

1. Go to **Devices > Blueprints** or **Computers > Blueprints**.
2. Create/Edit a **Software Update Declaration**.
3. Set the **Target Version** (e.g., Latest version).
4. Enable **Enforcement Deadline**.
   - Set the specific date and time (e.g., 2026-02-28 17:00).
   - Choose the time zone (Local device time is recommended).

5. Deploy to the target group.

## User Experience Timeline

| Time until Deadline | Notification Frequency    | User Options          |
| :------------------ | :------------------------ | :-------------------- |
| 30–14 Days          | Banner in Settings        | Can select "Later"    |
| 7 Days              | Once per day              | Can select "Later"    |
| 3 Days              | Twice per day             | Can select "Later"    |
| 24 Hours            | Once per hour             | Can select "Later"    |
| **At Deadline**     | **Immediate Enforcement** | **No "Later" option** |

### Behavior at Deadline:

- **Power On**: Immediately begins download and installation.
- **Power Off**: Provides a 1-hour grace period upon the next boot, then forces the action.
- **Restart**: If a restart is required, the user may be given a brief warning, but the system will eventually force the reboot.

## Deployment Advice for Schools

- **Buffer Time**: Provide 2–4 weeks for users to update voluntarily.
- **Scheduling**: Avoid exam weeks or major school events. Friday afternoons or weekends are often best.
- **Capacity**: Ensure school bandwidth can handle the concurrent downloads if a large number of devices reach the deadline at once.

## Communication:

- **Teachers**: Explain _why_ the update is necessary (security/new features) and encourage them to update manually before the deadline to avoid interruptions.
- **Students**: Remind them to leave their iPads connected to power at home to allow for automatic background updates.
