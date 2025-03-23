'use client'

import { ResidentBottomNav } from '@/components/resident-bottom-nav'
import { SecurityBottomNav } from '@/components/security-bottom-nav'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
  userType: 'residance' | 'security' | null
}

export function SettingsScreen({ onNavigate, userType }: SettingsScreenProps) {
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
        <h1 className='text-lg font-bold ml-2'>Settings</h1>
      </div>

      <div className='flex-1 overflow-auto'>
        <div className='p-4 border-b border-gray-200 white:border-gray-800'>
          <h2 className='text-sm font-medium text-gray-500 white:text-gray-400 mb-2'>Account</h2>
          <div className='space-y-1'>
            <Button variant='ghost' className='w-full justify-between'>
              Profile
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button variant='ghost' className='w-full justify-between'>
              Security
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button variant='ghost' className='w-full justify-between'>
              Notifications
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='p-4 border-b border-gray-200 white:border-gray-800'>
          <h2 className='text-sm font-medium text-gray-500 white:text-gray-400 mb-2'>Preferences</h2>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>white Mode</span>
              <Switch />
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Email Alerts</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className='p-4'>
          <h2 className='text-sm font-medium text-gray-500 white:text-gray-400 mb-2'>About</h2>
          <div className='space-y-1'>
            <Button variant='ghost' className='w-full justify-between'>
              Terms of Service
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button variant='ghost' className='w-full justify-between'>
              Privacy Policy
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button variant='ghost' className='w-full justify-between'>
              Help & Support
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {userType === 'residance' ? (
        <ResidentBottomNav onNavigate={onNavigate} activeTab='settings' />
      ) : (
        <SecurityBottomNav onNavigate={onNavigate} activeTab='settings' />
      )}
    </div>
  )
}
