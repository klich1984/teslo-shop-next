import { prisma } from '../lib/prisma'

const main = async () => {
  // Borrar registros previos de la base de datos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])

  console.log('👽 Seed ejecutandose correctamente')
}

;(() => {
  // No debe ejecutarse en producción
  if (process.env.NODE_ENV === 'production') return

  main()
})()
