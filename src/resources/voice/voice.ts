// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as OrchestratorTasksAPI from './orchestrator-tasks';
import {
  OrchestratorTaskListParams,
  OrchestratorTasks,
  VoiceOrchestratorTask,
  VoiceOrchestratorTaskList,
} from './orchestrator-tasks';

export class Voice extends APIResource {
  orchestratorTasks: OrchestratorTasksAPI.OrchestratorTasks = new OrchestratorTasksAPI.OrchestratorTasks(
    this._client,
  );

  /**
   * Prepare a real-time voice conversation with an AI Agent.
   *
   * Returns a WebSocket URL and a ready-made `start` message. Open a WebSocket
   * connection to the returned `url`, send `start_message` as the first frame, then
   * stream audio back and forth.
   *
   * This REST flow depends on Redis to issue a short-lived REST-to-WebSocket handoff
   * token. During a Redis incident, clients that can construct their own `start`
   * message may use the direct WebSocket flow below with a raw API key.
   *
   * You can also skip this endpoint and connect directly:
   * `wss://api.datagrid.com/ws/voice?token=YOUR_API_KEY`
   *
   * **WebSocket Protocol:**
   *
   * Once connected, send a JSON message with `type: "start"` and the session
   * parameters as the payload. The server responds with `type: "started"` containing
   * the session and conversation IDs, followed by `type: "ready"` when the agent is
   * ready to receive audio.
   *
   * **Audio Format:**
   *
   * - Client → Server: 16-bit mono PCM at 16kHz, base64-encoded
   * - Server → Client: 16-bit mono PCM at 24kHz, base64-encoded
   *
   * **Message Types:**
   *
   * - Client: `start`, `audio`, `stop`, `interrupt`, `end_turn`, `text`
   * - Server: `started`, `ready`, `audio`, `tool_call`, `interrupted`, `error`,
   *   `transcript`, `citation`, `ended`
   */
  startSession(
    body: VoiceStartSessionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceSessionResponse> {
    return this._client.post('/voice', { body, ...options });
  }
}

export interface VoiceSessionRequest {
  /**
   * The ID of the agent to use for a direct-agent voice conversation. Ignored when
   * voice_mode is orchestrator.
   */
  agent_id?: string | null;

  /**
   * Orchestrator sessions only: set false to disable specialist delegation tools for
   * the session. Ignored for direct-agent sessions.
   */
  allow_delegation?: boolean | null;

  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable. Prompt overrides fully
   * replace the agent's stored values for this session only and are never persisted;
   * empty or whitespace-only values are treated as omitted.
   */
  config?: VoiceSessionRequest.Config | null;

  /**
   * The ID of an existing conversation to continue. If not provided, a new
   * conversation will be created. If the id cannot be resolved, the session start
   * fails with the `conversation_not_found` error code rather than silently creating
   * a new conversation.
   */
  conversation_id?: string | null;

  /**
   * When true and this session creates a brand-new conversation (no conversation_id
   * was provided), that conversation is discarded if the session ends without any
   * message ever being sent. Has no effect when continuing an existing conversation.
   * Disabled by default.
   */
  discard_if_empty?: boolean | null;

  /**
   * When true, the session is ephemeral and will not save messages to conversation
   * history.
   */
  ephemeral?: boolean | null;

  /**
   * Array of file IDs to attach to the voice conversation.
   */
  file_ids?: Array<string> | null;

  /**
   * Optional context text for the voice session. When provided, the AI will start by
   * briefly explaining this content before listening for user input.
   */
  initial_context?: string | null;

  /**
   * Optional initial user message. When provided, the system greeting is skipped and
   * the AI responds directly to this text (e.g. a suggested prompt). Takes
   * precedence over initial_context.
   */
  initial_message?: string | null;

  /**
   * Array of knowledge IDs to make accessible to the agent.
   */
  knowledge_ids?: Array<string> | null;

  /**
   * Array of page IDs to make accessible to the agent. The page and all knowledge
   * under it will be accessible.
   */
  page_ids?: Array<string> | null;

  /**
   * Array of secret IDs to include in the context.
   */
  secret_ids?: Array<string> | null;

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  user?: VoiceSessionRequest.User | null;

  /**
   * Voice session configuration options.
   */
  voice_config?: VoiceSessionRequest.VoiceConfig | null;

  /**
   * Controls whether the session uses the voice orchestrator, with delegation tools,
   * or talks directly to a specific agent. Defaults to orchestrator when agent_id is
   * omitted and direct_agent when agent_id is provided.
   */
  voice_mode?: 'orchestrator' | 'direct_agent' | null;
}

export namespace VoiceSessionRequest {
  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable. Prompt overrides fully
   * replace the agent's stored values for this session only and are never persisted;
   * empty or whitespace-only values are treated as omitted.
   */
  export interface Config {
    /**
     * Custom instructions for the AI Agent during the voice session.
     */
    custom_prompt?: string | null;

    /**
     * Directs your AI Agent's operational behavior during the voice session. Replaces
     * the agent's stored system prompt for this session only.
     */
    system_prompt?: string | null;

    /**
     * Voice-specific instructions (tone, pacing, speaking style). Replaces the agent's
     * stored voice instructions for this session only. Not persisted.
     */
    voice_prompt?: string | null;
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

  /**
   * Voice session configuration options.
   */
  export interface VoiceConfig {
    /**
     * Enable transcription of user input audio. Default: true.
     */
    input_transcription?: boolean | null;

    /**
     * Enable transcription of agent output audio. Default: true.
     */
    output_transcription?: boolean | null;

    /**
     * Maximum duration in milliseconds of a buffered segment before force-commit.
     * Default: 180000 (3 minutes).
     */
    segment_max_duration_ms?: number | null;

    /**
     * Duration of silence (no agent audio) in milliseconds before auto-committing a
     * segment. Default: 30000 (30 seconds).
     */
    silence_commit_ms?: number | null;

    /**
     * Discard a segment if this fraction (0-1) of its audio is silence. Default: 0.9
     * (90% silence threshold).
     */
    silence_discard_ratio?: number | null;

    /**
     * When true, the server closes the connection after the client has been
     * continuously sending audio frames below the speech-detection threshold for 60
     * seconds. Frames are still required — a fully muted microphone (no frames sent)
     * pauses the countdown. Disabled by default.
     */
    silence_timeout?: boolean | null;

    /**
     * When true, skip the launch greeting and start directly in listening mode.
     * Disabled by default.
     */
    silent_start?: boolean | null;

    /**
     * Controls how user audio turns close. 'server' uses the existing RMS and silence
     * timer. 'client' disables that timer and requires an explicit end_turn message
     * after each utterance.
     */
    turn_end_mode?: 'server' | 'client' | null;

    /**
     * Voice preset to use (e.g., 'sage', 'nova', 'spark'). If not provided, uses the
     * agent's configured voice preset or the default.
     */
    voice_preset?: string | null;
  }
}

export interface VoiceSessionResponse {
  /**
   * The resolved agent ID. If no agent was specified in the request, this is the
   * default agent.
   */
  agent_id: string;

  /**
   * Object type discriminator.
   */
  object: 'voice.session';

  /**
   * Ready-made JSON message to send as the first WebSocket frame after connecting.
   * Contains `type: "start"` and a `payload` with all session parameters.
   */
  start_message: unknown;

  /**
   * WebSocket URL to connect to. Includes the authentication token as a query
   * parameter.
   */
  url: string;
}

/**
 * WebSocket message format for voice conversations.
 *
 * **Client to Server Messages:**
 *
 * - `start`: Initialize session (payload matches VoiceSessionRequest)
 * - `audio`: Send audio chunk `{ data: string (base64 PCM), mime_type?: string }`
 * - `stop`: End session gracefully
 * - `interrupt`: Signal user interruption
 * - `end_turn`: Commit the current user audio turn immediately (no payload).
 *   Forwards Gemini `activityEnd` without waiting for server-side silence
 *   detection. Does not barge in on the agent; use `interrupt` for that. No
 *   dedicated server ack.
 * - `text`: Inject text content into the active session `{ text: string }`. The
 *   agent treats this as if the user spoke the text. Useful for providing
 *   additional context mid-session without requiring audio.
 *
 * **Server to Client Messages:**
 *
 * - `started`: Session established
 *   `{ session_id: string, conversation_id: string, message_id: string, agent_id: string, dm_navigation_item_id?: string, sends_turn_complete?: true }`.
 *   `agent_id` is the agent the session is bound to after supervisor resolution.
 *   `dm_navigation_item_id` is present only when the session ran in that DM's
 *   conversation, so clients can navigate straight to it. `sends_turn_complete` is
 *   present only when this session sends `turn_complete`; when it is absent (older
 *   servers, or a voice provider without a response-level completion signal),
 *   infer the end of an agent response from silence.
 * - `ready`: Agent is ready to receive audio
 * - `audio`: Audio response chunk
 *   `{ data: string (base64 PCM), mime_type: string }`
 * - `tool_call`: Tool invocation status
 *   `{ tool_name: string, status: "started" | "completed" | "failed", args?: object, tool_call_id?: string, turn_index?: number }`.
 *   `args` contains bounded, JSON-safe function arguments and is present only when
 *   the call starts. `tool_call_id` is shared by the started, completed, and
 *   failed events of one call. `turn_index` is the commit window the call started
 *   in.
 * - `interrupted`: Model was interrupted
 * - `error`: Error occurred `{ message: string, code?: string }`. Notable codes:
 *   `conversation_not_found` — the supplied `conversation_id` cannot be used
 *   (deleted, or not accessible to the caller); retry the `start` without it.
 *   `voice_provider_degraded` — the voice provider is unavailable; back off and
 *   retry later.
 * - `transcript`: Real-time transcription
 *   `{ role: "user" | "agent", text: string, turn_index?: number }`
 * - `turn_complete`: The agent finished its response `{ turn_index: number }`.
 *   Sent only when `started` carried `sends_turn_complete: true`. Every
 *   `transcript` event for the response is sent before it; audio and `tool_call`
 *   status events for the same response can still arrive after it. `turn_index`
 *   matches the `turn_index` of the response's last agent `transcript` event.
 * - `citation`: Source citation
 *   `{ citations: VoiceCitations, timestamp_ms: number, message_id: string, turn_index?: number }`.
 *   Each source is a superset of the SSE `/v1/converse` `CitationSource` schema —
 *   the core fields (`type`, `source_name`, `source_id`, `source_uri`,
 *   `confirmations`) are identical, with extra optional per-type fields available.
 *   `message_id` identifies the persisted voice message row for the session;
 *   `turn_index` groups the citation with transcript events from the turn that
 *   produced it.
 * - `ended`: Session ended
 *   `{ credits_consumed: number, transcript: Array<{ role: "user" | "agent", text: string }> }`
 */
export interface VoiceWebsocketMessage {
  /**
   * Message payload (varies by message type).
   */
  payload?:
    | VoiceWebsocketMessage.UnionMember0
    | VoiceWebsocketMessage.UnionMember1
    | VoiceWebsocketMessage.UnionMember2
    | VoiceWebsocketMessage.UnionMember3
    | VoiceWebsocketMessage.UnionMember4
    | VoiceWebsocketMessage.TurnIndex
    | VoiceWebsocketMessage.UnionMember6
    | VoiceWebsocketMessage.Text
    | VoiceWebsocketMessage.UnionMember8;

  /**
   * Message type.
   */
  type?:
    | 'start'
    | 'audio'
    | 'stop'
    | 'interrupt'
    | 'end_turn'
    | 'text'
    | 'started'
    | 'ready'
    | 'tool_call'
    | 'interrupted'
    | 'error'
    | 'transcript'
    | 'turn_complete'
    | 'citation'
    | 'ended';
}

export namespace VoiceWebsocketMessage {
  /**
   * For 'started' messages
   */
  export interface UnionMember0 {
    conversation_id?: string;

    message_id?: string;

    /**
     * Present only when this session sends `turn_complete` events. Absent on older
     * servers and for voice providers without a response-level completion signal.
     */
    sends_turn_complete?: true;

    session_id?: string;
  }

  /**
   * For 'audio' messages
   */
  export interface UnionMember1 {
    /**
     * Base64-encoded PCM audio
     */
    data?: string;

    mime_type?: string;
  }

  /**
   * For 'tool_call' messages
   */
  export interface UnionMember2 {
    /**
     * Bounded, JSON-safe function arguments. Present only when status is 'started'.
     */
    args?: { [key: string]: unknown };

    status?: 'started' | 'completed' | 'failed';

    /**
     * Server-generated id shared by the started, completed, and failed events of one
     * call. Optional for compatibility with older servers.
     */
    tool_call_id?: string;

    tool_name?: string;

    /**
     * One-based commit-window ordinal for the turn the call started in. A later
     * completed or failed event keeps this value even if the window has advanced.
     * Optional for compatibility with older servers.
     */
    turn_index?: number;
  }

  /**
   * For 'error' messages
   */
  export interface UnionMember3 {
    /**
     * Machine-readable error code. Use this for programmatic matching instead of the
     * message string. Examples: 'conversation_not_found', 'voice_provider_degraded',
     * 'client_silence_timeout'.
     */
    code?: string;

    message?: string;
  }

  /**
   * For 'transcript' messages
   */
  export interface UnionMember4 {
    role?: 'user' | 'agent';

    text?: string;

    /**
     * One-based commit-window ordinal. Transcript and citation events from the same
     * turn share a value. Optional for compatibility with older servers.
     */
    turn_index?: number;
  }

  /**
   * For 'turn_complete' messages
   */
  export interface TurnIndex {
    /**
     * One-based commit-window ordinal of the response's last agent transcript event.
     */
    turn_index: number;
  }

  /**
   * For 'citation' messages
   */
  export interface UnionMember6 {
    /**
     * Array of voice citations. Each source is a superset of the SSE `/v1/converse`
     * `CitationSource` schema.
     */
    citations: Array<UnionMember6.Citation>;

    /**
     * Stable id of the persisted voice message row for this session. Always present
     * and identical across all turns in the session; do not use it as a turn
     * correlation key.
     */
    message_id: string;

    /**
     * Timestamp in milliseconds relative to the session start when the citation was
     * referenced.
     */
    timestamp_ms: number;

    /**
     * One-based commit-window ordinal shared with transcript events from the turn that
     * produced these citations. Optional for compatibility with older servers.
     */
    turn_index?: number;
  }

  export namespace UnionMember6 {
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
      /**
       * A citation source on the voice WebSocket.
       *
       * Strict superset of the SSE `/v1/converse` `CitationSource` schema: the core
       * fields (`type`, `source_name`, `source_id`, `source_uri`, `confirmations`) carry
       * the exact same names and semantics. The remaining optional fields are
       * first-party enrichment used by Datagrid's own clients to render rich citations
       * live; external clients can safely ignore them.
       */
      export interface Source {
        /**
         * An array of text snippets from the source that confirm the citation. Required:
         * emitters must always send an array, using `[]` when there are no snippets rather
         * than omitting the field. This matches the SSE `/v1/converse` behavior.
         */
        confirmations: Array<string>;

        /**
         * Name of the source.
         */
        source_name: string;

        type: 'image' | 'pdf_page' | 'record' | 'web_search' | 'sql_query_result' | 'action';

        /**
         * record only. Cited record content snippet.
         */
        content?: string;

        /**
         * image / pdf_page only. Data lake item id backing the source.
         */
        data_lake_item_id?: string;

        /**
         * record / pdf_page / sql_query_result / action only. Origin-system deep-link for
         * the source (e.g. an `app.procore.com` universal link), when one exists. Unlike
         * `source_uri`, it is never overridden by the signed Datagrid file URI, so clients
         * can offer an "open in source" action.
         */
        external_url?: string;

        /**
         * action only. Structured fact data produced by the tool call.
         */
        fact_data?: { [key: string]: unknown };

        /**
         * record only. Backend-normalized, render-ready structured fields promoted from
         * the record row (due date, ball-in-court, assignee, revision, type, vendor,
         * scope, …). Excludes `status`, which is surfaced on its own.
         */
        fields?: Array<Source.Field>;

        /**
         * pdf_page only. Original file name.
         */
        file_name?: string;

        /**
         * record / pdf_page only. Procore tool type of the underlying record (e.g.
         * "rfi_headers", "submittal_logs"), read from the indexed Procore item type on the
         * source row; present only for sources ingested from Procore. Lets clients render
         * a reliable type label (RFI, Submittal, Observation, …) without parsing the
         * deep-link URL.
         */
        item_type?: string;

        /**
         * Index of this source in the originating, un-deduplicated source list.
         */
        original_source_index?: number;

        /**
         * pdf_page only. 1-based page number within the source document. Omitted when the
         * page is unknown; never `0`.
         */
        page_number?: number;

        /**
         * sql_query_result only. The query view backing the result.
         */
        query_view?: Source.QueryView;

        /**
         * record only. Human-readable record title.
         */
        record_title?: string;

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
         * record / pdf_page / sql_query_result only. Backing table id.
         */
        table_id?: string;

        /**
         * sql_query_result only. Natural-language explanation of the query.
         */
        task_explanation?: string;

        /**
         * web_search / record. Thumbnail image URL for a web result, or a preview image
         * URL from an indexed record row (e.g. a Drawings thumbnail). Omitted when the
         * source has none.
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

        /**
         * sql_query_result only. The query view backing the result.
         */
        export interface QueryView {
          dataset_id?: string;

          query?: string;

          table_fingerprint?: string;
        }
      }
    }
  }

  /**
   * For 'text' messages (inject text content into active session)
   */
  export interface Text {
    /**
     * Text to inject as a user turn into the active voice session. The agent will
     * process and respond to this text.
     */
    text?: string;
  }

  /**
   * For 'ended' messages
   */
  export interface UnionMember8 {
    credits_consumed?: number;

    transcript?: Array<UnionMember8.Transcript>;
  }

  export namespace UnionMember8 {
    export interface Transcript {
      role?: 'user' | 'agent';

      text?: string;
    }
  }
}

export interface VoiceStartSessionParams {
  /**
   * The ID of the agent to use for a direct-agent voice conversation. Ignored when
   * voice_mode is orchestrator.
   */
  agent_id?: string | null;

  /**
   * Orchestrator sessions only: set false to disable specialist delegation tools for
   * the session. Ignored for direct-agent sessions.
   */
  allow_delegation?: boolean | null;

  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable. Prompt overrides fully
   * replace the agent's stored values for this session only and are never persisted;
   * empty or whitespace-only values are treated as omitted.
   */
  config?: VoiceStartSessionParams.Config | null;

  /**
   * The ID of an existing conversation to continue. If not provided, a new
   * conversation will be created. If the id cannot be resolved, the session start
   * fails with the `conversation_not_found` error code rather than silently creating
   * a new conversation.
   */
  conversation_id?: string | null;

  /**
   * When true and this session creates a brand-new conversation (no conversation_id
   * was provided), that conversation is discarded if the session ends without any
   * message ever being sent. Has no effect when continuing an existing conversation.
   * Disabled by default.
   */
  discard_if_empty?: boolean | null;

  /**
   * When true, the session is ephemeral and will not save messages to conversation
   * history.
   */
  ephemeral?: boolean | null;

  /**
   * Array of file IDs to attach to the voice conversation.
   */
  file_ids?: Array<string> | null;

  /**
   * Optional context text for the voice session. When provided, the AI will start by
   * briefly explaining this content before listening for user input.
   */
  initial_context?: string | null;

  /**
   * Optional initial user message. When provided, the system greeting is skipped and
   * the AI responds directly to this text (e.g. a suggested prompt). Takes
   * precedence over initial_context.
   */
  initial_message?: string | null;

  /**
   * Array of knowledge IDs to make accessible to the agent.
   */
  knowledge_ids?: Array<string> | null;

  /**
   * Array of page IDs to make accessible to the agent. The page and all knowledge
   * under it will be accessible.
   */
  page_ids?: Array<string> | null;

  /**
   * Array of secret IDs to include in the context.
   */
  secret_ids?: Array<string> | null;

  /**
   * User information override for converse calls. All fields are optional - only
   * provided fields will override the default user information.
   */
  user?: VoiceStartSessionParams.User | null;

  /**
   * Voice session configuration options.
   */
  voice_config?: VoiceStartSessionParams.VoiceConfig | null;

  /**
   * Controls whether the session uses the voice orchestrator, with delegation tools,
   * or talks directly to a specific agent. Defaults to orchestrator when agent_id is
   * omitted and direct_agent when agent_id is provided.
   */
  voice_mode?: 'orchestrator' | 'direct_agent' | null;
}

export namespace VoiceStartSessionParams {
  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable. Prompt overrides fully
   * replace the agent's stored values for this session only and are never persisted;
   * empty or whitespace-only values are treated as omitted.
   */
  export interface Config {
    /**
     * Custom instructions for the AI Agent during the voice session.
     */
    custom_prompt?: string | null;

    /**
     * Directs your AI Agent's operational behavior during the voice session. Replaces
     * the agent's stored system prompt for this session only.
     */
    system_prompt?: string | null;

    /**
     * Voice-specific instructions (tone, pacing, speaking style). Replaces the agent's
     * stored voice instructions for this session only. Not persisted.
     */
    voice_prompt?: string | null;
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

  /**
   * Voice session configuration options.
   */
  export interface VoiceConfig {
    /**
     * Enable transcription of user input audio. Default: true.
     */
    input_transcription?: boolean | null;

    /**
     * Enable transcription of agent output audio. Default: true.
     */
    output_transcription?: boolean | null;

    /**
     * Maximum duration in milliseconds of a buffered segment before force-commit.
     * Default: 180000 (3 minutes).
     */
    segment_max_duration_ms?: number | null;

    /**
     * Duration of silence (no agent audio) in milliseconds before auto-committing a
     * segment. Default: 30000 (30 seconds).
     */
    silence_commit_ms?: number | null;

    /**
     * Discard a segment if this fraction (0-1) of its audio is silence. Default: 0.9
     * (90% silence threshold).
     */
    silence_discard_ratio?: number | null;

    /**
     * When true, the server closes the connection after the client has been
     * continuously sending audio frames below the speech-detection threshold for 60
     * seconds. Frames are still required — a fully muted microphone (no frames sent)
     * pauses the countdown. Disabled by default.
     */
    silence_timeout?: boolean | null;

    /**
     * When true, skip the launch greeting and start directly in listening mode.
     * Disabled by default.
     */
    silent_start?: boolean | null;

    /**
     * Controls how user audio turns close. 'server' uses the existing RMS and silence
     * timer. 'client' disables that timer and requires an explicit end_turn message
     * after each utterance.
     */
    turn_end_mode?: 'server' | 'client' | null;

    /**
     * Voice preset to use (e.g., 'sage', 'nova', 'spark'). If not provided, uses the
     * agent's configured voice preset or the default.
     */
    voice_preset?: string | null;
  }
}

Voice.OrchestratorTasks = OrchestratorTasks;

export declare namespace Voice {
  export {
    type VoiceSessionRequest as VoiceSessionRequest,
    type VoiceSessionResponse as VoiceSessionResponse,
    type VoiceWebsocketMessage as VoiceWebsocketMessage,
    type VoiceStartSessionParams as VoiceStartSessionParams,
  };

  export {
    OrchestratorTasks as OrchestratorTasks,
    type VoiceOrchestratorTask as VoiceOrchestratorTask,
    type VoiceOrchestratorTaskList as VoiceOrchestratorTaskList,
    type OrchestratorTaskListParams as OrchestratorTaskListParams,
  };
}
