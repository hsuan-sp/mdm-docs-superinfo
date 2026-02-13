---
id: mac-20

title: "How do I configure 'Unlock FileVault via SSH' in macOS 26?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["FileVault", "SSH", "Remote Unlock", "macOS 26", "Remote Management"]
---

**macOS 26 introduces the ability to unlock FileVault at the 'Pre-boot' stage via SSH, solving a major pain point for headless server management.**

## Problem Background

Historically, a Mac with FileVault enabled would stop at the login screen after a reboot, before the network or remote access services started. This required physical keyboard access to unlock and "lost" the machine to remote admins.

## Requirements

1. **Remote Login**: Must be enabled in System Settings > General > Sharing. (Or pushed via MDM `com.apple.RemoteManagement`).
2. **Network**: A hardwired Ethernet connection is most reliable for Pre-boot networking.
3. **Authorization**: The SSH user must be a FileVault-enabled user.
4. **OS**: macOS 26 or later.

## Remote Unlock Command

From a remote terminal:

`SSH -o PreferredAuthentications=password -o PubkeyAuthentication=no username@mac-ip`

After entering the password, the SSH session will momentarily drop as the encryption keys are released and the system finishes its boot sequence.

## Security Risks & Mitigation

| Risk              | Mitigation Measure                                                   |
| :---------------- | :------------------------------------------------------------------- |
| Brute Force       | Limit source IP, use firewall, strong passwords, change default port |
| Man-in-the-Middle | Verify host keys, use VPN                                            |
| Network Sniffing  | Dedicated management VLAN, Network Access Control (NAC)              |

## 2026 Safety Warning (M5 Macs)

On **M5 Silicon** Macs, Apple has tightened **Secure Enclave** protections.

- If you have enabled "Lockdown Mode" or "Advanced Data Protection," the Pre-boot SSH stack may be crippled for safety.

- **Recommendation**: For server-room units requiring remote telemetry, ensure these high-restriction security toggles are managed carefully via MDM to allow the network stack to initialize.

## Deployment Advice

- **Recommended**: Server-room Mac minis, headless units, and multi-campus environments.
- **Not Recommended**: Student labs, public kiosks, or unsecured network segments.
