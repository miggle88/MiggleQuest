import Divider from '@/components/common/Divider'
import { useRouter } from 'next/navigation'

export type DestinationButton = {
  title: string
  href?: string
  description?: string
  icon?: string
  disabled?: boolean
  onClick?: () => void
}

const NORMAL_STYLE = 'text-xl bg-indigo-700 bg-opacity-90 text-indigo-200 border-indigo-400 border-2 rounded-md min-w-[200px] min-h-[200px]'
const HOVER_STYLE = 'hover:bg-indigo-950'
const ACTIVE_STYLE = 'active:bg-indigo-900'
const DISABLED_STYLE = 'disabled:bg-gray-700'

export default function DestinationButton(props: DestinationButton) {
  const router = useRouter()
  const handleClick = () => {
    if (!props.onClick && props.href) {
      return router.push(props.href)
    }
    props.onClick && props.onClick()
  }

  return (
    <button
      className={`${NORMAL_STYLE} ${HOVER_STYLE} ${ACTIVE_STYLE} ${DISABLED_STYLE}`}
      disabled={props.disabled ?? false} onClick={() => handleClick()}>
      <div className={'flex flex-col'}>
        <div>{props.icon}</div>
        <div>{props.title}</div>
        <Divider/>
        <div>{props.description}</div>
      </div>
    </button>
  )
}