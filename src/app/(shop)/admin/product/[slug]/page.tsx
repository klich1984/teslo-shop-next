import { getProductBySlug } from "@/actions";
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

  const product = await getProductBySlug(slug)

  // Todo: new
  if (!product) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  return (
    <div>
      <Title title={title}/>

      <ProductForm product={product}/>
    </div>
  );
}