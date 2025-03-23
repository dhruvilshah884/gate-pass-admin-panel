'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft } from 'lucide-react'

interface CreateVisitorScreenProps {
  onNavigate: (screen: string) => void
}

export function CreateVisitorScreen({ onNavigate }: CreateVisitorScreenProps) {
  return (
    <div className='flex flex-col h-full bg-white white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800 flex items-center'>
        <Button variant='ghost' size='icon' onClick={() => onNavigate('securityHome')}>
          <ChevronLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-lg font-bold ml-2'>Register Visitor</h1>
      </div>

      <div className='flex-1 overflow-auto p-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='visitorName'>Visitor Name</Label>
            <Input id='visitorName' placeholder='John Doe' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visitorPhone'>Phone Number</Label>
            <Input id='visitorPhone' type='tel' placeholder='+1 (555) 000-0000' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visitorEmail'>Email (Optional)</Label>
            <Input id='visitorEmail' type='email' placeholder='visitor@email.com' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visitingUnit'>Visiting Unit/Apartment</Label>
            <Select>
              <SelectTrigger id='visitingUnit'>
                <SelectValue placeholder='Select apartment' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='101'>Apartment 101</SelectItem>
                <SelectItem value='102'>Apartment 102</SelectItem>
                <SelectItem value='201'>Apartment 201</SelectItem>
                <SelectItem value='202'>Apartment 202</SelectItem>
                <SelectItem value='301'>Apartment 301</SelectItem>
                <SelectItem value='302'>Apartment 302</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visitDate'>Visit Date</Label>
            <Input id='visitDate' type='date' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visitTime'>Visit Time</Label>
            <Input id='visitTime' type='time' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='purpose'>Purpose of Visit</Label>
            <Select>
              <SelectTrigger id='purpose'>
                <SelectValue placeholder='Select purpose' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='social'>Social Visit</SelectItem>
                <SelectItem value='delivery'>Delivery</SelectItem>
                <SelectItem value='service'>Service Provider</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className='w-full mt-4' onClick={() => onNavigate('securityHome')}>
            Register Visitor
          </Button>
        </div>
      </div>
    </div>
  )
}
