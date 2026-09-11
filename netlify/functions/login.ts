import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getPool } from './_lib/db';
import { signSession, sessionCookie } from './_lib/auth';
import { json } from './_lib/http';

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const body = await req.json().catch(() => null);
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'Invalid email or password' }, 400);
  const { email, password } = parsed.data;

  const pool = getPool();
  const result = await pool.query(
    'SELECT id, email, password_hash, display_name FROM app_users WHERE email = $1',
    [email],
  );
  const user = result.rows[0];
  if (!user) return json({ error: 'Incorrect email or password' }, 401);

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return json({ error: 'Incorrect email or password' }, 401);

  const token = signSession({ sub: user.id, email: user.email, name: user.display_name });
  return json(
    { user: { id: user.id, email: user.email, displayName: user.display_name } },
    200,
    sessionCookie(token),
  );
};
