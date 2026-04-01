// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Voice extends APIResource {
  /**
   * Prepare a real-time voice conversation with an AI Agent.
   *
   * Returns a WebSocket URL and a ready-made `start` message. Open a WebSocket
   * connection to the returned `url`, send `start_message` as the first frame, then
   * stream audio back and forth.
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
   * - Client: `start`, `audio`, `stop`, `interrupt`, `text`
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
   * The ID of the agent to use for the voice conversation. If not provided, the
   * default agent is used.
   */
  agent_id?: string | null;

  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable.
   */
  config?: VoiceSessionRequest.Config | null;

  /**
   * The ID of an existing conversation to continue. If not provided, a new
   * conversation will be created.
   */
  conversation_id?: string | null;

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
}

export namespace VoiceSessionRequest {
  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable.
   */
  export interface Config {
    /**
     * Custom instructions for the AI Agent during the voice session.
     */
    custom_prompt?: string | null;

    /**
     * Directs your AI Agent's operational behavior during the voice session.
     */
    system_prompt?: string | null;
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
 * - `text`: Inject text content into the active session `{ text: string }`. The
 *   agent treats this as if the user spoke the text. Useful for providing
 *   additional context mid-session without requiring audio.
 *
 * **Server to Client Messages:**
 *
 * - `started`: Session established
 *   `{ session_id: string, conversation_id: string, message_id: string }`
 * - `ready`: Agent is ready to receive audio
 * - `audio`: Audio response chunk
 *   `{ data: string (base64 PCM), mime_type: string }`
 * - `tool_call`: Tool invocation status
 *   `{ tool_name: string, status: "started" | "completed" }`
 * - `interrupted`: Model was interrupted
 * - `error`: Error occurred `{ message: string }`
 * - `transcript`: Real-time transcription
 *   `{ role: "user" | "agent", text: string }`
 * - `citation`: Source citation
 *   `{ citations: Array<object>, timestamp_ms: number }`
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
    | VoiceWebsocketMessage.Message
    | VoiceWebsocketMessage.UnionMember4
    | VoiceWebsocketMessage.UnionMember5
    | VoiceWebsocketMessage.Text
    | VoiceWebsocketMessage.UnionMember7;

  /**
   * Message type.
   */
  type?:
    | 'start'
    | 'audio'
    | 'stop'
    | 'interrupt'
    | 'text'
    | 'started'
    | 'ready'
    | 'tool_call'
    | 'interrupted'
    | 'error'
    | 'transcript'
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
    status?: 'started' | 'completed';

    tool_name?: string;
  }

  /**
   * For 'error' messages
   */
  export interface Message {
    message?: string;
  }

  /**
   * For 'transcript' messages
   */
  export interface UnionMember4 {
    role?: 'user' | 'agent';

    text?: string;
  }

  /**
   * For 'citation' messages
   */
  export interface UnionMember5 {
    /**
     * Array of source citations referenced by the agent.
     */
    citations?: Array<unknown>;

    /**
     * Timestamp in milliseconds relative to the session start when the citation was
     * referenced.
     */
    timestamp_ms?: number;
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
  export interface UnionMember7 {
    credits_consumed?: number;

    transcript?: Array<UnionMember7.Transcript>;
  }

  export namespace UnionMember7 {
    export interface Transcript {
      role?: 'user' | 'agent';

      text?: string;
    }
  }
}

export interface VoiceStartSessionParams {
  /**
   * The ID of the agent to use for the voice conversation. If not provided, the
   * default agent is used.
   */
  agent_id?: string | null;

  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable.
   */
  config?: VoiceStartSessionParams.Config | null;

  /**
   * The ID of an existing conversation to continue. If not provided, a new
   * conversation will be created.
   */
  conversation_id?: string | null;

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
}

export namespace VoiceStartSessionParams {
  /**
   * Override the agent config for this voice session. Only prompt overrides are
   * supported — voice sessions always use Gemini Live, so LLM model, agent model,
   * planning prompt, and tool settings are not applicable.
   */
  export interface Config {
    /**
     * Custom instructions for the AI Agent during the voice session.
     */
    custom_prompt?: string | null;

    /**
     * Directs your AI Agent's operational behavior during the voice session.
     */
    system_prompt?: string | null;
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
     * Voice preset to use (e.g., 'sage', 'nova', 'spark'). If not provided, uses the
     * agent's configured voice preset or the default.
     */
    voice_preset?: string | null;
  }
}

export declare namespace Voice {
  export {
    type VoiceSessionRequest as VoiceSessionRequest,
    type VoiceSessionResponse as VoiceSessionResponse,
    type VoiceWebsocketMessage as VoiceWebsocketMessage,
    type VoiceStartSessionParams as VoiceStartSessionParams,
  };
}
