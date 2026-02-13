---
id: mac-14

title: "How do I deploy multiple network printers to teacher Macs using Jamf Pro?"

category: "Section 7: Advanced Mac Management"

important: false

tags: ["Printers", "AirPrint", "lpadmin", "Policy", "Self Service"]
---

**Modern Mac printing should prioritize the 'AirPrint (driverless)' protocol. For advanced configurations, use 'Policies' or Shell scripts executing the `lpadmin` command.**

Since macOS 12 Monterey, Apple has shifted towards IPP/AirPrint, significantly reducing the need for vendor-specific PPD drivers.

## Deployment Strategies:

### Method 1: Native Jamf Pro UI (Best for Beginners)

1. **Add Printer**: Go to **Settings > Computer Management > Printers**.
2. Enter the IP and Display Name.
3. **Key**: If the printer supports AirPrint, select **Generic PCL Laser Printer** or **Generic PostScript Printer**. No vendor driver is needed.
4. **Policy**: Create a policy to install this printer. Set the trigger to **Self Service** so teachers can install only the printers they need for their specific office.

### Method 2: Shell Script (Advanced / Driverless)

For precise control, use a script to call `lpadmin`:

```bash
#!/bin/bash

# Define Variables

PRINTER_NAME="Office_HP_M404"

DISPLAY_NAME="Admin Office HP M404"

ADDRESS="ipp://192.168.1.100/ipp/print"

# Execute lpadmin with -m everywhere for auto-AirPrint

/usr/sbin/lpadmin -p "$PRINTER_NAME" -D "$DISPLAY_NAME" -E -v "$ADDRESS" -m everywhere -o printer-is-shared=false

echo "Printer $DISPLAY_NAME installed successfully."

```

### Method 3: Handling Older Printers (Driver Required)

1. Download the vendor `.pkg` and upload it to Jamf Pro.
2. Create a policy to install the `.pkg` first.
3. Use `lpadmin` with the specific PPD path (e.g., `-P "/Library/Printers/PPDs/Contents/Resources/HP.gz"`).

## Practical Advice:

**Use Self Service**. Deploying dozens of printers automatically creates a cluttered menu for teachers. By placing printers in Self Service with clear names (e.g., "Install - 2F Staff Room Printer"), you minimize confusion and support calls.
