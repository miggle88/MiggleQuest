import { DifficultySetting } from '@/models'
import DifficultyCard from '@components/adventure/DifficultyCard'

export interface DifficultySelectorProps {
  difficulties: DifficultySetting[]
  selectedDifficulty: DifficultySetting | null
  onSelected?: (difficulty: DifficultySetting) => void
}

export default function DifficultySelector(props: DifficultySelectorProps) {
  return (
    <div className={'p-2'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
        {props.difficulties.map((difficulty) => {
          return <DifficultyCard key={difficulty.id}
                                 difficulty={difficulty}
                                 selected={difficulty.id === props.selectedDifficulty?.id}
                                 onClick={() => {
                                   props.onSelected && props.onSelected(difficulty)
                                 }}/>
        })}
      </div>
    </div>
  )
}