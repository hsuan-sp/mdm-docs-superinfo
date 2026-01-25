---
id: mac-12

title: "How do I prevent students from entering Recovery Mode to format the computer?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Tamper Proofing", "Recovery Lock", "Firmware Password", "Security"]
---

**The protection mechanism differs depending on the Mac architecture: Intel-based Macs require a 'Firmware Password,' while Apple Silicon (M-series) Macs require a 'Recovery Lock.' Both can be deployed via Jamf Pro.**

Recovery Mode is powerful. If left unprotected, anyone with physical access can "Erase Disk" or "Reinstall OS" to bypass school management.

## Comparison of Mechanisms:

| Architecture              | Protection Mechanism  | Deployment Method                                   |
| :------------------------ | :-------------------- | :-------------------------------------------------- |
| **Apple Silicon (M1-M5)** | **Recovery Lock**     | Configured via **MDM Remote Command** only          |
| **Intel Mac**             | **Firmware Password** | Configured via **Configuration Profile** or Command |

### 1. Recovery Lock (For Apple Silicon)

Starting with macOS 11.5, MDM can set a Recovery Lock. When enabled, the Mac will prompt for the administrator-defined password before allowing entry into Recovery Mode.

- **Jamf Pro Action**: Select a computer > **Management > Remote Commands > Set Recovery Lock**.

- **Management Note**: Jamf Pro will escrow the password so you can retrieve it later from the inventory record.

### 2. Firmware Password (For Intel Macs)

This prevents the Mac from booting from anything other than the designated startup disk without a password.

- **Jamf Pro Action**: Create a **Computer Configuration Profile** with the **EFI Password** payload.

## Practical Advice:

Setting these locks is a fundamental security requirement for shared labs or student 1:1 laptops. Without them, "Remote Management" can be circumvented via a hard reset and disk wipe in the Recovery environment.
