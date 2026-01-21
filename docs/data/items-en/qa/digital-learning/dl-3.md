---
id: dl-3
title: "How do I perform a 'Reset Network Settings'? What are the risks to my MDM connection?"
category: "Section 5: Digital Initiatives (MOE Project)"
important: false
tags: ["Troubleshooting","Reset","Network","Connection Help"]
---

## Q: How do I perform a 'Reset Network Settings'? What are the risks to my MDM connection?

## Answer

**Resetting network settings is a powerful way to solve stubborn Wi-Fi issues, but it carries the risk of making the device an "unmanaged device" if not handled carefully.**

## The "unmanaged device" Risk:

If you are in the middle of a Wi-Fi migration (transitioning from an old SSID to a new official school network), **do not delete the old profile first**.

* **Correct Process**: Push the new Wi-Fi profile via MDM -> Verify connection -> Only then remove the old setting.
* **The Danger**: If you reset all network settings and the iPad cannot "auto-join" any available school Wi-Fi, it will lose its connection to Jamf Pro. You will then have to manually reconnect every device by hand to restore management.

## When to Perform a Reset:

Use this only when the device shows "Unable to Join Network," fails to see any Bluetooth devices, or Jamf Trust is permanently stuck in a "Connecting" loop that a restart won't fix.

## Steps to Reset:

1. Navigate to **Settings > General > Transfer or Reset iPad > Reset**.
1. Select **Reset Network Settings**. The iPad will reboot.
1. **After Reboot**: All saved Wi-Fi passwords and Bluetooth pairings are wiped. Managed Wi-Fi profiles pushed by the school should automatically re-apply once the device is unlocked and detects the campus signal.

## Practical Tip:

Before resorting to a full network reset, always try toggling **Airplane Mode** for 10 seconds or performing a hard restart. These solve 90% of connectivity hang-ups without erasing your saved configurations.
