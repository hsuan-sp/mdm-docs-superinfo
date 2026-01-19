---
term: "FileVault"
category: ["Security"]
---

## Definition

FileVault is the built-in full-disk encryption (FDE) technology for macOS. When enabled, it uses high-level XTS-AES-128 encryption to secure all data on the Mac’s startup disk. This ensures that if a laptop is lost or stolen, the data cannot be accessed without the user's login password or a secure **Recovery Key**. For schools, enforcing FileVault via MDM is a fundamental requirement for data privacy compliance.

## Plain English

Think of this as a "Digital Vault" for the entire computer. On a standard computer, a thief could simply pull out the hard drive to read your files. With FileVault turned on, the entire drive is scrambled into a code that only your password can unlock. Without that password, the hard drive is nothing more than a useless piece of scrap metal to anyone who finds it.
