// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class User extends APIResource {
  /**
   * Create a user memory
   */
  create(body: UserCreateParams, options?: Core.RequestOptions): Core.APIPromise<UserMemory> {
    return this._client.post('/user-memories', {
      body,
      timeout: (this._client as any)._options.timeout ?? 120000,
      ...options,
    });
  }

  /**
   * List the memories for a given user and agent that the user has access to
   */
  list(query?: UserListParams, options?: Core.RequestOptions): Core.APIPromise<UserListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<UserListResponse>;
  list(
    query: UserListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<UserListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/user-memories', { query, ...options });
  }

  /**
   * Delete a user memory
   */
  delete(userMemoryId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/user-memories/${userMemoryId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface UserMemory {
  /**
   * The ID of the user memory.
   */
  id: string;

  /**
   * The agent ID of the user memory.
   */
  agent_id: string;

  /**
   * The context of the user memory.
   */
  context: Array<string>;

  /**
   * The created at of the user memory.
   */
  created_at: string;

  /**
   * The memory of the user memory.
   */
  memory: Array<string>;

  /**
   * The object type, which is always `user_memory`.
   */
  object: 'user_memory';

  /**
   * The updated at of the user memory.
   */
  updated_at: string;

  /**
   * The user ID of the user memory.
   */
  user_id: string;

  /**
   * The user prompt of the user memory.
   */
  user_prompt: string;
}

export interface UserListResponse {
  /**
   * An array containing the actual response elements, paginated by any request
   * parameters.
   */
  data: Array<UserMemory>;

  object: 'list';

  /**
   * Whether or not there are more elements available after this set. If false, this
   * set comprises the end of the list.
   */
  has_more?: boolean;
}

export interface UserCreateParams {
  /**
   * The agent ID of the user memory.
   */
  agent_id: string;

  /**
   * The memory of the user memory.
   */
  memory: string;

  /**
   * The context of the user memory.
   */
  context?: string | null;

  /**
   * The user prompt of the user memory.
   */
  user_prompt?: string | null;
}

export interface UserListParams {
  /**
   * The limit on the number of objects to return, ranging between 1 and 100.
   */
  limit?: number;

  /**
   * A cursor to use in pagination. `offset` is an integer that defines your place in
   * the list. For example, if you make a list request and receive 100 objects,
   * starting with `obj_bar`, your subsequent call can include `offset=100` to fetch
   * the next page of the list.
   */
  offset?: number;
}

export declare namespace User {
  export {
    type UserMemory as UserMemory,
    type UserListResponse as UserListResponse,
    type UserCreateParams as UserCreateParams,
    type UserListParams as UserListParams,
  };
}
