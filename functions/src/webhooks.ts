// functions/src/webhooks.ts
import { onRequest } from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'
import * as crypto from 'crypto'

function verifyHmac(req: any, secret: string) {
  const sig = req.get('X-Signature') || ''
  const body = JSON.stringify(req.body || {})
  const h = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(sig))
}

export const bkashWebhook = onRequest(async (req, res) => {
  const ok = verifyHmac(req, process.env.WEBHOOK_SECRET || '')
  if (!ok) return res.status(401).send('invalid signature')
  // ... rest unchanged
  res.send({ received: true })
})
