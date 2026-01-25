---
term: "Directory Service"

category: ["Network"]
---

## Term Definition

A **Directory Service** is a centralized system used to store, organize, and manage identity information such as users, devices, groups, and access permissions within an organization.

It serves as the authoritative source for answering:

- Who a user is

- Which organization or department they belong to
- What resources they are allowed to access

### Common Implementations

- **Microsoft Active Directory (AD)**
- **LDAP (Lightweight Directory Access Protocol)**
- **Cloud-based Identity Services**
  - Azure AD (Entra ID)
  - Google Workspace
  - Okta

### Integration with MDM

When integrated with a **Mobile Device Management (MDM)** system, a Directory Service allows users to enroll devices and access organizational resources using their existing credentials.

This enables:

- Centralized authentication

- Automatic assignment of apps and configurations based on group or role
- Immediate revocation of access across all managed devices when a user leaves the organization

## Analogy

A Directory Service is like an organization's **"Master Registry"**.

It maintains an official record of every member—who they are, which department they belong to, and what permissions they have.

Whenever a user tries to log in to systems such as Wi-Fi, email, or MDM enrollment, those systems consult this central registry to verify identity and permissions, ensuring consistent access control and preventing unauthorized entry.
