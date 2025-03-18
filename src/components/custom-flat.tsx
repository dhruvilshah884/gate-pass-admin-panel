'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import { fetchFlatById, postFlat, updateFlat } from '@/api-handler/flat'
import { IFlat } from '@/interface/flat'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function PersistFlat({ children, id }: { children: React.ReactNode; id?: string }) {
  const [open, setOpen] = useState(false)
  const editFlatId = id

  const { mutate: flatPost, isLoading } = useMutation((data: IFlat) => postFlat(data), {
    onSuccess: data => {
      setOpen(false)
    },
    onError: error => {
      alert(error)
    }
  })
  const { handleBlur, handleChange, handleSubmit, values, errors, touched, isValid, validateForm, setValues } =
    useFormik({
      initialValues: {
        country: '',
        state: '',
        city: '',
        flatName: '',
        fullAddress: ''
      },
      validationSchema: Yup.object({
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        flatName: Yup.string().required('Flat Name is required'),
        fullAddress: Yup.string().required('Full Address is required')
      }),
      onSubmit: (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const data = {
          country: values.country,
          state: values.state,
          city: values.city,
          flatName: values.flatName,
          fullAddress: values.fullAddress
        }
        if (editFlatId) {
          flatPut(data as IFlat)
        } else {
          flatPost(data as IFlat)
        }
        setSubmitting(false)
      }
    })
  const { isFetching } = useQuery(
    ['editFlatId', editFlatId],
    async () => (editFlatId ? fetchFlatById(editFlatId.toString()) : () => {}),
    {
      onSuccess: async (data: any) => {
        if (editFlatId) {
          const flatFetch = await data?.data?.data
          const flatFetchValues = {
            country: flatFetch?.country,
            state: flatFetch?.state,
            city: flatFetch?.city,
            flatName: flatFetch?.flatName,
            fullAddress: flatFetch?.fullAddress
          }
          setValues(flatFetchValues)
          setTimeout(() => {
            validateForm(flatFetchValues)
          }, 1000)
        }
      },
      onError: (error: any) => {
        alert(error)
      }
    }
  )
  const { mutate: flatPut } = useMutation((data: IFlat) => updateFlat(editFlatId as string, data), {
    onSuccess: data => {
      setOpen(false)
    },
    onError: error => {
      alert(error)
    }
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{React.Children.count(children) === 1 ? children : <span>{children}</span>}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{editFlatId ? 'Update Flat Details' : ' Add Flat Details'}</DialogTitle>
        </DialogHeader>
        <motion.form className='space-y-6 mt-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='flatName'>Flat Name</Label>
              <Input
                id='flatName'
                name='flatName'
                className='transition-all'
                value={values.flatName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.flatName && touched.flatName && (
                <div className='text-red-500 text-sm'>{errors.flatName as string}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='country'>Country</Label>
              <Input id='country' name='country' value={values.country} onChange={handleChange} onBlur={handleBlur} />
              {errors.country && touched.country && (
                <div className='text-red-500 text-sm'>{errors.country as string}</div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input id='state' name='state' value={values.state} onChange={handleChange} onBlur={handleBlur} />
              {errors.state && touched.state && <div className='text-red-500 text-sm'>{errors.state as string}</div>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input id='city' name='city' value={values.city} onChange={handleChange} onBlur={handleBlur} />
              {errors.city && touched.city && <div className='text-red-500 text-sm'>{errors.city as string}</div>}
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='fullAddress'>Flat Address</Label>
            <textarea
              className='w-full p-2 border rounded-md resize'
              placeholder='Enter flat address...'
              name='fullAddress'
              id='fullAddress'
              value={values.fullAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullAddress && touched.fullAddress && (
              <div className='text-red-500 text-sm'>{errors.fullAddress as string}</div>
            )}
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
              {editFlatId ? 'Update' : 'Add Flat'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
