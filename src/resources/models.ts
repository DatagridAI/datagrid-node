// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Models extends APIResource {
  /**
   * Returns the agent models and released LLMs accepted by `config.agent_model` and
   * `config.llm_model` on `POST /converse`. LLMs still in rollout appear here once
   * they are released.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return this._client.get('/models', options);
  }
}

/**
 * An agent model or LLM that can be selected for a conversation.
 */
export interface Model {
  /**
   * The value to pass as `config.agent_model` (for `agent` models) or
   * `config.llm_model` (for `llm` models).
   */
  id: string;

  /**
   * Whether the model runs as requested for the current user and teamspace. When
   * `false`, the request is still accepted but a default model is used instead.
   */
  available: boolean;

  /**
   * The model line this LLM belongs to across versions, as a snake_case token, e.g.
   * `claude_opus` or `gemini_pro`. The same family is shared by a model served on
   * different platforms. Always `null` for `agent` models.
   */
  family: string | null;

  /**
   * The display name of the model.
   */
  name: string;

  /**
   * The object type, which is always `model`.
   */
  object: 'model';

  /**
   * The company that provides the model.
   */
  provider: string;

  /**
   * Whether the model is an agent model or an LLM.
   */
  type: 'agent' | 'llm';
}

export interface ModelListResponse {
  data: Array<Model>;

  object: 'list';
}

export declare namespace Models {
  export { type Model as Model, type ModelListResponse as ModelListResponse };
}
