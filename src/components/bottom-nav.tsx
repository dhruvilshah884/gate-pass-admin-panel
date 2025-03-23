import { Home, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BottomNav() {
  return (
    <div className='flex items-center justify-around border-t border-gray-200 white:border-gray-800 bg-white white:bg-gray-800 py-2'>
      <Button variant='ghost' size='icon' className='flex flex-col items-center h-14 w-14'>
        <Home className='h-5 w-5' />
        <span className='text-xs mt-1'>Home</span>
      </Button>

      <Button variant='ghost' size='icon' className='flex flex-col items-center h-14 w-14'>
        <Search className='h-5 w-5' />
        <span className='text-xs mt-1'>Search</span>
      </Button>

      <Button variant='ghost' size='icon' className='flex flex-col items-center h-14 w-14'>
        <Bell className='h-5 w-5' />
        <span className='text-xs mt-1'>Alerts</span>
      </Button>

      <Button variant='ghost' size='icon' className='flex flex-col items-center h-14 w-14'>
        <User className='h-5 w-5' />
        <span className='text-xs mt-1'>Profile</span>
      </Button>
    </div>
  )
}
