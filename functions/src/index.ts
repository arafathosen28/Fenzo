import * as admin from 'firebase-admin'
import { createOrder } from './createOrder'
import { bkashWebhook, nagadWebhook } from './webhooks'

if (!admin.apps.length) {
  admin.initializeApp()
}

export { createOrder, bkashWebhook, nagadWebhook }
