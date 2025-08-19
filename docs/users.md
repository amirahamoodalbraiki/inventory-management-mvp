# Users API

> Base path: `/users` 

## Security
- Authorization: Bearer JWT
- GETs: hasAnyRole('ADMIN','USER')
- POST/DELETE: hasRole('ADMIN')

---

## GET /users
**Headers**
- Authorization: Bearer <JWT>

**Response (200)**
```
[
  {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN",
    "phone": "+96800000000",
    "createdAt": "2025-08-17T10:15:00"
  }
]
```
**cURL**
- curl -X GET http://localhost:8080/users \
  -H "Authorization: Bearer <TOKEN>"
### GET /users/{id}

**Headers**
- Authorization: Bearer <JWT>

**Response (200)**
```
{
  "id": 2,
  "email": "staff1@example.com",
  "name": "Staff One",
  "role": "USER",
  "phone": "+96811111111",
  "createdAt": "2025-08-17T10:15:00"
}
```
**cURL**
- curl -X GET http://localhost:8080/users/2 \
  -H "Authorization: Bearer <TOKEN>"
  
### POST /users
**Headers**
- Authorization: Bearer <JWT>
- Content-Type: application/json

**Request**
```
{
  "email": "new.user@example.com",
  "password": "Strong#123",
  "name": "New User",
  "role": "USER",
  "phone": "+96822222222"
}
```
**Response (201)**
```
{
  "id": 7,
  "email": "new.user@example.com",
  "name": "New User",
  "role": "USER",
  "phone": "+96822222222",
  "createdAt": "2025-08-18T09:30:00"
}
```
**cURL**
- curl -X POST http://localhost:8080/users \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"new.user@example.com\",\"password\":\"Strong#123\",\"name\":\"New User\",\"role\":\"USER\",\"phone\":\"+96822222222\"}"
  
### DELETE /users/{id}
**Headers**
- Authorization: Bearer <JWT>

**Response**
- 204 No Content

**cURL**
- curl -X DELETE http://localhost:8080/users/7 \
  -H "Authorization: Bearer <TOKEN>"
