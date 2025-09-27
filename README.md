# Node.js-REST-API-with-JWT-authentication-advanced-querying-and-deployment-setup

# Secure Ideas API

A Node.js + Express.js REST API for managing ideas, enhanced with **advanced database operations** and **JWT authentication**.  
Built with **SQLite/PostgreSQL**, **bcryptjs**, and **jsonwebtoken**.  

---

## 🚀 Features
- User registration & login with **JWT authentication**
- CRUD operations for ideas
- **Advanced querying**: filtering, sorting, pagination
- User-specific ideas (if `userId` is linked)
- Secure endpoints with authentication middleware
- Prepared for **deployment** using **PM2**
- Includes **unit & integration tests**
- Scalability strategies documented

---

## ⚙️ Technologies Used
- Node.js
- Express.js
- SQLite / PostgreSQL
- bcryptjs
- jsonwebtoken (JWT)
- dotenv
- Jest + Supertest (for testing)
- PM2 (for deployment)

---

## 📂 Project Structure
.
├── server.js # Main entry point
├── authMiddleware.js # JWT authentication middleware
├── routes/ # Route definitions
│ ├── ideas.js
│ └── users.js
├── db/ # Database setup & migrations
├── utils/ # Helper functions (e.g., password hashing)
├── tests/ # Unit & integration tests
├── ecosystem.config.js # PM2 config for deployment
├── .env # Environment variables
└── README.md

# 🔧 Setup & Installation
### 1. Clone this repo:
   ```bash
   git clone https://github.com/koussay0/Node.js-REST-API-with-JWT-authentication-advanced-querying-and-deployment-setup
   cd Node.js-REST-API-with-JWT-authentication-advanced-querying-and-deployment-setup
```
### 2. Install dependencies:
```
npm install
```

### 3. Configure environment variables in .env:
```
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
DB_URL=sqlite://ideas.db   # or postgres://user:pass@localhost:5432/dbname
```
4. Start development server:
```
npm start
```

# 🗄️ API Endpoints
### Auth
POST /api/register → Register a new user

POST /api/login → Login user & return JWT

### Ideas (Protected)
GET /api/ideas → Get all ideas (supports filtering, sorting, pagination)

POST /api/ideas → Create a new idea (requires JWT)

PUT /api/ideas/:id → Update an idea (requires JWT, owner only)

DELETE /api/ideas/:id → Delete an idea (requires JWT, owner only)

# 🔍 Advanced Querying
- Filtering: /api/ideas?status=Concept
- Sorting: /api/ideas?sort=title&order=asc
- Pagination: /api/ideas?_limit=10&_page=1

# 🔐 Authentication
JWT tokens are returned on login

Add token to requests in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```
# 🧪 Testing
### Install test dependencies
```
npm install --save-dev jest supertest
```
## Run tests
```
npm test
```
### Tests include:
✅ Unit tests for utility functions (e.g., password hashing)
✅ Integration tests for:
GET /api/ideas
POST /api/register
POST /api/login
POST /api/ideas (authenticated request)

# 🌍 Deployment with PM2
### Install PM2
```
npm install -g pm2
```
### Run with PM2
```
pm2 start ecosystem.config.js
```
### ecosystem.config.js
```
module.exports = {
  apps: [{
    name: "secure-ideas-api",
    script: "./server.js",
    instances: "max",   // maximize CPU usage
    exec_mode: "cluster",
    watch: true,
    env: {
      NODE_ENV: "development",
      PORT: 3001
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 80
    }
  }]
};
```
# Credits
Thanks for USAM for giving us the chance for this learning opportunity.
# Owner
## Github : [github ](https://github.com/koussay0)
## Linkedin : [linkedin](linkedin.com/in/koussayjaballah) 
