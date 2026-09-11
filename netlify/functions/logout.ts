import { clearSessionCookie } from './_lib/auth';
import { json } from './_lib/http';

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  return json({ ok: true }, 200, clearSessionCookie());
};
