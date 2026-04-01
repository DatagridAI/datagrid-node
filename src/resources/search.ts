// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as KnowledgeAPI from './knowledge/knowledge';

export class Search extends APIResource {
  /**
   * [DEPRECATED] Search across knowledge. Use /search/ai for AI-powered generative
   * search or /search/tree for merged context tree results.
   *
   * @deprecated
   */
  search(query: SearchSearchParams, options?: Core.RequestOptions): Core.APIPromise<SearchSearchResponse> {
    return this._client.get('/search', { query, ...options });
  }

  /**
   * AI-powered search that retrieves relevant knowledge from your teamspace, builds
   * a merged context, and generates a natural language answer with numbered source
   * citations. The response includes the generated answer, the sources cited (with
   * links and metadata), and the full search tree results for reference. Use this
   * when you want an AI-generated summary answer grounded in your team's data.
   */
  searchAI(body: SearchSearchAIParams, options?: Core.RequestOptions): Core.APIPromise<SearchAIResult> {
    return this._client.post('/search/ai', { body, ...options });
  }

  /**
   * Search across your teamspace's indexed knowledge and return results as a
   * hierarchical context tree. Results are grouped by source (datasets, files,
   * pages) with navigation items for quick access. Supports pagination via
   * cursor-based `next` parameter. This endpoint is the foundation for the AI Search
   * endpoint — use this when you need structured results without AI summarization.
   */
  searchTree(
    query: SearchSearchTreeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SearchTreeResult> {
    return this._client.get('/search/tree', { query, ...options });
  }
}

/**
 * A source cited in an AI-generated search answer.
 */
export interface AISource {
  /**
   * 1-based citation index corresponding to [N] references in the answer text.
   */
  index: number;

  /**
   * Unique identifier of the source node in the search tree.
   */
  node_id: string;

  /**
   * Human-readable title of the source.
   */
  title: string;

  /**
   * The type of source: `file` (document/attachment), `record` (data row), or
   * `table` (dataset).
   */
  type: 'file' | 'record' | 'table';

  /**
   * Name of the dataset this source belongs to, if applicable.
   */
  dataset_name?: string;

  /**
   * Emoji icon for the source type (e.g., 📄 for files, 📊 for tables).
   */
  emoji?: string;

  /**
   * Page numbers within a document where the relevant content was found.
   */
  page_numbers?: Array<number>;

  /**
   * Name of the table this source belongs to, if applicable.
   */
  table_name?: string;

  /**
   * URI for a thumbnail preview of the source, if available.
   */
  thumbnail_uri?: string;

  /**
   * URL to view the source in the DataGrid web app.
   */
  url?: string;
}

/**
 * Request body for AI-powered search.
 */
export interface SearchAIRequestBody {
  /**
   * The natural language search query. The AI will search your indexed knowledge and
   * generate an answer.
   */
  query: string;

  /**
   * Maximum number of search results to consider when generating the answer.
   */
  limit?: number | null;

  /**
   * Optional filter to restrict search to specific record types (rows, tables,
   * files, pages, cells).
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'> | null;
}

/**
 * AI-generated answer with source citations and the underlying search results.
 */
export interface SearchAIResult {
  /**
   * AI-generated natural language answer based on the search results. Contains
   * numbered citations like [1], [2] that reference entries in the `sources` array.
   */
  answer: string;

  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  credits: SearchAIResult.Credits | null;

  /**
   * The object type, always `search_ai_result`.
   */
  object: 'search_ai_result';

  /**
   * The full search tree results used to generate the answer. Useful for displaying
   * raw results alongside the AI summary.
   */
  search_results: SearchTreeResult;

  /**
   * Sources cited in the answer, ordered by citation index. Each source links back
   * to the original data in your teamspace.
   */
  sources: Array<AISource>;
}

export namespace SearchAIResult {
  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
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

/**
 * Hierarchical search results grouped by source (datasets, files, pages) with
 * navigation items.
 */
export interface SearchTreeResult {
  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  credits: SearchTreeResult.Credits | null;

  /**
   * Tree nodes representing search results grouped by source. Each node contains the
   * matched content, metadata, score, and child nodes for hierarchical display.
   */
  data: Array<unknown>;

  /**
   * Whether more results are available beyond this page. Use the `next` cursor to
   * fetch additional results.
   */
  has_more: boolean;

  /**
   * Navigation items providing quick links to the datasets, tables, and files that
   * matched the query. Each item includes a name, emoji, URL, and type.
   */
  nav_items: Array<unknown>;

  /**
   * The object type, always `search_tree`.
   */
  object: 'search_tree';

  /**
   * The original search query.
   */
  query: string;

  /**
   * Pagination cursor (numeric offset as string). Pass this value as the `next`
   * query parameter to `/search/tree` to fetch the next page.
   */
  next?: string | null;
}

export namespace SearchTreeResult {
  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }
}

export interface SearchSearchResponse {
  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  credits: SearchSearchResponse.Credits | null;

  /**
   * An array containing the found search items.
   */
  data: Array<SearchResultItem>;

  object: 'list';
}

export namespace SearchSearchResponse {
  /**
   * Credit consumption for this search. When present, `consumed` reflects the actual
   * variable cost of the retrieval work performed for this request. `null` when the
   * billing write fails or the request is aborted before billing completes.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }
}

export interface SearchSearchParams {
  /**
   * The search query to run against knowledge. Must contain at least one
   * non-whitespace character after trimming.
   */
  query: string;

  /**
   * Optional list of knowledge IDs to scope the search to.
   */
  knowledge_ids?: Array<string>;

  /**
   * The limit on the number of objects to return, ranging between 1 and 100.
   */
  limit?: number;

  /**
   * A cursor to use in pagination to continue a query from the previous request.
   * This is automatically added when the request has more results to fetch.
   */
  next?: string;

  /**
   * Filter results by record type in the vector database.
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'>;
}

export interface SearchSearchAIParams {
  /**
   * The natural language search query. The AI will search your indexed knowledge and
   * generate an answer.
   */
  query: string;

  /**
   * Maximum number of search results to consider when generating the answer.
   */
  limit?: number | null;

  /**
   * Optional filter to restrict search to specific record types (rows, tables,
   * files, pages, cells).
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'> | null;
}

export interface SearchSearchTreeParams {
  /**
   * The natural language search query.
   */
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

  /**
   * Filter results by record type in the vector database. When omitted, all record
   * types are searched.
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'>;
}

export declare namespace Search {
  export {
    type AISource as AISource,
    type SearchAIRequestBody as SearchAIRequestBody,
    type SearchAIResult as SearchAIResult,
    type SearchResultItem as SearchResultItem,
    type SearchResultResource as SearchResultResource,
    type SearchResultResourceType as SearchResultResourceType,
    type SearchTreeResult as SearchTreeResult,
    type SearchSearchResponse as SearchSearchResponse,
    type SearchSearchParams as SearchSearchParams,
    type SearchSearchAIParams as SearchSearchAIParams,
    type SearchSearchTreeParams as SearchSearchTreeParams,
  };
}
