---
id: acc-20

title: "Do Managed Apple Accounts support Multi-Factor Authentication (MFA)? How is it managed?"

category: "Section 1: Account & Server Management"

important: false

tags: ["MFA", "Security", "Managed Apple Account"]
---

**Yes. Managed Apple Accounts support MFA via managed recovery phones or Federated Authentication.** Enables MFA is a basic security standard for high-privilege accounts, such as administrators or teachers.

## Implementation Methods:

1. **Federated Authentication (Recommended)**: If you have integrated with Google or Microsoft, MFA is handled by that platform. After entering the domain password, the user is prompted by Google Authenticator or Microsoft Authenticator. Apple only receives the successful authentication result.
2. **Standard ASM Accounts**: Users link a trusted phone number upon login. If a user loses their phone or changes numbers, a **Manager or Administrator** in ASM can select the user and click **Reset MFA Status**, allowing the user to bind a new device.

## Practical Advice:

We strongly recommend that all accounts with the "Administrator" role link at least two recovery channels or use physical hardware **Security Keys** to prevent a single lost device from locking the entire school out of the management console.
