# Subagent Dispatch Map

Each task in the plan dispatches three subagents in sequence:
1. **Implementer** → builds + commits
2. **Spec reviewer** → verifies against spec (must pass before step 3)
3. **Code quality reviewer** → verifies code is well-built

Do NOT start step 3 until step 2 returns ✅.
Do NOT move to the next task until both reviews pass.

---

## Agent + Model Assignment Per Task

| Task | Description | Implementer Agent | Model | Notes |
|---|---|---|---|---|
| 1 | Scaffold Next.js project | `frontend-developer` | sonnet | Shell commands + config, minimal judgment |
| 2 | Brand tokens + global styles | `frontend-developer` | sonnet | CSS + Tailwind config |
| 3 | Pricing data (`lib/pricing.ts`) | `frontend-developer` | haiku | Pure TS data file, no UI |
| 4 | Logo + Nav components | `frontend-developer` | sonnet | Visual components, brand-sensitive |
| 5 | Hero section | `frontend-developer` | sonnet | Most complex visual, Framer Motion + SVG |
| 6 | Feature reveal sections | `frontend-developer` | sonnet | Framer Motion scroll component |
| 7 | Floor plan simulation | `frontend-developer` | sonnet | Complex interactive SVG + popover |
| 8 | Social proof + CTA band | `frontend-developer` | haiku | Simple static components |
| 9 | Assemble demo page | `frontend-developer` | sonnet | Integration task, wires all demo components |
| 10 | Pricing matrix | `frontend-developer` | sonnet | Complex table + modal trigger |
| 11 | Sales modal | `frontend-developer` | sonnet | shadcn Dialog integration |
| 12 | Trust strip + FAQ | `frontend-developer` | haiku | Simple shadcn Accordion components |
| 13 | Assemble pricing page | `frontend-developer` | sonnet | Integration task |
| 14 | Confirmation page | `frontend-developer` | haiku | Simple dynamic route |
| 15 | Responsive + visual QA | `frontend-developer` | sonnet | Needs dev server + judgment |
| 16 | Deploy | **MANUAL** | — | Requires your GitHub + Vercel credentials |

All spec + quality **reviewers**: `general-purpose` agent, **sonnet** model.

---

## Implementer Prompt Template

```
Agent tool:
  subagent_type: "frontend-developer"
  model: [see table above]
  description: "Implement Task N: [task name]"
  prompt: |
    You are implementing Task N: [task name] for the SightMap demo site.

    ## Project Context

    Working directory: ~/sightmap-demo
    Read CLAUDE.md first — it has the full tech stack, brand tokens, file structure, and hard rules.

    ## Task

    [PASTE FULL TASK TEXT FROM PLAN — every step, every code block, verbatim]

    ## Dependencies Completed

    [List which prior tasks are done and what files they created]
    Example: "Task 3 is done — lib/pricing.ts exists with TIERS, getTierBySlug, VALID_SLUGS."

    ## Before You Begin

    Ask questions now if anything is unclear. Don't guess about:
    - Brand token values (they're in CLAUDE.md)
    - File locations (they're in CLAUDE.md)
    - CTA behavior (CLAUDE.md § CTA Behavior)
    - What integrations to add (none — see Hard Rules)

    ## Your Job

    1. Follow the task steps exactly as written
    2. Fix any issues noted in the task (e.g., variable name corrections)
    3. Verify each step's expected output matches before moving on
    4. Commit at the end of each task as specified
    5. Self-review before reporting back

    ## Report Back

    - Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - Files created/modified
    - Any self-review findings
    - Git commit SHA
```

---

## Spec Reviewer Prompt Template

```
Agent tool:
  subagent_type: "general-purpose"
  model: sonnet
  description: "Spec review: Task N — [task name]"
  prompt: |
    You are reviewing whether an implementation matches its specification.
    Read actual code — do not trust the implementer's report.

    ## What Was Requested

    [PASTE FULL TASK TEXT FROM PLAN]

    ## What the Implementer Claims They Built

    [PASTE IMPLEMENTER'S REPORT]

    ## Verify

    Working directory: ~/sightmap-demo

    Read every file the implementer touched. Check:
    - Did they implement EVERYTHING in the task steps?
    - Did they add anything NOT in the task?
    - Do variable names, prop names, and exports match what the plan specifies?
    - Are the commit messages and file paths correct?

    Report:
    - ✅ Spec compliant — list what you verified
    - ❌ Issues: [specific file:line for each problem]
```

---

## Code Quality Reviewer Prompt Template

```
Agent tool:
  subagent_type: "general-purpose"
  model: sonnet
  description: "Quality review: Task N — [task name]"
  prompt: |
    You are reviewing code quality for Task N of the SightMap demo site.
    Only dispatch AFTER spec compliance has passed.

    Working directory: ~/sightmap-demo

    Base SHA: [SHA before task]
    Head SHA: [current SHA after task]

    Run: git diff [base SHA]..[head SHA] to see what changed.

    Review for:
    - TypeScript types correct and non-any
    - Component props clearly typed with interfaces
    - No unused imports or variables
    - Tailwind classes use brand tokens (not hardcoded hex in className)
    - Each file has one responsibility (no component doing 3 things)
    - Client/Server component split is correct (`'use client'` only where needed)
    - No console.logs left in
    - No commented-out code

    SightMap-specific checks:
    - Brand colors come from CSS vars or Tailwind brand- tokens, not arbitrary hex
    - Button radius uses `style={{ borderRadius: 'var(--radius-button)' }}` or `rounded-button`
    - Framer Motion animations use `once: true` on `viewport`

    Report: Strengths · Issues (Critical / Important / Minor) · Assessment (Approved / Needs fixes)
```

---

## Execution Flow

```
Read plan → Create all 16 tasks in TodoWrite

For each task (1–15, in order):
  1. Dispatch implementer (see table above for model)
     → Wait for DONE report
     → If BLOCKED/NEEDS_CONTEXT: resolve and re-dispatch
  2. Dispatch spec reviewer (sonnet)
     → If ❌: implementer fixes → spec reviewer re-reviews
  3. Dispatch code quality reviewer (sonnet)
     → If needs fixes: implementer fixes → quality reviewer re-reviews
  4. Mark task complete in TodoWrite
  5. Note the HEAD commit SHA (used as BASE SHA for next task's reviewer)

Task 16 (Deploy): Hand off to user
After all 15 tasks: run superpowers:finishing-a-development-branch
```
