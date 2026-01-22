---
id: mac-16
title: How do I manage or disable 'iPhone Mirroring' in macOS Sequoia?
category: 'Section 7: Mac Management'
important: false
tags:
  - macOS 15
  - iPhone Mirroring
  - Privacy
  - Restrictions
  - DLP
---
## Q: How do I manage or disable 'iPhone Mirroring' in macOS Sequoia?

## Answer

**While convenient, 'iPhone Mirroring' in macOS 15+ poses Data Loss Prevention (DLP) risks on shared school computers. It should be managed via MDM.**

## The Privacy Risk:

When a personal iPhone is mirrored to a school Mac, notifications, photos, and app content are visible on the Mac screen. It also supports file drag-and-drop, which could lead to unauthorized data transfer.

## Jamf Pro Configuration:

1. Go to**Computers > Configuration Profiles > Restrictions**.
1. Navigate to the macOS 26 (Tahoe) section.

1.**Option A (Full Block)**: Uncheck**Allow iPhone Mirroring**.

1.**Option B (Granular)**: Use the**View Only**mode or uncheck**Allow file and clipboard sync**.

## Result:

Once applied, the iPhone Mirroring app on the Mac will display a "Disabled by Administrator" message when launched. We recommend disabling this in computer labs while potentially allowing it on assigned teacher laptops with restrictions on file sync.
