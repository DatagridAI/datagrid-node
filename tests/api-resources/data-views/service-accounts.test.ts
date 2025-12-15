// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource serviceAccounts', () => {
  test('create: only required params', async () => {
    const responsePromise = client.dataViews.serviceAccounts.create({ name: 'name', type: 'gcp' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.dataViews.serviceAccounts.create({ name: 'name', type: 'gcp' });
  });

  test('list', async () => {
    const responsePromise = client.dataViews.serviceAccounts.list();
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
    await expect(client.dataViews.serviceAccounts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Datagrid.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.dataViews.serviceAccounts.list({ limit: 1, offset: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.dataViews.serviceAccounts.delete('service_account_id');
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
      client.dataViews.serviceAccounts.delete('service_account_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('credentials', async () => {
    const responsePromise = client.dataViews.serviceAccounts.credentials('service_account_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('credentials: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.dataViews.serviceAccounts.credentials('service_account_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });
});
