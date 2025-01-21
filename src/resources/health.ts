// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Health extends APIResource {
  /**
   * Check DatagridAPI state
   */
  checkAPIHealth(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.get('/health', { ...options, headers: { Accept: '*/*', ...options?.headers } });
  }
}
