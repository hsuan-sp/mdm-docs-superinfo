---
term: "LAPS (Local Administrator Password Solution)"
category: ["Security"]
---

## Definition

Local Administrator Password Solution (LAPS) is a security mechanism that ensures every managed computer has a unique, random, and frequently rotated password for its local administrator account. These passwords are securely stored in the MDM or directory service. This prevents a "Lateral Movement" attack, where a hacker who discovers one administrator password could use it to gain control of every other computer on the network.

## Plain English

Think of this as an "Automatic Lock-Changing System." In the past, every classroom door in a school might have used the same master key. If a thief stole that key, they could enter every room. With LAPS, every single door has a different, unique code that changes every few days. Even if someone steals a code today, it won't work on the next door, and it won't even work on the same door tomorrow.
