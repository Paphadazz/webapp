const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

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

// Seed default user
(async () => {
  const username = 'paphada';
  const email = 'paphada@example.com'; // Dummy email
  const password = '1234567a';

  try {
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
      stmt.run(username, email, hashedPassword);
      console.log(`- Created default user: ${username} / ${password}`);
    } else {
      console.log(`- User ${username} already exists.`);
    }
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    console.log('Database initialized successfully.');
    db.close();
  }
})();
