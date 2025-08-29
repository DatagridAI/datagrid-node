// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../../pagination';

export class Invites extends APIResource {
  /**
   * Invite a user to join the teamspace. This will send an invitation email. If the
   * user already exists, the invite will be automatically accepted.
   */
  create(
    teamspaceId: string,
    body: InviteCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TeamspaceInvite> {
    return this._client.post(`/organization/teamspaces/${teamspaceId}/invites`, { body, ...options });
  }

  /**
   * Get a pending invite for in a teamspace.
   */
  retrieve(
    teamspaceId: string,
    inviteId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TeamspaceInvite> {
    return this._client.get(`/organization/teamspaces/${teamspaceId}/invites/${inviteId}`, options);
  }

  /**
   * List all pending invites for a teamspace.
   */
  list(
    teamspaceId: string,
    query?: InviteListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceInvitesCursorIDPage, TeamspaceInvite>;
  list(
    teamspaceId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceInvitesCursorIDPage, TeamspaceInvite>;
  list(
    teamspaceId: string,
    query: InviteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceInvitesCursorIDPage, TeamspaceInvite> {
    if (isRequestOptions(query)) {
      return this.list(teamspaceId, {}, query);
    }
    return this._client.getAPIList(
      `/organization/teamspaces/${teamspaceId}/invites`,
      TeamspaceInvitesCursorIDPage,
      { query, ...options },
    );
  }

  /**
   * Delete a pending invite for a user in a teamspace.
   */
  delete(teamspaceId: string, inviteId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/organization/teamspaces/${teamspaceId}/invites/${inviteId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class TeamspaceInvitesCursorIDPage extends CursorIDPage<TeamspaceInvite> {}

/**
 * Represents a invite for a user in a teamspace
 */
export interface TeamspaceInvite {
  /**
   * The ID of the invite. Only present if the invite is pending.
   */
  id: string;

  /**
   * The email address of the user invited
   */
  email: string;

  /**
   * Represents the permissions assigned to a user in a teamspace
   */
  permissions: TeamspaceInvite.Permissions;

  /**
   * Whether the user has accepted the invite
   */
  status: 'pending' | 'accepted';

  /**
   * The date and time the user accepted the invite. Only present if the invite is
   * accepted.
   */
  accepted_at?: string | null;
}

export namespace TeamspaceInvite {
  /**
   * Represents the permissions assigned to a user in a teamspace
   */
  export interface Permissions {
    /**
     * The role to assign to the user in the teamspace. Available roles: admin, member,
     * agents-only, agent-specific
     */
    role: 'admin' | 'member' | 'agents-only' | 'agent-specific';

    /**
     * The IDs of the agents that the user has access to, if the role is agent-specific
     */
    agent_ids?: Array<string> | null;
  }
}

export interface InviteCreateParams {
  /**
   * The email address of the user to invite
   */
  email: string;

  /**
   * The permissions to assign to the user in the teamspace
   */
  permissions?: InviteCreateParams.Permissions | null;
}

export namespace InviteCreateParams {
  /**
   * The permissions to assign to the user in the teamspace
   */
  export interface Permissions {
    /**
     * The role to assign to the user in the teamspace. Available roles: admin, member,
     * agents-only, agent-specific
     */
    role: 'admin' | 'member' | 'agents-only' | 'agent-specific';

    /**
     * The IDs of the agents that the user has access to, if the role is agent-specific
     */
    agent_ids?: Array<string> | null;
  }
}

export interface InviteListParams extends CursorIDPageParams {}

Invites.TeamspaceInvitesCursorIDPage = TeamspaceInvitesCursorIDPage;

export declare namespace Invites {
  export {
    type TeamspaceInvite as TeamspaceInvite,
    TeamspaceInvitesCursorIDPage as TeamspaceInvitesCursorIDPage,
    type InviteCreateParams as InviteCreateParams,
    type InviteListParams as InviteListParams,
  };
}
