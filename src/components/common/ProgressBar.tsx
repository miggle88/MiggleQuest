'use client'

import { ReactNode, useEffect, useState } from 'react'

export interface ProgressBarProps {
  percent: number
  bgColor?: string
  borderColor?: string
  fillColor?: string
  children?: ReactNode
}

export default function ProgressBar(props: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  const { percent } = props
  useEffect(() => {
    const clamped = clamp(percent, 0, 100)
    setWidth(clamped)
  }, [percent])

  const bgColor = props.bgColor ?? 'bg-neutral-950'
  const borderColor = props.borderColor ?? 'border-neutral-300'
  const fillColor = props.fillColor ?? 'bg-neutral-500'

  return (
    <div className={`relative min-h-[16px] ${bgColor} border-2 ${borderColor}`}>
      <div className={`absolute h-full ${fillColor} transition-all duration-500`}
           style={{ width: `${width}%` }}/>
      <div className={'relative w-full h-full'}>{props.children}</div>
    </div>
  )
}

function clamp(value: number, minValue: number, maxValue: number): number {
  if (value < minValue) {
    return minValue
  }
  if (value > maxValue) {
    return maxValue
  }
  return value
}
