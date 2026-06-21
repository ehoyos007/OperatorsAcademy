#!/bin/bash
set -e

# Operators Academy — Claude Code Workflow Installer (macOS / Linux)
# https://operators-academy.vercel.app/tools/install
#
# Usage: curl -fsSL https://operators-academy.vercel.app/claude-setup/install.sh | bash
# Windows users: use install.ps1 instead (irm .../install.ps1 | iex)

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

print_step()    { echo -e "  ${BLUE}[${1}/${TOTAL_STEPS}]${NC} ${2}"; }
print_success() { echo -e "  ${GREEN}  +${NC} ${1}"; }
print_skip()    { echo -e "  ${YELLOW}  ~${NC} ${1}"; }
print_warn()    { echo -e "  ${YELLOW}  !${NC} ${1}"; }
print_done()    { echo ""; echo -e "  ${GREEN}${BOLD}Installation complete.${NC}"; echo ""; }

TOTAL_STEPS=7
print_header

# ── Step 1: Prerequisites ────────────────────────────────────────────
print_step 1 "Checking prerequisites"
if ! command -v curl &> /dev/null; then
  echo -e "  ${RED}Error: curl is required but not installed.${NC}"; exit 1
fi
print_success "curl found"
if command -v claude &> /dev/null; then
  print_success "claude found"
else
  print_warn "Claude Code not found — install it first: https://operators-academy.vercel.app/course/claude-code"
fi
if command -v jq &> /dev/null; then
  print_success "jq found"
else
  print_warn "jq not found — settings merge needs it (brew install jq / apt install jq)"
fi

# ── Step 2: Directories ──────────────────────────────────────────────
print_step 2 "Setting up directories"
mkdir -p "$CLAUDE_DIR" "$AGENTS_DIR" "$SKILLS_DIR" "$HOOKS_DIR"
print_success "~/.claude/ (agents, skills, hooks)"

# ── Step 3: Backup existing config ───────────────────────────────────
print_step 3 "Backing up existing config"
BACKED_UP=false
backup_file() { if [ -f "$1" ]; then mkdir -p "$BACKUP_DIR"; cp "$1" "$BACKUP_DIR/$(basename "$1")"; BACKED_UP=true; fi; }
backup_file "$CLAUDE_DIR/CLAUDE.md"
backup_file "$CLAUDE_DIR/settings.json"
if ls "$AGENTS_DIR"/*.md &> /dev/null 2>&1; then mkdir -p "$BACKUP_DIR/agents"; cp "$AGENTS_DIR"/*.md "$BACKUP_DIR/agents/" 2>/dev/null; BACKED_UP=true; fi
if ls "$SKILLS_DIR"/*/SKILL.md &> /dev/null 2>&1; then mkdir -p "$BACKUP_DIR/skills"; cp -r "$SKILLS_DIR"/* "$BACKUP_DIR/skills/" 2>/dev/null; BACKED_UP=true; fi
if ls "$HOOKS_DIR"/*.sh &> /dev/null 2>&1; then mkdir -p "$BACKUP_DIR/hooks"; cp "$HOOKS_DIR"/*.sh "$BACKUP_DIR/hooks/" 2>/dev/null; BACKED_UP=true; fi
if [ "$BACKED_UP" = true ]; then print_success "Backup saved to ~/.claude/backups/"; else print_skip "No existing config to back up (fresh install)"; fi

# ── Step 4: Config files ─────────────────────────────────────────────
print_step 4 "Installing workflow files"
curl -fsSL "$BASE_URL/CLAUDE.md" -o "$CLAUDE_DIR/CLAUDE.md"
print_success "CLAUDE.md — doc system + workflow triggers"
if [ ! -f "$CLAUDE_DIR/settings.json" ]; then
  curl -fsSL "$BASE_URL/settings-template.json" -o "$CLAUDE_DIR/settings.json"
  print_success "settings.json — created (hooks, high effort)"
elif command -v jq &> /dev/null; then
  TEMP_SETTINGS=$(mktemp); TEMP_TEMPLATE=$(mktemp)
  curl -fsSL "$BASE_URL/settings-template.json" -o "$TEMP_TEMPLATE"
  jq -s '.[0] * .[1]' "$CLAUDE_DIR/settings.json" "$TEMP_TEMPLATE" > "$TEMP_SETTINGS"
  mv "$TEMP_SETTINGS" "$CLAUDE_DIR/settings.json"; rm -f "$TEMP_TEMPLATE"
  print_success "settings.json — merged (your settings preserved)"
else
  print_skip "settings.json exists (jq needed for smart merge)"
fi

# ── Step 5: Agents ───────────────────────────────────────────────────
print_step 5 "Installing agents (7)"
AGENTS=( "explorer" "reviewer" "debugger" "test-runner" "test-writer-fixer" "git-commit" "logger" )
for agent in "${AGENTS[@]}"; do
  curl -fsSL "$BASE_URL/agents/${agent}.md" -o "$AGENTS_DIR/${agent}.md"
  print_success "${agent}"
done

# ── Step 6: Skills ───────────────────────────────────────────────────
print_step 6 "Installing skills (10)"
SKILLS=( "auto-init" "pickup" "commit" "push" "pr" "test" "smoke" "improve" "plan" "wrap-up" )
for skill in "${SKILLS[@]}"; do
  mkdir -p "$SKILLS_DIR/${skill}"
  curl -fsSL "$BASE_URL/skills/${skill}/SKILL.md" -o "$SKILLS_DIR/${skill}/SKILL.md"
  print_success "/${skill}"
done

# ── Step 7: Hooks + verify ───────────────────────────────────────────
print_step 7 "Installing hooks (2) and verifying"
HOOKS=( "auto-init-check" "session-logger" )
for hook in "${HOOKS[@]}"; do
  curl -fsSL "$BASE_URL/hooks/${hook}.sh" -o "$HOOKS_DIR/${hook}.sh"
  chmod +x "$HOOKS_DIR/${hook}.sh"
  print_success "${hook}"
done

AGENT_COUNT=$(ls "$AGENTS_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
SKILL_COUNT=$(ls "$SKILLS_DIR"/*/SKILL.md 2>/dev/null | wc -l | tr -d ' ')
HOOK_COUNT=$(ls "$HOOKS_DIR"/*.sh 2>/dev/null | wc -l | tr -d ' ')
[ -f "$CLAUDE_DIR/CLAUDE.md" ] && print_success "CLAUDE.md present" || print_warn "CLAUDE.md missing"
print_success "$AGENT_COUNT agents, $SKILL_COUNT skills, $HOOK_COUNT hooks installed"

print_done
echo -e "  ${BOLD}What was installed:${NC}"
echo -e "  ${DIM}├─${NC} CLAUDE.md       ${DIM}Global instructions (doc system, plan mode)${NC}"
echo -e "  ${DIM}├─${NC} settings.json   ${DIM}High effort + SessionStart/Stop hooks${NC}"
echo -e "  ${DIM}├─${NC} 7 agents        ${DIM}explorer, reviewer, debugger, testing, git, logging${NC}"
echo -e "  ${DIM}├─${NC} 10 skills       ${DIM}commit, push, pr, test, pickup, wrap-up, and more${NC}"
echo -e "  ${DIM}└─${NC} 2 hooks         ${DIM}auto-init check + session logger${NC}"
echo ""
echo -e "  ${BOLD}Workflow:${NC}"
echo -e "  ${DIM}1.${NC} ${CYAN}\"initialize project\"${NC} to create doc files"
echo -e "  ${DIM}2.${NC} ${CYAN}/pickup${NC} at the start of each session"
echo -e "  ${DIM}3.${NC} ${CYAN}/commit${NC} to checkpoint as you work"
echo -e "  ${DIM}4.${NC} ${CYAN}/test${NC} before shipping"
echo -e "  ${DIM}5.${NC} ${CYAN}/push${NC} to ship (or ${CYAN}/pr${NC} for review)"
echo -e "  ${DIM}6.${NC} ${CYAN}/wrap-up${NC} to save progress"
echo ""
echo -e "  ${DIM}Learn more: https://operators-academy.vercel.app/course/project-system${NC}"
echo ""
