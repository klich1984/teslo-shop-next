import { Title } from '@/components'
import { ProductsInChecout } from './ui/ProductsInCheckout'
import { PlaceOrder } from './ui/PlaceOrder'

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            {/* Items */}
            <ProductsInChecout />
          </div>

          {/* checkout | Resumen de la compra */}
          <div className='flex flex-col mt-5'>
            <PlaceOrder />
          </div>
        </div>
      </div>
    </div>
  )
}
