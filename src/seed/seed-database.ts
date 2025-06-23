import { prisma } from '../lib/prisma'
import { initialData } from './seed'

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
  const { categories, products } = initialData

  const categoriesData = categories?.map((category) => ({
    name: category,
  }))
  // const categoriesData = categories?.map((name) => ({ name }))
  await prisma.category.createMany({
    data: categoriesData,
  })

  const categoriesDB = await prisma.category.findMany() // Obtengo todas las categorias de la base de datos

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id

    return map
  }, {} as Record<string, string>) //<string=shirt, categoryID=categoryID=>

  // Crear productos
  // Ejemplo de insertar un producto
  // const { images, type, ...producto1 } = products[0] // Product1 contiene el resto de propiedades del producto, y las imagenes y el tipo de producto se eliminan

  // await prisma.product.create({
  //   data: {
  //     ...producto1,
  //     categoryId: categoriesMap['shirts'],
  //   },
  // })

  products.forEach(async (product) => {
    const { type, images, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    })
  })

  // Insertar Imagenes

  console.log('👽 Seed ejecutandose correctamente')
}

;(() => {
  // No debe ejecutarse en producción
  if (process.env.NODE_ENV === 'production') return

  main()
})()
