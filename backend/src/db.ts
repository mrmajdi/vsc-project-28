import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the SQLite database file (adjust as needed for your project structure)
const DB_PATH = join(__dirname, '..', 'data', 'sqlite.db');

// Initialize the database connection
export const db = new Database(DB_PATH, {
  // Log queries in development; remove or conditionally enable in production
  verbose: process.env.NODE_ENV !== 'production' ? console.log : false,
});

/**
 * Initialize the database schema.
 * Replace the table definitions below with your actual schema.
 */
export function initDB(): void {
  // Ensure foreign key constraints are enforced
  db.pragma('foreign_keys = ON');

  // Begin a transaction for schema creation (faster and atomic)
  const transaction = db.transaction(() => {
    // Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Sessions table (example for auth sessions)
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Add more tables as needed for your application.
    // Example: posts, comments, etc.
    // db.exec(`
    //   CREATE TABLE IF NOT EXISTS posts (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_id INTEGER NOT NULL,
    //     title TEXT NOT NULL,
    //     content TEXT,
    //     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    //   );
    // `);
  });

  // Run the transaction
  try {
    transaction();
    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
}

// Optionally auto-initialize when this module is imported in non-test environments
if (process.env.NODE_ENV !== 'test') {
  initDB();
}