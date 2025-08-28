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
   * The name of the conversation.
   */
  name?: string;
}

export interface ConversationCreateParams {
  /**
   * Name for the conversation.
   */
  name?: string | null;
}

export interface ConversationListParams extends CursorIDPageParams {}

Conversations.ConversationsCursorIDPage = ConversationsCursorIDPage;
Conversations.Messages = Messages;
Conversations.MessagesCursorIDPage = MessagesCursorIDPage;

export declare namespace Conversations {
  export {
    type Conversation as Conversation,
    ConversationsCursorIDPage as ConversationsCursorIDPage,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationListParams as ConversationListParams,
  };

  export {
    Messages as Messages,
    type Message as Message,
    MessagesCursorIDPage as MessagesCursorIDPage,
    type MessageListParams as MessageListParams,
  };
}
