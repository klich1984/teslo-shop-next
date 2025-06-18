import type { Size } from '@/interfaces'
import clsx from 'clsx'

interface SizeSelectorProps {
  selectedSize: Size
  availableSizes: Size[]
}

export const SizeSelector = ({ availableSizes, selectedSize }: SizeSelectorProps) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 hover:underline text-lg cursor-pointer', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
