'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return {
      ok: true,
      user,
      message: 'Usuario creado con exito',
    }
  } catch (error) {
    console.error('👽 ~ registerUser ~ error:', error)
    return {
      ok: false,
      message: 'No se pudo crear el usuario',
      error,
    }
  }
}
