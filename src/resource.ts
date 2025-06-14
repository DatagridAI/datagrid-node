// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Datagrid } from './index';

export abstract class APIResource {
  protected _client: Datagrid;

  constructor(client: Datagrid) {
    this._client = client;
  }
}
