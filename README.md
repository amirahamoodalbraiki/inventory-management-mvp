A lightweight web application for small businesses to track stock levels, manage products, and get alerts for low-stock items. The system helps maintain optimal inventory, reduce overstocking/stockouts, and keep product data organized in one place.

## Tech Stack
- **Backend:** Java + Spring Boot (JPA/Hibernate)
- **Database:** PostgreSQL or MySQL
- **Frontend:** React (recommended) or Thymeleaf
- **Hosting (candidate):** Heroku / AWS Elastic Beanstalk / DigitalOcean
- **Optional:** Cloudinary / AWS S3 for product images

## MVP Features
- Add, edit, delete products (name, SKU, category, price, quantity, low-stock threshold, optional image)
- Adjust stock levels (sales, purchases, corrections) with reason tracking
- View inventory list with filters and search
- Highlight low-stock items (optional email/in-app notification)
- Transaction history log

## Non-Goals (MVP)
- Barcode scanner integration
- Supplier ordering automation
- Multi-location warehouse support
- Complex forecasting or analytics

## Getting Started (Local) — Placeholder
> Will be updated in Week 1 as modules are implemented.


## How to Run Locally

### Backend
If you prefer to run the backend directly from **IntelliJ IDEA** instead of using Maven commands:

1. **Open IntelliJ IDEA**.
2. From the menu, choose **File > Open...**.
3. Navigate to the project folder:  
inventory-management-mvp/backend

Select the **`backend`** folder and click **Open**. 

4. Wait until IntelliJ finishes indexing and downloading dependencies.
   
5. In the **Project Explorer**, open:  
src/main/java/com/example/backend/BackendApplication.java


7. At the top-right of IntelliJ, click the **green Run button ▶**.  
- This will start the Spring Boot server.
- By default it runs on [http://localhost:8080](http://localhost:8080).

  
### Frontend
1. Install Node.js (v18+)
 docs/demo-data-and-readme
2. 
develop

```
cd frontend
npm install
npm run dev
```
## Project Links
- **GitHub Issues:** [View all issues](https://github.com/amirahamoodalbraiki/inventory-management-mvp/issues)
- **ClickUp Board:** [View tasks on ClickUp](https://app.clickup.com/90181582807/v/l/li/901810440494)

## Environment Variables (to be finalized)
```
DATABASE_URL=<connection-string>
```
Other keys (email provider / S3) if notifications/images are enabled.

## Project Structure
```
backend/   # Spring Boot app
frontend/  # React app
docs/      # ERD, API contracts, deployment notes
design/    # Wireframes
.github/   # PR/Issue templates, CODEOWNERS, CI later
```
## Roles & Access
- **STAFF:** View inventory, add/update products, adjust stock
- **ADMIN:** All staff permissions + manage users
 docs/demo-data-and-readme

## Demo Data Setup
This project includes scripts to populate the database with demo data for testing.

### 1. Start the Backend
Make sure the backend server is running locally:
```
./mvnw spring-boot:run
It should be available at: https://localhost:8080
```
### 2. Seed Demo Data
Navigate to the docs/api folder and run the seeding scripts in this order:

```
./seed_users.sh
./seed_products.sh
./seed_stock_changes_simple.sh
```
### 3. Verify Data
Use curl or your browser to check the seeded data:
- [Users](http://localhost:8080/users)
- [Products](http://localhost:8080/products)
- [Stock Changes](http://localhost:8080/stock-changes)
- You should see JSON output containing the demo records.
  
## Contributing
- **Default branch:** develop
- Protect main branch (PRs only, ≥1 approval, passing CI)
- Commit style: Conventional Commits (feat:, fix:, docs:, chore:)
- Create a feature branch → Open PR into develop

## Demo Data Setup
This project includes scripts to populate the database with demo data for testing.

### 1. Start the Backend
Make sure the backend server is running locally:
```
./mvnw spring-boot:run
It should be available at: https://localhost:8080
```
### 2. Seed Demo Data
Navigate to the docs/api folder and run the seeding scripts in this order:

```
./seed_users.sh
./seed_products.sh
./seed_stock_changes_simple.sh
```
### 3. Verify Data
Use curl or your browser to check the seeded data:
- [Users](http://localhost:8080/users)
- [Products](http://localhost:8080/products)
- [Stock Changes](http://localhost:8080/stock-changes)
- You should see JSON output containing the demo records.

## Contacts
docs/demo-data-and-readme
- **Scrum Master:** Amira 
- GitHub: [@amirahamoodalbraiki](https://github.com/amirahamoodalbraiki) 
- Email: albraikiam2@gmail.com
- **Team:** Team7

## Roadmap (3 Weeks)
docs/demo-data-and-readme
- **Week 1:** Auth & roles, product CRUD (BE: user/product/category entities; FE: login, product form, basic list)
- **Week 2:**  
  - Backend: Stock endpoints, transaction history, low-stock check, role-based access  
  - Frontend: Highlight low-stock items, stock adjustment page, transaction history page  
- **Week 3:** Notifications, UI polish, deployment + demo checklist


## Demo Checklist

1. **Login as Admin**  
   - Open the application.  
   - Enter admin username and password.  
   - Click **Login** to access the dashboard.  

2. **Add a Product**  
   - Navigate to the **Products** page.  
   - Click **Add Product**.  
   - Fill in product details (name, description, price, stock).  
   - Save the new product.  

3. **Change Stock**  
   - Go to the **Stock Management** page.  
   - Select a product.  
   - Perform a stock change (e.g., restock or sale).  
   - Save changes and verify stock update.  

4. **Show Low-Stock Highlight**  
   - Navigate to the **Products** page.  
   - Verify that products with low stock are highlighted.  

5. **View Transaction History**  
   - Open the **Transaction History** page.  
   - Verify the latest stock changes are listed with correct details (date, quantity, type).
=======
- **Week 1:** Auth & roles, product CRUD (BE: user/product/category entities; FE: login, product form, basic list).
- **Week 2:** Stock management, transaction history, low-stock highlighting.
- **Week 3:** Notifications, UI polish, deployment + demo checklist.
 develop

## Documentation
- [Authentication](docs/api-products.md)
- [Users](docs/users.md)
- [Stock Changes](docs/stock_changes.md)
- [api](docs/api-products.md)

