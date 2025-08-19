## Alerts API Documentation

> Base path: `/api/alerts`  
> Requires: `Authorization: Bearer <jwt_token>`

---

## Roles & Access
- **Admin** → Can view all alerts, create, and delete.
- **Staff** → Can only view their own alerts.


---

## Endpoints

### GET `/api/alerts`

**Request**
```http
GET /api/alerts
Authorization: Bearer <jwt_token>
```

**Response**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "product_id": 15,
    "type": "low_stock",
    "message": "Product 'Shampoo' is below stock threshold",
    "sent_at": "2025-08-19T09:30:00Z"
  }
]
```

---

### GET `/api/alerts/{id}`

**Request**
```http
GET /api/alerts/2
Authorization: Bearer <jwt_token>
```

**Response**
```json
{
  "id": 2,
  "user_id": 3,
  "product_id": 18,
  "type": "low_stock",
  "message": "Product 'Conditioner' is below stock threshold",
  "sent_at": "2025-08-19T09:40:00Z"
}
```

---

### POST `/api/alerts` *(system use only)*

**Request**
```http
POST /api/alerts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "user_id": 2,
  "product_id": 15,
  "type": "low_stock",
  "message": "Product 'Shampoo' is below stock threshold"
}
```

**Response**
```json
{
  "id": 3,
  "user_id": 2,
  "product_id": 15,
  "type": "low_stock",
  "message": "Product 'Shampoo' is below stock threshold",
  "sent_at": "2025-08-19T10:00:00Z"
}
```

---

### DELETE `/api/alerts/{id}`

**Request**
```http
DELETE /api/alerts/3
Authorization: Bearer <jwt_token>
```

**Response**
```json
{ "message": "Alert 3 deleted successfully" }
```

---
