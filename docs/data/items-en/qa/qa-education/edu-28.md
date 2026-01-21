---
id: edu-28
title: "How should MDM administrators handle the 'Retirement' process for iPad/Mac hardware?"
category: "Section 8: Education Scenarios"
important: false
tags: ["Device Retirement", "ESG", "Data Sanitization", "Asset Management"]
---

## Q: How should MDM administrators handle the 'Retirement' process for iPad/Mac hardware?

## Answer

**Device retirement is more than just turning off the power. It involves data sanitization and the secure return of ownership rights in Apple School Manager (ASM). A proper retirement process ensures student privacy and meets ESG (Environmental, Social, and Governance) sustainability standards.**

## Retirement SOP (Standard Operating Procedure)

## 1. Secure Data Wipe (Zero-Touch Cleanup)

* **Execute Wipe**: Send a remote wipe command via Jamf Pro. Use the **"Erase All Content and Settings (EACS)"** command for modern Macs and iPads; it is faster and more secure than a traditional re-installation.
* **Verification**: Ensure the MDM console confirms the "Wipe Complete" status before physical disposal.

## 2. Disassociation in ASM (Release from ASM)

This is the most critical step. It prevents the device from trying to enroll back in the school MDM if it is resold or recycled:

* Log in to **Apple School Manager**.
* Search for the serial number and select **"Release Device."**
* **WARNING**: Once released, a device cannot be re-added to ADE/DEP without physical access and a tethered connection to Apple Configurator. Only release devices that are permanently leaving the organization.

## 3. Inventory Archiving

* Do not immediately delete the record from your MDM. Move it to a **"Retired/Decommissioned"** group for 12 months.
* Export a final report (Serial, Purchase Date, Retirement Date) to serve as an audit trail for asset disposal.

## 4. Sustainability & ESG

* **Second Life**: If the hardware is functional but cannot support newer OS versions, consider repurposing it as a "Library E-reader" or a dedicated "Sign-in Kiosk."
* **Certified Recycling**: For damaged units, choose a certified e-waste recycler and mark the device as **"Decommissioned"** in ASM for ESG reporting.

## Summary Advice

A rigorous retirement process protects the school from data breaches and ensures your MDM license count remains accurate. Conduct a "Fleet Health Audit" every semester to keep your inventory lists clean and secure.
