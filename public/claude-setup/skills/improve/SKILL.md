# /improve — Senior-Engineer Code Audit

Read-only audit of the codebase (or a specific file/area) that produces a prioritized, actionable improvement plan. This skill does NOT edit code — it only reports.

## Triggers
- `/improve`
- `audit this`
- `how would you improve this`
- `suggest improvements`
- `review this for quality`

## Workflow

### Step 1: Scope the Audit
Decide what to look at:
- If the user named a file, directory, or feature, audit that.
- If they didn't, ask whether they want the whole project or a specific area — a whole-repo audit on a large codebase is noisy.
- If recent changes are the target, look at what changed:
```bash
git diff --stat HEAD
git diff HEAD
```

### Step 2: Read the Code (read-only)
Read the relevant files. Trace how the area is used so suggestions are grounded in real call sites, not guesses. Note the project's existing conventions (naming, structure, libraries) so suggestions fit in.

### Step 3: Evaluate Across Four Lenses
For each lens, look for concrete, fixable issues:

1. **Reuse** — duplicated logic, copy-pasted blocks, or hand-rolled code that an existing helper/library already covers.
2. **Simplification** — unnecessary complexity, dead code, over-engineered abstractions, deeply nested conditionals that could flatten.
3. **Efficiency** — needless re-computation, N+1 patterns, work inside loops that could hoist out, missing early returns.
4. **Clarity** — unclear names, missing or misleading comments, functions doing too many things, magic numbers, inconsistent patterns.

Note bugs and security concerns if you spot them, but flag them clearly as separate from quality suggestions.

### Step 4: Produce a Ranked Plan
Output a prioritized list. Highest-impact / lowest-risk first. Each item must be concrete:

```markdown
## Improvement Plan: <scope>

### High Impact
1. **<short title>** — `path/to/file.ext:42`
   Problem: <what's wrong, specifically>
   Suggestion: <the concrete change to make>

### Medium Impact
2. ...

### Low Impact / Nits
3. ...
```

Each item needs a `file:line` reference and a concrete suggestion — not "consider refactoring" but "extract the duplicated date-parsing block at lines 40-58 into a `parseDate()` helper; it's repeated in `report.ts:71`".

### Step 5: Offer Next Step
End by asking which items the user wants implemented. Do not start editing — wait for them to pick.

## Rules
- READ-ONLY. Never edit code in this skill — it produces a plan only.
- Every suggestion needs a `file:line` reference and a concrete action.
- Rank by impact and risk; don't dump an unordered wall of nits.
- Respect the project's existing conventions — don't suggest a rewrite to a different style for its own sake.
- Be honest: if the code is already clean, say so instead of inventing problems.
