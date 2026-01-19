---
term: "DNS over HTTPS/TLS (DNS 加密協定)"
category: ["Network"]
tags: ["DoH", "DoT", "DNS 加密", "隱私", "Jamf Safe Internet"]
---
## 術語定義

加密的 DNS 查詢協定。DoH 使用 HTTPS (Port 443) 加密 DNS 請求，DoT 使用 TLS (Port 853)。可防止 ISP 或中間人監聽 DNS 查詢，保護隱私，但也可能繞過學校 DNS 過濾。

## 白話文比喻

傳統 DNS 像「明信片」，郵差（ISP）看得到你寄給誰。DoH 像「密封信件」，郵差只知道寄到哪個郵局，看不到具體內容。

## MDM 相關

Jamf Safe Internet 使用 Jamf DNS over HTTPS gateway 實現內容過濾，兼顧隱私與安全。但學生若自行安裝第三方 DoH App（如 Cloudflare 1.1.1.1），可能繞過學校過濾。

**應對策略**：

* 使用 Network Extension URL Filtering API（iOS 26 新功能）
* 限制 VPN/DNS App 的安裝
