// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ConverseAPI from './converse';
import { BetaConverseRequest, Converse, ConverseConverseParams } from './converse';
import * as RewriteAPI from './rewrite';
import { Rewrite, RewriteRequest, RewriteResponse, RewriteRewriteTextParams } from './rewrite';

export class Beta extends APIResource {
  converse: ConverseAPI.Converse = new ConverseAPI.Converse(this._client);
  rewrite: RewriteAPI.Rewrite = new RewriteAPI.Rewrite(this._client);
}

Beta.Converse = Converse;
Beta.Rewrite = Rewrite;

export declare namespace Beta {
  export {
    Converse as Converse,
    type BetaConverseRequest as BetaConverseRequest,
    type ConverseConverseParams as ConverseConverseParams,
  };

  export {
    Rewrite as Rewrite,
    type RewriteRequest as RewriteRequest,
    type RewriteResponse as RewriteResponse,
    type RewriteRewriteTextParams as RewriteRewriteTextParams,
  };
}
