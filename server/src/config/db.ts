/**
 * db.ts
 * 
 * Sets up a Postgres connection pool using `pg`.
 * Exports the pool to be used in repositories.
 */

import { Pool } from "pg";

// Read DB config from environment variables (Docker Compose sets them)
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASS || "pass",
  database: process.env.DB_NAME || "songsdb",
  port: Number(process.env.DB_PORT) || 5432,
});

// Optional: log when a new client connects
pool.on("connect", () => {
  console.log("Connected to Postgres DB");
});

// Optional: log errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
