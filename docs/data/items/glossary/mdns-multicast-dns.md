---
term: "mDNS (Multicast DNS)"
category: ["Network"]
---

## 術語定義

Multicast DNS (mDNS) 是 Bonjour 技術的底層通訊協定。它使用 UDP 5353 連接埠在區域網路內進行廣播，讓裝置互相解析名稱。在跨網段（如不同樓層 VLAN）的校園網路中，網管人員通常需要設定 mDNS Gateway 才能讓 Bonjour 訊號跨越網段傳送。

## 白話文比喻

這是區域網路內的「廣播電台」。裝置透過這個電台發送「我在這裡」的訊號。因為是廣播，訊號通常穿不過牆壁（路由器/VLAN），除非網管幫忙架設中繼站（mDNS Gateway）轉播訊號。
