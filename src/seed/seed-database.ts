import { prisma } from '../lib/prisma'
import { initialData } from './seed';

const main = async () => {
  // Borrar registros previos de la base de datos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])

  // Crear categorias
  // await prisma.category.create({
  //   data: {
  //     name: 'Shirts'
  //   }
  // })
  // objeto como lo necesito
  // {
  //   name: 'Shirt'
  // }
  const { categories } = initialData

  const categoriesData = categories?.map((category) => ({
    name: category
  }))
  // const categoriesData = categories?.map((name) => ({ name }))
  await prisma.category.createMany({
    data: categoriesData
  })

  console.log('👽 categories', categoriesData)
  console.log('👽 Seed ejecutandose correctamente')
}

;(() => {
  // No debe ejecutarse en producción
  if (process.env.NODE_ENV === 'production') return

  main()
})()
