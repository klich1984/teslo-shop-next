'use server'

import { prisma } from '@/lib/prisma'
// import { sleep } from '@/utils'

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(3)
    const stock = await prisma.product.findFirst({
      select: { inStock: true },
      where: {
        slug,
      },
    })

    console.log('10👽 ~ getStockBySlug ~ product:', stock)

    return stock?.inStock ?? 0
  } catch (error) {
    console.log('👽', error)
    throw new Error('Error al obtener el stock por slug')
  }

  // return stock.
}
