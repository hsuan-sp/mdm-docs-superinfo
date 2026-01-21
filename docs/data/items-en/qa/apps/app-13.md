---
id: app-13
title: "What is 'Managed App Configuration'? How is it used for mass deployment?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["AppConfig","XML","Variables","Jamf Pro"]
---

## Q: What is 'Managed App Configuration'? How is it used for mass deployment?

## Answer

**'Managed App Configuration' uses the MDM protocol to inject XML-based settings into apps that support the AppConfig standard, enabling 'Zero-touch Configuration'.**

This goes beyond just pre-filling data; it can lock specific app behaviors to prevent user modification.

## Technical Implementation with Jamf Pro Variables:

In the mobile device app details page in Jamf Pro, switch to the **App Configuration** tab. You will need to paste a **Plist (Property List)** XML code that follows the developer's specifications.

## The Jamf Advantage: Variable Substitution

You can use Jamf Pro's built-in variables to dynamically fill in specific information for each device, eliminating the need for individual configuration files.

* **Common Variables**:
  * `$SERIALNUMBER`: Automatically fills the device serial number.
  * `$EMAIL`: Fills the user's email (if linked in Inventory).
  * `$USERNAME`: Fills the username.
  * `$JSSID`: Fills the Jamf Pro ID.

## Practical Example (Setting Zoom SSO Domain):

```xml
<dict>
    <key>SetSSOURL</key>
    <string>true</string>
    <key>SSOURL</key>
    <string>yourschool.zoom.us</string>
    <key>PrepopulateUsername</key>
    <string>$EMAIL</string>
</dict>
```

*(Note: Specific Key-Value pairs must be referenced from the official management documentation of the app developer, e.g., Zoom, Chrome, or Microsoft.)*
