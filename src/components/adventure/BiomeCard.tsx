import { Biome } from '@/models'

export interface BiomeCardProps {
  biome: Biome
  disabled?: boolean
  onClick?: () => void
}

export default function BiomeCard(props: BiomeCardProps) {
  const biome = props.biome
  return (
    <div className={'border-2 border-neutral-500'}>
      <button className={'w-full h-full'}
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