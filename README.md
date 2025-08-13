# Inventory Management System (Project 7) — Team7

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

### Backend
The backend is implemented as a Spring Boot application.  
To run locally:
1. Install Java 17+ and Maven  
2.  
```bash
cd backend
mvn spring-boot:run
Frontend
Install Node.js (v18+), then run:

bash
Copy
Edit
cd frontend
npm install
npm run dev
Environment Variables (to be finalized)
ini
Copy
Edit
DATABASE_URL=<connection-string>
Other keys (email provider / S3) if notifications/images are enabled.

Project Structure
bash
Copy
Edit
backend/   # Spring Boot app
frontend/  # React app
docs/      # ERD, API contracts, deployment notes
design/    # Wireframes
.github/   # PR/Issue templates, CODEOWNERS, CI later
Roles & Access
STAFF: View inventory, add/update products, adjust stock

ADMIN: All staff permissions + manage users

Contributing
Default branch: develop

Protect main branch (PRs only, ≥1 approval, passing CI)

Commit style: Conventional Commits (feat:, fix:, docs:, chore:)

Create a feature branch → Open PR into develop

Contacts
Scrum Master: Amira — GitHub: @amirahamoodalbraiki — Email: albraikiam2@gmail.com

Team: Team7

Roadmap (3 Weeks)
Week 1: Auth & roles, product CRUD (BE: user/product/category entities; FE: login, product form, basic list)

Week 2: Stock management, transaction history, low-stock highlighting

Week 3: Notifications, UI polish, deployment + demo checklist
