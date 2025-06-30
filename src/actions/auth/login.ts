'use server'

import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    console.log('8👽 ~ authenticate ~ formData:', { prevState, formData })
    console.log('9👽 ~ authenticate ~ formData:', Object.fromEntries(formData))
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
