# Auth API

> Base path: `/auth` 

## POST /auth/login
**Request**
```
{
  "email": "admin@example.com",
  "password": "Admin#123"
}
```
** Response (200) **
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
** Errors **
- 400 Bad Request
- 401 Unauthorized

** Curl Example **
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"Admin#123\"}"
