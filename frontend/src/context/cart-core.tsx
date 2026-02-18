import { createContext, useContext } from 'react'
import type { CartItem, Product, User } from '../types'

export interface CartContextType {
  items: CartItem[]
  user: User | null
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
  setUser: (user: User | null) => void
  logout: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
