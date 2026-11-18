// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class AgenticAutomations extends APIResource {
  /**
   * Create a scheduled automation for an agent. The automation fires on the given
   * cron schedule and runs the agent. `agent_id` is in the body. Schedules must fire
   * at most once every 15 minutes.
   *
   * @example
   * ```ts
   * const agenticAutomation =
   *   await client.agenticAutomations.createScheduled({
   *     agent_id: 'agent_id',
   *     cron: '0 9 * * 1',
   *     name: 'name',
   *   });
   * ```
   */
  createScheduled(
    body: AgenticAutomationCreateScheduledParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgenticAutomation> {
    return this._client.post('/agentic-automations/scheduled', { body, ...options });
  }
}

export interface AgenticAutomation {
  /**
   * Unique identifier for the automation.
   */
  id: string;

  /**
   * The ID of the agent this automation runs.
   */
  agent_id: string;

  /**
   * App-event fields. Null for a scheduled automation.
   */
  app_event: unknown | null;

  /**
   * ISO 8601 timestamp of when the automation was created.
   */
  created_at: string;

  /**
   * The user who created the automation.
   */
  creator_user_id: string;

  /**
   * Free-text description of what this automation does.
   */
  description: string | null;

  /**
   * Whether the automation is active. When `false` the schedule is paused.
   */
  enabled: boolean;

  /**
   * What the automation is. `scheduled` for this route.
   */
  kind: 'scheduled';

  /**
   * ISO 8601 timestamp of the latest run. Null until a run exists.
   */
  last_run_at: string | null;

  /**
   * The user who last updated the automation.
   */
  last_updated_by_id: string;

  /**
   * Human-readable name of the automation.
   */
  name: string;

  /**
   * The object type, always 'agentic_automation'.
   */
  object: 'agentic_automation';

  /**
   * Additional delivery address, when one is stored. Not set by this route.
   */
  output_channel_id: string | null;

  /**
   * Additional delivery transport, when one is stored. Not set by this route.
   */
  output_channel_type: string | null;

  scheduled: AgenticAutomation.Scheduled;

  /**
   * ISO 8601 timestamp of the last modification.
   */
  updated_at: string;
}

export namespace AgenticAutomation {
  export interface Scheduled {
    /**
     * Five-field cron expression the automation fires on.
     */
    cron: string;

    /**
     * Human-readable reading of `cron`, when one is stored.
     */
    cron_description: string | null;

    /**
     * Datagrid conversation destination id, when one is stored.
     */
    destination_id: string | null;

    /**
     * Datagrid conversation destination, when one is stored.
     */
    destination_type: string | null;

    /**
     * How the run's conversation is reused, when one is stored.
     */
    thread_mode: string | null;

    /**
     * IANA timezone `cron` is interpreted in.
     */
    timezone: string;
  }
}

export interface AgenticAutomationCreateScheduledParams {
  /**
   * The ID of the agent this automation runs.
   */
  agent_id: string;

  /**
   * Five-field cron expression (minute hour day month day-of-week) controlling when
   * the automation fires. Seconds are not supported. The schedule must fire at most
   * once every 15 minutes.
   */
  cron: string;

  /**
   * Human-readable name for the automation.
   */
  name: string;

  /**
   * Optional free-text description of what this automation does.
   */
  description?: string | null;

  /**
   * Whether the automation should be active immediately after creation. Defaults to
   * `true` when omitted or null.
   */
  enabled?: boolean | null;

  /**
   * IANA timezone identifier in which `cron` is interpreted. Defaults to `"UTC"`
   * when omitted.
   */
  timezone?: string | null;
}

export declare namespace AgenticAutomations {
  export {
    type AgenticAutomation as AgenticAutomation,
    type AgenticAutomationCreateScheduledParams as AgenticAutomationCreateScheduledParams,
  };
}
