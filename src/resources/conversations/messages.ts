// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class Messages extends APIResource {
  /**
   * Retrieves a message by id.
   */
  retrieve(
    conversationId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Message> {
    return this._client.get(`/conversations/${conversationId}/messages/${messageId}`, options);
  }

  /**
   * Returns the list of messages in a conversation.
   */
  list(
    conversationId: string,
    query?: MessageListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message>;
  list(
    conversationId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message>;
  list(
    conversationId: string,
    query: MessageListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessagesCursorIDPage, Message> {
    if (isRequestOptions(query)) {
      return this.list(conversationId, {}, query);
    }
    return this._client.getAPIList(`/conversations/${conversationId}/messages`, MessagesCursorIDPage, {
      query,
      ...options,
    });
  }
}

export class MessagesCursorIDPage extends CursorIDPage<Message> {}

/**
 * The `conversation.message` object represents a message in a conversation.
 */
export interface Message {
  /**
   * The message identifier.
   */
  id: string;

  /**
   * The ID of the agent that sent or responded to the message.
   */
  agent_id: string;

  /**
   * Array of citations that provide sources for factual statements in the response.
   * Each citation includes the referenced text and its sources.
   */
  citations: Array<Message.Citation> | null;

  /**
   * Contents of the message.
   */
  content: Array<
    | Message.MessageContentText
    | Message.MessageContentJson
    | Message.MessageContentVoice
    | Message.MessageContentFile
  >;

  /**
   * The ID of the conversation the message belongs to.
   */
  conversation_id: string;

  /**
   * The ISO string for when the message was created.
   */
  created_at: string;

  /**
   * Credit consumption for this converse turn. `null` for user-role messages and
   * when retrieving messages from conversation history.
   */
  credits: Message.Credits | null;

  /**
   * The object type, which is always `conversation.message`.
   */
  object: 'conversation.message';

  /**
   * The role of the message sender - either 'user' or 'agent'.
   */
  role: 'user' | 'agent';
}

export namespace Message {
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

  /**
   * Text content for a message.
   */
  export interface MessageContentText {
    /**
     * The text content of the message.
     */
    text: string;

    type: 'text';
  }

  /**
   * JSON content for structured-output responses.
   */
  export interface MessageContentJson {
    /**
     * The JSON value produced by the agent.
     */
    json: unknown;

    type: 'json';
  }

  /**
   * Voice content for a message.
   */
  export interface MessageContentVoice {
    /**
     * Array of audio clips with timestamps for synchronized playback.
     */
    audio_clips: Array<MessageContentVoice.AudioClip>;

    /**
     * Total duration of the voice message in milliseconds.
     */
    duration_ms: number | null;

    /**
     * User transcript of the voice message.
     */
    transcript: string;

    type: 'voice';

    /**
     * Agent transcript of the voice message (for agent role messages).
     */
    agent_transcript?: string | null;

    /**
     * Per-turn transcript, citation, tool-call status, and attachment events in
     * chronological order. Each entry includes a timestamp offset from the start of
     * the voice session. Present only for voice sessions that recorded timeline data.
     */
    timeline_events?: Array<MessageContentVoice.TimelineEvent>;
  }

  export namespace MessageContentVoice {
    /**
     * A single audio clip from a voice message.
     */
    export interface AudioClip {
      /**
       * Unique identifier for the audio clip file. Use this ID with the files API to
       * download the audio content.
       */
      id: string;

      /**
       * Datagrid file URI for the audio file (WAV format).
       */
      audio_uri: string;

      /**
       * Duration of this audio clip in milliseconds.
       */
      duration_ms: number;

      /**
       * Participant who spoke in this clip.
       */
      participant: AudioClip.Participant;

      /**
       * Start time of this clip relative to the beginning of the voice message, in
       * milliseconds.
       */
      start_time_ms: number;
    }

    export namespace AudioClip {
      /**
       * Participant who spoke in this clip.
       */
      export interface Participant {
        id: string;

        type: 'user' | 'agent';
      }
    }

    /**
     * A single event from a voice session timeline, representing a transcript turn,
     * citation, tool-call status update, or an attached file.
     */
    export interface TimelineEvent {
      /**
       * Timestamp offset from the start of the voice session, in milliseconds.
       */
      timestamp_ms: number;

      /**
       * The type of timeline event.
       */
      type: 'transcript' | 'citation' | 'tool_call_status' | 'attachment';

      /**
       * Citations for this event. Present when type is 'citation'.
       */
      citations?: Array<TimelineEvent.Citation>;

      /**
       * Identifier of the attached file, as returned by the files endpoint. Retrieve its
       * bytes from `/v1/files/{file_id}/content`. Present when type is 'attachment'.
       */
      file_id?: string;

      /**
       * Original name of the attached file. Present when type is 'attachment', and only
       * when the file was uploaded with a name.
       */
      filename?: string;

      /**
       * Media type of the attached file, for example `image/jpeg`. Present when type is
       * 'attachment'.
       */
      media_type?: string;

      /**
       * The role of the participant for this event.
       */
      role?: 'user' | 'agent';

      /**
       * Tool-call status for this event. Present when type is 'tool_call_status'.
       */
      status?: 'started' | 'completed' | 'failed';

      /**
       * Plain text transcript for this turn. Present when type is 'transcript'.
       */
      text?: string;

      /**
       * Name of the tool whose status changed. Present when type is 'tool_call_status'.
       */
      tool_name?: string;
    }

    export namespace TimelineEvent {
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

  /**
   * File attachment content for a message. Represents a file that was uploaded as
   * part of the user's message.
   */
  export interface MessageContentFile {
    /**
     * The ID of the attached file. Use this ID with the files API to download the file
     * content.
     */
    file_id: string;

    type: 'input_file';
  }

  /**
   * Credit consumption for this converse turn. `null` for user-role messages and
   * when retrieving messages from conversation history.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }
}

export interface MessageListParams extends CursorIDPageParams {}

Messages.MessagesCursorIDPage = MessagesCursorIDPage;

export declare namespace Messages {
  export {
    type Message as Message,
    MessagesCursorIDPage as MessagesCursorIDPage,
    type MessageListParams as MessageListParams,
  };
}
