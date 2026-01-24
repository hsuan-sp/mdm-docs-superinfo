const crypto = require("crypto");

/**
 * Logto Webhook Handler - 安全過濾與自動註銷
 *
 * 只有通過教育網域 (.edu.tw) 或官方網域 (@superinfo.com.tw) 驗證的帳號才允許保留。
 * 其他來源的帳號將被立即刪除。
 */
exports.handler = async (event, context) => {
  // 僅接受 POST 請求
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // 1. 安全驗證 (Webhook Signing Verification)
  const signingKey = process.env.LOGTO_WEBHOOK_SIGNING_KEY;
  const signature = event.headers["logto-signature-sha256"];
  const rawBody = event.body;

  if (!signingKey || !signature) {
    console.error("❌ 缺少 Webhook 簽章密鑰或標頭");
    return { statusCode: 401, body: "Unauthorized: Missing Signature" };
  }

  try {
    const hmac = crypto.createHmac("sha256", signingKey);
    hmac.update(rawBody);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Webhook 簽章驗證失敗");
      return { statusCode: 401, body: "Unauthorized: Invalid Signature" };
    }
  } catch (error) {
    console.error("❌ 簽章驗證發生錯誤:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }

  // 解析 Request Body
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { event: eventType, data } = body;

  // 2. 白名單檢查邏輯
  // 我們只關心這些事件，這些時刻是檢查帳號的最佳時機
  const targetEvents = ["PostRegister", "PostSignIn", "User.Created"];

  if (!targetEvents.includes(eventType)) {
    // 忽略其他事件，直接回傳 200
    return { statusCode: 200, body: "Ignored Event" };
  }

  const userId = data.id;
  const primaryEmail = data.primaryEmail;

  if (!primaryEmail) {
    console.log(`⚠️ 使用者 ${userId} 無 Email，暫時跳過檢查`);
    return { statusCode: 200, body: "No Email Provided" };
  }

  // 驗證規則
  const isEducationDomain = /\.edu\.tw$/i.test(primaryEmail);
  const isOfficialDomain = primaryEmail.endsWith("@superinfo.com.tw");

  if (isEducationDomain || isOfficialDomain) {
    console.log(
      `✅ 極電資訊 (Superinfo) 安全檢查：使用者 ${primaryEmail} (${userId}) 符合白名單，通行。`
    );
    return { statusCode: 200, body: "User Allowed" };
  }

  // 3. 自動註銷非法帳號 (M2M API Interaction)
  console.log(
    `🚨 極電資訊 (Superinfo) 安全檢查：發現非法使用者 ${primaryEmail} (${userId})，開始執行自動註銷程序...`
  );

  try {
    // 步驟 A - 獲取 M2M Token
    const tokenEndpoint = `${process.env.LOGTO_ENDPOINT}/oidc/token`;
    // 使用專用的 M2M App ID 和 Secret 進行後端操作
    const m2mAppId = process.env.LOGTO_M2M_APP_ID;
    const m2mAppSecret = process.env.LOGTO_M2M_APP_SECRET;

    if (!m2mAppId || !m2mAppSecret) {
      throw new Error("缺少 M2M App 環境變數設定");
    }

    const basicAuth = Buffer.from(`${m2mAppId}:${m2mAppSecret}`).toString(
      "base64"
    );

    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        resource: `${process.env.LOGTO_ENDPOINT}/api`,
        scope: "all",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(
        `Failed to get access token: ${tokenResponse.statusText}`
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 步驟 B - 執行刪除
    const deleteEndpoint = `${process.env.LOGTO_ENDPOINT}/api/users/${userId}`;
    const deleteResponse = await fetch(deleteEndpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (deleteResponse.ok) {
      console.log(
        `🗑️ 極電資訊 (Superinfo) 安全檢查：使用者 ${primaryEmail} 已執行自動註銷 (Deleted)`
      );
    } else {
      console.error(`❌ 自動註銷失敗: ${deleteResponse.statusText}`);
    }
  } catch (error) {
    console.error("❌ M2M API 呼叫失敗:", error);
    // 即使刪除失敗，也回傳 200 以防止 Logto 不斷重試 Hook（我們可以靠日誌來除錯）
  }

  // 4. 輸出與異常處理
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Webhook processed",
      action: "User Deleted",
    }),
  };
};
