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
   * URL to view the source in the Datagrid web app.
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
   * Product-facing grouping of one result card, aligned with the result tabs in the
   * Datagrid web app. Derived from the card's structure and media type: tables and
   * records are `dataset`, files with an `image/*` media type are `image`, other
   * files and pages are `document`, and channels are `channel`.
   */
  display_type?: 'dataset' | 'document' | 'image' | 'channel' | null;

  /**
   * Maximum number of search results to consider when generating the answer.
   */
  limit?: number | null;

  /**
   * Number of results to skip before the returned page, for paginating search
   * results. Combine with `skip_ai_generation: true` to fetch subsequent pages
   * without regenerating the AI answer. Honored when paginated search is enabled for
   * the teamspace (Gen Search phase 3).
   */
  offset?: number | null;

  /**
   * Optional filter to restrict search to specific record types (rows, tables,
   * files, pages, cells).
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'> | null;

  /**
   * When true, returns the requested page of search results without generating an AI
   * answer (`answer` is null and `sources` is empty). Cannot be combined with
   * streaming. Honored when paginated search is enabled for the teamspace (Gen
   * Search phase 3).
   */
  skip_ai_generation?: boolean | null;
}

/**
 * AI-generated answer with source citations and the underlying search results.
 */
export interface SearchAIResult {
  /**
   * AI-generated natural language answer based on the search results. Contains
   * numbered citations like [1], [2] that reference entries in the `sources` array.
   * Null when the request set `skip_ai_generation: true`.
   */
  answer: string | null;

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
   * Result counts per display type across the entire result pool.
   */
  counts_by_display_type?: SearchTreeResult.CountsByDisplayType | null;

  /**
   * Canonical ordered result cards for this page — one item per result, in ranked
   * order with pinned dataset/channel supplements first. Render these directly
   * instead of traversing `data`. Only present when paginated search is enabled for
   * the teamspace (Gen Search phase 3).
   */
  display_items?: Array<SearchTreeResult.DisplayItem> | null;

  /**
   * Pagination cursor (numeric offset as string). Pass this value as the `next`
   * query parameter to `/search/tree` to fetch the next page.
   */
  next?: string | null;

  /**
   * Total number of grouped results in the ranked result pool across all pages
   * (capped by the retrieval pool limit). Only present when paginated search is
   * enabled for the teamspace (Gen Search phase 3).
   */
  total_count?: number | null;
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

  /**
   * Result counts per display type across the entire result pool.
   */
  export interface CountsByDisplayType {
    /**
     * Number of name-matched channel results.
     */
    channels: number;

    /**
     * Number of dataset results: tables, data records, and name-matched datasets.
     */
    datasets: number;

    /**
     * Number of document results: non-image files and standalone pages (multiple
     * matched pages of one file count as a single file).
     */
    documents: number;

    /**
     * Number of image results: files with an `image/*` media type.
     */
    images: number;
  }

  /**
   * One search result card with no structural children. Items arrive in ranked page
   * order; each corresponds to exactly one rendered result.
   */
  export interface DisplayItem {
    /**
     * Stable identifier of the result (document id for retrieval results, entity id
     * for dataset/channel supplements).
     */
    id: string;

    /**
     * Product-facing grouping of one result card, aligned with the result tabs in the
     * Datagrid web app. Derived from the card's structure and media type: tables and
     * records are `dataset`, files with an `image/*` media type are `image`, other
     * files and pages are `document`, and channels are `channel`.
     */
    display_type: 'dataset' | 'document' | 'image' | 'channel';

    /**
     * The kind of result card: a data record, a file, a single file page, a dataset,
     * or a channel.
     */
    kind: 'record' | 'file' | 'page' | 'dataset' | 'channel';

    /**
     * The object type, always `search_display_item`.
     */
    object: 'search_display_item';

    /**
     * Identifier of the table this result belongs to.
     */
    table_id: string;

    /**
     * Card body text (matched content snippet).
     */
    body?: string;

    /**
     * Channel membership and visibility details for channel search results.
     */
    channel_data?: DisplayItem.ChannelData;

    /**
     * When the underlying item was created.
     */
    created_at?: string;

    /**
     * Identifier of the data-lake item backing the file.
     */
    data_lake_item_id?: string;

    /**
     * Name of the dataset this result belongs to.
     */
    dataset_name?: string;

    /**
     * Emoji icon of the dataset or channel.
     */
    emoji?: string;

    /**
     * Datagrid file URI for file/page media, used to resolve thumbnails and viewers.
     */
    file_uri?: string;

    /**
     * Media type of the file (e.g. `application/pdf`, `image/png`).
     */
    media_type?: string;

    /**
     * Identifier of the navigation item for the dataset or channel.
     */
    navigation_item_id?: string;

    /**
     * 1-based page number within the source document, for `page` items.
     */
    page_number?: number;

    /**
     * Datagrid file URI scoped to this page, for `page` items.
     */
    page_url?: string;

    /**
     * Relevance score of the result, between 0 and 1.
     */
    score?: number;

    /**
     * Fingerprint of the table, used to build dataset URLs.
     */
    table_fingerprint?: string;

    /**
     * Name of the table this result belongs to.
     */
    table_name?: string;

    /**
     * Card title.
     */
    title?: string;

    /**
     * Total number of pages in the source document.
     */
    total_pages?: number;

    /**
     * When the underlying item was last updated.
     */
    updated_at?: string;

    /**
     * Resolved navigation target: a trusted source deep link when available, otherwise
     * the dataset URL in the Datagrid web app.
     */
    url?: string;
  }

  export namespace DisplayItem {
    /**
     * Channel membership and visibility details for channel search results.
     */
    export interface ChannelData {
      /**
       * Number of AI/agent members.
       */
      agent_count: number;

      /**
       * One of `channel`, `directMessage`, or `chats`.
       */
      channel_type: string;

      /**
       * Whether the requesting user is a member of this channel.
       */
      is_joined: boolean;

      /**
       * Whether the channel is private.
       */
      is_private: boolean;

      /**
       * Total number of members (people + agents).
       */
      participant_count: number;

      /**
       * Number of human members.
       */
      people_count: number;
    }
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
   * Product-facing grouping of one result card, aligned with the result tabs in the
   * Datagrid web app. Derived from the card's structure and media type: tables and
   * records are `dataset`, files with an `image/*` media type are `image`, other
   * files and pages are `document`, and channels are `channel`.
   */
  display_type?: 'dataset' | 'document' | 'image' | 'channel' | null;

  /**
   * Maximum number of search results to consider when generating the answer.
   */
  limit?: number | null;

  /**
   * Number of results to skip before the returned page, for paginating search
   * results. Combine with `skip_ai_generation: true` to fetch subsequent pages
   * without regenerating the AI answer. Honored when paginated search is enabled for
   * the teamspace (Gen Search phase 3).
   */
  offset?: number | null;

  /**
   * Optional filter to restrict search to specific record types (rows, tables,
   * files, pages, cells).
   */
  record_types?: Array<'rows' | 'tables' | 'files' | 'pages' | 'cells'> | null;

  /**
   * When true, returns the requested page of search results without generating an AI
   * answer (`answer` is null and `sources` is empty). Cannot be combined with
   * streaming. Honored when paginated search is enabled for the teamspace (Gen
   * Search phase 3).
   */
  skip_ai_generation?: boolean | null;
}

export interface SearchSearchTreeParams {
  /**
   * The natural language search query.
   */
  query: string;

  /**
   * Filter results to one display type (dataset, document, image, or channel).
   * Applied before pagination, so pages cover the full filtered result pool. When
   * omitted, all display types are returned. Honored when paginated search is
   * enabled for the teamspace (Gen Search phase 3).
   */
  display_type?: 'dataset' | 'document' | 'image' | 'channel';

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
