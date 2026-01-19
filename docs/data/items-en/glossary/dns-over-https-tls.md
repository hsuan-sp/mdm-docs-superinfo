---
term: "DNS over HTTPS/TLS (DoH/DoT)"
category: ["Network"]
tags: ["DoH", "DoT", "Privacy", "Filtering"]
---

## Definition

DNS over HTTPS (DoH) and DNS over TLS (DoT) are encrypted protocols used to secure DNS queries. DoH uses the standard HTTPS port (443), while DoT uses port 853. These protocols prevent third parties (such as ISPs) from monitoring or meddling with your DNS requests, improving privacy. However, they can also be used to bypass traditional school-level DNS filters.

## Plain English

Traditional DNS is like a "Postcard"—the mailman (your ISP) can easily see who you are writing to. DoH is like a "Sealed Security Envelope." The mailman knows you sent a letter, but they have no idea exactly which "address" you are looking for inside the envelope.

## MDM Context

Tools like Jamf Safe Internet use a DNS over HTTPS gateway to provide effective content filtering while maintaining user privacy. School admins should be aware that students might try to use third-party DoH apps (like Cloudflare 1.1.1.1) to bypass school filters. This can be mitigated using the **Network Extension URL Filtering API** introduced in modern OS versions or by restricting the installation of VPN/DNS apps.
