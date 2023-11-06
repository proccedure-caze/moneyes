export function formatBRL(amount: number) {
  const value = amount / 100;
  const [integerPart, decimalPart] = value.toFixed(2).split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  return `R$ ${formattedIntegerPart},${decimalPart}`;
}
