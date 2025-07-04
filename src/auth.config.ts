import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import bcryptjs from 'bcryptjs'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('👽 ~ authorized ~ auth:', auth, nextUrl)

      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },

    session({ session, token }) {
      console.log('👽 ~ session ~ session:', { session, token })
      session.user = token.data as never

      return session
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user) return null

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null // Si no son iguales

        // regresar el usuario
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user // Se saca el pasword para no ser enviado.

        // console.log('👽 ~ authorize ~ rest:', rest)

        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
