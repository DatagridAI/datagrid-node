// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class OrchestratorTasks extends APIResource {
  /**
   * Retrieve voice orchestrator task
   */
  retrieve(taskId: string, options?: Core.RequestOptions): Core.APIPromise<VoiceOrchestratorTask> {
    return this._client.get(`/voice-orchestrator/tasks/${taskId}`, options);
  }

  /**
   * List delegated voice tasks for the authenticated user. By default this returns
   * active, non-expired queued or running tasks plus unacknowledged terminal tasks
   * and omits task result content from list views. Pass an explicit status filter to
   * request a specific task state. A `cancelled` status marks tasks stopped via the
   * cancel endpoint (`PATCH /voice-orchestrator/tasks/{task_id}/cancel`).
   */
  list(
    query?: OrchestratorTaskListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceOrchestratorTaskList>;
  list(options?: Core.RequestOptions): Core.APIPromise<VoiceOrchestratorTaskList>;
  list(
    query: OrchestratorTaskListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceOrchestratorTaskList> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/voice-orchestrator/tasks', { query, ...options });
  }

  /**
   * Acknowledge voice orchestrator task
   */
  acknowledge(taskId: string, options?: Core.RequestOptions): Core.APIPromise<VoiceOrchestratorTask> {
    return this._client.patch(`/voice-orchestrator/tasks/${taskId}/acknowledge`, options);
  }

  /**
   * Cancel voice orchestrator task
   */
  cancel(taskId: string, options?: Core.RequestOptions): Core.APIPromise<VoiceOrchestratorTask> {
    return this._client.patch(`/voice-orchestrator/tasks/${taskId}/cancel`, options);
  }
}

export interface VoiceOrchestratorTask {
  created_at: string;

  expires_at: string;

  /**
   * `cancelled` is reserved for terminal task records produced by future
   * cancellation flows; this API does not currently expose a cancel operation.
   */
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

  task: string;

  task_id: string;

  updated_at: string;

  acknowledged_at?: string;

  agent_id?: string;

  completed_at?: string;

  conversation_id?: string;

  error_message?: string;

  /**
   * Present when this task was created by follow_up_task to continue an earlier
   * delegated task.
   */
  parent_task_id?: string;

  /**
   * Present on retrieve responses when the delegated agent halted on an
   * approval-required action that is still awaiting user review. Omitted from list
   * responses and once the action has been submitted.
   */
  pending_action?: VoiceOrchestratorTask.PendingAction;

  /**
   * Present on retrieve responses when a user-owned task has a result. Omitted from
   * list responses.
   */
  result?: string;
}

export namespace VoiceOrchestratorTask {
  /**
   * Present on retrieve responses when the delegated agent halted on an
   * approval-required action that is still awaiting user review. Omitted from list
   * responses and once the action has been submitted.
   */
  export interface PendingAction {
    action_name: string;

    agent_explanation: string;

    payload_id: string;

    connector_id?: string;

    submit_button_text?: string;

    tool_id?: string;
  }
}

export interface VoiceOrchestratorTaskList {
  data: Array<VoiceOrchestratorTask>;

  /**
   * The first task ID in this bounded list response, or null when the list is empty.
   */
  first_id: string | null;

  /**
   * Always false for the bounded voice task inbox.
   */
  has_more: boolean;

  /**
   * The last task ID in this bounded list response, or null when the list is empty.
   */
  last_id: string | null;

  object: 'list';
}

export interface OrchestratorTaskListParams {
  conversation_id?: string;

  limit?: number;

  /**
   * Status filter. Repeat the parameter for multiple statuses
   * (`?status=queued&status=running`); comma-separated values are also accepted.
   * Supported values: queued, running, completed, failed, cancelled.
   */
  status?: Array<string>;
}

export declare namespace OrchestratorTasks {
  export {
    type VoiceOrchestratorTask as VoiceOrchestratorTask,
    type VoiceOrchestratorTaskList as VoiceOrchestratorTaskList,
    type OrchestratorTaskListParams as OrchestratorTaskListParams,
  };
}
