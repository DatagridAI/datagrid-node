// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class ServiceAccounts extends APIResource {
  /**
   * Creates a service account for accessing data views. Only one service account per
   * teamspace is allowed.
   */
  create(body: ServiceAccountCreateParams, options?: Core.RequestOptions): Core.APIPromise<ServiceAccount> {
    return this._client.post('/data-views/service-accounts', { body, ...options });
  }

  /**
   * Returns the list of service accounts for your teamspace. Only one service
   * account per teamspace is allowed at this time.
   */
  list(
    query?: ServiceAccountListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ServiceAccountListResponse>;
  list(
    query: ServiceAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/data-views/service-accounts', { query, ...options });
  }

  /**
   * Removes a service account and all associated data views.
   */
  delete(serviceAccountId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/data-views/service-accounts/${serviceAccountId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Retrieves the credentials (private key) for a service account.
   */
  credentials(
    serviceAccountId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ServiceAccountCredentials> {
    return this._client.get(`/data-views/service-accounts/${serviceAccountId}/credentials`, options);
  }
}

/**
 * The `service_account` object represents a service account for accessing data
 * views.
 */
export interface ServiceAccount {
  /**
   * The service account identifier.
   */
  id: string;

  /**
   * The ISO string for when the service account was created.
   */
  created_at: string;

  /**
   * The email address of the service account.
   */
  email: string;

  /**
   * The object type, which is always `service_account`.
   */
  object: 'service_account';

  /**
   * The type of service account, currently only `gcp` is supported.
   */
  type: 'gcp';
}

/**
 * The credentials for a service account.
 */
export interface ServiceAccountCredentials {
  /**
   * The object type, which is always `service_account_credentials`.
   */
  object: 'service_account_credentials';

  /**
   * The private key for the service account in JSON format.
   */
  private_key: string;

  /**
   * The type of service account credentials, currently only `gcp` is supported.
   */
  type?: 'gcp';
}

export interface ServiceAccountListResponse {
  /**
   * An array containing the service accounts.
   */
  data: Array<ServiceAccount>;

  object: 'list';
}

export interface ServiceAccountCreateParams {
  /**
   * The name of the service account. Your organization's domain will automatically
   * be prepended to the service account name. The name must only include letters
   * (a-z, A-Z), numbers (0-9), and hyphens (-), and must be between 6 and 30
   * characters long.
   */
  name: string;

  /**
   * The type of service account, currently only `gcp` is supported.
   */
  type: 'gcp';
}

export interface ServiceAccountListParams {
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

export declare namespace ServiceAccounts {
  export {
    type ServiceAccount as ServiceAccount,
    type ServiceAccountCredentials as ServiceAccountCredentials,
    type ServiceAccountListResponse as ServiceAccountListResponse,
    type ServiceAccountCreateParams as ServiceAccountCreateParams,
    type ServiceAccountListParams as ServiceAccountListParams,
  };
}
