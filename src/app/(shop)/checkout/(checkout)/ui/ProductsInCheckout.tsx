'use client'
import { useEffect, useState } from 'react'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import Link from 'next/link'
import { ProductImage } from '@/components'

export const ProductsInChecout = () => {
  const [loaded, setLoaded] = useState(false)
  const productInCart = useCartStore((state) => state.cart)
  const { cart } = useCartStore()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Cargando...</p>
  }

  if (!cart.length) return <></>

  return (
    <>
      <span className='text-xl'>Ajustar elementos</span>
      <Link href={'/cart'} className='underline mb-5'>
        Editar carrito
      </Link>

      {productInCart?.map((product) => (
        <div className='flex mb-5' key={`${product.slug}-${product.size}`}>
          <ProductImage
            alt={product.title}
            className='mr-5 rounded'
            src={product?.image}
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
