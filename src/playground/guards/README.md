## Guards Playground

Purpose:
- Control access to routes before controller execution
- Implement authentication and authorization logic

Key Learnings:
- Guards run after routing but before controller logic
- canActivate determines request access
- Guards have access to execution context and metadata
- Role-based authorization is implemented using custom decorators

Why guards matter:
- Authentication and authorization are centralized
- Controllers remain clean
- Security rules are explicit and testable
