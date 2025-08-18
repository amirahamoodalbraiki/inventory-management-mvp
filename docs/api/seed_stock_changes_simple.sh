#!/usr/bin/env bash
BASE="http://localhost:8080/stock-changes"

ADMIN_ID=1
STAFF_ID=2

PID1=1
PID2=2

curl -s -X POST "$BASE" --data-urlencode "productId=$PID1" --data-urlencode "changeAmount=50"  --data-urlencode "reason=Initial stock (RESTOCK)" --data-urlencode "userId=$ADMIN_ID" >/dev/null && echo "✓ RESTOCK +50 (PID=$PID1)"
curl -s -X POST "$BASE" --data-urlencode "productId=$PID1" --data-urlencode "changeAmount=-20" --data-urlencode "reason=Sold 20 units (SALE)" --data-urlencode "userId=$STAFF_ID" >/dev/null && echo "✓ SALE -20 (PID=$PID1)"
curl -s -X POST "$BASE" --data-urlencode "productId=$PID2" --data-urlencode "changeAmount=30"  --data-urlencode "reason=Supplier delivery (RESTOCK)" --data-urlencode "userId=$ADMIN_ID" >/dev/null && echo "✓ RESTOCK +30 (PID=$PID2)"
