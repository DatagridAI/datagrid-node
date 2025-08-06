// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as KnowledgeAPI from './knowledge';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Search extends APIResource {
  /**
   * [BETA] Search across knowledge.
   */
  search(
    query: SearchSearchParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SearchResultItemsCursorPage, SearchResultItem> {
    return this._client.getAPIList('/search', SearchResultItemsCursorPage, { query, ...options });
  }
}

export class SearchResultItemsCursorPage extends CursorPage<SearchResultItem> {}

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

export interface SearchSearchParams extends CursorPageParams {
  query: string;
}

Search.SearchResultItemsCursorPage = SearchResultItemsCursorPage;

export declare namespace Search {
  export {
    type SearchResultItem as SearchResultItem,
    type SearchResultResource as SearchResultResource,
    type SearchResultResourceType as SearchResultResourceType,
    SearchResultItemsCursorPage as SearchResultItemsCursorPage,
    type SearchSearchParams as SearchSearchParams,
  };
}
