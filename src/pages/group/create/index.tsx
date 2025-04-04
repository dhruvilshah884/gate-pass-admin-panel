'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

// Mock data - replace with actual API calls
const mockFlats = [
  { _id: '1', name: 'Building A' },
  { _id: '2', name: 'Building B' },
  { _id: '3', name: 'Building C' }
]

export default function CreateGroupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [flats, setFlats] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    flat: '',
    type: 'RESIDANCE'
  })

  useEffect(() => {
    // Replace with actual API call
    const fetchFlats = async () => {
      try {
        // const response = await fetch('/api/flats')
        // const data = await response.json()
        // setFlats(data)
        setFlats(mockFlats as any)
      } catch (error) {
        console.error('Error fetching flats:', error)
        toast({
          title: 'Error',
          description: 'Failed to load buildings. Please try again.',
          variant: 'destructive'
        })
      }
    }

    fetchFlats()
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: any, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Replace with actual API call
      // const response = await fetch('/api/groups', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // if (!response.ok) throw new Error('Failed to create group')

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: 'Success',
        description: 'Group created successfully!'
      })

      router.push('/groups')
    } catch (error) {
      console.error('Error creating group:', error)
      toast({
        title: 'Error',
        description: 'Failed to create group. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Create New Group</CardTitle>
          <CardDescription>Create a new chat group for residents or security personnel</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Group Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter group name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='flat'>Building</Label>
              <Select value={formData.flat} onValueChange={value => handleSelectChange('flat', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder='Select a building' />
                </SelectTrigger>
                <SelectContent>
                  {flats.map((flat: any) => (
                    <SelectItem key={flat._id} value={flat._id}>
                      {flat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Group Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={value => handleSelectChange('type', value)}
                className='flex flex-col space-y-1'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='RESIDANCE' id='residance' />
                  <Label htmlFor='residance' className='font-normal'>
                    Residents Only
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='RESIDANCE-SECURITY' id='residance-security' />
                  <Label htmlFor='residance-security' className='font-normal'>
                    Residents & Security
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Creating...' : 'Create Group'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
