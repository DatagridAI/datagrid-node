// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as InvitesAPI from './invites';
import {
  InviteCreateParams,
  InviteListParams,
  Invites,
  TeamspaceInvite,
  TeamspaceInvitesCursorIDPage,
} from './invites';
import * as UsersAPI from './users';
import { TeamspaceUser, TeamspaceUsersCursorIDPage, UserListParams, UserUpdateParams, Users } from './users';
import { CursorIDPage, type CursorIDPageParams } from '../../../pagination';

export class Teamspaces extends APIResource {
  invites: InvitesAPI.Invites = new InvitesAPI.Invites(this._client);
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Create a new teamspace within your organization.
   */
  create(body: TeamspaceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Teamspace> {
    return this._client.post('/organization/teamspaces', { body, ...options });
  }

  /**
   * Retrieve a specific teamspace by ID.
   */
  retrieve(teamspaceId: string, options?: Core.RequestOptions): Core.APIPromise<Teamspace> {
    return this._client.get(`/organization/teamspaces/${teamspaceId}`, options);
  }

  /**
   * Returns the list of teamspaces within your organization.
   */
  list(
    query?: TeamspaceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspacesCursorIDPage, Teamspace>;
  list(options?: Core.RequestOptions): Core.PagePromise<TeamspacesCursorIDPage, Teamspace>;
  list(
    query: TeamspaceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TeamspacesCursorIDPage, Teamspace> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/organization/teamspaces', TeamspacesCursorIDPage, { query, ...options });
  }

  /**
   * Update the name and/or access settings of a teamspace.
   */
  patch(
    teamspaceId: string,
    body: TeamspacePatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Teamspace> {
    return this._client.patch(`/organization/teamspaces/${teamspaceId}`, { body, ...options });
  }
}

export class TeamspacesCursorIDPage extends CursorIDPage<Teamspace> {}

export interface Teamspace {
  id: string;

  /**
   * Open teamspaces allow all organization members to join without admin approval.
   * Access for users who join this way is limited to conversations with agents in
   * this teamspace.
   *
   * Closed teamspaces require admin approval to join.
   */
  access?: 'open' | 'closed';

  /**
   * The ISO string for when the teamspace was created.
   */
  created_at?: string;

  /**
   * The name of the teamspace
   */
  name?: string;
}

export interface TeamspaceCreateParams {
  /**
   * Open teamspaces allow all organization members to join without admin approval.
   * Access for users who join this way is limited to conversations with agents in
   * this teamspace.
   *
   * Closed teamspaces require admin approval to join.
   */
  access: 'open' | 'closed';

  /**
   * The name of the teamspace
   */
  name: string;
}

export interface TeamspaceListParams extends CursorIDPageParams {}

export interface TeamspacePatchParams {
  /**
   * Open teamspaces allow all organization members to join without admin approval.
   * Access for users who join this way is limited to conversations with agents in
   * this teamspace.
   *
   * Closed teamspaces require admin approval to join.
   */
  access?: 'open' | 'closed';

  /**
   * The new name of the teamspace
   */
  name?: string;
}

Teamspaces.TeamspacesCursorIDPage = TeamspacesCursorIDPage;
Teamspaces.Invites = Invites;
Teamspaces.TeamspaceInvitesCursorIDPage = TeamspaceInvitesCursorIDPage;
Teamspaces.Users = Users;
Teamspaces.TeamspaceUsersCursorIDPage = TeamspaceUsersCursorIDPage;

export declare namespace Teamspaces {
  export {
    type Teamspace as Teamspace,
    TeamspacesCursorIDPage as TeamspacesCursorIDPage,
    type TeamspaceCreateParams as TeamspaceCreateParams,
    type TeamspaceListParams as TeamspaceListParams,
    type TeamspacePatchParams as TeamspacePatchParams,
  };

  export {
    Invites as Invites,
    type TeamspaceInvite as TeamspaceInvite,
    TeamspaceInvitesCursorIDPage as TeamspaceInvitesCursorIDPage,
    type InviteCreateParams as InviteCreateParams,
    type InviteListParams as InviteListParams,
  };

  export {
    Users as Users,
    type TeamspaceUser as TeamspaceUser,
    TeamspaceUsersCursorIDPage as TeamspaceUsersCursorIDPage,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
  };
}
