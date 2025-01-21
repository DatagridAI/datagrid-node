# Datagrid

Types:

- <code><a href="./src/resources/top-level.ts">Properties</a></code>
- <code><a href="./src/resources/top-level.ts">ConverseResponse</a></code>

Methods:

- <code title="post /converse">client.<a href="./src/index.ts">converse</a>({ ...params }) -> ConverseResponse</code>

# Knowledge

Types:

- <code><a href="./src/resources/knowledge.ts">Knowledge</a></code>
- <code><a href="./src/resources/knowledge.ts">KnowledgeUpdateResponse</a></code>

Methods:

- <code title="post /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">create</a>({ ...params }) -> Knowledge</code>
- <code title="get /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">retrieve</a>(knowledgeId) -> Knowledge</code>
- <code title="patch /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">update</a>(knowledgeId, { ...params }) -> KnowledgeUpdateResponse</code>
- <code title="get /knowledge">client.knowledge.<a href="./src/resources/knowledge.ts">list</a>({ ...params }) -> KnowledgesCursorIDPage</code>
- <code title="delete /knowledge/{knowledge_id}">client.knowledge.<a href="./src/resources/knowledge.ts">delete</a>(knowledgeId) -> void</code>

# Health

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">checkAPIHealth</a>() -> void</code>
