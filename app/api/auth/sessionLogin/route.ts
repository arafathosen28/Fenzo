// app/api/auth/sessionLogin/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';
const MAX_AGE_DAYS = Number(process.env.SESSION_COOKIE_MAX_AGE_DAYS || 5);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(req: Request) {
  const { idToken } = await req.json();
  if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

  const expiresIn = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

  const cookieStore = cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: sessionCookie,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: expiresIn / 1000,
  });

  return NextResponse.json({ ok: true });
}
