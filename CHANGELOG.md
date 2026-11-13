# Changelog

## [0.18.0](https://github.com/DatagridAI/datagrid-node/compare/v0.17.2...v0.18.0) (2026-11-05)


### Features

* **connectors:** add Redis-backed connector health checks ([9ca85f2](https://github.com/DatagridAI/datagrid-node/commit/9ca85f27f04de435bbb40d7de59fb1f9a5e8235c))
* **converse:** add skill_ids/slash_keys to public converse API ([190d4bb](https://github.com/DatagridAI/datagrid-node/commit/190d4bbb31e360cbff9e66aa063302be417365f7))
* **converse:** structured outputs at the prediction level (enforce text.format on /v1/converse) ([cef233d](https://github.com/DatagridAI/datagrid-node/commit/cef233d4d4496934bac7a3b1dee999e99badd524))
* **datagrid-ai:** expose beta magpie-3.0 on public Converse API ([d2d3f50](https://github.com/DatagridAI/datagrid-node/commit/d2d3f5020afed2daa357cfa94715a2a5f3ddadfb))
* **datagrid-api:** add GET /v1/models listing converse agent models and LLMs ([5c60cab](https://github.com/DatagridAI/datagrid-node/commit/5c60cabcf02f1b8cc5476b5b43124c63772bb16c))
* **datagrid-api:** add model family to GET /v1/models ([46a19b1](https://github.com/DatagridAI/datagrid-node/commit/46a19b11d1bcecf4b6c928a066bb915ea33dcc3c))
* **datagrid-api:** expose agent automations on public API [DGAAI-587] ([4c45edb](https://github.com/DatagridAI/datagrid-node/commit/4c45edbd1316f221505fd547d9cc82a245ea6224))
* **datagrid-api:** expose agent event-triggers in the public API ([10da380](https://github.com/DatagridAI/datagrid-node/commit/10da38045de3651858fe2a8aca368504352519e7))
* **datagrid-api:** expose knowledge summaries on public API ([0ca3872](https://github.com/DatagridAI/datagrid-node/commit/0ca38723799da8277b7156e60ac38a478e43b165))
* **event-triggers:** add Egnyte as an agent event-trigger source ([502141c](https://github.com/DatagridAI/datagrid-node/commit/502141cd1fe3f97f9a6f8f35a7eafcf29e3411a0))
* **event-triggers:** add SharePoint Graph provider and enrich client ([304e24e](https://github.com/DatagridAI/datagrid-node/commit/304e24ef378dddd1a036177fb6f31edd0aee5f27))
* **FAI-390:** structured recort fields for citation ([b6afa97](https://github.com/DatagridAI/datagrid-node/commit/b6afa97f3e58f20b4ff4a377d113b6df872b7759))
* **FAI-391:** item-type for citation ([a62edea](https://github.com/DatagridAI/datagrid-node/commit/a62edea411a6c263e781e489ab8a96b8fd270c6b))
* failsafe when font is not available ([#26269](https://github.com/DatagridAI/datagrid-node/issues/26269)) ([#26271](https://github.com/DatagridAI/datagrid-node/issues/26271)) ([7cc7b6e](https://github.com/DatagridAI/datagrid-node/commit/7cc7b6e70bbc9034985f20a65b3468d029c9e772))
* **ledger:** let the S2S rollup fold catch up on history unattended ([#29063](https://github.com/DatagridAI/datagrid-node/issues/29063)) ([aaf8465](https://github.com/DatagridAI/datagrid-node/commit/aaf84655a8cd709634a8c5826f0ff0ba87559ec2))
* **mcp-oauth:** persist redirectUri on pending flow and reject callback mismatch ([42004e0](https://github.com/DatagridAI/datagrid-node/commit/42004e0df7ee178030d935c33f5d0fc04a8dc556))
* **mcp:** add public Datagrid API MCP OAuth endpoints ([3306779](https://github.com/DatagridAI/datagrid-node/commit/33067792c24f92837563b43e66c6f499bd932f37))
* **observability:** capture the stack of a wedged agent-api-server event loop ([#26115](https://github.com/DatagridAI/datagrid-node/issues/26115)) ([#26347](https://github.com/DatagridAI/datagrid-node/issues/26347)) ([18791f1](https://github.com/DatagridAI/datagrid-node/commit/18791f1ed138f861668c317926964b194dcb03e2))
* **PAIO-37:** add one-off procore_file_id_kind backfill task ([#30996](https://github.com/DatagridAI/datagrid-node/issues/30996)) ([c217406](https://github.com/DatagridAI/datagrid-node/commit/c217406ae9ac1f182e3cf72f7c6cb25073a446ac))
* **procore-reporting:** clearer answers and dashboards that match the chat (ENRP-10958) ([#28363](https://github.com/DatagridAI/datagrid-node/issues/28363)) ([c4483e2](https://github.com/DatagridAI/datagrid-node/commit/c4483e265153dc665ddb1c4b5d2e13516397b218))
* **procore-reporting:** make the Reporting tool available in the company teamspace [ENRP-11119] ([#28931](https://github.com/DatagridAI/datagrid-node/issues/28931)) ([095470a](https://github.com/DatagridAI/datagrid-node/commit/095470aba71a3b7240f86bdb259ca01df3f9725a))
* **procore-reporting:** update tool description (ENRP-10958) ([#28391](https://github.com/DatagridAI/datagrid-node/issues/28391)) ([5d9b8df](https://github.com/DatagridAI/datagrid-node/commit/5d9b8dfe15715118538fd0bec226aff9a3e85d4e))
* public Skills generate (DGAAI-860) ([843941f](https://github.com/DatagridAI/datagrid-node/commit/843941f3be100c9e0f537097640aef926c85a787))
* **server:** page authoring places knowledge images by reference, plus media evals ([64d8d71](https://github.com/DatagridAI/datagrid-node/commit/64d8d7188753c1742821f37f4f4d7cb12781a05f))
* **skills:** Public Skills API (DGAAI-857 + DGAAI-858) ([4cf978e](https://github.com/DatagridAI/datagrid-node/commit/4cf978e878432fa8518ae78579cbc33486f44c77))
* **voice:** follow-up delegation with persisted turns and action review ([c6dc9ed](https://github.com/DatagridAI/datagrid-node/commit/c6dc9ed94bb1b0cbbf4ad42d17b0a324b0ea4f24))
* **voice:** publish turn_index on live transcript and citation events ([2cb2cf7](https://github.com/DatagridAI/datagrid-node/commit/2cb2cf70c016ef469b7149a187cc3d2a74042407))
* **voice:** task cancellation via voice and Inbox API ([1caeaa2](https://github.com/DatagridAI/datagrid-node/commit/1caeaa251ea450c01ec957a3bf02550721e17ac2))
* **voice:** tie tool calls to the turn they started in ([37f2df4](https://github.com/DatagridAI/datagrid-node/commit/37f2df4fe3e4e63ad34087a62df9d471fa2a4f4c))


### Bug Fixes

* **1150:** avoid joining nested-table dataset manifest array into chunk label ([#29014](https://github.com/DatagridAI/datagrid-node/issues/29014)) ([04785d1](https://github.com/DatagridAI/datagrid-node/commit/04785d14a7ed405fda787f7a7b109b8273b3af4d))
* **agents:** do not run a turn that was stopped during agent build ([#29852](https://github.com/DatagridAI/datagrid-node/issues/29852)) ([d767e8a](https://github.com/DatagridAI/datagrid-node/commit/d767e8a5ba605f63ff87849eec99c64f887b5e78))
* **agents:** stop resolving tenant knowledge on GET /v1/agents ([2213711](https://github.com/DatagridAI/datagrid-node/commit/2213711b407b14876d3484433ae989081a595059))
* **ai:** drop resourceTouch from fallback empty-response check ([#27047](https://github.com/DatagridAI/datagrid-node/issues/27047)) ([10de5fc](https://github.com/DatagridAI/datagrid-node/commit/10de5fc8c9be974497472eba21256b45e1601b11))
* **ai:** steer Magpie 3.0 to Procore Enterprise tools before 360 Reporting ([#30558](https://github.com/DatagridAI/datagrid-node/issues/30558)) ([932a531](https://github.com/DatagridAI/datagrid-node/commit/932a531da04708f758fc33b82076bcad441effe9))
* **ai:** use enterprise procore tools for mcp templates ([#27647](https://github.com/DatagridAI/datagrid-node/issues/27647)) ([53d1680](https://github.com/DatagridAI/datagrid-node/commit/53d16801a86260169d8697bbbbe6314b88be095a))
* **api:** expose Gemini 3.8 Flash and remove rollout flag ([e27ea65](https://github.com/DatagridAI/datagrid-node/commit/e27ea65802bd1dcd8808cd45655aab66486e295a))
* **bim360:** improve ACC sync coverage and import history status ([#30042](https://github.com/DatagridAI/datagrid-node/issues/30042)) ([5a8d349](https://github.com/DatagridAI/datagrid-node/commit/5a8d3497505d1e8ef1a0dbe33e6f4e33eb1ac1c0))
* **blob-cache-hydrator:** update Apryse CAD module checksum ([#30125](https://github.com/DatagridAI/datagrid-node/issues/30125)) ([5fae115](https://github.com/DatagridAI/datagrid-node/commit/5fae115d7dbf4189e77456e13979f7277ff2ce5c))
* **converse:** deliver the final response before the final DB patch ([#27820](https://github.com/DatagridAI/datagrid-node/issues/27820)) ([6eaa7fd](https://github.com/DatagridAI/datagrid-node/commit/6eaa7fdef6422d178ae2710e7d9e4db1a2b83152))
* **DGAP-2448:** keep AI Overview on daily cap, hide "No results found" on monthly cap ([#30006](https://github.com/DatagridAI/datagrid-node/issues/30006)) ([d98eeb0](https://github.com/DatagridAI/datagrid-node/commit/d98eeb002ef905e573208ea5f770cc284cb5c456))
* **DGDC-1324:** Fix issue root categories and add timestamps ([#30458](https://github.com/DatagridAI/datagrid-node/issues/30458)) ([33e523d](https://github.com/DatagridAI/datagrid-node/commit/33e523d151a309b82039086e916bc916e9e2c585))
* **DGDC-1407:** stop infinite spinner on import config for private credentials ([#30499](https://github.com/DatagridAI/datagrid-node/issues/30499)) ([559d398](https://github.com/DatagridAI/datagrid-node/commit/559d39828cd2be7c22348467b92652cc491caac5))
* **DGDC-1412:** stop ingest.run.completed Sentry noise, surface configure-task failures ([#30614](https://github.com/DatagridAI/datagrid-node/issues/30614)) ([4b96a6a](https://github.com/DatagridAI/datagrid-node/commit/4b96a6afa82b017629ce6e740d077f1db8e9da01))
* **DGDC-16:** Fix to avoid droppig agent traces ([#27462](https://github.com/DatagridAI/datagrid-node/issues/27462)) ([1d35dc6](https://github.com/DatagridAI/datagrid-node/commit/1d35dc684c64c7561aeb1a3ecea3aa1da0a767c0))
* **DGDC-808:** Fix ACC issue limit blob decode ([#27550](https://github.com/DatagridAI/datagrid-node/issues/27550)) ([a707956](https://github.com/DatagridAI/datagrid-node/commit/a707956dba0fee864536c591ea7c274aa009ad99))
* **FAI-673:** error code ([cd954f1](https://github.com/DatagridAI/datagrid-node/commit/cd954f1661c63772e3cbe22f5efc6667a0cf0e3f))
* **graph_editor:** hide elapsed time on the specialist invocation card ([#28145](https://github.com/DatagridAI/datagrid-node/issues/28145)) ([e13774c](https://github.com/DatagridAI/datagrid-node/commit/e13774c64ea8ec8409dbaf77062b79415d0de81d))
* **knowledge:** return "ready" once all rows reach a terminal state (persistent failures no longer hang evals) ([b90008a](https://github.com/DatagridAI/datagrid-node/commit/b90008aae9070c6b7773a86ff5f9d73838806897))
* **magpie-3-0:** unwrap Procore MCP call_tool results and outline spilled JSON ([#28700](https://github.com/DatagridAI/datagrid-node/issues/28700)) ([9e7dd03](https://github.com/DatagridAI/datagrid-node/commit/9e7dd0338f259a9aea6e5cf2dcf90514f8b08ab2))
* **magpie-3-0:** unwrap Procore MCP call_tool results and outline spilled JSON ([#28700](https://github.com/DatagridAI/datagrid-node/issues/28700)) ([2e5c6c4](https://github.com/DatagridAI/datagrid-node/commit/2e5c6c4d2ed3b8418c79348682fcb6140a9bb178))
* make AddAffectsCreditBalanceToLedger migration idempotent ([#26148](https://github.com/DatagridAI/datagrid-node/issues/26148)) ([#26153](https://github.com/DatagridAI/datagrid-node/issues/26153)) ([64702c1](https://github.com/DatagridAI/datagrid-node/commit/64702c1299ef99f2f7d5485bbca54c3154a87365))
* migrate Contract Review Agent calibration ([#30026](https://github.com/DatagridAI/datagrid-node/issues/30026)) ([e26fc5f](https://github.com/DatagridAI/datagrid-node/commit/e26fc5f44918a316c492829611e4efa1f718481f))
* **procore-reporting:** answers read every row, and unlinked objects get one answer each Stack 2/2 ([#29329](https://github.com/DatagridAI/datagrid-node/issues/29329)) ([2c9da23](https://github.com/DatagridAI/datagrid-node/commit/2c9da23d8c3e7b2d1261a3fbf407b48a585a688a))


### Performance Improvements

* **copilot:** assemble tenant knowledge without scanning every table ([a3055ea](https://github.com/DatagridAI/datagrid-node/commit/a3055ea0264330543da0cffc2828fa20ea33f3ec))


### Chores

* merge production main into the release ([d85deff](https://github.com/DatagridAI/datagrid-node/commit/d85deff1277135e99eb28757ddd0ec028e739917))


### Documentation

* **api-keys:** update API key docs for teamspace access and retire the service-key script ([103ab88](https://github.com/DatagridAI/datagrid-node/commit/103ab88aa1ca9a98e9155f8268541b4751e079a4))


### Refactors

* **event-triggers:** consolidate provider-contract and triggerSource enablement groundwork ([64f7141](https://github.com/DatagridAI/datagrid-node/commit/64f71417727772a2402f8f076e8a111d35a240a5))
* **shared-ai-types,graph-editor,server,infra:** derive model lists from the registry and delete the hand-maintained arrays (DGAI-972, DGAI-973) ([6260013](https://github.com/DatagridAI/datagrid-node/commit/626001308022f8a3068ea09799248b802261a9a1))


### Build System

* migrate the workspace from npm to pnpm ([3fbb8f9](https://github.com/DatagridAI/datagrid-node/commit/3fbb8f90fafa5f7b03b43c26980be5bade5b1fbd))

## 0.17.2 (2026-06-24)

Full Changelog: [v0.17.1...v0.17.2](https://github.com/DatagridAI/datagrid-node/compare/v0.17.1...v0.17.2)

### Bug Fixes

* **ci:** publish npm package as public without token env ([6e437f0](https://github.com/DatagridAI/datagrid-node/commit/6e437f05785e224538124d2343239b1c5bcb7ae0))
* **ci:** remove registry from node-setup collision with OIDC ([621bf23](https://github.com/DatagridAI/datagrid-node/commit/621bf23f10c8eaff903cccfd8f7886d4f7c82ccd))

## 0.17.1 (2026-06-22)

Full Changelog: [v0.17.0...v0.17.1](https://github.com/DatagridAI/datagrid-node/compare/v0.17.0...v0.17.1)

## 0.17.0 (2026-06-15)

Full Changelog: [v0.16.1...v0.17.0](https://github.com/DatagridAI/datagrid-node/compare/v0.16.1...v0.17.0)

### Features

* **api:** api update ([34c0400](https://github.com/DatagridAI/datagrid-node/commit/34c04000faacc34917df0b06cb6789c45883acf4))

## 0.16.1 (2026-06-12)

Full Changelog: [v0.16.0...v0.16.1](https://github.com/DatagridAI/datagrid-node/compare/v0.16.0...v0.16.1)

### Bug Fixes

* **publish:** use npm publish instead of yarn publish ([39d7e5c](https://github.com/DatagridAI/datagrid-node/commit/39d7e5ccd0fb202bfd4d42e7d5699b622f27cf11))

## 0.16.0 (2026-06-12)

Full Changelog: [v0.15.0...v0.16.0](https://github.com/DatagridAI/datagrid-node/compare/v0.15.0...v0.16.0)

### Features

* **api:** api update ([77a7579](https://github.com/DatagridAI/datagrid-node/commit/77a757949e9c08ac118165dcf7b55f303bd4198b))

## 0.15.0 (2026-06-05)

Full Changelog: [v0.14.0...v0.15.0](https://github.com/DatagridAI/datagrid-node/compare/v0.14.0...v0.15.0)

### Features

* **api:** api update ([61f6010](https://github.com/DatagridAI/datagrid-node/commit/61f6010156124fcbb7158b7453d84743b6c07d87))

## 0.14.0 (2026-05-16)

Full Changelog: [v0.13.0...v0.14.0](https://github.com/DatagridAI/datagrid-node/compare/v0.13.0...v0.14.0)

### Features

* **api:** api update ([b346709](https://github.com/DatagridAI/datagrid-node/commit/b346709267189b1ac1cba912b98f715b20fbd91f))

## 0.13.0 (2026-05-12)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/DatagridAI/datagrid-node/compare/v0.12.0...v0.13.0)

### Features

* **api:** api update ([396ecc2](https://github.com/DatagridAI/datagrid-node/commit/396ecc22f5d29ef30d1840170cad5005133a665d))

## 0.12.0 (2026-04-30)

Full Changelog: [v0.11.0...v0.12.0](https://github.com/DatagridAI/datagrid-node/compare/v0.11.0...v0.12.0)

### Features

* **api:** api update ([84a1ca6](https://github.com/DatagridAI/datagrid-node/commit/84a1ca631ebff7ea995098efdf56930697b11609))
* support setting headers via env ([838cfba](https://github.com/DatagridAI/datagrid-node/commit/838cfbab7f251a339c0391a61067ebe7e17771d5))


### Chores

* **internal:** more robust bootstrap script ([56880fd](https://github.com/DatagridAI/datagrid-node/commit/56880fd2b36a2ab5505edff9383301c5b79a583a))

## 0.11.0 (2026-04-21)

Full Changelog: [v0.10.0...v0.11.0](https://github.com/DatagridAI/datagrid-node/compare/v0.10.0...v0.11.0)

### Features

* **api:** api update ([5b00a93](https://github.com/DatagridAI/datagrid-node/commit/5b00a938c8b9c1743a69e3874293b6abe22b1482))
* **api:** api update ([63b3ec9](https://github.com/DatagridAI/datagrid-node/commit/63b3ec93643fcc44b28d111b1438d6a7c2878b69))


### Chores

* **tests:** bump steady to v0.22.1 ([ddcb25a](https://github.com/DatagridAI/datagrid-node/commit/ddcb25af27907f7169a9d23f9a32eb5e43473246))

## 0.10.0 (2026-04-13)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/DatagridAI/datagrid-node/compare/v0.9.0...v0.10.0)

### Features

* **api:** api update ([8ea81cb](https://github.com/DatagridAI/datagrid-node/commit/8ea81cb4cd3f95cfccdf7e752f50e8c37eb47004))
* **api:** api update ([0d8819a](https://github.com/DatagridAI/datagrid-node/commit/0d8819a41ecf09b09ee5f6bc6ca8fcd7fa3eb14e))
* **api:** api update ([9a95989](https://github.com/DatagridAI/datagrid-node/commit/9a95989170e96fd0dc890f663a591da0cb6d8151))


### Chores

* **internal:** codegen related update ([4d02cfb](https://github.com/DatagridAI/datagrid-node/commit/4d02cfbf71fc0cafb280d6491ce7f9ec62eb9cb7))

## 0.9.0 (2026-04-01)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/DatagridAI/datagrid-node/compare/v0.8.0...v0.9.0)

### Features

* **api:** api update ([1f85851](https://github.com/DatagridAI/datagrid-node/commit/1f8585156feb397e50fb8d1671acc54dd109da65))
* **api:** api update ([51dde60](https://github.com/DatagridAI/datagrid-node/commit/51dde601c3eaaee95fcc207a211ae5add4adbf7a))
* **api:** api update ([8457378](https://github.com/DatagridAI/datagrid-node/commit/8457378b0c968756762eb8c49b251bdcb7ab646f))
* **api:** api update ([5b552e5](https://github.com/DatagridAI/datagrid-node/commit/5b552e5fc9487c5ce137effd0224b7e65c7d5819))
* **api:** api update ([fba85aa](https://github.com/DatagridAI/datagrid-node/commit/fba85aab621a003ef811ab0de8935ee58bb5a766))


### Bug Fixes

* **client:** preserve URL params already embedded in path ([35d7b32](https://github.com/DatagridAI/datagrid-node/commit/35d7b32873662575b93c8dd6416e6f565eefbecf))
* **docs/contributing:** correct pnpm link command ([ec2ff38](https://github.com/DatagridAI/datagrid-node/commit/ec2ff3827ede56257c26afc5b3c9543290383dc6))
* fix request delays for retrying to be more respectful of high requested delays ([466a5fd](https://github.com/DatagridAI/datagrid-node/commit/466a5fd2300d661c2681bd5103789b45d99a9859))
* **internal:** skip tests that depend on mock server ([097f8f2](https://github.com/DatagridAI/datagrid-node/commit/097f8f2e3680959c8f37f11885dc89041d8a25c4))


### Chores

* **ci:** skip lint on metadata-only changes ([e5da419](https://github.com/DatagridAI/datagrid-node/commit/e5da419b29607361424ac5e6ac247b6e133451a5))
* **ci:** skip uploading artifacts on stainless-internal branches ([df25774](https://github.com/DatagridAI/datagrid-node/commit/df2577482d3b946ceb7c3921d09eecfa4007cc89))
* **ci:** upgrade `actions/github-script` ([e174f0d](https://github.com/DatagridAI/datagrid-node/commit/e174f0de6210f7b3ad48937476e588a949a13f41))
* **client:** do not parse responses with empty content-length ([8dbba6c](https://github.com/DatagridAI/datagrid-node/commit/8dbba6cbc1a5aa5b48d0eff367687f07a413cb77))
* **internal:** move stringifyQuery implementation to internal function ([5ae2174](https://github.com/DatagridAI/datagrid-node/commit/5ae21743c17ef0c58519cfb94462ddbd8f890556))
* **internal:** tweak CI branches ([8ac29f1](https://github.com/DatagridAI/datagrid-node/commit/8ac29f1b09e38b5fbcef57a0715054dbfcca54fe))
* **internal:** update gitignore ([4366073](https://github.com/DatagridAI/datagrid-node/commit/436607337bdfeb342a212c54b9f7be8d87f17181))
* **internal:** update multipart form array serialization ([8ac5c6d](https://github.com/DatagridAI/datagrid-node/commit/8ac5c6d257717f3b9d1b991749b9e7e9ee5f19a3))
* **test:** do not count install time for mock server timeout ([14e8c16](https://github.com/DatagridAI/datagrid-node/commit/14e8c16f070f28406d571adf7e2e74b0f8d77c85))
* **tests:** bump steady to v0.19.4 ([2922e70](https://github.com/DatagridAI/datagrid-node/commit/2922e709e6b89208202620f910ce75337b005118))
* **tests:** bump steady to v0.19.5 ([8615a80](https://github.com/DatagridAI/datagrid-node/commit/8615a801ee0ddf69c51ac1af9d3cd871b4e12845))
* **tests:** bump steady to v0.19.6 ([bf02cd5](https://github.com/DatagridAI/datagrid-node/commit/bf02cd5db0ab8526bb04e53f052d377025927f79))
* **tests:** bump steady to v0.19.7 ([6689f8f](https://github.com/DatagridAI/datagrid-node/commit/6689f8fe71ec40128a3373f9493e917e5f4b7b9c))
* **tests:** bump steady to v0.20.1 ([024dbfa](https://github.com/DatagridAI/datagrid-node/commit/024dbfa97afb5e0f99cc684d51758ddc8f51086f))
* **tests:** bump steady to v0.20.2 ([5a6b7d3](https://github.com/DatagridAI/datagrid-node/commit/5a6b7d39e1b0ff8fcde05a6b7ffe66e231992e97))
* update mock server docs ([4bde56d](https://github.com/DatagridAI/datagrid-node/commit/4bde56d0fb9238d97fe02702ff8b10ff85c2f69e))
* update placeholder string ([7862f65](https://github.com/DatagridAI/datagrid-node/commit/7862f6573e76e17553514a0c30c690f89370a2e4))


### Refactors

* **tests:** switch from prism to steady ([21583ad](https://github.com/DatagridAI/datagrid-node/commit/21583ad63109b03016121f4981ad1100ad865bcc))

## 0.8.0 (2026-01-21)

Full Changelog: [v0.6.0...v0.8.0](https://github.com/DatagridAI/datagrid-node/compare/v0.6.0...v0.8.0)

### Features

* **api:** api update ([058c8f3](https://github.com/DatagridAI/datagrid-node/commit/058c8f32e643fc3516d3073ecd3fb40e92210646))


### Chores

* **internal:** update `actions/checkout` version ([18fcabc](https://github.com/DatagridAI/datagrid-node/commit/18fcabc770f0f2564804e93e2f1d09aa90b2540b))
* **internal:** upgrade babel, qs, js-yaml ([7b3679a](https://github.com/DatagridAI/datagrid-node/commit/7b3679acfc10b8c35841ae5004c4eccce5a7a909))

## 0.6.0 (2026-01-12)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/DatagridAI/datagrid-node/compare/v0.5.0...v0.6.0)

### Features

* **api:** api update ([829c046](https://github.com/DatagridAI/datagrid-node/commit/829c0467912980f53d2f5ce8750a7ae9fefba688))


### Chores

* break long lines in snippets into multiline ([33f9cb7](https://github.com/DatagridAI/datagrid-node/commit/33f9cb7ce53d10f26a190ef9a125dd71182ad40b))

## 0.5.0 (2026-01-04)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/DatagridAI/datagrid-node/compare/v0.4.0...v0.5.0)

### Features

* **api:** api update ([223decf](https://github.com/DatagridAI/datagrid-node/commit/223decf0150ffe960607cfd66e430cd45c7709cb))

## 0.4.0 (2025-12-15)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/DatagridAI/datagrid-node/compare/v0.3.0...v0.4.0)

### Features

* **api:** api update ([8bc2d6f](https://github.com/DatagridAI/datagrid-node/commit/8bc2d6f3a68dce25bf2a4fc2089a7bd6b5dc38b4))
* **api:** api update ([6ebde38](https://github.com/DatagridAI/datagrid-node/commit/6ebde3898ddd72e156e1e1c758fc41f0a1e2d5ce))


### Bug Fixes

* **mcp:** correct code tool API endpoint ([099e0c6](https://github.com/DatagridAI/datagrid-node/commit/099e0c6746bfbdaddb24525caf05868314e8cd38))
* **mcp:** return correct lines on typescript errors ([6612c06](https://github.com/DatagridAI/datagrid-node/commit/6612c06931cb803441f7c1eb6a75dcee7e66679c))


### Chores

* **internal:** codegen related update ([6ed144e](https://github.com/DatagridAI/datagrid-node/commit/6ed144e51eb7972461aab98ce60fb56a487a7216))
* **internal:** codegen related update ([abfab5d](https://github.com/DatagridAI/datagrid-node/commit/abfab5d75c69f070578803371446142deed3aafa))

## 0.3.0 (2025-11-22)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/DatagridAI/datagrid-node/compare/v0.2.0...v0.3.0)

### Features

* **api:** api update ([7edce8e](https://github.com/DatagridAI/datagrid-node/commit/7edce8e8d35095dc1cb0dbdfaaa92563a81fbd7d))
* **api:** api update ([802f38f](https://github.com/DatagridAI/datagrid-node/commit/802f38fedd24154b86e6bb196de787c8cbef1f51))

## 0.2.0 (2025-11-05)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0...v0.2.0)

### Features

* **api:** api update ([594bdad](https://github.com/DatagridAI/datagrid-node/commit/594bdadccf51e2f43a26c9ebfcf6932432d5b630))
* **api:** api update ([d15bd6a](https://github.com/DatagridAI/datagrid-node/commit/d15bd6a0ab77b3213fa30ffef1c2e5e39b1df755))
* **api:** api update ([c028c10](https://github.com/DatagridAI/datagrid-node/commit/c028c1010d3979fd588d23e4abf83be8bd5d24e4))


### Bug Fixes

* coerce nullable values to undefined ([d56d2e5](https://github.com/DatagridAI/datagrid-node/commit/d56d2e50a46227dd5e51189d535b15824d0defdd))


### Performance Improvements

* faster formatting ([2ed4d0f](https://github.com/DatagridAI/datagrid-node/commit/2ed4d0f7c43b2149a4029ed65acec85a8154f92c))


### Chores

* ci build action ([af7a274](https://github.com/DatagridAI/datagrid-node/commit/af7a274dd77a9ca21cfd4c007cd6befe60efc5e3))
* do not install brew dependencies in ./scripts/bootstrap by default ([04be7aa](https://github.com/DatagridAI/datagrid-node/commit/04be7aa85f7af09beacf214da599af25e0d7afe2))
* **internal:** codegen related update ([64274c8](https://github.com/DatagridAI/datagrid-node/commit/64274c8e83a275f08b2fabe61a725a440b6a654b))
* **internal:** fix incremental formatting in some cases ([517d1fe](https://github.com/DatagridAI/datagrid-node/commit/517d1fefd0a4c5a7a46dfc15e4339b61eb113209))
* **internal:** ignore .eslintcache ([4a367d9](https://github.com/DatagridAI/datagrid-node/commit/4a367d90e893b39f1249f3329668a6e6deaa2533))
* **internal:** remove .eslintcache ([c8633a7](https://github.com/DatagridAI/datagrid-node/commit/c8633a709abf4b235a2af827ac0019a939f30e07))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([67e0ebb](https://github.com/DatagridAI/datagrid-node/commit/67e0ebb4d58b8710b6d251d26f7c1a448398bc3c))
* **internal:** use npm pack for build uploads ([6a5c235](https://github.com/DatagridAI/datagrid-node/commit/6a5c235e22a622e237260ae02da47e8eef3279c7))

## 0.1.0 (2025-08-29)

Full Changelog: [v0.1.0-alpha.10...v0.1.0](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.10...v0.1.0)

### Features

* **api:** api update ([b2b0f8f](https://github.com/DatagridAI/datagrid-node/commit/b2b0f8ff029e60867e0f18af98914fcead1b4b66))
* **api:** api update ([e9a8b5d](https://github.com/DatagridAI/datagrid-node/commit/e9a8b5d875b07b4fb7650a1f9c2235cfb7ff448e))
* **api:** api update ([3c7e62a](https://github.com/DatagridAI/datagrid-node/commit/3c7e62a08ef7df8612c4057d7c9c34131137593b))
* **api:** api update ([26e2f8c](https://github.com/DatagridAI/datagrid-node/commit/26e2f8c3065a90a6299b87974a3db1aa89cad76a))
* **api:** manual updates ([16171f4](https://github.com/DatagridAI/datagrid-node/commit/16171f4edf5cd188c54878108ffa501aa8603db0))


### Chores

* **deps:** update dependency node-fetch to v2.6.13 ([418fa5c](https://github.com/DatagridAI/datagrid-node/commit/418fa5ca9d6cd2decf26f2636a473583d12b6c0d))
* **internal:** formatting change ([da90542](https://github.com/DatagridAI/datagrid-node/commit/da905426a55a3b89a2089eecf4076234f5c0076f))
* **internal:** update comment in script ([e5d96c3](https://github.com/DatagridAI/datagrid-node/commit/e5d96c35e765bce947fa1a878cda09d3b0286294))
* update @stainless-api/prism-cli to v5.15.0 ([be254d7](https://github.com/DatagridAI/datagrid-node/commit/be254d70940fd40933e90e3c4880f02d90f21aef))
* update CI script ([a044e24](https://github.com/DatagridAI/datagrid-node/commit/a044e24d72857fc64c46f72397cdb3a33113389b))

## 0.1.0-alpha.10 (2025-08-07)

Full Changelog: [v0.1.0-alpha.9...v0.1.0-alpha.10](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.9...v0.1.0-alpha.10)

### Features

* **api:** api update ([06f9f05](https://github.com/DatagridAI/datagrid-node/commit/06f9f056638d6dc05717b0921e8034ff02c3800f))
* **api:** api update ([7a0cde6](https://github.com/DatagridAI/datagrid-node/commit/7a0cde66c40cb2d25ed82a492827043db17e8983))


### Bug Fixes

* **ci:** release-doctor — report correct token name ([8b50625](https://github.com/DatagridAI/datagrid-node/commit/8b50625e8adeb109e6e026552060385883a30903))
* **client:** don't send `Content-Type` for bodyless methods ([d024b40](https://github.com/DatagridAI/datagrid-node/commit/d024b40c17ccb3bb962e750e75b21e0c11bed468))


### Chores

* **ci:** only run for pushes and fork pull requests ([62cae59](https://github.com/DatagridAI/datagrid-node/commit/62cae592d8d011544a00f6a636b6f1a3ec4c1e0b))
* **internal:** move publish config ([30c2542](https://github.com/DatagridAI/datagrid-node/commit/30c2542cee26ffd26c73a5bf9cba6293d9257413))
* **internal:** remove redundant imports config ([f302b7e](https://github.com/DatagridAI/datagrid-node/commit/f302b7e27cbcf935cbd20e016136afd1ad81c642))
* make some internal functions async ([7400950](https://github.com/DatagridAI/datagrid-node/commit/74009503469d9e64d39c7d259ca536a177c4d5ee))
* mention unit type in timeout docs ([7855479](https://github.com/DatagridAI/datagrid-node/commit/78554794edee2f25e81d31556a16af1eb65091a3))

## 0.1.0-alpha.9 (2025-06-23)

Full Changelog: [v0.1.0-alpha.8...v0.1.0-alpha.9](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.8...v0.1.0-alpha.9)

### Features

* **api:** api update ([da8161d](https://github.com/DatagridAI/datagrid-node/commit/da8161d8f85ae2e3b8482ed2e443576cc3fe6840))
* **api:** api update ([e1dd704](https://github.com/DatagridAI/datagrid-node/commit/e1dd7041beb674387323606fb9f32f5d2dd03359))
* **api:** api update ([a269b85](https://github.com/DatagridAI/datagrid-node/commit/a269b85ab43fabdcbe0b650c80b249104facaab8))
* **api:** api update ([77ab1e3](https://github.com/DatagridAI/datagrid-node/commit/77ab1e3ad56ccbf08bbeb50cafbd50fc5a0c6863))
* **api:** api update ([bf5a2c4](https://github.com/DatagridAI/datagrid-node/commit/bf5a2c4066445d4ce6c7cf8984fbdee53c570bf4))
* **api:** api update ([9fef1f9](https://github.com/DatagridAI/datagrid-node/commit/9fef1f95f1b69f5991017efabd84fd0191b164da))
* **client:** add support for endpoint-specific base URLs ([3378451](https://github.com/DatagridAI/datagrid-node/commit/3378451f6720db574928a86abe2451f0c5db9030))


### Bug Fixes

* publish script — handle NPM errors correctly ([f334d6d](https://github.com/DatagridAI/datagrid-node/commit/f334d6d4eaf81aa28f25ae4b2178a571ad702eda))


### Chores

* **ci:** enable for pull requests ([a5f3b64](https://github.com/DatagridAI/datagrid-node/commit/a5f3b6435b72b1b0aa58fd7415ee805134611235))
* **docs:** grammar improvements ([640c65e](https://github.com/DatagridAI/datagrid-node/commit/640c65e76867312b546f588e665937a30499b30c))
* **docs:** use top-level-await in example snippets ([66a13a7](https://github.com/DatagridAI/datagrid-node/commit/66a13a720c806e9efec80390bce357f4e4a1218f))
* improve publish-npm script --latest tag logic ([97eaf2c](https://github.com/DatagridAI/datagrid-node/commit/97eaf2cd58c05eac3251aee4d26f0c0cf3086114))
* **internal:** make base APIResource abstract ([98a633d](https://github.com/DatagridAI/datagrid-node/commit/98a633d538d14c156ac881509f087d612f82a19a))
* update SDK settings ([f764a12](https://github.com/DatagridAI/datagrid-node/commit/f764a126ef972ca8cd939702a97077caacb1069d))
* update SDK settings ([cdb6110](https://github.com/DatagridAI/datagrid-node/commit/cdb61108e0d1301665343dcf90f3df6d2e28fa5a))

## 0.1.0-alpha.8 (2025-05-14)

Full Changelog: [v0.1.0-alpha.7...v0.1.0-alpha.8](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.7...v0.1.0-alpha.8)

### Chores

* update SDK settings ([abf6a3e](https://github.com/DatagridAI/datagrid-node/commit/abf6a3ef6006d3b7c5022a5a9fcca467bf770dcb))

## 0.1.0-alpha.7 (2025-05-13)

Full Changelog: [v0.1.0-alpha.6...v0.1.0-alpha.7](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.6...v0.1.0-alpha.7)

### Features

* **api:** api update ([c76f79c](https://github.com/DatagridAI/datagrid-node/commit/c76f79c8dd39971a6e1a99d865bc530082c359b5))
* **api:** api update ([6d3c14f](https://github.com/DatagridAI/datagrid-node/commit/6d3c14f8fb7686afaab8446902e57197bf74c054))
* **api:** api update ([794ae1e](https://github.com/DatagridAI/datagrid-node/commit/794ae1e1bfd9e031152998b82900857b7fe22c28))


### Bug Fixes

* **api:** improve type resolution when importing as a package ([563f264](https://github.com/DatagridAI/datagrid-node/commit/563f2641d55b996db5d448225b497e5a6964460c))
* **client:** send `X-Stainless-Timeout` in seconds ([b1b1d3d](https://github.com/DatagridAI/datagrid-node/commit/b1b1d3df2823a6edf9d93be400d59f99c45f2f05))
* **mcp:** remove unused tools.ts ([f64295b](https://github.com/DatagridAI/datagrid-node/commit/f64295b853cfb5391b1e86087b9b27e7f7a342ed))


### Chores

* **ci:** add timeout thresholds for CI jobs ([6fe0a37](https://github.com/DatagridAI/datagrid-node/commit/6fe0a3753cb300dad1859671fd17c1fddc387fb9))
* **ci:** bump node version for release workflows ([ac101ce](https://github.com/DatagridAI/datagrid-node/commit/ac101ced83a1b0ab7f4bb8c63434973d1c0ca0ca))
* **ci:** only use depot for staging repos ([d4f97a4](https://github.com/DatagridAI/datagrid-node/commit/d4f97a4a0ff561a8b8fbae6e9fbdfb3db477849b))
* **client:** minor internal fixes ([eaf4d66](https://github.com/DatagridAI/datagrid-node/commit/eaf4d667a402d9aaeb49bcbbdd8698f627d94f65))
* go live ([#52](https://github.com/DatagridAI/datagrid-node/issues/52)) ([410a557](https://github.com/DatagridAI/datagrid-node/commit/410a557bef5962f87d1a8750c24f3769228a8f33))
* **internal:** add aliases for Record and Array ([86bdd4c](https://github.com/DatagridAI/datagrid-node/commit/86bdd4c56ffec4a5b885d1bb83d03cfce46830aa))
* **internal:** codegen related update ([d7544a3](https://github.com/DatagridAI/datagrid-node/commit/d7544a3993499cdef2bde4159c3c85fc5cfad90c))
* **internal:** reduce CI branch coverage ([2737ac0](https://github.com/DatagridAI/datagrid-node/commit/2737ac07418b9af7ecef51ff257425893e0c6083))
* **internal:** upload builds and expand CI branch coverage ([a38e24d](https://github.com/DatagridAI/datagrid-node/commit/a38e24dc846d79c61f51035b38157d4dbde53af7))
* update SDK settings ([b63a21e](https://github.com/DatagridAI/datagrid-node/commit/b63a21e530713a3bed559908777341a2a777a0a8))
* update SDK settings ([#54](https://github.com/DatagridAI/datagrid-node/issues/54)) ([a262911](https://github.com/DatagridAI/datagrid-node/commit/a26291102a3acdf7571ca2854180d2d1a9347ac0))


### Documentation

* **readme:** fix typo ([b3ba9a9](https://github.com/DatagridAI/datagrid-node/commit/b3ba9a90d41a3c010469c1fe47a92bdbaecb6e01))

## 0.1.0-alpha.6 (2025-04-02)

Full Changelog: [v0.1.0-alpha.4...v0.1.0-alpha.6](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.4...v0.1.0-alpha.6)

### Features

* **api:** api update ([6d5c9dd](https://github.com/DatagridAI/datagrid-node/commit/6d5c9dd64f039a71fc95ae62f0b93b005095726b))


### Chores

* go live ([#47](https://github.com/DatagridAI/datagrid-node/issues/47)) ([226c7fd](https://github.com/DatagridAI/datagrid-node/commit/226c7fdcaa9c197643a3fc4cac84ca2f3086b061))
* go live ([#49](https://github.com/DatagridAI/datagrid-node/issues/49)) ([6930fd0](https://github.com/DatagridAI/datagrid-node/commit/6930fd0b50cb3e7dd3ea8ea64422bcb5301a84bf))
* sync repo ([eafd5f6](https://github.com/DatagridAI/datagrid-node/commit/eafd5f662c6db2aa5fa17ecd32b976e541c3ecd5))
* update SDK settings ([#50](https://github.com/DatagridAI/datagrid-node/issues/50)) ([5f2f125](https://github.com/DatagridAI/datagrid-node/commit/5f2f1258c11c91f669231ee77d078172faaf4268))

## 0.1.0-alpha.4 (2025-01-29)

Full Changelog: [v0.1.0-alpha.3...v0.1.0-alpha.4](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.3...v0.1.0-alpha.4)

### Features

* **api:** api update ([38a0a25](https://github.com/DatagridAI/datagrid-node/commit/38a0a25abdb344a901e136c557e976d68c44a5d7))


### Chores

* go live ([#38](https://github.com/DatagridAI/datagrid-node/issues/38)) ([73b6907](https://github.com/DatagridAI/datagrid-node/commit/73b69072670b3166d8ced85170d4bc7144b2ca55))
* go live ([#40](https://github.com/DatagridAI/datagrid-node/issues/40)) ([58e482a](https://github.com/DatagridAI/datagrid-node/commit/58e482a30fb0d271af20c8910d3dbc5dac6e845f))
* sync repo ([242f44e](https://github.com/DatagridAI/datagrid-node/commit/242f44e6dd7b66ca52c9335a2988bfebe90df608))
* update SDK settings ([#42](https://github.com/DatagridAI/datagrid-node/issues/42)) ([9804fc8](https://github.com/DatagridAI/datagrid-node/commit/9804fc803356a8ef99ef9dac8d31a30dc760ccec))

## 0.1.0-alpha.3 (2025-01-28)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Chores

* go live ([#33](https://github.com/DatagridAI/datagrid-node/issues/33)) ([b66bcdd](https://github.com/DatagridAI/datagrid-node/commit/b66bcdd7e64842eea0bd87889fd32e67f7a1868b))
* update SDK settings ([#35](https://github.com/DatagridAI/datagrid-node/issues/35)) ([b6b567d](https://github.com/DatagridAI/datagrid-node/commit/b6b567d8600078bed297fa411688ee5b478ad60f))

## 0.1.0-alpha.2 (2025-01-27)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/DatagridAI/datagrid-node/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* sse converse ([d0f819e](https://github.com/DatagridAI/datagrid-node/commit/d0f819eb6352fe4ba1a264d34ebf6d1e0f91873a))


### Chores

* go live ([#28](https://github.com/DatagridAI/datagrid-node/issues/28)) ([f9c69ba](https://github.com/DatagridAI/datagrid-node/commit/f9c69baa9d44b127abdb769da8bdd0fab7390df4))
* update SDK settings ([#30](https://github.com/DatagridAI/datagrid-node/issues/30)) ([5a94487](https://github.com/DatagridAI/datagrid-node/commit/5a94487e0ca8b15e868dbf3b1afcae688c1d35e6))

## 0.1.0-alpha.1 (2025-01-24)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/DatagridAI/datagrid-node/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** api update ([58818eb](https://github.com/DatagridAI/datagrid-node/commit/58818eb4b5d326caeeae049ffcdf809a038d65f7))
* **api:** update via SDK Studio ([3ade542](https://github.com/DatagridAI/datagrid-node/commit/3ade542922c7d4d57bfb0f41d31d9cb218929030))
* **api:** update via SDK Studio ([1c4a11d](https://github.com/DatagridAI/datagrid-node/commit/1c4a11dde9d57b449ebf3630f84ced62c1f5dfa3))
* Update tsconfig.json ([042f2a9](https://github.com/DatagridAI/datagrid-node/commit/042f2a9df0d709d2de9d5b62e2265dbcceff4959))


### Bug Fixes

* **client:** normalize method ([#13](https://github.com/DatagridAI/datagrid-node/issues/13)) ([4e169f9](https://github.com/DatagridAI/datagrid-node/commit/4e169f982ed14dc891a5fc5651a3d79d0cca1155))
* comment problem tests ([38a47e6](https://github.com/DatagridAI/datagrid-node/commit/38a47e6596ed7bf6050602f2dfbb01dc950ebbb1))
* comment problematic tests ([0ace24c](https://github.com/DatagridAI/datagrid-node/commit/0ace24cfae2513bf81aad193c07f36ffd73aa076))
* comment problematic tests ([0ace24c](https://github.com/DatagridAI/datagrid-node/commit/0ace24cfae2513bf81aad193c07f36ffd73aa076))
* resolve issue with lint test ([be64ab1](https://github.com/DatagridAI/datagrid-node/commit/be64ab1b13df026e4fcee9d9c731e676971806e3))
* skip ([a4e0b26](https://github.com/DatagridAI/datagrid-node/commit/a4e0b26e2571f1acb7ea83dc6ff62ee6a7557b25))


### Chores

* go live ([#17](https://github.com/DatagridAI/datagrid-node/issues/17)) ([7f53f09](https://github.com/DatagridAI/datagrid-node/commit/7f53f09b445d0292fd81d36b57f2962f2f846502))
* go live ([#18](https://github.com/DatagridAI/datagrid-node/issues/18)) ([e9fa9a6](https://github.com/DatagridAI/datagrid-node/commit/e9fa9a6f530578ad8cdecea22cbea944bc42a3cf))
* go live ([#22](https://github.com/DatagridAI/datagrid-node/issues/22)) ([a334dd9](https://github.com/DatagridAI/datagrid-node/commit/a334dd9fbbc454168b8eaa4d2ea0fad47ab698e4))
* go live ([#3](https://github.com/DatagridAI/datagrid-node/issues/3)) ([ea43319](https://github.com/DatagridAI/datagrid-node/commit/ea433190eb3cdea88cf02aecf35fa90e3b6b791d))
* **internal:** codegen related update ([4f9f2ea](https://github.com/DatagridAI/datagrid-node/commit/4f9f2ea6e3fb2f5b13401d120a688b82dc1bd401))
* **internal:** codegen related update ([#10](https://github.com/DatagridAI/datagrid-node/issues/10)) ([69f6517](https://github.com/DatagridAI/datagrid-node/commit/69f65179ec0b7f69876ae532da3894d59b4e7a51))
* **internal:** codegen related update ([#11](https://github.com/DatagridAI/datagrid-node/issues/11)) ([e1bebff](https://github.com/DatagridAI/datagrid-node/commit/e1bebffe7d8dc872d9ac0b0ffd475fefb1e9a639))
* **internal:** codegen related update ([#12](https://github.com/DatagridAI/datagrid-node/issues/12)) ([5feaac1](https://github.com/DatagridAI/datagrid-node/commit/5feaac13b810c7b1565974eba50c532678687039))
* **internal:** codegen related update ([#14](https://github.com/DatagridAI/datagrid-node/issues/14)) ([7d60eba](https://github.com/DatagridAI/datagrid-node/commit/7d60ebad880e076e9cee9ab9ed4a97352434d465))
* **internal:** codegen related update ([#16](https://github.com/DatagridAI/datagrid-node/issues/16)) ([072cd1f](https://github.com/DatagridAI/datagrid-node/commit/072cd1f482ce41df2a17f8d307290823f50ff649))
* **internal:** codegen related update ([#7](https://github.com/DatagridAI/datagrid-node/issues/7)) ([a2262d4](https://github.com/DatagridAI/datagrid-node/commit/a2262d42c1a7872ed663f34a3df8ae2608beca30))
* **internal:** codegen related update ([#8](https://github.com/DatagridAI/datagrid-node/issues/8)) ([faef9ba](https://github.com/DatagridAI/datagrid-node/commit/faef9bae26f23edc7c59aef229183987d1c3fb84))
* **internal:** codegen related update ([#9](https://github.com/DatagridAI/datagrid-node/issues/9)) ([d2e927f](https://github.com/DatagridAI/datagrid-node/commit/d2e927fa119d23f8bccedeea3c111e62bc51e12d))
* **internal:** fix some typos ([#6](https://github.com/DatagridAI/datagrid-node/issues/6)) ([b245755](https://github.com/DatagridAI/datagrid-node/commit/b2457552d9b5f5ce17cb592f747ae04151b8d394))
* update SDK settings ([#5](https://github.com/DatagridAI/datagrid-node/issues/5)) ([19e5df1](https://github.com/DatagridAI/datagrid-node/commit/19e5df1e31221bc6404ba251a56bdbc91d19369b))
