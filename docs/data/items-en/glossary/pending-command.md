---
term: "Pending Command"
category: ["Core"]
---

## Definition

A Pending Command is an MDM instruction (like "Install App" or "Lock Device") that has been sent by the server but has not yet been executed by the target device. This commonly occurs if the device is offline, has a disrupted connection to **APNs**, or has a backlog in its command queue. The command will remain "Pending" and will automatically execute once the device clears its queue or reconnects to the internet.

## Plain English

Think of this as a "Letter Waiting in the Mailbox." The school's main computer (the MDM) has already "mailed" the instruction to your iPad. If your iPad is turned off or has no Wi-Fi, it can't "open the mail" yet. As soon as you turn your iPad on and connect to Wi-Fi, it "checks the mail" and carries out any pending instructions immediately.
