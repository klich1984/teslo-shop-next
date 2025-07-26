'use client'
import Link from 'next/link'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'
import { signOut as clientSignOut } from 'next-auth/react'

import { useUIStore } from '@/store'
import clsx from 'clsx'
import { logout } from '@/actions'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

interface SidebarProps {
  session: Session | null
}

export const Sidebar = ({ session }: SidebarProps) => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore()

  const isAuthenticated = !!session?.user // si estoy autenticado es true.
  const isAdmin = session?.user.role === 'admin'

  const router = useRouter()

  const handleLogOut = async () => {
    await logout()
    await clientSignOut({ redirect: false }) // Revaidar session en el cliente
    router.refresh()
    closeSideMenu()
  }

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs'
        />
      )}

      {/* SideMenu */}

      <nav
        // Todo: efecto de slide
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen, // Añade esta clase si el menu esta cerrado
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeSideMenu}
        />

        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full backdrop-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* Menú */}
        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeSideMenu}
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>

            <Link
              href='/orders'
              onClick={closeSideMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={handleLogOut}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl cursor-pointer'>Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href='/auth/login'
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={closeSideMenu}
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line Separetor */}
            <div className='w-full h-px bg-gray-200 my-10' />
            <Link
              href='/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link
              href='admin/orders'
              onClick={closeSideMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
            <Link
              href='/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
