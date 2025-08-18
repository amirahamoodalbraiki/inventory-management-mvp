#!/bin/bash

echo "Seeding products..."

curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Laptop",
    "sku":"SKU001",
    "category":"Electronics",
    "description":"High performance laptop",
    "unitPrice":750.00,
    "quantity":10,
    "lowStockThreshold":3,
    "imageUrl":"https://example.com/laptop.jpg"
  }'

curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Mouse",
    "sku":"SKU002",
    "category":"Electronics",
    "description":"Wireless mouse",
    "unitPrice":20.00,
    "quantity":50,
    "lowStockThreshold":10,
    "imageUrl":"https://example.com/mouse.jpg"
  }'

echo "Products seeded successfully!"
