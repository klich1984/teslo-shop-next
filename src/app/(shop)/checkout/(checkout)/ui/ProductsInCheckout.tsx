'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInChecout = () => {
  const [loaded, setLoaded] = useState(false)
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
          <Image
            alt={product.title}
            className='mr-5 rounded'
            src={`/products/${product.image}`}
            height={100}
            width={100}
            style={{
              width: '100px',
              height: '100px',
            }}
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
