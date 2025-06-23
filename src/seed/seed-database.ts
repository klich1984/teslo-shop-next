import { initialData } from './seed'

const main = async () => {
  console.log('👽 initialDatabase', initialData)

  console.log('👽 Seed ejecutandose correctamente')
}

;(() => {
  // No debe ejecutarse en producción
  if (process.env.NODE_ENV === 'production') return

  main()
})()
