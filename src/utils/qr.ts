const VERSION = 5
const SIZE = 17 + 4 * VERSION
const DATA_CODEWORDS = 108
const ECC_CODEWORDS = 26

const multiply = (x: number, y: number): number => {
  let result = 0
  let a = x
  let b = y
  while (b > 0) {
    if (b & 1) result ^= a
    a <<= 1
    if (a & 0x100) a ^= 0x11d
    b >>>= 1
  }
  return result
}

const remainder = (data: number[]): number[] => {
  let generator = [1]
  let root = 1
  for (let i = 0; i < ECC_CODEWORDS; i += 1) {
    const next = new Array(generator.length + 1).fill(0)
    for (let j = 0; j < generator.length; j += 1) {
      next[j] ^= generator[j]
      next[j + 1] ^= multiply(generator[j], root)
    }
    generator = next
    root = multiply(root, 2)
  }

  const work = [...data, ...new Array(ECC_CODEWORDS).fill(0)]
  for (let i = 0; i < data.length; i += 1) {
    const factor = work[i]
    for (let j = 0; j < generator.length; j += 1) work[i + j] ^= multiply(generator[j], factor)
  }
  return work.slice(data.length)
}

const bitsOf = (value: number, length: number): number[] =>
  Array.from({ length }, (_, index) => (value >>> (length - index - 1)) & 1)

const formatBits = (mask: number): number => {
  const data = (1 << 3) | mask // Error correction level L, followed by mask number.
  let value = data << 10
  for (let bit = 14; bit >= 10; bit -= 1) {
    if (((value >>> bit) & 1) !== 0) value ^= 0x537 << (bit - 10)
  }
  return ((data << 10) | value) ^ 0x5412
}

export const makeQrMatrix = (text: string): boolean[][] => {
  const bytes = Array.from(new TextEncoder().encode(text))
  if (bytes.length > 106) throw new Error('QR data exceeds the demo encoder capacity.')

  const bits = [...bitsOf(0b0100, 4), ...bitsOf(bytes.length, 8)]
  bytes.forEach((byte) => bits.push(...bitsOf(byte, 8)))
  bits.push(...new Array(Math.min(4, DATA_CODEWORDS * 8 - bits.length)).fill(0))
  while (bits.length % 8 !== 0) bits.push(0)

  const data: number[] = []
  for (let i = 0; i < bits.length; i += 8) {
    data.push(bits.slice(i, i + 8).reduce((value, bit) => (value << 1) | bit, 0))
  }
  for (let pad = 0; data.length < DATA_CODEWORDS; pad += 1) data.push(pad % 2 === 0 ? 0xec : 0x11)
  const codewords = [...data, ...remainder(data)]
  const stream = codewords.flatMap((byte) => bitsOf(byte, 8))

  const matrix = Array.from({ length: SIZE }, () => new Array<boolean>(SIZE).fill(false))
  const functionModules = Array.from({ length: SIZE }, () => new Array<boolean>(SIZE).fill(false))
  const setFunction = (x: number, y: number, dark: boolean): void => {
    if (x >= 0 && y >= 0 && x < SIZE && y < SIZE) {
      matrix[y][x] = dark
      functionModules[y][x] = true
    }
  }

  const finder = (left: number, top: number): void => {
    for (let dy = -1; dy <= 7; dy += 1) {
      for (let dx = -1; dx <= 7; dx += 1) {
        const distance = Math.max(Math.abs(dx - 3), Math.abs(dy - 3))
        setFunction(left + dx, top + dy, dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6 && (distance === 3 || distance <= 1))
      }
    }
  }
  finder(0, 0)
  finder(SIZE - 7, 0)
  finder(0, SIZE - 7)

  for (let i = 8; i < SIZE - 8; i += 1) {
    setFunction(6, i, i % 2 === 0)
    setFunction(i, 6, i % 2 === 0)
  }

  const alignmentCenter = 30
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      setFunction(alignmentCenter + dx, alignmentCenter + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1)
    }
  }

  // Reserve format-information modules before placing the payload.
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, false)
  setFunction(8, 7, false)
  setFunction(8, 8, false)
  setFunction(7, 8, false)
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, false)
  for (let i = 0; i < 8; i += 1) setFunction(SIZE - 1 - i, 8, false)
  for (let i = 8; i < 15; i += 1) setFunction(8, SIZE - 15 + i, false)
  setFunction(8, SIZE - 8, true)

  let bitIndex = 0
  let upward = true
  for (let right = SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let offset = 0; offset < SIZE; offset += 1) {
      const y = upward ? SIZE - 1 - offset : offset
      for (let side = 0; side < 2; side += 1) {
        const x = right - side
        if (!functionModules[y][x]) {
          const raw = bitIndex < stream.length ? stream[bitIndex++] === 1 : false
          matrix[y][x] = raw !== ((x + y) % 2 === 0) // Mask pattern 0.
        }
      }
    }
    upward = !upward
  }

  const format = formatBits(0)
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, ((format >>> i) & 1) !== 0)
  setFunction(8, 7, ((format >>> 6) & 1) !== 0)
  setFunction(8, 8, ((format >>> 7) & 1) !== 0)
  setFunction(7, 8, ((format >>> 8) & 1) !== 0)
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, ((format >>> i) & 1) !== 0)
  for (let i = 0; i < 8; i += 1) setFunction(SIZE - 1 - i, 8, ((format >>> i) & 1) !== 0)
  for (let i = 8; i < 15; i += 1) setFunction(8, SIZE - 15 + i, ((format >>> i) & 1) !== 0)
  setFunction(8, SIZE - 8, true)

  return matrix
}
