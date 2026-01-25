---
id: app-16

title: "Can I standardize the iPad Home Screen layout for students?"

category: "Section 3: App Management & Distribution"

important: false

tags: ["Home Screen Layout", "Restrictions", "Folders"]
---

**Yes. Using a 'Home Screen Layout' configuration profile, administrators can precisely define the placement of apps on student devices.**

## Configuration Method:

1. In Jamf Pro, go to **Mobile Devices > Configuration Profiles**.
2. Select the **Home Screen Layout** payload.
3. Define the contents of the **Dock** and specific **Pages**.
4. You can create "Folders" to group similar apps (e.g., iWork productivity tools).

## Important Constraints and Risks:

- **Locked Layout**: Once applied, **students cannot move or delete app icons** on the Home Screen. The entire layout is "frozen" in the state defined by the administrator.
- **The Overflow Effect**: Any apps not specified in your layout will be pushed to the final page or hidden in the App Library.
- **Recommendation**: This is ideal for younger students or special education needs where a simplified, consistent interface is required. For older students, we recommend allowing flexibility for them to organize their own learning environments.
- **Note**: Many regional MOE/School District setups already include a default layout. Verify yours before creating a competing profile.
