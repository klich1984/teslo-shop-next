// import { notFound } from 'next/navigation'

import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'

interface CategoryPageProps {
  params: Promise<{
    id: Category
  }>
}
const products = initialData.products

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const { id } = params
  const filterProducts = products.filter((product) => product.gender === id)

  // if (id === 'kids') {
  //   notFound()
  // }
  const label: Record<Category, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  }

  return (
    <>
      <Title
        title={id.toUpperCase()}
        subtitle={`Artículos para ${label[id]}`}
        className='mb-2'
      />
      <ProductGrid products={filterProducts} />
    </>
  )
}
