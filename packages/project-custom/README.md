
## 🔐 Secrets Management

The application provides a secure way to manage environment secrets and API keys through the agent configuration interface.

### Supported Formats

You can input secrets in two formats:

1. **Standard .env Format (KEY=VALUE)**
   ```bash
   OPENAI_API_KEY=sk-...
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   ENABLE_FEATURE=true
   ```

2. **JSON Format**
   ```json
   {
     "OPENAI_API_KEY": "sk-...",
     "SOLANA_RPC_URL": "https://api.mainnet-beta.solana.com",
     "ENABLE_FEATURE": true
   }
   ```

### Validation Rules

- **Flat Structure**: Secrets must be a flat key-value map. Nested objects are not supported.
- **Value Types**: All values are converted to strings. Booleans and numbers are supported in JSON but will be stored as string representations.
- **Security**: Secrets are encrypted before storage.

### Common Issues

- **Invalid JSON**: If you start your input with `{`, the system expects valid JSON. Ensure all quotes and braces are correct.
- **Nested Objects**: Do not group secrets under categories (e.g., `{"solana": {"rpc": "..."}}`). Use flat keys like `SOLANA_RPC_URL`.
