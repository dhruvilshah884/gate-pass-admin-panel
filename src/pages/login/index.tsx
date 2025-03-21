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
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await adminLogin({ email, password })
      if (response.success) {
        localStorage.setItem('token', response.data.token)
        toast.success('Logged in successfully')
        router.push('/dashboard')
      } else {
        throw new Error(response.message || 'Invalid credentials')
      }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full px-6'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>Admin Login</h1>
          <p className='text-muted-foreground mt-2'>Enter your credentials to access the admin panel</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4 pt-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='admin@example.com'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className='w-full max-w-sm bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center gap-3 mt-4 shadow-md'>
                  <svg
                    className='w-5 h-5 text-red-600'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v2m0 4h.01M10.29 3.86a1 1 0 011.42 0l7.29 7.29a1 1 0 010 1.42l-7.29 7.29a1 1 0 01-1.42 0L3.86 12.57a1 1 0 010-1.42l7.29-7.29z'
                    ></path>
                  </svg>
                  <span className='text-sm font-medium'>{error}</span>
                </div>
              )}
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
