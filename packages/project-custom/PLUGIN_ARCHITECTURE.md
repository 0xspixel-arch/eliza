# ElizaOS Custom Plugin Configuration

This document outlines the plugin configuration following the official ElizaOS plugin system architecture as documented at https://docs.elizaos.ai/plugin-registry/overview

## Plugin System Architecture

The ElizaOS plugin system provides a comprehensive extension mechanism with the following core components:

### Core Plugin Components

1. **Actions** - Tasks agents can perform
   - Executable tasks with validation and handlers
   - Support for examples and similes (alternative names)
   - Built-in validation and error handling

2. **Providers** - Data sources for external information  
   - Real-time data retrieval with `get()` methods
   - Support for dynamic and private providers
   - Structured data output with text, values, and data fields

3. **Evaluators** - Response filters and validators
   - Continuous evaluation with `alwaysRun` option
   - Response validation and quality assessment
   - Integration with action execution flow

4. **Services** - Background services
   - Long-running background processes
   - Autonomous monitoring and task execution
   - Lifecycle management (start/stop)

5. **Routes** - HTTP endpoints
   - RESTful API integration
   - Support for all HTTP methods
   - File upload capabilities with multipart support

6. **Events** - Event handlers
   - System event integration
   - Custom event handling
   - Real-time event processing

7. **Models** - Custom model handlers
   - Custom AI model integration
   - Parameter mapping and result handling

## Custom Plugin Implementations

### 1. Solana Plugin (@elizaos/plugin-solana)
**Purpose**: Blockchain operations including token swaps, transfers, and DeFi

**Actions**:
- `SOLANA_SWAP`: Swap tokens using Jupiter aggregator
- `SOLANA_TRANSFER`: Transfer SOL or SPL tokens

**Providers**:
- `solana-market-data`: Current Solana market data and token prices

**Evaluators**:
- `SOLANA_TRUST_EVALUATOR`: Evaluates trust scores for Solana transactions

### 2. Trust Plugin (@elizaos/plugin-trust)
**Purpose**: Trust scoring and risk assessment for transactions and operations

**Actions**:
- `TRUST_EVALUATE`: Evaluate trust score for transactions

**Providers**:
- `trust-score-provider`: Current trust scores and risk metrics

**Evaluators**:
- `TRUST_ASSESSMENT`: Continuously assess trust for operations (always runs)

### 3. Web Search Plugin (@elizaos/plugin-web-search)
**Purpose**: Real-time web search and information retrieval

**Actions**:
- `WEB_SEARCH`: Search the web for current information

**Providers**:
- `web-search-provider`: Real-time web search results

### 4. Knowledge Plugin (@elizaos/plugin-knowledge)
**Purpose**: Knowledge management with RAG (Retrieval-Augmented Generation)

**Actions**:
- `KNOWLEDGE_QUERY`: Query the knowledge base for relevant information

**Providers**:
- `knowledge-provider`: Access to stored knowledge and documents

### 5. Memory Plugin (@elizaos/plugin-memory)
**Purpose**: Persistent memory management across sessions

**Actions**:
- `MEMORY_STORE`: Store information in persistent memory
- `MEMORY_RECALL`: Recall information from memory

### 6. Autonomous Plugin (@elizaos/plugin-autonomous)
**Purpose**: Autonomous task execution and automation

**Actions**:
- `AUTONOMOUS_EXECUTE`: Execute tasks autonomously based on defined rules

**Services**:
- `autonomous-service`: Background monitoring and task execution

### 7. ElizaCloud Plugin (@elizaos/plugin-elizacloud)
**Purpose**: Cloud synchronization for state management and backup

**Actions**:
- `CLOUD_SYNC`: Synchronize agent state with cloud storage

## Configuration

### Environment Variables

```bash
# Core Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
WALLET_SECRET_KEY=your_base58_private_key
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=your_openrouter_key
ELIZACLOUD_API_KEY=your_elizacloud_key

# Plugin Enable/Disable Flags
ENABLE_TRUST_PLUGIN=true
ENABLE_WEB_SEARCH_PLUGIN=true
ENABLE_KNOWLEDGE_PLUGIN=true
ENABLE_MEMORY_PLUGIN=true
ENABLE_AUTONOMOUS_PLUGIN=true
```

### Plugin Settings

The character configuration includes plugin-specific settings:

```typescript
settings: {
    solana: {
        rpcUrl: process.env.SOLANA_RPC_URL,
        walletSecretKey: process.env.WALLET_SECRET_KEY,
        network: process.env.SOLANA_NETWORK || 'mainnet-beta'
    },
    trust: {
        enabled: process.env.ENABLE_TRUST_PLUGIN !== 'false',
        riskThreshold: 0.3
    },
    knowledge: {
        enabled: process.env.ENABLE_KNOWLEDGE_PLUGIN !== 'false',
        vectorStore: 'pgvector'
    },
    memory: {
        enabled: process.env.ENABLE_MEMORY_PLUGIN !== 'false',
        persistence: 'database'
    },
    autonomous: {
        enabled: process.env.ENABLE_AUTONOMOUS_PLUGIN !== 'false',
        maxConcurrentTasks: 5
    },
    elizacloud: {
        enabled: !!process.env.ELIZACLOUD_API_KEY?.trim(),
        apiKey: process.env.ELIZACLOUD_API_KEY
    }
}
```

## Usage Examples

### 1. Solana Operations
```
User: "Swap 0.1 SOL for USDC"
Agent: "I'll help you swap 0.1 SOL for USDC using Jupiter. Let me check current rates and execute the swap with appropriate slippage protection."
Action: SOLANA_SWAP
```

### 2. Trust Evaluation
```
User: "Is this transaction safe to execute?"
Agent: "I'll evaluate the trust score and risk factors for this transaction."
Action: TRUST_EVALUATE
Provider: trust-score-provider
Evaluator: TRUST_ASSESSMENT
```

### 3. Memory Management
```
User: "Remember that I prefer low-risk investments"
Agent: "I'll store this preference in my memory for future reference."
Action: MEMORY_STORE

User: "What did I tell you about my investment preferences?"
Agent: "Let me recall what you told me about your investment preferences."
Action: MEMORY_RECALL
```

### 4. Autonomous Tasks
```
User: "Monitor SOL price and buy when it drops below $140"
Agent: "I'll set up autonomous monitoring for SOL price and execute buy orders when it drops below $140."
Action: AUTONOMOUS_EXECUTE
Service: autonomous-service
```

## Architecture Benefits

1. **Modular Design**: Each plugin is self-contained with clear interfaces
2. **Conditional Loading**: Plugins load based on environment configuration
3. **Extensibility**: Easy to add new plugins following the same patterns
4. **Validation**: Built-in validation for actions and operations
5. **Error Handling**: Comprehensive error handling and logging
6. **Background Services**: Support for autonomous operations
7. **Real-time Integration**: WebSocket and HTTP endpoint support

## Integration with ElizaOS Core

The custom plugins integrate seamlessly with ElizaOS core:
- Uses official plugin interfaces from `@elizaos/core`
- Follows established patterns for actions, providers, and evaluators
- Compatible with the runtime system and agent lifecycle
- Supports all core features like memory management and state handling