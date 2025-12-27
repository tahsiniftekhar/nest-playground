## Middleware Playground

Purpose:
- Understand where middleware fits in NestJS request lifecycle
- Learn what middleware can and cannot do

What was implemented:
- A logging middleware applied at module level
- Logs incoming request method and URL
- Logs response status after request completion

Execution Timing
- Middleware runs early in the request lifecycle, processing each incoming request before other components like Guards or Pipes.

Key Observations:
- Middleware runs before routing and controllers
- Route metadata is not available inside middleware
- Forgetting to call `next()` blocks the request completely
- Middleware is ideal for logging, metrics, and request shaping

What middleware should NOT be used for:
- Authentication or authorization
- Role-based access control
- Request validation

Why:
- Middleware does not have access to execution context
- Guards and pipes are designed for those responsibilities
