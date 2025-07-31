'use server'

import { Gender, Product, Size } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log('👽 ~ productParsed error ~ formData:', productParsed.error)
    return {
      ok: false,
    }
  }

  const product = productParsed.data

  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...rest } = product
  const prismaTx = await prisma.$transaction(async (tx) => {
    let productUpdate : Product
    const tagsArray = product.tags.split(',').map(tag => tag.trim())

    if (id) {
      // Actualizar
      productUpdate = await tx.product.update({ // Esta diferente al video
        where: { id },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          }
        }
      })

      console.log('👽 ProductUpdate', productUpdate)
    } else {
      // crear
    }

    return {}
  })

  // Todo: revalidate path
  return {
    ok: true,
  }
}