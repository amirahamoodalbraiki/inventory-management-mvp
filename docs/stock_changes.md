# Transactions / Stock Changes API

> Base path: `/stock-changes` 

## Security
- Authorization: Bearer JWT
- All endpoints: hasAnyRole('ADMIN','USER')

> Create uses **request params** (not JSON body).

---

## Entity (simplified)
```json
{
  "id": 15,
  "productId": 1,
  "changeAmount": -5,
  "reason": "sale",
  "changedBy": 2,
  "createdAt": "2025-08-18T10:05:00"
}
GET /stock-changes
Response (200)
[
  {
    "id": 10,
    "productId": 1,
    "changeAmount": 10,
    "reason": "restock",
    "changedBy": 1,
    "createdAt": "2025-08-18T09:00:00"
  },
  {
    "id": 11,
    "productId": 1,
    "changeAmount": -5,
    "reason": "sale",
    "changedBy": 2,
    "createdAt": "2025-08-18T09:30:00"
  }
]

cURL
curl -X GET http://localhost:8080/stock-changes \
  -H "Authorization: Bearer <TOKEN>"
GET /stock-changes/product/{productId}
Response (200)
[
  {
    "id": 10,
    "productId": 1,
    "changeAmount": 10,
    "reason": "restock",
    "changedBy": 1,
    "createdAt": "2025-08-18T09:00:00"
  }
]
cURL
curl -X GET http://localhost:8080/stock-changes/product/1 \
  -H "Authorization: Bearer <TOKEN>"
POST /stock-changes
Request params

productId (Integer)

changeAmount (Integer) — +10 increase, −5 decrease

reason (String)

userId (Integer)

+10 example
curl -X POST "http://localhost:8080/stock-changes?productId=1&changeAmount=10&reason=restock&userId=1" \
  -H "Authorization: Bearer <TOKEN>"

−5 example
curl -X POST "http://localhost:8080/stock-changes?productId=1&changeAmount=-5&reason=sale&userId=2" \
  -H "Authorization: Bearer <TOKEN>"
Response (200/201)

{
  "id": 15,
  "product": { "...": "Product object" },
  "changeAmount": 10,
  "reason": "restock",
  "changedBy": { "...": "User object" },
  "createdAt": "2025-08-18T10:05:00"
}