# MASTER_BOOT.md — Universal Coding Session Bootstrap

> Put this file at the root of any coding project.
> Use `GM` at the start of every coding session and `GN` before ending every coding session.
> This file is intentionally project-agnostic. It must work for web apps, mobile apps, scripts, AI tools, APIs, internal dashboards, automation projects, libraries, and prototypes.

---

## Purpose

This file is the master operating system for coding sessions.

Its job is to make sure the coding agent:

- reads the project rules before acting
- understands the current project state
- does not invent missing architecture
- avoids duplicate or orphaned code
- checks existing patterns before creating new ones
- runs the right tests before claiming completion
- updates project memory so the next session can continue without guessing

---

## Universal Rule

Do not write, edit, rename, move, or delete code until the relevant project context has been read and the current architecture chain is understood.

If the chain is unclear, stop and ask a specific question.

---

# Session Commands

## GM — Start Of Session

Use this at the beginning of a new coding session:

```text
GM
```

Meaning:

```text
Read MASTER_BOOT.md, then run the full Start Of Session protocol.
Read the available project rulebooks and memory files.
Inspect the project before changing code.
Tell me the current project state, risks, relevant files, missing pieces, and safest next step.
Do not write code yet.
```

Expanded version:

```text
GM

Read MASTER_BOOT.md.
Then read all available project rulebooks and memory files.
Run the Start Of Session protocol.
Before changing code, report:

1. Files read
2. Current project state
3. Relevant files for this task
4. Existing architecture chain
5. Missing or unclear links
6. Duplicate or orphan risks
7. Test commands available
8. Files that are safe to modify
9. Files that must not be touched
10. Safest implementation plan

Do not write code until this report is complete.
```

---

## GN — End Of Session

Use this before ending a coding session:

```text
GN
```

Meaning:

```text
Run the full End Of Session protocol.
Summarize what changed, run relevant checks, update project memory, document decisions and bugs, and leave a clear next-session handoff.
```

Expanded version:

```text
GN

Run the End Of Session protocol from MASTER_BOOT.md.
Before stopping, produce:

1. Change Summary
2. Files modified, created, deleted
3. Tests/checks run
4. Test results
5. Bugs fixed or discovered
6. Decisions made
7. Documentation updated
8. Known risks still open
9. Anything incomplete or not wired
10. Next safe task
```

---

# Files To Read At Session Start

Read the files that exist. If a file does not exist, do not fail. Report it as missing.

## Core Rulebooks

```text
AGENTS.md
AUDIT_DEBUG.md
DESIGN_SYSTEM.md
PROJECT_QUALITY_SYSTEM.md
SAFETY_NET.md
```

## Project Memory

```text
docs/CONTEXT.md
docs/ARCHITECTURE.md
docs/DEPENDENCY_MAP.md
docs/TESTING.md
docs/QA_CHECKLIST.md
docs/DEBUGGING.md
docs/BUG_LEDGER.md
docs/DECISIONS.md
```

## Project Configuration

Read whichever are relevant and present:

```text
README.md
package.json
requirements.txt
pyproject.toml
Cargo.toml
go.mod
composer.json
Gemfile
Makefile
Dockerfile
docker-compose.yml
.env.example
config files
CI workflow files
```

---

# Start Of Session Protocol

At the start of every session:

1. Read this file.
2. Read all available rulebooks.
3. Read all available project memory files.
4. Inspect the project structure.
5. Check version control status if available.
6. Identify the technology stack without assuming one.
7. Identify available run, build, lint, typecheck, test, and QA commands.
8. Identify the current working context.
9. Identify relevant files for the requested task.
10. Map the existing architecture chain before changing anything.
11. Search for existing implementations before creating anything new.
12. Identify duplicates, orphaned code, unclear ownership, or missing links.
13. Identify risk areas.
14. Recommend the safest next step.
15. Wait for permission if the requested work requires creating missing architecture or changing something outside scope.

---

# Architecture Chain Mapping

Before coding, map the chain that applies to the task.

Use a generic chain. Do not force a web-app structure onto non-web projects.

Examples:

```text
User action / entry point
→ interface layer
→ state or orchestration layer
→ business logic layer
→ integration or persistence layer
→ external system, file system, database, model, API, or runtime
```

For a script or automation:

```text
Command or trigger
→ input parsing
→ validation
→ core operation
→ side effects
→ output/reporting
```

For a UI feature:

```text
Screen or component
→ local state or data hook
→ service/use-case logic
→ API/client/integration layer
→ persistence or external dependency
```

For an API/backend feature:

```text
Route/handler/command
→ input validation
→ authorization or safety checks if applicable
→ service/use-case logic
→ persistence/integration layer
→ response/output shape
```

For a library:

```text
Public API
→ internal module
→ core function/class
→ dependency boundary
→ return value/error contract
```

The exact chain must be discovered from the project. Do not invent one.

---

# Mandatory Pre-Code Report

Before writing code, output this:

```md
## Pre-Code Report

### Files Read
- 

### Current Project State
- 

### Relevant Existing Files
- 

### Existing Architecture Chain
- Entry point:
- Interface layer:
- State/orchestration layer:
- Business logic layer:
- Persistence/integration layer:
- Output/user-facing layer:

### Missing Or Unclear Links
- 

### Existing Implementations To Reuse
- 

### Duplicate Or Orphan Risks
- 

### Files Planned To Modify
- 

### Files Planned To Create
- 

### Files That Must Not Change
- 

### Tests Or Checks To Run
- 

### Implementation Plan
1. 
2. 
3. 
```

If any section cannot be filled, say why.

---

# Hard Failure Conditions

Stop immediately if any of these are true:

- The architecture chain is unclear.
- The task requires a missing dependency that has not been approved.
- A similar implementation already exists and has not been reviewed.
- Ownership of state, data, routes, commands, files, or modules is unclear.
- Existing tests/checks fail before any changes and the failure is relevant.
- The requested change risks modifying working behavior outside the task scope.
- A required type, schema, contract, interface, or input/output shape is unknown.
- The task requires secrets, credentials, or environment values that are not provided safely.
- The implementation would require production mock data or hardcoded responses without explicit approval.

When stopping, explain the blocker and ask the smallest specific question needed to continue.

---

# Generic Coding Rules

## Search First

Before creating a new file, function, component, route, command, module, workflow, or abstraction:

1. Search the project for existing equivalents.
2. Reuse or extend existing patterns where appropriate.
3. Do not create parallel implementations unless explicitly approved.

## No Orphaned Code

Every new piece must be wired to its owner.

Examples:

- A UI element must be reachable from the relevant screen or flow.
- A function must be called or exported intentionally.
- A route/command must be documented and reachable.
- A config value must be used where expected.
- A test helper must be used by tests.

If something is intentionally not wired yet, mark it clearly:

```text
TODO: NOT WIRED — reason and intended owner
```

Also list it in the end-of-session report.

## No Duplication

One source of truth per concern:

- one owner for state
- one wrapper per external service or dependency
- one canonical type/contract per data shape
- one validation path per input boundary
- one shared utility for repeated logic

If duplication exists, flag it before adding more.

## Respect The Project Shape

Do not assume folder names, frameworks, or layers.

Discover the existing structure first, then follow it.

If the project has no structure yet, propose a minimal structure before creating it.

## Small, Surgical Changes

One task equals one concern.

Do not refactor, rename, redesign, reorganize, or clean up unrelated code while implementing the task.

## Type And Contract Discipline

Where the language supports types, schemas, interfaces, or contracts:

- define the expected shape before implementation
- validate external inputs
- return consistent output and error shapes
- avoid untyped escape hatches unless unavoidable and explained

## Error Handling

At every boundary that can fail:

- handle the failure
- surface a useful message
- log or report enough context for debugging
- never silently swallow errors
- never expose sensitive internals to users

## Config And Secrets

- Never hardcode secrets or credentials.
- Never commit private keys, tokens, passwords, or production credentials.
- Use environment/config files where appropriate.
- Document required environment variables in an example config file when applicable.

---

# Debugging / Audit Mode

Use this mode when the task is about a bug, broken behavior, regression, failed test, suspicious output, performance issue, or audit.

Before changing code:

1. Reproduce or inspect the issue.
2. State expected behavior.
3. State actual behavior.
4. Map the relevant chain.
5. Identify where the failure enters the chain.
6. Form one hypothesis.
7. Verify the hypothesis before fixing.
8. Fix only the confirmed root cause.
9. Run the relevant checks again.
10. Record the bug and fix in project memory.

Do not rebuild a feature to fix a bug unless the existing implementation is confirmed unusable and the user approves that direction.

---

# UI / Design Mode

Use this mode when touching visuals, layout, interaction, animation, accessibility, or copy inside the interface.

Before changing UI:

1. Read the design system if available.
2. Identify existing components and tokens.
3. Reuse existing UI primitives where possible.
4. Confirm responsive behavior requirements.
5. Handle loading, empty, error, disabled, success, and active states where relevant.
6. Check accessibility basics.
7. Avoid hardcoded visual values if a token system exists.

If no design system exists, propose a minimal token system before building large UI surfaces.

---

# Testing And Verification

Use the cheapest reliable check for the risk involved.

Possible checks include:

```text
format
lint
typecheck
unit tests
integration tests
end-to-end tests
build
manual smoke test
visual QA
security check
performance check
```

Do not assume specific commands. Discover them from the project.

If commands do not exist, report that and suggest minimal commands appropriate to the project.

A task is not complete until either:

- relevant checks pass, or
- failing checks are clearly documented with the reason and whether they existed before the change

---

# End Of Session Protocol

Before ending every session:

1. Summarize what changed.
2. List every file modified, created, or deleted.
3. Run relevant checks.
4. Report check results.
5. Explain any failing checks.
6. Update project memory files if project behavior, architecture, testing, debugging notes, decisions, or known bugs changed.
7. List anything incomplete, not wired, risky, or deferred.
8. Leave a next-session handoff.

---

# Mandatory End Of Session Report

Output this before stopping:

```md
## Change Summary

### Modified
- 

### Created
- 

### Deleted
- 

### Affected Areas
- 

### Behavior Changed
- Yes/No — explanation

### Data Or Persistence Change
- Yes/No — explanation

### Config Or Environment Change
- Yes/No — explanation

### Tests / Checks Run
- Command:
  - Result:

### Failing Checks
- 

### Bugs Fixed
- 

### Bugs Or Risks Found
- 

### Documentation Updated
- 

### Not Wired / Incomplete
- 

### Next Session Starts Here
- 
```

---

# First-Time Project Setup

If this file is being added to a new or existing project for the first time:

1. Add this file to the project root.
2. Add project rulebooks if useful:

```text
AGENTS.md
AUDIT_DEBUG.md
DESIGN_SYSTEM.md
PROJECT_QUALITY_SYSTEM.md
SAFETY_NET.md
```

3. Create project memory files:

```text
docs/CONTEXT.md
docs/ARCHITECTURE.md
docs/DEPENDENCY_MAP.md
docs/TESTING.md
docs/QA_CHECKLIST.md
docs/DEBUGGING.md
docs/BUG_LEDGER.md
docs/DECISIONS.md
```

4. Fill only what is true. Do not invent architecture.
5. Add available run/test/check commands to `docs/TESTING.md`.
6. Add the main workflows to `docs/QA_CHECKLIST.md`.
7. Add known risks to `docs/CONTEXT.md`.
8. Add meaningful architecture boundaries to `docs/ARCHITECTURE.md`.
9. Add dependency chains to `docs/DEPENDENCY_MAP.md`.

---

# Generic Project Memory Templates

## docs/CONTEXT.md

```md
# Project Context

## What This Project Does

## Main Users Or Consumers

## Core Workflows

## Tech Stack

## How To Run

## How To Test

## Current Risks

## Next Session Starts Here
```

## docs/ARCHITECTURE.md

```md
# Architecture

## Major Parts

## Entry Points

## Data / Control Flow

## Important Boundaries

## External Dependencies

## Risky Areas
```

## docs/DEPENDENCY_MAP.md

```md
# Dependency Map

Document real project chains only.
Do not include examples from other projects.
Do not invent missing layers.

## Feature Or Workflow Name

```text
Entry point
→ interface or command layer
→ orchestration/state layer
→ business logic layer
→ persistence/integration layer
→ output/result
```

## Shared Dependencies

- Dependency:
  - Used by:
  - Owner:
  - Risk:
```

## docs/TESTING.md

```md
# Testing

## Available Commands

## Current Coverage

## What Must Be Tested

## Known Gaps

## Regression Tests Added
```

## docs/QA_CHECKLIST.md

```md
# QA Checklist

## Smoke Test

- Project starts successfully.
- Main entry point works.
- Primary workflow works.
- No obvious runtime errors.

## Core Workflows

## Error States

## Edge Cases

## Release Checklist
```

## docs/DEBUGGING.md

```md
# Debugging Notes

## Useful Commands

## Common Failure Modes

## Logs And Observability

## Lessons Learned
```

## docs/BUG_LEDGER.md

```md
# Bug Ledger

## YYYY-MM-DD: Bug Title

### Symptom

### Root Cause

### Fix

### Regression Test

### Prevention
```

## docs/DECISIONS.md

```md
# Decisions

## YYYY-MM-DD: Decision Title

### Decision

### Why

### Alternatives Considered

### Consequences
```

---

# How To Give A Task

Use this format when possible:

```text
Context:              [which part of the project]
What I want:          [specific outcome]
What already exists:  [known related files, modules, commands, screens, APIs, functions]
What must not change: [working behavior or files that should not be touched]
Definition of done:   [how we know it is complete]
```

For bugs:

```text
What is broken:        [exact behavior]
Where it breaks:       [entry point, file, screen, command, flow, endpoint, module]
What you expected:     [expected behavior]
What actually happens: [actual behavior, including errors]
When it started:       [after change / always / intermittent / unknown]
What you tried:        [attempted fixes or checks]
What must not change:  [working behavior that must remain untouched]
```

---

# Final Instruction

The agent must act like a careful maintainer, not a fast autocomplete.

Understand first.
Change second.
Verify third.
Document last.
