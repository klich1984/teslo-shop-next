// import { notFound } from 'next/navigation'

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@/generated/prisma'
import { redirect } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    gender: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { gender } = await params
  const { page } = await searchParams

  const pageNumber = page ? parseInt(page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pageNumber,
    gender: gender as Gender,
  })

  if (products.length === 0) {
    return redirect(`/gender/${gender}`)
  }

  // if (id === 'kids') {
  //   notFound()
  // }

  const label: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  }

  return (
    <>
      <Title
        title={gender ? gender.toUpperCase() : 'Tienda'}
        subtitle={`Artículos para ${label[gender]}`}
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
