// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class EventTriggers extends APIResource {
  /**
   * Create an event trigger for the specified agent so it runs automatically when
   * the configured provider event fires. Prerequisite gaps that do not prevent the
   * trigger from being saved (e.g. a missing Procore company/project mapping or
   * credentials) are returned in the `warnings` array on the response rather than
   * failing the request. An agent may only have one event trigger — attempting to
   * create a second is rejected with a 409 error.
   *
   * @example
   * ```ts
   * const eventTrigger =
   *   await client.agents.eventTriggers.create('agent_id', {
   *     enabled: true,
   *     trigger_event: 'trigger_event',
   *     trigger_source: 'procore',
   *   });
   * ```
   */
  create(
    agentId: string,
    body: EventTriggerCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EventTriggerCreateResponse> {
    return this._client.post(`/agents/${agentId}/event-triggers`, { body, ...options });
  }

  /**
   * Update an existing event trigger on the specified agent. Only the fields
   * supplied in the request body are changed; omitted fields keep their current
   * value. Use `enabled` to pause (`false`) or resume (`true`) the trigger. As with
   * creation, non-fatal prerequisite gaps are returned in the `warnings` array
   * rather than failing the request.
   *
   * @example
   * ```ts
   * const eventTrigger =
   *   await client.agents.eventTriggers.update(
   *     'agent_id',
   *     'trigger_id',
   *   );
   * ```
   */
  update(
    agentId: string,
    triggerId: string,
    body: EventTriggerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EventTriggerUpdateResponse> {
    return this._client.patch(`/agents/${agentId}/event-triggers/${triggerId}`, { body, ...options });
  }

  /**
   * List the App Event automations (event triggers) configured for the specified
   * agent. An event trigger fires the agent in response to an external provider
   * event (e.g. a Procore webhook such as `Tasks:create`). An agent has at most one
   * event trigger, so the returned list contains zero or one item and `has_more` is
   * always `false`.
   *
   * @example
   * ```ts
   * const eventTriggers =
   *   await client.agents.eventTriggers.list('agent_id');
   * ```
   */
  list(agentId: string, options?: Core.RequestOptions): Core.APIPromise<EventTriggerListResponse> {
    return this._client.get(`/agents/${agentId}/event-triggers`, options);
  }

  /**
   * Delete an event trigger from the specified agent. This unregisters the
   * underlying provider webhook subscription and stops the agent from running in
   * response to the event.
   *
   * @example
   * ```ts
   * await client.agents.eventTriggers.delete(
   *   'agent_id',
   *   'trigger_id',
   * );
   * ```
   */
  delete(agentId: string, triggerId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/agents/${agentId}/event-triggers/${triggerId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface AgentEventTrigger {
  /**
   * Unique identifier for the event trigger.
   */
  id: string;

  /**
   * ISO 8601 timestamp of when the event trigger was created.
   */
  created_at: string;

  /**
   * User-provided description of what the App Event automation does.
   */
  description: string | null;

  /**
   * Whether the trigger is active. When `false` the agent does not run in response
   * to the event until it is re-enabled.
   */
  enabled: boolean;

  /**
   * User-provided name for the App Event automation.
   */
  name: string | null;

  /**
   * The object type, always 'event_trigger'.
   */
  object: 'event_trigger';

  /**
   * Controls how the agent's response conversation is threaded when the trigger
   * fires. `create_new_thread_each_time` starts a fresh thread for every event; when
   * omitted, responses reuse a single thread.
   */
  response_thread: 'create_new_thread_each_time' | null;

  /**
   * Optional natural-language conditions that must hold for the agent to run when
   * the event fires. When null, the agent runs on every matching event.
   */
  run_conditions: string | null;

  /**
   * The event that fires the agent, in `"ResourceName:eventType"` format (e.g.
   * `"Tasks:create"`, `"Project Users:update"`).
   */
  trigger_event: string;

  /**
   * The external provider that emits the event.
   */
  trigger_source: 'procore' | 'sharepoint' | 'egnyte';

  /**
   * ISO 8601 timestamp of the last modification to the event trigger.
   */
  updated_at: string;
}

export interface EventTriggerCreateResponse extends AgentEventTrigger {
  /**
   * Non-fatal issues surfaced while wiring up the trigger (e.g. Procore
   * company/project/credential prerequisite gaps). An empty array means the trigger
   * was configured with no issues. Each entry pairs a stable machine-readable `code`
   * with a human-readable `message`.
   */
  warnings: Array<EventTriggerCreateResponse.Warning>;
}

export namespace EventTriggerCreateResponse {
  export interface Warning {
    /**
     * Stable machine-readable identifier for the warning (e.g.
     * `procore_not_connected`, `registration_failed`). Safe to branch on without
     * parsing `message`.
     */
    code: string;

    /**
     * Human-readable explanation of the warning.
     */
    message: string;
  }
}

export interface EventTriggerUpdateResponse extends AgentEventTrigger {
  /**
   * Non-fatal issues surfaced while wiring up the trigger (e.g. Procore
   * company/project/credential prerequisite gaps). An empty array means the trigger
   * was configured with no issues. Each entry pairs a stable machine-readable `code`
   * with a human-readable `message`.
   */
  warnings: Array<EventTriggerUpdateResponse.Warning>;
}

export namespace EventTriggerUpdateResponse {
  export interface Warning {
    /**
     * Stable machine-readable identifier for the warning (e.g.
     * `procore_not_connected`, `registration_failed`). Safe to branch on without
     * parsing `message`.
     */
    code: string;

    /**
     * Human-readable explanation of the warning.
     */
    message: string;
  }
}

export interface EventTriggerListResponse {
  /**
   * Array of event trigger objects for the agent (zero or one).
   */
  data: Array<AgentEventTrigger>;

  /**
   * Always `false` — an agent has at most one event trigger, so results are never
   * paginated.
   */
  has_more: boolean;

  /**
   * The object type, always 'list'.
   */
  object: 'list';
}

export interface EventTriggerCreateParams {
  /**
   * Whether the trigger should be active immediately. Set to `false` to create it in
   * a paused state.
   */
  enabled: boolean;

  /**
   * The event that fires the agent, in `"ResourceName:eventType"` format (e.g.
   * `"Tasks:create"`). Required even when `enabled` is `false`.
   */
  trigger_event: string;

  /**
   * The external provider that emits the event.
   */
  trigger_source: 'procore' | 'sharepoint' | 'egnyte';

  /**
   * Optional description of what the App Event automation does.
   */
  description?: string | null;

  /**
   * Optional name for the App Event automation.
   */
  name?: string | null;

  /**
   * Controls how the agent's response conversation is threaded when the trigger
   * fires. `create_new_thread_each_time` starts a fresh thread for every event; when
   * omitted, responses reuse a single thread.
   */
  response_thread?: 'create_new_thread_each_time' | null;

  /**
   * Optional natural-language conditions that must hold for the agent to run when
   * the event fires.
   */
  run_conditions?: string | null;
}

export interface EventTriggerUpdateParams {
  /**
   * Updated description. Pass `null` to clear.
   */
  description?: string | null;

  /**
   * Set to `true` to resume the trigger; `false` to pause it.
   */
  enabled?: boolean;

  /**
   * Updated name. Pass `null` to clear.
   */
  name?: string | null;

  /**
   * Controls how the agent's response conversation is threaded when the trigger
   * fires. `create_new_thread_each_time` starts a fresh thread for every event; when
   * omitted, responses reuse a single thread.
   */
  response_thread?: 'create_new_thread_each_time' | null;

  /**
   * Updated run conditions. Pass `null` to clear.
   */
  run_conditions?: string | null;

  /**
   * Updated event in `"ResourceName:eventType"` format. Omit to leave the current
   * event unchanged.
   */
  trigger_event?: string;
}

export declare namespace EventTriggers {
  export {
    type AgentEventTrigger as AgentEventTrigger,
    type EventTriggerCreateResponse as EventTriggerCreateResponse,
    type EventTriggerUpdateResponse as EventTriggerUpdateResponse,
    type EventTriggerListResponse as EventTriggerListResponse,
    type EventTriggerCreateParams as EventTriggerCreateParams,
    type EventTriggerUpdateParams as EventTriggerUpdateParams,
  };
}
