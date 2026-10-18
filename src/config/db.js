import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_NEON_URI,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

export default pool;
