// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ToolsAPI from './tools';
import * as MessagesAPI from './conversations/messages';

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export interface ConverseResponse {
  /**
   * The message identifier.
   */
  id: string;

  /**
   * The ID of the agent that sent or responded to the message.
   */
  agent_id: string;

  /**
   * Array of citations that provide knowledges for factual statements in the
   * response. Each citation includes the referenced text and its knowledges.
   */
  citations: Array<ConverseResponse.Citation> | null;

  /**
   * Contents of the message.
   */
  content: Array<ConverseResponse.Content>;

  /**
   * The ID of the conversation the message belongs to.
   */
  conversation_id: string;

  /**
   * The ISO string for when the message was created.
   */
  created_at: string;

  credits: ConverseResponse.Credits | null;

  /**
   * The object type, which is always `conversation.message`.
   */
  object: 'conversation.message';

  /**
   * The role of the message sender - either 'user' or 'agent'.
   */
  role: 'user' | 'agent';
}

export namespace ConverseResponse {
  export interface Citation {
    /**
     * The text snippet from the response that is being cited.
     */
    citation: string;

    /**
     * Array of knowledges that support this citation.
     */
    knowledges: Array<Citation.Knowledge>;
  }

  export namespace Citation {
    export interface Knowledge {
      /**
       * An array of text snippets from the knowledge that confirm the citation.
       */
      confirmations: Array<string>;

      /**
       * Name of the knowledge.
       */
      knowledge_name: string;

      type: 'image' | 'pdf_page' | 'record' | 'web_search' | 'sql_query_result' | 'action';

      /**
       * Id of the knowledge.
       */
      knowledge_id?: string;
    }
  }

  export interface Content {
    text: string;

    type: 'text';
  }

  export interface Credits {
    /**
     * The number of credits consumed by the converse call.
     */
    consumed: number;
  }
}

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export type Properties =
  | MessagesAPI.Message
  | Properties.ConverseStatusEvent
  | Properties.ConverseContentMessageDeltaEvent
  | Properties.ConverseToolCallDeltaEvent;

export namespace Properties {
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

      /**
       * Array of citations that provide knowledges for factual statements in the
       * response. Each citation includes the referenced text and its knowledges.
       */
      citations?: Array<Data.Citation>;
    }

    export namespace Data {
      export interface Citation {
        /**
         * The text snippet from the response that is being cited.
         */
        citation: string;

        /**
         * Array of knowledges that support this citation.
         */
        knowledges: Array<Citation.Knowledge>;
      }

      export namespace Citation {
        export interface Knowledge {
          /**
           * An array of text snippets from the knowledge that confirm the citation.
           */
          confirmations: Array<string>;

          /**
           * Name of the knowledge.
           */
          knowledge_name: string;

          type: 'image' | 'pdf_page' | 'record' | 'web_search' | 'sql_query_result' | 'action';

          /**
           * Id of the knowledge.
           */
          knowledge_id?: string;
        }
      }
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

  export interface ConverseToolCallDeltaEvent {
    data: ConverseToolCallDeltaEvent.Data;

    /**
     * Type of the event which is always tool_call
     */
    event: 'tool_call';
  }

  export namespace ConverseToolCallDeltaEvent {
    export interface Data {
      /**
       * The ID of the tool call.
       */
      id: string;

      status: 'in_progress' | 'completed' | 'failed';

      /**
       * The `Tool` object represents a tool that can be used by agents.
       */
      tool: ToolsAPI.ToolDef;

      type: 'tool_call';

      /**
       * The output of the tool call.
       */
      output?: string;
    }
  }
}

export interface ConverseParams {
  /**
   * A text prompt to send to the agent.
   */
  prompt: string | Array<ConverseParams.InputItemList>;

  /**
   * The ID of the agent that should be used for the converse.
   */
  agent_id?: string | null;

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  config?: ConverseParams.Config | null;

  /**
   * The ID of the present conversation to use. If it's not provided - a new
   * conversation will be created.
   */
  conversation_id?: string | null;

  /**
   * Determines whether the response should include citations. When enabled, the
   * agent will generate citations for factual statements.
   */
  generate_citations?: boolean | null;

  /**
   * Array of secret ID's to be included in the context. The secret value will be
   * appended to the prompt but not stored in conversation history.
   */
  secret_ids?: Array<string> | null;

  /**
   * Determines the response type of the converse. Response is the Server-Sent Events
   * if stream is set to true.
   */
  stream?: boolean | null;

  /**
   * Contains the format property used to specify the structured output schema.
   * Structured output is not supported only supported by the default agent model,
   * magpie-1.1 and magpie-2.0.
   */
  text?: ConverseParams.Text | null;
}

export namespace ConverseParams {
  /**
   * A message input to the model with a role indicating instruction following
   * `agent` role are presumed to have been generated by the model in previous
   * interactions.
   */
  export interface InputItemList {
    /**
     * Text, file or secret input to the agent.
     */
    content: string | Array<InputItemList.InputText | InputItemList.InputFile | InputItemList.InputSecret>;

    /**
     * The role of the message input. Always `user`.
     */
    role: 'user';

    /**
     * The type of the message input. Always `message`.
     */
    type?: 'message';
  }

  export namespace InputItemList {
    /**
     * A text input to the model.
     */
    export interface InputText {
      /**
       * The text input to the model.
       */
      text: string;

      /**
       * The type of the input item. Always `input_text`.
       */
      type: 'input_text';
    }

    /**
     * A file input to the model.
     */
    export interface InputFile {
      /**
       * The ID of the file to be sent to the model.
       */
      file_id: string;

      /**
       * The type of the input item. Always `input_file`.
       */
      type: 'input_file';
    }

    /**
     * A secret input to the model.
     */
    export interface InputSecret {
      /**
       * The ID of the secret to be sent to the model.
       */
      secret_id: string;

      /**
       * The type of the input item. Always `input_secret`.
       */
      type: 'input_secret';
    }
  }

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  export interface Config {
    /**
     * The version of Datagrid's agent brain.
     *
     * - magpie-1.1 is the default and most powerful model.
     * - magpie-1.1-flash is a faster model useful for RAG usecases, it currently only
     *   supports semantic_search tool. Structured outputs are not supported with this
     *   model.
     * - Can also accept any custom string value for future model versions.
     * - Magpie-2.0 our latest agentic model with more proactive planning and reasoning
     *   capabilities.
     */
    agent_model?: 'magpie-1.1' | 'magpie-1.1-flash' | 'magpie-1' | 'magpie-2.0' | (string & {}) | null;

    /**
     * @deprecated Deprecated, use tools instead
     */
    agent_tools?: Array<
      | 'data_analysis'
      | 'semantic_search'
      | 'agent_memory'
      | 'schema_info'
      | 'table_info'
      | 'create_dataset'
      | 'find_files'
      | 'read_file_contents'
      | 'file_analysis'
      | 'calendar'
      | 'email'
      | 'schedule_recurring_message_tool'
      | 'procore'
      | 'egnyte'
      | 'notion'
      | 'slack'
      | 'microsoft_teams'
      | 'sharepoint'
      | 'drive'
      | 'fieldwire'
      | 'planner'
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
      | 'trimble'
      | 'linkedin'
      | 'google_docs'
      | 'google_slides'
      | 'google_sheets'
      | 'avoma'
      | 'content_writer'
      | 'code_tool'
      | 'data_classification'
      | 'data_extraction'
      | 'image_detection'
      | 'attachment_extraction'
      | 'pdf_extraction'
      | 'pdf_page_info'
      | 'youtube_video_analysis'
      | 'calculate'
      | 'pdf_form_filling'
      | 'image_generator'
      | 'video_generator'
      | 'connect_data'
      | 'download_data'
      | 'web_search'
      | 'fetch_url'
      | 'company_prospect_researcher'
      | 'people_prospect_researcher'
      | string
      | ToolsAPI.Tool
    > | null;

    /**
     * Use custom prompt to instruct the style and formatting of the agent's response
     */
    custom_prompt?: string | null;

    /**
     * @deprecated Deprecated, use disabled_tools instead. If not provided - no tools
     * are disabled.
     */
    disabled_agent_tools?: Array<
      | 'data_analysis'
      | 'semantic_search'
      | 'agent_memory'
      | 'schema_info'
      | 'table_info'
      | 'create_dataset'
      | 'find_files'
      | 'read_file_contents'
      | 'file_analysis'
      | 'calendar'
      | 'email'
      | 'schedule_recurring_message_tool'
      | 'procore'
      | 'egnyte'
      | 'notion'
      | 'slack'
      | 'microsoft_teams'
      | 'sharepoint'
      | 'drive'
      | 'fieldwire'
      | 'planner'
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
      | 'trimble'
      | 'linkedin'
      | 'google_docs'
      | 'google_slides'
      | 'google_sheets'
      | 'avoma'
      | 'content_writer'
      | 'code_tool'
      | 'data_classification'
      | 'data_extraction'
      | 'image_detection'
      | 'attachment_extraction'
      | 'pdf_extraction'
      | 'pdf_page_info'
      | 'youtube_video_analysis'
      | 'calculate'
      | 'pdf_form_filling'
      | 'image_generator'
      | 'video_generator'
      | 'connect_data'
      | 'download_data'
      | 'web_search'
      | 'fetch_url'
      | 'company_prospect_researcher'
      | 'people_prospect_researcher'
      | string
      | ToolsAPI.Tool
    > | null;

    /**
     * Array of the agent tools to disable. Disabling is performed after the
     * 'agent_tools' rules are applied. For example, agent_tools: null and
     * disabled_tools: [data_analysis] will enable everything but the data_analysis
     * tool. If nothing or [] is provided, nothing is disabled and therefore only the
     * agent_tools setting is relevant.
     */
    disabled_tools?: Array<
      | 'data_analysis'
      | 'semantic_search'
      | 'agent_memory'
      | 'schema_info'
      | 'table_info'
      | 'create_dataset'
      | 'find_files'
      | 'read_file_contents'
      | 'file_analysis'
      | 'calendar'
      | 'email'
      | 'schedule_recurring_message_tool'
      | 'procore'
      | 'egnyte'
      | 'notion'
      | 'slack'
      | 'microsoft_teams'
      | 'sharepoint'
      | 'drive'
      | 'fieldwire'
      | 'planner'
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
      | 'trimble'
      | 'linkedin'
      | 'google_docs'
      | 'google_slides'
      | 'google_sheets'
      | 'avoma'
      | 'content_writer'
      | 'code_tool'
      | 'data_classification'
      | 'data_extraction'
      | 'image_detection'
      | 'attachment_extraction'
      | 'pdf_extraction'
      | 'pdf_page_info'
      | 'youtube_video_analysis'
      | 'calculate'
      | 'pdf_form_filling'
      | 'image_generator'
      | 'video_generator'
      | 'connect_data'
      | 'download_data'
      | 'web_search'
      | 'fetch_url'
      | 'company_prospect_researcher'
      | 'people_prospect_researcher'
      | string
      | ToolsAPI.Tool
    > | null;

    /**
     * Array of Knowledge IDs the agent should use during the converse. When ommited,
     * all knowledge is used.
     */
    knowledge_ids?: Array<string> | null;

    /**
     * The LLM used to generate responses.
     */
    llm_model?:
      | 'gemini-3-pro-preview'
      | 'gemini-2.5-pro'
      | 'gemini-2.5-pro-preview-05-06'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-preview-04-17'
      | 'gemini-2.5-flash-lite'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'gemini-2.0-flash-001'
      | 'gemini-2.0-flash'
      | 'gemini-1.5-pro-001'
      | 'gemini-1.5-pro-002'
      | 'gemini-1.5-flash-002'
      | 'gemini-1.5-flash-001'
      | 'chatgpt-4o-latest'
      | 'gpt-4o'
      | 'gpt-4'
      | 'gpt-4-turbo'
      | 'gpt-4o-mini'
      | (string & {})
      | null;

    /**
     * Define the planning strategy your AI Agent should use when breaking down tasks
     * and solving problems
     */
    planning_prompt?: string | null;

    /**
     * Directs your AI Agent's operational behavior.
     */
    system_prompt?: string | null;

    /**
     * Array of the agent tools to enable. If not provided - default tools of the agent
     * are used. If empty list provided - none of the tools are used. If null
     * provided - all tools are used. When connection_id is set for a tool, it will use
     * that specific connection instead of the default one.
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
    tools?: Array<
      | 'data_analysis'
      | 'semantic_search'
      | 'agent_memory'
      | 'schema_info'
      | 'table_info'
      | 'create_dataset'
      | 'find_files'
      | 'read_file_contents'
      | 'file_analysis'
      | 'calendar'
      | 'email'
      | 'schedule_recurring_message_tool'
      | 'procore'
      | 'egnyte'
      | 'notion'
      | 'slack'
      | 'microsoft_teams'
      | 'sharepoint'
      | 'drive'
      | 'fieldwire'
      | 'planner'
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
      | 'trimble'
      | 'linkedin'
      | 'google_docs'
      | 'google_slides'
      | 'google_sheets'
      | 'avoma'
      | 'content_writer'
      | 'code_tool'
      | 'data_classification'
      | 'data_extraction'
      | 'image_detection'
      | 'attachment_extraction'
      | 'pdf_extraction'
      | 'pdf_page_info'
      | 'youtube_video_analysis'
      | 'calculate'
      | 'pdf_form_filling'
      | 'image_generator'
      | 'video_generator'
      | 'connect_data'
      | 'download_data'
      | 'web_search'
      | 'fetch_url'
      | 'company_prospect_researcher'
      | 'people_prospect_researcher'
      | string
      | ToolsAPI.Tool
      | ToolsAPI.Tool
    > | null;
  }

  /**
   * Contains the format property used to specify the structured output schema.
   * Structured output is not supported only supported by the default agent model,
   * magpie-1.1 and magpie-2.0.
   */
  export interface Text {
    /**
     * The converse response will be a JSON string object, that adheres to the provided
     * JSON schema.
     *
     * ```javascript
     * const exampleJsonSchema = {
     *   $id: "movie_info",
     *   title: "movie_info",
     *   type: "object",
     *   properties: {
     *     name: {
     *       type: "string",
     *       description: "The name of the movie",
     *     },
     *     director: {
     *       type: "string",
     *       description: "The director of the movie",
     *     },
     *     release_year: {
     *       type: "number",
     *       description: "The year the movie was released",
     *     },
     *   },
     *   required: ["name", "director", "release_year"],
     *   additionalProperties: false,
     * };
     *
     * const response = await datagrid.converse({
     *   prompt: "What movie won best picture at the 2001 oscars?",
     *   text: { format: exampleJsonSchema },
     * });
     *
     * // Example response: "{ "name": "Gladiator", "director": "Ridley Scott", "release_year": 2000 }"
     * const parsedResponse = JSON.parse(response.content[0].text);
     * ```
     */
    format?: unknown;
  }
}

export declare namespace TopLevel {
  export {
    type ConverseResponse as ConverseResponse,
    type Properties as Properties,
    type ConverseParams as ConverseParams,
  };
}
