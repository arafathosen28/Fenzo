import { onRequest } from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'

function verifySignature(req: any, secret: string) {
  // TODO: Implement provider-specific signature checks (HMAC or RSA)
  return !!secret
}

export const bkashWebhook = onRequest(async (req, res) => {
  const ok = verifySignature(req, process.env.WEBHOOK_SECRET || '')
  if (!ok) return res.status(401).send('invalid signature')
  const event = req.body
  // Example update
  if (event?.orderId && event?.status) {
    await admin.firestore().collection('orders').doc(event.orderId).set({
      paymentVerification: { status: event.status, at: new Date().toISOString() }
    }, { merge: true })
  }
  res.send({ received: true })
})

export const nagadWebhook = onRequest(async (req, res) => {
  const ok = verifySignature(req, process.env.WEBHOOK_SECRET || '')
  if (!ok) return res.status(401).send('invalid signature')
  const event = req.body
  if (event?.orderId && event?.status) {
    await admin.firestore().collection('orders').doc(event.orderId).set({
      paymentVerification: { status: event.status, at: new Date().toISOString() }
    }, { merge: true })
  }
  res.send({ received: true })
})
