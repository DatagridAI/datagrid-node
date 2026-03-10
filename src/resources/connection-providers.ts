// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class ConnectionProviders extends APIResource {
  /**
   * Create a new connection provider that specifies custom OAuth credentials for a
   * connector. Verify that your OAuth app meets the connector's OAuth app settings
   * requirements.
   */
  create(
    body: ConnectionProviderCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConnectionProvider> {
    return this._client.post('/connection-providers', { body, ...options });
  }

  /**
   * Retrieve a specific connection provider by ID.
   */
  retrieve(connectionProviderId: string, options?: Core.RequestOptions): Core.APIPromise<ConnectionProvider> {
    return this._client.get(`/connection-providers/${connectionProviderId}`, options);
  }

  /**
   * Update a connection provider.
   */
  update(
    connectionProviderId: string,
    body: ConnectionProviderUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConnectionProvider> {
    return this._client.patch(`/connection-providers/${connectionProviderId}`, { body, ...options });
  }

  /**
   * Returns the list of connection providers.
   */
  list(
    query?: ConnectionProviderListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectionProvidersCursorIDPage, ConnectionProvider>;
  list(options?: Core.RequestOptions): Core.PagePromise<ConnectionProvidersCursorIDPage, ConnectionProvider>;
  list(
    query: ConnectionProviderListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectionProvidersCursorIDPage, ConnectionProvider> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/connection-providers', ConnectionProvidersCursorIDPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a connection provider.
   */
  delete(connectionProviderId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/connection-providers/${connectionProviderId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class ConnectionProvidersCursorIDPage extends CursorIDPage<ConnectionProvider> {}

/**
 * The `ConnectionProvider` object represents custom OAuth credentials for a
 * connector. When creating a connection with a connection provider, the specified
 * client ID and secret will be used instead of the default credentials.
 */
export interface ConnectionProvider {
  /**
   * The connection provider identifier.
   */
  id: string;

  /**
   * The OAuth client ID to use for this connector.
   */
  client_id: string;

  /**
   * The ID of the secret containing the OAuth client secret to use for this
   * connector.
   */
  client_secret_id: string;

  /**
   * The connector ID this provider is configured for.
   */
  connector_id: string;

  /**
   * The date and time the connection provider was created.
   */
  created_at: string;

  /**
   * The name of the connection provider.
   */
  name: string;

  /**
   * The object type, which is always `connection_provider`.
   */
  object: 'connection_provider';

  /**
   * The date and time the connection provider was last updated.
   */
  updated_at: string;
}

export interface ConnectionProviderCreateParams {
  /**
   * The OAuth client ID to use for this connector.
   */
  client_id: string;

  /**
   * The OAuth client secret to use for this connector.
   */
  client_secret: string;

  /**
   * The connector ID this provider is configured for.
   */
  connector_id: string;

  /**
   * The name of the connection provider.
   */
  name: string;
}

export interface ConnectionProviderUpdateParams {
  /**
   * The OAuth client ID to use for this connector.
   */
  client_id?: string;

  /**
   * The OAuth client secret to use for this connector.
   */
  client_secret?: string;

  /**
   * The name of the connection provider.
   */
  name?: string;
}

export interface ConnectionProviderListParams extends CursorIDPageParams {
  /**
   * Filter connection providers by connector ID.
   */
  connector_id?: string;
}

ConnectionProviders.ConnectionProvidersCursorIDPage = ConnectionProvidersCursorIDPage;

export declare namespace ConnectionProviders {
  export {
    type ConnectionProvider as ConnectionProvider,
    ConnectionProvidersCursorIDPage as ConnectionProvidersCursorIDPage,
    type ConnectionProviderCreateParams as ConnectionProviderCreateParams,
    type ConnectionProviderUpdateParams as ConnectionProviderUpdateParams,
    type ConnectionProviderListParams as ConnectionProviderListParams,
  };
}
