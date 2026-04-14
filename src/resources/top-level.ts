// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ToolsAPI from './tools';
import * as MessagesAPI from './conversations/messages';

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export interface ConverseResponse extends MessagesAPI.Message {
  /**
   * The chat mode used for this response. For Auto mode conversations, this is the
   * mode selected by the router for this turn.
   */
  chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;

  /**
   * Array of reasoning steps that occurred during this response. Only includes steps
   * with status completed or failed.
   */
  reasoning?: Array<ConverseResponse.Reasoning> | null;

  /**
   * Array of tool calls that were executed during this response.
   */
  tool_calls?: Array<ConverseResponse.ToolCall> | null;
}

export namespace ConverseResponse {
  export interface Reasoning {
    /**
     * The ID of the reasoning step.
     */
    id: string;

    /**
     * The current status of the reasoning step.
     */
    status: 'in_progress' | 'completed' | 'failed';

    /**
     * The type of the delta, which is always reasoning.
     */
    type: 'reasoning';

    /**
     * Whether this reasoning step was executed in parallel with other steps.
     */
    executed_in_parallel?: boolean | null;

    /**
     * The execution time of the reasoning step in milliseconds.
     */
    execution_time_ms?: number | null;

    /**
     * The output of the reasoning step. Only present when status is completed or
     * failed.
     */
    output?: string | null;

    /**
     * The task description for this reasoning step.
     */
    task?: string | null;
  }

  export interface ToolCall {
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
     * Whether this tool call was executed in parallel with other tool calls.
     */
    executed_in_parallel?: boolean;

    /**
     * The output of the tool call.
     */
    output?: string;
  }
}

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export type Properties =
  | MessagesAPI.Message
  | Properties.ConverseStatusEvent
  | Properties.ConverseContentMessageDeltaEvent
  | Properties.ConverseToolCallDeltaEvent
  | Properties.ConverseReasoningDeltaEvent;

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
       * The chat mode used for this response. Present on `end` events. For Auto mode
       * conversations, this is the mode selected by the router for this turn.
       */
      chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;

      /**
       * Array of citations that provide sources for factual statements in the response.
       * Each citation includes the referenced text and its sources.
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
         * Array of sources that support this citation.
         */
        sources: Array<Citation.Source>;
      }

      export namespace Citation {
        export interface Source {
          /**
           * An array of text snippets from the source that confirm the citation.
           */
          confirmations: Array<string>;

          /**
           * Name of the source.
           */
          source_name: string;

          type: 'image' | 'pdf_page' | 'record' | 'web_search' | 'sql_query_result' | 'action';

          /**
           * Id of the source.
           */
          source_id?: string;

          /**
           * URI of the source.
           */
          source_uri?: string;
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
    /**
     * Event emitted when tools are called during the agent's reasoning process.
     */
    data: ConverseToolCallDeltaEvent.Data;

    /**
     * Type of the event which is always tool_call
     */
    event: 'tool_call';
  }

  export namespace ConverseToolCallDeltaEvent {
    /**
     * Event emitted when tools are called during the agent's reasoning process.
     */
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

  /**
   * Event emitted for each reasoning steps are executed during the agent's reasoning
   * process. Two emission rules apply:
   *
   * - **Deduplication:** a new event is emitted for a given `id` only when `status`
   *   or the resolved tool changes.
   * - **Tool resolution:** a `reasoning` event is always emitted; the corresponding
   *   `tool_call` event is omitted when the tool cannot be resolved.
   */
  export interface ConverseReasoningDeltaEvent {
    data: ConverseReasoningDeltaEvent.Data;

    /**
     * Type of the event which is always reasoning
     */
    event: 'reasoning';
  }

  export namespace ConverseReasoningDeltaEvent {
    export interface Data {
      /**
       * The ID of the reasoning step.
       */
      id: string;

      /**
       * The current status of the reasoning step.
       */
      status: 'in_progress' | 'completed' | 'failed';

      /**
       * The type of the delta, which is always reasoning.
       */
      type: 'reasoning';

      /**
       * Whether this reasoning step was executed in parallel with other steps.
       */
      executed_in_parallel?: boolean | null;

      /**
       * The execution time of the reasoning step in milliseconds.
       */
      execution_time_ms?: number | null;

      /**
       * The output of the reasoning step. Only present when status is completed or
       * failed.
       */
      output?: string | null;

      /**
       * The task description for this reasoning step.
       */
      task?: string | null;
    }
  }
}

export interface ConverseParams {
  /**
   * A text prompt to send to the agent.
   */
  prompt: string | Array<ConverseParams.InputItemList>;

  /**
   * The ID of the agent that should be used for the converse. When omitted and a
   * `conversation_id` is provided, the conversation's existing agent assignments are
   * preserved. When omitted without a `conversation_id`, a new conversation is
   * created with the default agent.
   */
  agent_id?: string | null;

  /**
   * Determines how the API routes the converse request to an agent.
   */
  agent_routing?: ConverseParams.Auto | ConverseParams.Manual | null;

  /**
   * Controls how the agent processes the request for this turn. When set to `auto`,
   * the router jointly predicts the best agent and concrete mode (full_agent /
   * light_agent / llm_router) per message. When set to a concrete mode, that mode is
   * used directly. When omitted, the mode is determined by the agent_model in
   * config.
   */
  chat_mode?: 'auto' | 'full_agent' | 'light_agent' | 'llm_router' | null;

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
   * A datagrid file URI pointing to content the user is currently viewing on screen
   * (e.g., a web page, document, or dashboard rendered as markdown). The agent uses
   * this context to resolve ambiguous queries like 'what is this about?' or 'review
   * this'. The content is automatically summarized and made available to the agent.
   */
  current_view_content?: string | null;

  /**
   * Determines whether the response should include citations. When enabled, the
   * agent will generate citations for factual statements.
   */
  generate_citations?: boolean | null;

  /**
   * When set to false, tool call and reasoning step events are omitted from SSE
   * streams. Non-streaming responses always include the tool_calls and reasoning
   * fields (as null when empty).
   */
  include_steps?: boolean | null;

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
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for `magpie-2.0` (default),
   * `magpie-2.5`, `magpie-1.1`, and `llm-only` (Fastest mode)—the same JSON Schema
   * mechanism applies; `llm-only` uses the direct LLM path without tools, with
   * structured output behavior comparable to agentic models. It is not supported for
   * `magpie-1.1-flash` (Ask mode) or legacy `magpie-1`.
   */
  text?: ConverseParams.Text | null;

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  user?: ConverseParams.User | null;
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
    content:
      | string
      | Array<
          | InputItemList.InputText
          | InputItemList.InputFile
          | InputItemList.InputSecret
          | InputItemList.InputKnowledge
          | InputItemList.InputPage
        >;

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

    /**
     * A knowledge reference input to the model. This references knowledge by ID. The
     * knowledge will be made accessible to the agent, and will be included in the
     * prompt provided to the agent. The position of this reference relative to other
     * text of the input impact the agent's interpretation.
     */
    export interface InputKnowledge {
      /**
       * The ID of the knowledge to be referenced.
       */
      knowledge_id: string;

      /**
       * The type of the input item. Always `input_knowledge`.
       */
      type: 'input_knowledge';
    }

    /**
     * A page reference input to the model. This references a page by ID. The page, and
     * all knowledge under it, will be made accessible to the agent, and a reference to
     * the page will be included in the prompt provided to the agent. The position of
     * this reference relative to other text of the input will impact the agent's
     * interpretation.
     */
    export interface InputPage {
      /**
       * The ID of the page to be referenced.
       */
      page_id: string;

      /**
       * The type of the input item. Always `input_page`.
       */
      type: 'input_page';
    }
  }

  /**
   * The API automatically selects the best agent from the entire Teamspace.
   */
  export interface Auto {
    /**
     * The API selects the best agent from the entire Teamspace.
     */
    mode: 'auto';
  }

  /**
   * The API selects the best agent from the specific list you provide.
   */
  export interface Manual {
    /**
     * The API selects the best agent from the specific list you provide.
     */
    mode: 'manual';

    /**
     * Limit the selection pool to these specific agents. Each item may be an agent ID
     * string or an inline agent config object.
     */
    targets: Array<string | Manual.AgentConfigWithID>;
  }

  export namespace Manual {
    export interface AgentConfigWithID {
      /**
       * The ID of the agent to use for routing.
       */
      agent_id?: string;

      /**
       * The agent model determines the processing mode for Converse requests. Each model
       * maps to one of three modes available in the Datagrid UI:
       *
       * **Agentic mode** (full tool use, planning, and multi-step reasoning):
       *
       * - `magpie-2.0` — Default. Agentic model with proactive planning and reasoning.
       * - `magpie-2.5` — Beta. Our latest agentic model — faster, more adaptable, and
       *   built to handle a broader range of real-world tasks.
       * - `magpie-1.1` — Previous-generation agentic model.
       *
       * **Ask mode** (lightweight, single-turn Q&A):
       *
       * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
       *   `semantic_search` tool. A 400 error will be returned if other tools are
       *   specified. Structured outputs are not supported.
       *
       * **Fastest mode** (direct LLM response, no tool execution):
       *
       * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
       *   400 error will be returned if tools are specified. On **Converse**, structured
       *   JSON output via **`text.format`** (JSON Schema) is supported, using the same
       *   mechanism as agentic models.
       *
       * Can also accept any custom string value for future model versions.
       */
      agent_model?:
        | 'magpie-1.1'
        | 'magpie-1.1-flash'
        | 'magpie-2.0'
        | 'magpie-2.5'
        | 'llm-only'
        | (string & {})
        | null;

      /**
       * Array of corpus items the agent should use during the converse. When omitted,
       * all knowledge is used.
       */
      corpus?: Array<AgentConfigWithID.CorpusKnowledgeItem | AgentConfigWithID.CorpusPageItem> | null;

      /**
       * Use custom prompt to instruct the style and formatting of the agent's response
       */
      custom_prompt?: string | null;

      /**
       * Array of the agent tools to disable. Disabling is performed after the
       * 'agent_tools' rules are applied. For example, agent_tools: null and
       * disabled_tools: [data_analysis] will enable everything but the data_analysis
       * tool. If nothing or [] is provided, nothing is disabled and therefore only the
       * agent_tools setting is relevant.
       */
      disabled_tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;

      /**
       * @deprecated Deprecated, use corpus instead. Array of Knowledge IDs the agent
       * should use during the converse. When omitted, all knowledge is used.
       */
      knowledge_ids?: Array<string> | null;

      /**
       * The LLM used to generate responses.
       */
      llm_model?:
        | 'gemini-3-pro-preview'
        | 'gemini-3.1-pro-preview'
        | 'gemini-3-flash-preview'
        | 'gemini-2.5-pro'
        | 'gemini-2.5-pro-preview-05-06'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-preview-04-17'
        | 'gemini-2.5-flash-native-audio-preview-12-2025'
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
       * Registered MCP servers to enable for this agent.
       */
      mcp_servers?: Array<AgentConfigWithID.McpServer> | null;

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
       * Array of the agent tools to enable. If not provided, or null is provided -
       * default tools of the agent are used. If empty list provided - none of the tools
       * are used. When connection_id is set for a tool, it will use that specific
       * connection instead of the default one.
       *
       * **Tool availability by agent model:**
       *
       * - **Agentic** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
       *   available.
       * - **Ask** (`magpie-1.1-flash`): Only `semantic_search` is supported. Requests
       *   specifying other tools will be rejected with a 400 error.
       * - **Fastest** (`llm-only`): No tools are executed. Requests specifying tools
       *   will be rejected with a 400 error. On **Converse**, structured output via
       *   **`text.format`** is still supported (same JSON Schema mechanism as agentic
       *   models).
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
      tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;
    }

    export namespace AgentConfigWithID {
      export interface CorpusKnowledgeItem {
        /**
         * The ID of the knowledge to include in the corpus.
         */
        knowledge_id: string;

        /**
         * The type of the corpus item. Always 'knowledge' for knowledge items.
         */
        type: 'knowledge';
      }

      export interface CorpusPageItem {
        /**
         * The ID of the page to include in the corpus.
         */
        page_id: string;

        /**
         * The type of the corpus item. Always 'page' for page items.
         */
        type: 'page';
      }

      export interface McpServer {
        server_id: string;

        credential_id?: string | null;
      }
    }
  }

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  export interface Config {
    /**
     * The agent model determines the processing mode for Converse requests. Each model
     * maps to one of three modes available in the Datagrid UI:
     *
     * **Agentic mode** (full tool use, planning, and multi-step reasoning):
     *
     * - `magpie-2.0` — Default. Agentic model with proactive planning and reasoning.
     * - `magpie-2.5` — Beta. Our latest agentic model — faster, more adaptable, and
     *   built to handle a broader range of real-world tasks.
     * - `magpie-1.1` — Previous-generation agentic model.
     *
     * **Ask mode** (lightweight, single-turn Q&A):
     *
     * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
     *   `semantic_search` tool. A 400 error will be returned if other tools are
     *   specified. Structured outputs are not supported.
     *
     * **Fastest mode** (direct LLM response, no tool execution):
     *
     * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
     *   400 error will be returned if tools are specified. On **Converse**, structured
     *   JSON output via **`text.format`** (JSON Schema) is supported, using the same
     *   mechanism as agentic models.
     *
     * Can also accept any custom string value for future model versions.
     */
    agent_model?:
      | 'magpie-1.1'
      | 'magpie-1.1-flash'
      | 'magpie-2.0'
      | 'magpie-2.5'
      | 'llm-only'
      | (string & {})
      | null;

    /**
     * @deprecated Deprecated, use tools instead
     */
    agent_tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;

    /**
     * Array of corpus items the agent should use during the converse. When omitted,
     * all knowledge is used.
     */
    corpus?: Array<Config.CorpusKnowledgeItem | Config.CorpusPageItem> | null;

    /**
     * Use custom prompt to instruct the style and formatting of the agent's response
     */
    custom_prompt?: string | null;

    /**
     * @deprecated Deprecated, use disabled_tools instead. If not provided - no tools
     * are disabled.
     */
    disabled_agent_tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;

    /**
     * Array of the agent tools to disable. Disabling is performed after the
     * 'agent_tools' rules are applied. For example, agent_tools: null and
     * disabled_tools: [data_analysis] will enable everything but the data_analysis
     * tool. If nothing or [] is provided, nothing is disabled and therefore only the
     * agent_tools setting is relevant.
     */
    disabled_tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;

    /**
     * @deprecated Deprecated, use corpus instead. Array of Knowledge IDs the agent
     * should use during the converse. When omitted, all knowledge is used.
     */
    knowledge_ids?: Array<string> | null;

    /**
     * The LLM used to generate responses.
     */
    llm_model?:
      | 'gemini-3-pro-preview'
      | 'gemini-3.1-pro-preview'
      | 'gemini-3-flash-preview'
      | 'gemini-2.5-pro'
      | 'gemini-2.5-pro-preview-05-06'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-preview-04-17'
      | 'gemini-2.5-flash-native-audio-preview-12-2025'
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
     * **BETA**: This feature is in beta and the schema may change.
     *
     * Array of MCP (Model Context Protocol) server configurations to enable for this
     * converse call. Each MCP server provides additional tools that the agent can use
     * during the conversation.
     *
     * Datagrid handles the full MCP lifecycle automatically: `initialize`,
     * `notifications/initialized`, then `tools/list` / `tools/call` with
     * `MCP-Session-Id` and `MCP-Protocol-Version` headers.
     */
    mcp_servers?: Array<Config.McpServer> | null;

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
     * Array of the agent tools to enable. If not provided, or null is provided -
     * default tools of the agent are used. If empty list provided - none of the tools
     * are used. When connection_id is set for a tool, it will use that specific
     * connection instead of the default one.
     *
     * **Tool availability by agent model:**
     *
     * - **Agentic** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
     *   available.
     * - **Ask** (`magpie-1.1-flash`): Only `semantic_search` is supported. Requests
     *   specifying other tools will be rejected with a 400 error.
     * - **Fastest** (`llm-only`): No tools are executed. Requests specifying tools
     *   will be rejected with a 400 error. On **Converse**, structured output via
     *   **`text.format`** is still supported (same JSON Schema mechanism as agentic
     *   models).
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
    tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;
  }

  export namespace Config {
    export interface CorpusKnowledgeItem {
      /**
       * The ID of the knowledge to include in the corpus.
       */
      knowledge_id: string;

      /**
       * The type of the corpus item. Always 'knowledge' for knowledge items.
       */
      type: 'knowledge';
    }

    export interface CorpusPageItem {
      /**
       * The ID of the page to include in the corpus.
       */
      page_id: string;

      /**
       * The type of the corpus item. Always 'page' for page items.
       */
      type: 'page';
    }

    export interface McpServer {
      server_id: string;

      /**
       * A unique label to identify this MCP server. Used for tool namespacing.
       */
      server_label: string;

      /**
       * The HTTPS URL of the MCP streamable HTTP endpoint.
       */
      server_url: string;

      /**
       * The type of MCP server configuration. Use 'inline_mcp' for server configs passed
       * directly in the request.
       */
      type: 'inline_mcp';

      /**
       * Value sent in the `Authorization` header when calling the MCP server (e.g.,
       * 'Bearer <token>').
       */
      authorization?: string | null;

      credential_id?: string | null;

      /**
       * Optional description of what this MCP server provides.
       */
      server_description?: string | null;
    }
  }

  /**
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for `magpie-2.0` (default),
   * `magpie-2.5`, `magpie-1.1`, and `llm-only` (Fastest mode)—the same JSON Schema
   * mechanism applies; `llm-only` uses the direct LLM path without tools, with
   * structured output behavior comparable to agentic models. It is not supported for
   * `magpie-1.1-flash` (Ask mode) or legacy `magpie-1`.
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

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  export interface User {
    /**
     * Override the user's email for this converse call.
     */
    email?: string | null;

    /**
     * Override the user's first name for this converse call.
     */
    first_name?: string | null;

    /**
     * Override the user's last name for this converse call.
     */
    last_name?: string | null;
  }
}

export declare namespace TopLevel {
  export {
    type ConverseResponse as ConverseResponse,
    type Properties as Properties,
    type ConverseParams as ConverseParams,
  };
}
