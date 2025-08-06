// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as UserAPI from './user';
import { User, UserCreateParams, UserListParams, UserListResponse, UserMemory } from './user';

export class Memory extends APIResource {
  user: UserAPI.User = new UserAPI.User(this._client);
}

Memory.User = User;

export declare namespace Memory {
  export {
    User as User,
    type UserMemory as UserMemory,
    type UserListResponse as UserListResponse,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
  };
}
