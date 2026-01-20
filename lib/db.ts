import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

// Determine database path based on environment
// In production (Vercel), use /tmp which is writable
const isProduction = process.env.NODE_ENV === 'production';
const dbPath = isProduction 
  ? path.join('/tmp', 'bmi-tracker.db') 
  : path.join(process.cwd(), 'bmi-tracker.db');

// Ensure the directory exists (mostly for /tmp)
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable Write-Ahead Logging for better concurrency
db.pragma('journal_mode = WAL');

// Initialize Database Schema (Auto-migration for Vercel)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bmi_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    height REAL NOT NULL CHECK(height > 0),
    weight REAL NOT NULL CHECK(weight > 0),
    bmi REAL NOT NULL,
    category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_bmi_user_date ON bmi_records(user_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
`);

// Seed default user if not exists
try {
  const defaultUser = 'paphada';
  const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(defaultUser);
  
  if (!existingUser) {
    // Hash for '1234567a'
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('1234567a', salt);
    
    db.prepare(`
      INSERT INTO users (username, email, password_hash) 
      VALUES (?, ?, ?)
    `).run(defaultUser, 'paphada@example.com', hash);
    
    console.log('Seeded default user: paphada');
  }
} catch (error) {
  console.error('Error seeding database:', error);
}

export default db;
