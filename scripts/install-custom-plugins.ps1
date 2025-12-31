# PowerShell script for Windows
# Install Custom Plugins for ElizaOS

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Installing Custom Plugins for ElizaOS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "Project root: $ProjectRoot" -ForegroundColor Green
Write-Host ""

# Solana plugin from fork
Write-Host "📦 Installing plugin-solana from 0xspixel-arch..." -ForegroundColor Yellow
try {
    bun add github:0xspixel-arch/plugin-solana#1.x
    Write-Host "✓ plugin-solana installed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Failed to install plugin-solana, continuing..." -ForegroundColor Red
}

Write-Host ""

# Official plugins from elizaos-plugins
Write-Host "📦 Installing official plugins..." -ForegroundColor Yellow

$Plugins = @(
    "@elizaos/plugin-trust",
    "@elizaos/plugin-web-search",
    "@elizaos/plugin-knowledge",
    "@elizaos/plugin-elizacloud",
    "@elizaos/plugin-openai",
    "@elizaos/plugin-openrouter",
    "@elizaos/plugin-autonomous",
    "@elizaos/plugin-memory"
)

foreach ($plugin in $Plugins) {
    Write-Host "  Installing $plugin..." -ForegroundColor Gray
    try {
        bun add $plugin
        Write-Host "  ✓ $plugin installed" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Failed to install $plugin, continuing..." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Plugin Installation Complete!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review installed plugins: bun list | Select-String plugin"
Write-Host "2. Configure environment variables in .env"
Write-Host "3. Build the project: bun run build"
Write-Host "4. Start the agent: cd packages/project-custom; elizaos start"
Write-Host ""

