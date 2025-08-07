// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Credits extends APIResource {
  /**
   * Summarise the credits in your account for the current billing period.
   */
  get(options?: Core.RequestOptions): Core.APIPromise<CreditsReport> {
    return this._client.get('/organization/credits', options);
  }
}

export interface CreditsReport {
  /**
   * The number of credits consumed in the current billing period.
   */
  consumed: number;

  /**
   * The number of unused credits remaining for the current billing period.
   */
  remaining: number;

  /**
   * The initial total number of credits for the current billing period.
   */
  total: number;
}

export declare namespace Credits {
  export { type CreditsReport as CreditsReport };
}
