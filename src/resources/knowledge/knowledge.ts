// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ConnectionsAPI from '../connections';
import * as TablesAPI from './tables/tables';
import { Table, TableListParams, Tables, TablesCursorIDPage } from './tables/tables';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class KnowledgeResource extends APIResource {
  tables: TablesAPI.Tables = new TablesAPI.Tables(this._client);

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
   * Retrieves knowledge by id.
   */
  retrieve(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.get(`/knowledge/${knowledgeId}`, options);
  }

  /**
   * Update a knowledge's attributes. Each request can include either `files` or
   * `sync`, but not both. When `files` are provided, all existing data is replaced
   * and a re-processing pipeline runs asynchronously — this consumes credits based
   * on the volume of data processed. Metadata-only and sync-only updates do not
   * consume credits and are not blocked by credit eligibility checks.
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
   * Returns a list of knowledge.
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
   * Initiates knowledge creation from a connection by returning a redirect URL. The
   * organization must have enough credits to start this flow. The downstream
   * ingestion and indexing that follow still run asynchronously, and the actual
   * credit consumption remains variable based on the volume of data processed.
   */
  connect(
    body: KnowledgeConnectParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConnectionsAPI.RedirectURLResponse> {
    return this._client.post('/knowledge/connect', { body, ...options });
  }

  /**
   * Manually trigger a full re-indexing of the knowledge. The reindex runs
   * **asynchronously**: the API returns as soon as the job is enqueued. Re-indexing
   * is not performed immediately. This endpoint consumes credits — the actual credit
   * cost is variable, based on the volume of data being re-indexed, and is charged
   * asynchronously as processing completes.
   */
  reindex(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/knowledge/${knowledgeId}/reindex`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
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

  /**
   * The data lake item ID of the attachment, used to generate fresh signed URLs.
   */
  data_lake_item_id?: string;

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
   * Credit consumption for this knowledge. `null` when the knowledge is still being
   * processed and the final cost is not yet known (e.g. immediately after creation
   * or reindexing), or when the credit lookup fails. When present, `consumed` is the
   * current summed spend for the knowledge's active tables — it is not necessarily
   * the cost of the most recent request, nor the full lifetime spend.
   */
  credits: Knowledge.Credits | null;

  /**
   * The name of the knowledge.
   */
  name: string;

  /**
   * The object type, which is always `knowledge`.
   */
  object: 'knowledge';

  /**
   * The parent object, indicating where the object is located in the hierarchy
   */
  parent: Knowledge.ParentPage | Knowledge.RootPage;

  /**
   * Row count statistics for the knowledge.
   */
  row_counts: Knowledge.RowCounts;

  /**
   * The visibility scope of the knowledge. 'teamspace' means visible only within the
   * owning teamspace. 'organization' means visible across all teamspaces in the same
   * organization.
   */
  scope: 'teamspace' | 'organization';

  /**
   * The current knowledge status can be one of three values: `pending`, `partial`,
   * or `ready`. `pending` indicates that the knowledge is awaiting learning and will
   * not be used by the agent when responding. `partial` indicates that the knowledge
   * is partially learned. The agent may use some aspects of it when responding.
   * `ready` indicates that the knowledge is fully learned and will be completely
   * utilized in responses.
   */
  status: 'pending' | 'partial' | 'ready';

  /**
   * Sync information for knowledge that syncs data from a connection
   */
  sync: Knowledge.Sync | null;

  /**
   * The ID of the teamspace that owns this knowledge.
   */
  teamspace_id: string;

  /**
   * The ISO string for when the knowledge was last updated.
   */
  updated_at?: string;
}

export namespace Knowledge {
  /**
   * Credit consumption for this knowledge. `null` when the knowledge is still being
   * processed and the final cost is not yet known (e.g. immediately after creation
   * or reindexing), or when the credit lookup fails. When present, `consumed` is the
   * current summed spend for the knowledge's active tables — it is not necessarily
   * the cost of the most recent request, nor the full lifetime spend.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }

  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }

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

  /**
   * Sync information for knowledge that syncs data from a connection
   */
  export interface Sync {
    /**
     * The ID of the connection used for syncing data to this knowledge
     */
    connection_id: string;

    /**
     * Whether data syncing from the connection is enabled
     */
    enabled: boolean;

    /**
     * A cron-based schedule for syncing data
     */
    trigger?: Sync.Trigger | null;
  }

  export namespace Sync {
    /**
     * A cron-based schedule for syncing data
     */
    export interface Trigger {
      /**
       * Cron expression (e.g., '0 0 \* \* \*' for daily at midnight)
       */
      cron_expression: string;

      /**
       * The trigger type, which is always `cron`.
       */
      type: 'cron';

      /**
       * Human-readable description of the schedule
       */
      description?: string | null;

      /**
       * IANA timezone (e.g., 'America/New_York'). Defaults to 'UTC' if not provided.
       */
      timezone?: string;
    }
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

  /**
   * The parent page to nest this knowledge under. If not provided, knowledge will be
   * created at the root level.
   */
  parent?: KnowledgeCreateParams.ParentPage | KnowledgeCreateParams.RootPage | null;
}

export namespace KnowledgeCreateParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

export interface KnowledgeUpdateParams {
  /**
   * The files to replace existing knowledge. When provided, all existing data will
   * be removed from the knowledge and replaced with these files. Supported media
   * types are `pdf`, `json`, `csv`, `text`, `png`, `jpeg`, `excel`, `google sheets`,
   * `docx`, `pptx`. Cannot be used together with `sync` in the same request.
   */
  files?: Array<Core.Uploadable> | null;

  /**
   * The new name for the `knowledge`.
   */
  name?: string | null;

  /**
   * Move the knowledge to a different parent page.
   */
  parent?: KnowledgeUpdateParams.ParentPage | KnowledgeUpdateParams.RootPage | null;

  /**
   * The visibility scope of the knowledge. 'teamspace' means visible only within the
   * owning teamspace. 'organization' means visible across all teamspaces in the same
   * organization.
   */
  scope?: 'teamspace' | 'organization' | null;

  /**
   * Sync configuration updates for knowledge created from a connection. Note: For
   * multipart/form-data, this should be sent as a JSON string. Cannot be used
   * together with `files` in the same request.
   */
  sync?: KnowledgeUpdateParams.Sync | null;
}

export namespace KnowledgeUpdateParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }

  /**
   * Sync configuration updates for knowledge created from a connection. Note: For
   * multipart/form-data, this should be sent as a JSON string. Cannot be used
   * together with `files` in the same request.
   */
  export interface Sync {
    /**
     * Enable or disable syncing data from the connection
     */
    enabled?: boolean;

    /**
     * Update the trigger to a cron schedule. Only CronBasedTrigger is supported for
     * updates.
     */
    trigger?: Sync.Trigger;
  }

  export namespace Sync {
    /**
     * Update the trigger to a cron schedule. Only CronBasedTrigger is supported for
     * updates.
     */
    export interface Trigger {
      /**
       * Cron expression (e.g., '0 0 \* \* \*' for daily at midnight)
       */
      cron_expression: string;

      /**
       * The trigger type, which is always `cron`.
       */
      type: 'cron';

      /**
       * Human-readable description of the schedule
       */
      description?: string | null;

      /**
       * IANA timezone (e.g., 'America/New_York'). Defaults to 'UTC' if not provided.
       */
      timezone?: string;
    }
  }
}

export interface KnowledgeListParams extends CursorIDPageParams {
  /**
   * Filter by parent. Pass `{"type":"root"}` to get root-level items, or
   * `{"type":"page","page_id":"page_123"}` to get items nested under a specific
   * page. If not specified, returns all items.
   */
  parent?: KnowledgeListParams.ParentPage | KnowledgeListParams.RootPage;
}

export namespace KnowledgeListParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

export interface KnowledgeConnectParams {
  /**
   * The id of the connection to be used to create the knowledge.
   */
  connection_id: string;
}

KnowledgeResource.KnowledgesCursorIDPage = KnowledgesCursorIDPage;
KnowledgeResource.Tables = Tables;
KnowledgeResource.TablesCursorIDPage = TablesCursorIDPage;

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

  export {
    Tables as Tables,
    type Table as Table,
    TablesCursorIDPage as TablesCursorIDPage,
    type TableListParams as TableListParams,
  };
}
