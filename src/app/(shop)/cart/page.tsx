import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CartPage() {
  if (productInCart.length === 0) {
    redirect('/empty')
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar más items</span>
            <Link href={'/'} className='underline mb-5'>
              Continúa comprando
            </Link>

            {/* Items */}
            {productInCart?.map((product) => (
              <div className='flex mb-5' key={product.slug}>
                <Image
                  alt={product.title}
                  className='mr-5 rounded'
                  src={`/products/${product.images[0]}`}
                  height={100}
                  width={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />

                  <button className='mt-3 underline'>Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* checkout | Resumen de la compra */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>3 artículos</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>$ 50</span>

              <span>Total:</span>
              <span className='mt-5 text-2xl text-right'>$ 150</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <Link
                className='flex btn-primary justify-center font-semibold'
                href={'/checkout/address'}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
