-- Seed admin user
INSERT INTO user (email, password, role) VALUES
('admin@example.com', '$2a$10$DOWSDtS9fC1oO3hU0ExHyea2yPq5z9wJ9zJf6v/3aBqa5Nx0G4f8K', 'ADMIN');

-- Seed staff user
INSERT INTO user (email, password, role) VALUES
('staff@example.com', '$2a$10$DOWSDtS9fC1oO3hU0ExHyea2yPq5z9wJ9zJf6v/3aBqa5Nx0G4f8K', 'STAFF');
