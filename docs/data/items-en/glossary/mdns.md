---
term: "mDNS (Multicast DNS)"
category: ["Network"]
---

## Definition

Multicast DNS (mDNS) is the underlying network protocol for Apple’s Bonjour discovery technology. It uses UDP port 5353 to broadcast "I am here" signals on a local network, allowing devices to find each other (such as finding an Apple TV or a printer) without a central DNS server. In complex school networks with multiple VLANs, IT may need to configure an **mDNS Gateway** to allow these signals to cross between different areas of the campus.

## Plain English

Think of this as a "Local PA System" for computers. Devices use this to shout, "I'm a printer in Hallway A!" or "I'm an AirPlay screen in Room 302!" on the local network. Because it's a "local shout," the signal usually can't be heard in other buildings or floors unless the school's "Sound Engineers" (the network team) set up a special relay system to broadcast the message further.
