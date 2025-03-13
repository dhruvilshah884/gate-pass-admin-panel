'use client'
import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
// import '../../styles/globals.css'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    // Here you would typically validate against your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo, hardcode check
      if (email === 'admin@example.com' && password === 'admin') {
        toast.success('Logged in successfully')
        router.push('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full px-6'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>Admin Login</h1>
          <p className='text-muted-foreground mt-2'>Enter your credentials to access the admin panel</p>
        </div>
        <Card>
          <form onSubmit={onSubmit}>
            <CardContent className='space-y-4 pt-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' placeholder='admin@example.com' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full mt-6' type='submit' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>{' '}
      </div>
    </div>
  )
}
