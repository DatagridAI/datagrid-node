// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ToolsAPI from './tools';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Agents extends APIResource {
  /**
   * Create a new agent
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<Agent> {
    return this._client.post('/agents', { body, ...options });
  }

  /**
   * Get details of a specific agent
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<Agent> {
    return this._client.get(`/agents/${agentId}`, options);
  }

  /**
   * Update an agent configuration
   */
  update(agentId: string, body: AgentUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Agent> {
    return this._client.patch(`/agents/${agentId}`, { body, ...options });
  }

  /**
   * List all agents for the authenticated organization
   */
  list(query?: AgentListParams, options?: Core.RequestOptions): Core.PagePromise<AgentsCursorIDPage, Agent>;
  list(options?: Core.RequestOptions): Core.PagePromise<AgentsCursorIDPage, Agent>;
  list(
    query: AgentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AgentsCursorIDPage, Agent> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/agents', AgentsCursorIDPage, { query, ...options });
  }

  /**
   * Delete an agent
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/agents/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class AgentsCursorIDPage extends CursorIDPage<Agent> {}

export interface Agent {
  /**
   * Unique identifier for the agent
   */
  id: string;

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
  agent_model: 'magpie-1.1' | 'magpie-1.1-flash' | 'magpie-2.0' | 'magpie-2.5' | 'llm-only' | (string & {});

  /**
   * Array of corpus items the agent should use during the converse. When omitted,
   * all knowledge is used.
   */
  corpus: Array<Agent.CorpusKnowledgeItem | Agent.CorpusPageItem> | null;

  /**
   * The ISO string for when the agent was created
   */
  created_at: string;

  /**
   * Use custom prompt to instruct the style and formatting of the agent's response
   */
  custom_prompt: string | null;

  /**
   * The description of the agent
   */
  description: string | null;

  /**
   * The emoji of the agent
   */
  emoji: string | null;

  /**
   * @deprecated Deprecated, use corpus instead. Array of Knowledge IDs the agent
   * should use during the converse. When omitted, all knowledge is used.
   */
  knowledge_ids: Array<string> | null;

  /**
   * The LLM used to generate responses.
   */
  llm_model:
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
    | (string & {});

  /**
   * Registered MCP servers enabled for this agent.
   */
  mcp_servers: Array<Agent.McpServer>;

  /**
   * The name of the agent
   */
  name: string;

  /**
   * The object type, always 'agent'
   */
  object: 'agent';

  /**
   * Define the planning strategy your AI Agent should use when breaking down tasks
   * and solving problems
   */
  planning_prompt: string | null;

  /**
   * Directs your AI Agent's operational behavior.
   */
  system_prompt: string | null;

  /**
   * Tools that this agent can use.
   */
  tools: Array<ToolsAPI.Tool>;
}

export namespace Agent {
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
    base_url: string;

    credential_id: string | null;

    name: string;

    object: 'agent_mcp_server';

    server_id: string;

    status: string;

    last_synced_at?: string;

    tool_count?: number;
  }
}

export interface AgentCreateParams {
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
  corpus?: Array<AgentCreateParams.CorpusKnowledgeItem | AgentCreateParams.CorpusPageItem> | null;

  /**
   * Use custom prompt to instruct the style and formatting of the agent's response
   */
  custom_prompt?: string | null;

  /**
   * The description of the agent
   */
  description?: string | null;

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
  mcp_servers?: Array<AgentCreateParams.McpServer> | null;

  /**
   * The name of the agent
   */
  name?: string | null;

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

export namespace AgentCreateParams {
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

export interface AgentUpdateParams {
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
  corpus?: Array<AgentUpdateParams.CorpusKnowledgeItem | AgentUpdateParams.CorpusPageItem> | null;

  /**
   * Use custom prompt to instruct the style and formatting of the agent's response
   */
  custom_prompt?: string | null;

  /**
   * The description of the agent
   */
  description?: string | null;

  /**
   * Array of the agent tools to disable. Disabling is performed after the
   * 'agent_tools' rules are applied. For example, agent_tools: null and
   * disabled_tools: [data_analysis] will enable everything but the data_analysis
   * tool. If nothing or [] is provided, nothing is disabled and therefore only the
   * agent_tools setting is relevant.
   */
  disabled_tools?: Array<ToolsAPI.ToolName | ToolsAPI.Tool> | null;

  /**
   * The emoji of the agent
   */
  emoji?: string | null;

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
  mcp_servers?: Array<AgentUpdateParams.McpServer> | null;

  /**
   * The name of the agent
   */
  name?: string | null;

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

export namespace AgentUpdateParams {
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

export interface AgentListParams extends CursorIDPageParams {
  /**
   * Optional search string to filter agents by name. Case-insensitive partial match.
   */
  search?: string;
}

Agents.AgentsCursorIDPage = AgentsCursorIDPage;

export declare namespace Agents {
  export {
    type Agent as Agent,
    AgentsCursorIDPage as AgentsCursorIDPage,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };
}
