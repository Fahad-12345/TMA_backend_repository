# 🛠️ TMA - Textbook Management Application (BackEnd)

This is the backend for the **Textbook Management Application**, built using Node.js, Express.js, Sequelize, and PostgreSQL. It provides RESTful APIs to support textbook inventory, instructor/course management, and secure authentication.

---

## 📦 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT (for authentication)
- bcrypt (for password hashing)

---

## 📁 Functional Modules

- 👤 User Registration & Login
- 🧑‍🏫 Instructor & Employee Roles
- 📚 Textbook & Course Assignments
- 🗃️ Inventory Management
- 🔒 Protected Routes with JWT

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Git

---

### 📥 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Fahad-12345/TMA_backend_repository.git

# 2. Navigate to the project directory
cd TMA_backend_repository

# 3. Install dependencies
npm install

# 4. Create PostgreSQL Database
# Make sure PostgreSQL is running and create a database manually or via pgAdmin.

# 5. Configure Environment Variables
# Create a `.env` file in the root directory:

DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password

# 6. Run Migrations & Seeders file
node migrations.mjs
node undoMigrations.mjs
node seedersUp.mjs
node seedersDown.mjs

# 7. Start the server
npm run dev
