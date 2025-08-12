-- Sample transaction records
INSERT INTO stock_changes (product_id, old_quantity, new_quantity, change_type, reason, changed_by)
VALUES
  (1, 0, 50, 'RESTOCK', 'Initial stock', 1),
  (1, 50, 30, 'SALE', 'Sold 20 units', 2),
  (2, 10, 40, 'RESTOCK', 'Supplier delivery', 1);
