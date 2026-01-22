---
category: 'Section 2: Device Enrollment & Deployment'
id: enr-5
important: false
tags:
  - Account-Driven
  - Service Discovery
  - .well-known
  - Technical Setup
title: >-
  How do we set up 'Service Discovery' for Account-Driven Enrollment on the
  campus network?
---
## Q: How do we set up 'Service Discovery' for Account-Driven Enrollment on the campus network?

## Answer

* *Account-Driven Enrollment relies on "Service Discovery," allowing users to enroll simply by entering their school email address.**

## How it Works:

When a user enters their email (e.g., `student@tes.tp.edu.tw`) during the Enrollment process, the device attempts to find a secret instruction file on the school’s web domain.

1. The device sends an HTTP GET request to:

 `https://school.domain.com/.well-known/com.Apple.remotemanagement`

2. The school’s web server must respond with a JSON file that points the device to the correct MDM server URL.

## Technical Requirements:

* **Web Server Access**: Your school’s main website server must be configured to host this specific `.well-known` directory.
* **MIME Type**: The server must return the file with the `application/JSON` header.
* **SSL Certificate**: The server MUST have a valid, trusted HTTPS certificate.

## Alternative Options:

If your school’s website is managed by a third party and you cannot modify the server files, you can still enroll devices using these methods:

1. **Direct URL/QR Code**: Provide students with a direct Enrollment URL from Jamf Pro (e.g., `https://school.jamfcloud.com/enroll`). Converting this into a QR Code and posting it in the ICT department is a highly effective way to handle BYOD walk-ins.
2. **Automated Enrollment (ADE)**: For school-purchased hardware, always use ADE. It bypasses the need for service discovery entirely, as the hardware is already "pre-linked" to the school in Apple’s database.
