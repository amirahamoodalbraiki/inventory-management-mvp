# Project 7 — User Stories

## AUTH-01 — Role-based Login
**User Story:**  
As a user, I want to log in with role-based access so that I can only access the features I am authorized to use.

**Acceptance Criteria:**  
- Given valid email and password, When I log in, Then I receive an authentication token.  
- Given I have the Staff role, Then I can view inventory, add/update products, and adjust stock quantity.  
- Given I have the Admin role, Then I can also manage users in addition to Staff permissions.

**Estimation:** M  
**Labels:** feature, auth, backend, frontend, priority:high, size:M

---

## AUTH-02 — User Registration (Admin only)
**User Story:**  
As an admin, I want to register new users with specific roles so that I can control staff access.

**Acceptance Criteria:**  
- Given I am logged in as an Admin, When I submit name, email, password, and role, Then a new user is created in the database.  
- Given the role is Staff, Then the user has permissions to manage products and inventory only.  
- Given the role is Admin, Then the user has all Staff permissions plus user management.

**Estimation:** S  
**Labels:** feature, auth, backend, priority:high, size:S

---

## PROD-01 — Add Product
**User Story:**  
As a staff member, I want to add a new product so that I can start tracking its stock.

**Acceptance Criteria:**  
- Given I provide name, SKU, category, description, unit_price, initial_quantity, and low_stock_threshold, When I save, Then the product is stored in the database.  
- The product appears immediately in the inventory list after saving.

**Estimation:** M  
**Labels:** feature, products, backend, frontend, priority:high, size:M

---

## PROD-02 — Edit Product
**User Story:**  
As a staff member, I want to edit a product so that I can update its details.

**Acceptance Criteria:**  
- Given an existing product, When I change any field and save, Then the product record is updated in the database.  
- Updated details are shown in the inventory list immediately.

**Estimation:** S  
**Labels:** feature, products, backend, frontend, size:S

---

## PROD-03 — Delete Product
**User Story:**  
As a staff member, I want to delete a product so that I can remove invalid or discontinued items.

**Acceptance Criteria:**  
- Given an existing product, When I confirm deletion, Then the product is removed from the database.  
- Deleted product no longer appears in the inventory list.

**Estimation:** S  
**Labels:** feature, products, backend, frontend, size:S

---

## INV-01 — Inventory List + Search
**User Story:**  
As a staff member, I want to view an inventory list and search by name, SKU, or category so that I can find products quickly.

**Acceptance Criteria:**  
- I can see a table with columns: name, SKU, quantity, and category.  
- When I type in the search bar, the list filters by matching name, SKU, or category.

**Estimation:** M  
**Labels:** feature, products, backend, frontend, size:M

---

## CAT-01 — Manage Categories
**User Story:**  
As a staff member, I want to assign categories to products so that inventory is organized.

**Acceptance Criteria:**  
- Categories exist as a dropdown field in the product form.  
- I can select an existing category when creating or editing a product.

**Estimation:** S  
**Labels:** feature, categories, backend, frontend, size:S

---

## UX-01 — Week 1 Core Screens
**User Story:**  
As a user, I want basic screens for Login, Product Form, and Inventory List so that I can perform core tasks.

**Acceptance Criteria:**  
- Login screen allows entering email and password, and redirects upon success.  
- Product form supports creating and editing products.  
- Inventory list shows basic columns (name, SKU, quantity, category).

**Estimation:** M  
**Labels:** feature, frontend, products, auth, size:M
