---
term: "Kernel Extension (Kext)"
category: ["Core"]
---

## Definition

A Kernel Extension (Kext) is a piece of code that adds functionality directly to the macOS kernel (the "heart" of the operating system), similar to a driver in other systems. Because Kexts operate with extremely high privileges, they represent a significant security risk if they contain bugs or vulnerabilities. Apple is currently phasing out Kexts in favor of more secure **System Extensions**, and modern Macs require special security downgrades to allow Kexts to run.

## Plain English

Think of this as "Heart Surgery" for your computer's operating system. It's a way to add new features by changing the most vital, core part of the system (the Kernel). While this can make the computer very powerful, it's also very risky—one mistake could crash everything. This is why Apple now prefers "Minor Surgery" (System Extensions) instead, which is much safer and easier to manage.
