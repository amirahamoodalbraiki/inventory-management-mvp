# Stock Change API

## GET `/api/stock-changes`
**Parameters**:
- `product_id` (optional)
- `limit` (default: 20)

**Response Example**:
```json
{
  "id": 1,
  "product_id": 1,
  "change_amount": -20,
  "change_type": "SALE"
}
```
