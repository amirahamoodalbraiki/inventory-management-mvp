# Project 7 — User Stories

# Week1
# AUTH-01 — Role-based Login
**User Story:**  
As a user, I want to log in with role-based access so that I can only access the features I am authorized to use.

**Acceptance Criteria:**  
- Given valid email and password, When I log in, Then I receive an authentication token.  
- Given I have the Staff role, Then I can view inventory, add/update products, and adjust stock quantity.  
- Given I have the Admin role, Then I can also manage users in addition to Staff permissions.

**Estimation:** M  
**Labels:** feature, auth, backend, frontend, priority:high, size:M, week1

---

## AUTH-02 — User Registration (Admin only)
**User Story:**  
As an admin, I want to register new users with specific roles so that I can control staff access.

**Acceptance Criteria:**  
- Given I am logged in as an Admin, When I submit name, email, password, and role, Then a new user is created in the database.  
- Given the role is Staff, Then the user has permissions to manage products and inventory only.  
- Given the role is Admin, Then the user has all Staff permissions plus user management.

**Estimation:** S  
**Labels:** feature, auth, backend, priority:high, size:S, week1

---

## PROD-01 — Add Product
**User Story:**  
As a staff member, I want to add a new product so that I can start tracking its stock.

**Acceptance Criteria:**  
- Given I provide name, SKU, category, description, unit_price, initial_quantity, and low_stock_threshold, When I save, Then the product is stored in the database.  
- The product appears immediately in the inventory list after saving.

**Estimation:** M  
**Labels:** feature, products, backend, frontend, priority:high, size:M, week1

---

## PROD-02 — Edit Product
**User Story:**  
As a staff member, I want to edit a product so that I can update its details.

**Acceptance Criteria:**  
- Given an existing product, When I change any field and save, Then the product record is updated in the database.  
- Updated details are shown in the inventory list immediately.

**Estimation:** S  
**Labels:** feature, products, backend, frontend, size:S, week1

---

## PROD-03 — Delete Product
**User Story:**  
As a staff member, I want to delete a product so that I can remove invalid or discontinued items.

**Acceptance Criteria:**  
- Given an existing product, When I confirm deletion, Then the product is removed from the database.  
- Deleted product no longer appears in the inventory list.

**Estimation:** S  
**Labels:** feature, products, backend, frontend, size:S, wee;1

---

## INV-01 — Inventory List + Search
**User Story:**  
As a staff member, I want to view an inventory list and search by name, SKU, or category so that I can find products quickly.

**Acceptance Criteria:**  
- I can see a table with columns: name, SKU, quantity, and category.  
- When I type in the search bar, the list filters by matching name, SKU, or category.

**Estimation:** M  
**Labels:** feature, products, backend, frontend, size:M, week1

---

## CAT-01 — Manage Categories
**User Story:**  
As a staff member, I want to assign categories to products so that inventory is organized.

**Acceptance Criteria:**  
- Categories exist as a dropdown field in the product form.  
- I can select an existing category when creating or editing a product.

**Estimation:** S  
**Labels:** feature, categories, backend, frontend, size:S, week1

---

## UX-01 — Week 1 Core Screens
**User Story:**  
As a user, I want basic screens for Login, Product Form, and Inventory List so that I can perform core tasks.

**Acceptance Criteria:**  
- Login screen allows entering email and password, and redirects upon success.  
- Product form supports creating and editing products.  
- Inventory list shows basic columns (name, SKU, quantity, category).

**Estimation:** M  
**Labels:** feature, frontend, products, auth, size:M, weeek1

## REP-01 — Generate Sales Report
**User Story:**
As a manager, I can generate sales reports so that I can track store performance.

**Acceptance Criteria:**
- User can select date range for report.
- Report shows total sales, number of items sold, and top-selling products.
- Option to export report to PDF or Excel.
- If no sales found in range, show “No data available” message.

**Estimation:** L
**Lables:** backend, feature, priority:low, report,size:L,week1

## INV-02 — View Low-Stock Alerts
**User Story:**
As a manager, I can view low-stock alerts so that I can reorder products in time.

**Acceptance Criteria:**
- System highlights products with quantity below the set threshold.
- Alerts visible in the inventory list and dashboard.
- Manager can adjust threshold for alerts.
- Clicking alert navigates to product details.

**Estimation:** backend, feature, inventory,priority:Medium, size: S, week1

## STOCK-01 — Record Stock Changes
**User Story:**
As a staff member, I can record stock changes so that inventory history remains accurate.

**Acceptance Criteria:**
- User can log stock increase or decrease with a note.
- System records date, quantity change, and staff name.
- Changes are visible in product history.

**Estimation:** backend, feature, inventory,priority:high, size: M, week1

## UI-01 — Responsive Inventory page
**User Story:**
As a user, I can view the inventory page on mobile and desktop so that I can work from any device.

**Acceptance Criteria:**
- Inventory list layout adjusts for mobile, tablet, and desktop.
- All table columns remain readable on small screens.
- Mobile view allows vertical scrolling.

**Estimation:** feature, frontend, priority:medium, ui, size: M, week1

# Week 2 — MVP Development

### AUTH-01 — Implement User Registration Endpoint
**User Story:**  
As a new user, I want to register an account with a role so that I can access the system according to my permissions.  

**Acceptance Criteria:**  
- User can provide name, email, password, and role (ADMIN or STAFF).  
- Password is stored securely (hashed).  
- If email already exists, system returns an error message.  
- On success, system returns a success message and user details (excluding password).  

**Estimate:** api, auth, backend, priority, size:M, week2

### AUTH-02 — Implement User Login Endpoint
**User Story:**  
As a registered user, I want to log in so that I can securely access my account and system features.  

**Acceptance Criteria:**  
- User provides email and password.  
- System validates credentials.  
- On success, system returns a JWT token.  
- On failure, system returns an error message.  

**Estimate:** api, auth, backend, priority:high,size:M, week2 

### AUTH-03 — Get Current User Endpoint
**User Story:**  
As a logged-in user, I want to get my profile information so that I can verify my account details.  

**Acceptance Criteria:**  
- Endpoint returns current user’s ID, name, email, and role.  
- Requires a valid JWT token.  
- Unauthorized users receive a 401 error.  

**Estimate:** api, auth, backend, priority:medium, size:S, week2

### DB-01 — Create Database Schema
**User Story:**  
As a developer, I want a complete database schema so that all entities and relationships are ready for implementation.  

**Acceptance Criteria:**  
- Schema includes tables for users, products, categories, stock_changes, and alerts.  
- All relationships match the finalized ERD.  
- Schema is stored in `schema.sql` file.  

**Estimate:** backend,db, priority:high, size: L, week2 

### DB-02 — Add Initial Seed Data
**User Story:**  
As a developer, I want seed data for the database so that the system can be tested quickly.  

**Acceptance Criteria:**  
- Insert at least 5 sample products, 2 categories, and 2 users (ADMIN, STAFF).  
- Data is stored in SQL insert scripts.  
- Can be imported easily into the database.  

**Estimate:**backend, db, priority:medium, size:M ,week2


### PROD-01 — Create Product API (POST)
**User Story:**  
As a staff member, I want to create a new product so that it can be added to the inventory.  

**Acceptance Criteria:**  
- API accepts product name, category, quantity, price, and low-stock threshold.  
- Returns created product details on success.  
- Validates required fields and returns errors if missing.  

**Estimate:** api, backend, priority:high, size:M, week2 

### PROD-02 — Get Products API (GET)
**User Story:**  
As a staff member, I want to view all products so that I can manage the inventory effectively.  

**Acceptance Criteria:**  
- Returns a paginated list of products with name, category, quantity, and price.  
- Supports search by product name.  
- Accessible to logged-in users only.  

**Estimate:** api, backend,priority:high, size:M, week2 

### PROD-03 — Update Product API (PUT)
**User Story:**  
As a staff member, I want to update product details so that stock information stays correct.  

**Acceptance Criteria:**  
- API accepts updated product details.  
- Returns updated product on success.  
- Validates input and returns errors if invalid.  

**Estimate:** api, backend, priority:medium,size:M, week2   


### PROD-04 — Delete Product API (DELETE)
**User Story:**  
As a staff member, I want to delete a product so that outdated or incorrect items are removed from the inventory.  

**Acceptance Criteria:**  
- API deletes product by ID.  
- Returns confirmation message.  
- Prevent deletion if product is linked to existing transactions.  

**Estimate:** api, backend, priority:low size:S, week2 


### LOW-01 — Implement Low-Stock Alert Logic
**User Story:**  
As a manager, I want to be notified when products reach low stock so that I can reorder on time.  

**Acceptance Criteria:**  
- Logic checks stock quantity against low-stock threshold.  
- Alerts are flagged in the database.  
- Triggered on stock update and daily scheduled job.  

**Estimate:**backend, low-stock, priority:high, size:M, week2 

### LOW-02 — Low-Stock Alert UI
**User Story:**  
As a manager, I want to see low-stock alerts in the UI so that I can quickly identify products to reorder.  

**Acceptance Criteria:**  
- Alerts displayed in a separate section on the inventory page.  
- Shows product name, quantity, and threshold.  
- Updates in real-time after stock changes.  

**Estimate:**frontend, low-stock, priority:high, size:M, week2   


### TRANS-01 — Create Transaction History Entity
**User Story:**  
As a manager, I want a transaction history so that I can track stock changes over time.  

**Acceptance Criteria:**  
- Entity records date, product ID, change type (add/remove), quantity, and user ID.  
- Linked to products and users.  

**Estimate:** backend, priority:high, size:M, trandactions, week2


### TRANS-02 — Display Transaction History UI
**User Story:**  
As a manager, I want to view transaction history in the UI so that I can monitor inventory changes.  

**Acceptance Criteria:**  
- Displays table with product name, change type, quantity, date, and user.  
- Supports date range filtering.  

**Estimate:** frontend, priority:medium,size:M, transactions, week2  


### DEPLOY-01 — Prepare Deployment Environment
**User Story:**  
As a developer, I want a `.env.example` file so that others can configure their environment variables easily.  

**Acceptance Criteria:**  
- Includes keys for database connection, JWT secret, and cloud storage.  
- Documented in README.  

**Estimate:** deployment, decumentation, priority:high, size: S, week2


### DOCS-01 — Update README with Run Instructions
**User Story:**  
As a new contributor, I want clear run instructions so that I can set up the project locally.  

**Acceptance Criteria:**  
- Steps for backend and frontend included.  
- Includes prerequisites and installation commands.  

**Estimate:**documentation, priority:medium, size:S, week2  


### CI-01 — Add Basic GitHub Actions Workflow
**User Story:**  
As a developer, I want CI to run on pull requests so that code is automatically built and tested.  

**Acceptance Criteria:**  
- Workflow compiles backend with Maven.  
- Builds frontend with npm.  
- Runs on all pull requests to `develop`.  

**Estimate:**backend, frontend, priority:medium, size:M, week2  
