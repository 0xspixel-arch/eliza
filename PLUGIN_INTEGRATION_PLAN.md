# Local Customized Build Plan: Plugin Integration

## Overview

This document outlines a comprehensive plan for creating a local, customized build of ElizaOS that incorporates the following plugins:

1. **plugin-solana** - https://github.com/0xspixel-arch/plugin-solana
2. **plugin-trust** - https://github.com/elizaos-plugins/plugin-trust
3. **plugin-web-search** - https://github.com/elizaos-plugins/plugin-web-search
4. **plugin-knowledge** - https://github.com/elizaos-plugins/plugin-knowledge
5. **plugin-elizacloud** - https://github.com/elizaos-plugins/plugin-elizacloud
6. **plugin-openai** - https://github.com/elizaos-plugins/plugin-openai
7. **plugin-openrouter** - https://github.com/elizaos-plugins/plugin-openrouter
8. **plugin-autonomous** - https://github.com/elizaos-plugins/plugin-autonomous
9. **plugin-memory** - https://github.com/elizaos-plugins/plugin-memory

## Architecture Approach

### Recommended: Package Installation

Use package installation for all plugins:
- Cleaner repository structure
- Automatic dependency resolution
- Easier updates via package manager
- Standard npm/GitHub package workflow

## Implementation Plan

### Phase 1: Environment Setup

#### 1.1 Prerequisites Verification

```bash
# Verify Node.js version (required: 23.x)
node --version

# Verify Bun version (required: 1.2.x+)
bun --version

# Verify Git is installed
git --version
```

#### 1.2 Repository Setup

```bash
# Navigate to workspace
cd c:\Users\Administrator\eliza-1

# Install dependencies
bun install
```

### Phase 2: Plugin Installation

#### 2.1 Installation Methods

**Method A: GitHub Direct Installation (for forks/custom repos)**

For `plugin-solana` from `0xspixel-arch` fork:

```bash
bun add github:0xspixel-arch/plugin-solana#1.x
```

**Method B: NPM Registry Installation (for official plugins)**

```bash
bun add @elizaos/plugin-trust
bun add @elizaos/plugin-web-search
bun add @elizaos/plugin-knowledge
bun add @elizaos/plugin-elizacloud
bun add @elizaos/plugin-openai
bun add @elizaos/plugin-openrouter
bun add @elizaos/plugin-autonomous
bun add @elizaos/plugin-memory
```

**Method C: Using Installation Scripts**

```bash
# Linux/Mac
bash scripts/install-custom-plugins.sh

# Windows PowerShell
.\scripts\install-custom-plugins.ps1
```

### Phase 3: Project Configuration

#### 3.1 Custom Project Structure

The custom project is located at `packages/project-custom/` with:

- `src/character.ts` - Character definition with plugins
- `src/index.ts` - Project entry point
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `build.ts` - Build script

#### 3.2 Character Configuration

The character is configured in `packages/project-custom/src/character.ts` with:

- Conditional plugin loading based on environment variables
- All 9 plugins integrated
- Comprehensive system prompt
- Bio, topics, and message examples

### Phase 4: Environment Configuration

#### 4.1 Required Environment Variables

**Minimum Required:**
```bash
# Database
DATABASE_URL=pglite://./.elizadb

# At least one model provider
OPENAI_API_KEY=sk-your-key-here
# OR
OPENROUTER_API_KEY=sk-or-your-key-here
```

**Solana Plugin (if using):**
```bash
WALLET_SECRET_SALT=your-secure-salt
WALLET_SECRET_KEY=your-wallet-secret-key
WALLET_PUBLIC_KEY=your-wallet-public-key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
HELIUS_API_KEY=your-helius-api-key
BIRDEYE_API_KEY=your-birdeye-api-key
```

**Other Plugins (optional):**
```bash
# Trust Plugin
TRUST_API_KEY=your-trust-api-key

# Web Search Plugin
WEB_SEARCH_API_KEY=your-search-api-key
SEARCH_PROVIDER=google

# Knowledge Plugin
KNOWLEDGE_STORAGE_PATH=./knowledge
KNOWLEDGE_INDEX_TYPE=vector

# Memory Plugin
MEMORY_STORAGE=postgres
MEMORY_RETENTION_DAYS=30

# Autonomous Plugin
AUTONOMOUS_ENABLED=true
AUTONOMOUS_MAX_TASKS=10

# ElizaCloud Plugin (optional)
ELIZACLOUD_API_KEY=your-elizacloud-api-key
ELIZACLOUD_SYNC_ENABLED=true
```

### Phase 5: Build and Test

#### 5.1 Build Process

```bash
# Build all packages
bun run build

# Build specific project
cd packages/project-custom
bun run build
```

#### 5.2 Development Workflow

```bash
# Start in development mode with watch
cd packages/project-custom
elizaos dev

# Or start normally
elizaos start
```

### Phase 6: Runtime Configuration

#### 6.1 Starting the Agent

```bash
# From project directory
cd packages/project-custom
elizaos start

# Or from root
elizaos start --project packages/project-custom
```

#### 6.2 Server Endpoints

- Web UI: http://localhost:3000
- API: http://localhost:3000/api
- Health: http://localhost:3000/health

### Phase 7: Verification

#### 7.1 Plugin Verification

```bash
# Check installed plugins
bun list | grep plugin

# Verify plugin imports
elizaos plugins list
```

#### 7.2 Common Issues

**Issue: Plugin not found**
- Solution: Verify plugin is installed in `package.json`
- Check plugin name matches exactly
- Ensure plugin is built

**Issue: Environment variables not loaded**
- Solution: Ensure `.env` file exists in project root
- Use `elizaos env list` to verify
- Check variable names match plugin requirements

**Issue: Build errors**
- Solution: Run `bun install` to ensure dependencies
- Check TypeScript errors
- Verify all workspace dependencies are built

## Plugin-Specific Configuration

### Solana Plugin

**Required Variables:**
- `WALLET_SECRET_SALT` - Salt for wallet key derivation
- `WALLET_SECRET_KEY` - Encrypted wallet secret
- `WALLET_PUBLIC_KEY` - Public wallet address
- `SOLANA_RPC_URL` - Solana RPC endpoint

**Actions Available:**
- `EXECUTE_SWAP` - Token swaps via Jupiter
- `SEND_TOKEN` - Transfer tokens
- `SEND_SOL` - Transfer SOL
- `TAKE_ORDER` - Place buy orders
- `CREATE_AND_BUY_TOKEN` - Create tokens on pump.fun/fomo.fund

### Trust Plugin

Provides trust scoring and risk assessment for tokens and transactions.

### Web Search Plugin

Enables real-time web search and information retrieval.

### Knowledge Plugin

Manages RAG (Retrieval-Augmented Generation) and document storage.

### Memory Plugin

Provides persistent memory across sessions.

### Autonomous Plugin

Enables task automation and autonomous execution.

### ElizaCloud Plugin

Provides cloud synchronization (optional).

## Security Considerations

### 1. Secret Management

- **Never commit** `.env` files
- Use `elizaos env` commands for secure editing
- Encrypt sensitive values (wallet keys, API keys)
- Use environment-specific configurations

### 2. Wallet Security

- Store wallet keys securely
- Use hardware wallets when possible
- Implement transaction limits
- Enable simulation mode for testing

### 3. API Key Protection

- Rotate API keys regularly
- Use least-privilege access
- Monitor API usage
- Implement rate limiting

## Maintenance and Updates

### Plugin Updates

```bash
# Update all plugins
bun update

# Update specific plugin
bun update @elizaos/plugin-solana

# Update from GitHub
bun update github:0xspixel-arch/plugin-solana
```

### Version Pinning

Pin critical plugin versions in `package.json`:

```json
{
  "dependencies": {
    "@elizaos/plugin-solana": "github:0xspixel-arch/plugin-solana#1.x",
    "@elizaos/plugin-trust": "^1.0.0"
  }
}
```

## Next Steps

1. **Execute Phase 1**: Set up environment and verify prerequisites
2. **Execute Phase 2**: Install all required plugins
3. **Execute Phase 3**: Verify project configuration
4. **Execute Phase 4**: Configure environment variables
5. **Execute Phase 5**: Build and test the configuration
6. **Execute Phase 6**: Start and test runtime
7. **Execute Phase 7**: Verify all functionality

## Additional Resources

- [ElizaOS Documentation](https://docs.elizaos.ai/)
- [Plugin Development Guide](https://docs.elizaos.ai/plugins)
- [API Reference](https://docs.elizaos.ai/api)
- [Community Discord](https://discord.gg/ai16z)

## Support

For issues or questions:
1. Check plugin-specific documentation
2. Review GitHub issues for each plugin
3. Consult ElizaOS community resources
4. Submit detailed bug reports with logs

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-27  
**Status:** Ready for Implementation

