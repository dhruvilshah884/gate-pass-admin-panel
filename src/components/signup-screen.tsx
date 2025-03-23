'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft } from 'lucide-react'

interface SignupScreenProps {
  onBack: () => void
}

export function SignupScreen({ onBack }: SignupScreenProps) {
  return (
    <div className='flex flex-col h-full bg-white white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800 flex items-center'>
        <Button variant='ghost' size='icon' onClick={onBack}>
          <ChevronLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-lg font-bold ml-2'>Create Account</h1>
      </div>

      <div className='flex-1 overflow-auto p-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input id='fullName' placeholder='John Doe' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='your@email.com' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input id='phone' type='tel' placeholder='+1 (555) 000-0000' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='userType'>User Type</Label>
            <Select defaultValue='resident'>
              <SelectTrigger id='userType'>
                <SelectValue placeholder='Select user type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='resident'>Resident</SelectItem>
                <SelectItem value='security'>Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' placeholder='••••••••' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input id='confirmPassword' type='password' placeholder='••••••••' />
          </div>

          <Button className='w-full mt-4'>Create Account</Button>
        </div>
      </div>
    </div>
  )
}
