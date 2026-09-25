// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Skills extends APIResource {
  /**
   * Create a skill. Defaults to company-owned (`account`) scope, then assigns the
   * API key's teamspace so the created skill is returned as `teamspace`. Pass
   * `scope: user` to create a private skill that can later be promoted.
   * Account-scope slash keys must not collide with a built-in; use the override
   * endpoint for that.
   */
  create(body: SkillCreateParams, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post('/skills', { body, ...options });
  }

  /**
   * Get details of a specific skill.
   */
  retrieve(skillId: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.get(`/skills/${skillId}`, options);
  }

  /**
   * Update a skill. Requires an API key with `ep:skills:write` whose user
   * administers skills in the account. A shared (`account`-scope) skill may be
   * updated by any skill administrator; a private (`user`-scope) skill only by its
   * author. Built-in skills and company overrides of them cannot have their content
   * edited; `enabled` may still be toggled on an override.
   */
  update(skillId: string, body: SkillUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.patch(`/skills/${skillId}`, { body, ...options });
  }

  /**
   * List skills invocable by the authenticated organization. Returns built-in
   * skills, skills assigned to the caller's teamspace, and the caller's private
   * skills. Unassigned custom company skills are omitted. Removed built-in overrides
   * are excluded.
   */
  list(query?: SkillListParams, options?: Core.RequestOptions): Core.PagePromise<SkillsCursorIDPage, Skill>;
  list(options?: Core.RequestOptions): Core.PagePromise<SkillsCursorIDPage, Skill>;
  list(
    query: SkillListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SkillsCursorIDPage, Skill> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/skills', SkillsCursorIDPage, { query, ...options });
  }

  /**
   * Delete a skill. For company-owned built-in overrides this marks the override as
   * removed (hidden from the library) rather than hard-deleting it, so the canonical
   * built-in is suppressed. Requires an API key with `ep:skills:delete` whose user
   * administers skills in the account.
   */
  delete(skillId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/skills/${skillId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Create a private copy of any reachable skill, owned by the key's subject. Clone
   * is deliberately `user`-scope even when `POST /v1/skills` defaults to `account`:
   * it is 'make my own copy', not another company skill. Requires `ep:skills:write`.
   */
  clone(skillId: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post(`/skills/${skillId}/clone`, options);
  }

  /**
   * Demote a company (account-scope) skill back to private. The caller must be the
   * skill's original author and administer skills in the account. Built-in overrides
   * cannot be demoted; use `/reset` instead. Requires `ep:skills:write`.
   */
  demote(skillId: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post(`/skills/${skillId}/demote`, options);
  }

  /**
   * Generate one or more skill drafts from a natural-language prompt and/or
   * previously uploaded SOP files (`POST /v1/files`). Drafts are returned as a list
   * and are **not** persisted — use `POST /v1/skills` to create each draft you want
   * to keep. Requires `ep:skills:write`.
   */
  generate(body: SkillGenerateParams, options?: Core.RequestOptions): Core.APIPromise<SkillGenerateResponse> {
    return this._client.post('/skills/generate', {
      body,
      timeout: (this._client as any)._options.timeout ?? 180000,
      ...options,
    });
  }

  /**
   * Return the full in-memory built-in catalogue shipped with Datagrid. The
   * catalogue is small and not cursor-paginated (`has_more` is always `false`);
   * adding pagination later would be a breaking SDK change. Use
   * `POST /skills/builtin/{builtin_key}/override` to customize one for your company.
   * Requires `ep:skills:read`.
   */
  listBuiltins(options?: Core.RequestOptions): Core.APIPromise<SkillListBuiltinsResponse> {
    return this._client.get('/skills/builtin', options);
  }

  /**
   * Create (or restore) a company-owned copy of a built-in skill that shadows the
   * global default for your organization. Idempotent: if an override already exists
   * it is returned unchanged; if it was previously removed it is restored. Requires
   * `ep:skills:write` (account admin).
   */
  overrideBuiltin(builtinKey: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post(`/skills/builtin/${builtinKey}/override`, options);
  }

  /**
   * Promote a private (user-scope) skill to company scope. The caller must be the
   * skill's author and an account admin. Requires `ep:skills:write`.
   */
  promote(skillId: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post(`/skills/${skillId}/promote`, options);
  }

  /**
   * Remove the company's override of a built-in skill, reverting all members back to
   * the global default. Idempotent: no-op when no override exists. Requires
   * `ep:skills:write` (account admin).
   */
  resetBuiltinOverride(builtinKey: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/skills/builtin/${builtinKey}/reset`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class SkillsCursorIDPage extends CursorIDPage<Skill> {}

export interface BuiltinSkill {
  /**
   * Unique identifier for this built-in skill definition.
   */
  builtin_key: string;

  /**
   * Category bucket.
   */
  category: string;

  /**
   * Short description shown in the skill picker.
   */
  description: string;

  /**
   * The full instructions / system prompt.
   */
  instructions: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * The object type, always 'builtin_skill'.
   */
  object: 'builtin_skill';

  /**
   * Tool identifiers preferred by this skill.
   */
  preferred_tools: Array<string>;

  /**
   * Tool identifiers required by this skill.
   */
  required_tools: Array<string>;

  /**
   * The slash command key.
   */
  slash_key: string;
}

export interface Skill {
  /**
   * Unique identifier for the skill.
   */
  id: string;

  /**
   * The account (company) that owns this skill. `null` for `user`-scope and
   * `builtin` skills.
   */
  account_id: string | null;

  /**
   * For company overrides of built-in skills: the identifier of the underlying
   * built-in. `null` for user-authored skills.
   */
  builtin_key: string | null;

  /**
   * Category bucket for grouping in the skill picker.
   */
  category:
    | 'document_analysis'
    | 'construction_project_management'
    | 'financial_analysis'
    | 'estimation'
    | 'quality_and_safety'
    | 'scheduling'
    | 'contracts_and_legal'
    | 'data_and_reporting'
    | 'research'
    | 'communication'
    | 'general_productivity';

  /**
   * ISO timestamp when this skill was created.
   */
  created_at: string;

  /**
   * ID of the user who created this skill. `null` for built-in skills that have
   * never been edited.
   */
  creator_id: string | null;

  /**
   * Short description shown in the skill picker.
   */
  description: string;

  /**
   * Whether the skill is active and available for selection.
   */
  enabled: boolean;

  /**
   * The full instructions / system prompt for this skill.
   */
  instructions: string;

  /**
   * Display name of the skill.
   */
  name: string;

  /**
   * The object type, always 'skill'.
   */
  object: 'skill';

  /**
   * Tool identifiers that this skill works best with.
   */
  preferred_tools: Array<string>;

  /**
   * ISO timestamp when this skill was promoted to company scope. `null` for
   * `user`-scope skills.
   */
  promoted_at: string | null;

  /**
   * Tool identifiers that this skill requires to function.
   */
  required_tools: Array<string>;

  /**
   * Ownership scope. `user` = private (author only), `account` = company-owned,
   * `teamspace` = assigned to selected teamspaces, `builtin` = global default. A
   * default public create is assigned to the API key's teamspace and returned as
   * `teamspace`.
   */
  scope: 'user' | 'account' | 'teamspace' | 'builtin';

  /**
   * The slash command key used to invoke this skill (e.g. `budget-check`).
   */
  slash_key: string;

  /**
   * ISO timestamp when this skill was last updated.
   */
  updated_at: string;
}

export interface SkillDraft {
  /**
   * Category bucket for grouping in the skill picker.
   */
  category:
    | 'document_analysis'
    | 'construction_project_management'
    | 'financial_analysis'
    | 'estimation'
    | 'quality_and_safety'
    | 'scheduling'
    | 'contracts_and_legal'
    | 'data_and_reporting'
    | 'research'
    | 'communication'
    | 'general_productivity';

  /**
   * Short description shown in the skill picker.
   */
  description: string;

  /**
   * The full instructions / system prompt for this skill.
   */
  instructions: string;

  /**
   * Suggested display name for the skill.
   */
  name: string;

  /**
   * The object type, always 'skill_draft'.
   */
  object: 'skill_draft';

  /**
   * Tool identifiers that this skill works best with.
   */
  preferred_tools: Array<string>;

  /**
   * Tool identifiers that this skill requires to function.
   */
  required_tools: Array<string>;

  /**
   * Suggested slash command key (e.g. `budget-check`). Deduplicated within the draft
   * list.
   */
  slash_key: string;
}

export interface SkillGenerateResponse {
  /**
   * Array of generated skill drafts. Pass each to `POST /v1/skills` to persist.
   */
  data: Array<SkillDraft>;

  /**
   * Whether there are more results. Always false for generate.
   */
  has_more: boolean;

  /**
   * The object type, always 'list'.
   */
  object: 'list';
}

export interface SkillListBuiltinsResponse {
  /**
   * Array of built-in skill definitions.
   */
  data: Array<BuiltinSkill>;

  /**
   * Whether there are more results available. Always false for the built-in catalog.
   */
  has_more: boolean;

  /**
   * The object type, always 'list'.
   */
  object: 'list';
}

export interface SkillCreateParams {
  /**
   * Category bucket.
   */
  category:
    | 'document_analysis'
    | 'construction_project_management'
    | 'financial_analysis'
    | 'estimation'
    | 'quality_and_safety'
    | 'scheduling'
    | 'contracts_and_legal'
    | 'data_and_reporting'
    | 'research'
    | 'communication'
    | 'general_productivity';

  /**
   * The full instructions / system prompt for this skill.
   */
  instructions: string;

  /**
   * Display name of the skill.
   */
  name: string;

  /**
   * The slash command key (e.g. `budget-check`). Must use lowercase letters, digits,
   * and single dashes, start with a letter, end with a letter or digit, and be
   * unique within the scope.
   */
  slash_key: string;

  /**
   * Short description. When omitted, an AI-generated description is produced from
   * the instructions.
   */
  description?: string | null;

  /**
   * Whether the skill is active. Defaults to `true`.
   */
  enabled?: boolean | null;

  /**
   * Tool identifiers preferred by this skill.
   */
  preferred_tools?: Array<string> | null;

  /**
   * Tool identifiers required by this skill.
   */
  required_tools?: Array<string> | null;

  /**
   * Ownership of the new skill. Defaults to `account` (company-owned). Pass `user`
   * for a private skill that can later be promoted.
   */
  scope?: 'user' | 'account' | null;
}

export interface SkillUpdateParams {
  /**
   * Category bucket.
   */
  category?:
    | 'document_analysis'
    | 'construction_project_management'
    | 'financial_analysis'
    | 'estimation'
    | 'quality_and_safety'
    | 'scheduling'
    | 'contracts_and_legal'
    | 'data_and_reporting'
    | 'research'
    | 'communication'
    | 'general_productivity'
    | null;

  /**
   * Short description. Pass an empty string to clear it and re-enable AI generation.
   */
  description?: string | null;

  /**
   * Whether the skill is active.
   */
  enabled?: boolean | null;

  /**
   * The full instructions / system prompt.
   */
  instructions?: string | null;

  /**
   * Display name of the skill.
   */
  name?: string | null;

  /**
   * Tool identifiers preferred by this skill.
   */
  preferred_tools?: Array<string> | null;

  /**
   * Tool identifiers required by this skill.
   */
  required_tools?: Array<string> | null;

  /**
   * The slash command key. Must use lowercase letters, digits, and single dashes,
   * start with a letter, end with a letter or digit, and be unique within the scope.
   */
  slash_key?: string | null;
}

export interface SkillListParams extends CursorIDPageParams {
  /**
   * Filter by enabled status.
   */
  enabled?: boolean;

  /**
   * Return only skills of this scope. `user` is the caller's own private skills,
   * `account` company-owned skills invocable here, `teamspace` skills assigned to
   * the caller's teamspace, and `builtin` the global catalogue. Omit to return
   * everything the caller can invoke.
   */
  scope?: 'user' | 'account' | 'teamspace' | 'builtin';

  /**
   * Optional search string to filter skills by name or slash key. Case-insensitive
   * partial match.
   */
  search?: string;
}

export interface SkillGenerateParams {
  /**
   * IDs of previously uploaded files to use as source material (e.g. SOP documents).
   * Obtain file IDs via `POST /v1/files`. At least one of `prompt` or `file_ids`
   * must be non-empty.
   */
  file_ids?: Array<string>;

  /**
   * Natural-language description of the skill(s) to generate. At least one of
   * `prompt` or `file_ids` must be non-empty.
   */
  prompt?: string;
}

Skills.SkillsCursorIDPage = SkillsCursorIDPage;

export declare namespace Skills {
  export {
    type BuiltinSkill as BuiltinSkill,
    type Skill as Skill,
    type SkillDraft as SkillDraft,
    type SkillGenerateResponse as SkillGenerateResponse,
    type SkillListBuiltinsResponse as SkillListBuiltinsResponse,
    SkillsCursorIDPage as SkillsCursorIDPage,
    type SkillCreateParams as SkillCreateParams,
    type SkillUpdateParams as SkillUpdateParams,
    type SkillListParams as SkillListParams,
    type SkillGenerateParams as SkillGenerateParams,
  };
}
