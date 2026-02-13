---
id: mac-26

title: "Mixed Fleet Management: Using Smart Groups to distinguish between Intel and Apple Silicon software packages."

category: "Section 7: Advanced Mac Management"

important: false

tags:
  [
    "Hybrid Environment",

    "Intel Mac",

    "Apple Silicon",

    "Smart Group",

    "Deployment Strategy",
  ]
---

**2026 is the sunset year for Intel Macs. Most schools have a hybrid environment containing both 'x86_64 (Intel)' and 'arm 64 (M1–M5)' architectures. Assigning the wrong software package can lead to non-functional apps or system instability.**

## I. Creating Precise Smart Groups (SOP)

IT coordinators should establish these baseline groups in Jamf Pro for accurate deployment:

### 1. Apple Silicon Group (Primary)

- **Criteria**: `Architecture Type`
- **Operator**: `is`
- **Value**: `arm 64` (or `Apple Silicon`)

### 2. Intel Mac Group (Legacy)

- **Criteria**: `Architecture Type`
- **Operator**: `is`
- **Value**: `x86_64`

### 3. Rosetta 2 Status Group

- Create a group for "Apple Silicon Macs MISSING Rosetta 2" to automatically trigger the installation of the Rosetta translation environment if you still rely on legacy Intel apps.

## II. Recommended Deployment Strategy

1. **Prioritize Universal Binaries**: If a developer provides a Universal installer (e.g., Google Chrome or Microsoft Office), use it. macOS will automatically run the correct architecture.
2. **Architecture-Specific .pkgs**:
   - For professional software (Adobe Creative Cloud, specialized lab tools), upload separate packages: `App_v1.0_AppleSilicon.pkg` and `App_v1.0_Intel.pkg`.
   - Scope the former to the Apple Silicon group and the latter to the Intel group.

3. **App Store Apps (VPP)**: This is the most efficient method. Apple’s servers automatically detect the client architecture and download the optimized version. Use VPP whenever possible.

## III. Operational Advice

- **System Updates**: macOS 26 handles updates differently for each architecture. Always use **Declarative Device Management (DDM)** for OS updates; the system will autonomously verify and install the correct update files without manual intervention.
- **Asset Tagging**: Add an "Expiring Support 2028" tag to your Intel Smart Group. This helps in visually tracking budget requirements for the final phase-out of the Intel fleet.

**Administrator's Insight**: The key to managing a mixed environment is "precise grouping." Once your Smart Groups are set, subsequent software deployment becomes error-proof, and it allows for a more scientific understanding of your school's hardware health.
