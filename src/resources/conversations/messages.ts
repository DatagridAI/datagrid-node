// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class Messages extends APIResource {
  /**
   * Retrieves a message by id.
   */
  retrieve(
    conversationId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Message> {
    return this._client.get(`/conversations/${conversationId}/messages/${messageId}`, options);
  }

  /**
   * Returns the list of messages in a conversation.
   */
  list(
    conversationId: string,
    query?: MessageListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message>;
  list(
    conversationId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message>;
  list(
    conversationId: string,
    query: MessageListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message> {
    if (isRequestOptions(query)) {
      return this.list(conversationId, {}, query);
    }
    return this._client.getAPIList(`/conversations/${conversationId}/messages`, MessagesCursorIDPage, {
      query,
      ...options,
    });
  }
}

export class MessagesCursorIDPage extends CursorIDPage<Message> {}

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export interface Message {
  /**
   * The message identifier.
   */
  id: string;

  /**
   * The ID of the agent that sent or responded to the message.
   */
  agent_id: string;

  /**
   * Array of citations that provide knowledges for factual statements in the
   * response. Each citation includes the referenced text and its knowledges.
   */
  citations: Array<Message.Citation> | null;

  /**
   * Contents of the message.
   */
  content: Array<Message.Content>;

  /**
   * The ID of the conversation the message belongs to.
   */
  conversation_id: string;

  /**
   * The ISO string for when the message was created.
   */
  created_at: string;

  credits: Message.Credits | null;

  /**
   * The object type, which is always `conversation.message`.
   */
  object: 'conversation.message';

  /**
   * The role of the message sender - either 'user' or 'agent'.
   */
  role: 'user' | 'agent';
}

export namespace Message {
  export interface Citation {
    /**
     * The text snippet from the response that is being cited.
     */
    citation: string;

    /**
     * Array of knowledges that support this citation.
     */
    knowledges: Array<Citation.Knowledge>;
  }

  export namespace Citation {
    export interface Knowledge {
      /**
       * An array of text snippets from the knowledge that confirm the citation.
       */
      confirmations: Array<string>;

      /**
       * Name of the knowledge.
       */
      knowledge_name: string;

      type: 'image' | 'pdf_page' | 'record' | 'web_search' | 'sql_query_result' | 'action';

      /**
       * Id of the knowledge.
       */
      knowledge_id?: string;
    }
  }

  export interface Content {
    text: string;

    type: 'text';
  }

  export interface Credits {
    /**
     * The number of credits consumed by the converse call.
     */
    consumed: number;
  }
}

export interface MessageListParams extends CursorIDPageParams {}

Messages.MessagesCursorIDPage = MessagesCursorIDPage;

export declare namespace Messages {
  export {
    type Message as Message,
    MessagesCursorIDPage as MessagesCursorIDPage,
    type MessageListParams as MessageListParams,
  };
}
