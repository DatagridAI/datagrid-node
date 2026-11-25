// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ToolsAPI from '../tools';
import * as TopLevelAPI from '../top-level';

export class Converse extends APIResource {
  /**
   * **BETA**: This endpoint is in beta and the schema may change.
   *
   * Converse with an AI Agent, optionally supplying request-scoped **inline skills**
   * that apply to this turn only. Inline skills are parsed server-side and become
   * the turn's skill catalogue; they are never persisted and never affect stored
   * agent skills.
   *
   * Inline skills are made **available** to the agent, not force-applied. Supplying
   * a skill does not guarantee the agent follows its procedure. Request-scoped
   * skills require a skills-capable agent model set via `config.agent_model`: Magpie
   * 2.5, Magpie 2.5 Reporting, or Magpie 3.0. Any other model (including Magpie 2.5
   * Flash) returns a `400`.
   *
   * The request body is the stable Converse body plus the optional top-level
   * `skills` array; all other behavior matches `POST /converse`.
   *
   * Because inline `skills` replace the stored catalogue for the turn, they cannot
   * be combined with `skill_ids` or `slash_keys`, which name stored skills.
   * Supplying both returns a `400`.
   */
  converse(
    body: ConverseConverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ConverseResponse> {
    return this._client.post('/beta/converse', { body, ...options });
  }
}

/**
 * Stable Converse request body plus optional request-scoped inline skills.
 */
export interface BetaConverseRequest {
  /**
   * A text prompt to send to the agent.
   */
  prompt: string | Array<BetaConverseRequest.InputItemList>;

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
  agent_routing?:
    | BetaConverseRequest.Auto
    | BetaConverseRequest.Manual
    | BetaConverseRequest.Orchestrator
    | null;

  /**
   * Controls how the agent processes the request for this turn. Matches the chat
   * mode selector in the Datagrid web app: **Execute** (`full_agent`), **Extended**
   * (`light_agent`), **Ask** (`llm_router`). Ask uses the agent path with Magpie 2.5
   * and Ask-specific prompt guidance. When omitted, the request inherits the
   * conversation's persisted `chat_mode`; new conversations default to **Execute**
   * (`full_agent`). When set to `auto`, the request also runs as **Execute**
   * (`full_agent`); Auto is currently accepted for compatibility but does not
   * predict Ask, Extended, or Execute per message. When set to a concrete mode, that
   * concrete mode is used directly. The default `agent_model` for Execute is
   * `magpie-2.5` unless `config.agent_model` explicitly sets another supported
   * model.
   */
  chat_mode?: 'auto' | 'full_agent' | 'light_agent' | 'llm_router' | null;

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  config?: BetaConverseRequest.Config | null;

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
   * Determines whether generated_title metadata should be included. Defaults to
   * false. generated_title is emitted only when this flag is explicitly true.
   */
  generate_title?: boolean | null;

  /**
   * When set to false, tool call, reasoning step and delegation events are omitted
   * from SSE streams. Non-streaming responses always include the tool_calls and
   * reasoning fields (as null when empty).
   */
  include_steps?: boolean | null;

  /**
   * Optional deterministic reference date override in YYYY-MM-DD format. Must be a
   * real calendar date (for example, rejects impossible dates like 2026-02-31). When
   * set, the agent treats this date as today for relative date resolution and date
   * context rendering.
   */
  reference_date?: string | null;

  /**
   * Array of secret ID's to be included in the context. The secret value will be
   * appended to the prompt but not stored in conversation history.
   */
  secret_ids?: Array<string> | null;

  /**
   * Array of skill IDs to force-activate for this turn. Each ID must refer to an
   * account-shared or builtin skill reachable by the API key's teamspace.
   * User-scoped (private) skills are not accessible from API keys. Deduped and
   * merged with `slash_keys` before the turn begins. Maximum 32 entries. Returns 400
   * if any ID is unresolved, disabled, or out of scope.
   */
  skill_ids?: Array<string> | null;

  /**
   * Request-scoped skills made available to the agent for this turn only. They form
   * the turn's skill catalogue and are selected by the agent (Magpie 2.5 planner) or
   * read from its workspace (Magpie 3.0) — they are not force-applied, so supplying
   * a skill does not guarantee the agent follows its procedure. Each entry is a
   * discriminated union on `type`. Only `inline` is supported today;
   * `skill_reference` is reserved for a future release. Inline skills are never
   * persisted.
   *
   * Omitting `skills` keeps the agent's account-scoped skill catalogue. An empty
   * array (`[]`) isolates the turn — no skills. A non-empty array uses only the
   * supplied inline skills.
   */
  skills?: Array<BetaConverseRequest.Skill>;

  /**
   * Array of slash-key tokens (e.g. `"budget-check"` or `"/rfi-triage"`) to
   * force-activate for this turn. Leading slashes are stripped. Resolved
   * account-shared → builtin in precedence order. Deduped and merged with
   * `skill_ids` before the turn begins. Maximum 32 entries. Returns 400 if any token
   * cannot be resolved to an enabled, reachable skill.
   */
  slash_keys?: Array<string> | null;

  /**
   * Determines the response type of the converse. Response is the Server-Sent Events
   * if stream is set to true.
   */
  stream?: boolean | null;

  /**
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for all `agent_model` values and
   * `chat_mode` settings when `text.format` is provided (same JSON Schema mechanism
   * everywhere). **Ask** in the web app maps to `chat_mode: llm_router`; `auto`
   * currently maps to **Execute** (`full_agent`).
   */
  text?: BetaConverseRequest.Text | null;

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  user?: BetaConverseRequest.User | null;
}

export namespace BetaConverseRequest {
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
       * The agent model determines the processing mode for Converse requests. The
       * Datagrid web app exposes **Ask**, **Extended**, and **Execute** as Converse
       * **`chat_mode`** (`llm_router`, `light_agent`, `full_agent`). The values below
       * set **`config.agent_model`** (model tier and tool limits)—use both fields when
       * mirroring in-app behavior.
       *
       * **Execute** (full tool use, planning, and multi-step reasoning; aligns with
       * **Execute** in the web app / `full_agent`):
       *
       * - `magpie-2.0` — Legacy full-agent model with proactive planning and reasoning.
       * - `magpie-2.5` — Default. Latest full-agent model — faster, more adaptable, and
       *   built to handle a broader range of real-world tasks.
       * - `magpie-1.1` — Previous-generation full agent model.
       *
       * **Extended** (search-focused; aligns with **Extended** in the web app /
       * `light_agent`; not **Ask**):
       *
       * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
       *   `semantic_search` tool. A 400 error will be returned if other tools are
       *   specified.
       *
       * **Direct LLM** (no tool execution; **`agent_model` only**—**Ask** in the web app
       * is `chat_mode: llm_router`, not `magpie-1.1-flash`):
       *
       * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
       *   400 error will be returned if tools are specified.
       *
       * **BETA**: Magpie 3.0. Behavior and schema may change.
       *
       * - `magpie-3.0` — **BETA**. Available on the public Converse API. In-app rollout
       *   flags do not apply to this request.
       *
       * Can also accept any custom string value for future model versions.
       */
      agent_model?:
        | 'magpie-1.1'
        | 'magpie-1.1-flash'
        | 'magpie-2.0'
        | 'magpie-2.5'
        | 'magpie-2.5-flash'
        | 'magpie-3.0'
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
       * The LLM used to generate responses. Any id returned by `GET /v1/models` with
       * `type: llm` is accepted; the enum lists the ids known when this spec was
       * generated. Deprecated Gemini 2.x Flash ids are accepted for backward
       * compatibility and automatically run as gemini-3.1-flash-lite.
       */
      llm_model?:
        | 'gemini-2.0-flash'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-2.5-pro'
        | 'gemini-3-flash-preview'
        | 'gemini-3-pro-preview'
        | 'gemini-3.1-flash-lite'
        | 'gemini-3.1-pro-preview'
        | 'gemini-3.5-flash'
        | 'gemini-3.5-flash-lite'
        | 'gemini-3.6-flash'
        | 'gemini-3.8-flash'
        | 'gemini-live-2.5-flash-native-audio'
        | 'gemini-1.5-flash-001'
        | 'gemini-1.5-flash-002'
        | 'gemini-2.0-flash-001'
        | 'gemini-2.5-flash-preview-04-17'
        | 'gemini-1.5-pro-001'
        | 'gemini-1.5-pro-002'
        | 'gemini-2.5-pro-preview-05-06'
        | 'claude-haiku-4-5@20251001'
        | 'claude-sonnet-4-6@default'
        | 'claude-opus-4-6@default'
        | 'claude-opus-4-7'
        | 'claude-opus-4-8'
        | 'claude-sonnet-5'
        | 'claude-opus-5'
        | 'claude-opus-5-5'
        | 'anthropic.claude-haiku-4-5-20251001-v1:0'
        | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
        | 'anthropic.claude-sonnet-4-6'
        | 'anthropic.claude-opus-4-5-20251101-v1:0'
        | 'anthropic.claude-opus-4-6-v1'
        | 'anthropic.claude-opus-4-7'
        | 'anthropic.claude-opus-4-8'
        | 'anthropic.claude-sonnet-5'
        | 'anthropic.claude-opus-5'
        | 'anthropic.claude-opus-5-5'
        | 'gpt-4o-mini'
        | 'gpt-4o'
        | 'gpt-4.1-mini'
        | 'gpt-4.1'
        | 'gpt-5-mini'
        | 'gpt-5'
        | 'gpt-5.1'
        | 'chatgpt-4o-latest'
        | 'gpt-4-turbo'
        | 'gpt-4'
        | 'openai.gpt-5.5'
        | 'openai.gpt-5.6-luna'
        | 'openai.gpt-5.6-sol'
        | 'openai.gpt-5.6-terra'
        | 'amazon.nova-2-lite-v1:0'
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
       * Sampling temperature for model output. Lower values are more deterministic;
       * higher values are more diverse.
       */
      temperature?: number | null;

      /**
       * Array of the agent tools to enable. If not provided, or null is provided -
       * default tools of the agent are used. If empty list provided - none of the tools
       * are used. When connection_id is set for a tool, it will use that specific
       * connection instead of the default one.
       *
       * **Structured outputs (Converse):** All `agent_model` values support JSON Schema
       * constrained responses via **`text.format`** on the Converse request. Responses
       * are validated server-side against the schema and returned as a `json` content
       * item; output that cannot be made schema-valid is rejected with a deterministic
       * `structured_output_generation_failed` error instead of being returned as a
       * success.
       *
       * **Tool availability by agent model** (aligned with in-app **Execute** /
       * **Extended** / direct LLM; see Converse `chat_mode` for **Ask** vs
       * `agent_model`):
       *
       * - **Execute** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
       *   available.
       * - **Extended** (`magpie-1.1-flash`): Only `semantic_search` is supported.
       *   Requests specifying other tools will be rejected with a 400 error.
       * - **Direct LLM** (`llm-only`): No tools are executed. Requests specifying tools
       *   will be rejected with a 400 error.
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
       * - charts: Agents render charts inline in the conversation (bar, line, area,
       *   combo, pie, funnel, gauge, treemap, scorecard).
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
   * The Teamspace's orchestrator answers the turn and delegates parts of it to
   * specialist agents. The response reports the orchestrator as `agent_id`. A
   * conversation started in this mode stays with the orchestrator when a later turn
   * sends only `conversation_id`. Only a personal conversation can be continued in
   * this mode. The orchestrator cannot be named as `agent_id` or as a `manual`
   * target.
   */
  export interface Orchestrator {
    /**
     * The Teamspace's orchestrator answers and delegates to specialist agents.
     */
    mode: 'orchestrator';
  }

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  export interface Config {
    /**
     * The agent model determines the processing mode for Converse requests. The
     * Datagrid web app exposes **Ask**, **Extended**, and **Execute** as Converse
     * **`chat_mode`** (`llm_router`, `light_agent`, `full_agent`). The values below
     * set **`config.agent_model`** (model tier and tool limits)—use both fields when
     * mirroring in-app behavior.
     *
     * **Execute** (full tool use, planning, and multi-step reasoning; aligns with
     * **Execute** in the web app / `full_agent`):
     *
     * - `magpie-2.0` — Legacy full-agent model with proactive planning and reasoning.
     * - `magpie-2.5` — Default. Latest full-agent model — faster, more adaptable, and
     *   built to handle a broader range of real-world tasks.
     * - `magpie-1.1` — Previous-generation full agent model.
     *
     * **Extended** (search-focused; aligns with **Extended** in the web app /
     * `light_agent`; not **Ask**):
     *
     * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
     *   `semantic_search` tool. A 400 error will be returned if other tools are
     *   specified.
     *
     * **Direct LLM** (no tool execution; **`agent_model` only**—**Ask** in the web app
     * is `chat_mode: llm_router`, not `magpie-1.1-flash`):
     *
     * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
     *   400 error will be returned if tools are specified.
     *
     * **BETA**: Magpie 3.0. Behavior and schema may change.
     *
     * - `magpie-3.0` — **BETA**. Available on the public Converse API. In-app rollout
     *   flags do not apply to this request.
     *
     * Can also accept any custom string value for future model versions.
     */
    agent_model?:
      | 'magpie-1.1'
      | 'magpie-1.1-flash'
      | 'magpie-2.0'
      | 'magpie-2.5'
      | 'magpie-2.5-flash'
      | 'magpie-3.0'
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
     * The LLM used to generate responses. Any id returned by `GET /v1/models` with
     * `type: llm` is accepted; the enum lists the ids known when this spec was
     * generated. Deprecated Gemini 2.x Flash ids are accepted for backward
     * compatibility and automatically run as gemini-3.1-flash-lite.
     */
    llm_model?:
      | 'gemini-2.0-flash'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-2.5-pro'
      | 'gemini-3-flash-preview'
      | 'gemini-3-pro-preview'
      | 'gemini-3.1-flash-lite'
      | 'gemini-3.1-pro-preview'
      | 'gemini-3.5-flash'
      | 'gemini-3.5-flash-lite'
      | 'gemini-3.6-flash'
      | 'gemini-3.8-flash'
      | 'gemini-live-2.5-flash-native-audio'
      | 'gemini-1.5-flash-001'
      | 'gemini-1.5-flash-002'
      | 'gemini-2.0-flash-001'
      | 'gemini-2.5-flash-preview-04-17'
      | 'gemini-1.5-pro-001'
      | 'gemini-1.5-pro-002'
      | 'gemini-2.5-pro-preview-05-06'
      | 'claude-haiku-4-5@20251001'
      | 'claude-sonnet-4-6@default'
      | 'claude-opus-4-6@default'
      | 'claude-opus-4-7'
      | 'claude-opus-4-8'
      | 'claude-sonnet-5'
      | 'claude-opus-5'
      | 'claude-opus-5-5'
      | 'anthropic.claude-haiku-4-5-20251001-v1:0'
      | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
      | 'anthropic.claude-sonnet-4-6'
      | 'anthropic.claude-opus-4-5-20251101-v1:0'
      | 'anthropic.claude-opus-4-6-v1'
      | 'anthropic.claude-opus-4-7'
      | 'anthropic.claude-opus-4-8'
      | 'anthropic.claude-sonnet-5'
      | 'anthropic.claude-opus-5'
      | 'anthropic.claude-opus-5-5'
      | 'gpt-4o-mini'
      | 'gpt-4o'
      | 'gpt-4.1-mini'
      | 'gpt-4.1'
      | 'gpt-5-mini'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'chatgpt-4o-latest'
      | 'gpt-4-turbo'
      | 'gpt-4'
      | 'openai.gpt-5.5'
      | 'openai.gpt-5.6-luna'
      | 'openai.gpt-5.6-sol'
      | 'openai.gpt-5.6-terra'
      | 'amazon.nova-2-lite-v1:0'
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
     * Sampling temperature for model output. Lower values are more deterministic;
     * higher values are more diverse.
     */
    temperature?: number | null;

    /**
     * Array of the agent tools to enable. If not provided, or null is provided -
     * default tools of the agent are used. If empty list provided - none of the tools
     * are used. When connection_id is set for a tool, it will use that specific
     * connection instead of the default one.
     *
     * **Structured outputs (Converse):** All `agent_model` values support JSON Schema
     * constrained responses via **`text.format`** on the Converse request. Responses
     * are validated server-side against the schema and returned as a `json` content
     * item; output that cannot be made schema-valid is rejected with a deterministic
     * `structured_output_generation_failed` error instead of being returned as a
     * success.
     *
     * **Tool availability by agent model** (aligned with in-app **Execute** /
     * **Extended** / direct LLM; see Converse `chat_mode` for **Ask** vs
     * `agent_model`):
     *
     * - **Execute** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
     *   available.
     * - **Extended** (`magpie-1.1-flash`): Only `semantic_search` is supported.
     *   Requests specifying other tools will be rejected with a 400 error.
     * - **Direct LLM** (`llm-only`): No tools are executed. Requests specifying tools
     *   will be rejected with a 400 error.
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
     * - charts: Agents render charts inline in the conversation (bar, line, area,
     *   combo, pie, funnel, gauge, treemap, scorecard).
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
   * A skill supplied as complete Markdown for this request only. Added to the turn's
   * catalogue as an agent-selectable skill; not force-applied.
   */
  export interface Skill {
    /**
     * The complete skill definition as Markdown: YAML front-matter (`skill_id`,
     * `skill_name`, `category`, `slash_key`, `description`, `required_tools`,
     * `preferred_tools`) followed by the procedure body. Parsed server-side with the
     * canonical skill Markdown loader.
     */
    content: string;

    type: 'inline';
  }

  /**
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for all `agent_model` values and
   * `chat_mode` settings when `text.format` is provided (same JSON Schema mechanism
   * everywhere). **Ask** in the web app maps to `chat_mode: llm_router`; `auto`
   * currently maps to **Execute** (`full_agent`).
   */
  export interface Text {
    /**
     * Constrain the Converse response to the provided JSON Schema. The agent's output
     * is **validated server-side against this schema**: a conforming result is
     * returned as structured content, while non-conforming output (missing required
     * fields, invalid enum values, or disallowed properties) is converted into an
     * application-level error payload rather than returned as a structured success.
     *
     * On success the structured result is returned as a `json` content item with the
     * value already parsed (no `JSON.parse` required), alongside a JSON-string `text`
     * content item kept for backward compatibility with callers that read
     * `content[0].text`. When the agent cannot produce schema-valid JSON, no `json`
     * item is returned — a `text` content item carries a deterministic error object
     * instead:
     * `{ "error": { "code": "structured_output_generation_failed", "message": "..." } }`.
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
     * // Structured output is returned as a `json` content item (already
     * // parsed); `content[0].text` still holds the JSON string for
     * // backward compatibility.
     * const jsonPart = response.content.find((part) => part.type === "json");
     * const movie = jsonPart?.json;
     * // => { name: "Gladiator", director: "Ridley Scott", release_year: 2000 }
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

export interface ConverseConverseParams {
  /**
   * A text prompt to send to the agent.
   */
  prompt: string | Array<ConverseConverseParams.InputItemList>;

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
  agent_routing?:
    | ConverseConverseParams.Auto
    | ConverseConverseParams.Manual
    | ConverseConverseParams.Orchestrator
    | null;

  /**
   * Controls how the agent processes the request for this turn. Matches the chat
   * mode selector in the Datagrid web app: **Execute** (`full_agent`), **Extended**
   * (`light_agent`), **Ask** (`llm_router`). Ask uses the agent path with Magpie 2.5
   * and Ask-specific prompt guidance. When omitted, the request inherits the
   * conversation's persisted `chat_mode`; new conversations default to **Execute**
   * (`full_agent`). When set to `auto`, the request also runs as **Execute**
   * (`full_agent`); Auto is currently accepted for compatibility but does not
   * predict Ask, Extended, or Execute per message. When set to a concrete mode, that
   * concrete mode is used directly. The default `agent_model` for Execute is
   * `magpie-2.5` unless `config.agent_model` explicitly sets another supported
   * model.
   */
  chat_mode?: 'auto' | 'full_agent' | 'light_agent' | 'llm_router' | null;

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  config?: ConverseConverseParams.Config | null;

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
   * Determines whether generated_title metadata should be included. Defaults to
   * false. generated_title is emitted only when this flag is explicitly true.
   */
  generate_title?: boolean | null;

  /**
   * When set to false, tool call, reasoning step and delegation events are omitted
   * from SSE streams. Non-streaming responses always include the tool_calls and
   * reasoning fields (as null when empty).
   */
  include_steps?: boolean | null;

  /**
   * Optional deterministic reference date override in YYYY-MM-DD format. Must be a
   * real calendar date (for example, rejects impossible dates like 2026-02-31). When
   * set, the agent treats this date as today for relative date resolution and date
   * context rendering.
   */
  reference_date?: string | null;

  /**
   * Array of secret ID's to be included in the context. The secret value will be
   * appended to the prompt but not stored in conversation history.
   */
  secret_ids?: Array<string> | null;

  /**
   * Array of skill IDs to force-activate for this turn. Each ID must refer to an
   * account-shared or builtin skill reachable by the API key's teamspace.
   * User-scoped (private) skills are not accessible from API keys. Deduped and
   * merged with `slash_keys` before the turn begins. Maximum 32 entries. Returns 400
   * if any ID is unresolved, disabled, or out of scope.
   */
  skill_ids?: Array<string> | null;

  /**
   * Request-scoped skills made available to the agent for this turn only. They form
   * the turn's skill catalogue and are selected by the agent (Magpie 2.5 planner) or
   * read from its workspace (Magpie 3.0) — they are not force-applied, so supplying
   * a skill does not guarantee the agent follows its procedure. Each entry is a
   * discriminated union on `type`. Only `inline` is supported today;
   * `skill_reference` is reserved for a future release. Inline skills are never
   * persisted.
   *
   * Omitting `skills` keeps the agent's account-scoped skill catalogue. An empty
   * array (`[]`) isolates the turn — no skills. A non-empty array uses only the
   * supplied inline skills.
   */
  skills?: Array<ConverseConverseParams.Skill>;

  /**
   * Array of slash-key tokens (e.g. `"budget-check"` or `"/rfi-triage"`) to
   * force-activate for this turn. Leading slashes are stripped. Resolved
   * account-shared → builtin in precedence order. Deduped and merged with
   * `skill_ids` before the turn begins. Maximum 32 entries. Returns 400 if any token
   * cannot be resolved to an enabled, reachable skill.
   */
  slash_keys?: Array<string> | null;

  /**
   * Determines the response type of the converse. Response is the Server-Sent Events
   * if stream is set to true.
   */
  stream?: boolean | null;

  /**
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for all `agent_model` values and
   * `chat_mode` settings when `text.format` is provided (same JSON Schema mechanism
   * everywhere). **Ask** in the web app maps to `chat_mode: llm_router`; `auto`
   * currently maps to **Execute** (`full_agent`).
   */
  text?: ConverseConverseParams.Text | null;

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  user?: ConverseConverseParams.User | null;
}

export namespace ConverseConverseParams {
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
       * The agent model determines the processing mode for Converse requests. The
       * Datagrid web app exposes **Ask**, **Extended**, and **Execute** as Converse
       * **`chat_mode`** (`llm_router`, `light_agent`, `full_agent`). The values below
       * set **`config.agent_model`** (model tier and tool limits)—use both fields when
       * mirroring in-app behavior.
       *
       * **Execute** (full tool use, planning, and multi-step reasoning; aligns with
       * **Execute** in the web app / `full_agent`):
       *
       * - `magpie-2.0` — Legacy full-agent model with proactive planning and reasoning.
       * - `magpie-2.5` — Default. Latest full-agent model — faster, more adaptable, and
       *   built to handle a broader range of real-world tasks.
       * - `magpie-1.1` — Previous-generation full agent model.
       *
       * **Extended** (search-focused; aligns with **Extended** in the web app /
       * `light_agent`; not **Ask**):
       *
       * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
       *   `semantic_search` tool. A 400 error will be returned if other tools are
       *   specified.
       *
       * **Direct LLM** (no tool execution; **`agent_model` only**—**Ask** in the web app
       * is `chat_mode: llm_router`, not `magpie-1.1-flash`):
       *
       * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
       *   400 error will be returned if tools are specified.
       *
       * **BETA**: Magpie 3.0. Behavior and schema may change.
       *
       * - `magpie-3.0` — **BETA**. Available on the public Converse API. In-app rollout
       *   flags do not apply to this request.
       *
       * Can also accept any custom string value for future model versions.
       */
      agent_model?:
        | 'magpie-1.1'
        | 'magpie-1.1-flash'
        | 'magpie-2.0'
        | 'magpie-2.5'
        | 'magpie-2.5-flash'
        | 'magpie-3.0'
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
       * The LLM used to generate responses. Any id returned by `GET /v1/models` with
       * `type: llm` is accepted; the enum lists the ids known when this spec was
       * generated. Deprecated Gemini 2.x Flash ids are accepted for backward
       * compatibility and automatically run as gemini-3.1-flash-lite.
       */
      llm_model?:
        | 'gemini-2.0-flash'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-2.5-pro'
        | 'gemini-3-flash-preview'
        | 'gemini-3-pro-preview'
        | 'gemini-3.1-flash-lite'
        | 'gemini-3.1-pro-preview'
        | 'gemini-3.5-flash'
        | 'gemini-3.5-flash-lite'
        | 'gemini-3.6-flash'
        | 'gemini-3.8-flash'
        | 'gemini-live-2.5-flash-native-audio'
        | 'gemini-1.5-flash-001'
        | 'gemini-1.5-flash-002'
        | 'gemini-2.0-flash-001'
        | 'gemini-2.5-flash-preview-04-17'
        | 'gemini-1.5-pro-001'
        | 'gemini-1.5-pro-002'
        | 'gemini-2.5-pro-preview-05-06'
        | 'claude-haiku-4-5@20251001'
        | 'claude-sonnet-4-6@default'
        | 'claude-opus-4-6@default'
        | 'claude-opus-4-7'
        | 'claude-opus-4-8'
        | 'claude-sonnet-5'
        | 'claude-opus-5'
        | 'claude-opus-5-5'
        | 'anthropic.claude-haiku-4-5-20251001-v1:0'
        | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
        | 'anthropic.claude-sonnet-4-6'
        | 'anthropic.claude-opus-4-5-20251101-v1:0'
        | 'anthropic.claude-opus-4-6-v1'
        | 'anthropic.claude-opus-4-7'
        | 'anthropic.claude-opus-4-8'
        | 'anthropic.claude-sonnet-5'
        | 'anthropic.claude-opus-5'
        | 'anthropic.claude-opus-5-5'
        | 'gpt-4o-mini'
        | 'gpt-4o'
        | 'gpt-4.1-mini'
        | 'gpt-4.1'
        | 'gpt-5-mini'
        | 'gpt-5'
        | 'gpt-5.1'
        | 'chatgpt-4o-latest'
        | 'gpt-4-turbo'
        | 'gpt-4'
        | 'openai.gpt-5.5'
        | 'openai.gpt-5.6-luna'
        | 'openai.gpt-5.6-sol'
        | 'openai.gpt-5.6-terra'
        | 'amazon.nova-2-lite-v1:0'
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
       * Sampling temperature for model output. Lower values are more deterministic;
       * higher values are more diverse.
       */
      temperature?: number | null;

      /**
       * Array of the agent tools to enable. If not provided, or null is provided -
       * default tools of the agent are used. If empty list provided - none of the tools
       * are used. When connection_id is set for a tool, it will use that specific
       * connection instead of the default one.
       *
       * **Structured outputs (Converse):** All `agent_model` values support JSON Schema
       * constrained responses via **`text.format`** on the Converse request. Responses
       * are validated server-side against the schema and returned as a `json` content
       * item; output that cannot be made schema-valid is rejected with a deterministic
       * `structured_output_generation_failed` error instead of being returned as a
       * success.
       *
       * **Tool availability by agent model** (aligned with in-app **Execute** /
       * **Extended** / direct LLM; see Converse `chat_mode` for **Ask** vs
       * `agent_model`):
       *
       * - **Execute** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
       *   available.
       * - **Extended** (`magpie-1.1-flash`): Only `semantic_search` is supported.
       *   Requests specifying other tools will be rejected with a 400 error.
       * - **Direct LLM** (`llm-only`): No tools are executed. Requests specifying tools
       *   will be rejected with a 400 error.
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
       * - charts: Agents render charts inline in the conversation (bar, line, area,
       *   combo, pie, funnel, gauge, treemap, scorecard).
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
   * The Teamspace's orchestrator answers the turn and delegates parts of it to
   * specialist agents. The response reports the orchestrator as `agent_id`. A
   * conversation started in this mode stays with the orchestrator when a later turn
   * sends only `conversation_id`. Only a personal conversation can be continued in
   * this mode. The orchestrator cannot be named as `agent_id` or as a `manual`
   * target.
   */
  export interface Orchestrator {
    /**
     * The Teamspace's orchestrator answers and delegates to specialist agents.
     */
    mode: 'orchestrator';
  }

  /**
   * Override the agent config for this converse call. This is applied as a partial
   * override.
   */
  export interface Config {
    /**
     * The agent model determines the processing mode for Converse requests. The
     * Datagrid web app exposes **Ask**, **Extended**, and **Execute** as Converse
     * **`chat_mode`** (`llm_router`, `light_agent`, `full_agent`). The values below
     * set **`config.agent_model`** (model tier and tool limits)—use both fields when
     * mirroring in-app behavior.
     *
     * **Execute** (full tool use, planning, and multi-step reasoning; aligns with
     * **Execute** in the web app / `full_agent`):
     *
     * - `magpie-2.0` — Legacy full-agent model with proactive planning and reasoning.
     * - `magpie-2.5` — Default. Latest full-agent model — faster, more adaptable, and
     *   built to handle a broader range of real-world tasks.
     * - `magpie-1.1` — Previous-generation full agent model.
     *
     * **Extended** (search-focused; aligns with **Extended** in the web app /
     * `light_agent`; not **Ask**):
     *
     * - `magpie-1.1-flash` — Fast model optimized for RAG use cases. Only supports the
     *   `semantic_search` tool. A 400 error will be returned if other tools are
     *   specified.
     *
     * **Direct LLM** (no tool execution; **`agent_model` only**—**Ask** in the web app
     * is `chat_mode: llm_router`, not `magpie-1.1-flash`):
     *
     * - `llm-only` — Runs a direct LLM conversation with no planning or tool calls. A
     *   400 error will be returned if tools are specified.
     *
     * **BETA**: Magpie 3.0. Behavior and schema may change.
     *
     * - `magpie-3.0` — **BETA**. Available on the public Converse API. In-app rollout
     *   flags do not apply to this request.
     *
     * Can also accept any custom string value for future model versions.
     */
    agent_model?:
      | 'magpie-1.1'
      | 'magpie-1.1-flash'
      | 'magpie-2.0'
      | 'magpie-2.5'
      | 'magpie-2.5-flash'
      | 'magpie-3.0'
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
     * The LLM used to generate responses. Any id returned by `GET /v1/models` with
     * `type: llm` is accepted; the enum lists the ids known when this spec was
     * generated. Deprecated Gemini 2.x Flash ids are accepted for backward
     * compatibility and automatically run as gemini-3.1-flash-lite.
     */
    llm_model?:
      | 'gemini-2.0-flash'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-2.5-pro'
      | 'gemini-3-flash-preview'
      | 'gemini-3-pro-preview'
      | 'gemini-3.1-flash-lite'
      | 'gemini-3.1-pro-preview'
      | 'gemini-3.5-flash'
      | 'gemini-3.5-flash-lite'
      | 'gemini-3.6-flash'
      | 'gemini-3.8-flash'
      | 'gemini-live-2.5-flash-native-audio'
      | 'gemini-1.5-flash-001'
      | 'gemini-1.5-flash-002'
      | 'gemini-2.0-flash-001'
      | 'gemini-2.5-flash-preview-04-17'
      | 'gemini-1.5-pro-001'
      | 'gemini-1.5-pro-002'
      | 'gemini-2.5-pro-preview-05-06'
      | 'claude-haiku-4-5@20251001'
      | 'claude-sonnet-4-6@default'
      | 'claude-opus-4-6@default'
      | 'claude-opus-4-7'
      | 'claude-opus-4-8'
      | 'claude-sonnet-5'
      | 'claude-opus-5'
      | 'claude-opus-5-5'
      | 'anthropic.claude-haiku-4-5-20251001-v1:0'
      | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
      | 'anthropic.claude-sonnet-4-6'
      | 'anthropic.claude-opus-4-5-20251101-v1:0'
      | 'anthropic.claude-opus-4-6-v1'
      | 'anthropic.claude-opus-4-7'
      | 'anthropic.claude-opus-4-8'
      | 'anthropic.claude-sonnet-5'
      | 'anthropic.claude-opus-5'
      | 'anthropic.claude-opus-5-5'
      | 'gpt-4o-mini'
      | 'gpt-4o'
      | 'gpt-4.1-mini'
      | 'gpt-4.1'
      | 'gpt-5-mini'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'chatgpt-4o-latest'
      | 'gpt-4-turbo'
      | 'gpt-4'
      | 'openai.gpt-5.5'
      | 'openai.gpt-5.6-luna'
      | 'openai.gpt-5.6-sol'
      | 'openai.gpt-5.6-terra'
      | 'amazon.nova-2-lite-v1:0'
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
     * Sampling temperature for model output. Lower values are more deterministic;
     * higher values are more diverse.
     */
    temperature?: number | null;

    /**
     * Array of the agent tools to enable. If not provided, or null is provided -
     * default tools of the agent are used. If empty list provided - none of the tools
     * are used. When connection_id is set for a tool, it will use that specific
     * connection instead of the default one.
     *
     * **Structured outputs (Converse):** All `agent_model` values support JSON Schema
     * constrained responses via **`text.format`** on the Converse request. Responses
     * are validated server-side against the schema and returned as a `json` content
     * item; output that cannot be made schema-valid is rejected with a deterministic
     * `structured_output_generation_failed` error instead of being returned as a
     * success.
     *
     * **Tool availability by agent model** (aligned with in-app **Execute** /
     * **Extended** / direct LLM; see Converse `chat_mode` for **Ask** vs
     * `agent_model`):
     *
     * - **Execute** (`magpie-2.0`, `magpie-2.5`, `magpie-1.1`): All tools below are
     *   available.
     * - **Extended** (`magpie-1.1-flash`): Only `semantic_search` is supported.
     *   Requests specifying other tools will be rejected with a 400 error.
     * - **Direct LLM** (`llm-only`): No tools are executed. Requests specifying tools
     *   will be rejected with a 400 error.
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
     * - charts: Agents render charts inline in the conversation (bar, line, area,
     *   combo, pie, funnel, gauge, treemap, scorecard).
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
   * A skill supplied as complete Markdown for this request only. Added to the turn's
   * catalogue as an agent-selectable skill; not force-applied.
   */
  export interface Skill {
    /**
     * The complete skill definition as Markdown: YAML front-matter (`skill_id`,
     * `skill_name`, `category`, `slash_key`, `description`, `required_tools`,
     * `preferred_tools`) followed by the procedure body. Parsed server-side with the
     * canonical skill Markdown loader.
     */
    content: string;

    type: 'inline';
  }

  /**
   * Contains the format property used to specify the structured output schema
   * (`text.format`). Structured output is supported for all `agent_model` values and
   * `chat_mode` settings when `text.format` is provided (same JSON Schema mechanism
   * everywhere). **Ask** in the web app maps to `chat_mode: llm_router`; `auto`
   * currently maps to **Execute** (`full_agent`).
   */
  export interface Text {
    /**
     * Constrain the Converse response to the provided JSON Schema. The agent's output
     * is **validated server-side against this schema**: a conforming result is
     * returned as structured content, while non-conforming output (missing required
     * fields, invalid enum values, or disallowed properties) is converted into an
     * application-level error payload rather than returned as a structured success.
     *
     * On success the structured result is returned as a `json` content item with the
     * value already parsed (no `JSON.parse` required), alongside a JSON-string `text`
     * content item kept for backward compatibility with callers that read
     * `content[0].text`. When the agent cannot produce schema-valid JSON, no `json`
     * item is returned — a `text` content item carries a deterministic error object
     * instead:
     * `{ "error": { "code": "structured_output_generation_failed", "message": "..." } }`.
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
     * // Structured output is returned as a `json` content item (already
     * // parsed); `content[0].text` still holds the JSON string for
     * // backward compatibility.
     * const jsonPart = response.content.find((part) => part.type === "json");
     * const movie = jsonPart?.json;
     * // => { name: "Gladiator", director: "Ridley Scott", release_year: 2000 }
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

export declare namespace Converse {
  export {
    type BetaConverseRequest as BetaConverseRequest,
    type ConverseConverseParams as ConverseConverseParams,
  };
}
