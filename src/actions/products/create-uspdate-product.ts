'use server'

import { Gender, Product, Size } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

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
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        // convertir imagen a string base64
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url)

        // const cloudBinaryResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
        // const imageUrl = cloudBinaryResponse.secure_url

        // return imageUrl
      } catch (error) {
        console.log('👽 ~ uploadImages ~ error:', error)

        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)

    // console.log('👽 ~ uploadImages ~ uploadedImages:', uploadedImages)

    return uploadedImages
  } catch (error) {
    console.log('👽 ~ uploadImages ~ error:', error)

    return null
  }
}

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

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let productUpdate: Product
      const tagsArray = product.tags.split(',').map((tag) => tag.trim())

      if (id) {
        // Actualizar
        productUpdate = await tx.product.update({
          // Esta diferente al video
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        })
      } else {
        // crear
        productUpdate = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        })
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if (formData.getAll('images')) {
        const imagesUrls = await uploadImages(formData.getAll('images') as File[])

        console.log('👽 ~ createUpdateProduct ~ imagesUrls:', imagesUrls)

      }

      return { productUpdate }
    })

    // Todo: revalidate path
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      productUpdate: prismaTx.productUpdate,
    }
  } catch (error) {
    console.log('👽 ~ createUpdateProduct ~ error:', error)

    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear el producto',
    }
  }
}
