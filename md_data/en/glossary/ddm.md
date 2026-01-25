---
term: "DDM (Declarative Device Management)"

category: ["Core"]
---

## Term Definition

**Declarative Device Management (DDM)** is Apple’s next-generation management architecture designed for a more scaleable and reactive ecosystem.

Core concepts:

- **Declarations** : Instead of a stream of commands, the server sends "Declarations" (sets of rules and desires) to the device.

- **Autonomy** : The device manages itself based on these rules. It monitors its own state (e.g., OS version, app presence) without waiting for a server "poke."
- **Status Channel** : The device proactively reports changes in its state back to the server only when something relevant happens.

This shift significantly reduces server load, improves battery life, and makes device management far more responsive to real-world changes.

## Analogy

This is the shift from **"Following Orders"** to **"Autonomous Management."** Traditional MDM is like a remote-control car where you have to press a button for every single turn. **DDM** is like a **Self-Driving Car** —you give it the destination and the rules of the road (the declarations), and it handles the driving itself. It only lets you know when it has reached its destination or encountered a pothole it can't fix.
