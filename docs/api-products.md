# Product API Contract

This document defines the API contract for the **Product** module.  
All endpoints are under the base path: **`/api/products`**.  
Authentication: **JWT (Bearer token)** unless specified otherwise.


## 1. Data Model

| Field                | Type       | Required | Description |
|----------------------|------------|----------|-------------|
| id                 | UUID       | No       | Auto-generated unique product ID |
| name               | string     | Yes      | Name of the product |
| description        | string     | No       | Detailed description of the product |
| category_id        | UUID       | Yes      | Linked category ID |
| price              | decimal    | Yes      | Product price |
| quantity           | integer    | Yes      | Current stock quantity |
| low_stock_threshold| integer    | No       | Minimum quantity before alert |
| created_at         | datetime   | No       | Auto-generated creation timestamp |
| updated_at         | datetime   | No       | Auto-generated update timestamp |

---

## 2. Endpoints

- *GET* /api/products — List all products.
- *GET* /api/products/{id} — Get a single product by ID.
- *POST* /api/products — Create a new product.
- *PUT* /api/products/{id} — Update an existing product.
- *DELETE* /api/products/{id} — Delete a product.

---

### 2.1 List all products
*GET* /api/products  
Returns a paginated list of products.

*Response (200)*
```json
[
  {
    "id": "f3a87e94-24d0-4b8b-bc8e-f5b5aaf34dcd",
    "name": "Wireless Mouse",
    "description": "Ergonomic mouse with USB receiver",
    "category_id": "b4a4f1a0-5b41-4d89-a810-2f6735df0f14",
    "price": 15.99,
    "quantity": 100,
    "low_stock_threshold": 10,
    "created_at": "2025-08-11T14:30:00Z",
    "updated_at": "2025-08-11T14:30:00Z"
  }
]
```
### 2.2 Get a product by ID
{
  "id": "f3a87e94-24d0-4b8b-bc8e-f5b5aaf34dcd",
  "name": "Wireless Mouse",
  "description": "Ergonomic mouse with USB receiver",
  "category_id": "b4a4f1a0-5b41-4d89-a810-2f6735df0f14",
  "price": 15.99,
  "quantity": 100,
  "low_stock_threshold": 10,
  "created_at": "2025-08-11T14:30:00Z",
  "updated_at": "2025-08-11T14:30:00Z"
}

### 2.3 Create a new product
{
  "name": "Wireless Mouse",
  "description": "Ergonomic mouse with USB receiver",
  "category_id": "b4a4f1a0-5b41-4d89-a810-2f6735df0f14",
  "price": 15.99,
  "quantity": 100,
  "low_stock_threshold": 10
}

{
  "id": "f3a87e94-24d0-4b8b-bc8e-f5b5aaf34dcd",
  "name": "Wireless Mouse",
  "description": "Ergonomic mouse with USB receiver",
  "category_id": "b4a4f1a0-5b41-4d89-a810-2f6735df0f14",
  "price": 15.99,
  "quantity": 100,
  "low_stock_threshold": 10,
  "created_at": "2025-08-11T14:30:00Z",
  "updated_at": "2025-08-11T14:30:00Z"
}

### 2.4 Update a product
{
  "name": "Wireless Mouse Pro",
  "price": 17.99,
  "quantity": 120,
  "low_stock_threshold": 15
}
{
  "id": "f3a87e94-24d0-4b8b-bc8e-f5b5aaf34dcd",
  "name": "Wireless Mouse Pro",
  "description": "Ergonomic mouse with USB receiver",
  "category_id": "b4a4f1a0-5b41-4d89-a810-2f6735df0f14",
  "price": 17.99,
  "quantity": 120,
  "low_stock_threshold": 15,
  "created_at": "2025-08-11T14:30:00Z",
  "updated_at": "2025-08-11T15:00:00Z"
}

### 2.5 Delete a product
*DELETE* /api/products/{id}

*Response (204)* — No content

## 3. Low Stock Rule

quantity <= low_stock_threshold

