---
id: app-1

title: "Apps on the iPad are stuck on 'Waiting' or failing to install. How do I troubleshoot this?"

category: "Section 3: App Management & Distribution"

important: true

tags: ["Troubleshooting", "App Installation", "VPP", "DDM"]
---

**A 'Waiting' status usually indicates that the installation process is stalled at either the 'License Verification' or the 'Download Queue' stage.**

When an MDM sends an installation command, a complex handshake occurs between the device and Apple’s servers. Please check these common failure points:

## Common Causes & Solutions:

1. **Insufficient VPP Licenses (Most Common)**:
   - **Check**: Log in to Jamf Pro and verify the license count for that app.
   - **Solution**: If **Used Count = Total Count**, Apple's servers will reject the download request. Go to Apple School Manager (ASM) and acquire more licenses. _Tip: For free apps, always "purchase" a large quantity (e.g., 5,000) to account for future growth._

2. **Campus Network Restrictions**:
   - App downloads require access to Apple’s **Content Delivery Network (CDN)**. If your school’s firewall blocks these domains, the download will sit at 0%.
   - **Test**: Connect the iPad to a mobile hotspot. If the progress bar starts moving immediately, the issue lies with your campus network configuration.

3. **Assignment Mode Conflict**:
   - Ensure the app is set to **"Device-based Assignment"** in Jamf Pro. If it’s incorrectly set to "User-based," the device will wait indefinitely for a student to log into a personal Apple ID.

4. **Declarative Management (DDM) Desync**:
   - In the latest iPadOS versions, app status is reported via DDM. If the status seems "stuck" in the dashboard, try sending a **"Cancel All Pending Commands"** followed by an **"Update Inventory"** command to the device.

5. **Storage Constraints**:
   - If the iPad’s storage is nearly full, the OS will automatically pause background downloads. Check **Settings > General > iPad Storage** to ensure enough overhead remains for the new apps.
