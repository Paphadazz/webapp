import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'bmi-tracker.db');
const db = new Database(dbPath);

// Enable Write-Ahead Logging for better concurrency
db.pragma('journal_mode = WAL');

export default db;
