import { Builder } from '@/components/builder'
import { DrawerDemo } from '@/components/drawer-demo'
import React from 'react'

const BuilderPage = () => {
  return (
    <div className='h-screen w-full dark:bg-slate-900 justify-center items-center'>
        <Builder />
      {/* <DrawerDemo /> */}
    </div>
  )
}

export default BuilderPage