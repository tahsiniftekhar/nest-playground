## Pipes Playground

Purpose:
- Validate and transform incoming request data
- Enforce request contracts using DTOs

Key Learnings:
- Pipes run before controller logic
- ValidationPipe prevents invalid data from reaching business logic
- whitelist removes unknown properties
- forbidNonWhitelisted rejects unknown properties
- transform converts payloads to expected types

Why pipes matter:
- Controllers stay clean
- Validation logic is centralized
- Data integrity is enforced early
