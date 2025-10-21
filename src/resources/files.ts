// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';
import { type Response } from '../_shims/index';

export class Files extends APIResource {
  /**
   * Create files which can be passed as input to agents.
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
}

export interface FileCreateParams {
  file: Core.Uploadable;
}

export interface FileListParams extends CursorIDPageParams {}

Files.FileObjectsCursorIDPage = FileObjectsCursorIDPage;

export declare namespace Files {
  export {
    type FileObject as FileObject,
    FileObjectsCursorIDPage as FileObjectsCursorIDPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
