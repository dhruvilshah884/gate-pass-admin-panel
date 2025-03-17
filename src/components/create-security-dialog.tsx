'use client'
import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'
import { postSecurity } from '@/api-handler/security'
import { useRouter } from 'next/navigation'

export function CreateSecurityDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { mutate: securityPost, isLoading } = useMutation((data: '') => postSecurity(data), {
    onSuccess: data => {
      router.push('/customers')
    },
    onError: error => {
      alert(error)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Add Security Staff</DialogTitle>
        </DialogHeader>
        <motion.form
          // onSubmit={onSubmit}
          className='space-y-6 mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input id='name' name='name' required className='transition-all' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' type='email' required />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber1'>Primary Phone</Label>
              <Input id='phoneNumber1' name='phoneNumber1' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber2'>Secondary Phone (Optional)</Label>
              <Input id='phoneNumber2' name='phoneNumber2' />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='shiftTime'>Shift Start Time</Label>
              <Input id='shiftTime' name='shiftTime' type='time' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='shiftEndTime'>Shift End Time</Label>
              <Input id='shiftEndTime' name='shiftEndTime' type='time' required />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='salary'>Monthly Salary</Label>
              <Input id='salary' name='salary' type='number' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='idProof'>ID Proof</Label>
              <Input id='idProof' name='idProof' type='file' required />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Address</Label>
            <Input id='address' name='address' required />
          </div>

          <div className='flex justify-end gap-4 pt-4'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button type='submit' className='px-8 bg-black text-white'>
              Add Staff
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
