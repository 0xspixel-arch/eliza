# Quick Start Guide: Custom Plugin Integration

This guide provides step-by-step instructions to get your customized ElizaOS build running with all integrated plugins.

## Prerequisites

- Node.js 23.x
- Bun 1.2.x+
- Git

## Step 1: Install Plugins

Run the installation script from the project root:

**Linux/Mac:**
```bash
bash scripts/install-custom-plugins.sh
```

**Windows PowerShell:**
```powershell
.\scripts\install-custom-plugins.ps1
```

**Manual Installation:**
```bash
# Solana plugin from fork
bun add github:0xspixel-arch/plugin-solana#1.x

# Official plugins
bun add @elizaos/plugin-trust
bun add @elizaos/plugin-web-search
bun add @elizaos/plugin-knowledge
bun add @elizaos/plugin-elizacloud
bun add @elizaos/plugin-openai
bun add @elizaos/plugin-openrouter
bun add @elizaos/plugin-autonomous
bun add @elizaos/plugin-memory
```

## Step 2: Configure Environment

1. Create `.env` file in project root:
```bash
# Copy from example (if available)
cp packages/project-custom/.env.example .env

# Or create manually
touch .env
```

2. Add minimum required variables:
```bash
# Database (PGLite for local dev)
DATABASE_URL=pglite://./.elizadb

# At least one model provider
OPENAI_API_KEY=sk-your-key-here
# OR
OPENROUTER_API_KEY=sk-or-your-key-here
```

3. Add plugin-specific variables as needed (see PLUGIN_INTEGRATION_PLAN.md for full list)

## Step 3: Build

```bash
# Build all packages
bun run build

# Or build just the custom project
cd packages/project-custom
bun run build
```

## Step 4: Start

```bash
# From project root
cd packages/project-custom
elizaos start

# Or use the CLI from root
elizaos start --project packages/project-custom
```

## Step 5: Verify

1. Check web UI: http://localhost:3000
2. Check API health: http://localhost:3000/health
3. Verify plugins loaded in logs

## Troubleshooting

### Plugins Not Installing

- Check internet connection
- Verify GitHub access for fork
- Try installing plugins one at a time
- Check `bun.lock` for conflicts

### Build Fails

- Run `bun install` first
- Check TypeScript errors: `bun run type-check`
- Verify all workspace dependencies are built

### Runtime Errors

- Check `.env` file exists and has required variables
- Verify API keys are valid
- Check plugin logs for specific errors
- Ensure database is accessible

## Next Steps

1. Review `PLUGIN_INTEGRATION_PLAN.md` for detailed configuration
2. Customize `packages/project-custom/src/character.ts` for your needs
3. Add custom actions/providers as needed
4. Configure plugin-specific settings

## Plugin Status

After installation, verify plugins are available:

```bash
# List installed packages
bun list | grep plugin

# Check plugin resolution
elizaos plugins list
```

## Support

- See `PLUGIN_INTEGRATION_PLAN.md` for comprehensive documentation
- Check individual plugin repositories for specific issues
- Review ElizaOS documentation: https://docs.elizaos.ai/

