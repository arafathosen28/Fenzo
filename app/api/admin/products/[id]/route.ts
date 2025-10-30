// app/api/admin/products/[id]/route.ts  (PUT, DELETE)
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

export async function PUT(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const body = await _req.json()
    const id = params.id
    await db.collection('products').doc(id).update({
      ...body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    const doc = await db.collection('products').doc(id).get()
    return NextResponse.json({ id, ...doc.data() })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const id = params.id
    await db.collection('products').doc(id).delete()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 400 })
  }
      }
