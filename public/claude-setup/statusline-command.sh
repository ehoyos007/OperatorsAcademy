#!/bin/bash

# Read JSON input from stdin
input=$(cat)

# Extract data from JSON
cwd=$(echo "$input" | jq -r '.workspace.current_dir')
model_name=$(echo "$input" | jq -r '.model.display_name')
used_percentage=$(echo "$input" | jq -r '.context_window.used_percentage // empty')

# Get project name (basename of cwd)
project_name=$(basename "$cwd")

# Get git branch if in a git repo
git_branch=""
if [ -d "$cwd/.git" ] || git -C "$cwd" rev-parse --git-dir > /dev/null 2>&1; then
  branch=$(git -C "$cwd" symbolic-ref --short HEAD 2>/dev/null || git -C "$cwd" describe --tags --exact-match 2>/dev/null || echo "detached")
  if [ -n "$branch" ]; then
    # Check for uncommitted changes
    if ! git -C "$cwd" diff --quiet 2>/dev/null || ! git -C "$cwd" diff --cached --quiet 2>/dev/null; then
      git_branch="$(printf '\033[33m')\uE0A0 $branch*$(printf '\033[0m')"
    else
      git_branch="$(printf '\033[32m')\uE0A0 $branch$(printf '\033[0m')"
    fi
  fi
fi

# Build context usage progress bar if available
progress_bar=""
if [ -n "$used_percentage" ]; then
  used_int=$(printf "%.0f" "$used_percentage")

  # Color code based on used percentage
  if (( used_int > 80 )); then
    context_color="\033[31m"  # Red if more than 80%
  elif (( used_int > 50 )); then
    context_color="\033[33m"  # Yellow if more than 50%
  else
    context_color="\033[32m"  # Green otherwise
  fi

  # Create progress bar (10 chars wide)
  bar_width=10
  filled=$(( (used_int * bar_width) / 100 ))
  empty=$(( bar_width - filled ))

  bar="["
  for ((i=0; i<filled; i++)); do bar+="█"; done
  for ((i=0; i<empty; i++)); do bar+="░"; done
  bar+="]"

  progress_bar=" $(printf '\033[2m')│$(printf '\033[0m') $(printf "${context_color}")${bar} ${used_int}%%$(printf '\033[0m')"
fi

# Build status line: Model | Progress Bar | Git Branch | Project Name
printf "$(printf '\033[35m')%s$(printf '\033[0m')%s $(printf '\033[2m')│$(printf '\033[0m') %s $(printf '\033[2m')│$(printf '\033[0m') $(printf '\033[36m')%s$(printf '\033[0m')" \
  "$model_name" \
  "$progress_bar" \
  "$git_branch" \
  "$project_name"
