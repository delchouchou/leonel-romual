export type DemoGuest = { code: string; name: string }

export const demoGuests: DemoGuest[] = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return { code: `DEMO-${number}`, name: `Invité test ${number}` }
})
