// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class Records extends APIResource {
  /**
   * Returns a list of records for a table.
   */
  list(
    tableId: string,
    query?: RecordListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<RecordsCursorPage, Record>;
  list(tableId: string, options?: Core.RequestOptions): Core.PagePromise<RecordsCursorPage, Record>;
  list(
    tableId: string,
    query: RecordListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<RecordsCursorPage, Record> {
    if (isRequestOptions(query)) {
      return this.list(tableId, {}, query);
    }
    return this._client.getAPIList(`/tables/${tableId}/records`, RecordsCursorPage, { query, ...options });
  }
}

export class RecordsCursorPage extends CursorPage<Record> {}

/**
 * The `record` object represents a single record within a table.
 */
export interface Record {
  /**
   * The record identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The ISO string for when the record was created.
   */
  created_at: string;

  /**
   * The actual record data as a JSON object.
   */
  data: { [key: string]: unknown };

  /**
   * The object type, which is always `record`.
   */
  object: 'record';

  /**
   * The id of the table this record belongs to.
   */
  table_id: string;

  /**
   * The ISO string for when the record was last updated.
   */
  updated_at: string;
}

export interface RecordListParams extends CursorPageParams {}

Records.RecordsCursorPage = RecordsCursorPage;

export declare namespace Records {
  export {
    type Record as Record,
    RecordsCursorPage as RecordsCursorPage,
    type RecordListParams as RecordListParams,
  };
}
