// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource eventTriggers', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agents.eventTriggers.create('agent_id', {
      enabled: true,
      trigger_event: 'trigger_event',
      trigger_source: 'procore',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.agents.eventTriggers.create('agent_id', {
      enabled: true,
      trigger_event: 'trigger_event',
      trigger_source: 'procore',
      description: 'description',
      name: 'name',
      response_thread: 'create_new_thread_each_time',
      run_conditions: 'run_conditions',
    });
  });

  test('update', async () => {
    const responsePromise = client.agents.eventTriggers.update('agent_id', 'trigger_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.agents.eventTriggers.list('agent_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.eventTriggers.list('agent_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.agents.eventTriggers.delete('agent_id', 'trigger_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.eventTriggers.delete('agent_id', 'trigger_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });
});
