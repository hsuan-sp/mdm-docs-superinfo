---
term: "Platform SSO"

category: ["Security", "macOS"]
---

## Term Definition

**Platform Single Sign-On (Platform SSO)** is a framework that deeply integrates a Mac's local user account with an external Identity Provider (IdP).

Capabilities:

- **Sync** : Keeps the local Mac password in sync with the cloud password (e.g., Entra ID or Okta).

- **Kerberos/Tokens** : Automatically acquires authentication tickets in the background.
- **Experience** : When a user unlocks their Mac, they are implicitly signed in to Safari, corporate apps, and file shares without needing to re-authenticate.

## Analogy

This is the **"All-Access School Pass."** In the past, you might have needed one password for your computer and another for your email. **Platform SSO** connects them.

As soon as you unlock your Mac with your face or fingerprint, the computer automatically "tells" all the school apps like Google Drive and Zoom, **"It's really them, let them in!"** so you don't have to type your password again and again.
