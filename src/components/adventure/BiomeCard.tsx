import { Biome } from '@/models'

export interface BiomeCardProps {
  biome: Biome
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function BiomeCard(props: BiomeCardProps) {
  const biome = props.biome
  const borderColor = props.selected ? 'border-amber-500' : 'border-neutral-500'
  const hoverColor = props.selected ? 'hover:bg-amber-900' : 'hover:bg-neutral-800'

  return (
    <div className={`border-2 ${borderColor}`}>
      <button className={`w-full h-full ${hoverColor}`}
              disabled={props.disabled} onClick={() => {
        props.onClick && props.onClick()
      }}>
        <div className={'flex flex-col w-full'}>
          <div className={'text-2xl font-bold'}>{biome.name}</div>
          <div className={'text-xl'}>{biome.description}</div>
          <div><span className={'text-bold'}>Level Req: </span>{biome.startingLevel}</div>
        </div>
      </button>
    </div>
  )
}