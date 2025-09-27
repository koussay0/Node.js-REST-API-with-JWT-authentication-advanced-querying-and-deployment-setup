const express = require('express');
const cors = require('cors');
const db = require('./database.sqlite'); // Ensure this exports sqlite3 DB connection
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Skills API is running!' });
});

// Get all ideas
app.get('/api/ideas', (req, res) => {
  console.log('Fetching all ideas...');
  db.all('SELECT * FROM ideas', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'success', data: rows });
  });
});

// Get idea by ID
app.get('/api/ideas/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT * FROM ideas WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({ message: 'success', data: row });
  });
});

// Create new idea
app.post('/api/ideas', (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const insert = `
    INSERT INTO ideas (title, description, status)
    VALUES (?, ?, ?)
  `;
  db.run(insert, [title, description || '', status || 'Concept'], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'success',
      data: {
        id: this.lastID,
        title,
        description: description || '',
        status: status || 'Concept',
      },
    });
  });
});

// Update idea by ID
app.put('/api/ideas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, description, status } = req.body;

  const updateQuery = `
    UPDATE ideas
    SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      status = COALESCE(?, status)
    WHERE id = ?
  `;
  db.run(updateQuery, [title, description, status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({
      message: 'success',
      data: { id, title, description, status },
    });
  });
});

// Delete idea by ID
app.delete('/api/ideas/:id', (req, res) => {
  const id = Number(req.params.id);
  db.run('DELETE FROM ideas WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({ message: 'Idea deleted successfully' });
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/ideas", (req, res) => {
  let query = "SELECT * FROM ideas";
  const params = [];
  const conditions = [];

  // Filtering
  if (req.query.status) {
    conditions.push("status = ?");
    params.push(req.query.status);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  // Sorting
  if (req.query.sort) {
    const order = req.query.order === "desc" ? "DESC" : "ASC";
    query += ` ORDER BY ${req.query.sort} ${order}`;
  }

  // Pagination
  if (req.query._limit) {
    const limit = parseInt(req.query._limit);
    const page = parseInt(req.query._page) || 1;
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

const bcrypt = require("bcryptjs");

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.run(query, [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: err.message });

    res.json({ message: "User registered", userId: this.lastID });
  });
});

const jwt = require("jsonwebtoken");

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

const auth = require("./authMiddleware");

// Only logged-in users can create/update/delete
app.post("/api/ideas", auth, (req, res) => {
  const { title, description, status } = req.body;
  const query = "INSERT INTO ideas (title, description, status, userId) VALUES (?, ?, ?, ?)";
  db.run(query, [title, description, status, req.user.userId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Idea created", ideaId: this.lastID });
  });
});

app.put("/api/ideas/:id", auth, (req, res) => {
  const { title, description, status } = req.body;
  const query = "UPDATE ideas SET title=?, description=?, status=? WHERE id=? AND userId=?";
  db.run(query, [title, description, status, req.params.id, req.user.userId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Idea updated" });
  });
});

app.delete("/api/ideas/:id", auth, (req, res) => {
  const query = "DELETE FROM ideas WHERE id=? AND userId=?";
  db.run(query, [req.params.id, req.user.userId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Idea deleted" });
  });
});
