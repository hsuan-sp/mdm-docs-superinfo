# Netlify 環境變數設定指南

部署到 Netlify 時，請在 Site settings > Environment variables 設定以下變數：

## Logto 配置

```
LOGTO_ENDPOINT=https://36dxrv.logto.app/
LOGTO_APP_ID=gkv7y7qb9hts3wib55g46
LOGTO_APP_SECRET=Ju7IJJHx4w8JO7VO8zWC4CNjMA6GygyL
LOGTO_BASE_URL=https://mdm-docs-superinfo.netlify.app
LOGTO_COOKIE_SECRET=KzgXM9DILJ87sdICpZcrxJVl52WeMgqO
LOGTO_COOKIE_SECURE=true
```

## 重要提醒

1. **LOGTO_BASE_URL** 必須是你的實際部署網址
2. **LOGTO_COOKIE_SECURE** 在正式環境必須設為 `true`
3. 記得在 Logto Console 更新 Redirect URIs：
   - Sign-in redirect: `https://mdm-docs-superinfo.netlify.app/api/auth/callback`
   - Post sign-out redirect: `https://mdm-docs-superinfo.netlify.app/`
