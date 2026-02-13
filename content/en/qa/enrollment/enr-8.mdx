---
id: enr-8

title: "Enrollment fails with 'Profile Installation Failed'. Why?"

category: "Section 2: Device Enrollment & Deployment"

important: false

tags: ["Troubleshooting", "Network", "Declarative Management", "Profile"]
---

**This error typically stems from the device's inability to establish a stable, trusted secure connection with the MDM server or Apple servers.**

If you encounter this prompt during Enrollment, check the following common causes in order:

## Check 1: Verify Date and Time Precision

SSL certificate validation relies heavily on correct time. If the iPad's clock is off by more than a few minutes, the connection is treated as invalid.

- **Solution**: On the device, check **Settings > General > Date & Time**. Ensure **Set Automatically** is on and it has connected to the network to fetch the time zone.

## Check 2: Check Campus Firewall and Network Filtering

MDM commands are delivered via **Apple Push Notification service (APNs)**. If the school network blocks specific hosts, enrollment fails.

- **Critical Domains**: Ensure the firewall allows connections to `apple.com` and all its subdomains.

- **Ports**: Must open **TCP 443, 2197, and 5223**.
- **Test**: Try enrolling the iPad using an external mobile hotspot. If successful, it confirms a campus network restriction.

## Check 3: Declarative Device Management (DDM) Sync Issues

In the latest OS versions, Apple heavily utilizes "Declarative Management" for enrollment. If there are logic conflicts in Jamf Pro settings (e.g., assigning multiple PreStages overlap), the profile download may be interrupted.

- **Solution**: Admins should check PreStage settings in Jamf Pro to ensure the device falls into only one enrollment scope and the corresponding VPP Token is healthy.

## Check 4: Is the APNs Certificate Expired?

If the APNs Push Certificate in the MDM backend has expired, Apple will reject all enrollment requests.

- **Solution**: Ask an administrator to check the certificate validity in Jamf Pro's "Global Management".

## Check 5: Clear Activation Lock

If the device serial number is still locked to a previous user's Apple Account, you might be able to download the profile, but installation may fail due to identity conflict. Ensure Activation Lock is cleared before re-enrolling.
