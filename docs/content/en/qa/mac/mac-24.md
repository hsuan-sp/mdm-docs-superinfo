---
id: mac-24
title: "Exam Security: Managing Safari 'Distraction Control' to prevent cheating during web-based tests."
category: "Section 7: Mac Management"
important: true
tags: ["Safari", "Distraction Control", "Exam Security", "macOS 26", "Proctoring"]
---

## Q: Exam Security: Managing Safari 'Distraction Control' to prevent cheating during web-based tests.

## Answer**Safari in macOS 26 introduces 'Distraction Control,' which allows users to hide specific web elements (like ads or sidebars). However, in a Computer-Based Testing (CBT) environment, students could abuse this to hide timers, navigation menus, or proctoring warnings.**## Risks in the Classroom:

***Hiding the Clock**: A student hides the countdown timer and then claims they didn't know the exam was ending.
***Hiding Instructions**: Students could hide critical rules or "Hints" buttons that are part of the testing UI.

## Management Solutions (SOP):

1.**MDM Configuration Profile (Recommended)**:

***Domain**: `com.apple.Safari`.
***Payload**: Set `AllowDistractionControl` to `false`.
***Effect**: The "Distraction Control" option in the Safari menu will be grayed out and unavailable, ensuring the website UI remains exactly as intended by the test publisher.

1.**Assessment Mode (AAC)**:

* For high-stakes exams, use a specialized testing app or a managed browser that invokes Apple’s**'Assessment Mode.'*****Effect**: This automatically suppresses Distraction Control, Siri, notifications, and all multitasking features without needing a specific configuration profile.

## IT Strategy:

Create a**"Testing Mode" Smart Group**in Jamf Pro. Use a script to verify that `DistractionControl` is disabled 15 minutes before the exam begins. We recommend also disabling Safari "Translation" features during the same period to prevent unapproved language assistance.
