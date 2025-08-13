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
The backend is implemented as a Spring Boot application.  
To run locally:
1. Install Java 17+ and Maven  
2.  
```bash
cd backend
mvn spring-boot:run
```
### Frontend
1.Install Node.js (v18+)
2.

```bash
cd frontend
npm install
npm run dev
```
## Project Links
- **GitHub Issues:** [View all issues](https://github.com/amirahamoodalbraiki/inventory-management-mvp/issues)
- **ClickUp Board:** [View tasks on ClickUp](https://app.clickup.com/90181582807/v/l/li/901810440494)

## Environment Variables (to be finalized)
```ini
DATABASE_URL=<connection-string>
```
Other keys (email provider / S3) if notifications/images are enabled.

## Project Structure
```bash
backend/   # Spring Boot app
frontend/  # React app
docs/      # ERD, API contracts, deployment notes
design/    # Wireframes
.github/   # PR/Issue templates, CODEOWNERS, CI later
```
## Roles & Access
**STAFF:** View inventory, add/update products, adjust stock
**ADMIN:** All staff permissions + manage users

## Contributing
- **Default branch:** develop
- Protect main branch (PRs only, ≥1 approval, passing CI)
- Commit style: Conventional Commits (feat:, fix:, docs:, chore:)
- Create a feature branch → Open PR into develop

## Demo Data Setup
This project includes scripts to populate the database with demo data for testing.

### 1. Start the Backend
Make sure the backend server is running locally:
```bash
./mvnw spring-boot:run
It should be available at: https://localhost:8080
```
### 2. Seed Demo Data
Navigate to the docs/api folder and run the seeding scripts in this order:

```bash
./seed_users.sh
./seed_products.sh
./seed_stock_changes_simple.sh
```
### 3. Verify Data
Use curl or your browser to check the seeded data:
[Users](http://localhost:8080/users)
[Products](https://localhost:8080/products)
[Stock Changes](https://localhost:8080/stock-changes)
You should see JSON output containing the demo records.

## Contacts
**Scrum Master:** Amira — GitHub: [@amirahamoodalbraiki](https://github.com/amirahamoodalbraiki) — Email: albraikiam2@gmail.com
**Team:** Team7

## Roadmap (3 Weeks)
**Week 1:** Auth & roles, product CRUD (BE: user/product/category entities; FE: login, product form, basic list)
**Week 2:** Stock management, transaction history, low-stock highlighting
**Week 3:** Notifications, UI polish, deployment + demo checklist
