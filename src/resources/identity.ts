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
   * The teamspace ID this request is scoped to. Resolution depends on the caller
   * type:
   *
   * - **API keys with "All Teamspaces" access** (`scopeLevel: "account"`): the
   *   teamspace selected by the `Datagrid-Teamspace` header, when that teamspace
   *   lives under the same account as the key's home teamspace.
   * - **API keys with "Selected Teamspaces" access** (`scopeLevel: "org"`): the
   *   teamspace selected by the `Datagrid-Teamspace` header, when it is on the key's
   *   teamspace list. A key whose list holds only its home teamspace ignores the
   *   header.
   * - For either kind of key, the key's home teamspace (the one it was created in)
   *   when the header is absent.
   * - **JWT callers**: the `Datagrid-Teamspace` header when present (and the user is
   *   a member), otherwise the user's default teamspace.
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
