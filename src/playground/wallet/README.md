## Concurrency: Wallet Deduction

### Problem
Concurrent requests can cause race conditions when using read-modify-write logic.

### Wrong Approach
- Read balance
- Check
- Update balance

This fails under concurrency.

### Correct Approaches
1. Database transaction (still risky without proper isolation)
2. Atomic update with conditional `WHERE` clause (preferred)

### Key Lesson
Correctness must be enforced at the database level, not in application logic.
