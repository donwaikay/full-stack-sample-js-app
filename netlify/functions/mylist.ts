import { z } from 'zod';
import { getPool } from './_lib/db';
import { requireUser } from './_lib/auth';
import { json } from './_lib/http';

const BodySchema = z.object({ titleId: z.number().int().positive() });

export default async (req: Request) => {
  const session = requireUser(req);
  if (!session) return json({ error: 'Sign in required' }, 401);

  const pool = getPool();

  if (req.method === 'GET') {
    const result = await pool.query('SELECT title_id FROM my_list WHERE user_id = $1 ORDER BY created_at DESC', [
      session.sub,
    ]);
    return json({ titleIds: result.rows.map((r) => r.title_id) }, 200);
  }

  if (req.method === 'POST') {
    const body = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) return json({ error: 'Invalid titleId' }, 400);
    await pool.query(
      'INSERT INTO my_list (user_id, title_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [session.sub, parsed.data.titleId],
    );
    return json({ ok: true }, 200);
  }

  if (req.method === 'DELETE') {
    const titleId = Number(new URL(req.url).searchParams.get('titleId'));
    if (!Number.isInteger(titleId) || titleId <= 0) return json({ error: 'Invalid titleId' }, 400);
    await pool.query('DELETE FROM my_list WHERE user_id = $1 AND title_id = $2', [session.sub, titleId]);
    return json({ ok: true }, 200);
  }

  return json({ error: 'Method not allowed' }, 405);
};
