// 'use server'
import { Gender } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  try {
    // Obtener todos los productos con dos imagenes y seleccionar las imagenes
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    })

    // Obtener el total de páginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      },
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
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
