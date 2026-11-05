// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class McpServers extends APIResource {
  /**
   * Register a new MCP server in the current teamspace. Each teamspace can have at
   * most 30 registered MCP servers.
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

  /**
   * Complete an OAuth authorization flow for a registered MCP server by exchanging
   * the authorization code returned from the OAuth provider. Requires a user-scoped
   * API key (`dg_live_`); service keys (`dg_svc_`) are rejected with
   * `mcp_oauth_requires_user_principal`.
   */
  handleOAuthCallback(
    serverId: string,
    body: McpServerHandleOAuthCallbackParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<HandleMcpOAuthCallbackResponse> {
    return this._client.post(`/organization/mcp-servers/${serverId}/oauth-callback`, { body, ...options });
  }

  /**
   * Start an OAuth authorization flow for a registered MCP server and return the URL
   * to redirect the end user to. Requires a user-scoped API key (`dg_live_`);
   * service keys (`dg_svc_`) are rejected with `mcp_oauth_requires_user_principal`.
   */
  startOAuth(
    serverId: string,
    body: McpServerStartOAuthParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<StartMcpOAuthResponse> {
    return this._client.post(`/organization/mcp-servers/${serverId}/start-oauth`, { body, ...options });
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

export interface HandleMcpOAuthCallbackRequest {
  /**
   * Authorization code returned by the OAuth authorization server on the callback.
   */
  code: string;

  /**
   * The same `redirect_uri` passed to `start-oauth`. HTTPS is required except for
   * loopback (`http://localhost`, `http://127.0.0.1`, `http://[::1]`).
   */
  redirect_uri: string;

  /**
   * The `state` value the OAuth authorization server echoed on the callback. Must
   * match the value returned from `start-oauth`.
   */
  state: string;
}

export interface HandleMcpOAuthCallbackResponse {
  /**
   * Always true when the endpoint returns success; the flow only completes if the
   * token exchange succeeded.
   */
  oauth_configured: true;

  object: 'mcp_oauth_callback';

  /**
   * True if Datagrid automatically re-synced the MCP server's tool manifest after
   * the OAuth exchange. False if the caller lacks organization-edit permissions or
   * the sync itself failed.
   */
  tools_synced: boolean;

  /**
   * Human-readable outcome. Optional product copy — branch on `oauth_configured` and
   * `tools_synced` rather than matching this text.
   */
  message?: string;
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

  /**
   * Present when the MCP server is provisioned and managed by an installed app.
   * Managed servers are read-only through this API.
   */
  managed_by_app?: McpServer.ManagedByApp;
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

  /**
   * Present when the MCP server is provisioned and managed by an installed app.
   * Managed servers are read-only through this API.
   */
  export interface ManagedByApp {
    /**
     * The display name of the app that manages the MCP server. Falls back to app_uuid
     * when the app installation is not known to this teamspace.
     */
    app_name?: string;

    /**
     * The UUID of the app that manages the MCP server.
     */
    app_uuid?: string;
  }
}

export interface StartMcpOAuthRequest {
  /**
   * OAuth redirect URI. HTTPS is required except for loopback (`http://localhost`,
   * `http://127.0.0.1`, `http://[::1]`).
   */
  redirect_uri: string;
}

export interface StartMcpOAuthResponse {
  /**
   * URL to redirect the end user to so they can complete the OAuth authorization
   * consent.
   */
  authorization_url: string;

  object: 'mcp_oauth_start';

  /**
   * Opaque state value bound to this OAuth flow, echoed by the authorization server
   * on the callback for CSRF protection.
   */
  state: string;
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

export interface McpServerHandleOAuthCallbackParams {
  /**
   * Authorization code returned by the OAuth authorization server on the callback.
   */
  code: string;

  /**
   * The same `redirect_uri` passed to `start-oauth`. HTTPS is required except for
   * loopback (`http://localhost`, `http://127.0.0.1`, `http://[::1]`).
   */
  redirect_uri: string;

  /**
   * The `state` value the OAuth authorization server echoed on the callback. Must
   * match the value returned from `start-oauth`.
   */
  state: string;
}

export interface McpServerStartOAuthParams {
  /**
   * OAuth redirect URI. HTTPS is required except for loopback (`http://localhost`,
   * `http://127.0.0.1`, `http://[::1]`).
   */
  redirect_uri: string;
}

export declare namespace McpServers {
  export {
    type CreateMcpServerRequest as CreateMcpServerRequest,
    type HandleMcpOAuthCallbackRequest as HandleMcpOAuthCallbackRequest,
    type HandleMcpOAuthCallbackResponse as HandleMcpOAuthCallbackResponse,
    type ListMcpServersResponse as ListMcpServersResponse,
    type McpServer as McpServer,
    type StartMcpOAuthRequest as StartMcpOAuthRequest,
    type StartMcpOAuthResponse as StartMcpOAuthResponse,
    type UpdateMcpServerRequest as UpdateMcpServerRequest,
    type McpServerCreateParams as McpServerCreateParams,
    type McpServerUpdateParams as McpServerUpdateParams,
    type McpServerHandleOAuthCallbackParams as McpServerHandleOAuthCallbackParams,
    type McpServerStartOAuthParams as McpServerStartOAuthParams,
  };
}
