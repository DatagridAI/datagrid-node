// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class IdentityResource extends APIResource {
  /**
   * Returns the identity of the authenticated caller — the user ID, current
   * teamspace, and all teamspace memberships that the API key or JWT resolves to.
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<Identity> {
    return this._client.get('/identity', options);
  }
}

export interface Identity {
  /**
   * The teamspace ID this request is scoped to (derived from the API key or the
   * Datagrid-Teamspace header).
   */
  current_teamspace_id: string;

  object: 'identity';

  /**
   * All teamspaces the authenticated user is a member of.
   */
  teamspaces: Array<IdentityTeamspace>;

  /**
   * The ID of the authenticated user.
   */
  user_id: string;
}

export interface IdentityTeamspace {
  /**
   * The permissions the user holds in this teamspace.
   */
  permissions: IdentityTeamspace.Permissions;

  /**
   * The ID of the teamspace.
   */
  teamspace_id: string;
}

export namespace IdentityTeamspace {
  /**
   * The permissions the user holds in this teamspace.
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

export declare namespace IdentityResource {
  export { type Identity as Identity, type IdentityTeamspace as IdentityTeamspace };
}
