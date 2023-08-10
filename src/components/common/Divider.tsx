export type DividerProps = {}


export default function Divider(props: DividerProps) {
  return <div className={'flex flex-col'}>
    <div className={'pt-2'}/>
    <div className={'h-[2px] bg-indigo-400'}/>
    <div className={'pb-2'}/>
  </div>
}