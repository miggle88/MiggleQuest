import Link from 'next/link'

export default function Home() {
  return (
    <div className={'w-screen h-screen flex flex-col place-content-center'}>
      <div className={'text-6xl text-center'}>Welcome to Miggle Quest!</div>
      <div className={'p-2'}/>
      <div className={'text-4xl text-center hover:underline'}>
        <Link href={'/town'}>
          Click here to play now!
        </Link>
      </div>
    </div>
  )
}