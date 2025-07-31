import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface ProductAdminProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductAdminProps) {
  const { slug } = await params

  // const product = await getProductBySlug(slug)
  const [ product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // Todo: new
  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  // const categories = await getCategories()

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  return (
    <div>
      <Title title={title}/>

      <ProductForm product={product ?? {}} categories={categories}/>
    </div>
  );
}