// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Secrets extends APIResource {
  /**
   * Create a new secret that can be referenced in converse API calls.
   */
  create(body: SecretCreateParams, options?: Core.RequestOptions): Core.APIPromise<Secret> {
    return this._client.post('/secrets', { body, ...options });
  }

  /**
   * Retrieve a specific secret by ID.
   */
  retrieve(secretId: string, options?: Core.RequestOptions): Core.APIPromise<Secret> {
    return this._client.get(`/secrets/${secretId}`, options);
  }

  /**
   * Returns the list of user-created secrets.
   */
  list(
    query?: SecretListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SecretsCursorIDPage, Secret>;
  list(options?: Core.RequestOptions): Core.PagePromise<SecretsCursorIDPage, Secret>;
  list(
    query: SecretListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SecretsCursorIDPage, Secret> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/secrets', SecretsCursorIDPage, { query, ...options });
  }

  /**
   * Delete a secret.
   */
  delete(secretId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/secrets/${secretId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class SecretsCursorIDPage extends CursorIDPage<Secret> {}

/**
 * The `Secret` object represents a securely stored secret that can be referenced
 * in converse API calls.
 */
export interface Secret {
  /**
   * The secret identifier, which can be referenced in the converse API.
   */
  id: string;

  /**
   * The date and time the secret was created
   */
  created_at: string;

  /**
   * The name of the secret
   */
  name: string;

  /**
   * The object type, which is always `secret`.
   */
  object: 'secret';
}

export interface SecretCreateParams {
  /**
   * The name of the secret
   */
  name: string;

  /**
   * The secret value to store
   */
  value: string;
}

export interface SecretListParams extends CursorIDPageParams {}

Secrets.SecretsCursorIDPage = SecretsCursorIDPage;

export declare namespace Secrets {
  export {
    type Secret as Secret,
    SecretsCursorIDPage as SecretsCursorIDPage,
    type SecretCreateParams as SecretCreateParams,
    type SecretListParams as SecretListParams,
  };
}
