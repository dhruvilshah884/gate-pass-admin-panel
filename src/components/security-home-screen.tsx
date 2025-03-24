'use client'

import { SecurityBottomNav } from '@/components/security-bottom-nav'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

interface SecurityHomeScreenProps {
  onNavigate: (screen: string) => void
}

export function SecurityHomeScreen({ onNavigate }: SecurityHomeScreenProps) {
  return (
    <div className='flex flex-col h-full bg-gray-50 white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800 flex justify-between items-center'>
        <h1 className='text-lg font-bold'>Security Dashboard</h1>
        <Button size='sm' onClick={() => onNavigate('createVisitor')} className='flex items-center'>
          <PlusCircle className='h-4 w-4 mr-1' />
          New Visitor
        </Button>
      </div>

      <div className='flex-1 overflow-auto p-4'>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700 flex flex-col items-center justify-center'>
            <div className='text-3xl font-bold text-primary'>5</div>
            <div className='text-sm text-gray-500 white:text-gray-400'>Expected Visitors</div>
          </div>
          <div className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700 flex flex-col items-center justify-center'>
            <div className='text-3xl font-bold text-primary'>12</div>
            <div className='text-sm text-gray-500 white:text-gray-400'>Visitors Today</div>
          </div>
        </div>

        <h2 className='text-md font-semibold mb-3'>Today&apos;s Visitors</h2>
        <div className='space-y-4'>
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700'
            >
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-medium'>John Smith</h3>
                  <p className='text-sm text-gray-500 white:text-gray-400'>Visiting: Apartment 302</p>
                  <p className='text-xs text-gray-500 white:text-gray-400 mt-1'>Expected: 4:30 PM</p>
                </div>
                <Button variant='outline' size='sm'>
                  Check In
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SecurityBottomNav onNavigate={onNavigate} activeTab='securityHome' />
    </div>
  )
}
