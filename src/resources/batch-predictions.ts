// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import { APIPromise } from '../core';
import * as Core from '../core';
import { AfterCursorPage, type AfterCursorPageParams } from '../pagination';
import { JSONLDecoder } from '../internal/decoders/jsonl';

export class BatchPredictions extends APIResource {
  /**
   * Create a new asynchronous batch prediction job. The response returns immediately
   * with a `validating` batch while Datagrid validates files and starts background
   * processing. Supply an `Idempotency-Key` header to safely retry the same create
   * request.
   *
   * @example
   * ```ts
   * const batchPrediction =
   *   await client.batchPredictions.create({
   *     items: [
   *       {
   *         custom_id: 'drawing_001',
   *         file_id: 'file_abc123',
   *         page: 1,
   *       },
   *       { custom_id: 'drawing_002', file_id: 'file_def456' },
   *     ],
   *     model: 'gemini-2.5-flash',
   *     output_schema: {
   *       type: 'object',
   *       additionalProperties: false,
   *       properties: {
   *         project_name: { type: 'string' },
   *         sheet_title: { type: 'string' },
   *         revision: { type: 'string' },
   *       },
   *       required: ['project_name', 'sheet_title'],
   *     },
   *     prompt:
   *       'Extract the project name, sheet title, and revision from this drawing.',
   *     completion_window: '24h',
   *     metadata: { project: 'alpha' },
   *   });
   * ```
   */
  create(
    params: BatchPredictionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BatchPrediction> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/batch-predictions', {
      body,
      ...options,
      headers: {
        ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        ...options?.headers,
      },
    });
  }

  /**
   * Retrieves a batch prediction by id. Terminal batches include a `results_url`
   * until retained result lines are cleaned up.
   *
   * @example
   * ```ts
   * const batchPrediction =
   *   await client.batchPredictions.retrieve(
   *     'batch_prediction_id',
   *   );
   * ```
   */
  retrieve(batchPredictionId: string, options?: Core.RequestOptions): Core.APIPromise<BatchPrediction> {
    return this._client.get(`/batch-predictions/${batchPredictionId}`, options);
  }

  /**
   * Returns batch predictions for the authenticated teamspace in reverse
   * chronological order. Use `after` with `next_cursor` from the previous response
   * to paginate.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const batchPrediction of client.batchPredictions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query?: BatchPredictionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BatchPredictionsAfterCursorPage, BatchPrediction>;
  list(options?: Core.RequestOptions): Core.PagePromise<BatchPredictionsAfterCursorPage, BatchPrediction>;
  list(
    query: BatchPredictionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BatchPredictionsAfterCursorPage, BatchPrediction> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/batch-predictions', BatchPredictionsAfterCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Requests cancellation for a batch prediction that is still validating or in
   * progress. A batch that is already `cancelling` or `cancelled` is returned
   * unchanged.
   *
   * @example
   * ```ts
   * const batchPrediction =
   *   await client.batchPredictions.cancel(
   *     'batch_prediction_id',
   *   );
   * ```
   */
  cancel(batchPredictionId: string, options?: Core.RequestOptions): Core.APIPromise<BatchPrediction> {
    return this._client.post(`/batch-predictions/${batchPredictionId}/cancel`, options);
  }

  /**
   * Streams newline-delimited JSON (NDJSON) result lines for a terminal batch
   * prediction. Read the response body line-by-line and JSON parse each non-empty
   * line. Results are retained for a limited window after batch creation; after
   * cleanup, this endpoint returns `410 Gone`.
   *
   * @example
   * ```ts
   * const batchPredictionResultLine =
   *   await client.batchPredictions.retrieveResults(
   *     'batch_prediction_id',
   *   );
   * ```
   */
  retrieveResults(
    batchPredictionId: string,
    options?: Core.RequestOptions,
  ): APIPromise<JSONLDecoder<BatchPredictionResultLine>> {
    return this._client
      .get(`/batch-predictions/${batchPredictionId}/results`, {
        ...options,
        headers: { Accept: 'application/x-ndjson', ...options?.headers },
        stream: true,
        __binaryResponse: true,
      })
      ._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller)) as APIPromise<
      JSONLDecoder<BatchPredictionResultLine>
    >;
  }
}

export class BatchPredictionsAfterCursorPage extends AfterCursorPage<BatchPrediction> {}

/**
 * The `batch_prediction` object represents an asynchronous batch prediction job.
 */
export interface BatchPrediction {
  /**
   * The id of the batch prediction.
   */
  id: string;

  /**
   * ISO timestamp when the batch reached `cancelled`, or `null` otherwise.
   */
  cancelled_at: string | null;

  /**
   * ISO timestamp when cancellation was requested, or `null` otherwise.
   */
  cancelling_at: string | null;

  /**
   * ISO timestamp when the batch reached `completed`, or `null` otherwise.
   */
  completed_at: string | null;

  /**
   * Requested completion window.
   */
  completion_window: '24h';

  /**
   * ISO timestamp when the batch was created.
   */
  created_at: string;

  /**
   * Batch-level terminal error details for `failed`, `cancelled`, or `expired`
   * batches; otherwise `null`.
   */
  error: ProblemDetails | null;

  /**
   * ISO timestamp when the batch reached `expired`, or `null` otherwise.
   */
  expired_at: string | null;

  /**
   * ISO timestamp when the batch completion window expires.
   */
  expires_at: string;

  /**
   * ISO timestamp when the batch reached `failed`, or `null` otherwise.
   */
  failed_at: string | null;

  /**
   * ISO timestamp when the batch entered `finalizing`, or `null` if it has not.
   */
  finalizing_at: string | null;

  /**
   * ISO timestamp when the batch entered `in_progress`, or `null` if it has not.
   */
  in_progress_at: string | null;

  /**
   * Optional metadata map with up to 16 entries. Metadata keys must be 64 characters
   * or fewer and values must be 512 characters or fewer.
   */
  metadata: { [key: string]: string } | null;

  /**
   * LLM model to use for every item in the batch.
   */
  model:
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-2.5-pro'
    | 'anthropic.claude-haiku-4-5-20251001-v1:0'
    | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
    | 'amazon.nova-2-lite-v1:0';

  /**
   * The object type, which is always `batch_prediction`.
   */
  object: 'batch_prediction';

  /**
   * The sum of processing, succeeded, errored, canceled, and expired equals total.
   */
  request_counts: BatchPredictionRequestCounts;

  /**
   * Relative URL for the NDJSON results stream once the batch is terminal. This
   * becomes `null` after retained result lines are cleaned up.
   */
  results_url: string | null;

  /**
   * Current batch lifecycle state. Terminal states are `completed`, `failed`,
   * `expired`, and `cancelled`.
   */
  status:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';
}

/**
 * The sum of processing, succeeded, errored, canceled, and expired equals total.
 */
export interface BatchPredictionRequestCounts {
  /**
   * Items that were cancelled before completion.
   */
  canceled: number;

  /**
   * Items that ended with an error.
   */
  errored: number;

  /**
   * Items that did not finish before the completion window elapsed.
   */
  expired: number;

  /**
   * Items that are still pending or processing.
   */
  processing: number;

  /**
   * Items that completed with a valid output.
   */
  succeeded: number;

  /**
   * Total number of submitted items.
   */
  total: number;
}

/**
 * One NDJSON result line for a submitted batch item.
 */
export interface BatchPredictionResultLine {
  /**
   * The batch prediction id.
   */
  batch_id: string;

  /**
   * The caller-defined item id from the create request.
   */
  custom_id: string;

  /**
   * Problem details when `status` is `errored`, `canceled`, or `expired`; otherwise
   * `null`.
   */
  error: ProblemDetails | null;

  /**
   * The object type, which is always `batch_prediction.result`.
   */
  object: 'batch_prediction.result';

  /**
   * The model output when `status` is `succeeded`; otherwise `null`.
   */
  output: { [key: string]: unknown } | null;

  /**
   * Terminal status for an individual result line.
   */
  status: 'succeeded' | 'errored' | 'canceled' | 'expired';
}

export interface ProblemDetails {
  status: number;

  title: string;

  type: string;

  detail?: string;

  instance?: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  /**
   * Field-level validation issues. Item-level issues may include `custom_id` when
   * Datagrid can associate the issue with a submitted item.
   */
  errors: Array<ValidationProblemError>;
}

export interface ValidationProblemError {
  /**
   * Machine-readable validation code.
   */
  code: string;

  /**
   * Human-readable validation message.
   */
  message: string;

  /**
   * JSON Pointer to the invalid request field.
   */
  pointer: string;

  /**
   * Submitted item `custom_id` associated with this issue, when available.
   */
  custom_id?: string | null;
}

export interface BatchPredictionCreateParams {
  /**
   * Body param: Files to process. Each item uses the shared `prompt` and
   * `output_schema`.
   */
  items: Array<BatchPredictionCreateParams.Item>;

  /**
   * Body param: LLM model to use for every item in the batch.
   */
  model:
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-2.5-pro'
    | 'anthropic.claude-haiku-4-5-20251001-v1:0'
    | 'anthropic.claude-sonnet-4-5-20250929-v1:0'
    | 'amazon.nova-2-lite-v1:0';

  /**
   * Body param: JSON Schema Draft 2020-12 describing each item output. The root
   * schema must be `type: object`. The batch prediction API currently rejects
   * `$defs`, `$ref`, `allOf`, `anyOf`, `not`, `oneOf`, and `patternProperties`
   * anywhere in the schema.
   */
  output_schema: { [key: string]: unknown };

  /**
   * Body param: Shared instruction applied to each item in the batch.
   */
  prompt: string;

  /**
   * Body param: Requested completion window. Defaults to `24h` when omitted; no
   * other values are currently supported.
   */
  completion_window?: '24h' | null;

  /**
   * Body param: Optional metadata map with up to 16 entries. Metadata keys must be
   * 64 characters or fewer and values must be 512 characters or fewer.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Header param: Optional idempotency key. Reusing the same key with the same
   * request body replays the original batch. Reusing it with a different request
   * body returns 409 Conflict. Cached results expire after 24 hours.
   */
  'Idempotency-Key'?: string;
}

export namespace BatchPredictionCreateParams {
  export interface Item {
    /**
     * Caller-defined identifier. Must be unique within the batch and is echoed in
     * result lines.
     */
    custom_id: string;

    /**
     * Existing Datagrid file id from the Files API. The file must be accessible from
     * the authenticated teamspace.
     */
    file_id: string;

    /**
     * Optional 1-indexed page number for a paged document such as a PDF.
     */
    page?: number | null;
  }
}

export interface BatchPredictionListParams extends AfterCursorPageParams {
  /**
   * Optional filter by batch prediction status.
   */
  status?:
    | 'validating'
    | 'failed'
    | 'in_progress'
    | 'finalizing'
    | 'completed'
    | 'expired'
    | 'cancelling'
    | 'cancelled';
}

BatchPredictions.BatchPredictionsAfterCursorPage = BatchPredictionsAfterCursorPage;

export declare namespace BatchPredictions {
  export {
    type BatchPrediction as BatchPrediction,
    type BatchPredictionRequestCounts as BatchPredictionRequestCounts,
    type BatchPredictionResultLine as BatchPredictionResultLine,
    type ProblemDetails as ProblemDetails,
    type ValidationProblemDetails as ValidationProblemDetails,
    type ValidationProblemError as ValidationProblemError,
    BatchPredictionsAfterCursorPage as BatchPredictionsAfterCursorPage,
    type BatchPredictionCreateParams as BatchPredictionCreateParams,
    type BatchPredictionListParams as BatchPredictionListParams,
  };
}
