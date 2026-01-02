## Idempotency

Purpose:
- Prevent duplicate state changes on retries
- Ensure safe POST operations

Implementation:
- Idempotency-Key header
- Redis-backed response storage
- TTL-based cleanup

Key Learnings:
- Retries are unavoidable
- Idempotency is a backend responsibility
- Redis enables distributed safety
