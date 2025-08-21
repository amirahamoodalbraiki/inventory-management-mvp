-- Clean up existing data to ensure a fresh start for tests
DELETE FROM stock_change;
DELETE FROM product;
DELETE FROM users;

-- Insert sample users
INSERT INTO users (id, email, password_hash, name, role, phone, created_at) VALUES
(1, 'admin@example.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Admin User', 'ADMIN', '123-456-7890', '2024-01-01 10:00:00'),
(2, 'user@example.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Regular User', 'USER', '098-765-4321', '2024-01-02 10:00:00');

-- Insert sample products
INSERT INTO product (id, name, sku, description, unit_price, quantity, low_stock_threshold, created_at) VALUES
(101, 'Test Laptop', 'LT-1001', 'High-performance laptop', 999.99, 15, 5, '2024-08-01 09:00:00'),
(102, 'Wireless Mouse', 'MS-2001', 'Ergonomic wireless mouse', 25.50, 100, 10, '2024-08-01 09:00:00');

-- Insert sample stock changes/transactions
INSERT INTO stock_change (id, product_id, change_amount, reason, changed_by, created_at) VALUES
-- Transactions for Laptop (ID 101)
(1001, 101, 20, 'INITIAL_STOCK', 1, '2024-08-10 09:00:00'),
(1002, 101, -5, 'SALE', 2, '2024-08-15 14:30:00'),
(1003, 101, 10, 'RESTOCK', 1, '2024-08-20 11:15:00'),
(1004, 101, -3, 'SALE', 2, '2024-08-25 16:45:00'),

-- Transactions for Mouse (ID 102)
(1005, 102, 100, 'INITIAL_STOCK', 1, '2024-08-12 10:00:00'),
(1006, 102, -2, 'SALE', 2, '2024-08-18 13:20:00');
