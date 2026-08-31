// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as RewriteAPI from './rewrite';
import { Rewrite, RewriteRequest, RewriteResponse, RewriteRewriteTextParams } from './rewrite';

export class Beta extends APIResource {
  rewrite: RewriteAPI.Rewrite = new RewriteAPI.Rewrite(this._client);
}

Beta.Rewrite = Rewrite;

export declare namespace Beta {
  export {
    Rewrite as Rewrite,
    type RewriteRequest as RewriteRequest,
    type RewriteResponse as RewriteResponse,
    type RewriteRewriteTextParams as RewriteRewriteTextParams,
  };
}
