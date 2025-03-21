'use client'
import { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import {
  School,
  LogOut,
  Home,
  Shield,
  UserCheck,
  TvMinimal,
  HomeIcon,
  IndianRupee,
  WifiIcon,
  Megaphone,
  MegaphoneIcon,
  MegaphoneOff,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Wifi from '@/pages/wifi'
import Complaint from '@/pages/api/complaint'
interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [])
  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div className='hidden md:flex flex-1 overflow-hidden'>
        <aside className='w-64 bg-white text-black overflow-y-auto p-6 shadow-lg border-r border-gray-300'>
          <div className='flex flex-col items-center mb-8'>
            <h1 className='text-2xl font-bold text-center text-gray-800'>Gate Pass Admin</h1>
          </div>
          <nav className='space-y-3'>
            <Link
              href='/dashboard'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-blue-500 hover:text-white transition-all'
            >
              <TvMinimal className='h-5 w-5' />
              <span className='font-semibold'>Dashboard</span>
            </Link>
            <Link
              href='/residency'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-purple-500 hover:text-white transition-all'
            >
              <School className='h-5 w-5' />
              <span className='font-semibold'>Residency</span>
            </Link>

            <Link
              href='/flat'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-green-500 hover:text-white transition-all'
            >
              <Home className='h-5 w-5' />
              <span className='font-semibold'>Flat</span>
            </Link>
            <Link
              href='/maintenance'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-orange-500 hover:text-white transition-all'
            >
              <IndianRupee className='h-5 w-5' />
              <span className='font-semibold'>Maintenance</span>
            </Link>
            <Link
              href='/security'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-blue-500 hover:text-white transition-all'
            >
              <Shield className='h-5 w-5' />
              <span className='font-semibold'>Security</span>
            </Link>
            <Link
              href='/visitors'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-green-500 hover:text-white transition-all'
            >
              <UserCheck className='h-5 w-5' />
              <span className='font-semibold'>Visitors</span>
            </Link>

            <Link
              href='/place'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-orange-500 hover:text-white transition-all'
            >
              <MapPin className='h-5 w-5' />
              <span className='font-semibold'>Nearest Place</span>
            </Link>
            <Link
              href='/complaint'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-blue-500 hover:text-white transition-all'
            >
              <Megaphone className='h-5 w-5' />
              <span className='font-semibold'>Complaint</span>
            </Link>
            <Link
              href='/wifi'
              className='flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-black hover:bg-green-500 hover:text-white transition-all'
            >
              <WifiIcon className='h-5 w-5' />
              <span className='font-semibold'>Wifi</span>
            </Link>

            <Button
              variant='ghost'
              className='flex items-center justify-start text-red-500 w-full mt-6 hover:bg-red-100 transition-colors px-3 py-2 rounded-lg'
              onClick={() => {
                localStorage.removeItem('token')
                router.push('/login')
              }}
            >
              <LogOut className='h-5 w-5 mr-2' />
              Logout
            </Button>
          </nav>
        </aside>
        <main className='flex-1 overflow-y-auto  bg-white shadow-md'>
          <div className='w-full p-6 mx-auto'>{children}</div>
        </main>
      </div>
    </div>
  )
}
