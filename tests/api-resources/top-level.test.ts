// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  test('converse: only required params', async () => {
    const responsePromise = client.converse({ prompt: 'prompt' });
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
      prompt: 'prompt',
      agent_id: 'agent_id',
      config: { agent_model: 'magpie-1', knowledge_ids: ['string'], system_prompt: 'system_prompt' },
      conversation_id: 'conversation_id',
      stream: true,
    });
  });
});
