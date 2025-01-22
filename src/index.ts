// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import {
  type CursorIDPageParams,
  CursorIDPageResponse,
  type CursorPageParams,
  CursorPageResponse,
} from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';
import { ConverseParams, ConverseResponse, Properties } from './resources/top-level';
import { Health } from './resources/health';
import {
  Knowledge,
  KnowledgeCreateParams,
  KnowledgeListParams,
  KnowledgeResource,
  KnowledgeUpdateParams,
  KnowledgeUpdateResponse,
  KnowledgesCursorIDPage,
} from './resources/knowledge';

import { Stream } from './lib/streaming/stream';
import {
  AllConverseParams,
  ConverseEvent,
  ConverseNonStreamParams,
  ConverseStreamParams,
} from './lib/agents/agent-converse-types';

export interface ClientOptions {
  /**
   * API key required
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['DATAGRID_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Datagrid API.
 */
export class Datagrid extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Datagrid API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['DATAGRID_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['DATAGRID_BASE_URL'] ?? https://api.datagrid.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('DATAGRID_BASE_URL'),
    apiKey = Core.readEnv('DATAGRID_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.DatagridError(
        "The DATAGRID_API_KEY environment variable is missing or empty; either provide it, or instantiate the Datagrid client with an apiKey option, like new Datagrid({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.datagrid.com/v1`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  knowledge: API.KnowledgeResource = new API.KnowledgeResource(this);
  health: API.Health = new API.Health(this);

  /**
   * Converse with an AI Agent
   */

  converse(
    body: ConverseNonStreamParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ConverseResponse>;
  converse(body: ConverseStreamParams, options?: Core.RequestOptions): Core.APIPromise<Stream<ConverseEvent>>;
  converse(
    body: TopLevelAPI.ConverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ConverseResponse> | Core.APIPromise<Stream<ConverseEvent>>;
  converse(
    body: AllConverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ConverseResponse> | Core.APIPromise<Stream<ConverseEvent>> {
    return this.post('/converse', { body, ...options }) as
      | Core.APIPromise<TopLevelAPI.ConverseResponse>
      | Core.APIPromise<Stream<ConverseEvent>>;
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Datagrid = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static DatagridError = Errors.DatagridError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Datagrid.KnowledgeResource = KnowledgeResource;
Datagrid.KnowledgesCursorIDPage = KnowledgesCursorIDPage;
Datagrid.Health = Health;

export declare namespace Datagrid {
  export type RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export import CursorIDPage = Pagination.CursorIDPage;
  export { type CursorIDPageParams as CursorIDPageParams, type CursorIDPageResponse as CursorIDPageResponse };

  export {
    type Properties as Properties,
    type ConverseResponse as ConverseResponse,
    type ConverseParams as ConverseParams,
  };

  export {
    KnowledgeResource as KnowledgeResource,
    type Knowledge as Knowledge,
    type KnowledgeUpdateResponse as KnowledgeUpdateResponse,
    KnowledgesCursorIDPage as KnowledgesCursorIDPage,
    type KnowledgeCreateParams as KnowledgeCreateParams,
    type KnowledgeUpdateParams as KnowledgeUpdateParams,
    type KnowledgeListParams as KnowledgeListParams,
  };

  export { Health as Health };
}

export { toFile, fileFromPath } from './uploads';
export {
  DatagridError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Datagrid;
