import { CartProduct } from '@/interfaces'
import { create } from 'zustand'

interface StateCart {
  cart: CartProduct[]

  // addProduct: (product: CartProduct) => void
  addProductToCart: (product: CartProduct) => void
  // updateProductQuantity: (productId: string, quantity: number) => void
  // updatedCartProducts: () => CartProduct[]
  // removeProduct: (productId: string) => void
  // clearCart: () => void
}

export const useCartStore = create<StateCart>()((set, get) => ({
  cart: [],

  // Methods
  addProductToCart: (product: CartProduct) => {
    // El get es el estado actual de zustand
    const { cart } = get()

    // 1. Revisar si el producto existe en el carrito con la talla seleccionada
    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size
    )

    if (!productInCart) {
      set({ cart: [...cart, product] })
      return
    }

    // 2. Ya que existe el producto por talla, debo de incrementar la cantidad de ese producto
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity }
      }

      return item
    })

    set({ cart: updatedCartProducts })
  },
}))
