## Interceptors Playground

Purpose:
- Wrap controller execution
- Modify responses and measure performance

Key Learnings:
- Interceptors run before and after controller logic
- next.handle() controls request execution
- Interceptors can transform responses centrally
- Execution time measurement belongs in interceptors

Execution Timing
- Interceptors run **before and after the route handler** but after Middleware and Guards.

Difference from middleware:
- Middleware runs before routing
- Interceptors have access to handler execution and response

## Choosing the Right Tool
Each of these tools has a unique role in the request-response lifecycle:

- **Middleware:** Ideal for tasks that need to run on all requests, like logging, authentication, and pre-processing.
- **Guards:** Use when you need to enforce access control, based on user roles or other authorization checks.
- **Interceptors:** Perfect for transforming and augmenting requests and responses, such as logging request durations or formatting responses.
- **Pipes:** Go-to for validation and data transformation, ensuring clean data is sent to your route handlers.
