'use client'
import { collection, doc, getDoc, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { Product } from './types'
import { buildWhatsappMessage } from './whatsapp'

export async function getFeaturedProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, 'products'))
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }))
}

export async function getAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, 'products'))
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }))
}

export async function getProductByCode(code?: string): Promise<Product | null> {
  if (!code) return null
  const q = query(collection(db, 'products'), where('code', '==', code))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...(d.data() as any) }
}

// Admin add/update (simple client-side example; consider using callable fn with admin check)
export async function addOrUpdateProduct(p: any) {
  if (!p.code) throw new Error('Code required')
  // naive: add new doc (real app: upsert by code using a cloud function with RBAC)
  await addDoc(collection(db, 'products'), {
    ...p,
    createdAt: serverTimestamp()
  })
}

export async function createOrder(payload: any): Promise<{ id: string, waUrl: string }> {
  // For simplicity on demo: write order then compute wa link client side.
  // Recommended: call Cloud Function `createOrder` for validation and WhatsApp routing.
  const ref = await addDoc(collection(db, 'orders'), {
    ...payload,
    status: 'pending',
    createdAt: serverTimestamp()
  })
  const msg = buildWhatsappMessage({ ...payload })
  // 50/50 pick on client as fallback (server should do this canonical)
  const n1 = process.env.NEXT_PUBLIC_WA_NUM_1 || '8801983268976'
  const n2 = process.env.NEXT_PUBLIC_WA_NUM_2 || '880718585937'
  const choose = Math.random() < 0.5 ? n1 : n2
  const url = `https://wa.me/${choose}?text=${msg}`
  return { id: ref.id, waUrl: url }
}

export async function getRecentOrders(): Promise<any[]> {
  const snap = await getDocs(collection(db, 'orders'))
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }))
}
