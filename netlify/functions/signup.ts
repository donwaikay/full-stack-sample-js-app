import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getPool } from './_lib/db';
import { signSession, sessionCookie } from './_lib/auth';
import { json } from './_lib/http';

const SignupSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  password: z.string().min(8).max(200),
  displayName: z.string().trim().min(1).max(120),
});

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const body = await req.json().catch(() => null);
  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'Invalid email, password, or name' }, 400);
  const { email, password, displayName } = parsed.data;

  const pool = getPool();
  const existing = await pool.query('SELECT id FROM app_users WHERE email = $1', [email]);
  if (existing.rowCount) return json({ error: 'An account with that email already exists' }, 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const inserted = await pool.query(
    `INSERT INTO app_users (id, email, password_hash, display_name)
     VALUES (gen_random_uuid(), $1, $2, $3)
     RETURNING id, email, display_name`,
    [email, passwordHash, displayName],
  );
  const user = inserted.rows[0];
  const token = signSession({ sub: user.id, email: user.email, name: user.display_name });

  return json(
    { user: { id: user.id, email: user.email, displayName: user.display_name } },
    200,
    sessionCookie(token),
  );
};
