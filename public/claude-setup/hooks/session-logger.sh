#!/usr/bin/env bash
# session-logger.sh — Stop hook
# Appends a one-line record to ~/.claude/session-log.md each time a session ends.
# Cross-platform: runs on macOS, Linux, and Windows via Git Bash. No external deps.

set -u

LOG_DIR="$HOME/.claude"
LOG_FILE="$LOG_DIR/session-log.md"

mkdir -p "$LOG_DIR"

# Best-effort project name from the current working directory.
PROJECT="$(basename "$(pwd)" 2>/dev/null || echo unknown)"
STAMP="$(date '+%Y-%m-%d %H:%M' 2>/dev/null || echo '')"

# Seed the file with a header the first time.
if [ ! -f "$LOG_FILE" ]; then
  printf '# Claude Code Session Log\n\n' > "$LOG_FILE"
fi

printf -- '- %s — session ended in **%s**\n' "$STAMP" "$PROJECT" >> "$LOG_FILE"

exit 0
