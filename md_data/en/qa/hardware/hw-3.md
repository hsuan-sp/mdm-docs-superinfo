---
id: hw-3

title: "AirDrop won't find other devices, or AirPlay can't see the classroom Apple TV. Why?"

category: "Section 6: Hardware & Maintenance"

important: true

tags: ["AirDrop", "AirPlay", "Network Management", "mDNS", "Troubleshooting"]
---

**AirDrop and AirPlay operate differently: AirDrop uses Peer-to-Peer communication, while AirPlay relies heavily on your campus network configuration.**

## AirDrop Troubleshooting (Point-to-Point):

1. **Interface State**: AirDrop requires both Bluetooth (for discovery) and Wi-Fi (for transfer). Even if there is no internet, Wi-Fi must be toggled ON.
2. **Privacy Settings**: Since iOS 16.2, "Everyone" mode automatically reverts to "Contacts Only" after 10 minutes. Ensure the recipient has manually re-enabled "Everyone" for the transfer.
3. **Physical Interference**: In crowded classrooms with many devices, Bluetooth discovery can be inconsistent. Ensure devices are within 3 meters and have a clear line of sight.

## AirPlay Troubleshooting (Network-Based):

1. **VLAN Consistency**: This is the most common campus issue. If a teacher’s iPad is on the `Staff-Wi-Fi` network but the Apple TV is on the `Student-IoT` network, and those networks are isolated, AirPlay packets cannot find their destination.
2. **Multicast/mDNS Filtering**: AirPlay uses the **Bonjour (mDNS)** protocol on UDP port 5353. If the school’s wireless access points have "Client Isolation" enabled, or if the firewall blocks Multicast traffic, the Apple TV won't appear in the list.
3. **Network Optimization (mDNS Gateway)**: For complex campus networks with multiple VLANs, IT should enable an **mDNS Gateway (or Bonjour Proxy)** on the core switch or firewall. This allows discovery packets to "jump" across different network segments.

## Institutional Advice:

If AirPlay issues occur frequently in specific rooms, check the wireless load. When an Access Point (AP) is overloaded with 40+ devices, it will often drop low-priority mDNS discovery packets first, causing the "list of TVs" to appear empty.
