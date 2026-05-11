#!/bin/bash
# iTerm2 visual notification when Claude needs input.
#
# Tinted tab colour, warm background shift, amber cursor — a per-pane "look
# over here" signal when the user is in another window/tab.
[[ -z "$ITERM_SESSION_ID" ]] && exit 0

# ITERM_SESSION_ID is inherited from the parent iTerm shell even in contexts
# without a controlling tty (desktop app, Remote Control, ssh without -t),
# so the env-var guard alone isn't enough. `[[ -w /dev/tty ]]` is also
# unreliable — the device file has mode 666 in the device table but open()
# can still fail with ENXIO. The only honest test is to actually open it.
# Open once via FD 3; if the open fails, exit silently. The `{...} 2>/dev/null`
# wrapper is necessary because bash emits the redirection error message
# before the inline 2>/dev/null on `exec` takes effect.
{ exec 3>/dev/tty; } 2>/dev/null || exit 0

# --- Tab color (soft gold) ---
printf '\033]6;1;bg;red;brightness;200\a' >&3
printf '\033]6;1;bg;green;brightness;160\a' >&3
printf '\033]6;1;bg;blue;brightness;50\a' >&3

# --- Subtle background tint (barely perceptible warm shift) ---
printf '\033]11;#18150f\a' >&3

# --- Cursor turns amber (the clearest per-pane indicator) ---
printf '\033]12;#FF9500\a' >&3

exec 3>&-
