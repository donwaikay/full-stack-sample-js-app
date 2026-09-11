export function json(body: unknown, status = 200, setCookie?: string): Response {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (setCookie) headers.append('set-cookie', setCookie);
  return new Response(JSON.stringify(body), { status, headers });
}
