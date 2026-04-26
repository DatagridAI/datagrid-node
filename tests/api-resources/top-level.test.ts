// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  test('converse: only required params', async () => {
    const responsePromise = client.converse({ prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('converse: required and optional params', async () => {
    const response = await client.converse({
      prompt: 'string',
      agent_id: 'agent_id',
      agent_routing: { mode: 'auto' },
      chat_mode: 'auto',
      config: {
        agent_model: 'magpie-1.1',
        agent_tools: ['string'],
        corpus: [{ knowledge_id: 'knowledge_id', type: 'knowledge' }],
        custom_prompt: 'custom_prompt',
        disabled_agent_tools: ['string'],
        disabled_tools: ['string'],
        knowledge_ids: ['string'],
        llm_model: 'gemini-3-pro-preview',
        mcp_servers: [
          {
            server_id: 'server_id',
            server_label: 'server_label',
            server_url: 'https://example.com',
            type: 'inline_mcp',
            authorization: 'authorization',
            credential_id: 'credential_id',
            server_description: 'server_description',
          },
        ],
        planning_prompt: 'planning_prompt',
        system_prompt: 'system_prompt',
        temperature: 0,
        tools: ['string'],
      },
      conversation_id: 'conversation_id',
      current_view_content: 'current_view_content',
      generate_citations: true,
      include_steps: true,
      secret_ids: ['string'],
      stream: true,
      text: { format: {} },
      user: {
        email: 'email',
        first_name: 'first_name',
        last_name: 'last_name',
      },
    });
  });
});
