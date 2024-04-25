const DISTANCE_FORMATTER = new Intl.NumberFormat('sv-SE', {
  style: 'unit',
  unit: 'kilometer',
})

export function distanceFormatter(meters: number) {
  return DISTANCE_FORMATTER.format(meters / 1000)
}
