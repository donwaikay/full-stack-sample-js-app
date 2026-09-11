import { requireUser } from './_lib/auth';
import { json } from './_lib/http';

export default async (req: Request) => {
  const session = requireUser(req);
  if (!session) return json({ user: null }, 200);
  return json({ user: { id: session.sub, email: session.email, displayName: session.name } }, 200);
};
