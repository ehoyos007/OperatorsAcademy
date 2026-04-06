#!/bin/bash
set -e

# Operators Academy — Claude Code Workflow Installer
# https://operators-academy.vercel.app/install
#
# Usage: curl -fsSL https://operators-academy.vercel.app/claude-setup/install.sh | bash

BASE_URL="https://operators-academy.vercel.app/claude-setup"
CLAUDE_DIR="$HOME/.claude"
AGENTS_DIR="$CLAUDE_DIR/agents"
SKILLS_DIR="$CLAUDE_DIR/skills"
HOOKS_DIR="$CLAUDE_DIR/hooks"
BACKUP_DIR="$CLAUDE_DIR/backups/pre-install-$(date +%Y%m%d-%H%M%S)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
DIM='\033[2m'
BOLD='\033[1m'
NC='\033[0m'

print_header() {
  echo ""
  echo -e "${PURPLE}${BOLD}  Operators Academy${NC}"
  echo -e "${DIM}  Claude Code Workflow Installer${NC}"
  echo -e "${DIM}  ─────────────────────────────────${NC}"
  echo ""
}

print_step() {
  echo -e "  ${BLUE}[${1}/${TOTAL_STEPS}]${NC} ${2}"
}

print_success() {
  echo -e "  ${GREEN}  +${NC} ${1}"
}

print_skip() {
  echo -e "  ${YELLOW}  ~${NC} ${1}"
}

print_warn() {
  echo -e "  ${YELLOW}  !${NC} ${1}"
}

print_done() {
  echo ""
  echo -e "  ${GREEN}${BOLD}Installation complete.${NC}"
  echo ""
}

TOTAL_STEPS=8

print_header

# ── Step 1: Check prerequisites ──────────────────────────────────────

print_step 1 "Checking prerequisites"

if ! command -v curl &> /dev/null; then
  echo -e "  ${RED}Error: curl is required but not installed.${NC}"
  exit 1
fi
print_success "curl found"

if ! command -v jq &> /dev/null; then
  print_warn "jq not found — status line and hooks require it"
  print_warn "Install with: brew install jq (macOS) or apt install jq (Linux)"
  JQ_MISSING=true
else
  print_success "jq found"
fi

# ── Step 2: Create directory structure ───────────────────────────────

print_step 2 "Setting up directories"

mkdir -p "$CLAUDE_DIR" "$AGENTS_DIR" "$SKILLS_DIR" "$HOOKS_DIR"
print_success "~/.claude/"
print_success "~/.claude/agents/"
print_success "~/.claude/skills/"
print_success "~/.claude/hooks/"

# ── Step 3: Backup existing config ───────────────────────────────────

print_step 3 "Backing up existing config"

BACKED_UP=false

if [ -f "$CLAUDE_DIR/CLAUDE.md" ]; then
  mkdir -p "$BACKUP_DIR"
  cp "$CLAUDE_DIR/CLAUDE.md" "$BACKUP_DIR/CLAUDE.md"
  print_success "CLAUDE.md backed up"
  BACKED_UP=true
fi

if [ -f "$CLAUDE_DIR/settings.json" ]; then
  mkdir -p "$BACKUP_DIR"
  cp "$CLAUDE_DIR/settings.json" "$BACKUP_DIR/settings.json"
  print_success "settings.json backed up"
  BACKED_UP=true
fi

if [ -f "$CLAUDE_DIR/statusline-command.sh" ]; then
  mkdir -p "$BACKUP_DIR"
  cp "$CLAUDE_DIR/statusline-command.sh" "$BACKUP_DIR/statusline-command.sh"
  print_success "statusline-command.sh backed up"
  BACKED_UP=true
fi

# Back up any existing agent files
if ls "$AGENTS_DIR"/*.md &> /dev/null 2>&1; then
  mkdir -p "$BACKUP_DIR/agents"
  cp "$AGENTS_DIR"/*.md "$BACKUP_DIR/agents/" 2>/dev/null
  print_success "Existing agents backed up"
  BACKED_UP=true
fi

# Back up any existing skill files
if ls "$SKILLS_DIR"/*/SKILL.md &> /dev/null 2>&1; then
  mkdir -p "$BACKUP_DIR/skills"
  cp -r "$SKILLS_DIR"/* "$BACKUP_DIR/skills/" 2>/dev/null
  print_success "Existing skills backed up"
  BACKED_UP=true
fi

# Back up any existing hooks
if ls "$HOOKS_DIR"/*.sh &> /dev/null 2>&1; then
  mkdir -p "$BACKUP_DIR/hooks"
  cp "$HOOKS_DIR"/*.sh "$BACKUP_DIR/hooks/" 2>/dev/null
  print_success "Existing hooks backed up"
  BACKED_UP=true
fi

if [ "$BACKED_UP" = true ]; then
  print_success "Backup saved to: ~/.claude/backups/"
else
  print_skip "No existing config to back up (fresh install)"
fi

# ── Step 4: Download config files ────────────────────────────────────

print_step 4 "Installing workflow files"

# Download CLAUDE.md
curl -fsSL "$BASE_URL/CLAUDE.md" -o "$CLAUDE_DIR/CLAUDE.md"
print_success "CLAUDE.md — 8-file doc system + 20+ trigger phrases"

# Download status line script
curl -fsSL "$BASE_URL/statusline-command.sh" -o "$CLAUDE_DIR/statusline-command.sh"
chmod +x "$CLAUDE_DIR/statusline-command.sh"
print_success "statusline-command.sh — Context bar (model, git, usage)"

# Merge or create settings.json
if [ ! -f "$CLAUDE_DIR/settings.json" ]; then
  curl -fsSL "$BASE_URL/settings-template.json" -o "$CLAUDE_DIR/settings.json"
  print_success "settings.json — Created with hooks, plugins, high effort"
elif command -v jq &> /dev/null; then
  # Smart merge: preserve user settings, add new features
  TEMP_SETTINGS=$(mktemp)
  TEMP_TEMPLATE=$(mktemp)
  curl -fsSL "$BASE_URL/settings-template.json" -o "$TEMP_TEMPLATE"
  jq -s '.[0] * .[1]' "$CLAUDE_DIR/settings.json" "$TEMP_TEMPLATE" > "$TEMP_SETTINGS"
  mv "$TEMP_SETTINGS" "$CLAUDE_DIR/settings.json"
  rm -f "$TEMP_TEMPLATE"
  print_success "settings.json — Merged (your settings preserved + new features)"
else
  print_skip "settings.json exists (jq needed for smart merge)"
fi

# ── Step 5: Download agents ──────────────────────────────────────────

print_step 5 "Installing agents (8)"

AGENTS=(
  "backend-architect"
  "test-runner"
  "test-writer-fixer"
  "git-commit"
  "qa-orchestrator"
  "logger"
  "debugger"
  "feature-tester"
)

for agent in "${AGENTS[@]}"; do
  curl -fsSL "$BASE_URL/agents/${agent}.md" -o "$AGENTS_DIR/${agent}.md"
  print_success "${agent}"
done

# ── Step 6: Download skills ──────────────────────────────────────────

print_step 6 "Installing skills (9)"

SKILLS=(
  "ship"
  "deploy"
  "wrap-up"
  "pickup"
  "step-done"
  "auto-init"
  "qa"
  "smoke"
  "google-ads-research"
)

for skill in "${SKILLS[@]}"; do
  mkdir -p "$SKILLS_DIR/${skill}"
  curl -fsSL "$BASE_URL/skills/${skill}/SKILL.md" -o "$SKILLS_DIR/${skill}/SKILL.md"
  print_success "${skill}"
done

# ── Step 7: Download hooks ───────────────────────────────────────────

print_step 7 "Installing hooks (4)"

HOOKS=(
  "auto-init-check"
  "iterm-tab-notify"
  "iterm-tab-reset"
  "iterm-tab-title"
)

for hook in "${HOOKS[@]}"; do
  curl -fsSL "$BASE_URL/hooks/${hook}.sh" -o "$HOOKS_DIR/${hook}.sh"
  chmod +x "$HOOKS_DIR/${hook}.sh"
  print_success "${hook}"
done

# ── Step 8: Verify installation ──────────────────────────────────────

print_step 8 "Verifying installation"

VERIFY_PASS=true
[ -f "$CLAUDE_DIR/CLAUDE.md" ] && print_success "CLAUDE.md present" || { print_warn "CLAUDE.md missing"; VERIFY_PASS=false; }
[ -f "$CLAUDE_DIR/settings.json" ] && print_success "settings.json present" || { print_warn "settings.json missing"; VERIFY_PASS=false; }
[ -f "$CLAUDE_DIR/statusline-command.sh" ] && print_success "statusline present" || { print_warn "statusline missing"; VERIFY_PASS=false; }

AGENT_COUNT=$(ls "$AGENTS_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
SKILL_COUNT=$(ls "$SKILLS_DIR"/*/SKILL.md 2>/dev/null | wc -l | tr -d ' ')
HOOK_COUNT=$(ls "$HOOKS_DIR"/*.sh 2>/dev/null | wc -l | tr -d ' ')

print_success "$AGENT_COUNT agents installed"
print_success "$SKILL_COUNT skills installed"
print_success "$HOOK_COUNT hooks installed"

# ── Done ─────────────────────────────────────────────────────────────

print_done

echo -e "  ${BOLD}What was installed:${NC}"
echo -e "  ${DIM}├─${NC} CLAUDE.md          ${DIM}Global instructions (8-file doc system, plan mode)${NC}"
echo -e "  ${DIM}├─${NC} statusline         ${DIM}Terminal status bar (model + context + git)${NC}"
echo -e "  ${DIM}├─${NC} settings.json      ${DIM}High effort, context7 plugin, hooks configured${NC}"
echo -e "  ${DIM}├─${NC} 8 agents           ${DIM}QA, testing, git, backend, debugging${NC}"
echo -e "  ${DIM}├─${NC} 9 skills           ${DIM}ship, deploy, wrap-up, pickup, QA, smoke, and more${NC}"
echo -e "  ${DIM}└─${NC} 4 hooks            ${DIM}Auto-init check, iTerm2 tab notifications${NC}"
echo ""

echo -e "  ${BOLD}Shipping workflow:${NC}"
echo -e "  ${DIM}1.${NC} Say ${CYAN}\"initialize project\"${NC} to create doc files"
echo -e "  ${DIM}2.${NC} Say ${CYAN}\"let's continue\"${NC} or ${CYAN}/pickup${NC} at session start"
echo -e "  ${DIM}3.${NC} Say ${CYAN}\"step done\"${NC} to checkpoint and keep going"
echo -e "  ${DIM}4.${NC} Say ${CYAN}\"wrap up\"${NC} to save progress"
echo -e "  ${DIM}5.${NC} Say ${CYAN}\"ship\"${NC} to commit + push (auto-creates branch + PR)"
echo -e "  ${DIM}6.${NC} Say ${CYAN}\"deploy\"${NC} to merge PR + deploy to production"
echo ""

echo -e "  ${DIM}Learn more: https://operators-academy.vercel.app/course/claude-code${NC}"
echo ""
