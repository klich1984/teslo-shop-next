'use client'

import { getStockBySlug } from '@/actions/products/get-stock-by-slug'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface StockLabelProps {
  slug: string
}

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)

    setStock(inStock)
    setIsLoading(false)
  }

  useEffect(() => {
    getStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-300 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          {/* Stock: {stock} */}
          Stock: {stock}
        </h1>
      )}
    </>
  )
}
