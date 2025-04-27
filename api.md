# Datagrid

Types:

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
- <code><a href="./src/resources/knowledge.ts">KnowledgeUpdateResponse</a></code>

Methods:

- <code title="post /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">create</a>({ ...params }) -> Knowledge</code>
- <code title="get /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">retrieve</a>(knowledgeId) -> Knowledge</code>
- <code title="patch /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">update</a>(knowledgeId, { ...params }) -> KnowledgeUpdateResponse</code>
- <code title="get /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">list</a>({ ...params }) -> KnowledgesCursorIDPage</code>
- <code title="delete /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">delete</a>(knowledgeId) -> void</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileObject</a></code>

Methods:

- <code title="post /files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileObject</code>
- <code title="get /files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileId) -> FileObject</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileObjectsCursorIDPage</code>
- <code title="delete /files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileId) -> void</code>
- <code title="get /files/{file_id}/content">client.files.<a href="./src/resources/files.ts">content</a>(fileId) -> Response</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchResultItem</a></code>
- <code><a href="./src/resources/search.ts">SearchResultResource</a></code>
- <code><a href="./src/resources/search.ts">SearchResultResourceType</a></code>

Methods:

- <code title="get /search">client.search.<a href="./src/resources/search.ts">search</a>({ ...params }) -> SearchResultItemsCursorPage</code>
