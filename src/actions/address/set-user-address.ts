'use server'

import { Address } from '@/interfaces'
import { prisma } from '@/lib/prisma'

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    })

    const addressToSave = {
      userId,
      address: address.address,
      address2: address?.address2 ?? '',
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    }

    // Crear si no existe
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      })

      return newAddress
    }

    // Actualizar
    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    })

    return updateAddress
  } catch (error) {
    console.error('👽 ~ createOrReplaceAddress ~ error:', error)
    throw new Error('No se pudo guardar la dirección en la base de datos')
  }
}

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress,
      message: 'Direccion guardada correctamente',
    }
  } catch (error) {
    console.error('👽 ~ setUserAddress ~ error:', error)
    return {
      ok: false,
      message: 'No se pudo grabar la dirección',
    }
  }
}
