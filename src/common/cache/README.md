## Caching

Type:
- Read-through caching

Storage:
- Redis

Rules:
- Cache only read-heavy endpoints
- Invalidate cache on writes
  - Any write that changes data MUST invalidate related cache.
  - <code>await this.cache.del(`order:${orderId}`);
 </code>
- TTL is mandatory

Key Learnings:
- Caching improves performance, not correctness
- Invalidation is the hardest part
- Controllers should not handle caching logic
