# Datagrid

Types:

- <code><a href="./src/resources/top-level.ts">AgentToolItem</a></code>
- <code><a href="./src/resources/top-level.ts">AgentTools</a></code>
- <code><a href="./src/resources/top-level.ts">Properties</a></code>
- <code><a href="./src/resources/top-level.ts">ConverseResponse</a></code>

Methods:

- <code title="post /converse">client.<a href="./src/index.ts">converse</a>({ ...params }) -> ConverseResponse</code>

# Knowledge

Types:

- <code><a href="./src/resources/knowledge.ts">AttachmentMetadata</a></code>
- <code><a href="./src/resources/knowledge.ts">Knowledge</a></code>
- <code><a href="./src/resources/knowledge.ts">KnowledgeMetadata</a></code>
- <code><a href="./src/resources/knowledge.ts">MessageMetadata</a></code>
- <code><a href="./src/resources/knowledge.ts">RowMetadata</a></code>
- <code><a href="./src/resources/knowledge.ts">TableMetadata</a></code>
- <code><a href="./src/resources/knowledge.ts">KnowledgeCreateResponse</a></code>
- <code><a href="./src/resources/knowledge.ts">KnowledgeUpdateResponse</a></code>

Methods:

- <code title="post /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">create</a>({ ...params }) -> KnowledgeCreateResponse</code>
- <code title="get /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">retrieve</a>(knowledgeId) -> Knowledge</code>
- <code title="patch /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">update</a>(knowledgeId, { ...params }) -> KnowledgeUpdateResponse</code>
- <code title="get /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">list</a>({ ...params }) -> KnowledgesCursorIDPage</code>
- <code title="delete /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">delete</a>(knowledgeId) -> void</code>

# Connections

Types:

- <code><a href="./src/resources/connections.ts">Connection</a></code>
- <code><a href="./src/resources/connections.ts">RedirectURLResponse</a></code>

Methods:

- <code title="post /connections">client.connections.<a href="./src/resources/connections.ts">create</a>({ ...params }) -> RedirectURLResponse</code>
- <code title="get /connections/{connection_id}">client.connections.<a href="./src/resources/connections.ts">retrieve</a>(connectionId) -> Connection</code>
- <code title="patch /connections/{connection_id}">client.connections.<a href="./src/resources/connections.ts">update</a>(connectionId, { ...params }) -> Connection</code>
- <code title="get /connections">client.connections.<a href="./src/resources/connections.ts">list</a>({ ...params }) -> ConnectionsCursorIDPage</code>
- <code title="delete /connections/{connection_id}">client.connections.<a href="./src/resources/connections.ts">delete</a>(connectionId) -> void</code>

# Connectors

Types:

- <code><a href="./src/resources/connectors.ts">Connector</a></code>

Methods:

- <code title="get /connectors">client.connectors.<a href="./src/resources/connectors.ts">list</a>({ ...params }) -> ConnectorsCursorIDPage</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileObject</a></code>

Methods:

- <code title="post /files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileObject</code>
- <code title="get /files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileId) -> FileObject</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileObjectsCursorIDPage</code>
- <code title="delete /files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileId) -> void</code>
- <code title="get /files/{file_id}/content">client.files.<a href="./src/resources/files.ts">content</a>(fileId) -> Response</code>

# Credits

Types:

- <code><a href="./src/resources/credits.ts">CreditsConverseResponse</a></code>
- <code><a href="./src/resources/credits.ts">CreditsKnowledgeResponse</a></code>
- <code><a href="./src/resources/credits.ts">CreditsResponse</a></code>

Methods:

- <code title="get /credits">client.credits.<a href="./src/resources/credits.ts">get</a>() -> CreditsResponse</code>

# Secrets

Types:

- <code><a href="./src/resources/secrets.ts">Secret</a></code>

Methods:

- <code title="post /secrets">client.secrets.<a href="./src/resources/secrets.ts">create</a>({ ...params }) -> Secret</code>
- <code title="get /secrets/{secret_id}">client.secrets.<a href="./src/resources/secrets.ts">retrieve</a>(secretId) -> Secret</code>
- <code title="get /secrets">client.secrets.<a href="./src/resources/secrets.ts">list</a>({ ...params }) -> SecretsCursorIDPage</code>
- <code title="delete /secrets/{secret_id}">client.secrets.<a href="./src/resources/secrets.ts">delete</a>(secretId) -> void</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchResultItem</a></code>
- <code><a href="./src/resources/search.ts">SearchResultResource</a></code>
- <code><a href="./src/resources/search.ts">SearchResultResourceType</a></code>

Methods:

- <code title="get /search">client.search.<a href="./src/resources/search.ts">search</a>({ ...params }) -> SearchResultItemsCursorPage</code>

# Organization

## Teamspaces

Types:

- <code><a href="./src/resources/organization/teamspaces.ts">Teamspace</a></code>

Methods:

- <code title="post /organization/teamspaces">client.organization.teamspaces.<a href="./src/resources/organization/teamspaces.ts">create</a>({ ...params }) -> Teamspace</code>
- <code title="get /organization/teamspaces/{teamspace_id}">client.organization.teamspaces.<a href="./src/resources/organization/teamspaces.ts">retrieve</a>(teamspaceId) -> Teamspace</code>
- <code title="get /organization/teamspaces">client.organization.teamspaces.<a href="./src/resources/organization/teamspaces.ts">list</a>({ ...params }) -> TeamspacesCursorIDPage</code>
- <code title="patch /organization/teamspaces/{teamspace_id}">client.organization.teamspaces.<a href="./src/resources/organization/teamspaces.ts">patch</a>(teamspaceId, { ...params }) -> Teamspace</code>

# Memory

## User

Types:

- <code><a href="./src/resources/memory/user.ts">UserMemory</a></code>
- <code><a href="./src/resources/memory/user.ts">UserListResponse</a></code>

Methods:

- <code title="post /user-memories">client.memory.user.<a href="./src/resources/memory/user.ts">create</a>({ ...params }) -> UserMemory</code>
- <code title="get /user-memories">client.memory.user.<a href="./src/resources/memory/user.ts">list</a>({ ...params }) -> UserListResponse</code>
- <code title="delete /user-memories/{user_memory_id}">client.memory.user.<a href="./src/resources/memory/user.ts">delete</a>(userMemoryId) -> void</code>

# IFrameEvents

Types:

- <code><a href="./src/resources/i-frame-events.ts">ConnectionPayload</a></code>
- <code><a href="./src/resources/i-frame-events.ts">ErrorPayload</a></code>
- <code><a href="./src/resources/i-frame-events.ts">IFrameEvent</a></code>
- <code><a href="./src/resources/i-frame-events.ts">IFrameEventType</a></code>
- <code><a href="./src/resources/i-frame-events.ts">KnowledgeCreatedPayload</a></code>
- <code><a href="./src/resources/i-frame-events.ts">ResizePayload</a></code>
