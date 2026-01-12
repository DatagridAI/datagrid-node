// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as RecordsAPI from './records';
import { Record, RecordListParams, Records, RecordsCursorPage } from './records';
import { CursorIDPage, type CursorIDPageParams } from '../../../pagination';

export class Tables extends APIResource {
  records: RecordsAPI.Records = new RecordsAPI.Records(this._client);

  /**
   * Retrieves a table by id.
   */
  retrieve(tableId: string, options?: Core.RequestOptions): Core.APIPromise<Table> {
    return this._client.get(`/tables/${tableId}`, options);
  }

  /**
   * Returns a list of tables.
   */
  list(query?: TableListParams, options?: Core.RequestOptions): Core.PagePromise<TablesCursorIDPage, Table>;
  list(options?: Core.RequestOptions): Core.PagePromise<TablesCursorIDPage, Table>;
  list(
    query: TableListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TablesCursorIDPage, Table> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/tables', TablesCursorIDPage, { query, ...options });
  }
}

export class TablesCursorIDPage extends CursorIDPage<Table> {}

/**
 * The `table` object represents a table within a knowledge.
 */
export interface Table {
  /**
   * The table identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The ISO string for when the table was created.
   */
  created_at: string;

  /**
   * The id of the knowledge this table belongs to.
   */
  knowledge_id: string;

  /**
   * The name of the table.
   */
  name: string;

  /**
   * The object type, which is always `table`.
   */
  object: 'table';

  /**
   * The ISO string for when the table was last updated.
   */
  updated_at: string;
}

export interface TableListParams extends CursorIDPageParams {
  /**
   * Filter tables by knowledge id.
   */
  knowledge_id?: string;
}

Tables.TablesCursorIDPage = TablesCursorIDPage;
Tables.Records = Records;
Tables.RecordsCursorPage = RecordsCursorPage;

export declare namespace Tables {
  export {
    type Table as Table,
    TablesCursorIDPage as TablesCursorIDPage,
    type TableListParams as TableListParams,
  };

  export {
    Records as Records,
    type Record as Record,
    RecordsCursorPage as RecordsCursorPage,
    type RecordListParams as RecordListParams,
  };
}
