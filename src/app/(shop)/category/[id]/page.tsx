import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const { id } = params

  if (id === 'kids') {
    notFound()
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  )
}
