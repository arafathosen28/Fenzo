export function buildWhatsappMessage(order: any) {
  // Message format per requirements
  const lines: string[] = []
  order.items.forEach((it: any) => {
    lines.push(`Product Name: ${it.product.name}`)
    lines.push(`Product Code: ${it.product.code}`)
    lines.push(`Size: ${it.size}`)
    lines.push(`Color: ${it.color}`)
    lines.push(`Price: ৳${(it.product.offerPrice ?? it.product.price) * it.qty}`)
    lines.push('')
  })
  lines.push(`Payment method: ${order.paymentMethod === 'cod' ? 'Cash on delivery' : order.paymentMethod}`)
  lines.push(`Customer Name: ${order.customer.name}`)
  lines.push(`Contact: Contact 1: ${order.customer.contact1}, Contact 2: ${order.customer.contact2||''}`)
  lines.push(`Full Address: ${order.customer.city}, ${order.customer.upazilla}, ${order.customer.postOffice} ${order.customer.postCode}`)

  return encodeURIComponent(lines.join('\n'))
}
