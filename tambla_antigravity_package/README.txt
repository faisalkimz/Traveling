TAMBLA ANTIGRAVITY PACKAGE

Feed the entire folder to Antigravity if it can inspect directories.
If it accepts only one instruction file, give it ANTIGRAVITY_START_HERE.md and make sure the reference folder remains inside the same project context.

Files:
- ANTIGRAVITY_START_HERE.md
- TAMBLA_MASTER_BUILD_SPEC.md
- DEVELOPMENT_WORKPLAN.md
- reference/Tambla_reference_design.png

Best practice:
1. Put this folder inside or next to your React Native project.
2. Tell Antigravity: "Read ANTIGRAVITY_START_HERE.md and follow it exactly. Treat reference/Tambla_reference_design.png as the visual source of truth. Do not code until you have inspected the repository and the image."
3. Make it complete the Golden Reference Screens before broad feature expansion.
4. Review those screens visually before letting it continue.
