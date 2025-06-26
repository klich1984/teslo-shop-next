import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StateCart {
  cart: CartProduct[]

  getTotalItems: () => number

  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  // removeProduct: (productId: string) => void
}

export const useCartStore = create<StateCart>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get()

        return cart.reduce((total, item) => total + item.quantity, 0)
      },

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

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }

          return item
        })

        set({ cart: updatedCartProducts })
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
)
