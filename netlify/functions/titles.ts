import { CATALOG, ROWS, FEATURED_ID } from '../../shared/catalog';
import { json } from './_lib/http';

export default async (req: Request) => {
  if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
  return json(
    { catalog: CATALOG, rows: ROWS, featuredId: FEATURED_ID },
    200,
    undefined,
  );
};
