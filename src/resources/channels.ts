// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Channels extends APIResource {
  /**
   * Creates a shared public channel and adds the authenticated API user as a member.
   */
  create(body: ChannelCreateParams, options?: Core.RequestOptions): Core.APIPromise<Channel> {
    return this._client.post('/channels', { body, ...options });
  }

  /**
   * Retrieve channel
   */
  retrieve(channelId: string, options?: Core.RequestOptions): Core.APIPromise<Channel> {
    return this._client.get(`/channels/${channelId}`, options);
  }

  /**
   * Update channel
   */
  update(
    channelId: string,
    body: ChannelUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Channel> {
    return this._client.patch(`/channels/${channelId}`, { body, ...options });
  }

  /**
   * Lists shared public named channels in the resolved teamspace. Private channels,
   * direct messages, and personal chats are intentionally omitted. `q` filters
   * channel names and does not search message content.
   */
  list(
    query?: ChannelListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelsCursorIDPage, Channel>;
  list(options?: Core.RequestOptions): Core.PagePromise<ChannelsCursorIDPage, Channel>;
  list(
    query: ChannelListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelsCursorIDPage, Channel> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/channels', ChannelsCursorIDPage, { query, ...options });
  }

  /**
   * Add channel members
   */
  addMembers(
    channelId: string,
    body: ChannelAddMembersParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelAddMembersResponse> {
    return this._client.post(`/channels/${channelId}/members`, { body, ...options });
  }

  /**
   * Adds the authenticated API user's reaction to a channel or thread message. The
   * reacting user cannot be overridden: callers can only add their own reaction.
   * Repeating the same reaction is idempotent. The caller must be a channel member.
   * Returns the updated message.
   *
   * The reaction must be an emoji available in the Datagrid emoji picker, supplied
   * either as a shortcode (`:+1:`) or as the unicode character (`👍`). Shortcodes
   * are resolved to the unicode character before storage, so a reaction added
   * through the API groups together with the same emoji added in the app. Anything
   * else is rejected with a 400.
   */
  addReaction(
    channelId: string,
    messageId: string,
    body: ChannelAddReactionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelMessage> {
    return this._client.post(`/channels/${channelId}/messages/${messageId}/reactions`, { body, ...options });
  }

  /**
   * Posts as the authenticated API user, who must be a channel member. Eligible
   * channel agents may respond and consume credits.
   */
  createMessage(
    channelId: string,
    body: ChannelCreateMessageParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelMessage> {
    return this._client.post(`/channels/${channelId}/messages`, { body, ...options });
  }

  /**
   * Returns the existing thread when the message already has one.
   */
  createThread(
    channelId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelThread> {
    return this._client.post(`/channels/${channelId}/messages/${messageId}/threads`, options);
  }

  /**
   * Posts as the authenticated API user, who must be a channel member. Eligible
   * channel agents may respond and consume credits.
   */
  createThreadMessage(
    channelId: string,
    threadId: string,
    body: ChannelCreateThreadMessageParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelMessage> {
    return this._client.post(`/channels/${channelId}/threads/${threadId}/messages`, { body, ...options });
  }

  /**
   * List channel members
   */
  listMembers(
    channelId: string,
    query?: ChannelListMembersParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMembersCursorIDPage, ChannelMember>;
  listMembers(
    channelId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMembersCursorIDPage, ChannelMember>;
  listMembers(
    channelId: string,
    query: ChannelListMembersParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMembersCursorIDPage, ChannelMember> {
    if (isRequestOptions(query)) {
      return this.listMembers(channelId, {}, query);
    }
    return this._client.getAPIList(`/channels/${channelId}/members`, ChannelMembersCursorIDPage, {
      query,
      ...options,
    });
  }

  /**
   * List channel messages
   */
  listMessages(
    channelId: string,
    query?: ChannelListMessagesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage>;
  listMessages(
    channelId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage>;
  listMessages(
    channelId: string,
    query: ChannelListMessagesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage> {
    if (isRequestOptions(query)) {
      return this.listMessages(channelId, {}, query);
    }
    return this._client.getAPIList(`/channels/${channelId}/messages`, ChannelMessagesCursorIDPage, {
      query,
      ...options,
    });
  }

  /**
   * List thread messages
   */
  listThreadMessages(
    channelId: string,
    threadId: string,
    query?: ChannelListThreadMessagesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage>;
  listThreadMessages(
    channelId: string,
    threadId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage>;
  listThreadMessages(
    channelId: string,
    threadId: string,
    query: ChannelListThreadMessagesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelMessagesCursorIDPage, ChannelMessage> {
    if (isRequestOptions(query)) {
      return this.listThreadMessages(channelId, threadId, {}, query);
    }
    return this._client.getAPIList(
      `/channels/${channelId}/threads/${threadId}/messages`,
      ChannelMessagesCursorIDPage,
      { query, ...options },
    );
  }

  /**
   * List channel threads
   */
  listThreads(
    channelId: string,
    query?: ChannelListThreadsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelThreadsCursorIDPage, ChannelThread>;
  listThreads(
    channelId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelThreadsCursorIDPage, ChannelThread>;
  listThreads(
    channelId: string,
    query: ChannelListThreadsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ChannelThreadsCursorIDPage, ChannelThread> {
    if (isRequestOptions(query)) {
      return this.listThreads(channelId, {}, query);
    }
    return this._client.getAPIList(`/channels/${channelId}/threads`, ChannelThreadsCursorIDPage, {
      query,
      ...options,
    });
  }

  /**
   * Remove channel member
   */
  removeMember(channelId: string, memberId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/channels/${channelId}/members/${memberId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Removes the authenticated API user's reaction from a channel or thread message.
   * Callers cannot remove another user's reaction; a delete only clears the caller's
   * own entry for that emoji. Removing a reaction that is not present is idempotent.
   * The caller must be a channel member. Returns the updated message.
   *
   * Accepts the same values as adding a reaction: a shortcode (`:+1:`) or the
   * unicode character (`👍`), resolved to the same stored emoji.
   */
  removeReaction(
    channelId: string,
    messageId: string,
    reaction: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelMessage> {
    return this._client.delete(`/channels/${channelId}/messages/${messageId}/reactions/${reaction}`, options);
  }

  /**
   * Retrieve channel thread
   */
  retrieveThread(
    channelId: string,
    threadId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChannelThread> {
    return this._client.get(`/channels/${channelId}/threads/${threadId}`, options);
  }
}

export class ChannelsCursorIDPage extends CursorIDPage<Channel> {}

export class ChannelMembersCursorIDPage extends CursorIDPage<ChannelMember> {}

export class ChannelMessagesCursorIDPage extends CursorIDPage<ChannelMessage> {}

export class ChannelThreadsCursorIDPage extends CursorIDPage<ChannelThread> {}

export interface Channel {
  id: string;

  created_at: string;

  description: string | null;

  name: string;

  object: 'channel';

  teamspace_id: string;

  type: 'channel';

  updated_at: string;
}

export interface ChannelMember {
  id: string;

  actor: ChannelMember.Actor;

  channel_id: string;

  created_at: string;

  object: 'channel.member';
}

export namespace ChannelMember {
  export interface Actor {
    id: string;

    type: 'user' | 'agent';

    email?: string | null;

    name?: string | null;
  }
}

export interface ChannelMessage {
  id: string;

  agent_id: string;

  channel_id: string;

  /**
   * Array of citations that provide sources for factual statements in the response.
   * Each citation includes the referenced text and its sources.
   */
  citations: Array<ChannelMessage.Citation> | null;

  content: Array<
    | ChannelMessage.MessageContentText
    | ChannelMessage.MessageContentJson
    | ChannelMessage.MessageContentVoice
    | ChannelMessage.MessageContentFile
  >;

  created_at: string;

  credits: ChannelMessage.Credits | null;

  object: 'channel.message';

  /**
   * Reactions grouped by emoji, ordered by first reaction time.
   */
  reactions: Array<ChannelMessage.Reaction>;

  reply_count: number;

  role: 'user' | 'agent';

  thread_id: string | null;
}

export namespace ChannelMessage {
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

  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }

  export interface Reaction {
    /**
     * Emoji shortcode or unicode emoji.
     */
    reaction: string;

    users: Array<Reaction.User>;
  }

  export namespace Reaction {
    export interface User {
      created_at: string;

      user_id: string;
    }
  }
}

export interface ChannelThread {
  id: string;

  channel_id: string;

  created_at: string;

  object: 'thread';

  updated_at: string;

  name?: string | null;

  root_message_id?: string | null;
}

export interface ChannelAddMembersResponse {
  data: Array<ChannelMember>;

  object: 'list';

  has_more?: boolean;
}

export interface ChannelCreateParams {
  /**
   * Channel name. Names longer than 50 characters are truncated.
   */
  name: string;

  description?: string | null;
}

export interface ChannelUpdateParams {
  description?: string | null;

  /**
   * Channel name. Names longer than 50 characters are truncated.
   */
  name?: string;
}

export interface ChannelListParams extends CursorIDPageParams {
  /**
   * Case-insensitive channel-name substring.
   */
  q?: string;

  /**
   * Filter by channel type. Only shared named channels are available in v1.
   */
  type?: 'channel';
}

export interface ChannelAddMembersParams {
  actors: Array<ChannelAddMembersParams.Actor>;
}

export namespace ChannelAddMembersParams {
  export interface Actor {
    id: string;

    type: 'user' | 'agent';
  }
}

export interface ChannelAddReactionParams {
  /**
   * Emoji shortcode (for example `:+1:` or `:heart:`) or unicode emoji (`👍`). Must
   * be an emoji offered by the Datagrid emoji picker; shortcodes are stored as their
   * unicode character so API and in-app reactions group together. Always attributed
   * to the authenticated API user; there is no field to react as another user.
   */
  reaction: string;
}

export interface ChannelCreateMessageParams {
  content: string;

  file_ids?: Array<string> | null;
}

export interface ChannelCreateThreadMessageParams {
  content: string;

  file_ids?: Array<string> | null;
}

export interface ChannelListMembersParams extends CursorIDPageParams {
  actor_type?: 'user' | 'agent';

  /**
   * Case-insensitive actor-name substring.
   */
  q?: string;
}

export interface ChannelListMessagesParams extends CursorIDPageParams {}

export interface ChannelListThreadMessagesParams extends CursorIDPageParams {}

export interface ChannelListThreadsParams extends CursorIDPageParams {}

Channels.ChannelsCursorIDPage = ChannelsCursorIDPage;
Channels.ChannelMembersCursorIDPage = ChannelMembersCursorIDPage;
Channels.ChannelMessagesCursorIDPage = ChannelMessagesCursorIDPage;
Channels.ChannelThreadsCursorIDPage = ChannelThreadsCursorIDPage;

export declare namespace Channels {
  export {
    type Channel as Channel,
    type ChannelMember as ChannelMember,
    type ChannelMessage as ChannelMessage,
    type ChannelThread as ChannelThread,
    type ChannelAddMembersResponse as ChannelAddMembersResponse,
    ChannelsCursorIDPage as ChannelsCursorIDPage,
    ChannelMembersCursorIDPage as ChannelMembersCursorIDPage,
    ChannelMessagesCursorIDPage as ChannelMessagesCursorIDPage,
    ChannelThreadsCursorIDPage as ChannelThreadsCursorIDPage,
    type ChannelCreateParams as ChannelCreateParams,
    type ChannelUpdateParams as ChannelUpdateParams,
    type ChannelListParams as ChannelListParams,
    type ChannelAddMembersParams as ChannelAddMembersParams,
    type ChannelAddReactionParams as ChannelAddReactionParams,
    type ChannelCreateMessageParams as ChannelCreateMessageParams,
    type ChannelCreateThreadMessageParams as ChannelCreateThreadMessageParams,
    type ChannelListMembersParams as ChannelListMembersParams,
    type ChannelListMessagesParams as ChannelListMessagesParams,
    type ChannelListThreadMessagesParams as ChannelListThreadMessagesParams,
    type ChannelListThreadsParams as ChannelListThreadsParams,
  };
}
