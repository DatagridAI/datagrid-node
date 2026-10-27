// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Procore extends APIResource {
  /**
   * Lists the Procore companies the authenticated user's own Procore session can
   * access. Procore authorizes the call with the user's token, so the result matches
   * what the user can see in Procore. Pages with `page` / `per_page`, mirroring
   * Procore's own paging.
   */
  listCompanies(
    query?: ProcoreListCompaniesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProcoreCompanyList>;
  listCompanies(options?: Core.RequestOptions): Core.APIPromise<ProcoreCompanyList>;
  listCompanies(
    query: ProcoreListCompaniesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProcoreCompanyList> {
    if (isRequestOptions(query)) {
      return this.listCompanies({}, query);
    }
    return this._client.get('/procore/companies', { query, ...options });
  }

  /**
   * Lists the Procore projects the authenticated user's own Procore session can
   * access in one company, including inactive projects. Pages with `page` /
   * `per_page`, passed through to Procore.
   */
  listProjects(
    companyId: string,
    query?: ProcoreListProjectsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProcoreProjectList>;
  listProjects(companyId: string, options?: Core.RequestOptions): Core.APIPromise<ProcoreProjectList>;
  listProjects(
    companyId: string,
    query: ProcoreListProjectsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProcoreProjectList> {
    if (isRequestOptions(query)) {
      return this.listProjects(companyId, {}, query);
    }
    return this._client.get(`/procore/companies/${companyId}/projects`, { query, ...options });
  }
}

export interface ProcoreCompany {
  /**
   * The Procore company ID.
   */
  id: string;

  /**
   * The company name in Procore.
   */
  name: string;
}

export interface ProcoreCompanyList {
  data: Array<ProcoreCompany>;

  /**
   * Whether another page follows.
   */
  has_more: boolean;

  /**
   * The `page` value for the next page, or `null` on the last page.
   */
  next_page: number | null;

  object: 'list';
}

export interface ProcoreProject {
  /**
   * The Procore project ID.
   */
  id: string;

  /**
   * The Procore company ID the project belongs to.
   */
  company_id: string;

  /**
   * The project name in Procore.
   */
  name: string;

  /**
   * Whether the project is active in Procore, when reported.
   */
  active?: boolean;

  /**
   * The project number in Procore, when set.
   */
  project_number?: string;
}

export interface ProcoreProjectList {
  data: Array<ProcoreProject>;

  /**
   * Whether another page follows.
   */
  has_more: boolean;

  /**
   * The `page` value for the next page, or `null` on the last page.
   */
  next_page: number | null;

  object: 'list';
}

export interface ProcoreListCompaniesParams {
  /**
   * 1-based page number. Values below 1 are treated as 1.
   */
  page?: number;

  /**
   * Items per page. Values above 100 are clamped to 100.
   */
  per_page?: number;
}

export interface ProcoreListProjectsParams {
  /**
   * 1-based page number. Values below 1 are treated as 1.
   */
  page?: number;

  /**
   * Items per page. Values above 100 are clamped to 100.
   */
  per_page?: number;
}

export declare namespace Procore {
  export {
    type ProcoreCompany as ProcoreCompany,
    type ProcoreCompanyList as ProcoreCompanyList,
    type ProcoreProject as ProcoreProject,
    type ProcoreProjectList as ProcoreProjectList,
    type ProcoreListCompaniesParams as ProcoreListCompaniesParams,
    type ProcoreListProjectsParams as ProcoreListProjectsParams,
  };
}
