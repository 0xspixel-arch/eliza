#!/bin/bash
set -e

echo "=========================================="
echo "Installing Custom Plugins for ElizaOS"
echo "=========================================="
echo ""

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Project root: $PROJECT_ROOT"
echo ""

# Solana plugin from fork
echo "📦 Installing plugin-solana from 0xspixel-arch..."
bun add github:0xspixel-arch/plugin-solana#1.x || {
  echo "⚠️  Failed to install plugin-solana, continuing..."
}

echo ""

# Official plugins from elizaos-plugins
echo "📦 Installing official plugins..."

PLUGINS=(
  "@elizaos/plugin-trust"
  "@elizaos/plugin-web-search"
  "@elizaos/plugin-knowledge"
  "@elizaos/plugin-elizacloud"
  "@elizaos/plugin-openai"
  "@elizaos/plugin-openrouter"
  "@elizaos/plugin-autonomous"
  "@elizaos/plugin-memory"
)

for plugin in "${PLUGINS[@]}"; do
  echo "  Installing $plugin..."
  bun add "$plugin" || {
    echo "  ⚠️  Failed to install $plugin, continuing..."
  }
done

echo ""
echo "=========================================="
echo "Plugin Installation Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Review installed plugins: bun list | grep plugin"
echo "2. Configure environment variables in .env"
echo "3. Build the project: bun run build"
echo "4. Start the agent: cd packages/project-custom && elizaos start"
echo ""

