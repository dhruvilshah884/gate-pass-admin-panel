'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { fetchPlaceById, postPlace, updatePlace } from '@/api-handler/place'
import { INearestPlace } from '@/interface/nearestPlace'

export function PersistPlace({ children, id, Refetch }: { children: React.ReactNode; id?: string; Refetch?: any }) {
  const [open, setOpen] = useState(false)
  const editPlaceId = id

  const { mutate: placePost, isLoading } = useMutation((data: INearestPlace) => postPlace(data), {
    onSuccess: data => {
      setOpen(false)
      Refetch()
    },
    onError: error => {
      alert(error)
    }
  })
  const { handleBlur, handleChange, handleSubmit, values, errors, touched, isValid, validateForm, setValues } =
    useFormik({
      initialValues: {
        categoryName: '',
        name: '',
        distance: '',
        address: '',
        openTime: '',
        closeTime: '',
        navigaton: '',
        mobileNumber: ''
      },
      validationSchema: Yup.object({
        categoryName: Yup.string().required('Category Name is required'),
        name: Yup.string().required('Place Name is required'),
        distance: Yup.string().required('Distance is required'),
        address: Yup.string().required('Address is required'),
        openTime: Yup.string().required('Open Time is required'),
        closeTime: Yup.string().optional(),
        navigaton: Yup.string().required('Navigaton is required'),
        mobileNumber: Yup.string().required('Mobile Number is required')
      }),
      onSubmit: (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const data = {
          categoryName: values.categoryName,
          name: values.name,
          distance: values.distance,
          address: values.address,
          openTime: values.openTime,
          closeTime: values.closeTime,
          navigaton: values.navigaton,
          mobileNumber: values.mobileNumber
        }
        if (editPlaceId) {
          placePut(data as any)
        } else {
          placePost(data as any)
        }
        setSubmitting(false)
      }
    })
  const { isFetching } = useQuery(
    ['editPlaceId', editPlaceId],
    async () => (editPlaceId ? fetchPlaceById(editPlaceId.toString()) : () => {}),
    {
      onSuccess: async (data: any) => {
        if (editPlaceId) {
          const placeFetch = await data?.data?.data
          const placeFetchValues = {
            categoryName: placeFetch.categoryName,
            name: placeFetch.name,
            distance: placeFetch.distance,
            address: placeFetch.address,
            openTime: placeFetch.openTime,
            closeTime: placeFetch.closeTime,
            navigaton: placeFetch.navigaton,
            mobileNumber: placeFetch.mobileNumber
          }
          setValues(placeFetchValues)
          setTimeout(() => {
            validateForm(placeFetchValues)
          }, 1000)
        }
      },
      onError: (error: any) => {
        alert(error)
      }
    }
  )
  const { mutate: placePut } = useMutation((data: INearestPlace) => updatePlace(editPlaceId as string, data), {
    onSuccess: data => {
      setOpen(false)
      Refetch()
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
          <DialogTitle className='text-2xl'>{editPlaceId ? 'Update Place Details' : ' Add Place Details'}</DialogTitle>
        </DialogHeader>
        <motion.form className='space-y-6 mt-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='categoryName'>Category Name</Label>
              <Input
                id='categoryName'
                name='categoryName'
                className='transition-all'
                value={values.categoryName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.categoryName && touched.categoryName && (
                <div className='text-red-500 text-sm'>{errors.categoryName as string}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='name'>Place Name</Label>
              <Input
                id='name'
                name='name'
                className='transition-all'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <div className='text-red-500 text-sm'>{errors.name as string}</div>}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='address'>Phone</Label>
              <Input
                id='mobileNumber'
                name='mobileNumber'
                className='transition-all'
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobileNumber && touched.mobileNumber && (
                <div className='text-red-500 text-sm'>{errors.mobileNumber as string}</div>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                name='address'
                className='transition-all'
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && touched.address && (
                <div className='text-red-500 text-sm'>{errors.address as string}</div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='openTime'>Open Time</Label>
              <Input
                id='openTime'
                name='openTime'
                className='transition-all'
                value={values.openTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.openTime && touched.openTime && (
                <div className='text-red-500 text-sm'>{errors.openTime as string}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='closeTime'>Close Time</Label>
              <Input
                id='closeTime'
                name='closeTime'
                className='transition-all'
                value={values.closeTime}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.closeTime && touched.closeTime && (
                <div className='text-red-500 text-sm'>{errors.closeTime as string}</div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='navigaton'>Navigaton</Label>
              <Input
                id='navigaton'
                name='navigaton'
                className='transition-all'
                value={values.navigaton}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.navigaton && touched.navigaton && (
                <div className='text-red-500 text-sm'>{errors.navigaton as string}</div>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='distance'>Distance</Label>
              <Input
                id='distance'
                name='distance'
                className='transition-all'
                value={values.distance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.distance && touched.distance && (
                <div className='text-red-500 text-sm'>{errors.distance as string}</div>
              )}
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
              {editPlaceId ? 'Update Place' : 'Add Place'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
