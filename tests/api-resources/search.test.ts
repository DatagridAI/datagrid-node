// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  test('search: only required params', async () => {
    const responsePromise = client.search.search({ query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.search.search({
      query: 'x',
      knowledge_ids: ['string'],
      limit: 1,
      next: 'next',
      record_types: ['rows'],
    });
  });

  test('searchAI: only required params', async () => {
    const responsePromise = client.search.searchAI({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('searchAI: required and optional params', async () => {
    const response = await client.search.searchAI({
      query: 'query',
      limit: 0,
      record_types: ['rows'],
    });
  });

  test('searchTree: only required params', async () => {
    const responsePromise = client.search.searchTree({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('searchTree: required and optional params', async () => {
    const response = await client.search.searchTree({
      query: 'query',
      limit: 1,
      next: 'next',
      record_types: ['rows'],
    });
  });
});
