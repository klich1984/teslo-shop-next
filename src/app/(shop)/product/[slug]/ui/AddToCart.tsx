'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'

interface AddToCartProps {
  product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { addProductToCart } = useCartStore()

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      quantity,
      size,
      image: product.images[0],
      price: product.price,
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {posted && !size && (
        <span className='mt-2 text-red-500 fade-in fade-out'>
          Debe de seleccionar una talla
        </span>
      )}
      {/* Selector de talla */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Boton */}
      <button className='btn-primary my-5' onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}
