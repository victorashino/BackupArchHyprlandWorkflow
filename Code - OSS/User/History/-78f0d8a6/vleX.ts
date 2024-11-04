export default function formatedPrice(value: string | undefined) {
    if (value) {
      const number = parseFloat(value.replace(/[^\d]/g, ''))
  
      const numberFormat = (value: any) =>
        new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL',
          unitDisplay: 'narrow',
        }).format(value)
  
      if (isNaN(number)) {
        console.error('Formato inválido')
        return
      }
  
      const lastTwoDigits = number % 100
  
      const result = Math.floor(number / 100) + lastTwoDigits / 100
  
      return numberFormat(result.toFixed(2)).replace(/[R$\s]+/g, '')
    }
  }
  
  export const formatAccount = (input: string) => {
    return input.replace(/(\d{7})(\d)/, '$1-$2')
  }
  
  export const handleNumberChange = (value: string) => {
    const cleanedValue = value.replace(/[ˆ0-9]/g, '')
    const number = parseFloat(cleanedValue)
    if (isNaN(number)) {
      return ''
    } else {
      return number
    }
  }
  