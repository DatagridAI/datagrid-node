// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorIDPage, type CursorIDPageParams } from '../pagination';

export class Skills extends APIResource {
  /**
   * Create a skill. Defaults to Public (`account`) privacy with an initial
   * invocation assignment to the API key's teamspace; creation and assignment are
   * atomic, and the returned scope remains `account`. Pass `scope: user` to create a
   * Private skill without an initial assignment. Public slash keys must not collide
   * with a built-in.
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
   * author. Built-in skills and company copies of them cannot have their content
   * edited, but a skill administrator may set `enabled` on one to enable or disable
   * it for the whole company. The global built-in row is never changed; the response
   * carries your company's state.
   */
  update(skillId: string, body: SkillUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.patch(`/skills/${skillId}`, { body, ...options });
  }

  /**
   * List skills invocable in the authenticated teamspace. Returns built-ins, Public
   * custom skills that are unrestricted or assigned here, and the API-key subject's
   * own Private skills assigned here. Other users' Private skills and unassigned
   * Private skills are excluded. Built-in skills your company removed are excluded,
   * and a built-in your company disabled is returned with `enabled: false`.
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
   * Delete a skill. For a built-in skill (or a company copy of one) this removes it
   * for your company only — it is excluded from listings and agents and can be
   * restored with `POST /skills/builtin/{builtin_key}/override` — rather than
   * deleting it. Requires an API key with `ep:skills:delete` whose user administers
   * skills in the account.
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
   * Convert a Public (`account`) skill or deprecated legacy `teamspace` skill to
   * Private (`user`) scope. Existing teamspace assignments are preserved. The caller
   * must be the skill's original author and administer skills in the account.
   * Company copies of built-in skills cannot be demoted; use `/reset` instead.
   * Requires `ep:skills:write`.
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
   * adding pagination later would be a breaking SDK change. To disable or remove a
   * built-in for your company, `PATCH` (`enabled`) or `DELETE` it by its skill id;
   * restore a removed one with `POST /skills/builtin/{builtin_key}/override`.
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
   * Convert a Private (`user`) skill or deprecated legacy `teamspace` skill to
   * Public (`account`) scope. Existing teamspace assignments are preserved. The
   * caller must be the skill's author and an account admin. Requires
   * `ep:skills:write`.
   */
  promote(skillId: string, options?: Core.RequestOptions): Core.APIPromise<Skill> {
    return this._client.post(`/skills/${skillId}/promote`, options);
  }

  /**
   * Reset a built-in skill to the global default for your company: clears your
   * company's disabled/removed state for it and deletes any company copy of it (the
   * copy's id then no longer resolves). Idempotent: no-op when there is nothing to
   * reset. Requires `ep:skills:write` (account admin).
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
   * For built-in skills and company copies of them: the identifier of the built-in.
   * `null` for user-authored skills.
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
   * Whether the skill is active and available for selection. For a built-in skill,
   * `false` when your company disabled it.
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
   * Privacy scope. `user` = Private (author only), `account` = Public within the
   * company, `teamspace` = deprecated legacy Public value retained only for
   * compatibility, and `builtin` = global default. New skills never use `teamspace`;
   * changing its privacy or assignments normalizes it.
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
   * The slash command key (e.g. `budget-check`, `3d-review`). Must use lowercase
   * letters, digits, and single dashes, start and end with a letter or digit, and be
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
   * start and end with a letter or digit, and be unique within the scope.
   */
  slash_key?: string | null;
}

export interface SkillListParams extends CursorIDPageParams {
  /**
   * Filter by enabled status.
   */
  enabled?: boolean;

  /**
   * Return only skills of this scope. `user` returns the API-key subject's own
   * Private skills assigned to the authenticated teamspace; `account` returns Public
   * custom skills invocable here; `teamspace` is a deprecated legacy Public value
   * that remains assignment-required until normalized by a privacy or assignment
   * action; and `builtin` is the global catalogue. Omit to return everything the
   * caller can invoke.
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
