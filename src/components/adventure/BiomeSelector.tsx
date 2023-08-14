import { Biome } from '@/models'
import BiomeCard from '@components/adventure/BiomeCard'

export interface BiomeSelectorProps {
  biomes: Biome[]
  onSelected?: (biome: Biome) => void
}

export default function BiomeSelector(props: BiomeSelectorProps) {
  return (
    <div className={'border-2 border-neutral-500 p-2'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'}>
        {props.biomes.map((biome) => {
          return <BiomeCard key={biome.id} biome={biome} onClick={() => {
            props.onSelected && props.onSelected(biome)
          }}/>
        })}

      </div>
    </div>

  )
}
