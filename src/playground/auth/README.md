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
