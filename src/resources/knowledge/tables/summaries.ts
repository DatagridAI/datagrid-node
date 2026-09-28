// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class Summaries extends APIResource {
  /**
   * Returns indexed summary content for a knowledge table. Use `record_type=row`
   * (the default) for per-row summaries, `record_type=table` for the table-level
   * summary, `record_type=file` for file-level overviews, or `record_type=page` for
   * page extraction bodies. This endpoint reflects the current index state and does
   * not consume AI credits.
   */
  list(
    tableId: string,
    query?: SummaryListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SummariesCursorPage, Summary>;
  list(tableId: string, options?: Core.RequestOptions): Core.PagePromise<SummariesCursorPage, Summary>;
  list(
    tableId: string,
    query: SummaryListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SummariesCursorPage, Summary> {
    if (isRequestOptions(query)) {
      return this.list(tableId, {}, query);
    }
    return this._client.getAPIList(`/tables/${tableId}/summaries`, SummariesCursorPage, {
      query,
      ...options,
    });
  }
}

export class SummariesCursorPage extends CursorPage<Summary> {}

/**
 * The `summary` object represents indexed summary content. Row, table, and file
 * records contain generated summaries; page records contain the indexed page
 * extraction body.
 */
export interface Summary {
  /**
   * The summary identifier.
   */
  id: string;

  /**
   * The ISO string for when the summary was created. `null` for records that have
   * not finished indexing.
   */
  created_at: string | null;

  /**
   * Whether the summary has been embedded and is available for retrieval.
   */
  is_vectorized: boolean;

  /**
   * The object type, which is always `summary`.
   */
  object: 'summary';

  /**
   * The kind of summary content: per source row, table, file, or page.
   */
  record_type: 'row' | 'table' | 'file' | 'page';

  /**
   * The indexed body as markdown. For pages this is the page extraction body; for
   * other record types it is generated summary content. `null` for records that have
   * not finished indexing.
   */
  summary: string | null;

  /**
   * The id of the table this summary belongs to.
   */
  table_id: string;

  /**
   * The ISO string for when the summary was last updated. `null` for records that
   * have not finished indexing.
   */
  updated_at: string | null;

  /**
   * The id of the source file for a file or page summary. All pages of a file share
   * its file summary's `file_id`, and it can be passed to `GET /files/{file_id}`.
   * `null` for row and table summaries, and for file or page records indexed before
   * file ids were recorded.
   */
  file_id?: string | null;

  /**
   * The 1-based page number within the source file for a page summary. `null` for
   * row, table, and file summaries, and for page records indexed before page numbers
   * were recorded.
   */
  page_number?: number | null;

  /**
   * The primary key of the source row for a row summary. `null` for table, file, and
   * page summaries.
   */
  primary_key?: string | null;

  /**
   * The source row data used to generate the summary. `null` when unavailable or not
   * applicable.
   */
  source_data?: { [key: string]: unknown } | null;

  /**
   * The generated title, when available.
   */
  title?: string | null;
}

export interface SummaryListParams extends CursorPageParams {
  /**
   * Which summary variant to return. `row` (default) returns one summary per source
   * row. `table` returns the table-level summary. `file` returns file-level
   * overviews. `page` returns page extraction bodies. Matches `record_type` on each
   * Summary in the response.
   */
  record_type?: 'row' | 'table' | 'file' | 'page';
}

Summaries.SummariesCursorPage = SummariesCursorPage;

export declare namespace Summaries {
  export {
    type Summary as Summary,
    SummariesCursorPage as SummariesCursorPage,
    type SummaryListParams as SummaryListParams,
  };
}
