// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agenticAutomations', () => {
  test('createEvent: only required params', async () => {
    const responsePromise = client.agenticAutomations.createEvent({
      agent_id: 'agent_id',
      application_id: 'connector.procore',
      name: 'name',
      trigger_event: 'RFIs:create',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createEvent: required and optional params', async () => {
    const response = await client.agenticAutomations.createEvent({
      agent_id: 'agent_id',
      application_id: 'connector.procore',
      name: 'name',
      trigger_event: 'RFIs:create',
      description: 'description',
      enabled: true,
      output_channel_id: 'output_channel_id',
      output_channel_type: 'output_channel_type',
      run_conditions: 'run_conditions',
    });
  });

  test('createScheduled: only required params', async () => {
    const responsePromise = client.agenticAutomations.createScheduled({
      agent_id: 'agent_id',
      cron: '0 9 * * 1',
      name: 'name',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createScheduled: required and optional params', async () => {
    const response = await client.agenticAutomations.createScheduled({
      agent_id: 'agent_id',
      cron: '0 9 * * 1',
      name: 'name',
      description: 'description',
      enabled: true,
      timezone: 'America/New_York',
    });
  });
});
