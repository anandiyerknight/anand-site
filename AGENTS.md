# AGENTS.md — Development Rulebook

> Read this entire file before writing, editing, or deleting any code.
> No exceptions.

---

## RULE 0 — Before You Write Anything

1. Search the codebase for existing implementations of what you're about to build.
2. Map the full chain from UI to DB before writing a single line.
3. If anything in the chain is unclear or missing, stop and ask. Do not invent.
4. State your plan in a comment block before coding it.

---

## RULE 1 — No Orphaned Code

- Every UI component must be connected to a real hook, service, or API route.
- Every API route must be called from somewhere in the frontend.
- Every hook must have exactly one owner component or be explicitly shared.
- If you create something that is not yet wired, mark it `// TODO: NOT WIRED` and list it in your change summary.
- No mock data, placeholder functions, or hardcoded responses in production paths unless explicitly instructed.

---

## RULE 2 — No Duplication

- Before creating a component, hook, service, utility, or API route — search for one that already does this.
- If something similar exists, extend or refactor it. Do not create a parallel version.
- If two files do the same thing, flag it and consolidate before adding more.
- One source of truth per concern. One DB client. One auth instance. One API wrapper per external service.

---

## RULE 3 — Folder Discipline

- Every file goes in the correct layer. Do not mix concerns.
- UI primitives with no business logic → `components/ui/`
- Feature components wired to data → `components/features/`
- Data fetching and state → `hooks/`
- Business logic with no UI → `services/`
- DB queries and external clients → `lib/`
- Shared types and interfaces → `types/`
- No business logic inside page files.
- No API calls inside UI primitive components.
- No JSX inside hooks, services, or lib files.

---

## RULE 4 — Build Order

Always build bottom-up:

```
Schema → DB query → Service → API route → Hook → Component → Page
```

- Confirm the DB table/schema exists before writing queries.
- Confirm the API route exists and returns real data before writing the hook.
- Confirm the hook works and returns the correct shape before building the component.
- Do not skip layers or build top-down.

---

## RULE 5 — TypeScript Discipline

- Define the type or interface before writing the implementation.
- Every API response must have a typed return shape.
- Every component must have a typed props interface.
- No `any`. No untyped function parameters.
- Types live in `types/`. Do not inline types in component files unless they are local-only.

---

## RULE 6 — State Ownership

- Server data (anything from the DB or an API) → managed by React Query, SWR, or server components only. Never duplicated in `useState`.
- UI state (modals, tabs, form inputs, toggles) → `useState` or `useReducer`, scoped to the component that owns it.
- Global state (auth session, org/tenant context, theme) → centralized store only. Define what belongs here and do not expand it casually.
- Never store the same data in two places. If state is needed in multiple places, lift it once or use the server state layer.

---

## RULE 7 — API Route Rules

- One route per resource action. No multipurpose routes that do different things based on a flag.
- Every route must validate its inputs before processing.
- Every route must handle errors and return consistent error shapes.
- Every route must be authenticated unless explicitly marked public.
- Document every route in this project's API table when created.

---

## RULE 8 — Component Rules

Before creating any component:

- [ ] Does a similar component exist? Search first.
- [ ] Is it UI-only or does it need data? Assign to the correct folder.
- [ ] Define the props interface.
- [ ] Name the hook or service it connects to.
- [ ] Implement loading state.
- [ ] Implement error state.
- [ ] Implement empty state.
- [ ] Is it responsive?

A component is not done until all states are handled.

---

## RULE 9 — Change Impact Protocol

Before marking any task complete, declare:

```
## Change Summary
Modified:  [list every file changed]
Created:   [list every new file]
Deleted:   [list every removed file]
Affected:  [list everything that depends on what changed]
DB change: yes / no — if yes, migration file required
```

If you changed a shared hook, utility, type, or service — check every consumer of that file before closing the task.

---

## RULE 10 — Error Handling

- Every async function must have a try/catch.
- Errors must be logged with enough context to debug: function name, inputs, error message.
- Never silently swallow errors.
- User-facing errors must show a message. Never expose raw error objects to the UI.
- Loading and error states are not optional — handle them at every data boundary.

---

## RULE 11 — Never Break What Works

- If a component, route, or service is working and is not part of the current task — do not touch it.
- If a refactor requires modifying something working, flag it and get explicit approval before proceeding.
- Do not clean up, rename, or reorganize code outside the scope of the current task.
- Surgical changes only. One task = one concern.

---

## RULE 12 — Database Rules

- Never query a table that is not in this project's schema.
- Never mutate data without confirming the operation is intentional. No silent deletes or overwrites.
- Every write must validate data shape before executing.
- Multi-step writes must use transactions where the DB supports it.
- Access control and row-level security rules must be respected — do not bypass them.

---

## RULE 13 — Environment and Config

- No secrets, API keys, or credentials in code. Ever.
- All environment variables must be declared in `.env.example` when added.
- Never hardcode URLs, IDs, or environment-specific values.
- Config that varies between environments must use environment variables.

---

## RULE 14 — Naming Conventions

- Components: `PascalCase`
- Hooks: `useCamelCase`
- Services and utilities: `camelCase`
- Types and interfaces: `PascalCase`
- API routes: `kebab-case`
- DB tables and columns: `snake_case`
- Constants: `UPPER_SNAKE_CASE`
- Files: match the primary export name. One primary export per file.

---

## RULE 15 — When You Are Unsure

- Do not guess and proceed.
- Do not fill gaps with invented logic.
- Do not silently make assumptions.
- State what you do not know. Ask the specific question. Wait for an answer.
- A wrong assumption that ships is always more expensive than a clarifying question.

---

## RULE 16 — Audit Trail for Every Session

At the start of each session, before writing code:

1. List every file relevant to the task.
2. State which already exist and which need to be created.
3. Identify any gaps in the chain (missing route, missing type, missing hook).
4. Get confirmation before filling those gaps.

At the end of each session:
- Complete the Change Summary from Rule 9.
- Flag anything that is incomplete, not wired, or needs follow-up.

---

## HOW TO GIVE THIS AGENT A TASK

Every prompt must include:

```
Context:              [which part of the app]
What I want:          [specific outcome]
What already exists:  [any related file, route, hook, or component you know about]
What must not change: [anything currently working that should not be touched]
Definition of done:   [how will I know this is complete]
```

---

*This rulebook applies to every task in this project, every session, without exception.*
