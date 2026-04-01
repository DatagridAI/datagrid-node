// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';
import { type Response } from '../_shims/index';

export class Files extends APIResource {
  /**
   * Create files which can be passed as input to agents. This endpoint consumes a
   * flat credit charge per upload. The response includes a `credits` field with the
   * amount consumed, or `null` if the billing write fails — the upload still
   * succeeds in that case.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<FileObject> {
    return this._client.post(
      '/files',
      Core.multipartFormRequestOptions({
        body,
        timeout: (this._client as any)._options.timeout ?? 300000,
        ...options,
      }),
    );
  }

  /**
   * Retrieves a file by id.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileObject> {
    return this._client.get(`/files/${fileId}`, options);
  }

  /**
   * Update file metadata.
   */
  update(fileId: string, body?: FileUpdateParams, options?: Core.RequestOptions): Core.APIPromise<FileObject>;
  update(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileObject>;
  update(
    fileId: string,
    body: FileUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileObject> {
    if (isRequestOptions(body)) {
      return this.update(fileId, {}, body);
    }
    return this._client.patch(`/files/${fileId}`, { body, ...options });
  }

  /**
   * Returns the list of files.
   */
  list(
    query?: FileListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FileObjectsCursorIDPage, FileObject>;
  list(options?: Core.RequestOptions): Core.PagePromise<FileObjectsCursorIDPage, FileObject>;
  list(
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FileObjectsCursorIDPage, FileObject> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/files', FileObjectsCursorIDPage, { query, ...options });
  }

  /**
   * Delete file.
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/files/${fileId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Returns the content of a file.
   */
  content(fileId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/files/${fileId}/content`, {
      ...options,
      headers: { Accept: 'application/octet-stream', ...options?.headers },
      __binaryResponse: true,
    });
  }
}

export class FileObjectsCursorIDPage extends CursorIDPage<FileObject> {}

/**
 * The `File` object represents a document that has been uploaded to Datagrid.
 */
export interface FileObject {
  /**
   * The file identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The ISO string for when the file was created.
   */
  created_at: string;

  /**
   * The name of the file
   */
  filename: string;

  /**
   * The media type of the file.
   */
  media_type: string;

  /**
   * The object type, which is always `file`.
   */
  object: 'file';

  /**
   * Credit consumption for this file upload. `null` when the billing lookup fails.
   */
  credits?: FileObject.Credits | null;

  /**
   * The ISO timestamp when the file will expire and be automatically deleted, or
   * null if the file does not expire.
   */
  expires_at?: string | null;
}

export namespace FileObject {
  /**
   * Credit consumption for this file upload. `null` when the billing lookup fails.
   */
  export interface Credits {
    /**
     * The number of credits consumed by the operation.
     */
    consumed: number;
  }
}

export interface FileCreateParams {
  file: Core.Uploadable;

  /**
   * The number of seconds after creation when the file will expire and be
   * automatically deleted. Must be a positive integer, maximum 6 days (518400s). If
   * not provided, the file will not expire.
   */
  expires_after?: number | null;
}

export interface FileUpdateParams {
  /**
   * Seconds from now until the file expires. Only applies to temporary files. Max 6
   * days (518400s). Omitted leaves expiration unchanged.
   */
  expires_after?: number;
}

export interface FileListParams extends CursorIDPageParams {}

Files.FileObjectsCursorIDPage = FileObjectsCursorIDPage;

export declare namespace Files {
  export {
    type FileObject as FileObject,
    FileObjectsCursorIDPage as FileObjectsCursorIDPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
  };
}
