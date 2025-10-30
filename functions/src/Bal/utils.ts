export function pickWhatsappNumber(): string {
  const n1 = '8801983268976'
  const n2 = '880718585937'
  // Deterministic-ish randomness with crypto if available
  const r = Math.random()
  return r < 0.5 ? n1 : n2
}

export function encodeMessage(text: string) {
  return encodeURIComponent(text)
}
