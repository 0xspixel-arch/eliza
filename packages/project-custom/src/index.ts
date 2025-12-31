import { logger, type IAgentRuntime, type Project, type ProjectAgent } from '@elizaos/core';
import { character } from './character.ts';
import {
    solanaPlugin,
    trustPlugin,
    webSearchPlugin,
    knowledgePlugin,
    memoryPlugin,
    autonomousPlugin,
    elizacloudPlugin
} from './plugins.ts';

/**
 * Custom agent initialization following ElizaOS plugin system architecture
 * Handles plugin-specific initialization and logging
 */
const initCharacter = async ({ runtime }: { runtime: IAgentRuntime }) => {
    logger.info('🚀 Initializing custom agent with integrated plugins');
    logger.info(
        {
            name: character.name,
            plugins: character.plugins?.length || 0,
            pluginNames: character.plugins || [],
        },
        'Agent configuration loaded'
    );

    // Register custom plugins based on character configuration
    const pluginNames = character.plugins || [];

    if (pluginNames.includes('@elizaos/plugin-solana')) {
        await runtime.registerPlugin(solanaPlugin);
        logger.info('✅ Solana plugin enabled - blockchain operations available');
    }

    if (pluginNames.includes('@elizaos/plugin-trust')) {
        await runtime.registerPlugin(trustPlugin);
        logger.info('✅ Trust plugin enabled - trust scoring available');
    }

    if (pluginNames.includes('@elizaos/plugin-web-search')) {
        await runtime.registerPlugin(webSearchPlugin);
        logger.info('✅ Web search plugin enabled - real-time search available');
    }

    if (pluginNames.includes('@elizaos/plugin-knowledge')) {
        await runtime.registerPlugin(knowledgePlugin);
        logger.info('✅ Knowledge plugin enabled - RAG capabilities available');
    }

    if (pluginNames.includes('@elizaos/plugin-memory')) {
        await runtime.registerPlugin(memoryPlugin);
        logger.info('✅ Memory plugin enabled - persistent memory available');
    }

    if (pluginNames.includes('@elizaos/plugin-autonomous')) {
        await runtime.registerPlugin(autonomousPlugin);
        logger.info('✅ Autonomous plugin enabled - task automation available');
    }

    if (pluginNames.includes('@elizaos/plugin-elizacloud')) {
        await runtime.registerPlugin(elizacloudPlugin);
        logger.info('✅ ElizaCloud plugin enabled - cloud synchronization available');
    }

    // Log environment configuration
    logger.info('🔧 Environment configuration:');
    logger.info(`   SOLANA_RPC_URL: ${process.env.SOLANA_RPC_URL ? '✅ Configured' : '❌ Not configured'}`);
    logger.info(`   WALLET_SECRET_KEY: ${process.env.WALLET_SECRET_KEY ? '✅ Configured' : '❌ Not configured'}`);
    logger.info(`   OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    logger.info(`   OPENROUTER_API_KEY: ${process.env.OPENROUTER_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    logger.info(`   ELIZACLOUD_API_KEY: ${process.env.ELIZACLOUD_API_KEY ? '✅ Configured' : '❌ Not configured'}`);

    logger.info('🎯 Agent ready for operation with full plugin capabilities');
};

export const projectAgent: ProjectAgent = {
    character,
    init: async (runtime: IAgentRuntime) => await initCharacter({ runtime }),
};

const project: Project = {
    agents: [projectAgent],
};

export { character } from './character.ts';
export default project;
