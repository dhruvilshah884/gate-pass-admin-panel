import React from 'react'
import { Loader2 } from 'lucide-react'

export default function ScreenLoading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
      <Loader2 className='w-10 h-10 text-black animate-spin' />
    </div>
  )
}
