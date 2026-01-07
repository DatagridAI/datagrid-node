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
      config: {
        agent_model: 'magpie-1.1',
        agent_tools: ['data_analysis'],
        custom_prompt: 'custom_prompt',
        disabled_agent_tools: ['data_analysis'],
        disabled_tools: ['data_analysis'],
        knowledge_ids: ['string'],
        llm_model: 'gemini-3-pro-preview',
        planning_prompt: 'planning_prompt',
        system_prompt: 'system_prompt',
        tools: ['data_analysis'],
      },
      conversation_id: 'conversation_id',
      generate_citations: true,
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
