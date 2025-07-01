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
          return '15👽 Invalid credentials.'
        default:
          return '17👽 Something went wrong.'
      }
    }
    throw error
  }
}
