import DestinationLayout from '@components/layout/DestinationLayout'

export default function Town() {
  
  return (
    <DestinationLayout title={'Town'} previousHref={'/town'}>
      <div className={'text-3xl text-center p-16'}>You are in town, do some stuff here</div>
    </DestinationLayout>
  )
}