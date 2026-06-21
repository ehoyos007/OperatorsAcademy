# /plan — Research, Then Plan Before Building

Before building anything non-trivial, explore the relevant code (read-only) and present a concrete implementation plan for approval. Do NOT make changes until the user approves the plan.

## Triggers
- `/plan`
- `plan this`
- `think through this`
- `let's plan`
- `how should we build this`

## Workflow

### Step 1: Clarify the Goal
Restate what the user wants to build in one or two sentences so you're aligned before researching. If the request is ambiguous (two reasonable interpretations where picking wrong wastes work), ask one focused question first.

### Step 2: Explore the Relevant Code (read-only)
Find the files this change will touch and understand how they fit together:
```bash
git ls-files | grep -i <keyword>     # find candidate files
```
Use search and reads to map:
- Where the feature/data lives now
- What the change will need to touch (files, functions, types, config)
- Existing patterns to follow so the new code matches the codebase

Do NOT edit anything in this step.

### Step 3: Identify the Approach
Settle on how you'd build it:
- The overall approach (and, if there's a real alternative, why this one over that one)
- The specific files to create or change
- Any tradeoffs, risks, or assumptions
- Whether anything is missing (a dependency, a decision the user needs to make)

### Step 4: Present the Plan
Write it out clearly:

```markdown
## Plan: <feature>

### Approach
<1-3 sentences on the strategy>

### Files to Change
- `path/to/file.ext` — <what changes here>
- `path/to/new-file.ext` (new) — <what it does>

### Steps
1. <ordered, concrete step>
2. ...

### Tradeoffs / Risks
- <anything the user should weigh in on>

### Open Questions
- <anything you need an answer to before starting>
```

### Step 5: Wait for Approval
Stop and ask the user to confirm or adjust. Do NOT start editing until they say go. If they redirect, revise the plan and re-confirm.

## Rules
- READ-ONLY during planning. No edits until the plan is approved.
- Name actual files and steps — a plan that says "implement the feature" is not a plan.
- Surface tradeoffs and open questions instead of silently picking for the user.
- Keep the plan tight; this is a blueprint, not an essay.
- For a tiny, unambiguous change (fix a typo, rename a variable), skip the ceremony and just do it.
