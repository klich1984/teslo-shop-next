import { redirect } from 'next/navigation'

import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title, Pagination } from '@/components'
interface HomeProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams

  const pageNumber = page ? parseInt(page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pageNumber,
  })

  if (products.length === 0) {
    return redirect('/')
  }

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
