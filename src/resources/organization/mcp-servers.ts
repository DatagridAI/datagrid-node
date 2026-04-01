// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class McpServers extends APIResource {
  /**
   * Register a new MCP server in the current teamspace.
   */
  create(body: McpServerCreateParams, options?: Core.RequestOptions): Core.APIPromise<McpServer> {
    return this._client.post('/organization/mcp-servers', { body, ...options });
  }

  /**
   * Retrieve a registered MCP server.
   */
  retrieve(serverId: string, options?: Core.RequestOptions): Core.APIPromise<McpServer> {
    return this._client.get(`/organization/mcp-servers/${serverId}`, options);
  }

  /**
   * Update a registered MCP server.
   */
  update(
    serverId: string,
    body: McpServerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<McpServer> {
    return this._client.patch(`/organization/mcp-servers/${serverId}`, { body, ...options });
  }

  /**
   * List registered MCP servers for the current teamspace.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ListMcpServersResponse> {
    return this._client.get('/organization/mcp-servers', options);
  }

  /**
   * Delete a registered MCP server.
   */
  delete(serverId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/organization/mcp-servers/${serverId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface CreateMcpServerRequest {
  /**
   * The HTTPS URL of the MCP server.
   */
  base_url: string;

  name: string;

  /**
   * Raw Authorization header value (for example, 'Bearer <token>'). Datagrid stores
   * it as a secret and links it to this server. If both authorization and
   * authorization_secret_id are provided, authorization takes precedence.
   */
  authorization?: string | null;

  /**
   * Secret ID containing the full Authorization header value to use when calling
   * this MCP server.
   */
  authorization_secret_id?: string | null;

  icon_url?: string | null;

  protocol_version?: string | null;

  transport?: 'http' | null;
}

export interface ListMcpServersResponse {
  data: Array<McpServer>;

  object: 'list';
}

export interface McpServer {
  id: string;

  /**
   * Secret ID containing the full Authorization header value used for this
   * registered MCP server.
   */
  authorization_secret_id: string | null;

  base_url: string;

  created_at: string;

  icon_url: string | null;

  /**
   * Safe subset of server metadata exposed to API consumers.
   */
  metadata: McpServer.Metadata | null;

  name: string;

  object: 'mcp_server';

  protocol_version: string | null;

  status: string;

  transport: string;

  updated_at: string;
}

export namespace McpServer {
  /**
   * Safe subset of server metadata exposed to API consumers.
   */
  export interface Metadata {
    last_synced_at?: string;

    oauth_configured?: boolean;

    requires_oauth?: boolean;

    tool_count?: number;

    [k: string]: unknown;
  }
}

export interface UpdateMcpServerRequest {
  /**
   * Raw Authorization header value (for example, 'Bearer <token>'). Datagrid stores
   * it as a secret and links it to this server. Set to null to clear. If both
   * authorization and authorization_secret_id are provided, authorization takes
   * precedence.
   */
  authorization?: string | null;

  /**
   * Secret ID containing the full Authorization header value to use when calling
   * this MCP server. Set to null to clear.
   */
  authorization_secret_id?: string | null;

  /**
   * The HTTPS URL of the MCP server.
   */
  base_url?: string;

  icon_url?: string | null;

  name?: string;

  protocol_version?: string | null;

  transport?: 'http' | null;
}

export interface McpServerCreateParams {
  /**
   * The HTTPS URL of the MCP server.
   */
  base_url: string;

  name: string;

  /**
   * Raw Authorization header value (for example, 'Bearer <token>'). Datagrid stores
   * it as a secret and links it to this server. If both authorization and
   * authorization_secret_id are provided, authorization takes precedence.
   */
  authorization?: string | null;

  /**
   * Secret ID containing the full Authorization header value to use when calling
   * this MCP server.
   */
  authorization_secret_id?: string | null;

  icon_url?: string | null;

  protocol_version?: string | null;

  transport?: 'http' | null;
}

export interface McpServerUpdateParams {
  /**
   * Raw Authorization header value (for example, 'Bearer <token>'). Datagrid stores
   * it as a secret and links it to this server. Set to null to clear. If both
   * authorization and authorization_secret_id are provided, authorization takes
   * precedence.
   */
  authorization?: string | null;

  /**
   * Secret ID containing the full Authorization header value to use when calling
   * this MCP server. Set to null to clear.
   */
  authorization_secret_id?: string | null;

  /**
   * The HTTPS URL of the MCP server.
   */
  base_url?: string;

  icon_url?: string | null;

  name?: string;

  protocol_version?: string | null;

  transport?: 'http' | null;
}

export declare namespace McpServers {
  export {
    type CreateMcpServerRequest as CreateMcpServerRequest,
    type ListMcpServersResponse as ListMcpServersResponse,
    type McpServer as McpServer,
    type UpdateMcpServerRequest as UpdateMcpServerRequest,
    type McpServerCreateParams as McpServerCreateParams,
    type McpServerUpdateParams as McpServerUpdateParams,
  };
}
