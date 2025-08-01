'use server'

import { prisma } from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      }
    })

    if (!order) {
      return {
        ok: false,
        message: `No se encontró una orden con el id ${orderId}`
      }
    }

    return {
      ok: true,
    }
  } catch (error) {
    console.error('👽 ~ setTransactionId ~ error:', error)

    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción'
    }

  }
}