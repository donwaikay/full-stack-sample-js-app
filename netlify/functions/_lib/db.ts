import { Pool } from 'pg';

let pool: Pool | undefined;

// Reused across invocations on a warm Netlify Function instance.
export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL is not set');
    pool = new Pool({ connectionString, max: 3 });
  }
  return pool;
}
