import React, { FC, useMemo } from 'react'
import { makeQrMatrix } from '@/utils/qr'

type QRCodeProps = { value: string; title: string }

const QRCode: FC<QRCodeProps> = ({ value, title }) => {
  const matrix = useMemo(() => makeQrMatrix(value), [value])
  const quietZone = 4
  const size = matrix.length + quietZone * 2
  const path = matrix.flatMap((row, y) => row.flatMap((dark, x) =>
    dark ? [`M${x + quietZone},${y + quietZone}h1v1h-1z`] : []
  )).join('')

  return (
    <svg className="demo-qr" role="img" aria-label={title} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="#fff" />
      <path d={path} fill="#24152d" />
    </svg>
  )
}

export default QRCode
