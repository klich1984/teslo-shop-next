import { ralewayFont, titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div
      className={`${ralewayFont.className} flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle`}
    >
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>Whoops! Lo sentimos mucho.</p>
        <p className='font-light'>
          <span className='font-normal hover:underline transition-all'>
            Puedes regresar al{' '}
          </span>
          <Link href='/'>Inicio</Link>
        </p>
      </div>

      <div className='px-5 mx-5'>
        <Image
          alt='Starman car'
          className='p-5 sm:p-0'
          height={550}
          src={'/imgs/starman_750x750.png'}
          width={550}
        />
      </div>
    </div>
  )
}
