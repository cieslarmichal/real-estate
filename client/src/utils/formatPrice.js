export function formatPricePln(value) {
  const formattedValue = value.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedValue;
}
