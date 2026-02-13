---
id: acc-9

title: "The device shows 'Connection Failed' or won't update Inventory. How do I fix it?"

category: "Section 1: Account & Server Management"

important: false

tags: ["Connection Issues", "APNs", "Network", "Troubleshooting"]
---

**This usually indicates a breakdown in communication between the device and the MDM server or Apple's services. Please check the following four core areas in order:**

## Check 1: APNs Certificate Status

- Log in to Jamf Pro and navigate to **Settings > Global Management > Push Certificates**.
- Ensure the certificate status is **Verified** (or Valid).
- **Note**: If the certificate has expired, the MDM completely loses control over devices and it must be renewed immediately.

## Check 2: Network Connectivity & Firewall Rules

The device needs to reach both the Jamf server and Apple's servers. Ensure the campus firewall is not blocking:

- **Apple Push Notification service (APNs)**:
  - Hostname: **apple.com** and all subdomains.
  - Ports: **TCP 443, 2197, 5223**.

- **Jamf Pro Server**: Devices must be able to load your Jamf Cloud URL via HTTPS (443).
- **Test**: Use Safari on the device to visit [appleid.apple.com](https://appleid.apple.com) and your Jamf login page to confirm connectivity.

## Check 3: Date & Time Sync

**Time drift is the most common cause of connection failures.** SSL/TLS encryption requires precise time.

- Check **Settings > General > Date & Time** on the device and ensure **Set Automatically** is enabled.

- If the time deviates by more than a few minutes, the device will reject the secure connection to the server.

## Check 4: MDM Profile & DDM Status

- **Check Profile**: On the iPad, go to **Settings > General > VPN & Device Management** and confirm the "Management Profile" is still "Verified".
- **Clear Pending Commands**:
  1. Open the device record in Jamf Pro.
  2. Go to **History > Management Commands**.
  3. If there are many **Pending** or **Failed** commands, click **Cancel All Pending and Failed Commands**.
  4. Click **Update Inventory** in the top right to trigger a fresh sync.

## Advanced Troubleshooting:

If all the above are normal but updates still fail, the device's **Declarative Device Management (DDM)** state might be stuck. You can try restarting the device or sending a **Blank Push** command via Jamf to forcibly wake up the device's connection process.
