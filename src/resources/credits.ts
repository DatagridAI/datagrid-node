// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Credits extends APIResource {
  /**
   * Summarise the credits in your account for the current billing period.
   */
  get(options?: Core.RequestOptions): Core.APIPromise<CreditsResponse> {
    return this._client.get('/credits', options);
  }
}

export interface CreditsConverseResponse {
  /**
   * The number of credits consumed for the entire conversation.
   */
  consumed_for_conversation: number;

  /**
   * The number of credits consumed during this specific converse call for the
   * message.
   */
  consumed_for_message: number;
}

export interface CreditsKnowledgeResponse {
  /**
   * The total number of credits consumed for all learning on the knowledge including
   * updates.
   */
  consumed_for_knowledge: number;

  /**
   * The number of credits consumed whilst learning the knowledge.
   */
  consumed_for_learning: number;
}

export interface CreditsResponse {
  /**
   * The number of credits consumed in the current billing period.
   */
  consumed: number;

  /**
   * The number of unused credits remaining for the current billing period.
   */
  remaining: number;

  /**
   * The initial total number of credits for the current billing period.
   */
  total: number;
}

export declare namespace Credits {
  export {
    type CreditsConverseResponse as CreditsConverseResponse,
    type CreditsKnowledgeResponse as CreditsKnowledgeResponse,
    type CreditsResponse as CreditsResponse,
  };
}
