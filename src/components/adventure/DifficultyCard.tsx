import { DifficultySetting } from '@/models'

export interface DifficultyCardProps {
  difficulty: DifficultySetting
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function DifficultyCard(props: DifficultyCardProps) {

  const difficulty = props.difficulty
  const borderColor = props.selected ? 'border-amber-500' : 'border-neutral-500'
  const hoverColor = props.selected ? 'hover:bg-amber-900' : 'hover:bg-neutral-800'

  return (
    <div className={`border-2 ${borderColor} p-2`}>
      <button className={`w-full h-full ${hoverColor}`}
              disabled={props.disabled}
              onClick={() => props.onClick && props.onClick()}>
        <div className={'flex flex-col w-full'}>
          <div className={'text-2xl font-bold'}>{difficulty.name}</div>
          <div className={'text-2xl'}>{difficulty.description}</div>
          <div className={'py-2'}/>
          <div>
            <span className={'font-bold'}>Experience Modifier: </span>{formatModifier(difficulty.experienceModifier)}%
          </div>
          <div>
            <span className={'font-bold'}>Gold Modifier: </span>{formatModifier(difficulty.goldModifier)}%
          </div>
          <div>
            <span className={'font-bold'}>Loot Modifier: </span>{formatModifier(difficulty.lootModifier)}%
          </div>
          <div className={'py-2'}></div>
          <div>
            <span
              className={'font-bold'}>Time to Complete: </span>{Math.ceil(difficulty.completionSeconds / 60)} Minutes
          </div>

        </div>


      </button>
    </div>
  )
}

function formatModifier(value: number, decimalPlaces = 0): string {
  return (value * 100).toFixed(decimalPlaces)
}