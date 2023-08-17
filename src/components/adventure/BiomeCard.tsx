import { Biome } from '@/models'
import { text } from 'stream/consumers'
import Conditional from '@components/layout/Conditional'

export interface BiomeCardProps {
  biome: Biome
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function BiomeCard(props: BiomeCardProps) {
  const biome = props.biome

  const borderColor =
    props.disabled ? 'border-red-400'
      : props.selected ? 'border-amber-500' : 'border-neutral-500'

  const hoverColor =
    props.disabled ? 'hover:bg-red-950'
      : props.selected ? 'hover:bg-amber-900' : 'hover:bg-neutral-800'

  const textColor =
    props.disabled ? 'text-red-400'
      : props.selected ? 'text-amber-500' : 'text-white'

  const goldColor = props.disabled ? 'text-red-400' : 'text-yellow-300'

  const cursor = props.disabled ? 'cursor-not-allowed' : ''

  return (
    <div className={`border-2 ${borderColor}`}>
      <button className={`w-full h-full ${hoverColor} disabled:text-red-400 ${cursor} p-2`}
              disabled={props.disabled}
              onClick={() => props.onClick && props.onClick()}>
        <div className={'flex flex-col w-full'}>
          <div className={`text-2xl ${textColor} font-bold`}>{biome.name}</div>
          <div className={'text-xl'}>{biome.description}</div>
          <div className={'py-2'}/>
          <div><span className={'font-bold'}>Level Req: </span>{biome.startingLevel}+</div>
          <div className={`text-center font-bold p-2 ${goldColor}`}>Gold: {biome.baseGold}</div>
          <Conditional condition={props.disabled ?? false}>
            <div className={'py-2'}/>
            <div>You have no available heroes within the level range</div>
          </Conditional>
        </div>
      </button>
    </div>
  )
}