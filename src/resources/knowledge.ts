// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ConnectionsAPI from './connections';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class KnowledgeResource extends APIResource {
  /**
   * Create knowledge which will be learned and leveraged by agents.
   */
  create(body: KnowledgeCreateParams, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.post(
      '/knowledge',
      Core.multipartFormRequestOptions({
        body,
        timeout: (this._client as any)._options.timeout ?? 300000,
        ...options,
      }),
    );
  }

  /**
   * Retrieves a knowledge by id.
   */
  retrieve(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.get(`/knowledge/${knowledgeId}`, options);
  }

  /**
   * Update a knowledge's attributes.
   */
  update(
    knowledgeId: string,
    body: KnowledgeUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Knowledge> {
    return this._client.patch(
      `/knowledge/${knowledgeId}`,
      Core.multipartFormRequestOptions({ body, ...options }),
    );
  }

  /**
   * Returns the list of knowledge.
   */
  list(
    query?: KnowledgeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<KnowledgesCursorIDPage, Knowledge>;
  list(options?: Core.RequestOptions): Core.PagePromise<KnowledgesCursorIDPage, Knowledge>;
  list(
    query: KnowledgeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<KnowledgesCursorIDPage, Knowledge> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/knowledge', KnowledgesCursorIDPage, { query, ...options });
  }

  /**
   * Delete knowledge.
   */
  delete(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/knowledge/${knowledgeId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Create knowledge from connection which will be learned and leveraged by agents.
   */
  connect(
    body: KnowledgeConnectParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConnectionsAPI.RedirectURLResponse> {
    return this._client.post('/knowledge/connect', { body, ...options });
  }
}

export class KnowledgesCursorIDPage extends CursorIDPage<Knowledge> {}

/**
 * Metadata of an attachment object
 */
export interface AttachmentMetadata {
  /**
   * The media type of the attachment.
   */
  media_type: string;

  /**
   * The name of the attachment.
   */
  name: string;

  /**
   * The object type, which is always `attachment_metadata`.
   */
  object: 'attachment_metadata';

  /**
   * The source of the attachment.
   */
  source: MessageMetadata | RowMetadata;

  /**
   * The url of the blob of the attachment.
   */
  url: string;

  page?: AttachmentMetadata.Page;
}

export namespace AttachmentMetadata {
  export interface Page {
    /**
     * The page number of the attachment.
     */
    page_number: number;

    /**
     * @deprecated DEPRECATED use page_number instead.
     */
    pageNumber: number;

    /**
     * The url of the blob of the page.
     */
    url: string;
  }
}

/**
 * The `knowledge` object represents knowledge that an agent may leverage to
 * respond.
 */
export interface Knowledge {
  /**
   * The knowledge identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The ISO string for when the knowledge was created.
   */
  created_at: string;

  /**
   * The name of the knowledge
   */
  name: string;

  /**
   * The object type, which is always `knowledge`.
   */
  object: 'knowledge';

  /**
   * Row count statistics for the knowledge.
   */
  row_counts: Knowledge.RowCounts;

  /**
   * The current knowledge status can be one of three values: `pending`, `partial`,
   * or `ready`. `pending` indicates that the knowledge is awaiting learning and will
   * not be used by the agent when responding. `partial` indicates that the knowledge
   * is partially learned. The agent may use some aspects of it when responding.
   * `ready` indicates that the knowledge is fully learned and will be completely
   * utilized in responses.
   */
  status: 'pending' | 'partial' | 'ready';

  credits?: Knowledge.Credits;

  /**
   * The ISO string for when the knowledge was last updated.
   */
  updated_at?: string;
}

export namespace Knowledge {
  /**
   * Row count statistics for the knowledge.
   */
  export interface RowCounts {
    /**
     * The number of rows successfully learned.
     */
    completed: number;

    /**
     * The number of rows that failed to be processed for learning.
     */
    failed: number;

    /**
     * The total number of rows in the knowledge.
     */
    total: number;
  }

  export interface Credits {
    /**
     * The number of credits consumed by the knowledge.
     */
    consumed: number;
  }
}

/**
 * Represents metadata for a knowledge object
 */
export interface KnowledgeMetadata {
  /**
   * The unique identifier of the knowledge.
   */
  id: string;

  /**
   * The name of the knowledge.
   */
  name: string;

  /**
   * The navigation item of the knowledge.
   */
  navigation_item: KnowledgeMetadata.NavigationItem;

  /**
   * The object type, which is always `knowledge_metadata`.
   */
  object: 'knowledge_metadata';

  /**
   * The url of the knowledge.
   */
  url: string;
}

export namespace KnowledgeMetadata {
  /**
   * The navigation item of the knowledge.
   */
  export interface NavigationItem {
    /**
     * The id of the navigation item.
     */
    id: string;

    /**
     * The type of the navigation item.
     */
    item_type: string;

    /**
     * The name of the navigation item.
     */
    name: string;

    /**
     * The object type, which is always `navigation_item_metadata`.
     */
    object: 'navigation_item_metadata';

    /**
     * The url of the navigation item.
     */
    url: string;

    /**
     * The emoticon of the navigation item.
     */
    emoticon?: string;

    /**
     * The media type of the navigation item if known.
     */
    source_media_type?: string;
  }
}

/**
 * Metadata of a conversation message object
 */
export interface MessageMetadata {
  /**
   * The id of the message.
   */
  id: string;

  /**
   * The identifier of the message author (either a user ID or agent ID).
   */
  author_id: string;

  /**
   * Indicates whether the author is a user or an agent.
   */
  author_type: 'user' | 'agent';

  /**
   * The conversation that the message belongs to.
   */
  conversation: MessageMetadata.Conversation;

  /**
   * The object type, which is always `message_metadata`.
   */
  object: 'message_metadata';

  /**
   * The url of the message.
   */
  url: string;

  /**
   * The pretty name of the author of the message.
   */
  author_name?: string;
}

export namespace MessageMetadata {
  /**
   * The conversation that the message belongs to.
   */
  export interface Conversation {
    /**
     * The id of the conversation.
     */
    id: string;

    /**
     * The name of the conversation.
     */
    name: string;

    /**
     * The navigation item of the conversation.
     */
    navigation_item: Conversation.NavigationItem;

    /**
     * The object type, which is always `conversation_metadata`.
     */
    object: 'conversation_metadata';

    /**
     * The url of the conversation.
     */
    url: string;
  }

  export namespace Conversation {
    /**
     * The navigation item of the conversation.
     */
    export interface NavigationItem {
      /**
       * The id of the navigation item.
       */
      id: string;

      /**
       * The type of the navigation item.
       */
      item_type: string;

      /**
       * The name of the navigation item.
       */
      name: string;

      /**
       * The object type, which is always `navigation_item_metadata`.
       */
      object: 'navigation_item_metadata';

      /**
       * The url of the navigation item.
       */
      url: string;

      /**
       * The emoticon of the navigation item.
       */
      emoticon?: string;

      /**
       * The media type of the navigation item if known.
       */
      source_media_type?: string;
    }
  }
}

/**
 * Metadata of a row in a table
 */
export interface RowMetadata {
  /**
   * The id of the row (**datagrid**uuid), unique within the table.
   */
  id: string;

  /**
   * The object type, which is always `row_metadata`.
   */
  object: 'row_metadata';

  /**
   * The table that the row belongs to.
   */
  table: TableMetadata;

  /**
   * The url of the row of the table.
   */
  url: string;
}

/**
 * Represents metadata for a table in a knowledge object
 */
export interface TableMetadata {
  /**
   * The unique identifier for the table.
   */
  id: string;

  /**
   * The knowledge object that the table belongs to.
   */
  knowledge: KnowledgeMetadata;

  /**
   * The name of the table.
   */
  name: string;

  /**
   * The object type, which is always `table_metadata`.
   */
  object: 'table_metadata';

  /**
   * The url of the table.
   */
  url: string;
}

export interface KnowledgeCreateParams {
  /**
   * The files to be uploaded and learned. Supported media types are `pdf`, `json`,
   * `csv`, `text`, `png`, `jpeg`, `excel`, `google sheets`, `docx`, `pptx`.
   */
  files: Array<Core.Uploadable>;

  /**
   * The name of the knowledge.
   */
  name?: string | null;
}

export interface KnowledgeUpdateParams {
  /**
   * The files to replace existing knowledge. When provided, all existing data will
   * be removed from the knowledge and replaced with these files. Supported media
   * types are `pdf`, `json`, `csv`, `text`, `png`, `jpeg`, `excel`, `google sheets`,
   * `docx`, `pptx`.
   */
  files?: Array<Core.Uploadable> | null;

  /**
   * The new name for the `knowledge`.
   */
  name?: string | null;
}

export interface KnowledgeListParams extends CursorIDPageParams {}

export interface KnowledgeConnectParams {
  /**
   * The id of the connection to be used to create the knowledge.
   */
  connection_id: string;
}

KnowledgeResource.KnowledgesCursorIDPage = KnowledgesCursorIDPage;

export declare namespace KnowledgeResource {
  export {
    type AttachmentMetadata as AttachmentMetadata,
    type Knowledge as Knowledge,
    type KnowledgeMetadata as KnowledgeMetadata,
    type MessageMetadata as MessageMetadata,
    type RowMetadata as RowMetadata,
    type TableMetadata as TableMetadata,
    KnowledgesCursorIDPage as KnowledgesCursorIDPage,
    type KnowledgeCreateParams as KnowledgeCreateParams,
    type KnowledgeUpdateParams as KnowledgeUpdateParams,
    type KnowledgeListParams as KnowledgeListParams,
    type KnowledgeConnectParams as KnowledgeConnectParams,
  };
}
