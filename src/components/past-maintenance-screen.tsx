'use client'

import { ResidentBottomNav } from '@/components/resident-bottom-nav'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PastMaintenanceScreenProps {
  onNavigate: (screen: string) => void
}

export function PastMaintenanceScreen({ onNavigate }: PastMaintenanceScreenProps) {
  return (
    <div className='flex flex-col h-full bg-gray-50 white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800 flex items-center'>
        <Button variant='ghost' size='icon' onClick={() => onNavigate('residentHome')}>
          <ChevronLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-lg font-bold ml-2'>Maintenance Requests</h1>
      </div>

      <div className='p-4 border-b border-gray-200 white:border-gray-800'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 white:text-gray-400' />
          <Input type='search' placeholder='Search requests...' className='w-full pl-9' />
        </div>
      </div>

      <div className='flex-1 overflow-auto p-4'>
        <div className='space-y-4'>
          {[1, 2, 3, 4].map(item => (
            <div
              key={item}
              className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700'
            >
              <div className='flex justify-between items-start mb-1'>
                <h3 className='font-medium'>Plumbing Issue</h3>
                <span className='text-xs text-gray-500 white:text-gray-400'>Mar 18, 2025</span>
              </div>
              <p className='text-sm text-gray-500 white:text-gray-400 mb-2'>
                Bathroom sink is leaking water onto the floor.
              </p>
              <div className='flex justify-between items-center'>
                {item === 1 ? (
                  <span className='text-xs bg-yellow-100 text-yellow-800 white:bg-yellow-900 white:text-yellow-100 px-2 py-0.5 rounded-full'>
                    In Progress
                  </span>
                ) : item === 2 ? (
                  <span className='text-xs bg-green-100 text-green-800 white:bg-green-900 white:text-green-100 px-2 py-0.5 rounded-full'>
                    Completed
                  </span>
                ) : (
                  <span className='text-xs bg-blue-100 text-blue-800 white:bg-blue-900 white:text-blue-100 px-2 py-0.5 rounded-full'>
                    Scheduled
                  </span>
                )}
                <Button variant='ghost' size='sm'>
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResidentBottomNav onNavigate={onNavigate} activeTab='pastMaintenance' />
    </div>
  )
}
