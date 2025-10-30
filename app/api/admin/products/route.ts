// app/api/admin/products/route.ts  (GET, POST)
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
    const snap = await db.collection('products').get()
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin()
    const body = await req.json()
    // minimal validation
    const payload = {
      name: String(body.name || ''),
      code: String(body.code || ''),
      price: Number(body.price || 0),
      offerPrice: body.offerPrice ? Number(body.offerPrice) : null,
      stock: Number(body.stock || 0),
      sizes: Array.isArray(body.sizes) ? body.sizes : [],
      colors: Array.isArray(body.colors) ? body.colors : [],
      images: Array.isArray(body.images) ? body.images : [],
      description: String(body.description || ''),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    const ref = await db.collection('products').add(payload)
    return NextResponse.json({ id: ref.id, ...payload })
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 400 })
  }
}
