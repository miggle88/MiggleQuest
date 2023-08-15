import { HeroCharacter, HeroClass } from '@/models'

export interface HeroListItemProps {
  hero: HeroCharacter
  onClick?: () => void
}

export default function HeroListItem(props: HeroListItemProps) {
  const hero = props.hero
  const borderColor = getHeroClassBorder(hero.class)

  return (
    <div className={`w-[160px] md:w-[240px] lg:w-[360px] bg-gray-700 border-2 ${borderColor}`}>
      <button className={'w-full h-full'} onClick={() => props.onClick && props.onClick()}>
        <div className={'flex flex-row text-left p-2'}>
          <div className={'flex flex-col grow'}>
            <div className={'text-xl font-bold'}>{hero.characterName}</div>
            <div>
              <span>{hero.level} </span><span>{formatHeroClass(hero.class)}</span>
            </div>
          </div>
          <div className={'text-right'}>HP: {hero.hitPoints}</div>
        </div>
      </button>
    </div>
  )
}

const getHeroClassBorder = (heroClass: HeroClass) => {
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