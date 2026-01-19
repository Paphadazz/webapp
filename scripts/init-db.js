const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'bmi-tracker.db');
const db = new Database(dbPath);

console.log('Initializing database at:', dbPath);

// Create Users Table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('- Created "users" table');

// Create BMI Records Table
db.exec(`
  CREATE TABLE IF NOT EXISTS bmi_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    height REAL NOT NULL CHECK(height > 0),
    weight REAL NOT NULL CHECK(weight > 0),
    bmi REAL NOT NULL,
    category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
console.log('- Created "bmi_records" table');

// Create Indexes
db.exec(`CREATE INDEX IF NOT EXISTS idx_bmi_user_date ON bmi_records(user_id, created_at)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`);
console.log('- Created indexes');

console.log('Database initialized successfully.');
db.close();
