import {
  ProductMobileSlidesshow,
  ProductSlidesshow,
  QuantitySelector,
  SizeSelector,
} from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = initialData.products.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Mobile Slidesshow */}
        <ProductMobileSlidesshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />

        {/* Desktop Slidesshow */}
        <ProductSlidesshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>
      {/* Detalles */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>{product.price}</p>
        {/* Selector de talla */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />
        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />
        {/* Boton */}
        <button className='btn-primary my-5'>Agregar al carrito</button>
        {/* Descripcion */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
