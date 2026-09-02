// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Datagrid from 'datagrid-ai';
import { Response } from 'node-fetch';

const client = new Datagrid({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource channels', () => {
  test('create: only required params', async () => {
    const responsePromise = client.channels.create({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.channels.create({ name: 'x', description: 'description' });
  });

  test('retrieve', async () => {
    const responsePromise = client.channels.retrieve('channel_id');
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
      client.channels.retrieve('channel_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.channels.update('channel_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.channels.list();
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
    await expect(client.channels.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Datagrid.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.list(
        {
          after: 'after',
          before: 'before',
          limit: 1,
          q: 'q',
          type: 'channel',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('addMembers: only required params', async () => {
    const responsePromise = client.channels.addMembers('channel_id', {
      actors: [{ id: 'id', type: 'user' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addMembers: required and optional params', async () => {
    const response = await client.channels.addMembers('channel_id', { actors: [{ id: 'id', type: 'user' }] });
  });

  test('addReaction: only required params', async () => {
    const responsePromise = client.channels.addReaction('channel_id', 'message_id', { reaction: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addReaction: required and optional params', async () => {
    const response = await client.channels.addReaction('channel_id', 'message_id', { reaction: 'x' });
  });

  test('createMessage: only required params', async () => {
    const responsePromise = client.channels.createMessage('channel_id', { content: 'content' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createMessage: required and optional params', async () => {
    const response = await client.channels.createMessage('channel_id', {
      content: 'content',
      file_ids: ['string'],
    });
  });

  test('createThread', async () => {
    const responsePromise = client.channels.createThread('channel_id', 'message_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createThread: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.createThread('channel_id', 'message_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('createThreadMessage: only required params', async () => {
    const responsePromise = client.channels.createThreadMessage('channel_id', 'thread_id', {
      content: 'content',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createThreadMessage: required and optional params', async () => {
    const response = await client.channels.createThreadMessage('channel_id', 'thread_id', {
      content: 'content',
      file_ids: ['string'],
    });
  });

  test('listMembers', async () => {
    const responsePromise = client.channels.listMembers('channel_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listMembers: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listMembers('channel_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listMembers: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listMembers(
        'channel_id',
        {
          actor_type: 'user',
          after: 'after',
          before: 'before',
          limit: 1,
          q: 'q',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listMessages', async () => {
    const responsePromise = client.channels.listMessages('channel_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listMessages: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listMessages('channel_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listMessages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listMessages(
        'channel_id',
        {
          after: 'after',
          before: 'before',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listThreadMessages', async () => {
    const responsePromise = client.channels.listThreadMessages('channel_id', 'thread_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listThreadMessages: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listThreadMessages('channel_id', 'thread_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listThreadMessages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listThreadMessages(
        'channel_id',
        'thread_id',
        {
          after: 'after',
          before: 'before',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listThreads', async () => {
    const responsePromise = client.channels.listThreads('channel_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listThreads: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listThreads('channel_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('listThreads: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.listThreads(
        'channel_id',
        {
          after: 'after',
          before: 'before',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('removeMember', async () => {
    const responsePromise = client.channels.removeMember('channel_id', 'member_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('removeMember: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.removeMember('channel_id', 'member_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('removeReaction', async () => {
    const responsePromise = client.channels.removeReaction('channel_id', 'message_id', 'x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('removeReaction: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.removeReaction('channel_id', 'message_id', 'x', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });

  test('retrieveThread', async () => {
    const responsePromise = client.channels.retrieveThread('channel_id', 'thread_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveThread: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.channels.retrieveThread('channel_id', 'thread_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Datagrid.NotFoundError);
  });
});
