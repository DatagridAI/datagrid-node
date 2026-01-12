// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource dataViews', () => {
  test('create: only required params', async () => {
    const responsePromise = client.dataViews.create({
      bigquery_dataset_name: 'bigquery_dataset_name',
      knowledge_id: 'knowledge_id',
      service_account_id: 'service_account_id',
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
    const response = await client.dataViews.create({
      bigquery_dataset_name: 'bigquery_dataset_name',
      knowledge_id: 'knowledge_id',
      service_account_id: 'service_account_id',
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.dataViews.list({ service_account_id: 'service_account_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.dataViews.list({
      service_account_id: 'service_account_id',
      knowledge_id: 'knowledge_id',
      limit: 1,
      offset: 0,
    });
  });

  test('delete', async () => {
    const responsePromise = client.dataViews.delete('data_view_id');
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
      client.dataViews.delete('data_view_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });
});
