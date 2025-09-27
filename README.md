# 🧠 Skills API

A simple RESTful API built with **Node.js** and **Express.js** to manage a list of technical and soft skills. This API supports querying, filtering, and retrieving skills data from a JSON file.

---

## 🚀 Features

- 🔍 Get all skills
- 🎯 Get skill by ID
- 📂 Filter skills by category
- 📈 Filter skills by proficiency
- 🔡 Sort skills by name
- 🧪 Query multiple parameters
- 📝 Built-in request logging
- ❌ Custom 404 route handling

---

## 📁 Project Structure
skills-api/
├── data/
│ └── skills.json # Your skills data file
├── server.js # Main Express app
├── package.json
└── README.md

## Start the Server
node server.js
or, npm start (not tested)

# Server runs by default on:
http://localhost:3001

## 🧪 Testing the API with Postman
✅ Base Route
GET http://localhost:3001 
Returns a basic status message.

{
  "message": "Skills API is running!"
}

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/34e95c08-65ac-49c7-a07f-ed0af4c91ec6" />


✅ Get All Skills

GET http://localhost:3001/api/skills
Returns all skills.

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/d60a5cd1-a8ec-48d3-9f8b-1f7e6e75c352" />

Query Parameters (optional):

Param	Example	Description
proficiency	/api/skills?proficiency=Expert	Filters by proficiency level
category	/api/skills?category=backend	Filters by skill category
sort	/api/skills?sort=name	Sorts skills alphabetically by name
✅ Get Skill by ID

GET /api/skills/:id
Example:
GET /api/skills/2

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/2fea3159-ca09-4742-8474-3284f00a7ca2" />


Returns a single skill object by id.

✅ Get Skills by Category (Path Param)

GET /api/skills/category/:category

Example:
GET /api/skills/category/Frontend Framework

<img width="600" height="407" alt="image" src="https://github.com/user-attachments/assets/f02bc237-8fc3-4cc9-94c6-72bbfa5fd040" />

🧰 Example skills.json
[
  {
    "id": 1,
    "name": "JavaScript",
    "category": "Programming Language",
    "proficiency": "Expert",
    "description": "Modern JavaScript including ES6+ features"
  },
  {
    "id": 2,
    "name": "Node.js",
    "category": "Runtime Environment",
    "proficiency": "Intermediate",
    "description": "Server-side JavaScript development"
  }
]

## 🔍 Request Logging

All incoming requests are logged to the console:
2025-09-16T12:00:00.000Z - GET /api/skills

## ❌ 404 Handler

Unmatched routes return:

{
  "success": false,
  "message": "Route not found"
}

## 📦 Scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}


Use npm run dev for development (requires nodemon).

## 🧪 Optional: curl Commands

Test from the terminal:

curl http://localhost:3001/api/skills
curl http://localhost:3001/api/skills/1
curl "http://localhost:3001/api/skills?proficiency=expert"
curl "http://localhost:3001/api/skills/category/backend"

## 👷 Built With

Node.js
Express.js
Nodemon
Postman

## 📌 Notes

The API is read-only for now (GET only).

All data is stored in a local skills.json file — no database required.
