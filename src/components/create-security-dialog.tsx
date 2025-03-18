'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { postSecurity, fetchSecurityById, updateSecurity } from '@/api-handler/security'
import { ISecurity } from '@/interface/security'

export function PersistSecurity({ children, id }: { children: React.ReactNode; id?: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const editSecurityId = id

  const { mutate: securityPost, isLoading } = useMutation((data: ISecurity) => postSecurity(data), {
    onSuccess: () => {
      setOpen(false)
    },
    onError: error => {
      alert(error)
    }
  })

  const { handleBlur, handleChange, handleSubmit, values, errors, touched, isValid, validateForm, setValues } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        phoneNumber1: '',
        phoneNumber2: '',
        shiftTime: '',
        shiftEndTime: '',
        addressLine1: '',
        addressLine2: '',
        salary: 0,
        proof: []
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is Required'),
        phoneNumber1: Yup.string().required('Primary Phone is required'),
        shiftTime: Yup.string().required('Shift Start Time is required'),
        shiftEndTime: Yup.string().required('Shift End Time is required'),
        addressLine1: Yup.string().required('Address Line 1 is required'),
        salary: Yup.number().required('Salary is required').positive('Salary must be a positive number')
      }),
      onSubmit: (values, { setSubmitting }) => {
        const data = { ...values }
        if (editSecurityId) {
          securityPut(data as any)
        } else {
          securityPost(data as any)
        }
        setSubmitting(false)
      }
    })

  const { isFetching } = useQuery(
    ['editSecurityId', editSecurityId],
    async () => {
      return editSecurityId ? fetchSecurityById(editSecurityId.toString()) : Promise.resolve(null)
    },
    {
      onSuccess: async (data: any) => {
        if (editSecurityId) {
          const securityFetch = await data?.data?.data
          setValues(securityFetch)
          setTimeout(() => {
            validateForm(securityFetch)
          }, 1000)
        }
      },
      onError: error => {
        console.error('Error fetching security:', error)
        alert(error)
      }
    }
  )

  const { mutate: securityPut } = useMutation((data: ISecurity) => updateSecurity(editSecurityId as string, data), {
    onSuccess: () => {
      setOpen(false)
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
          <DialogTitle className='text-2xl'>
            {editSecurityId ? 'Update Security Staff' : 'Add Security Staff'}
          </DialogTitle>
        </DialogHeader>
        <motion.form className='space-y-6 mt-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && touched.name && <div className='text-red-500 text-sm'>{errors.name}</div>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber1'>Primary Phone</Label>
              <Input
                id='phoneNumber1'
                name='phoneNumber1'
                value={values.phoneNumber1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber1 && touched.phoneNumber1 && (
                <div className='text-red-500 text-sm'>{errors.phoneNumber1}</div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber2'>Secondary Phone (Optional)</Label>
              <Input
                id='phoneNumber2'
                name='phoneNumber2'
                value={values.phoneNumber2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='shiftTime'>Shift Start Time</Label>
              <Input
                id='shiftTime'
                name='shiftTime'
                type='time'
                value={values.shiftTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.shiftTime && touched.shiftTime && <div className='text-red-500 text-sm'>{errors.shiftTime}</div>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='shiftEndTime'>Shift End Time</Label>
              <Input
                id='shiftEndTime'
                name='shiftEndTime'
                type='time'
                value={values.shiftEndTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.shiftEndTime && touched.shiftEndTime && (
                <div className='text-red-500 text-sm'>{errors.shiftEndTime}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='addressLine1'>Address Line 1</Label>
              <Input
                id='addressLine1'
                name='addressLine1'
                value={values.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.addressLine1 && touched.addressLine1 && (
                <div className='text-red-500 text-sm'>{errors.addressLine1}</div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='addressLine2'>Address Line 2 (Optional)</Label>
              <Input
                id='addressLine2'
                name='addressLine2'
                value={values.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='salary'>Salary</Label>
              <Input
                id='salary'
                name='salary'
                type='number'
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.salary && touched.salary && <div className='text-red-500 text-sm'>{errors.salary}</div>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='proof'>Proof (Optional)</Label>
              <Input
                id='proof'
                name='proof'
                type='file'
                onChange={event => {
                  const files = event.currentTarget.files
                  if (files) {
                    const fileArray = Array.from(files).map(file => file.name)
                    handleChange({ target: { name: 'proof', value: fileArray } })
                  }
                }}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className='flex justify-end gap-4 pt-4'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type='submit'
              className='px-8 bg-black text-white'
              disabled={!isValid || isLoading || isFetching}
              onClick={() => handleSubmit()}
            >
              {editSecurityId ? 'Update' : 'Add Security'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
