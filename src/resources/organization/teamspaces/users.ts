// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../../pagination';

export class Users extends APIResource {
  /**
   * Retrieve details of a specific user in the teamspace.
   */
  retrieve(
    teamspaceId: string,
    userId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TeamspaceUser> {
    return this._client.get(`/organization/teamspaces/${teamspaceId}/users/${userId}`, options);
  }

  /**
   * Update user permissions in the teamspace.
   */
  update(
    teamspaceId: string,
    userId: string,
    body: UserUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TeamspaceUser> {
    return this._client.patch(`/organization/teamspaces/${teamspaceId}/users/${userId}`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieve a list of users in the specified teamspace.
   */
  list(
    teamspaceId: string,
    query?: UserListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceUsersCursorIDPage, TeamspaceUser>;
  list(
    teamspaceId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceUsersCursorIDPage, TeamspaceUser>;
  list(
    teamspaceId: string,
    query: UserListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspaceUsersCursorIDPage, TeamspaceUser> {
    if (isRequestOptions(query)) {
      return this.list(teamspaceId, {}, query);
    }
    return this._client.getAPIList(
      `/organization/teamspaces/${teamspaceId}/users`,
      TeamspaceUsersCursorIDPage,
      { query, ...options },
    );
  }

  /**
   * Revoke a user's permissions from the teamspace.
   */
  delete(teamspaceId: string, userId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/organization/teamspaces/${teamspaceId}/users/${userId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class TeamspaceUsersCursorIDPage extends CursorIDPage<TeamspaceUser> {}

/**
 * Represents a user in a teamspace
 */
export interface TeamspaceUser {
  /**
   * The unique identifier of the user
   */
  id: string;

  /**
   * The email address of the user
   */
  email: string;

  /**
   * The first name of the user
   */
  first_name: string;

  /**
   * The last name of the user
   */
  last_name: string;

  /**
   * The permissions assigned to the user in the teamspace
   */
  permissions: TeamspaceUser.Permissions;
}

export namespace TeamspaceUser {
  /**
   * The permissions assigned to the user in the teamspace
   */
  export interface Permissions {
    /**
     * The role assigned to the user. Available roles:
     *
     * - **owner**: Creator of the teamspace. Full control over the teamspace. Can
     *   manage all users, settings, and resources.
     * - **admin**: Full control over the teamspace. Can manage all users, settings,
     *   and resources.
     * - **member**: Standard member access. Can view and interact with teamspace
     *   resources. Can invite other members.
     * - **collaborator**: Read-only access with ability to comment and provide
     *   feedback.
     * - **agents-only**: Access limited to AI agent interactions within the teamspace.
     * - **agent-specific**: Limited access on teamspace level, can only access agents
     *   that are assigned to the teamspace.
     */
    role: 'owner' | 'admin' | 'member' | 'collaborator' | 'agents-only' | 'agent-specific';

    /**
     * The agent IDs that the user has access to, if the role is agent-specific.
     */
    agent_ids?: Array<string> | null;
  }
}

export interface UserUpdateParams {
  role: 'admin' | 'member' | 'agents-only' | 'agent-specific';

  /**
   * The agent IDs that the user has access to, if the role is agent-specific.
   */
  agent_ids?: Array<string> | null;
}

export interface UserListParams extends CursorIDPageParams {
  /**
   * Search term to filter users by name or email
   */
  search?: string;
}

Users.TeamspaceUsersCursorIDPage = TeamspaceUsersCursorIDPage;

export declare namespace Users {
  export {
    type TeamspaceUser as TeamspaceUser,
    TeamspaceUsersCursorIDPage as TeamspaceUsersCursorIDPage,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
  };
}
