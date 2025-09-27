const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ideas.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;

