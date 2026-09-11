import jwt from 'jsonwebtoken';

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
}

const COOKIE_NAME = 'cv_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function secret(): string {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error('JWT_SECRET is not set');
  return value;
}

export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, secret(), { expiresIn: MAX_AGE_SECONDS });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, secret()) as SessionPayload;
  } catch {
    return null;
  }
}

function isSecureContext(): boolean {
  return process.env.CONTEXT !== 'dev' && process.env.NETLIFY_DEV !== 'true';
}

export function sessionCookie(token: string): string {
  const secureFlag = isSecureContext() ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${secureFlag}`;
}

export function clearSessionCookie(): string {
  const secureFlag = isSecureContext() ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag}`;
}

export function readSessionToken(req: Request): string | null {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

export function requireUser(req: Request): SessionPayload | null {
  const token = readSessionToken(req);
  if (!token) return null;
  return verifySession(token);
}
