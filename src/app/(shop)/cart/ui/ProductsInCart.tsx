'use client'
import { useEffect, useState } from 'react'

import { useCartStore } from '@/store'
import { ProductImage, QuantitySelector } from '@/components'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const { updateProductQuantity, removeProduct } = useCartStore()
  const productInCart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productInCart?.map((product) => (
        <div className='flex mb-5' key={`${product.slug}-${product.size}`}>
          <ProductImage
            alt={product.title}
            className='mr-5 rounded'
            src={product.image}
            height={100}
            width={100}
            style={{
              width: '100px',
              height: '100px',
            }}
          />

          <div>
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />

            <button
              className='mt-3 underline cursor-pointer'
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
