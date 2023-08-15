import { HeroCharacter, HeroClass } from '@/models'
import Conditional from '@components/layout/Conditional'

export interface PartySlotProps {
  selectedHero: HeroCharacter | null
  onHeroRequested?: () => void
  onHeroRemoved?: () => void
}

export default function PartySlot(props: PartySlotProps) {
  const borderColor = getHeroClassBorder(props.selectedHero?.class)

  return (
    <div className={'flex flex-col'}>
      <div className={`min-h-[200px] border-2 ${borderColor} rounded`}>
        <div className={'h-full flex flex-col'}>
          <Conditional condition={!props.selectedHero}>
            <div className={'text-center text-gray-500'}>Click to add</div>
            <button className={'h-full peer bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700'}
                    onClick={() => props.onHeroRequested && props.onHeroRequested()}>
              <div className={'text-6xl font-bold'}>+</div>
            </button>
          </Conditional>
          <Conditional condition={!!props.selectedHero}>
            <div className={'text-gray-500 text-center'}>Click to remove</div>
            <button className={'h-full bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700'}
                    onClick={() => props.onHeroRemoved && props.onHeroRemoved()}>
              <div className={'h-full flex flex-col p-2'}>
                <div className={'text-2xl text-center font-bold'}>{props.selectedHero?.characterName}</div>
                <div>{props.selectedHero?.hitPoints} HP</div>
                <div className={'min-h-[48px] grow'}></div>
                <div className={'flex flex-row px-2'}>
                  <div
                    className={'grow text-left place-self-end'}>
                    <span className={'font-bold'}>Class: </span>
                    {props.selectedHero ? formatHeroClass(props.selectedHero.class) : ''}</div>
                  <div className={'text-right'}>
                    <span className={'font-bold'}>Level </span>
                    <div className={'text-center'}>{props.selectedHero?.level}</div>
                  </div>
                </div>
              </div>
            </button>
          </Conditional>
        </div>
      </div>
    </div>
  )
}

const getHeroClassBorder = (heroClass?: HeroClass) => {
  switch (heroClass as string) {
    case HeroClass.Fighter:
      return 'border-red-500'
    case HeroClass.Rogue:
      return 'border-sky-500'
    case HeroClass.Cleric:
      return 'border-green-600'
    case HeroClass.Wizard:
      return 'border-amber-500'
    default:
      return 'border-neutral-300'
  }
}

function formatHeroClass(heroClass: HeroClass): string {
  return heroClass[0].toUpperCase() + heroClass.slice(1).toLowerCase()
}