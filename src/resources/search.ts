// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as KnowledgeAPI from './knowledge/knowledge';

export class Search extends APIResource {
  /**
   * [BETA] Search across knowledge.
   */
  search(query: SearchSearchParams, options?: Core.RequestOptions): Core.APIPromise<SearchSearchResponse> {
    return this._client.get('/search', { query, ...options });
  }
}

export interface SearchResultItem {
  /**
   * Text snippets relevant to the search query.
   */
  content: Array<string>;

  /**
   * The object type, which is always `search_result_item`.
   */
  object: 'search_result_item';

  /**
   * The resource that matched the search query.
   */
  resource: SearchResultResource;

  /**
   * The score of the item, between 0 and 1.
   */
  score: number;

  /**
   * The date and time the item was last updated.
   */
  updated_at: string;

  /**
   * The summary of the item.
   */
  summary?: string;

  /**
   * The title of the item.
   */
  title?: string;
}

/**
 * Represents metadata for a knowledge object
 */
export type SearchResultResource =
  | KnowledgeAPI.KnowledgeMetadata
  | KnowledgeAPI.TableMetadata
  | KnowledgeAPI.RowMetadata
  | KnowledgeAPI.AttachmentMetadata
  | KnowledgeAPI.MessageMetadata;

export type SearchResultResourceType =
  | 'knowledge_metadata'
  | 'table_metadata'
  | 'row_metadata'
  | 'attachment_metadata'
  | 'message_metadata';

export interface SearchSearchResponse {
  /**
   * An array containing the found search items.
   */
  data: Array<SearchResultItem>;

  object: 'list';

  /**
   * Cursor for fetching the next page of results.
   */
  next?: string;
}

export interface SearchSearchParams {
  query: string;

  /**
   * The limit on the number of objects to return, ranging between 1 and 100.
   */
  limit?: number;

  /**
   * A cursor to use in pagination to continue a query from the previous request.
   * This is automatically added when the request has more results to fetch.
   */
  next?: string;
}

export declare namespace Search {
  export {
    type SearchResultItem as SearchResultItem,
    type SearchResultResource as SearchResultResource,
    type SearchResultResourceType as SearchResultResourceType,
    type SearchSearchResponse as SearchSearchResponse,
    type SearchSearchParams as SearchSearchParams,
  };
}
