// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  test('retrieve', async () => {
    const responsePromise = client.organization.teamspaces.users.retrieve('teamspace_id', 'user_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organization.teamspaces.users.retrieve('teamspace_id', 'user_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = client.organization.teamspaces.users.update('teamspace_id', 'user_id', {
      role: 'admin',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.organization.teamspaces.users.update('teamspace_id', 'user_id', {
      role: 'admin',
      agent_ids: ['string'],
    });
  });

  test('list', async () => {
    const responsePromise = client.organization.teamspaces.users.list('teamspace_id');
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
      client.organization.teamspaces.users.list('teamspace_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.organization.teamspaces.users.list(
        'teamspace_id',
        {
          after: 'after',
          before: 'before',
          limit: 1,
          search: 'search',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.organization.teamspaces.users.delete('teamspace_id', 'user_id');
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
      client.organization.teamspaces.users.delete('teamspace_id', 'user_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });
});
