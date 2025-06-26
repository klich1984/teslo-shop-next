// COP
// export const currencyFormat = (value: number) => {
//   return new Intl.NumberFormat('es-CL', {
//     style: 'currency',
//     currency: 'CLP',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(value)
// }

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
