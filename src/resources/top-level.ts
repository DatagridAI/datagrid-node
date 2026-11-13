// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ToolsAPI from './tools';
import * as MessagesAPI from './conversations/messages';

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export interface ConverseResponse extends MessagesAPI.Message {
  /**
   * The chat mode used for this response (web app: Execute = full_agent, Extended =
   * light_agent, Ask = llm_router). Auto mode currently runs and reports as Execute
   * (full_agent). A turn that runs on the orchestrator agent always runs and reports
   * as full_agent, whatever `chat_mode` was requested.
   */
  chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;

  /**
   * Each delegation the orchestrator made on this turn, in the order they finished.
   * One entry per delegation call, not per specialist run: a message sent to a
   * specialist that is still running is its own entry, and only the entry that ended
   * the run carries its `credits_consumed`. `credits.consumed` includes what they
   * consumed. Null when no delegation finished, and on turns that do not run on the
   * orchestrator agent.
   */
  delegations?: Array<ConverseResponse.Delegation> | null;

  /**
   * Auto-generated conversation title for this turn. Null when title generation does
   * not run or fails.
   */
  generated_title?: string | null;

  /**
   * Array of reasoning steps that occurred during this response. Only includes steps
   * with status completed or failed.
   */
  reasoning?: Array<ConverseResponse.Reasoning> | null;

  /**
   * Array of skills that were force-activated for this turn via `skill_ids` or
   * `slash_keys`. Null when no skills were explicitly requested, or when none of the
   * requested skills survived resolution for this turn.
   */
  skills?: Array<ConverseResponse.Skill> | null;

  /**
   * Array of tool calls that were executed during this response.
   */
  tool_calls?: Array<ConverseResponse.ToolCall> | null;
}

export namespace ConverseResponse {
  /**
   * A delegation call to a specialist agent that finished. A delegation still
   * running when the turn ends is not listed.
   */
  export interface Delegation {
    /**
     * Identifies the delegation. Matches the `id` of its `delegation` events.
     */
    id: string;

    /**
     * The ID of the specialist agent.
     */
    agent_id: string;

    /**
     * The name of the specialist agent.
     */
    agent_name: string;

    /**
     * Credits the specialist's run consumed. Null when the run reported no charge.
     */
    credits_consumed: number | null;

    /**
     * How long the specialist's run took, in milliseconds. Null when it was not
     * measured.
     */
    elapsed_ms: number | null;

    /**
     * True when the specialist's text was salvaged mid-run rather than returned in
     * full.
     */
    is_partial: boolean;

    /**
     * Why the run ended: `completed`, or a failure (`failed`, `timed_out`,
     * `budget_exhausted`, `cancelled`). `cancelled` means the user or host stopped the
     * run.
     */
    status: 'completed' | 'failed' | 'timed_out' | 'budget_exhausted' | 'cancelled';
  }

  export interface Reasoning {
    /**
     * The ID of the reasoning step.
     */
    id: string;

    /**
     * The current status of the reasoning step. `cancelled` when the conversation was
     * stopped while the step was in progress.
     */
    status: 'in_progress' | 'completed' | 'failed' | 'cancelled';

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

  /**
   * A skill that was force-activated for this turn.
   */
  export interface Skill {
    /**
     * The unique identifier of the skill.
     */
    id: string;

    /**
     * The human-readable name of the skill.
     */
    name: string;

    /**
     * The visibility scope of the skill. `user` (private) never appears here:
     * `skill_ids` and `slash_keys` can only name account-shared or builtin skills.
     */
    scope: 'account' | 'builtin';

    /**
     * The slash key used to invoke the skill (without leading slash).
     */
    slash_key: string;
  }

  export interface ToolCall {
    /**
     * The ID of the tool call.
     */
    id: string;

    /**
     * The status of the tool call. `cancelled` when the conversation was stopped while
     * the tool call was in progress.
     */
    status: 'in_progress' | 'completed' | 'failed' | 'cancelled';

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
  | Properties.ConverseCitationsEvent
  | Properties.ConverseGeneratedTitleEvent
  | Properties.ConverseSkillsEvent
  | Properties.ConverseContentMessageDeltaEvent
  | Properties.ConverseToolCallDeltaEvent
  | Properties.ConverseReasoningDeltaEvent
  | Properties.ConverseDelegationEvent;

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
       * The chat mode used for this response (web app: Execute = full_agent, Extended =
       * light_agent, Ask = llm_router). Present on `end` events. Auto mode currently
       * runs and reports as Execute (full_agent). A turn that runs on the orchestrator
       * agent always runs and reports as full_agent, whatever `chat_mode` was requested.
       */
      chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;

      /**
       * On `end` events. Each delegation the orchestrator made on this turn, in the
       * order they finished. One entry per delegation call, not per specialist run: a
       * message sent to a specialist that is still running is its own entry, and only
       * the entry that ended the run carries its `credits_consumed`. Null when no
       * delegation finished, and on turns that do not run on the orchestrator agent.
       */
      delegations?: Array<Data.Delegation> | null;
    }

    export namespace Data {
      /**
       * A delegation call to a specialist agent that finished. A delegation still
       * running when the turn ends is not listed.
       */
      export interface Delegation {
        /**
         * Identifies the delegation. Matches the `id` of its `delegation` events.
         */
        id: string;

        /**
         * The ID of the specialist agent.
         */
        agent_id: string;

        /**
         * The name of the specialist agent.
         */
        agent_name: string;

        /**
         * Credits the specialist's run consumed. Null when the run reported no charge.
         */
        credits_consumed: number | null;

        /**
         * How long the specialist's run took, in milliseconds. Null when it was not
         * measured.
         */
        elapsed_ms: number | null;

        /**
         * True when the specialist's text was salvaged mid-run rather than returned in
         * full.
         */
        is_partial: boolean;

        /**
         * Why the run ended: `completed`, or a failure (`failed`, `timed_out`,
         * `budget_exhausted`, `cancelled`). `cancelled` means the user or host stopped the
         * run.
         */
        status: 'completed' | 'failed' | 'timed_out' | 'budget_exhausted' | 'cancelled';
      }
    }
  }

  export interface ConverseCitationsEvent {
    data: ConverseCitationsEvent.Data;

    /**
     * Type of the event which is always citations
     */
    event: 'citations';
  }

  export namespace ConverseCitationsEvent {
    export interface Data {
      /**
       * The ID of the agent used for the converse.
       */
      agent_id: string;

      /**
       * Array of citations that provide sources for factual statements in the response.
       * Each citation includes the referenced text and its sources.
       */
      citations: Array<Data.Citation> | null;

      /**
       * The ID of the agent conversation.
       */
      conversation_id: string;

      /**
       * The chat mode used for this response turn when available.
       */
      chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;
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
           * Origin-system deep-link for the source (e.g. an `app.procore.com` universal
           * link), when one exists. Unlike `source_uri`, it is never overridden by the
           * signed Datagrid file URI, so clients can offer an "open in source" action.
           */
          external_url?: string;

          /**
           * record only. Backend-normalized, render-ready structured fields promoted from
           * the record row (due date, ball-in-court, assignee, revision, type, vendor,
           * scope, …). Excludes `status`, which is surfaced on its own.
           */
          fields?: Array<Source.Field>;

          /**
           * record / pdf_page only. Procore tool type of the underlying record (e.g.
           * "rfi_headers", "submittal_logs"), read from the indexed Procore item type on the
           * source row; present only for sources ingested from Procore. Lets clients render
           * a reliable type label (RFI, Submittal, Observation, …) without parsing the
           * deep-link URL.
           */
          item_type?: string;

          /**
           * pdf_page only. 1-based page number within the source document. Omitted when the
           * page is unknown; never `0`.
           */
          page_number?: number;

          /**
           * Id of the source when Datagrid holds one (dataset id, or data-lake item id for
           * file-backed `pdf_page`). Omitted for `pdf_page` sources with no Datagrid-backed
           * file.
           */
          source_id?: string;

          /**
           * URI of the source. For file-backed sources this is the in-app target (signed
           * Datagrid file URI when available); use `external_url` for the origin-system
           * deep-link. For `pdf_page` sources with no Datagrid file, this is the
           * origin-system deep-link and matches `external_url`; locate the page with
           * `page_number`.
           */
          source_uri?: string;

          /**
           * record only. Primary status value for the record (e.g. "Open", "Pending
           * Review"), surfaced separately from `fields` so clients can render a status chip.
           */
          status?: string;

          /**
           * record only. Locale-stable status bucket from the source mapped field
           * (`mapped_to_status`), never parsed from the display `status` string. `open`,
           * `closed`, and `in_progress` map to semantic fills; `custom` and omission both
           * mean a default gray fill.
           */
          status_category?: 'open' | 'closed' | 'in_progress' | 'custom';

          /**
           * record only. Source-system color for the record status (hex or named token),
           * when the indexed row carries one. Omitted when absent. Clients must not invent a
           * color from `status`.
           */
          status_color?: string;

          /**
           * record only. Preview image URL from the indexed row (e.g. a Drawings thumbnail).
           * Omitted when the row has none.
           */
          thumbnail_url?: string;
        }

        export namespace Source {
          export interface Field {
            /**
             * Human-readable field label (e.g. "Due Date").
             */
            label: string;

            /**
             * Human-readable field value (e.g. "2025-09-14").
             */
            value: string;
          }
        }
      }
    }
  }

  export interface ConverseGeneratedTitleEvent {
    data: ConverseGeneratedTitleEvent.Data;

    /**
     * Type of the event which is always generated_title
     */
    event: 'generated_title';
  }

  export namespace ConverseGeneratedTitleEvent {
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
       * Auto-generated conversation title for this turn. Null when title generation does
       * not run or fails.
       */
      generated_title: string | null;

      /**
       * The chat mode used for this response turn when available.
       */
      chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;
    }
  }

  export interface ConverseSkillsEvent {
    data: ConverseSkillsEvent.Data;

    /**
     * Type of the event, which is always skills
     */
    event: 'skills';
  }

  export namespace ConverseSkillsEvent {
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
       * Skills that were force-activated for this turn via `skill_ids` or `slash_keys`.
       * Null when no skills were explicitly requested, or when none of the requested
       * skills survived resolution for this turn.
       */
      skills: Array<Data.Skill> | null;

      /**
       * The chat mode used for this response turn when available.
       */
      chat_mode?: 'full_agent' | 'light_agent' | 'llm_router' | null;
    }

    export namespace Data {
      /**
       * A skill that was force-activated for this turn.
       */
      export interface Skill {
        /**
         * The unique identifier of the skill.
         */
        id: string;

        /**
         * The human-readable name of the skill.
         */
        name: string;

        /**
         * The visibility scope of the skill. `user` (private) never appears here:
         * `skill_ids` and `slash_keys` can only name account-shared or builtin skills.
         */
        scope: 'account' | 'builtin';

        /**
         * The slash key used to invoke the skill (without leading slash).
         */
        slash_key: string;
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
      delta: Data.ConverseContentMessageTextDelta | Data.ConverseContentMessageJsonDelta;
    }

    export namespace Data {
      export interface ConverseContentMessageTextDelta {
        text: string;

        type: 'text';
      }

      export interface ConverseContentMessageJsonDelta {
        /**
         * The latest parsed structured-output JSON value.
         */
        json: unknown;

        type: 'json';
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

      /**
       * The status of the tool call. `cancelled` when the conversation was stopped while
       * the tool call was in progress.
       */
      status: 'in_progress' | 'completed' | 'failed' | 'cancelled';

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
       * The current status of the reasoning step. `cancelled` when the conversation was
       * stopped while the step was in progress.
       */
      status: 'in_progress' | 'completed' | 'failed' | 'cancelled';

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

  /**
   * Emitted on turns that run on the orchestrator agent (`agent_routing.mode`
   * `orchestrator`, or a `conversation_id`-only follow-up on a conversation started
   * in that mode) as the orchestrator hands work to a specialist agent. Each
   * delegation sends `selected` once, then exactly one of `completed` or `failed`
   * when the specialist's run is over. A delegation still running when the turn ends
   * sends no terminal phase. Omitted when `include_steps` is false.
   */
  export interface ConverseDelegationEvent {
    /**
     * One phase of a delegation to a specialist agent. Does not include the task the
     * orchestrator sent the specialist.
     */
    data: ConverseDelegationEvent.Data;

    /**
     * Type of the event, which is always delegation
     */
    event: 'delegation';
  }

  export namespace ConverseDelegationEvent {
    /**
     * One phase of a delegation to a specialist agent. Does not include the task the
     * orchestrator sent the specialist.
     */
    export interface Data {
      /**
       * Identifies the delegation. The same across its phases.
       */
      id: string;

      /**
       * The ID of the specialist agent.
       */
      agent_id: string;

      /**
       * The name of the specialist agent.
       */
      agent_name: string;

      /**
       * `selected` when the specialist starts; `completed` or `failed` when its run is
       * over.
       */
      phase: 'selected' | 'completed' | 'failed';

      /**
       * On `selected`. Names of the skills forced for this turn that were carried into
       * the specialist's run. Null when none were.
       */
      applied_skills?: Array<string> | null;

      /**
       * On `completed` and `failed`. Credits the specialist's run consumed. Null when
       * the run reported no charge.
       */
      credits_consumed?: number | null;

      /**
       * On `completed` and `failed`. True when the specialist's text was salvaged
       * mid-run rather than returned in full.
       */
      is_partial?: boolean;

      /**
       * On `completed` and `failed`. Why the run ended: `completed`, or a failure
       * (`failed`, `timed_out`, `budget_exhausted`, `cancelled`). `cancelled` means the
       * user or host stopped the run, and is sent with phase `failed`.
       */
      status?: 'completed' | 'failed' | 'timed_out' | 'budget_exhausted' | 'cancelled';
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
  agent_routing?: ConverseParams.Auto | ConverseParams.Manual | ConverseParams.Orchestrator | null;

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

export declare namespace TopLevel {
  export {
    type ConverseResponse as ConverseResponse,
    type Properties as Properties,
    type ConverseParams as ConverseParams,
  };
}
