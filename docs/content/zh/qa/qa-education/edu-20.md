---
category: 第八部分：教育場域常見情境 (Education Scenarios)
id: edu-20
important: false
tags:
  - 密碼管理
  - 帳號安全
  - 排錯
title: 【實務排錯】學生將 iPad 密碼設為跟 Apple 帳號 一樣，導致帳號被鎖定怎麼辦？
---
## Q: 【實務排錯】學生將 iPad 密碼設為跟 Apple 帳號 一樣，導致帳號被鎖定怎麼辦？

## Answer

* **這是最常見的「連鎖鎖定」風險。若學生多次輸入錯誤密碼導致裝置與帳號同時被鎖，**
* **管理員需分兩步解鎖。**
* **解鎖 SOP：**

1. **解除裝置鎖定**：先透過 Jamf Pro 發送「Clear Passcode」。
2. **重置管理式 Apple 帳號 密碼**：管理員在 ASM 後台點選該學生帳號，

 點選「重置密碼 (Reset Password)」。

3. **教育宣導**：告知學生裝置密碼與 Apple 帳號 密碼應區分，並由導師協助留存密碼備份。
