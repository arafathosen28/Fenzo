// app/api/admin/orders/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import admin from 'firebase-admin'

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const db = admin.firestore()

async function requireAdmin() {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!session) throw new Error('unauthorized')
  await admin.auth().verifySessionCookie(session, true)
}

export async function GET() {
  try {
    await requireAdmin()
    const snap = await db.collection('orders').get()
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: 'Unauthorized or failed' }, { status: 401 })
  }
}
