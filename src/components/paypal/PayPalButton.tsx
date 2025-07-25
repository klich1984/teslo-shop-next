'use client'

import React from 'react'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js'
import { setTransactionId } from '@/actions'

interface PayPalButtonProps {
  orderId: string
  amount: number
}

export const PayPalButton = ({ amount, orderId }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100)) / 100

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-11 bg-gray-300 rounded'></div>
        <div className='h-11 bg-gray-300 rounded mt-2'></div>
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD'
          }
        }
      ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }

    console.log('👽 TransactionId', {transactionId})

    return transactionId
  }
  return <PayPalButtons createOrder={createOrder} />
}
