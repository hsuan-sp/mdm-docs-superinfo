---
term: "Audio Accessory Configuration"
category: ["Hardware"]
tags: ["AirPods", "Beats", "Shared iPad"]
---

## Definition

A new MDM payload introduced in iOS/iPadOS 26 (`com.apple.configuration.audio-accessory.settings`). It allows supervised devices to temporarily pair with AirPods or Beats audio accessories without syncing that pairing information to the user's personal iCloud account. This is specifically designed for Shared iPad environments in schools.

## Plain English

Previously, pairing AirPods was like "Getting Married"—the connection followed you everywhere via iCloud. Now, in shared school environments, it's like a "Temporary Rental." You pair the headphones while you're in the lab, but when you log out, the iPad "forgets" the connection so it doesn't interfere with the next student.

## MDM Context

This solves the long-standing problem of AirPods pairing conflicts in shared labs. It ensures that students don't accidentally connect to a set of headphones used by someone else in a previous class.
