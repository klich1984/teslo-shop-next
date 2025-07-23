import { Title } from '@/components'
import Image from 'next/image'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'
import { getOrderById } from '@/actions/order/get-order-by-is'
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
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': !order.order!.isPaid,
                  'bg-green-700': order.order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className='mx-2'>
                {order.order!.isPaid ? 'Pagada' : 'Pendiente de pago'}
              </span>
            </div>

            {/* Items */}
            {itemsInCart?.map((item) => (
              <div className='flex mb-5' key={`${item.product.slug}-${item.size}`}>
                <Image
                  alt={item.product.title}
                  className='mr-5 rounded'
                  src={`/products/${item.product.ProductImage[0].url}`}
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
          <div className='bg-white rounded-xl shadow-xl p-7'>
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

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': !order.order!.isPaid,
                    'bg-green-700': order.order!.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>{order.order!.isPaid ? 'Orden pagada' : 'Pendiente de pago'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
