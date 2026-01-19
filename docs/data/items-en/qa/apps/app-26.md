---
id: app-26
title: "How do I manage the AI-assisted teaching apps released in 2024–2025 (e.g., Writing Tools, Image Playground)?"
category: "Section 3: App Distribution & Management (Apps & Books)"
important: true
tags: ["AI","Apple Intelligence","App Management","Privacy","Exam Security"]
---

## Q: How do I manage the AI-assisted teaching apps released in 2024–2025 (e.g., Writing Tools, Image Playground)?

## Answer

**With the maturation of Apple Intelligence, teaching apps have entered the 'AI-Assisted Era.' The challenge for schools is balancing the productivity gains of AI with academic integrity and data privacy.**

## Managing AI Features via MDM (iOS 26)

Apple provides granular controls to manage these features on Supervised devices:

1. **Writing Tools (改寫與校對)**:

* **MDM Key**: `allowWritingTools` (set to `false` during exams).
  * **Impact**: Disables the system-wide ability to rewrite, tone-check, or summarize text. Essential for language arts and composition assessments.

1. **Image Playground & Genmoji**:

* **MDM Key**: `allowImagePlayground`.
  * **Impact**: Disables the AI image generation tools. Schools may choose to disable this to prevent the creation of inappropriate content or to focus students on manual creative work.

1. **Math Notes**:

* **MDM Key**: `allowMathNotes`.
  * **Impact**: While technically part of Calculator/Notes, this AI feature solves handwritten equations instantly. It should be restricted in mathematics labs to focus on manual problem-solving.

## Privacy and Data Handling:

Managed Apple Accounts for Education treat Apple Intelligence data with strict privacy. Most operations are processed **On-Device**. If a larger model is required (Private Cloud Compute), Apple ensures that data is never stored or used for model training, fulfilling the privacy requirements of most regional education departments.

## Practical Advice for Exam Season:

Instead of a permanent block, use **Jamf Pro's Smart Groups** or **Apple Classroom's App Lock**. Locking a student into a specific testing app (like Exam.net or a managed browser) automatically suppresses AI Writing Tools and Image Playground, ensuring a secure testing environment without changing global policies.
