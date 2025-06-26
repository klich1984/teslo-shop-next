import { CartProduct } from '@/interfaces'
import { create } from 'zustand'

interface StateCart {
  cart: CartProduct[]

  // addProduct: (product: CartProduct) => void
  // removeProduct: (productId: string) => void
  // updateProductQuantity: (productId: string, quantity: number) => void
  // clearCart: () => void
}

export const useCartStore = create<StateCart>()((set) => ({
  cart: [],
}))
