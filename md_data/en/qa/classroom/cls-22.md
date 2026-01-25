---
id: cls-22

title: "The school network is divided into 'Teacher' and 'Student' VLANs. Will Apple Classroom still work?"

category: "Section 4: Classroom Management & Instructional Tools"

important: true

tags: ["Network Architecture", "VLAN", "Bonjour", "mDNS"]
---

**By default, no. Apple Classroom relies on Bonjour (mDNS) broadcast packets, which do not cross different subnets or VLANs.**

If your school network separates teachers (e.g., 192.168.10.x) and students (e.g., 192.168.20.x), you must implement a specific network configuration.

## Solution: Configure a Bonjour Gateway (or mDNS Reflector)

The network administrator must configure the core switch or Wireless LAN Controller (WLC) to:

1. **Enable mDNS Bridging/Relay**: This allows Bonjour packets to flow between VLANs.

2. **Permit Specific Services**: Specifically allow `_classroom._tcp` (Apple Classroom) and `_airplay._tcp` (AirPlay).

## Alternative Workaround:

If the network hardware does not support mDNS relay, the simplest solution is to have the teacher connect their iPad to the **'Student Wi-Fi'** SSID. This places both parties in the same broadcast domain, enabling a seamless connection.
