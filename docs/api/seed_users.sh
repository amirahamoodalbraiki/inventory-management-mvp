#!/bin/bash

echo "Seeding users..."

curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","passwordHash":"admin123","name":"Admin User","role":"ADMIN","phone":"123456789"}'

curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","passwordHash":"user123","name":"User One","role":"USER","phone":"987654321"}'

echo "Users seeded successfully!"
