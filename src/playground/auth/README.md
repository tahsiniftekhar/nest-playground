## Auth Playground - Part 1 (JWT Basics)

Purpose:
- Implement basic authentication using JWT
- Protect routes using a custom auth guard

Key Learnings:
- JWT is issued during login and verified on each request
- Guards enforce authentication before controller logic
- JwtService is injected using Nest DI
- User payload is attached to request after verification

Limitations:
- No refresh token yet
- No database-backed users
- Token invalidation not handled

## Auth Playground - Part 2 (Refresh Tokens)

Purpose:
- Implement secure token renewal using refresh tokens
- Prevent token replay attacks using rotation

Key Learnings:
- Access tokens are short-lived and stateless
- Refresh tokens are long-lived and stored server-side
- Refresh tokens must be rotated on every use
- Reusing an old refresh token invalidates the session

Security Notes:
- Different secrets for access and refresh tokens
- Token rotation limits damage from token theft

## Rate Limiting

Purpose:
- Protect APIs from abuse and brute-force attacks
- Ensure fair usage per client

Implementation:
- Redis-based sliding window counter
- Limits enforced via NestJS Guard
- Shared state across instances

Key Learnings:
- In-memory rate limiting does not scale
- Redis enables distributed enforcement
- Rate limiting is a security feature, not optimization

## Identity-aware Rate Limiting

Strategies:
- Public routes: IP-based
- Authenticated routes: userId-based
- Sensitive routes: IP + userId

Why:
- Prevent brute-force attacks
- Prevent token abuse
- Fair usage for authenticated users
