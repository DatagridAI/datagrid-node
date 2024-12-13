// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface CursorPageResponse<Item> {
  data: Array<Item>;

  next: string;
}

export interface CursorPageParams {
  next?: string;

  limit?: number;
}

export class CursorPage<Item> extends AbstractPage<Item> implements CursorPageResponse<Item> {
  data: Array<Item>;

  next: string;

  constructor(
    client: APIClient,
    response: Response,
    body: CursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.next = body.next || '';
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<CursorPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const cursor = this.next;
    if (!cursor) {
      return null;
    }

    return {
      params: {
        next: cursor,
      },
    };
  }
}
