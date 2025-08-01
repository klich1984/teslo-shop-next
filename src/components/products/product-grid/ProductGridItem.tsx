'use client'

import { useState } from 'react'
import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { ProductImage } from '@/components/product/product-image/ProductImage'

interface ProductGridItemProps {
  product: Product
}

export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        {!displayImage ? (
          <ProductImage
            width={1024}
            height={800}
            src={displayImage}
            alt={product.title}
            className='rounded-lg object-fill'
          />
        ) : displayImage?.startsWith('http') ? (
          <ProductImage
            width={1024}
            height={800}
            src={displayImage}
            alt={product.title}
            className='rounded-lg object-fill'
          />
        ) : (
          <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            className='w-full object-cover rounded'
            width={500}
            height={500}
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        )}
      </Link>

      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-bold'>${product.price}</span>
      </div>
    </div>
  )
}
