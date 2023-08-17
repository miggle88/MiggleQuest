type ConsiderMessage = {
  message: string
  color: string
}

export interface ConsiderTextProps {
  successChance: number
}

export default function ConsiderText(props: ConsiderTextProps) {
  const { successChance } = props

  const getMessage = (): ConsiderMessage => {
    if (successChance >= 90) {
      return { message: 'This will be effortless', color: 'border-gray-300' }
    }
    if (successChance >= 80) {
      return { message: 'This will pose a small challenge', color: 'border-green-400' }
    }
    if (successChance >= 60) {
      return { message: 'Looks risky, but you might win', color: 'border-blue-400' }
    }
    if (successChance >= 40) {
      return { message: 'An even challenge!', color: 'border-yellow-400' }
    }
    if (successChance >= 20) {
      return { message: 'This will wipe the floor with you!', color: 'border-orange-400' }
    }
    return { message: 'You will surely die!', color: 'border-red-400' }
  }

  const message = getMessage()

  return (
    <div className={`min-w-sm max-w-lg border-2 ${message.color} rounded px-6 py-2`}>
      <div className={'text-center text-xl font-bold'}><span>{message.message}</span></div>
    </div>
  )
}
