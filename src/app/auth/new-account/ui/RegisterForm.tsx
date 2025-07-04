'use client'

import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInputs {
  name: string
  email: string
  password: string
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { email, name, password } = data

    // Server action
    const res = await registerUser(name, email, password)

    // errror
    if (!res.ok) {
      setErrorMessage(res.message)

      return
    }

    await login(email.toLowerCase(), password)

    router.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      {errors.name?.type === 'required' && (
        <span className='text-red-500'>* El nombre es obligatorio</span>
      )}

      <label htmlFor='name'>Nombre completo</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500 focus-visible:outline-0': !!errors.name,
        })}
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500 focus-visible:outline-0': !!errors.email,
        })}
        type='email'
        {...register('email', { required: true, pattern: emailRegex })}
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500 focus-visible:outline-0': !!errors.password,
        })}
        type='password'
        {...register('password', { required: true, minLength: 6 })}
      />

      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}

      <button className='btn-primary'>Crear cuenta</button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Ingresar
      </Link>
    </form>
  )
}
