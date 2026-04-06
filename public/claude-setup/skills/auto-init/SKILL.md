# /auto-init — Project Documentation Bootstrapper

Detect missing project documentation files, analyze the codebase, draft initial content, and create files with user confirmation.

## Triggers
- `/auto-init`
- `initialize project`
- `set up docs`
- `init docs`
- `create project docs`

## Instructions

### Phase 1: Survey the Project

**Step 1a: Determine Project Root**
```bash
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
PROJECT_NAME=$(basename "$PROJECT_ROOT")
```

**Step 1b: Check for the 8 standard documentation files:**
CONTEXT.md, TASKS.md, PLAN.md, PROGRESS.md, TEST_LOG.md, BRAIN.md, VISION.md, CLAUDE.md

**Step 1c: Report** — Show a table of which files exist vs missing.

**Step 1d: Early Exit** — If all 8 exist, report and stop.

---

### Phase 2: Analyze the Codebase

Run these in parallel:
- **Package config**: Read package.json / Cargo.toml / go.mod / pyproject.toml — extract tech stack
- **README**: Extract project description, setup instructions
- **Directory structure**: `ls -la`, note key directories
- **Git history**: `git log --oneline -20`, recent contributors
- **Existing docs**: Read any of the 8 files that DO exist to avoid duplication

---

### Phase 3: Draft Missing Files

For EACH missing file, draft content using these templates:

**CONTEXT.md**: Overview, tech stack table, key dependencies, architecture, glossary
**TASKS.md**: In Progress (from git), Backlog (from TODOs), Completed (from git log)
**PLAN.md**: Only if project has 5+ source files. Current focus, architecture decisions, next steps.
**PROGRESS.md**: Session 0 auto-init entry with codebase analysis summary.
**TEST_LOG.md**: Test infrastructure detection (framework, command, directory), Session 0 entry.
**BRAIN.md**: Session start queries, capture guidelines tailored to project type, session log section.
**VISION.md**: Only if 10+ commits. Core identity, decision framework, constraint architecture, acceptance criteria.
**CLAUDE.md (project)**: Repository info, tech stack, key directories, dev commands, conventions.

---

### Phase 4: Present and Confirm

For each drafted file, present to user with options: yes / edit / skip.

For CLAUDE.md, ask which git owner / organization to list.

---

### Phase 5: Summary

```markdown
## Auto-Init Complete for {PROJECT_NAME}

Created {N} files: [list]
Skipped {M} files: [list with reasons]
Already existed: {K} files

### Recommended Next Steps
- Review and customize BRAIN.md for your specific needs
- Update TASKS.md with your current priorities
```

## Error Handling

| Scenario | Action |
|----------|--------|
| Not in a project directory | Report and exit |
| Empty project (no package manager, no README, no git) | Create minimal stubs with TODO markers |
| Git not initialized | Skip git-dependent analysis, note in drafts |
| Write permission error | Print content so user can save manually |
| User declines all files | Report and exit |
