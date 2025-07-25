'use server'

import { PayPalOrderStatusResponse } from '@/interfaces'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET

  const oauth2URL = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')
  const myHeaders = new Headers()

  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  }

  try {
    const result = await fetch(oauth2URL, { ...requestOptions, cache: 'no-store' })
    const resJson = await result.json()

    return resJson.access_token
  } catch (error) {
    console.log('👽 ~ getPayPalBearerToken ~ error:', error)

    return null
  }
}

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderURL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const response = await fetch(paypalOrderURL, { ...requestOptions, cache: 'no-store' })
    const result = await response.json()

    return result
  } catch (error) {
    console.log('👽 ~ verifyPayPalPayment ~ error:', error)

    return null
  }
}

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken()

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autenticación de Paypal',
    }
  }

  const response = await verifyPayPalPayment(paypalTransactionId, authToken)

  if (!response) {
    return {
      ok: false,
      message: 'Error al verificar el pago de PayPal',
    }
  }

  const { status, purchase_units } = response
  const { invoice_id: orderId } = purchase_units[0]
  console.log('👽 ~ paypalCheckPayment ~ status:', { status, purchase_units })
  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aun no se ha completado el pago en PayPal',
    }
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        updatedAt: new Date(),
      },
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
    }
  } catch (error) {
    console.log('👽 ~ paypalCheckPayment ~ error:', error)

    return {
      ok: false,
      message: '500 - El pago no se pudo realizar',
    }
  }
}
