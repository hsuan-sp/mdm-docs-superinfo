---
term: "Root Certificate"
category: ["Security"]
---

## 術語定義

Root Certificate（根憑證）是信任鏈 (Chain of Trust) 的源頭。所有受信任的數位憑證，最終都必須追溯到一個受系統信任的 Root CA。MDM 必須將企業的 Root Certificate 派送到裝置，裝置才會信任企業內部的 Wi-Fi 或網站。

## 白話文比喻

這是信任的「老祖宗」。憑證像家譜一樣有層級。如果裝置信任這位老祖宗（Root CA），那麼所有由老祖宗認可的子孫（子憑證），裝置也會一併信任。如果老祖宗不被信任，整家族都會被拒於門外。
