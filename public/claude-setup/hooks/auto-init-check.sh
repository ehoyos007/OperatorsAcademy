#!/bin/bash
# SessionStart hook: checks for missing project documentation files.
# Exits 0 (silent) if all docs exist or not in a project directory.
# Exits 2 with stderr message if any docs are missing, prompting Claude to offer /auto-init.

input=$(cat)

cwd=$(echo "$input" | jq -r '.cwd // empty')
if [ -z "$cwd" ]; then
  exit 0
fi

# Skip non-project directories
home_dir="$HOME"
claude_dir="$HOME/.claude"

if [ "$cwd" = "$home_dir" ] || [ "$cwd" = "$claude_dir" ]; then
  exit 0
fi

# Also skip if cwd is inside ~/.claude/
case "$cwd" in
  "$claude_dir"/*) exit 0 ;;
esac

# Determine project root
project_root=$(git -C "$cwd" rev-parse --show-toplevel 2>/dev/null || echo "$cwd")
project_name=$(basename "$project_root")

# Skip if no code files exist (empty/non-project directory)
if [ ! -f "$project_root/package.json" ] && \
   [ ! -f "$project_root/Cargo.toml" ] && \
   [ ! -f "$project_root/go.mod" ] && \
   [ ! -f "$project_root/pyproject.toml" ] && \
   [ ! -f "$project_root/requirements.txt" ] && \
   [ ! -f "$project_root/Makefile" ] && \
   [ ! -f "$project_root/README.md" ] && \
   [ ! -d "$project_root/.git" ]; then
  exit 0
fi

# Check for the 8 standard documentation files
missing=""
count=0

for doc in CONTEXT.md TASKS.md PLAN.md PROGRESS.md TEST_LOG.md BRAIN.md VISION.md CLAUDE.md; do
  if [ ! -f "$project_root/$doc" ]; then
    if [ -z "$missing" ]; then
      missing="$doc"
    else
      missing="$missing, $doc"
    fi
    count=$((count + 1))
  fi
done

# All docs present — exit silently
if [ $count -eq 0 ]; then
  exit 0
fi

# Only trigger once per session to avoid repeated prompts
session_id=$(echo "$input" | jq -r '.session_id // empty')
flag_file="/tmp/.claude_autoinit_${session_id}"
if [ -f "$flag_file" ]; then
  exit 0
fi
touch "$flag_file"

cat >&2 << EOF
PROJECT DOCS INCOMPLETE — $count missing in $project_name

Missing: $missing
Project: $project_root

Run /auto-init to analyze this project and create missing documentation files.
Or say "initialize project" to start the process.
EOF

exit 2
