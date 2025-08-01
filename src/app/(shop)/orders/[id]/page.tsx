import { OrderStatus, PayPalButton, ProductImage, Title } from '@/components'

import { getOrderById } from '@/actions'
import { redirect } from 'next/navigation'
import { currencyFormat } from '@/utils'
interface OrderPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params

  // Todo Llamar server Action getOrderById
  const order = await getOrderById(id)

  if (!order.ok) {
    redirect('/')
  }

  const address = order.order?.OrderAddress
  const itemsInCart = order.order?.OrderItem

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden # ${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order.order!.isPaid} />

            {/* Items */}
            {itemsInCart?.map((item) => (
              <div className='flex mb-5' key={`${item.product.slug}-${item.size}`}>
                <ProductImage
                  alt={item.product.title}
                  className='mr-5 rounded'
                  src={item.product.ProductImage[0]?.url}
                  height={100}
                  width={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />

                <div>
                  <p>
                    {item.product.title} - {item.size}
                  </p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout | Resumen de la compra */}
          <div className='bg-white h-fit rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.country.name}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2 font-bold'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {order.order?.itemsInOrder === 1
                  ? '1 producto'
                  : `${order.order?.itemsInOrder} productos`}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>{currencyFormat(order.order!.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>{currencyFormat(order.order!.tax)}</span>

              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order.order!.total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full z-10 container__buttons-paypal'>
              {order.order?.isPaid ? (
                <OrderStatus isPaid={order.order!.isPaid} />
              ) : (
                <PayPalButton amount={order.order!.total} orderId={order.order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
