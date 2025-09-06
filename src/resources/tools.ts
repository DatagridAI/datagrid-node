// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorNamePage, type CursorNamePageParams } from '../pagination';

export class Tools extends APIResource {
  /**
   * Retrieves a specific tool by its identifier.
   */
  retrieve(toolName: ToolName | (string & {}), options?: Core.RequestOptions): Core.APIPromise<ToolDef> {
    return this._client.get(`/tools/${toolName}`, options);
  }

  /**
   * Returns the list of available tools that can be used by agents.
   */
  list(
    query?: ToolListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefsCursorNamePage, ToolDef>;
  list(options?: Core.RequestOptions): Core.PagePromise<ToolDefsCursorNamePage, ToolDef>;
  list(
    query: ToolListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefsCursorNamePage, ToolDef> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/tools', ToolDefsCursorNamePage, { query, ...options });
  }
}

export class ToolDefsCursorNamePage extends CursorNamePage<ToolDef> {}

export interface Tool {
  name: ToolName;

  /**
   * The ID of the connection to use for the tool.
   */
  connection_id?: string | null;
}

/**
 * The `Tool` object represents a tool that can be used by agents.
 */
export interface ToolDef {
  /**
   * A detailed description of what the tool does.
   */
  description: string;

  /**
   * The display name of the tool.
   */
  label: string;

  /**
   * The unique identifier name used to reference the tool.
   */
  name: string;

  /**
   * The object type, which is always `tool`.
   */
  object: 'tool';
}

export type ToolName =
  | 'data_analysis'
  | 'semantic_search'
  | 'agent_memory'
  | 'schema_info'
  | 'table_info'
  | 'create_dataset'
  | 'calendar'
  | 'email'
  | 'schedule_recurring_message_tool'
  | 'procore'
  | 'egnyte'
  | 'notion'
  | 'google_sheets'
  | 'slack'
  | 'microsoft_teams'
  | 'sharepoint'
  | 'drive'
  | 'fieldwire'
  | 'webbrowser'
  | 'pdf_manipulation'
  | 'pdf_generator'
  | 'acc'
  | 'docusign'
  | 'webflow'
  | 'hubspot'
  | 'nec'
  | 'github'
  | 'trimble_project_site'
  | 'linkedin_posts'
  | 'data_classification'
  | 'data_extraction'
  | 'image_detection'
  | 'attachment_extraction'
  | 'pdf_extraction'
  | 'connect_data'
  | 'download_data'
  | 'web_search'
  | 'fetch_url'
  | 'company_prospect_researcher'
  | 'people_prospect_researcher';

export interface ToolListParams extends CursorNamePageParams {}

Tools.ToolDefsCursorNamePage = ToolDefsCursorNamePage;

export declare namespace Tools {
  export {
    type Tool as Tool,
    type ToolDef as ToolDef,
    type ToolName as ToolName,
    ToolDefsCursorNamePage as ToolDefsCursorNamePage,
    type ToolListParams as ToolListParams,
  };
}
