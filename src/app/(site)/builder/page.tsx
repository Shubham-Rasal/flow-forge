import { Builder } from '@/components/builder'
import TurboBuilder from '@/components/turbo/builder'

const BuilderPage = () => {
  return (
    <div className='h-screen w-full dark:bg-neutral-950  justify-center items-center'>
        <TurboBuilder />
      {/* <DrawerDemo /> */}
    </div>
  )
}

export default BuilderPage