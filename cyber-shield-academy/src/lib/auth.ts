import { SignJWT, jwtVerify } from 'jose';

// Get secret from env or use fallback (for edge runtime compatibility)
const getSecret = () => {
  const secret = process.env.JWT_SECRET || '4cad3mYAI1900';
  return new TextEncoder().encode(secret);
};

export async function createToken() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
  return token;
}

export async function verifyAuth(token: string) {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD || '8888as');
}
