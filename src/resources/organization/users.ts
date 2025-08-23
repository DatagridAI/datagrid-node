// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class Users extends APIResource {
  /**
   * Retrieve details of a specific user in the organization.
   */
  retrieve(userId: string, options?: Core.RequestOptions): Core.APIPromise<OrganizationUser> {
    return this._client.get(`/organization/users/${userId}`, options);
  }

  /**
   * Update user permissions in the organization.
   */
  update(
    userId: string,
    body: UserUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OrganizationUser> {
    return this._client.patch(`/organization/users/${userId}`, { body, ...options });
  }

  /**
   * Retrieve a list of users in the specified organization.
   */
  list(
    query?: UserListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<OrganizationUsersCursorIDPage, OrganizationUser>;
  list(options?: Core.RequestOptions): Core.PagePromise<OrganizationUsersCursorIDPage, OrganizationUser>;
  list(
    query: UserListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<OrganizationUsersCursorIDPage, OrganizationUser> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/organization/users', OrganizationUsersCursorIDPage, {
      query,
      ...options,
    });
  }
}

export class OrganizationUsersCursorIDPage extends CursorIDPage<OrganizationUser> {}

/**
 * Represents a user in an organization
 */
export interface OrganizationUser {
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
   * The roles assigned to the user in the organization
   */
  permissions: OrganizationUser.Permissions;
}

export namespace OrganizationUser {
  /**
   * The roles assigned to the user in the organization
   */
  export interface Permissions {
    /**
     * The role to assign to the user in the organization. Available roles:
     *
     * - **owner**: Organization owner. Can manage organization settings, users and
     *   create new teamspaces.
     * - **admin**: Organization administrator. Can manage organization settings, users
     *   and create new teamspaces.
     * - **member**: Standard organization member. Can create new teamspaces.
     * - **contributor**: Limited access. Can read shared resources. Cannot create new
     *   teamspaces.
     * - **collaborator**: Limited access. Cannot read shared resources. Cannot create
     *   new teamspaces.
     */
    role: 'owner' | 'admin' | 'member' | 'contributor' | 'collaborator';
  }
}

export interface UserUpdateParams {
  /**
   * The role to assign to the user in the organization. Available roles: admin,
   * member
   */
  role: 'admin' | 'member';
}

export interface UserListParams extends CursorIDPageParams {
  /**
   * Search term to filter users by name or email
   */
  search?: string;
}

Users.OrganizationUsersCursorIDPage = OrganizationUsersCursorIDPage;

export declare namespace Users {
  export {
    type OrganizationUser as OrganizationUser,
    OrganizationUsersCursorIDPage as OrganizationUsersCursorIDPage,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
  };
}
