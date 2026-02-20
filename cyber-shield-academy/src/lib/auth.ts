import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function createToken() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret);
  return token;
}

export async function verifyAuth(token: string) {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}
