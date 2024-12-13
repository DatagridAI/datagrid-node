// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class KnowledgeResource extends APIResource {
  retrieve(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.get(`/v1/knowledge/${knowledgeId}`, options);
  }

  update(
    knowledgeId: string,
    body: KnowledgeUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<KnowledgeUpdateResponse> {
    return this._client.patch(`/v1/knowledge/${knowledgeId}`, { body, ...options });
  }

  list(
    query?: KnowledgeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<KnowledgesCursorPage, Knowledge>;
  list(options?: Core.RequestOptions): Core.PagePromise<KnowledgesCursorPage, Knowledge>;
  list(
    query: KnowledgeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<KnowledgesCursorPage, Knowledge> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/knowledge', KnowledgesCursorPage, { query, ...options });
  }

  delete(knowledgeId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/knowledge/${knowledgeId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  create2(body: KnowledgeCreate2Params, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.post('/v1/knowledge', Core.multipartFormRequestOptions({ body, ...options }));
  }
}

export class KnowledgesCursorPage extends CursorPage<Knowledge> {}

export interface Knowledge {
  id: string;

  created_at: string;

  name: string;

  status: 'pending' | 'partial' | 'ready' | 'failed';

  teamspace_id: string;

  object?: 'knowledge';
}

export interface KnowledgeUpdateResponse {
  name?: string;
}

export interface KnowledgeUpdateParams {
  name?: string;
}

export interface KnowledgeListParams extends CursorPageParams {
  direction?: 'asc' | 'desc';

  sort?: 'created_at';

  teamspace_id?: string;
}

export interface KnowledgeCreate2Params {
  files: Array<Core.Uploadable>;

  name?: string;

  teamspace_id?: string;
}

KnowledgeResource.KnowledgesCursorPage = KnowledgesCursorPage;

export declare namespace KnowledgeResource {
  export {
    type Knowledge as Knowledge,
    type KnowledgeUpdateResponse as KnowledgeUpdateResponse,
    KnowledgesCursorPage as KnowledgesCursorPage,
    type KnowledgeUpdateParams as KnowledgeUpdateParams,
    type KnowledgeListParams as KnowledgeListParams,
    type KnowledgeCreate2Params as KnowledgeCreate2Params,
  };
}
