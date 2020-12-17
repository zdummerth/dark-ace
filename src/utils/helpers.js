//Price must be an object containing fields: currencyCode and amount
export const formatPrice = price => (
    Intl.NumberFormat(undefined, {
        currency: price.currencyCode,
        minimumFractionDigits: 2,
        style: 'currency',
      }).format(price.amount)
)