'use client'

import { Home, Clock, PenToolIcon as Tool, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResidentBottomNavProps {
  onNavigate: (screen: string) => void
  activeTab: string
}

export function ResidentBottomNav({ onNavigate, activeTab }: ResidentBottomNavProps) {
  return (
    <div className='flex items-center justify-around border-t border-gray-200 white:border-gray-800 bg-white white:bg-gray-800 py-2'>
      <Button
        variant={activeTab === 'residentHome' ? 'default' : 'ghost'}
        size='icon'
        className='flex flex-col items-center h-14 w-14'
        onClick={() => onNavigate('residentHome')}
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
        variant={activeTab === 'pastMaintenance' ? 'default' : 'ghost'}
        size='icon'
        className='flex flex-col items-center h-14 w-14'
        onClick={() => onNavigate('pastMaintenance')}
      >
        <Tool className='h-5 w-5' />
        <span className='text-xs mt-1'>Maintenance</span>
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
