---
id: mac-8

title: "Why does MDM require FileVault? How do I recover a forgotten login password?"

category: "Section 7: Advanced Mac Management"

important: true

tags:
  [
    "FileVault",

    "Full Disk Encryption",

    "Data Security",

    "Recovery Key",

    "Jamf Pro",

    "Inventory",
  ]
---

**FileVault is macOS's built-in "Full Disk Encryption" technology, ensuring that data cannot be stolen if the computer is lost. By escrowing the "Recovery Key" to MDM, administrators can help unlock the device if a user forgets their password.**

## Technical Principles:

- **XTS-AES-128 Encryption**: Before login, the hard drive data is encrypted and unreadable.
- **Performance Impact**: Modern Macs handle encryption via the Secure Enclave hardware, resulting in virtually zero impact on daily performance.
- **2026 Experience: Platform SSO (PSSO)**: In macOS 26, using PSSO allows users to enter their password just once at the FileVault screen to boot directly to the desktop. The system automatically handles subsequent identity provider (IdP) verification and login. This eliminates the legacy "double login" frustration.

## Jamf Pro Deployment and Escrow Flow (SOP):

### 1. Create Configuration Profile

- Go to **Configuration Profiles > New > FileVault**.
- Set to **Require FileVault**.
- **Crucial Step**: Set to **Create Personal Recovery Key** and choose **Escrow Personal Recovery Key to MDM**.

### 2. User-Side Activation

- After deployment, the system will prompt the user to enable encryption at the next logout or reboot.
- **Note**: Jamf Pro will only receive the key once the user completes this step and the status changes to "Encrypted."

## Recovery Scenario: Looking up the Recovery Key

If a user forgets their password, the administrator must retrieve the key from the console.

### 1. Navigate to Inventory

- Log in to Jamf Pro and search for the target computer.
- Go to the detail page and select the **Inventory** tab > **Disk Encryption**.

### 2. Verify Encryption and Key

- First, check if **FileVault 2 Enabled** is set to **Encrypted** or **Enabled**.
- **If Encrypted**: You will see a **Personal Recovery Key** field. Click **Show Key** to reveal the code.
- **If Not Encrypted**: This field will not appear, meaning encryption is incomplete or the escrow failed. Recovery via MDM is not possible in this state.

### 3. Perform the Unlock

- On the Mac login screen, click the question mark (?) or enter the wrong password three times. Select **Reset password using Recovery Key** and enter the code.

## Practical Advice & Warnings:

- **Data Loss Risk**: If FileVault is enabled but Jamf Pro shows "Unknown" or no key, the escrow failed. If the password is forgotten in this state, **data is permanently unrecoverable**, and the device must be wiped.
- **Institutional Recovery Key (IRK)**: Modern management favors the "Personal Recovery Key (PRK)" mechanism for higher security.
