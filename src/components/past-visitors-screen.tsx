'use client'

import { ResidentBottomNav } from '@/components/resident-bottom-nav'
import { SecurityBottomNav } from '@/components/security-bottom-nav'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PastVisitorsScreenProps {
  onNavigate: (screen: string) => void
  userType: 'residance' | 'security' | null
}

export function PastVisitorsScreen({ onNavigate, userType }: PastVisitorsScreenProps) {
  const goBack = () => {
    if (userType === 'residance') {
      onNavigate('residentHome')
    } else if (userType === 'security') {
      onNavigate('securityHome')
    }
  }

  return (
    <div className='flex flex-col h-full bg-gray-50 white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800 flex items-center'>
        <Button variant='ghost' size='icon' onClick={goBack}>
          <ChevronLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-lg font-bold ml-2'>Past Visitors</h1>
      </div>

      <div className='p-4 border-b border-gray-200 white:border-gray-800'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 white:text-gray-400' />
          <Input type='search' placeholder='Search visitors...' className='w-full pl-9' />
        </div>
      </div>

      <div className='flex-1 overflow-auto p-4'>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div
              key={item}
              className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700'
            >
              <div className='flex justify-between items-start mb-1'>
                <h3 className='font-medium'>Sarah Johnson</h3>
                <span className='text-xs text-gray-500 white:text-gray-400'>Mar 20, 2025</span>
              </div>
              <p className='text-sm text-gray-500 white:text-gray-400 mb-2'>Visited: 2:30 PM - 4:45 PM</p>
              <div className='flex justify-between items-center'>
                <span className='text-xs bg-green-100 text-green-800 white:bg-green-900 white:text-green-100 px-2 py-0.5 rounded-full'>
                  Completed
                </span>
                <Button variant='ghost' size='sm'>
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {userType === 'residance' ? (
        <ResidentBottomNav onNavigate={onNavigate} activeTab='pastVisitors' />
      ) : (
        <SecurityBottomNav onNavigate={onNavigate} activeTab='pastVisitors' />
      )}
    </div>
  )
}
