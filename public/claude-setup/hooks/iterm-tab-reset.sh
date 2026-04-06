#!/bin/bash
# iTerm2 reset all visual indicators when user submits input
[[ -z "$ITERM_SESSION_ID" ]] && exit 0

# Reset tab color
printf '\033]6;1;bg;*;default\a' > /dev/tty 2>/dev/null

# Reset background to profile default (OSC 111)
printf '\033]111\a' > /dev/tty 2>/dev/null

# Reset cursor color to profile default (OSC 112)
printf '\033]112\a' > /dev/tty 2>/dev/null
