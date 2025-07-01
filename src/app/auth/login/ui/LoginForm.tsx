'use client'
import React, { useActionState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { authenticate } from '@/actions'
import { IoInformationCircleOutline } from 'react-icons/io5'
import clsx from 'clsx'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  console.log('13👽 useActionState', { isPending, errorMessage, formAction, callbackUrl })

  return (
    <>
      <form action={formAction} className='flex flex-col'>
        <label htmlFor='email'>Correo electrónico</label>
        <input
          className='px-5 py-2 border bg-gray-200 rounded mb-5'
          type='email'
          name='email'
          id='email'
        />

        <label htmlFor='password'>Contraseña</label>
        <input
          className='px-5 py-2 border bg-gray-200 rounded mb-5'
          type='password'
          name='password'
          id='password'
        />

        {errorMessage && (
          <div className='flex justify-center items-center mb-2'>
            <IoInformationCircleOutline className='h-6 w-6 text-red-500 mr-3' />
            <p className='text-sm text-red-500'>Las Credenciales no son correctas</p>
          </div>
        )}

        <button
          type='submit'
          className={clsx({
            'btn-primary': !isPending,
            'btn-disabled': isPending,
          })}
          disabled={isPending}
        >
          Ingresar
        </button>

        {/* divisor line */}
        <div className='flex items-center my-5'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>

        <Link href='/auth/new-account' className='btn-secondary text-center'>
          Crear una nueva cuenta
        </Link>
      </form>
    </>
  )
}
