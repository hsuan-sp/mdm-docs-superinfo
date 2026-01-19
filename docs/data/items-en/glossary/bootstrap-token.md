---
term: "Bootstrap Token"
category: ["Security"]
---

## Definition

A Bootstrap Token is an automated authorization credential used in macOS. When the first user enables FileVault disk encryption, the system generates this token and securely escrows it to the MDM server. MDM can then use this token to authorize other administrator accounts to log in to the encrypted Mac or to automatically authorize software updates that require a cryptographic "owner" to proceed.

## Plain English

This is the "Spare Master Key" stored in the MDM vault. When a computer is locked down with encryption (FileVault), usually only the primary user can unlock it. The Bootstrap Token allows IT to have a secure copy of the "key" so they can enter the system for maintenance or give access to a new employee if the original user is unavailable.
