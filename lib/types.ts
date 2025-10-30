export type Product = {
  id?: string
  name: string
  code: string
  price: number
  offerPrice?: number | null
  description?: string
  images?: string[]
  sizes?: string[]
  colors?: string[]
  stock?: number
  featured?: boolean
  createdAt?: any
}

export type CartItem = {
  product: Product
  size?: string
  color?: string
  qty: number
}
