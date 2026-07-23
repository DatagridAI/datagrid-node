// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorIDPage, type CursorIDPageParams } from '../../pagination';

export class Automations extends APIResource {
  /**
   * Create a new `runAgent` automation for the specified agent. The automation will
   * fire on the provided cron schedule (in the given IANA timezone) and run the
   * agent with the supplied prompt. Schedules must fire at most once every 15
   * minutes — finer-grained expressions are rejected with a 400 error.
   *
   * @example
   * ```ts
   * const automation = await client.agents.automations.create(
   *   'agent_id',
   *   {
   *     cron: '0 9 * * 1',
   *     name: 'name',
   *     prompt: 'prompt',
   *   },
   * );
   * ```
   */
  create(
    agentId: string,
    body: AutomationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Automation> {
    return this._client.post(`/agents/${agentId}/automations`, { body, ...options });
  }

  /**
   * Get details of a specific automation belonging to an agent.
   *
   * @example
   * ```ts
   * const automation = await client.agents.automations.retrieve(
   *   'agent_id',
   *   'automation_id',
   * );
   * ```
   */
  retrieve(
    agentId: string,
    automationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Automation> {
    return this._client.get(`/agents/${agentId}/automations/${automationId}`, options);
  }

  /**
   * Update an existing automation. All fields are optional — only supplied fields
   * are changed. Updating `cron` or `timezone` triggers the same 15-minute
   * minimum-interval validation as creation.
   *
   * @example
   * ```ts
   * const automation = await client.agents.automations.update(
   *   'agent_id',
   *   'automation_id',
   * );
   * ```
   */
  update(
    agentId: string,
    automationId: string,
    body: AutomationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Automation> {
    return this._client.patch(`/agents/${agentId}/automations/${automationId}`, { body, ...options });
  }

  /**
   * List all `runAgent` automations that belong to the specified agent. Returns
   * automations in reverse-chronological order (newest first). Use the cursor
   * pagination parameters (`limit`, `after`, `before`) to page through large result
   * sets.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const automation of client.agents.automations.list(
   *   'agent_id',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    agentId: string,
    query?: AutomationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AutomationsCursorIDPage, Automation>;
  list(agentId: string, options?: Core.RequestOptions): Core.PagePromise<AutomationsCursorIDPage, Automation>;
  list(
    agentId: string,
    query: AutomationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AutomationsCursorIDPage, Automation> {
    if (isRequestOptions(query)) {
      return this.list(agentId, {}, query);
    }
    return this._client.getAPIList(`/agents/${agentId}/automations`, AutomationsCursorIDPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete an automation. The automation is soft-deleted: it stops firing and no
   * longer appears in list or retrieve responses, but its past run history is
   * retained. The agent and its other automations are not affected. Scheduled runs
   * that are already queued may still execute before the deletion propagates.
   *
   * @example
   * ```ts
   * await client.agents.automations.delete(
   *   'agent_id',
   *   'automation_id',
   * );
   * ```
   */
  delete(agentId: string, automationId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/agents/${agentId}/automations/${automationId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class AutomationsCursorIDPage extends CursorIDPage<Automation> {}

export interface Automation {
  /**
   * Unique identifier for the automation.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the automation was created.
   */
  created_at: string;

  /**
   * Five-field cron expression controlling when the automation fires (e.g.
   * `"0 9 * * 1"` = every Monday at 09:00). Seconds are not supported. Must have a
   * minimum inter-fire interval of 15 minutes.
   */
  cron: string | null;

  /**
   * Optional free-text description of what this automation does.
   */
  description: string | null;

  /**
   * Whether the automation is active. When `false` the cron trigger is paused and no
   * runs are scheduled until it is re-enabled.
   */
  enabled: boolean;

  /**
   * Human-readable name of the automation.
   */
  name: string;

  /**
   * The object type, always 'automation'.
   */
  object: 'automation';

  /**
   * The instruction text sent to the agent each time the automation fires. Supports
   * Markdown.
   */
  prompt: string | null;

  /**
   * Controls whether each scheduled run creates a fresh conversation thread or
   * continues in the same persistent conversation.
   *
   * - `new_thread` — (default) Each run starts a new conversation. Results are
   *   isolated; the agent has no memory of prior runs unless it uses agent memory
   *   tools.
   * - `same_conversation` — Every run appends to the same conversation thread. The
   *   agent sees the full history of prior runs, which is useful for incremental
   *   summaries or stateful workflows.
   */
  thread_mode: 'new_thread' | 'same_conversation' | null;

  /**
   * IANA timezone identifier in which `cron` is interpreted (e.g.
   * `"America/New_York"`, `"UTC"`). Defaults to `"UTC"` when not provided on create.
   */
  timezone: string | null;

  /**
   * The channel ID or user ID that identifies the destination. Required when
   * `destination_type` is `channel` or `user_dm`; omit for `agent_dm`.
   */
  destination_id?: string | null;

  /**
   * Where the automation's conversation runs and results are delivered.
   *
   * - `agent_dm` — (default) Results are posted in the agent's own DM space. No
   *   `destination_id` is required.
   * - `channel` — Results are posted in a specific Datagrid channel. Provide the
   *   channel ID in `destination_id`.
   * - `user_dm` — Results are sent as a direct message to a specific user. Provide
   *   the user ID in `destination_id`.
   */
  destination_type?: 'agent_dm' | 'channel' | 'user_dm' | null;

  /**
   * Controls when users are notified about automation run outcomes.
   *
   * - `always` — Notify after every run regardless of success or failure. -
   *   `on_failure` — (default) Notify only when a run fails or produces an error.
   * - `never` — Do not send notifications for this automation.
   */
  notification_preference?: 'always' | 'on_failure' | 'never' | null;

  /**
   * ID of an additional delivery channel (Slack channel, Teams channel, email
   * address, etc.) where automation results are also posted.
   */
  output_channel_id?: string | null;

  /**
   * The transport type of the output channel. One of `"email"`, `"slack"`,
   * `"teams"`, `"sms"`.
   */
  output_channel_type?: string | null;

  /**
   * IDs of files attached to the automation prompt. These files are provided as
   * context to the agent on every run.
   */
  prompt_file_ids?: Array<string> | null;

  /**
   * ISO 8601 timestamp of the last modification.
   */
  updated_at?: string | null;
}

export interface AutomationCreateParams {
  /**
   * Five-field cron expression (minute hour day month day-of-week) controlling when
   * the automation fires. Seconds are not supported. The schedule must fire at most
   * once every 15 minutes — finer-grained expressions are rejected with a 400 error.
   */
  cron: string;

  /**
   * Human-readable name for the automation.
   */
  name: string;

  /**
   * The instruction text sent to the agent each time the automation fires. Supports
   * Markdown. This is the agent's task for the run. Must not be empty or
   * whitespace-only.
   */
  prompt: string;

  /**
   * Optional free-text description of what this automation does.
   */
  description?: string | null;

  /**
   * The channel ID or user ID for the conversation destination. Required when
   * `destination_type` is `channel` or `user_dm`; omit for `agent_dm`.
   */
  destination_id?: string | null;

  /**
   * Where the automation's conversation runs and results are delivered.
   *
   * - `agent_dm` — (default) Results are posted in the agent's own DM space. No
   *   `destination_id` is required.
   * - `channel` — Results are posted in a specific Datagrid channel. Provide the
   *   channel ID in `destination_id`.
   * - `user_dm` — Results are sent as a direct message to a specific user. Provide
   *   the user ID in `destination_id`.
   */
  destination_type?: 'agent_dm' | 'channel' | 'user_dm' | null;

  /**
   * Whether the automation should be active immediately after creation. Defaults to
   * `true` when omitted or null. Set to `false` to create the automation in a paused
   * state — it will not fire until explicitly enabled via the Update automation
   * endpoint.
   */
  enabled?: boolean | null;

  /**
   * Controls when users are notified about automation run outcomes.
   *
   * - `always` — Notify after every run regardless of success or failure. -
   *   `on_failure` — (default) Notify only when a run fails or produces an error.
   * - `never` — Do not send notifications for this automation.
   */
  notification_preference?: 'always' | 'on_failure' | 'never' | null;

  /**
   * ID of an additional delivery channel (Slack, Teams, email, etc.) where the
   * agent's output is also delivered after each run. Must be provided together with
   * `output_channel_type` — supplying one without the other is rejected with a 400
   * error. This is an external transport address, not a Datagrid-owned resource —
   * it's validated against the caller's own connected integrations at delivery time.
   */
  output_channel_id?: string | null;

  /**
   * Transport type of `output_channel_id`. One of `"email"`, `"slack"`, `"teams"`,
   * `"sms"`. Must be provided together with `output_channel_id`.
   */
  output_channel_type?: 'email' | 'slack' | 'teams' | 'sms' | null;

  /**
   * IDs of files to attach as context for every run of this automation. Each file
   * must exist and belong to the caller's teamspace, or the request is rejected with
   * a 404 error. Limited to 20 IDs per request.
   */
  prompt_file_ids?: Array<string> | null;

  /**
   * Controls whether each scheduled run creates a fresh conversation thread or
   * continues in the same persistent conversation.
   *
   * - `new_thread` — (default) Each run starts a new conversation. Results are
   *   isolated; the agent has no memory of prior runs unless it uses agent memory
   *   tools.
   * - `same_conversation` — Every run appends to the same conversation thread. The
   *   agent sees the full history of prior runs, which is useful for incremental
   *   summaries or stateful workflows.
   */
  thread_mode?: 'new_thread' | 'same_conversation' | null;

  /**
   * IANA timezone identifier in which `cron` is interpreted. Defaults to `"UTC"`
   * when omitted.
   */
  timezone?: string | null;
}

export interface AutomationUpdateParams {
  /**
   * Updated five-field cron expression. The same 15-minute minimum interval rule
   * applies. Pass `null` to leave the schedule unchanged.
   */
  cron?: string | null;

  /**
   * Updated description.
   */
  description?: string | null;

  /**
   * Updated destination channel or user ID.
   */
  destination_id?: string | null;

  /**
   * Where the automation's conversation runs and results are delivered.
   *
   * - `agent_dm` — (default) Results are posted in the agent's own DM space. No
   *   `destination_id` is required.
   * - `channel` — Results are posted in a specific Datagrid channel. Provide the
   *   channel ID in `destination_id`.
   * - `user_dm` — Results are sent as a direct message to a specific user. Provide
   *   the user ID in `destination_id`.
   */
  destination_type?: 'agent_dm' | 'channel' | 'user_dm' | null;

  /**
   * Set to `true` to resume scheduling; `false` to pause. Pausing does not delete
   * the automation or its history. Null is treated as unset (no change).
   */
  enabled?: boolean | null;

  /**
   * Updated human-readable name for the automation.
   */
  name?: string | null;

  /**
   * Controls when users are notified about automation run outcomes.
   *
   * - `always` — Notify after every run regardless of success or failure. -
   *   `on_failure` — (default) Notify only when a run fails or produces an error.
   * - `never` — Do not send notifications for this automation.
   */
  notification_preference?: 'always' | 'on_failure' | 'never' | null;

  /**
   * Updated output delivery channel ID. Must be provided together with
   * `output_channel_type` in the resulting configuration — supplying one without the
   * other is rejected with a 400 error. This is an external transport address, not a
   * Datagrid-owned resource — it's validated against the caller's own connected
   * integrations at delivery time.
   */
  output_channel_id?: string | null;

  /**
   * Updated transport type for the output channel. One of `"email"`, `"slack"`,
   * `"teams"`, `"sms"`. Must be provided together with `output_channel_id` in the
   * resulting configuration.
   */
  output_channel_type?: 'email' | 'slack' | 'teams' | 'sms' | null;

  /**
   * Updated instruction text for the agent. Pass `null` to leave unchanged. Must not
   * be empty or whitespace-only.
   */
  prompt?: string | null;

  /**
   * Updated list of file IDs to attach as context. Each file must exist and belong
   * to the caller's teamspace, or the request is rejected with a 404 error. Limited
   * to 20 IDs per request.
   */
  prompt_file_ids?: Array<string> | null;

  /**
   * Controls whether each scheduled run creates a fresh conversation thread or
   * continues in the same persistent conversation.
   *
   * - `new_thread` — (default) Each run starts a new conversation. Results are
   *   isolated; the agent has no memory of prior runs unless it uses agent memory
   *   tools.
   * - `same_conversation` — Every run appends to the same conversation thread. The
   *   agent sees the full history of prior runs, which is useful for incremental
   *   summaries or stateful workflows.
   */
  thread_mode?: 'new_thread' | 'same_conversation' | null;

  /**
   * Updated IANA timezone. Pass `null` to leave unchanged.
   */
  timezone?: string | null;
}

export interface AutomationListParams extends CursorIDPageParams {}

Automations.AutomationsCursorIDPage = AutomationsCursorIDPage;

export declare namespace Automations {
  export {
    type Automation as Automation,
    AutomationsCursorIDPage as AutomationsCursorIDPage,
    type AutomationCreateParams as AutomationCreateParams,
    type AutomationUpdateParams as AutomationUpdateParams,
    type AutomationListParams as AutomationListParams,
  };
}
