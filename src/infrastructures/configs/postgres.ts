import "dotenv/config";
import pgPromise from "pg-promise";

const pg_host: string = process.env.POSTGRES_HOST || "localhost";
const pg_port: number = Number(process.env.POSTGRES_PORT) || 5432;
const pg_db: string = process.env.POSTGRES_DB || "";
const pg_user: string = process.env.POSTGRES_USER || "";
const pg_password: string = process.env.POSTGRES_PASSWORD || "";

// Establish connection
const pg_promise = pgPromise();

const db = pg_promise({
  host: pg_host,
  port: pg_port,
  database: pg_db,
  user: pg_user,
  password: pg_password,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pg_host, pg_port, pg_db, pg_user, pg_password, db };
