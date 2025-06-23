// 'use server'

import { prisma } from '@/lib/prisma'

export const getPaginatedProductsWithImages = async () => {
  try {
    // Obtener todos los productos con dos imagenes y seleccionar las imagenes
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    })

    console.log('👽 ~ getPaginatedProductsWithImages ~ products:', products)
    return {
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (error) {
    console.error(error)
    throw new Error('No se pudo cargar los productos')
  }
}
