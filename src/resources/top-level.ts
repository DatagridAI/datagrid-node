// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as TopLevelAPI from './top-level';

export type AgentTools =
  | 'data_analysis'
  | 'semantic_search'
  | 'agent_memory'
  | 'schema_info'
  | 'table_info'
  | 'create_dataset'
  | 'calendar'
  | 'schedule_recurring_message_tool'
  | 'data_classification'
  | 'data_extraction'
  | 'image_detection'
  | 'pdf_extraction'
  | 'connect_data'
  | 'download_data'
  | 'web_search'
  | 'fetch_url'
  | 'company_prospect_researcher'
  | 'people_prospect_researcher';

export type Properties =
  | Properties.ConverseResponse
  | Properties.ConverseStatusEvent
  | Properties.ConverseContentMessageDeltaEvent;

export namespace Properties {
  export interface ConverseResponse {
    /**
     * The ID of the agent used for the converse.
     */
    agent_id: string;

    /**
     * Contents of the converse response.
     */
    content: Array<ConverseResponse.Content>;

    /**
     * The ID of the agent conversation.
     */
    conversation_id: string;

    object: 'conversation.message';
  }

  export namespace ConverseResponse {
    export interface Content {
      text: string;
    }
  }

  export interface ConverseStatusEvent {
    data: ConverseStatusEvent.Data;

    event: 'start' | 'end';
  }

  export namespace ConverseStatusEvent {
    export interface Data {
      /**
       * The ID of the agent used for the converse.
       */
      agent_id: string;

      /**
       * The ID of the agent conversation.
       */
      conversation_id: string;

      /**
       * Name of the status
       */
      status: string;
    }
  }

  export interface ConverseContentMessageDeltaEvent {
    data: ConverseContentMessageDeltaEvent.Data;

    /**
     * Type of the event which is always delta
     */
    event: 'delta';
  }

  export namespace ConverseContentMessageDeltaEvent {
    export interface Data {
      /**
       * Delta of the response message produced by the agent.
       */
      delta: Data.Delta;
    }

    export namespace Data {
      /**
       * Delta of the response message produced by the agent.
       */
      export interface Delta {
        text: string;

        type: 'text';
      }
    }
  }
}

export interface ConverseResponse {
  /**
   * The ID of the agent used for the converse.
   */
  agent_id: string;

  /**
   * Contents of the converse response.
   */
  content: Array<ConverseResponse.Content>;

  /**
   * The ID of the agent conversation.
   */
  conversation_id: string;

  object: 'conversation.message';
}

export namespace ConverseResponse {
  export interface Content {
    text: string;
  }
}

export interface ConverseParams {
  /**
   * The input prompt.
   */
  prompt: string;

  /**
   * The ID of the agent that should be used for the converse. If both agent_id and
   * conversation_id aren't provided - the new agent is created.
   */
  agent_id?: string;

  /**
   * The config that overrides the default config of the agent for that converse.
   */
  config?: ConverseParams.Config;

  /**
   * The ID of the present conversation to use. If it's not provided - a new
   * conversation will be created.
   */
  conversation_id?: string;

  /**
   * Determines the response type of the converse. Response is the Server-Sent Events
   * if stream is set to true.
   */
  stream?: boolean;
}

export namespace ConverseParams {
  /**
   * The config that overrides the default config of the agent for that converse.
   */
  export interface Config {
    /**
     * The version of Datagrid's agent brain.
     */
    agent_model?: 'magpie-1' | 'magpie-1.1';

    /**
     * Array of the agent tools to enable. If not provided - default tools of the agent
     * are used. If empty list provided - none of the tools are used. If null
     * provided - all tools are used.
     *
     * Knowledge management tools:
     *
     * - data_analysis: Answer statistical or analytical questions like "Show my
     *   quarterly revenue growth"
     * - semantic_search: Search knowledge through natural language queries.
     * - agent_memory: Agents can remember experiences, conversations and user
     *   preferences.
     * - schema_info: Helps the Agent understand column names and dataset purpose.
     *   Avoid disabling
     * - table_info: Allow the AI Agent to get information about datasets and schemas
     * - create_dataset: Agents respond with data tables
     *
     * Actions:
     *
     * - calendar: Allow the Agent to access and make changes to your Google Calendar
     * - schedule_recurring_message_tool: Eliminate busywork such as: "Send a summary
     *   of today's meetings at 5pm on workdays"
     *
     * Data processing tools:
     *
     * - data_classification: Agents handle queries like "Label these emails as high,
     *   medium, or low priority"
     * - data_extraction: Helps the agent understand data from other tools. Avoid
     *   disabling
     * - image_detection: Extract information from images using AI
     * - pdf_extraction: Extraction of information from PDFs using AI
     *
     * Enhanced response tools:
     *
     * - connect_data: Agents provide buttons to import data in response to queries
     *   like "Connect Hubspot"
     * - download_data: Agents handle queries like "download the table as CSV"
     *
     * Web tools:
     *
     * - web_search: Agents search the internet, and provide links to their sources
     * - fetch_url: Fetch URL content
     * - company_prospect_researcher: Agents provide information about companies
     * - people_prospect_researcher: Agents provide information about people
     */
    agent_tools?: Array<TopLevelAPI.AgentTools> | null;

    /**
     * Array of Knowledge IDs the agent should use during the converse. If not
     * provided - default settings are used. If null provided - all available knowledge
     * is used.
     */
    knowledge_ids?: Array<string> | null;

    /**
     * The LLM used to generate responses.
     */
    llm_model?:
      | 'gemini-1.5-flash-001'
      | 'gemini-1.5-flash-002'
      | 'gemini-2.0-flash-001'
      | 'gemini-1.5-pro-001'
      | 'gemini-1.5-pro-002'
      | 'chatgpt-4o-latest'
      | 'gpt-4'
      | 'gpt-4-turbo'
      | 'gpt-4o'
      | 'gpt-4o-mini';

    /**
     * Directs your AI Agent's operational behavior.
     */
    system_prompt?: string;
  }
}

export declare namespace TopLevel {
  export {
    type AgentTools as AgentTools,
    type Properties as Properties,
    type ConverseResponse as ConverseResponse,
    type ConverseParams as ConverseParams,
  };
}
