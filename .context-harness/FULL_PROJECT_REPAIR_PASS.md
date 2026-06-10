# Full Project Repair Pass

Read `MASTER_BOOT.md` and execute the full checklist across this existing project.

## Goal

Audit the project, find what is broken, fix confirmed issues safely, run checks, and report whether the app is now working.

## Rules

- This is an existing app. Do not rebuild it.
- Do not refactor broadly.
- Do not rename, reorganize, or clean unrelated files.
- Fix only confirmed problems.
- If something is unclear, flag it and continue with safe checks/fixes.
- Do not mark complete until checks have been run.

## Required Phases

1. Load rules and project memory.
2. Produce a baseline audit before edits.
3. Run the safest available checks.
4. Fix one confirmed root cause at a time.
5. Re-run the relevant check after each fix.
6. Verify the app route or main flow where practical.
7. Update durable memory docs.

## Final Output

Produce a Project Repair Report:

- App Status
- Checks Run
- Bugs Found
- Files Modified
- Files Created
- Remaining Blockers
- What I Verified
- Safe Next Step

