export const revalidate = 604800 // 7 dias

import { getProductBySlug } from '@/actions'
import { ProductMobileSlidesshow, ProductSlidesshow, StockLabel } from '@/components'
import { titleFont } from '@/config/fonts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AddToCart } from './ui/AddToCart'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = (await params).slug

  // fetch post information
  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Descripción del producto no disponible',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Descripción del producto no disponible',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  if (product.images.length === 0)
    return (
      <div className='mt-5 mb-20 flex items-center justify-center text-3xl'>
        El producto no esta disponible por falta de imagen
      </div>
    )

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
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>{product.price}</p>
        {/* Cliente */}
        <AddToCart product={product} />
        {/* Descripcion */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
