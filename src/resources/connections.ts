// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Connections extends APIResource {
  /**
   * Creates a new connection to authenticate with a third-party service (like Google
   * Drive, Hubspot, Dropbox, etc.) and returns a redirect URL for the connection
   * authentication flow.
   */
  create(body: ConnectionCreateParams, options?: Core.RequestOptions): Core.APIPromise<RedirectURLResponse> {
    return this._client.post('/connections', { body, ...options });
  }

  /**
   * Retrieves details about an authenticated connection by id.
   */
  retrieve(connectionId: string, options?: Core.RequestOptions): Core.APIPromise<Connection> {
    return this._client.get(`/connections/${connectionId}`, options);
  }

  /**
   * Update a connection's attributes.
   */
  update(
    connectionId: string,
    body: ConnectionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Connection> {
    return this._client.patch(`/connections/${connectionId}`, { body, ...options });
  }

  /**
   * Returns the list of authenticated connections to third-party services.
   */
  list(
    query?: ConnectionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectionsCursorIDPage, Connection>;
  list(options?: Core.RequestOptions): Core.PagePromise<ConnectionsCursorIDPage, Connection>;
  list(
    query: ConnectionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectionsCursorIDPage, Connection> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/connections', ConnectionsCursorIDPage, { query, ...options });
  }

  /**
   * Delete an authenticated connection to a third-party service.
   */
  delete(connectionId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/connections/${connectionId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class ConnectionsCursorIDPage extends CursorIDPage<Connection> {}

/**
 * The `connection` object represents an authenticated connection to a third-party
 * service (like Google Drive, Hubspot, Dropbox, etc.) that can be managed through
 * the API.
 */
export interface Connection {
  /**
   * The connection identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The connector ID of the third-party service this connection authenticates with.
   */
  connector_id: string;

  /**
   * The ISO string for when the connection was created.
   */
  created_at: string;

  /**
   * The name of the connection.
   */
  name: string;

  /**
   * The object type, which is always `connection`.
   */
  object: 'connection';

  /**
   * The teamspace ID that owns this connection.
   */
  teamspace_id: string;

  /**
   * The ISO string for when the connection was last updated.
   */
  updated_at: string;

  /**
   * Whether the connection authentication is valid.
   */
  valid?: boolean;

  /**
   * The authentication value of the connection.
   */
  value?: string;
}

/**
 * The `redirect_url` object represents a redirect url for a connection.
 */
export interface RedirectURLResponse {
  object: 'redirect_url';

  /**
   * The redirect url for a connection.
   */
  redirect_url: string;
}

export interface ConnectionCreateParams {
  /**
   * The connector ID for the third-party service to connect to.
   */
  connector_id: string;
}

export interface ConnectionUpdateParams {
  /**
   * The name of the connection.
   */
  name: string;
}

export interface ConnectionListParams extends CursorIDPageParams {
  /**
   * Filter connections by connector ID.
   */
  connector_id?: string;
}

Connections.ConnectionsCursorIDPage = ConnectionsCursorIDPage;

export declare namespace Connections {
  export {
    type Connection as Connection,
    type RedirectURLResponse as RedirectURLResponse,
    ConnectionsCursorIDPage as ConnectionsCursorIDPage,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionUpdateParams as ConnectionUpdateParams,
    type ConnectionListParams as ConnectionListParams,
  };
}
