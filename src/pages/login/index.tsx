'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { adminLogin } from '@/api-handler/auth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token') 
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await adminLogin({ email, password })

      if (response.success) {
        console.log(response.data.token.token)
        localStorage.setItem('token', response.data.token.token)
        toast.success('Logged in successfully')
        router.push('/dashboard')
      } else {
        throw new Error(response.message || 'Invalid credentials')
      }
    } catch (error:any) {
      toast.error(error.message || 'Invalid email or password')
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
                <Input
                  id='email'
                  type='email'
                  placeholder='admin@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full mt-6 bg-black text-white' type='submit' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
