---
id: edu-20

title: "【實務排錯】學生將 iPad 密碼設為跟 Apple 帳號 一樣，導致帳號被鎖定怎麼辦？"

category: "第八部分：教育場域常見情境 (Education Scenarios)"

important: false

tags: ["密碼管理", "帳號安全", "排錯"]
---

**這是最常見的「連鎖鎖定」風險。若學生多次輸入錯誤密碼導致裝置與帳號同時被鎖，管理員需分兩步解鎖。**

## 解鎖 SOP

1.  **解除裝置鎖定**：先透過 Jamf Pro 發送「Clear Passcode」指令，讓學生能重新進入裝置。
1.  **重置管理式 Apple 帳號 密碼**：管理員在 Apple School Manager (ASM) 後台找到該學生帳號，點選「重置密碼 (Reset Password)」，產生一組臨時密碼。
1.  **教育宣導**：告知學生裝置密碼（螢幕解鎖）與 Apple 帳號（個人身分）密碼應區分，並建議由導師協助留存學生的密碼備份或使用數位密碼簿。
