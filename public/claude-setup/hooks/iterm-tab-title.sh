#!/bin/bash
# iterm-tab-title.sh — Auto-name iTerm2 tab: repo + prompt summary
# Hook: UserPromptSubmit
[[ -z "$ITERM_SESSION_ID" ]] && exit 0

# Read hook input
input=$(cat)
prompt=$(echo "$input" | jq -r '.prompt // empty' 2>/dev/null)
[ -z "$prompt" ] && exit 0

# Repo name
repo=$(basename "$(git rev-parse --show-toplevel 2>/dev/null || echo "$PWD")")

# Clean prompt into short summary:
# 1. Flatten to single line
# 2. Strip common filler phrases
# 3. Truncate to ~45 chars at word boundary
summary=$(echo "$prompt" | \
  tr '\n' ' ' | \
  sed -E 's/^[[:space:]]+//; s/[[:space:]]+/ /g' | \
  sed -E 's/^(can you |could you |please |help me |i need (you )?(to )?|i want (you )?(to )?|lets |let'"'"'s |hey |hi |yo |ok so |ok |so )//gi')

# Trim to last complete word if long
if [ ${#summary} -gt 40 ]; then
  summary=$(echo "$summary" | cut -c1-45 | rev | cut -d' ' -f2- | rev)
fi

# Fallback
[ -z "$summary" ] && summary=$(echo "$prompt" | tr '\n' ' ' | head -c 30)

# Capitalize first letter
summary="$(echo "${summary:0:1}" | tr '[:lower:]' '[:upper:]')${summary:1}"

# Set iTerm2 tab title
printf '\033]0;%s · %s\007' "$repo" "$summary" > /dev/tty 2>/dev/null

exit 0
