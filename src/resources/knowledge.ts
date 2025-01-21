// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class KnowledgeResource extends APIResource {
  /**
   * Create knowledge which will be learned and leveraged by agents.
   */
  create(body: KnowledgeCreateParams, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.post('/knowledge', Core.multipartFormRequestOptions({ body, ...options }));
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
  ): Core.APIPromise<KnowledgeUpdateResponse> {
    return this._client.patch(`/knowledge/${knowledgeId}`, { body, ...options });
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
}

export class KnowledgesCursorIDPage extends CursorIDPage<Knowledge> {}

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
}

export interface KnowledgeUpdateResponse {
  name?: string;
}

export interface KnowledgeCreateParams {
  /**
   * The files to be uploaded and learned. Supported media types are `pdf`, `json`,
   * `csv`, `text`, `png`, `jpeg`, `excel`, `google sheets`.
   */
  files: Array<Core.Uploadable>;

  name?: string;
}

export interface KnowledgeUpdateParams {
  name: string;
}

export interface KnowledgeListParams extends CursorIDPageParams {}

KnowledgeResource.KnowledgesCursorIDPage = KnowledgesCursorIDPage;

export declare namespace KnowledgeResource {
  export {
    type Knowledge as Knowledge,
    type KnowledgeUpdateResponse as KnowledgeUpdateResponse,
    KnowledgesCursorIDPage as KnowledgesCursorIDPage,
    type KnowledgeCreateParams as KnowledgeCreateParams,
    type KnowledgeUpdateParams as KnowledgeUpdateParams,
    type KnowledgeListParams as KnowledgeListParams,
  };
}
