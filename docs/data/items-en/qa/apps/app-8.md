---
id: app-8
title: "Can I deploy Web Clips to student home screens? Are they considered apps?"
category: "Section 3: App Distribution category: "Section 3: App Distribution & Management (Apps & Books)" Management"
important: false
tags: ["Web Clip","Safari","Configuration Profile","Teaching Tools"]
---

## Q: Can I deploy Web Clips to student home screens? Are they considered apps?

## Answer

**Yes. A Web Clip is not a true app; rather, it is a bookmark icon on the home screen that points to a specific URL. This is highly effective for guiding students to specific learning portals.**

## Technical Details & Configuration Advice:

## 1. Full-Screen Experience

In your Jamf Pro configuration, ensure the "Full Screen" option is enabled.

* **Effect**: Opening the link will hide the Safari address bar and toolbar.
* **Benefit**: This makes the website look like a standalone native app, reducing the chance of students getting distracted by other sites.

## 2. Custom Icons and Visuals

* **Recommended Specification**: Upload a **180x180 pixel PNG file** for maximum clarity.
* **Transparency Support**: Modern systems support PNG icons with transparency, allowing for more professional-looking home screen layouts.

## 3. Prevent Removal (Non-removable)

For shared classroom devices, you can set the Web Clip as "Non-removable."

* **Advantage**: This ensures essential portals are not accidentally deleted by students, saving you the trouble of redeploying them.

## Limitations & Risks:

* **Browser Dependency**: Web Clips rely on the built-in Safari engine. If you have a restriction profile that completely disables the Safari app, Web Clips will not open.
* **Internet Connectivity**: Since these are essentially web pages, the device must be online to load the content. For offline use, you must look for Progressive Web Apps (PWAs) that support offline caching or install native apps.
