-- Users with roles
INSERT INTO users (email, password_hash, name, phone, role, created_at)
VALUES 
('admin@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Admin User', '12345678', 'ADMIN', NOW()),
('staff@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'Staff User', '87654321', 'STAFF', NOW());
