# SAFETY_NET.md — Regression Prevention & Testing Rulebook

> This file is the mechanical safety net for this project.
> Rules and design guidelines tell the agent how to behave.
> This file catches failures when it doesn't.
> Run the commands in this file. They are not optional.

---

## WHY THINGS BREAK AFTER THEY WORK

The agent rewrites code with local context only. It sees the file it is editing.
It does not see every component, hook, and route that depends on what it just changed.
It makes a clean, confident, locally correct change that breaks three things it never looked at.
You find out by clicking around. That is the problem this file solves.

The fix is not better prompts. The fix is mechanical verification that runs automatically
and tells you exactly what broke, where, and why — before you ever open the browser.

---

## ONE-TIME SETUP (run once per project)

### Step 1 — Install the testing stack

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev playwright @playwright/test
npx playwright install
```

### Step 2 — Add vitest config

Create `vitest.config.ts` at project root:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', '.next', 'tests/e2e'],
  },
})
```

### Step 3 — Add test setup file

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

### Step 4 — Add Playwright config

Create `playwright.config.ts` at project root:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})
```

### Step 5 — Add scripts to package.json

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:ui": "vitest --ui",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:all": "vitest run && playwright test",
  "test:coverage": "vitest run --coverage"
}
```

### Step 6 — Create folder structure

```
tests/
├── setup.ts
├── unit/          ← pure function tests
├── components/    ← component render + interaction tests
├── hooks/         ← custom hook tests
├── api/           ← API route tests
└── e2e/           ← full browser flow tests
```

---

## WHAT TO TEST AND WHY

There are four test types. Each catches a different class of breakage.

---

### TYPE 1 — Unit Tests (catches: broken logic)

**What:** Pure functions in `lib/`, `utils/`, `services/`
**Why:** When the agent refactors a utility function, this catches silent behavior changes immediately
**When to run:** After any change to `lib/`, `utils/`, or `services/`

**Template — `tests/unit/example.test.ts`:**

```typescript
import { describe, it, expect } from 'vitest'
import { yourFunction } from '@/lib/yourFile'

describe('yourFunction', () => {
  it('returns expected output for valid input', () => {
    expect(yourFunction(validInput)).toEqual(expectedOutput)
  })

  it('handles null/undefined without throwing', () => {
    expect(() => yourFunction(null)).not.toThrow()
  })

  it('handles edge case: [describe the edge case]', () => {
    expect(yourFunction(edgeCaseInput)).toEqual(edgeCaseExpected)
  })
})
```

**Agent rule:** Every function in `lib/`, `utils/`, and `services/` must have a corresponding unit test. When the agent modifies a function, it must run the existing tests for that function and confirm they still pass before closing the task.

---

### TYPE 2 — Component Tests (catches: broken UI, missing states, broken wiring)

**What:** React components in `components/`
**Why:** Catches when a component stops rendering, loses a prop, or a button stops doing what it should
**When to run:** After any change to `components/`

**Template — `tests/components/Button.test.tsx`:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })
})
```

**Agent rule:** Every component in `components/ui/` must have tests covering: renders correctly, interactive states work, disabled state works, loading state works. Feature components must also test that the correct hook is called with the correct arguments.

---

### TYPE 3 — Hook Tests (catches: broken data fetching, broken state logic)

**What:** Custom hooks in `hooks/`
**Why:** Catches when refactoring a hook breaks the data shape that components depend on
**When to run:** After any change to `hooks/`

**Template — `tests/hooks/useExample.test.tsx`:**

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useYourHook } from '@/hooks/useYourHook'

// Mock the API call
vi.mock('@/lib/api/yourEndpoint', () => ({
  fetchYourData: vi.fn().mockResolvedValue({ id: '1', name: 'Test' })
}))

describe('useYourHook', () => {
  it('returns data in expected shape', async () => {
    const { result } = renderHook(() => useYourHook())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toMatchObject({ id: expect.any(String) })
  })

  it('sets isLoading true while fetching', () => {
    const { result } = renderHook(() => useYourHook())
    expect(result.current.isLoading).toBe(true)
  })

  it('sets error when fetch fails', async () => {
    vi.mocked(fetchYourData).mockRejectedValueOnce(new Error('Network error'))
    const { result } = renderHook(() => useYourHook())
    await waitFor(() => expect(result.current.error).toBeTruthy())
  })
})
```

**Agent rule:** Every hook must have tests covering: correct data shape returned, loading state, error state. When the agent changes a hook's return shape, it must update every test and every component that consumes that hook.

---

### TYPE 4 — E2E Tests (catches: broken flows, navigation jumps, integration failures)

**What:** Full user flows in the browser via Playwright
**Why:** This is the closest thing to you clicking around — but automated, consistent, and runs in 30 seconds
**When to run:** Before any deploy. After any significant feature change.

**These are the tests that catch the "something works then something stops working" problem.**

**Template — `tests/e2e/auth.spec.ts`:**

```typescript
import { test, expect } from '@playwright/test'

test.describe('Authentication flow', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('validpassword')
    await page.getByRole('button', { name: /log in/i }).click()
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('wrong@example.com')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: /log in/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page).toHaveURL('/login')
  })
})
```

**Template — `tests/e2e/navigation.spec.ts` (catches the jump problem):**

```typescript
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Log in first
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!)
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!)
    await page.getByRole('button', { name: /log in/i }).click()
    await page.waitForURL('/dashboard')
  })

  test('navigating to a page does not show blank screen', async ({ page }) => {
    // Take screenshot mid-navigation
    const navigationPromise = page.waitForURL('/your-page')
    await page.getByRole('link', { name: /your page/i }).click()
    // Verify no blank screen — page must have visible content within 1s
    await expect(page.locator('main')).toBeVisible({ timeout: 1000 })
    await navigationPromise
  })

  test('clicking a button gives immediate visual feedback', async ({ page }) => {
    await page.goto('/your-page')
    const button = page.getByRole('button', { name: /save/i })
    await button.click()
    // Button must change state within 100ms of click
    await expect(button).toBeDisabled({ timeout: 100 })
  })

  test('back navigation restores scroll position', async ({ page }) => {
    await page.goto('/list-page')
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.getByRole('link', { name: /view details/i }).first().click()
    await page.goBack()
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(400)
  })
})
```

---

## THE COMMANDS — WHAT TO RUN AND WHEN

```bash
# After editing any logic file (lib, utils, services, hooks)
npm test

# After editing any component
npm test -- tests/components

# Before committing anything
npm run test:all

# When a specific thing is broken and you need to watch tests update live
npm run test:watch

# Full browser flow tests (run before deploy)
npm run test:e2e

# See a visual browser running the tests (best for debugging e2e)
npm run test:e2e:ui
```

**The one command to remember:**
```bash
npm run test:all
```
Run this before telling the agent a task is complete. If it fails, the task is not complete.

---

## AGENT RULES FOR TESTING

These apply to every agent session, every task.

1. **Never mark a task complete without running the relevant tests.**
   - Changed a utility function? Run `npm test -- tests/unit`
   - Changed a component? Run `npm test -- tests/components`
   - Changed a hook? Run `npm test -- tests/hooks`
   - Changed a route or flow? Run `npm run test:e2e`

2. **When adding a new function, component, hook, or route — write its test in the same task.**
   Not later. Not in a follow-up. Same task. Tests are part of done.

3. **When modifying existing code, run existing tests first.**
   Before touching anything, run the tests for that file. If they are already failing, flag it. Do not proceed until the baseline is confirmed.

4. **When a test fails after a change, fix the root cause — not the test.**
   Do not update a test to make it pass without fixing the underlying code. A passing test hiding a real failure is worse than a failing test.

5. **Never delete a test.**
   If a test is no longer relevant, explain why and get explicit approval to remove it.

6. **Test coverage minimum:**
   - Every function in `lib/` and `utils/`: 100%
   - Every component in `components/ui/`: all interactive states covered
   - Every hook: loading, error, and success states covered
   - Every critical user flow: one E2E test

---

## THE CRITICAL FLOW TEST LIST

These are the flows that must have E2E tests. When one breaks, you will know immediately instead of finding out by accident.

Write a test for each of these as you build them. Add to this list as new critical flows are added.

```
□ User can log in
□ User can log out
□ User can sign up
□ Password reset flow completes
□ [Your core feature 1] — complete happy path
□ [Your core feature 2] — complete happy path
□ [Your core feature 3] — complete happy path
□ Form submit succeeds and shows confirmation
□ Form submit fails and shows error without data loss
□ Navigation between main sections works without blank screen
□ Page reloads without losing authenticated state
□ Mobile: primary flow works at 375px
```

Fill in your core features. These are non-negotiable. If any of these fail, nothing ships.

---

## WHAT TO DO WHEN SOMETHING BREAKS

**Step 1 — Run the tests before touching anything:**
```bash
npm run test:all
```
This tells you exactly what is broken and where. Do not open the browser. Do not start reading code. Run the tests first.

**Step 2 — Read the failure output literally:**
The test failure message tells you: which file, which function, which line, what was expected, what was received. This is the root cause. Go there.

**Step 3 — Fix only what the test says is broken.**
Do not refactor. Do not clean up. Fix the specific failure.

**Step 4 — Run tests again after the fix:**
```bash
npm run test:all
```
If more tests fail now than before, your fix introduced a regression. Revert and try again.

**Step 5 — Only open the browser after all tests pass.**
Manual verification is the final check, not the primary debugging tool.

---

## WHEN THE AGENT SAYS "I DON'T KNOW HOW TO TEST THIS"

That is not acceptable. Every piece of logic can be tested. If the agent cannot write a test for something, it means one of three things:

1. The code is too tightly coupled to test — which means the code needs to be refactored into smaller, testable pieces
2. The agent is avoiding the work — push back and require the test
3. The code genuinely has external dependencies (third-party APIs, real DB) — in which case mock those dependencies and test the logic around them

There is no category of application code that is untestable. If it runs, it can be tested.

---

## SNAPSHOT TESTS FOR UI CONSISTENCY

When the design system is locked and components should not visually drift:

```bash
npm install --save-dev @vitest/snapshot
```

```typescript
// tests/components/Button.snapshot.test.tsx
import { render } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

it('matches snapshot', () => {
  const { container } = render(<Button>Click me</Button>)
  expect(container).toMatchSnapshot()
})
```

When a snapshot test fails, it means the component's rendered output changed. The agent must explain why before updating the snapshot. This catches unintentional design drift — a component that suddenly renders differently because of a change the agent made somewhere else.

To update snapshots intentionally:
```bash
npm test -- --update-snapshots
```

Only run this when you consciously approved a visual change. Never let the agent run this automatically.

---

*Tests are not extra work. Tests are the thing that makes all other work reliable.*
*A codebase without tests is not a working codebase. It is a codebase that has not broken yet.*
