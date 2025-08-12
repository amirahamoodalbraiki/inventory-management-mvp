-- Transaction history table
CREATE TABLE stock_changes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    old_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    change_amount INTEGER GENERATED ALWAYS AS (new_quantity - old_quantity) STORED,
    change_type VARCHAR(20) NOT NULL CHECK (change_type IN ('RESTOCK', 'SALE', 'ADJUSTMENT', 'RETURN')),
    reason TEXT,
    changed_by INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
