# Operators Academy - Claude Code Workflow Installer (Windows)
# https://operators-academy.vercel.app/tools/install
#
# Usage (PowerShell):  irm https://operators-academy.vercel.app/claude-setup/install.ps1 | iex
# macOS / Linux users: use install.sh instead (curl ... | bash)

$ErrorActionPreference = 'Stop'

$BaseUrl   = 'https://operators-academy.vercel.app/claude-setup'
$ClaudeDir = Join-Path $HOME '.claude'
$AgentsDir = Join-Path $ClaudeDir 'agents'
$SkillsDir = Join-Path $ClaudeDir 'skills'
$HooksDir  = Join-Path $ClaudeDir 'hooks'
$Stamp     = Get-Date -Format 'yyyyMMdd-HHmmss'
$BackupDir = Join-Path $ClaudeDir "backups/pre-install-$Stamp"

function Say($msg, $color = 'Gray') { Write-Host "  $msg" -ForegroundColor $color }
function Ok($msg)   { Write-Host "  + $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "  ! $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "  Operators Academy" -ForegroundColor Magenta
Write-Host "  Claude Code Workflow Installer (Windows)" -ForegroundColor DarkGray
Write-Host "  ---------------------------------" -ForegroundColor DarkGray
Write-Host ""

function Fetch($url, $dest) {
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
}

# Deep-merge settings (mirrors the mac installer's `jq -s '.[0] * .[1]'`:
# nested objects merge, arrays/scalars from the patch overwrite). No jq needed.
function Merge-Json($base, $patch) {
  foreach ($prop in $patch.PSObject.Properties) {
    $existing = $base.PSObject.Properties[$prop.Name]
    if ($existing `
        -and ($existing.Value -is [System.Management.Automation.PSCustomObject]) `
        -and ($prop.Value -is [System.Management.Automation.PSCustomObject])) {
      Merge-Json $existing.Value $prop.Value
    } else {
      $base | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force
    }
  }
}

# Step 1: Prerequisites
Say "[1/6] Checking prerequisites" 'Cyan'
if (Get-Command claude -ErrorAction SilentlyContinue) {
  Ok "claude found"
} else {
  Warn "Claude Code not found - install it first: https://operators-academy.vercel.app/course/claude-code"
}
if (Get-Command bash -ErrorAction SilentlyContinue) {
  Ok "bash found (hooks will run)"
} else {
  Warn "bash not found - install Git for Windows so the SessionStart/Stop hooks can run: https://git-scm.com/downloads/win"
}

# Step 2: Directories
Say "[2/6] Setting up directories" 'Cyan'
foreach ($d in @($ClaudeDir, $AgentsDir, $SkillsDir, $HooksDir)) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
}
Ok "~/.claude/ (agents, skills, hooks)"

# Step 3: Backup existing config
Say "[3/6] Backing up existing config" 'Cyan'
$backedUp = $false
function Backup($path) {
  if (Test-Path $path) {
    New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
    Copy-Item $path -Destination $BackupDir -Recurse -Force
    $script:backedUp = $true
  }
}
Backup (Join-Path $ClaudeDir 'CLAUDE.md')
Backup (Join-Path $ClaudeDir 'settings.json')
Backup $AgentsDir
Backup $SkillsDir
Backup $HooksDir
if ($backedUp) { Ok "Backup saved to ~/.claude/backups/" } else { Warn "No existing config to back up (fresh install)" }

# Step 4: Config files
Say "[4/6] Installing workflow files" 'Cyan'
Fetch "$BaseUrl/CLAUDE.md" (Join-Path $ClaudeDir 'CLAUDE.md')
Ok "CLAUDE.md - doc system + workflow triggers"
$settingsPath = Join-Path $ClaudeDir 'settings.json'
if (-not (Test-Path $settingsPath)) {
  Fetch "$BaseUrl/settings-template.json" $settingsPath
  Ok "settings.json - created (hooks, high effort)"
} else {
  # Merge the template into the existing settings (yours win on conflicts other
  # than nested objects, which deep-merge) - same result as the mac installer.
  try {
    $tmpl = Join-Path $env:TEMP "oa-settings-template.json"
    Fetch "$BaseUrl/settings-template.json" $tmpl
    $current = Get-Content $settingsPath -Raw | ConvertFrom-Json
    $patch   = Get-Content $tmpl -Raw | ConvertFrom-Json
    Merge-Json $current $patch
    [System.IO.File]::WriteAllText($settingsPath, ($current | ConvertTo-Json -Depth 20))
    Remove-Item $tmpl -ErrorAction SilentlyContinue
    Ok "settings.json - merged (your settings preserved)"
  } catch {
    Warn "settings.json exists - could not auto-merge; left untouched. Add the hooks from settings-template.json manually."
  }
}

# Step 5: Agents + Skills
Say "[5/6] Installing agents (7) and skills (10)" 'Cyan'
$agents = @('explorer','reviewer','debugger','test-runner','test-writer-fixer','git-commit','logger')
foreach ($a in $agents) {
  Fetch "$BaseUrl/agents/$a.md" (Join-Path $AgentsDir "$a.md")
  Ok "agent: $a"
}
$skills = @('auto-init','pickup','commit','push','pr','test','smoke','improve','plan','wrap-up')
foreach ($s in $skills) {
  $dir = Join-Path $SkillsDir $s
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Fetch "$BaseUrl/skills/$s/SKILL.md" (Join-Path $dir 'SKILL.md')
  Ok "skill: /$s"
}

# Step 6: Hooks + verify
Say "[6/6] Installing hooks (2) and verifying" 'Cyan'
$hooks = @('auto-init-check','session-logger')
foreach ($h in $hooks) {
  Fetch "$BaseUrl/hooks/$h.sh" (Join-Path $HooksDir "$h.sh")
  Ok "hook: $h"
}
$agentCount = (Get-ChildItem $AgentsDir -Filter *.md -ErrorAction SilentlyContinue).Count
$skillCount = (Get-ChildItem $SkillsDir -Recurse -Filter SKILL.md -ErrorAction SilentlyContinue).Count
Ok "$agentCount agents, $skillCount skills installed"

Write-Host ""
Write-Host "  Installation complete." -ForegroundColor Green
Write-Host ""
Write-Host "  Workflow:" -ForegroundColor White
Write-Host '    1. "initialize project"  to create doc files'
Write-Host "    2. /pickup   at the start of each session"
Write-Host "    3. /commit   to checkpoint as you work"
Write-Host "    4. /test     before shipping"
Write-Host "    5. /push     to ship (or /pr for review)"
Write-Host "    6. /wrap-up  to save progress"
Write-Host ""
Write-Host "  Learn more: https://operators-academy.vercel.app/course/project-system" -ForegroundColor DarkGray
Write-Host ""
