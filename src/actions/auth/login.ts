'use server'

import { signIn } from '@/auth.config'
// import { sleep } from '@/utils'
import { AuthError } from 'next-auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // sleep(5)

    await signIn('credentials', Object.fromEntries(formData))
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '15👽 CredentialsSignin.'
        default:
          return '17👽 Something went wrong.'
      }
    }
    throw error
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })

    return {
      ok: true,
    }
  } catch (error) {
    console.error('👽 ~ login ~ error:', error)
    return { ok: false, message: 'No se pudo iniciar sesion' }
  }
}
