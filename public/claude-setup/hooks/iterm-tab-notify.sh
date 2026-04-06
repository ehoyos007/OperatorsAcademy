#!/bin/bash
# iTerm2 visual notification when Claude needs input
[[ -z "$ITERM_SESSION_ID" ]] && exit 0

# --- Tab color (soft gold) ---
printf '\033]6;1;bg;red;brightness;200\a' > /dev/tty 2>/dev/null
printf '\033]6;1;bg;green;brightness;160\a' > /dev/tty 2>/dev/null
printf '\033]6;1;bg;blue;brightness;50\a' > /dev/tty 2>/dev/null

# --- Subtle background tint (barely perceptible warm shift) ---
printf '\033]11;#18150f\a' > /dev/tty 2>/dev/null

# --- Cursor turns amber (the clearest per-pane indicator) ---
printf '\033]12;#FF9500\a' > /dev/tty 2>/dev/null
