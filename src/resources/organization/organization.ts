// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as TeamspacesAPI from './teamspaces';
import {
  Teamspace,
  TeamspaceCreateParams,
  TeamspaceListParams,
  TeamspacePatchParams,
  Teamspaces,
  TeamspacesCursorIDPage,
} from './teamspaces';

export class Organization extends APIResource {
  teamspaces: TeamspacesAPI.Teamspaces = new TeamspacesAPI.Teamspaces(this._client);
}

Organization.Teamspaces = Teamspaces;
Organization.TeamspacesCursorIDPage = TeamspacesCursorIDPage;

export declare namespace Organization {
  export {
    Teamspaces as Teamspaces,
    type Teamspace as Teamspace,
    TeamspacesCursorIDPage as TeamspacesCursorIDPage,
    type TeamspaceCreateParams as TeamspaceCreateParams,
    type TeamspaceListParams as TeamspaceListParams,
    type TeamspacePatchParams as TeamspacePatchParams,
  };
}
