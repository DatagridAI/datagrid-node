// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Pages extends APIResource {
  /**
   * Create a new page
   */
  create(body: PageCreateParams, options?: Core.RequestOptions): Core.APIPromise<Page> {
    return this._client.post('/pages', { body, ...options });
  }

  /**
   * Get details of a specific page
   */
  retrieve(pageId: string, options?: Core.RequestOptions): Core.APIPromise<Page> {
    return this._client.get(`/pages/${pageId}`, options);
  }

  /**
   * Update a page's attributes
   */
  update(pageId: string, body: PageUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Page> {
    return this._client.patch(`/pages/${pageId}`, { body, ...options });
  }

  /**
   * List all pages for the authenticated organization
   */
  list(query?: PageListParams, options?: Core.RequestOptions): Core.PagePromise<PagesCursorIDPage, Page>;
  list(options?: Core.RequestOptions): Core.PagePromise<PagesCursorIDPage, Page>;
  list(
    query: PageListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PagesCursorIDPage, Page> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/pages', PagesCursorIDPage, { query, ...options });
  }

  /**
   * Delete a page. The page must have no children or all its children must have been
   * deleted before invoking this API.
   */
  delete(pageId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/pages/${pageId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class PagesCursorIDPage extends CursorIDPage<Page> {}

/**
 * The `page` object represents a page that can contain knowledge and other pages
 * in a hierarchical structure.
 */
export interface Page {
  /**
   * Unique identifier for the page (document resource ID)
   */
  id: string;

  /**
   * The ISO string for when the page was created
   */
  created_at: string;

  /**
   * The name of the page
   */
  name: string;

  /**
   * The object type, always 'page'
   */
  object: 'page';

  /**
   * The parent object, indicating where the object is located in the hierarchy
   */
  parent: Page.ParentPage | Page.RootPage;

  /**
   * The visibility scope of the knowledge. 'teamspace' means visible only within the
   * owning teamspace. 'organization' means visible across all teamspaces in the same
   * organization.
   */
  scope: 'teamspace' | 'organization';

  /**
   * The ID of the teamspace that owns this page.
   */
  teamspace_id: string;
}

export namespace Page {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

export interface PageCreateParams {
  /**
   * The name of the page
   */
  name: string;

  /**
   * The parent page to nest this page under. If not provided, the page will be
   * created at the root level.
   */
  parent?: PageCreateParams.ParentPage | PageCreateParams.RootPage | null;
}

export namespace PageCreateParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

export interface PageUpdateParams {
  /**
   * The new name for the page
   */
  name?: string | null;

  /**
   * Move the page to a different parent.
   */
  parent?: PageUpdateParams.ParentPage | PageUpdateParams.RootPage | null;

  /**
   * The visibility scope of the knowledge. 'teamspace' means visible only within the
   * owning teamspace. 'organization' means visible across all teamspaces in the same
   * organization.
   */
  scope?: 'teamspace' | 'organization' | null;
}

export namespace PageUpdateParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

export interface PageListParams extends CursorIDPageParams {
  /**
   * Filter by parent. Pass `{"type":"root"}` to get root-level items, or
   * `{"type":"page","page_id":"page_123"}` to get items nested under a specific
   * page. If not specified, returns all items.
   */
  parent?: PageListParams.ParentPage | PageListParams.RootPage;
}

export namespace PageListParams {
  /**
   * The parent page reference, indicating where this page is nested
   */
  export interface ParentPage {
    /**
     * The ID of the parent page. Required when type is 'page'
     */
    page_id: string;

    /**
     * The type of parent. 'page' indicates nested under a specific page
     */
    type: 'page';
  }

  /**
   * The root level object
   */
  export interface RootPage {
    /**
     * The type of parent. 'root' indicates at the root level
     */
    type: 'root';
  }
}

Pages.PagesCursorIDPage = PagesCursorIDPage;

export declare namespace Pages {
  export {
    type Page as Page,
    PagesCursorIDPage as PagesCursorIDPage,
    type PageCreateParams as PageCreateParams,
    type PageUpdateParams as PageUpdateParams,
    type PageListParams as PageListParams,
  };
}
