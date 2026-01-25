---
id: acc-4

title: "Jamf Pro shows that the 'VPP Token' is about to expire. How do we update it?"

category: "Section 1: Account & Server Management"

important: false

tags: ["VPP", "Token", "Volume Purchasing"]
---

**The VPP (Volume Purchase Program) Token is the secure bridge that syncs app licenses between Apple School Manager (ASM) and Jamf Pro. It must be renewed annually.** If the token expires, Jamf Pro will lose the ability to fetch new licenses or update existing ones, causing app deployments to fail across the school.

## Renewal Workflow:

### Step 1: Download the Token from ASM

1. Log in to [school.apple.com](https://school.apple.com) with "Administrator" or "Content Manager" privileges.
2. Click your **Account Name** in the bottom-left corner and go to **Preferences**.
3. Select **Payments and Billing**.
4. Find the **Apps and Books** section and locate your specific location (e.g., "Main Campus").
5. Click **Download** next to the VPP Token for that location. A `.vpptoken` file will be saved to your computer.

### Step 2: Upload the Token to Jamf Pro

1. Log in to your Jamf Pro dashboard.
2. Navigate to **Settings > Global Management > Volume Purchasing**.
3. Click on the entry for your location and select **Edit**.
4. Select **Upload** and choose the `.vpptoken` file you just downloaded.
5. Click **Save**. The status should now reflect a new expiration date one year in the future.

## Troubleshooting Tips:

- **Location Mismatch**: If you have multiple sites in ASM, ensure you are downloading the token for the _same_ location currently configured in Jamf. Using the wrong token will cause your license counts to drop to zero.
- **Manual Sync**: After renewing, it is good practice to click the **"Sync"** button within Jamf Pro to ensure the immediate update of your app inventory.

## Institutional Advice:

Schedule this task during the school summer break. Renewing your tokens as part of your "Annual IT Health Check" ensures that all classroom apps are ready to be deployed the moment teachers and students return in the autumn.
