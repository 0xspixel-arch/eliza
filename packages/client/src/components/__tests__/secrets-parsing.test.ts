import { describe, it, expect } from 'vitest';

/**
 * Simplified parseRawText logic for testing
 * Mirrors the implementation in secret-panel.tsx
 */
const parseRawText = (text: string) => {
  const trimmed = text.trim();
  
  // If it looks like JSON (starts with {), try to parse as JSON strictly
  if (trimmed.startsWith('{')) {
    try {
      const json = JSON.parse(text);
      
      if (typeof json !== 'object' || json === null || Array.isArray(json)) {
         throw new Error('JSON must be a flat object (key-value pairs)');
      }

      const parsedEnvs: Record<string, string> = {};
      for (const [key, value] of Object.entries(json)) {
          if (typeof value === 'object' && value !== null) {
              throw new Error(`Nested objects are not supported (key: ${key})`);
          }
          parsedEnvs[key] = String(value);
      }
      return parsedEnvs;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'Invalid JSON format');
    }
  }

  // Fallback to KEY=VALUE line parsing for non-JSON content
  const lines = text.split('\n');
  const parsedEnvs: Record<string, string> = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    const [key, ...rest] = trimmedLine.split('=');
    if (!key) continue;
    
    const val = rest.length > 0 
      ? rest.join('=').trim().replace(/^['"]|['"]$/g, '')
      : '';
      
    if (key.trim()) {
      parsedEnvs[key.trim()] = val;
    }
  }

  return parsedEnvs;
};

describe('Secrets Parsing Logic', () => {
    it('should parse valid KEY=VALUE pairs', () => {
        const input = `
            OPENAI_API_KEY=sk-12345
            SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
            # This is a comment
            ENABLE_FEATURE=true
        `;
        const result = parseRawText(input);
        expect(result).toEqual({
            'OPENAI_API_KEY': 'sk-12345',
            'SOLANA_RPC_URL': 'https://api.mainnet-beta.solana.com',
            'ENABLE_FEATURE': 'true'
        });
    });

    it('should parse valid JSON object', () => {
        const input = JSON.stringify({
            "OPENAI_API_KEY": "sk-12345",
            "SOLANA_RPC_URL": "https://api.mainnet-beta.solana.com",
            "ENABLE_FEATURE": true,
            "MAX_RETRIES": 3
        });
        const result = parseRawText(input);
        expect(result).toEqual({
            'OPENAI_API_KEY': 'sk-12345',
            'SOLANA_RPC_URL': 'https://api.mainnet-beta.solana.com',
            'ENABLE_FEATURE': 'true',
            'MAX_RETRIES': '3'
        });
    });

    it('should throw error for invalid JSON syntax', () => {
        const input = '{"OPENAI_API_KEY": "sk-12345"'; // Missing closing brace
        expect(() => parseRawText(input)).toThrow(/JSON/);
    });

    it('should throw error for nested JSON objects', () => {
        const input = JSON.stringify({
            "OPENAI_API_KEY": "sk-12345",
            "NESTED": { "some": "value" }
        });
        expect(() => parseRawText(input)).toThrow(/Nested objects are not supported/);
    });

    it('should throw error for JSON array', () => {
        const input = JSON.stringify(["value1", "value2"]);
        expect(() => parseRawText(input)).toThrow(/JSON must be a flat object/);
    });

    it('should handle quoted values in KEY=VALUE format', () => {
        const input = `MY_KEY="some value with spaces"`;
        const result = parseRawText(input);
        expect(result).toEqual({
            'MY_KEY': 'some value with spaces'
        });
    });
});
