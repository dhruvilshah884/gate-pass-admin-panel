'use client'

import { Home, Clock, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SecurityBottomNavProps {
  onNavigate: (screen: string) => void
  activeTab: string
}

export function SecurityBottomNav({ onNavigate, activeTab }: SecurityBottomNavProps) {
  return (
    <div className='flex items-center justify-around border-t border-gray-200 white:border-gray-800 bg-white white:bg-gray-800 py-2'>
      <Button
        variant={activeTab === 'securityHome' ? 'default' : 'ghost'}
        size='icon'
        className='flex flex-col items-center h-14 w-14'
        onClick={() => onNavigate('securityHome')}
      >
        <Home className='h-5 w-5' />
        <span className='text-xs mt-1'>Home</span>
      </Button>

      <Button
        variant={activeTab === 'pastVisitors' ? 'default' : 'ghost'}
        size='icon'
        className='flex flex-col items-center h-14 w-14'
        onClick={() => onNavigate('pastVisitors')}
      >
        <Clock className='h-5 w-5' />
        <span className='text-xs mt-1'>Visitors</span>
      </Button>

      <Button
        variant={activeTab === 'settings' ? 'default' : 'ghost'}
        size='icon'
        className='flex flex-col items-center h-14 w-14'
        onClick={() => onNavigate('settings')}
      >
        <Settings className='h-5 w-5' />
        <span className='text-xs mt-1'>Settings</span>
      </Button>
    </div>
  )
}
