// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as IFrameEventsAPI from './i-frame-events';

export class IFrameEvents extends APIResource {}

/**
 * The `connection` object represents an authenticated connection to a third-party
 * service (like Google Drive, Hubspot, Dropbox, etc.) that can be managed through
 * the API.
 */
export interface ConnectionPayload {
  /**
   * The connection identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The connector ID of the third-party service this connection authenticates with.
   */
  connector_id: string;

  /**
   * The ISO string for when the connection was created.
   */
  created_at: string;

  /**
   * The name of the connection.
   */
  name: string;

  /**
   * The object type, which is always `connection`.
   */
  object: 'connection';

  /**
   * The teamspace ID that owns this connection.
   */
  teamspace_id: string;

  /**
   * The ISO string for when the connection was last updated.
   */
  updated_at: string;

  /**
   * Whether the connection authentication is valid.
   */
  valid?: boolean;

  /**
   * The authentication value of the connection.
   */
  value?: string;
}

export interface ErrorPayload {
  /**
   * Error object
   */
  error: unknown | null;

  /**
   * Error message
   */
  message: string;
}

/**
 * Union type of all possible iframe events
 */
export type IFrameEvent =
  | IFrameEvent.ErrorIFrameEvent
  | IFrameEvent.ConnectionCreatedIFrameEvent
  | IFrameEvent.ConnectionUpdatedIFrameEvent
  | IFrameEvent.ContentLoadedIFrameEvent
  | IFrameEvent.ResizeIFrameEvent
  | IFrameEvent.KnowledgeCreatedIFrameEvent;

export namespace IFrameEvent {
  /**
   * Event emitted when an error occurs in the iframe
   */
  export interface ErrorIFrameEvent {
    payload: IFrameEventsAPI.ErrorPayload;

    type: 'datagrid-api/error';
  }

  /**
   * Event emitted when a new connection is successfully created
   */
  export interface ConnectionCreatedIFrameEvent {
    /**
     * The `connection` object represents an authenticated connection to a third-party
     * service (like Google Drive, Hubspot, Dropbox, etc.) that can be managed through
     * the API.
     */
    payload: IFrameEventsAPI.ConnectionPayload;

    type: 'datagrid-api/connection-created';
  }

  /**
   * Event emitted when an existing connection is successfully updated
   */
  export interface ConnectionUpdatedIFrameEvent {
    /**
     * The `connection` object represents an authenticated connection to a third-party
     * service (like Google Drive, Hubspot, Dropbox, etc.) that can be managed through
     * the API.
     */
    payload: IFrameEventsAPI.ConnectionPayload;

    type: 'datagrid-api/connection-updated';
  }

  /**
   * Event emitted when the iframe content has finished loading
   */
  export interface ContentLoadedIFrameEvent {
    /**
     * No payload for content loaded event
     */
    payload: unknown;

    type: 'datagrid-api/content-loaded';
  }

  /**
   * Event emitted when the iframe needs to be resized
   */
  export interface ResizeIFrameEvent {
    payload: IFrameEventsAPI.ResizePayload;

    type: 'datagrid-api/resize';
  }

  /**
   * Event emitted when a new knowledge is successfully created
   */
  export interface KnowledgeCreatedIFrameEvent {
    payload: IFrameEventsAPI.KnowledgeCreatedPayload;

    type: 'datagrid-api/knowledge-created';
  }
}

export type IFrameEventType =
  | 'datagrid-api/error'
  | 'datagrid-api/connection-created'
  | 'datagrid-api/connection-updated'
  | 'datagrid-api/content-loaded'
  | 'datagrid-api/resize'
  | 'datagrid-api/knowledge-created';

export interface KnowledgeCreatedPayload {
  /**
   * The ID of the knowledge that was created
   */
  knowledge_id: string;
}

export interface ResizePayload {
  /**
   * Height of the iframe
   */
  height: number;

  /**
   * Width of the iframe
   */
  width: number;
}

export declare namespace IFrameEvents {
  export {
    type ConnectionPayload as ConnectionPayload,
    type ErrorPayload as ErrorPayload,
    type IFrameEvent as IFrameEvent,
    type IFrameEventType as IFrameEventType,
    type KnowledgeCreatedPayload as KnowledgeCreatedPayload,
    type ResizePayload as ResizePayload,
  };
}
