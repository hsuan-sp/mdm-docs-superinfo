---
layout: doc
---

<script setup>
import QAViewer from '../.vitepress/components/QAViewer.vue'
import { educationQA } from '../data/08-qa-education'
</script>

# 番外篇：教育場域 MDM 實戰問答

針對台灣「數位學習精進方案」與教育現場 (Apple Classroom, Jamf School) 常見問題的特別收錄。

<QAViewer :data="educationQA" />



<!-- SEARCH_INDEX_START -->
<div style="display: none">
什麼是「數位學習精進方案」？跟一般 MDM 有什麼不同？ 學生關閉 VPN 會影響數據收集嗎？ iPad 遺失或損壞該怎麼辦？ 為什麼派送 App 一直失敗或轉圈圈？ 裝置已經重置，為什麼還沒跑出自動部署 (PreStage)？ 學生明明在教室，為什麼 Apple Classroom 顯示「離線」？ 可以鎖定學生在特定的 App 嗎？ 這是教育部推動的計畫，目標達成「班班有網路，生生用平板」。在此方案下的 iPad **必須** 受 MDM (行動裝置管理系統) 納管。這跟一般企業或個人的設備主要差異在於：「載具不屬於學生個人，而是學校資產」，因此會有較嚴格的限制（如無法自行下載 App、**有色情暴力內容過濾機制**），而不是監控瀏覽紀錄，目的是確保載具專注於學習用途。 理論上 MDM (如 Jamf Pro/School) 的數據收集不完全依賴 VPN，但在教育部的架構中，VPN 常被用來作為流量過濾與資安防護的一環。如果學生手動關閉 VPN，MDM 通常會設定「Always On」政策自動將其重新開啟。若持續被關閉，管理員可在後台收到警示。 1. **遺失**：請立即通報學校資訊組長。管理員可透過 MDM 開啟「遺失模式 (Lost Mode)」，這會鎖定 iPad 並顯示聯絡訊息，同時回傳最後定位資訊。\n2. **損壞**：若是保固內非人為損壞，廠商通常會負責維修；若是人為損壞（如摔破螢幕），則需依照學校的賠償辦法處理。 常見原因有三點：\n1. **VPP 授權不足**：這是最常見的原因。請檢查 ASM (Apple School Manager) 中的授權數量是否足夠，或是否已將授權正確指派給該位置。\n2. **裝置離線**：iPad 必須連網才能接收指令。如果 iPad 休眠太久斷網，指令會卡在佇列中。\n3. **儲存空間不足**：雖然較少見，但若 iPad 空間已滿，App 也會安裝失敗。 請檢查該裝置的 **序號 (Serial Number)** 是否已在該 PreStage Enrollment 的「Scope (範圍)」內，且狀態為「Assigned」。若您剛將裝置加入 ASM，記得在 Jamf School 中按一下「Refresh ASM」同步資料。 這是教師最常遇到的問題。請依序檢查：\n1. **藍牙與 Wi-Fi**：老師與學生的 iPad **都必須** 開啟藍牙與 Wi-Fi。\n2. **同網段**：若是使用「Nearby (附近)」模式，建議連接至同一個無線基地台。\n3. **螢幕喚醒**：請請學生喚醒 iPad 螢幕，有時休眠會導致暫時離線。\n4. **重新啟動 App**：請老師將「課堂」App 滑掉重開。 可以。在 Apple Classroom 中，教師可以選擇「開啟 (Open)」功能，選定一個 App，並將下方的「鎖定在 App (Lock in app after opening)」開關打開。這樣學生就無法按下 Home 鍵跳出，直到老師解鎖或課程結束。
</div>
<!-- SEARCH_INDEX_END -->