---
term: "Network Extension URL Filtering API"
category: ["Network"]
tags: ["Filtering", "Security", "Privacy", "macOS Tahoe"]
---

## Definition

An advanced system-level API introduced in iOS 26 and macOS Tahoe for performant and privacy-conscious URL filtering. This API allows security applications (like **Jamf Safe Internet**) to monitor and block web requests without routing all traffic through a traditional, often slower, VPN tunnel. It enables the OS to handle the filtering directly, improving battery life and user privacy by not requiring traffic decryption.

## Plain English

Previously, school web filtering was like a "Security Checkpoint" where every single car (piece of data) had to wait in line to be checked, which made everything slow. This new technology is like a "Smart GPS" inside every car. The car knows which "roads" (websites) are dangerous and simply refuses to go there. This makes the internet faster and better for your battery because the car doesn't have to wait in line at a checkpoint.
