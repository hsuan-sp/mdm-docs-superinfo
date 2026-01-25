---
id: dl-9

title: "Does MDM monitor the student's location (GPS) at all times?"

category: "Section 5: Digital Initiatives (MOE Project)"

important: false

tags: ["Privacy", "Location", "GPS", "Lost Mode"]
---

**No. Apple's privacy architecture strictly limits MDM's location permissions. Under normal conditions, schools cannot obtain a device's GPS coordinates.**

## The Only Exception: Lost Mode

Administrators can only trigger location tracking if a device is specifically marked as "Lost."

## Privacy Comparison Table:

| Status                 | Administrator Access             | Student Notification                         |
| :--------------------- | :------------------------------- | :------------------------------------------- |
| **Normal Usage**       | **Cannot Locate**                | None                                         |
| **Lost Mode Enabled**  | **Can Get One-time Coordinates** | Lock screen displays "This iPad is lost..."  |
| **Lost Mode Disabled** | **Location Stops Immediately**   | Notification shows "MDM located this device" |

## Practical Advice:

- School MDM **cannot see** a student's photos, messages, or browsing history (it can only filter domains, not see specific page content).
- The location feature is used solely for "asset recovery," never for monitoring a student's movements after school hours. This complies with GDPR and national cybersecurity standards.
