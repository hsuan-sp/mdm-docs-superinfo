---
id: edu-03

title: "What are the configuration differences between Teacher iPads and Student iPads?"

category: "Section 8: Education Scenarios & FAQ"

important: false

tags: ["Roles", "Permissions", "Group Policy", "Classroom"]
---

**Teacher and Student devices are usually assigned different management profiles, app catalogs, and restriction levels to provide teachers with the flexibility needed for classroom instruction.** In Jamf Pro, we use Smart Groups to separate these roles and ensure that the right rules are applied to the right person.

## Key Policy Differences:

| Setting                 | Teacher iPad                        | Student iPad                    |
| :---------------------- | :---------------------------------- | :------------------------------ |
| **Apple Intelligence**  | **Full Access** (Rewrite/Summarize) | **Restricted** (Summarize Only) |
| **AirDrop**             | Unrestricted                        | Restricted or "Teacher-Only"    |
| **App Installations**   | Allowed via Self Service Pro        | Managed strictly by IT          |
| **Content Filtering**   | Relaxed (Standard Web)              | Strict (Child Safety Enforced)  |
| **Apple Classroom**     | **Teacher Role** (Controller)       | **Student Role** (Managed)      |
| **Jamf Teacher App**    | Create Lessons / Clear Passcodes    | Receive Lessons                 |
| **Zero-Wipe Migration** | Available for data transfer         | Restricted to IT staff          |

## Implementation in Jamf Pro:

- **Automatic Naming**: We recommend using a prefix like `T-` (Teacher) and `S-` (Student) during enrollment.
- **Scoped Profiles**: Create a "Student Restrictions" profile and scope it _exclusively_ to the Student Smart Group. Create a separate, "Lighter Restrictions" profile for staff.
- **App Deployment**: Some specialized creative or assessment apps (like Goodnotes or Exam.net) might be deployed to all devices, while administrative tools (like ManageBac or PowerSchool Teacher) are scoped only to staff.

## Institutional Advice:

Periodically audit your Smart Groups. When a staff member leaves or replaces their hardware, ensure their new device is correctly tagged as a "Teacher" asset to avoid giving students unrestricted access to staff-level tools.
