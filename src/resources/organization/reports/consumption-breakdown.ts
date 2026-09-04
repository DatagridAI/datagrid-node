// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class ConsumptionBreakdownResource extends APIResource {
  /**
   * Return Control Tower teamspace/organization credit consumption rows for the
   * authenticated organization. The date window is measured in UTC calendar days and
   * must not exceed 90 days. A date-only `start_date` begins at UTC midnight and a
   * date-only `end_date` covers that whole UTC day. Pagination uses opaque `after` /
   * `before` cursors from `first_id` / `last_id`. The cursors encode a position in
   * the result set, not a record id, so rows written between two page requests can
   * shift the window. Dollar `amount` is not included.
   */
  list(
    query: ConsumptionBreakdownListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConsumptionBreakdownList> {
    return this._client.get('/organization/reports/consumption-breakdown', { query, ...options });
  }
}

export interface ConsumptionBreakdown {
  /**
   * Human-readable action or service label.
   */
  action: string;

  /**
   * When the consumption occurred.
   */
  created_at: string;

  /**
   * Credits consumed by this row. Fractional — the row is a sum of decimal ledger
   * amounts.
   */
  credits: number;

  /**
   * Object type discriminator.
   */
  object: 'consumption_breakdown';

  /**
   * Consumer organization (teamspace) name.
   */
  organization: string;

  /**
   * Labelled source of the credits (for example a recurring invoice).
   */
  credit_source?: string;

  /**
   * Optional resource associated with the consumption.
   */
  resource?: string;

  /**
   * Optional resource type associated with the consumption.
   */
  resource_type?: string;
}

export interface ConsumptionBreakdownList {
  /**
   * Consumption breakdown rows for this page.
   */
  data: Array<ConsumptionBreakdown>;

  /**
   * Opaque cursor for the first row on this page, or null when the page is empty.
   */
  first_id: string | null;

  /**
   * Whether additional rows exist after this page.
   */
  has_more: boolean;

  /**
   * Opaque cursor for the last row on this page, or null when the page is empty.
   */
  last_id: string | null;

  /**
   * The object type, always 'list'.
   */
  object: 'list';
}

export interface ConsumptionBreakdownListParams {
  /**
   * Inclusive end of the report window (ISO 8601 date or date-time). A date-only
   * value covers that entire UTC day; a date-time is used exactly as given.
   */
  end_date: string;

  /**
   * Inclusive start of the report window (ISO 8601 date or date-time). Date-only
   * values are UTC midnight.
   */
  start_date: string;

  /**
   * A cursor to use in pagination. `after` is an object ID that defines your place
   * in the list. For example, if you make a list request and receive 100 objects,
   * ending with `obj_foo`, your subsequent call can include `after=obj_foo` to fetch
   * the next page of the list.
   */
  after?: string;

  /**
   * A cursor to use in pagination. `before` is an object ID that defines your place
   * in the list. For example, if you make a list request and receive 100 objects,
   * starting with `obj_bar`, your subsequent call can include `before=obj_bar` to
   * fetch the previous page of the list.
   */
  before?: string;

  /**
   * The limit on the number of objects to return, ranging between 1 and 100.
   */
  limit?: number;
}

export declare namespace ConsumptionBreakdownResource {
  export {
    type ConsumptionBreakdown as ConsumptionBreakdown,
    type ConsumptionBreakdownList as ConsumptionBreakdownList,
    type ConsumptionBreakdownListParams as ConsumptionBreakdownListParams,
  };
}
