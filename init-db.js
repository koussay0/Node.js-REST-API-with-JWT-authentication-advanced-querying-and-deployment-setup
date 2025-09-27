const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    db.run(
      `CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table is ready.");

          // Insert some initial data
          const insert = "INSERT INTO ideas (title, description, status) VALUES (?,?,?)";
          
          db.run(insert, [
            "Eco-Friendly Water Bottle",
            "A smart water bottle that tracks hydration and suggests refill stations.",
            "Concept"
          ]);

          db.run(insert, [
            "AI-Powered Study Buddy",
            "An application that uses AI to create personalized study plans and quizzes.",
            "In Progress"
          ]);
        }
      }
    );
  }
});

module.exports = db;
