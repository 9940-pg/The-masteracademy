import mysql from "mysql2/promise";
import { config } from "./env.js";

let pool = null;
let isConnected = false;

// In-memory fallback stores to prevent breaking the app if MySQL is not yet running
export const inMemoryStore = {
  contacts: [],
  enrollments: [],
  subscribers: [],
  testimonials: [],
};

let retryTimer = null;

/**
 * Connect to MySQL, auto-creating the database if needed, with safe fallback and auto-retry
 */
export async function connectDB() {
  try {
    const { host, port, user, password, database } = config.db;

    // 1. First test connection to MySQL server and ensure database exists
    try {
      const adminConn = await mysql.createConnection({
        host,
        port,
        user,
        password,
        connectTimeout: 3000,
      });
      await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await adminConn.end();
    } catch (createDbErr) {
      // If unable to create DB (e.g. restricted permissions), proceed to attempt direct pool connection
    }

    // 2. Create the connection pool with the target database
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 3000,
    });

    // Test a ping query
    const [result] = await pool.query("SELECT NOW() as now");
    isConnected = true;
    if (retryTimer) {
      clearInterval(retryTimer);
      retryTimer = null;
    }
    console.log("✅ MySQL Connected successfully at:", result[0]?.now);
    return true;
  } catch (err) {
    isConnected = false;
    pool = null;
    console.warn("⚠️  MySQL connection unavailable:", err.message);
    console.warn("💡 Don't worry! Running in safe mode with In-Memory repository. Will auto-retry connecting...");

    // Auto-retry in background every 5 seconds until connected
    if (!retryTimer) {
      retryTimer = setInterval(async () => {
        if (!isConnected) {
          const ok = await connectDB();
          if (ok) {
            try {
              const { initializeDatabase } = await import("../db/initDb.js");
              await initializeDatabase();
            } catch (e) {
              console.error("Auto-sync init error:", e.message);
            }
          }
        }
      }, 5000);
    }
    return false;
  }
}

/**
 * Helper to run query with params using MySQL pool
 */
export async function query(sql, params = []) {
  if (isConnected && pool) {
    const [rows, fields] = await pool.query(sql, params);
    return {
      rows: Array.isArray(rows) ? rows : [],
      insertId: rows?.insertId,
      affectedRows: rows?.affectedRows,
      raw: rows,
    };
  }
  throw new Error("MYSQL_DISCONNECTED");
}

export function isDbConnected() {
  return isConnected;
}

export default pool;
