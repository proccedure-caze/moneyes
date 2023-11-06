export function darkenColor(color: string, amount = 0.3) {
  const matches = color.match(/\w\w/g);
  if (!matches) return color;

  const [r, g, b] = matches.map((c) => parseInt(c, 16));

  return `#${(0 | ((1 << 8) + r * (1 - amount))).toString(16).slice(1)}${(
    0 |
    ((1 << 8) + g * (1 - amount))
  )
    .toString(16)
    .slice(1)}${(0 | ((1 << 8) + b * (1 - amount))).toString(16).slice(1)}`;
}
