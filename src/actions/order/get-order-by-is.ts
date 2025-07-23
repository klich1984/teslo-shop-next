'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  const userId = session?.user.id

  // verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario, autenticación requerida',
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
            address: true,
            address2: true,
            city: true,
            postalCode: true,
            phone: true,
            country: {
              select: {
                name: true,
              },
            },
          }
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                }
              }
            }
          }
        },
      },
    })

    if (!order) throw Error(`${id} no existe - 404`)

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw Error(`${id} no es de este usuario - 403`)
      }
    }

    return {
      ok: true,
      order: order,
    }
  } catch (error) {
    console.log('👽 ~ getOrderById ~ error:', error)

    return {
      ok: false,
      message: 'Orden No existe',
    }
  }
}
