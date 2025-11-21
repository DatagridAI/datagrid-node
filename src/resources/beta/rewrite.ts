// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Rewrite extends APIResource {
  /**
   * Rewrite text using AI with context-aware rewriting capabilities.
   */
  rewriteText(
    body: RewriteRewriteTextParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RewriteResponse> {
    return this._client.post('/beta/rewrite', { body, ...options });
  }
}

export interface RewriteRequest {
  /**
   * The full text of the document for context.
   */
  full_text: string;

  /**
   * The prompt with instructions for rewriting the text.
   */
  prompt: string;

  /**
   * The text to be rewritten.
   */
  text_to_rewrite: string;
}

export interface RewriteResponse {
  /**
   * The rewritten text.
   */
  rewritten_text: string;
}

export interface RewriteRewriteTextParams {
  /**
   * The full text of the document for context.
   */
  full_text: string;

  /**
   * The prompt with instructions for rewriting the text.
   */
  prompt: string;

  /**
   * The text to be rewritten.
   */
  text_to_rewrite: string;
}

export declare namespace Rewrite {
  export {
    type RewriteRequest as RewriteRequest,
    type RewriteResponse as RewriteResponse,
    type RewriteRewriteTextParams as RewriteRewriteTextParams,
  };
}
