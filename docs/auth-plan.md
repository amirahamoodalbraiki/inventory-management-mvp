# Auth & Roles Plan (Member 7)

## Goal
Provide secure authentication and role-based authorization for the Inventory Management System MVP.
The app will support two roles: `ADMIN` and `STAFF`.

## Roles
- ADMIN: manage users, full product & inventory access.
- STAFF: view inventory, create/update products & stock changes (no user mgmt).

## Tech choices (MVP)
- Backend: Spring Boot + Spring Security
- Auth mechanism: JWT (access token). Password hashing: BCrypt.
- Secrets: JWT_SECRET as env var. Token expiry ~15m. Refresh tokens optional.

## DB (User entity fields, MVP)
- id (Long or UUID)
- email (unique)
- password_hash
- name
- role (ADMIN | STAFF)
- phone (nullable)
- created_at

## Endpoints (MVP)
1. POST /api/auth/login
   - Body: { "email":"x", "password":"y" }
   - Response: { "accessToken": "<jwt>", "expiresIn": 900, "user": {...} }

2. POST /api/auth/register
   - Admin creates users in MVP. Body: { "email","name","role","password" }

3. GET /api/auth/me
   - Returns authenticated user's profile.

4. GET /api/users (ADMIN only)
5. GET /api/users/:id (ADMIN or owner)
6. PUT /api/users/:id (ADMIN or owner; owner cannot change role)
7. PATCH /api/users/:id/role (ADMIN only)

## Authorization rules
- Use method-level or endpoint-level checks:
  - @PreAuthorize("hasRole('ADMIN')") for admin-only.
  - @PreAuthorize("hasAnyRole('ADMIN','STAFF')") for shared.
  - Owner checks where needed.

## Security details
- Use BCryptPasswordEncoder for hashing.
- JwtAuthenticationFilter to validate JWT and set SecurityContext.
- Store JWT_SECRET in env var.

## Minimal acceptance tests
- login with correct creds → 200 + token.
- protected route with token → 200.
- protected route without/invalid token → 401.
- staff cannot call admin endpoints → 403.

## Implementation checklist
1. Add this docs file and open PR to develop.
2. Backend add: User entity + repo, custom UserDetailsService, auth controller (login), JWT util, SecurityConfig, BCrypt bean.
3. Seed initial ADMIN user via CommandLineRunner or SQL.
4. Add Postman/curl examples for testing.

## Notes
- Keep initial PR small: docs only. Implementation split into multiple small PRs.
