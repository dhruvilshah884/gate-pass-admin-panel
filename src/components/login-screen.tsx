'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

interface LoginScreenProps {
  onLogin: (userType: 'residance' | 'security', email: string, password: string) => void
  onSignup: () => void
}

export function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [userType, setUserType] = useState<'residance' | 'security'>('residance')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='flex flex-col h-full bg-white white:bg-gray-900'>
      <div className='flex-1 flex flex-col justify-center px-6'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold mb-2'>Welcome Back</h1>
          <p className='text-gray-500 white:text-gray-400'>Sign in to continue</p>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='userType'>User Type</Label>
            <Select value={userType} onValueChange={value => setUserType(value as 'residance' | 'security')}>
              <SelectTrigger id='userType'>
                <SelectValue placeholder='Select user type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='residance'>Resident</SelectItem>
                <SelectItem value='security'>Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='your@email.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='••••••••'
            />
          </div>

          <Button className='w-full' onClick={() => onLogin(userType, email, password)}>
            Sign In
          </Button>
        </div>

        <div className='mt-6 text-center'>
          <a href='#' className='text-sm text-primary hover:underline'>
            Forgot password?
          </a>
        </div>
      </div>

      <div className='p-6 text-center border-t border-gray-200 white:border-gray-800'>
        <p className='text-sm text-gray-500 white:text-gray-400'>
          Don't have an account?{' '}
          <Button variant='link' className='p-0 h-auto' onClick={onSignup}>
            Sign up
          </Button>
        </p>
      </div>
    </div>
  )
}
