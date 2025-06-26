'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'

interface AddToCartProps {
  product: Product
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    console.log('👽 addToCartt', { size, quantity })
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
