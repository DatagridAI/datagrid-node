// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Connectors extends APIResource {
  /**
   * Returns the list of available connectors that can be used to connect to
   * third-party services.
   */
  list(
    query?: ConnectorListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectorsCursorIDPage, Connector>;
  list(options?: Core.RequestOptions): Core.PagePromise<ConnectorsCursorIDPage, Connector>;
  list(
    query: ConnectorListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ConnectorsCursorIDPage, Connector> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/connectors', ConnectorsCursorIDPage, { query, ...options });
  }
}

export class ConnectorsCursorIDPage extends CursorIDPage<Connector> {}

/**
 * The `connector` object represents an available connector that can be used to
 * connect to a third-party service.
 */
export interface Connector {
  /**
   * The unique identifier for the connector.
   */
  id: string;

  /**
   * The display name of the connector.
   */
  name: string;

  /**
   * The object type, which is always `connector`.
   */
  object: 'connector';
}

export interface ConnectorListParams extends CursorIDPageParams {}

Connectors.ConnectorsCursorIDPage = ConnectorsCursorIDPage;

export declare namespace Connectors {
  export {
    type Connector as Connector,
    ConnectorsCursorIDPage as ConnectorsCursorIDPage,
    type ConnectorListParams as ConnectorListParams,
  };
}
