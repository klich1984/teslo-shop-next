'use client'

import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    // Sincronizar el cliente y el servidor
    setLoaded(true)
  }, [])

  const { address } = useAddressStore()

  const { cart, getSummaryInformation, clearCart } = useCartStore()

  const { itemsInCart, subTotal, tax, total } = getSummaryInformation()

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    // await sleep(2)
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    // Server Action
    const res = await placeOrder(productsToOrder, address)

    if (!res.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(res.message)
      return
    }

    //* Todo salio bien
    clearCart()
    router.replace(`/orders/${res.order?.id}`)
  }

  if (!loaded) return <p>Cargando...</p>

  if (!cart.length)
    return (
      <div>
        <p>No hay productos que revisar</p>
        <Link className='flex btn-primary justify-center font-semibold mt-2' href={'/'}>
          Regresa a al tienda
        </Link>
      </div>
    )

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

      <h2 className='text-2xl mb-2 font-bold'>Resumen de orden</h2>

      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 producto' : `${itemsInCart} productos`}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          {/* Disclaimer */}
          <span className='text-xs'>
            Al hacer click en &quot;Finalizar orden&quot;, aceptas nuestros{' '}
            <a href='#' className='underline'>
              términos y condiciones
            </a>{' '}
            y{' '}
            <a href='#' className='underline'>
              política de privacidad
            </a>
          </span>
        </p>

        <p className='text-red-500'>{errorMessage}</p>

        <button
          className={clsx({
            'flex btn-primary justify-center font-semibold': !isPlacingOrder,
            'flex btn-disabled justify-center font-semibold': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          // href={'/orders/123'}
        >
          Finalizar orden
        </button>
      </div>
    </div>
  )
}
