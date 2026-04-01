// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as MessagesAPI from './messages';
import { Message, MessageListParams, Messages, MessagesCursorIDPage } from './messages';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class Conversations extends APIResource {
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Creates a new conversation.
   */
  create(body: ConversationCreateParams, options?: Core.RequestOptions): Core.APIPromise<Conversation> {
    return this._client.post('/conversations', { body, ...options });
  }

  /**
   * Retrieves a conversation by id.
   */
  retrieve(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<Conversation> {
    return this._client.get(`/conversations/${conversationId}`, options);
  }

  /**
   * Update a conversation's properties, such as assigned agents or name.
   */
  update(
    conversationId: string,
    body: ConversationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Conversation> {
    return this._client.patch(`/conversations/${conversationId}`, { body, ...options });
  }

  /**
   * Returns the list of conversations.
   */
  list(
    query?: ConversationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConversationsCursorIDPage, Conversation>;
  list(options?: Core.RequestOptions): Core.PagePromise<ConversationsCursorIDPage, Conversation>;
  list(
    query: ConversationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConversationsCursorIDPage, Conversation> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/conversations', ConversationsCursorIDPage, { query, ...options });
  }

  /**
   * Delete conversation.
   */
  delete(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/conversations/${conversationId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class ConversationsCursorIDPage extends CursorIDPage<Conversation> {}

/**
 * The `conversation` object represents a conversation with an AI agent.
 */
export interface Conversation {
  /**
   * The conversation identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The ISO string for when the conversation was created.
   */
  created_at: string;

  /**
   * The object type, which is always `conversation`.
   */
  object: 'conversation';

  /**
   * The ISO string for when the conversation was last updated.
   */
  updated_at: string;

  /**
   * Array of agent IDs currently assigned to this conversation.
   */
  agent_ids?: Array<string>;

  /**
   * The name of the conversation.
   */
  name?: string;

  /**
   * Array of agent IDs that have previously responded in this conversation. This
   * list only grows and is never cleared when agents are reassigned.
   */
  participated_agent_ids?: Array<string>;
}

/**
 * The field to sort the conversations by.
 */
export type ConversationSortField = 'created_at' | 'updated_at';

export interface ConversationCreateParams {
  /**
   * Name for the conversation.
   */
  name?: string | null;
}

export interface ConversationUpdateParams {
  /**
   * Replace the list of agents assigned to this conversation. Pass an empty array to
   * clear all agent assignments.
   */
  agent_ids?: Array<string>;

  /**
   * Update the conversation name.
   */
  name?: string;
}

export interface ConversationListParams extends CursorIDPageParams {
  /**
   * The direction to sort the results.
   */
  direction?: 'asc' | 'desc';

  /**
   * The field to sort the conversations by.
   */
  sort?: ConversationSortField;
}

Conversations.ConversationsCursorIDPage = ConversationsCursorIDPage;
Conversations.Messages = Messages;
Conversations.MessagesCursorIDPage = MessagesCursorIDPage;

export declare namespace Conversations {
  export {
    type Conversation as Conversation,
    type ConversationSortField as ConversationSortField,
    ConversationsCursorIDPage as ConversationsCursorIDPage,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationUpdateParams as ConversationUpdateParams,
    type ConversationListParams as ConversationListParams,
  };

  export {
    Messages as Messages,
    type Message as Message,
    MessagesCursorIDPage as MessagesCursorIDPage,
    type MessageListParams as MessageListParams,
  };
}
