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
  content: Array<Message.MessageContentText | Message.MessageContentVoice | Message.MessageContentFile>;

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
       * Id of the source.
       */
      source_id?: string;

      /**
       * URI of the source.
       */
      source_uri?: string;
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
     * Per-turn transcript and citation events in chronological order. Each entry is
     * plain text with a timestamp offset from the start of the voice session. Present
     * only for voice sessions that recorded timeline data.
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
     * A single event from a voice session timeline, representing either a transcript
     * turn or a citation.
     */
    export interface TimelineEvent {
      /**
       * Timestamp offset from the start of the voice session, in milliseconds.
       */
      timestamp_ms: number;

      /**
       * The type of timeline event.
       */
      type: 'transcript' | 'citation';

      /**
       * Citations for this event. Present when type is 'citation'.
       */
      citations?: Array<TimelineEvent.Citation>;

      /**
       * The role of the participant for this event.
       */
      role?: 'user' | 'agent';

      /**
       * Plain text transcript for this turn. Present when type is 'transcript'.
       */
      text?: string;
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
