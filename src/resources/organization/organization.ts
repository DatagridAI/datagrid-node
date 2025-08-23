// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as CreditsAPI from './credits';
import { Credits, CreditsReport } from './credits';
import * as UsersAPI from './users';
import {
  OrganizationUser,
  OrganizationUsersCursorIDPage,
  UserListParams,
  UserUpdateParams,
  Users,
} from './users';
import * as TeamspacesAPI from './teamspaces/teamspaces';
import {
  Teamspace,
  TeamspaceCreateParams,
  TeamspaceListParams,
  TeamspacePatchParams,
  Teamspaces,
  TeamspacesCursorIDPage,
} from './teamspaces/teamspaces';

export class Organization extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  teamspaces: TeamspacesAPI.Teamspaces = new TeamspacesAPI.Teamspaces(this._client);
  credits: CreditsAPI.Credits = new CreditsAPI.Credits(this._client);
}

Organization.Users = Users;
Organization.OrganizationUsersCursorIDPage = OrganizationUsersCursorIDPage;
Organization.Teamspaces = Teamspaces;
Organization.TeamspacesCursorIDPage = TeamspacesCursorIDPage;
Organization.Credits = Credits;

export declare namespace Organization {
  export {
    Users as Users,
    type OrganizationUser as OrganizationUser,
    OrganizationUsersCursorIDPage as OrganizationUsersCursorIDPage,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
  };

  export {
    Teamspaces as Teamspaces,
    type Teamspace as Teamspace,
    TeamspacesCursorIDPage as TeamspacesCursorIDPage,
    type TeamspaceCreateParams as TeamspaceCreateParams,
    type TeamspaceListParams as TeamspaceListParams,
    type TeamspacePatchParams as TeamspacePatchParams,
  };

  export { Credits as Credits, type CreditsReport as CreditsReport };
}
