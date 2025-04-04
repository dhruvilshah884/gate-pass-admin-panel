import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import { fetchResidencyById, updateResidency } from '@/api-handler/residency'

export function PersistResident({ children, id }: { children: React.ReactNode; id?: string }) {
  const [open, setOpen] = useState(false)
  const editId = id
  const [name, setName] = useState('')
  const [flatNo, setFlatNo] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone2, setPhone2] = useState('')

  const { isFetching, refetch } = useQuery(
    ['editId', editId],
    async () => (editId ? fetchResidencyById(editId.toString()) : () => {}),
    {
      onSuccess: async (data: any) => {
        if (editId) {
          const residentFetch = await data?.data?.data
          setName(residentFetch?.name)
          setFlatNo(residentFetch?.flatNo)
          setPhone(residentFetch?.phoneNumber1)
          setEmail(residentFetch?.email)
          setAddress(residentFetch?.blockNumber)
          setPhone2(residentFetch?.phoneNumber1)
        }
      },
      onError: (error: any) => {
        alert(error)
      }
    }
  )

  const { mutate: residentPut, isLoading } = useMutation((data: any) => updateResidency(editId as string, data), {
    onSuccess: () => {
      setOpen(false)
      refetch()
    },
    onError: error => {
      alert(error)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editId) {
      alert('Invalid resident ID')
      return
    }

    const updatedResident = {
      name,
      flatNo,
      phone,
      email,
      address,
      phone2
    }

    residentPut(updatedResident)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{React.Children.count(children) === 1 ? children : <span>{children}</span>}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{'Update Resident Details'}</DialogTitle>
        </DialogHeader>
        <motion.form
          className='space-y-6 mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'> Name</Label>
              <Input
                id='name'
                name='name'
                className='transition-all'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='flatNo'>Flat No</Label>
              <Input
                id='flatNo'
                name='flatNo'
                className='transition-all'
                value={flatNo}
                onChange={e => setFlatNo(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                className='transition-all'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='blockNumber'>Block Number</Label>
              <Input
                id='blockNumber'
                name='blockNumber'
                className='transition-all'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber1'>Phone Number 1</Label>
              <Input
                id='phoneNumber1'
                name='phoneNumber1'
                className='transition-all'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber2'>Phone Number 2</Label>
              <Input
                id='phoneNumber2'
                name='phoneNumber2'
                className='transition-all'
                value={phone2}
                onChange={e => setPhone2(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-end gap-4 pt-4'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' className='px-8 bg-black text-white' disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
