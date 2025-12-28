## Exception Filters Playground

Purpose:
- Customize and centralize error responses
- Control how exceptions are exposed to clients

Key Learnings:
- Exception filters handle errors after execution
- @Catch(HttpException) targets specific exception types
- Filters can be applied at route, controller, or global level
- Global filters enforce consistent API error contracts

Why exception filters matter:
- Prevent leaking internal errors
- Standardize error responses
- Keep controllers and services clean

Internalize the order:
1. Middleware
2. Guards
3. Pipes
4. Interceptors
5. Controller
6. Service
7. Exception Filter
8. Response sent
