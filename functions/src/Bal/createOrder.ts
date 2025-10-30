import * as admin from 'firebase-admin'
import { onCall } from 'firebase-functions/v2/https'
import { pickWhatsappNumber, encodeMessage } from './utils'

export const createOrder = onCall({ cors: true }, async (req) => {
  const payload = req.data
  // Basic validation
  if (!payload?.items?.length) throw new Error('No items')
  if (!payload?.customer?.name || !payload?.customer?.contact1) throw new Error('Missing customer info')
  if (!payload?.customer?.city || !payload?.customer?.upazilla || !payload?.customer?.postOffice || !payload?.customer?.postCode) throw new Error('Missing address')
  const paymentMethod = payload?.paymentMethod || 'cod'

  const total = payload.items.reduce((sum: number, it: any) => sum + ((it.product.offerPrice ?? it.product.price) * it.qty), 0)

  const orderDoc = {
    items: payload.items,
    customer: payload.customer,
    paymentMethod,
    total,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    paymentVerification: { status: 'selected' }
  }

  const ref = await admin.firestore().collection('orders').add(orderDoc)

  // Build WhatsApp text
  const lines: string[] = []
  payload.items.forEach((it: any) => {
    lines.push(`Product Name: ${it.product.name}`)
    lines.push(`Product Code: ${it.product.code}`)
    lines.push(`Size: ${it.size}`)
    lines.push(`Color: ${it.color}`)
    lines.push(`Price: ৳${(it.product.offerPrice ?? it.product.price) * it.qty}`)
    lines.push('')
  })
  lines.push(`Payment method: ${paymentMethod === 'cod' ? 'Cash on delivery' : paymentMethod}`)
  lines.push(`Customer Name: ${payload.customer.name}`)
  lines.push(`Contact: Contact 1: ${payload.customer.contact1}, Contact 2: ${payload.customer.contact2 || ''}`)
  lines.push(`Full Address: ${payload.customer.city}, ${payload.customer.upazilla}, ${payload.customer.postOffice} ${payload.customer.postCode}`)

  const waText = encodeMessage(lines.join('\n'))
  const chosen = pickWhatsappNumber()
  const waUrl = `https://wa.me/${chosen}?text=${waText}`

  return { id: ref.id, waUrl }
})
