// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { WebhookCursorPage, type WebhookCursorPageParams } from '../pagination';

export class Webhooks extends APIResource {
  /**
   * Create an HTTPS webhook subscription for your teamspace. Datagrid returns the
   * signing secret only in this response; store it securely and use it to verify
   * future `Datagrid-Signature` headers.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   events: [
   *     'batch_prediction.completed',
   *     'batch_prediction.failed',
   *   ],
   *   url: 'https://example.com/webhooks/datagrid',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<WebhookCreateResponse> {
    return this._client.post('/webhooks', { body, ...options });
  }

  /**
   * Retrieve a specific webhook subscription by ID.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.retrieve(
   *   'webhook_id',
   * );
   * ```
   */
  retrieve(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<Webhook> {
    return this._client.get(`/webhooks/${webhookId}`, options);
  }

  /**
   * Update webhook configuration. You can modify the URL, subscribed events, and
   * enabled status.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update('webhook_id');
   * ```
   */
  update(
    webhookId: string,
    body: WebhookUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Webhook> {
    return this._client.patch(`/webhooks/${webhookId}`, { body, ...options });
  }

  /**
   * Returns a cursor-paginated list of webhook subscriptions.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhook of client.webhooks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query?: WebhookListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhooksWebhookCursorPage, Webhook>;
  list(options?: Core.RequestOptions): Core.PagePromise<WebhooksWebhookCursorPage, Webhook>;
  list(
    query: WebhookListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<WebhooksWebhookCursorPage, Webhook> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/webhooks', WebhooksWebhookCursorPage, { query, ...options });
  }

  /**
   * Delete a webhook subscription.
   *
   * @example
   * ```ts
   * await client.webhooks.delete('webhook_id');
   * ```
   */
  delete(webhookId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/webhooks/${webhookId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Returns enabled webhook subscriptions for a specific event type.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.listActiveForEvent({
   *   event_type: 'knowledge.processing.completed',
   * });
   * ```
   */
  listActiveForEvent(
    query: WebhookListActiveForEventParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListActiveForEventResponse> {
    return this._client.get('/webhooks/active', { query, ...options });
  }
}

export class WebhooksWebhookCursorPage extends WebhookCursorPage<Webhook> {}

/**
 * The `webhook` object represents an outbound webhook subscription.
 */
export interface Webhook {
  /**
   * The webhook identifier.
   */
  id: string;

  /**
   * The ISO string for when the webhook was created.
   */
  created_at: string;

  /**
   * Whether delivery is enabled for this webhook.
   */
  enabled: boolean;

  /**
   * The subscribed event types. Currently delivered events include
   * `knowledge.processing.completed`, `batch_prediction.completed`,
   * `batch_prediction.failed`, `batch_prediction.expired`, and
   * `batch_prediction.cancelled`.
   */
  events: Array<
    | 'knowledge.processing.completed'
    | 'batch_prediction.completed'
    | 'batch_prediction.failed'
    | 'batch_prediction.expired'
    | 'batch_prediction.cancelled'
  >;

  /**
   * The object type, which is always `webhook`.
   */
  object: 'webhook';

  /**
   * The ISO string for when the webhook was last updated.
   */
  updated_at: string;

  /**
   * The destination URL for webhook deliveries.
   */
  url: string;
}

/**
 * JSON delivery envelope sent to your webhook endpoint when a subscribed event
 * occurs. Datagrid signs the raw JSON body with HMAC-SHA256 and sends the
 * signature in the `Datagrid-Signature` header.
 */
export interface WebhookEvent {
  /**
   * The unique event ID.
   */
  id: string;

  /**
   * Event-specific payload object. Batch prediction terminal events contain the same
   * `batch_prediction` object returned by the Retrieve batch prediction endpoint.
   */
  data: { [key: string]: unknown };

  event_type:
    | 'knowledge.processing.completed'
    | 'batch_prediction.completed'
    | 'batch_prediction.failed'
    | 'batch_prediction.expired'
    | 'batch_prediction.cancelled';

  /**
   * Unix timestamp in seconds used for signature verification.
   */
  timestamp: number;
}

/**
 * The `webhook` object represents an outbound webhook subscription.
 */
export interface WebhookCreateResponse extends Webhook {
  /**
   * The signing secret shown only when creating a webhook.
   */
  secret: string;
}

export interface WebhookListActiveForEventResponse {
  /**
   * An array containing active webhook subscriptions for the requested event.
   */
  data: Array<Webhook>;

  object: 'list';
}

export interface WebhookCreateParams {
  /**
   * List of event types to subscribe to. Currently delivered events include
   * `knowledge.processing.completed`, `batch_prediction.completed`,
   * `batch_prediction.failed`, `batch_prediction.expired`, and
   * `batch_prediction.cancelled`.
   */
  events: Array<
    | 'knowledge.processing.completed'
    | 'batch_prediction.completed'
    | 'batch_prediction.failed'
    | 'batch_prediction.expired'
    | 'batch_prediction.cancelled'
  >;

  /**
   * HTTPS destination URL for webhook deliveries.
   */
  url: string;
}

export interface WebhookUpdateParams {
  /**
   * Enable or disable webhook delivery.
   */
  enabled?: boolean;

  /**
   * Updated set of event type subscriptions. Currently delivered events include
   * `knowledge.processing.completed`, `batch_prediction.completed`,
   * `batch_prediction.failed`, `batch_prediction.expired`, and
   * `batch_prediction.cancelled`.
   */
  events?: Array<
    | 'knowledge.processing.completed'
    | 'batch_prediction.completed'
    | 'batch_prediction.failed'
    | 'batch_prediction.expired'
    | 'batch_prediction.cancelled'
  >;

  /**
   * Updated HTTPS destination URL.
   */
  url?: string;
}

export interface WebhookListParams extends WebhookCursorPageParams {}

export interface WebhookListActiveForEventParams {
  /**
   * The event type to filter by, for example `knowledge.processing.completed` or
   * `batch_prediction.completed`.
   */
  event_type:
    | 'knowledge.processing.completed'
    | 'batch_prediction.completed'
    | 'batch_prediction.failed'
    | 'batch_prediction.expired'
    | 'batch_prediction.cancelled';
}

Webhooks.WebhooksWebhookCursorPage = WebhooksWebhookCursorPage;

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookEvent as WebhookEvent,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookListActiveForEventResponse as WebhookListActiveForEventResponse,
    WebhooksWebhookCursorPage as WebhooksWebhookCursorPage,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookListActiveForEventParams as WebhookListActiveForEventParams,
  };
}
