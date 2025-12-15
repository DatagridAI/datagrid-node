// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ServiceAccountsAPI from './service-accounts';
import {
  ServiceAccount,
  ServiceAccountCreateParams,
  ServiceAccountCredentials,
  ServiceAccountListParams,
  ServiceAccountListResponse,
  ServiceAccounts,
} from './service-accounts';

export class DataViews extends APIResource {
  serviceAccounts: ServiceAccountsAPI.ServiceAccounts = new ServiceAccountsAPI.ServiceAccounts(this._client);

  /**
   * Creates a new data view for a knowledge source, providing controlled access
   * through a service account.
   */
  create(body: DataViewCreateParams, options?: Core.RequestOptions): Core.APIPromise<DataView> {
    return this._client.post('/data-views', { body, ...options });
  }

  /**
   * Returns the list of data views for a service account.
   */
  list(query: DataViewListParams, options?: Core.RequestOptions): Core.APIPromise<DataViewListResponse> {
    return this._client.get('/data-views', { query, ...options });
  }

  /**
   * Removes a data view.
   */
  delete(dataViewId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/data-views/${dataViewId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * The `data_view` object represents a view into a knowledge source that can be
 * accessed through a service account.
 */
export interface DataView {
  /**
   * The data view identifier.
   */
  id: string;

  /**
   * The ISO string for when the data view was created.
   */
  created_at: string;

  /**
   * The id of the knowledge this data view is for.
   */
  knowledge_id: string;

  /**
   * The object type, which is always `data_view`.
   */
  object: 'data_view';

  /**
   * The id of the service account that can access this data view.
   */
  service_account_id: string;
}

export interface DataViewListResponse {
  /**
   * An array containing the data views.
   */
  data: Array<DataView>;

  object: 'list';
}

export interface DataViewCreateParams {
  /**
   * The id of the knowledge to create a data view for.
   */
  knowledge_id: string;

  /**
   * The name of the data view.
   */
  name: string;

  /**
   * The id of the service account that will access this data view.
   */
  service_account_id: string;
}

export interface DataViewListParams {
  /**
   * The id of the service account to list data views for.
   */
  service_account_id: string;

  /**
   * The id of the knowledge to list data views for.
   */
  knowledge_id?: string;

  /**
   * The limit on the number of objects to return, ranging between 1 and 100.
   */
  limit?: number;

  /**
   * A cursor to use in pagination. `offset` is an integer that defines your place in
   * the list. For example, if you make a list request and receive 100 objects,
   * starting with `obj_bar`, your subsequent call can include `offset=100` to fetch
   * the next page of the list.
   */
  offset?: number;
}

DataViews.ServiceAccounts = ServiceAccounts;

export declare namespace DataViews {
  export {
    type DataView as DataView,
    type DataViewListResponse as DataViewListResponse,
    type DataViewCreateParams as DataViewCreateParams,
    type DataViewListParams as DataViewListParams,
  };

  export {
    ServiceAccounts as ServiceAccounts,
    type ServiceAccount as ServiceAccount,
    type ServiceAccountCredentials as ServiceAccountCredentials,
    type ServiceAccountListResponse as ServiceAccountListResponse,
    type ServiceAccountCreateParams as ServiceAccountCreateParams,
    type ServiceAccountListParams as ServiceAccountListParams,
  };
}
