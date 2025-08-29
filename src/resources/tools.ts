// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class Tools extends APIResource {}

export interface Tool {
  name: ToolName;

  /**
   * The ID of the connection to use for the tool.
   */
  connection_id?: string | null;
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

export declare namespace Tools {
  export { type Tool as Tool, type ToolName as ToolName };
}
