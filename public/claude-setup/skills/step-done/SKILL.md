# /step-done — Mid-Session Step Checkpoint

Marks the current step/task as done, updates project files, optionally commits, then IMMEDIATELY continues to the next step. This is a checkpoint, not a stopping point.

## Triggers
- `/step-done`
- `step complete`
- `mark this done`
- `task done, next`
- `next step`

## Workflow

### Step 1: Identify Current Task
Read TASKS.md (or PLAN.md if TASKS.md doesn't exist) and find the task currently in-progress or the first unchecked task.

### Step 2: Mark Complete
In TASKS.md, change the current task from `- [ ]` to `- [x]`:
```markdown
- [x] Task description (completed YYYY-MM-DD)
```

### Step 3: Commit (optional)
If there are uncommitted changes:
```bash
git add -A
git commit -m "<type>: <step description>

Co-Authored-By: Claude <noreply@anthropic.com>"
```

Do NOT push. This is a local checkpoint commit. Pushing happens during /ship.

### Step 4: Show Progress & Continue
Print a brief checkpoint:
```
Step done: <step description>
Progress: <X/Y tasks in current phase>
Next: <next task description>
---
Starting next step...
```

Then **IMMEDIATELY begin working on the next task.** Do NOT wait for user confirmation. The whole point of this skill is to maintain momentum — mark done, show what's next, keep going.

### Step 5: If Phase Complete
If all tasks in the current phase/section are done:
```
Phase complete: <phase name> (<X/X tasks>)
Next phase: <next phase name>
First task: <description>
---
Starting next phase...
```

### Step 6: If All Done
If ALL tasks across all phases are complete:
```
All tasks complete! Run /qa to verify, then /ship to push.
```

## Rules
- NEVER stop after marking a step done — always continue to the next one
- Keep checkpoint output to 3-4 lines max — this is a speed bump, not a wall
- Commit locally but do NOT push (that's /ship's job)
- If TASKS.md doesn't exist, create one from PLAN.md or ask the user
