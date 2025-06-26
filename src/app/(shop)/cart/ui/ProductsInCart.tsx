'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useCartStore } from '@/store'
import { QuantitySelector } from '@/components'
import Link from 'next/link'

export const ProductsInCart = () => {
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
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={3}
              onQuantityChanged={(value) => console.log('👽 value', value)}
            />

            <button className='mt-3 underline'>Remover</button>
          </div>
        </div>
      ))}
    </>
  )
}
