'use server'

import { prisma } from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleted = await prisma.userAddress.delete({
      where: {
        userId,
      },
    })

    return {
      ok: true,
      deleted,
      message: 'Direccion eliminada con exito',
    }
  } catch (error) {
    console.log('👽 ~ deleteUserAddress ~ error:', error)

    return {
      ok: false,
      message: 'No se pudo eliminar la dirección',
    }
  }
}
