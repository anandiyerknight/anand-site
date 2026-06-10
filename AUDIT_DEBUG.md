# AUDIT_DEBUG.md — Audit & Debugging Rulebook

> Read this entire file before touching any code in a debugging or audit session.
> Your job is to find and fix what is wrong — not to rebuild, refactor, or improve.

---

## RULE 0 — Mindset Before You Start

- You are a detective, not a builder. Observe first, act last.
- Do not change anything until you understand why the bug exists.
- Do not fix symptoms. Find the root cause.
- One fix at a time. Confirm it worked before moving to the next.
- If fixing X breaks Y, that means X and Y are coupled in a way that must be understood before proceeding — not patched around.

---

## RULE 1 — Audit Mode: Read Before You Touch

When entering an audit or debug session:

1. Do not edit any file until you have completed a full read of the relevant chain.
2. Map what exists: list every file involved in the broken behavior.
3. Trace the full chain: UI → hook → service → API route → DB query.
4. Identify every place the data is transformed, mutated, or passed along.
5. Only then form a hypothesis about where the failure is.

---

## RULE 2 — Identify the Failure Layer First

Before writing any fix, answer these questions:

- **Where does the data go wrong?** Is the DB returning wrong data, or is the API transforming it incorrectly, or is the frontend displaying it incorrectly?
- **Is the bug a data bug, a logic bug, or a rendering bug?** These are different problems with different fixes.
- **Is the bug consistent or intermittent?** Intermittent bugs are usually race conditions, async timing issues, or caching problems.
- **Does the bug exist in isolation or only in combination with other actions?** Combination bugs are usually state management or side effect issues.

Do not write a fix until you can answer all four.

---

## RULE 3 — The Duplication Audit

Run this before any debugging session on a broken feature:

- [ ] Is there more than one component rendering this UI? List all of them.
- [ ] Is there more than one hook fetching this data? List all of them.
- [ ] Is there more than one API route handling this action? List all of them.
- [ ] Is there more than one DB query writing to this table for this action? List all of them.
- [ ] Is the same state stored in more than one place? List all locations.

If the answer to any of these is yes — the duplication is likely the bug or contributing to it. Consolidate before patching.

---

## RULE 4 — The Orphan Audit

Run this when behavior is missing or silently failing:

- [ ] Is the component actually mounted and rendered in the page?
- [ ] Is the hook actually called inside the component that needs it?
- [ ] Is the API route actually registered and reachable?
- [ ] Is the service function actually called from the route?
- [ ] Is the DB query actually executing? Add a log to confirm.
- [ ] Are there conditional renders or guards that may be blocking the component from appearing?
- [ ] Are there feature flags, auth checks, or role checks silently blocking execution?

Silent failures are almost always orphaned connections. Trace every link.

---

## RULE 5 — The State Audit

Run this when data appears stale, incorrect, or out of sync:

- [ ] Where is this data defined? (DB, API response, local state, global store)
- [ ] Where is it first set?
- [ ] Where is it read?
- [ ] Where is it updated?
- [ ] Is it ever updated in more than one place?
- [ ] Is there a cache (React Query, SWR, browser cache) that may be serving stale data?
- [ ] Is `useState` holding a copy of data that is also in the server state layer?
- [ ] Are there multiple renders happening that reset state unexpectedly?

State bugs almost always come from having more than one owner. Find the owner. Make it the only owner.

---

## RULE 6 — The API Audit

Run this when an API call is failing, returning wrong data, or not being called at all:

- [ ] Open the network tab. Is the request being made?
- [ ] What is the exact request URL, method, and payload?
- [ ] What is the exact response — status code, headers, body?
- [ ] Does the response shape match what the frontend expects?
- [ ] Is the route authenticated? Is the auth token being sent?
- [ ] Is the route handling errors and returning a consistent error shape?
- [ ] Are there multiple routes that could match this request?
- [ ] Is there middleware intercepting or transforming the request before it hits the handler?

Log the raw request and raw response before making any assumptions about what the API is doing.

---

## RULE 7 — The Database Audit

Run this when data is wrong at the source or writes are silently failing:

- [ ] Run the query directly in the DB console. What does it return?
- [ ] Does the result match what the API is returning? If not, the transformation layer has a bug.
- [ ] Are the correct filters, joins, and conditions applied?
- [ ] Is row-level security or access control filtering out rows unexpectedly?
- [ ] Is a write failing silently without an error being surfaced?
- [ ] Is a transaction rolling back silently?
- [ ] Is there a migration that was not applied in this environment?
- [ ] Is the schema in code in sync with the actual DB schema?

Always verify data at the DB level before blaming the application layer.

---

## RULE 8 — Hypothesis Protocol

Before writing any fix:

1. State the hypothesis in plain language: "I believe the bug is X because Y."
2. State how you will verify it without changing code (log, console, network tab, DB query).
3. Verify the hypothesis.
4. If verified — write the fix for that specific cause only.
5. If not verified — form a new hypothesis. Do not patch blindly.

Never write a fix for an unverified hypothesis. Patches without root cause understanding create new bugs.

---

## RULE 9 — Fix Discipline

When writing a fix:

- Fix only the confirmed root cause. Nothing else.
- Do not refactor surrounding code unless it is directly causing the bug.
- Do not rename, reorganize, or clean up anything outside the fix scope.
- If the fix requires changing a shared component, hook, or service — list every consumer and verify the fix does not break them.
- If the fix introduces a change in behavior that affects other features, flag it before applying.

One fix. One cause. Confirm. Then move on.

---

## RULE 10 — Regression Check

After every fix:

- [ ] Does the original broken behavior now work?
- [ ] Does everything that was working before still work?
- [ ] Are there other places in the codebase where the same bug pattern could exist?
- [ ] If yes — audit those locations before closing the session.

A fix that introduces a regression is worse than no fix. Always check adjacent surfaces.

---

## RULE 11 — Do Not Introduce New Code to Fix Old Code

- Do not add a new component to work around a broken one. Fix the broken one.
- Do not add a new API route to bypass a broken one. Fix the broken one.
- Do not add a new state variable to compensate for a state bug. Fix the state architecture.
- Do not add a new hook that duplicates an existing broken hook. Fix the existing one.
- Adding code to avoid fixing code creates compounding debt. It is the primary cause of doubled and tripled logic in the codebase.

---

## RULE 12 — Common Bug Patterns to Check First

Before going deep, run through this fast checklist:

**Rendering bugs**
- [ ] Component is rendered multiple times (check parent tree for duplicates)
- [ ] Missing key prop in a list causing incorrect reconciliation
- [ ] Conditional render swallowing the component silently
- [ ] CSS conflict hiding an element that is actually mounted

**Data bugs**
- [ ] Stale closure capturing old state value
- [ ] useEffect dependency array missing a value causing stale data
- [ ] Race condition between two async calls — last one wins but first one finishes last
- [ ] Cache not invalidated after a write

**API bugs**
- [ ] Wrong HTTP method being used
- [ ] Auth token expired or not attached
- [ ] Request body not serialized correctly
- [ ] CORS blocking the request
- [ ] Route not registered or misspelled

**DB bugs**
- [ ] Missing migration in current environment
- [ ] RLS policy blocking the query silently
- [ ] Null value not handled causing silent failure
- [ ] Wrong table or column name due to schema drift

---

## RULE 13 — Logging Protocol During Debug

When adding logs to debug:

- Log at every layer boundary: before the API call, inside the route handler, inside the service, at the DB query.
- Log inputs and outputs, not just "reached this point."
- Label every log with the file and function name.
- Remove all debug logs before closing the session. Every single one.
- Do not leave `console.log`, `print`, or debug statements in committed code.

---

## RULE 14 — Environment Audit

When a bug exists in one environment but not another:

- [ ] Are environment variables set correctly in both environments?
- [ ] Is the DB schema in sync across environments?
- [ ] Are there migrations applied in one environment but not the other?
- [ ] Are there feature flags or config differences between environments?
- [ ] Is a cached build being served in production that does not reflect recent changes?
- [ ] Are CORS, auth, or network rules different between environments?

Never assume the code is the same across environments without verifying config.

---

## RULE 15 — Audit Report (End of Session)

At the end of every audit or debug session, produce this report:

```
## Audit Report

Date:         [date]
Scope:        [what was audited or debugged]

### Bugs Found
- [Bug 1]: Root cause / location / status (fixed / deferred / flagged)
- [Bug 2]: Root cause / location / status

### Duplications Found
- [Description of duplicate]: Files involved / action taken

### Orphaned Code Found
- [Description]: File or function / action taken (removed / wired / flagged)

### Fixes Applied
- [Fix 1]: What changed / files modified / verified yes/no
- [Fix 2]: What changed / files modified / verified yes/no

### Still Open
- [Anything not resolved, needs follow-up, or needs a decision]

### Regression Check
- [What was tested after fixes / result]
```

---

## HOW TO GIVE THIS AGENT A DEBUG TASK

Every debug prompt must include:

```
What is broken:       [describe the exact behavior, not your theory about why]
Where it breaks:      [which page, component, route, or action]
What you expected:    [what should have happened]
What actually happens: [what does happen — include error messages verbatim]
When it started:      [after a specific change, always, intermittently]
What you have tried:  [anything already attempted]
What must not change: [anything working that should not be touched]
```

The more precise the bug description, the faster the root cause is found. "It doesn't work" is not a bug report.

---

*This rulebook applies to every audit and debug session in this project, without exception.*
