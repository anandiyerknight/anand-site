# Project Quality System

Use this document as the operating system for any serious project. Put it at the
root of the repo as `PROJECT_QUALITY_SYSTEM.md`, then use `GM` and `GN` in every
coding session.

The goal is simple: stop losing context, stop fixing the same bug twice, and make
every session leave the project more stable than it found it.

## Session Commands

### GM: Start Of Session

Paste this at the beginning of a new Codex session:

```text
GM
```

Meaning:

```text
Read PROJECT_QUALITY_SYSTEM.md, then inspect this project and run the Start Of Session protocol. Tell me the current project state, risks, and the safest next step before changing code.
```

### GN: End Of Session

Paste this before ending a Codex session:

```text
GN
```

Meaning:

```text
Run the End Of Session protocol from PROJECT_QUALITY_SYSTEM.md. Update project memory, record decisions, document bugs fixed, summarize changed files, run the appropriate checks, and tell me what is safe to do next.
```

### Start Of Session

Long-form version:

```text
Read PROJECT_QUALITY_SYSTEM.md, then inspect this project and run the Start Of Session protocol. Tell me the current project state, risks, and the safest next step before changing code.
```

### End Of Session

Long-form version:

```text
Run the End Of Session protocol from PROJECT_QUALITY_SYSTEM.md. Update project memory, record decisions, document bugs fixed, summarize changed files, run the appropriate checks, and tell me what is safe to do next.
```

## Required Project Memory

Every project should have these files:

```text
docs/
  CONTEXT.md
  ARCHITECTURE.md
  TESTING.md
  QA_CHECKLIST.md
  DEBUGGING.md
  BUG_LEDGER.md
  DECISIONS.md
```

If they do not exist, create them during the first setup session.

## Start Of Session Protocol

At the start of every session:

1. Read this file.
2. Read the project memory files in `docs/`.
3. Inspect the project structure.
4. Check the current git status.
5. Identify the tech stack, test commands, and run commands.
6. Identify any existing broken state before making changes.
7. State the current working context in plain language.
8. Name the highest-risk areas.
9. Recommend the safest next step.

Do not make code changes until the current state is understood.

## End Of Session Protocol

At the end of every session:

1. Summarize what changed.
2. Run the relevant checks.
3. Record any failing checks and why they failed.
4. Update `docs/CONTEXT.md` if project behavior or setup changed.
5. Update `docs/ARCHITECTURE.md` if structure or boundaries changed.
6. Update `docs/TESTING.md` if test commands, coverage, or strategy changed.
7. Update `docs/QA_CHECKLIST.md` if user workflows changed.
8. Update `docs/DEBUGGING.md` if a useful diagnostic technique was learned.
9. Update `docs/BUG_LEDGER.md` for every bug fixed or discovered.
10. Update `docs/DECISIONS.md` for meaningful product or engineering decisions.
11. Leave a clear “next session starts here” note.

The session is not complete until future-you can resume without guessing.

## Definition Of Done

A task is done only when:

- The intended behavior works.
- The change is scoped to the task.
- Existing tests pass, or failures are clearly explained.
- New behavior has appropriate tests.
- Any fixed bug has a regression test where practical.
- Important edge cases are handled.
- Loading, empty, and error states are handled when user-facing.
- The UI works at relevant screen sizes when user-facing.
- There are no avoidable console or server errors.
- Project memory has been updated.
- The next step is clear.

## Debugging Protocol

When something breaks:

1. Reproduce the issue.
2. Write expected behavior and actual behavior.
3. Minimize the failing case.
4. Read the relevant error messages and logs.
5. Form one hypothesis at a time.
6. Add temporary instrumentation only where useful.
7. Fix the smallest confirmed cause.
8. Add a regression test if practical.
9. Run the relevant checks again.
10. Record the bug in `docs/BUG_LEDGER.md`.

Avoid random edits. A good debugging session makes the problem smaller before it
makes the code bigger.

## Review Protocol

Review every meaningful change for:

- Behavioral regressions.
- Missing tests.
- Unhandled errors.
- Ambiguous names.
- Unnecessary abstraction.
- Security, privacy, or data-loss risks.
- Performance risks.
- UI layout issues.
- Mismatch with existing architecture.
- Documentation drift.

Findings should be concrete and tied to files or behavior.

## Testing Ladder

Use the cheapest reliable test for each risk:

```text
Static checks     -> formatting, linting, type errors
Unit tests        -> isolated logic
Integration tests -> modules, database, API boundaries
End-to-end tests  -> real user workflows
Visual QA         -> layout and responsive behavior
Manual QA         -> final human confidence check
```

Prefer adding regression tests for bugs over broad low-value test coverage.

## Standard Commands

Each project should eventually expose these commands, adapted to its stack:

```text
check      -> lint + typecheck + unit tests
test       -> unit/integration tests
test:e2e   -> end-to-end tests
qa         -> full pre-release quality check
dev        -> local development server
build      -> production build
```

For a JavaScript or TypeScript project, this often means:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "check": "npm run lint && npm run typecheck && npm run test",
    "qa": "npm run check && npm run build && npm run test:e2e"
  }
}
```

Adjust the commands to the project. The names should stay consistent.

## First-Time Setup Protocol

When adding this system to a project for the first time:

1. Copy this file into the repo root.
2. Create the `docs/` files listed above.
3. Fill `docs/CONTEXT.md` with what the project does and how to run it.
4. Fill `docs/TESTING.md` with the current commands, even if incomplete.
5. Create a minimal `docs/QA_CHECKLIST.md` around the main user workflows.
6. Add or normalize the standard commands where practical.
7. Add one smoke test for the most important workflow.
8. Add CI that runs at least the `check` command.

Start small. A reliable small system beats a beautiful system nobody uses.

## Suggested File Templates

### `docs/CONTEXT.md`

```md
# Project Context

## What This Project Does

## Main Users

## Core Workflows

## Tech Stack

## How To Run

## How To Test

## Current Risks

## Next Session Starts Here
```

### `docs/ARCHITECTURE.md`

```md
# Architecture

## Major Parts

## Data Flow

## Important Boundaries

## External Services

## Risky Areas
```

### `docs/TESTING.md`

```md
# Testing

## Commands

## Current Coverage

## What Must Be Tested

## Known Gaps

## Regression Tests Added
```

### `docs/QA_CHECKLIST.md`

```md
# QA Checklist

## Smoke Test

- App starts successfully.
- Main page loads.
- Primary workflow works.
- No obvious console or server errors.

## Core Workflows

## Responsive UI

## Error States

## Release Checklist
```

### `docs/DEBUGGING.md`

```md
# Debugging Notes

## Useful Commands

## Common Failure Modes

## Logs And Observability

## Lessons Learned
```

### `docs/BUG_LEDGER.md`

```md
# Bug Ledger

## YYYY-MM-DD: Bug Title

### Symptom

### Root Cause

### Fix

### Regression Test

### Prevention
```

### `docs/DECISIONS.md`

```md
# Decisions

## YYYY-MM-DD: Decision Title

### Decision

### Why

### Alternatives Considered

### Consequences
```

## Optional Automation

Once a project already has this system, you can make the commands shorter by
adding aliases or snippets in your preferred tool:

```text
GM
Read PROJECT_QUALITY_SYSTEM.md, then run the Start Of Session protocol.

GN
Run the End Of Session protocol from PROJECT_QUALITY_SYSTEM.md.
```

The important part is not the exact command mechanism. The important part is that
every session starts by loading memory and ends by updating memory.
