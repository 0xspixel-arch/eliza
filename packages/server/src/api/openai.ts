import express from 'express';
import { logger } from '@elizaos/core';

export function openaiRouter(): express.Router {
  const router = express.Router();

  router.get('/token', async (_req, res) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'OpenAI API key not configured' });
        return;
      }

      const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "verse",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error({ error: errorText }, 'Failed to create OpenAI Realtime session');
        res.status(response.status).json({ error: 'Failed to create OpenAI Realtime session' });
        return;
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      logger.error({ error }, 'Error creating OpenAI Realtime session');
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
