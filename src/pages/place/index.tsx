import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Edit, PlusCircle, Trash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import DashboardLayout from '@/layout/DashboardLayout'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { deletePlace, fetchPlaces } from '@/api-handler/place'
import moment from 'moment'
import { PersistPlace } from '@/components/custom-place'
import ScreenLoading from '@/components/ScreenLoading'

export default function PlacePage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Gate-Pass Admin || Place'
  }, [])

  const {
    data: placeList,
    refetch,
    isLoading
  } = useQuery(['placesList', page, pageSize, q], () => fetchPlaces({ page, pageSize, q }), {
    onError: error => {
      console.error('Error fetching places:', error)
    }
  })
  const { mutate: handlerDelete } = useMutation((id: string) => deletePlace(id), {
    onSuccess: () => {
      console.log('Place deleted successfully')
      refetch()
    },
    onError: error => {
      console.error('Error deleting Place:', error)
    }
  })
  const placesData = placeList?.data?.data?.result || []
  const count = placeList?.data?.data?.total || 0
  const handleNextPage = () => setPage(prevPage => prevPage + 1)
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
  const totalPages = Math.ceil(count / pageSize)

  return (
    <div className='space-y-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Nearest Place</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Input
            placeholder='Search Places...'
            value={q}
            onChange={e => {
              setQ(e.target.value)
              refetch()
            }}
            className='w-[60%]'
          />
          <PersistPlace Refetch={refetch}>
            <Button size='lg' className='shadow-lg hover:shadow-xl transition-all border border-black '>
              <PlusCircle className='mr-2 h-5 w-5' />
              Add Nearest Place
            </Button>
          </PersistPlace>
        </div>
        <div className='rounded-lg border bg-card'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Place Name</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>distance</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className='text-center p-4'>
                      <ScreenLoading />
                    </td>
                  </tr>
                ) : placesData?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='text-center p-4 text-muted-foreground'>
                      No places found.
                    </td>
                  </tr>
                ) : (
                  placesData?.map((place: any, index: any) => (
                    <motion.tr
                      key={place.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className='group hover:bg-muted/50'
                    >
                      <TableCell>{place.name}</TableCell>
                      <TableCell className='font-medium'>{place.categoryName}</TableCell>
                      <TableCell>{place.address}</TableCell>
                      <TableCell>{place.mobileNumber}</TableCell>
                      <TableCell>
                        {place.openTime} - {place.closeTime}
                      </TableCell>{' '}
                      <TableCell>{place.navigaton}</TableCell>
                      <TableCell>{place.distance}</TableCell>
                      <TableCell className='text-right gap-2'>
                        <PersistPlace id={place?._id}>
                          <Button variant='ghost' size='sm' className='mr-2'>
                            <Edit className='mr-2 h-4 w-4' />
                          </Button>
                        </PersistPlace>
                        <AlertDialog.Root>
                          <AlertDialog.Trigger asChild>
                            <Button variant='ghost' size='sm' onClick={() => setDeleteId(place?._id)}>
                              <Trash className='mr-2 h-4 w-4 text-red-500' />
                            </Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Portal>
                            <AlertDialog.Overlay className='fixed inset-0 bg-black/50' />
                            <AlertDialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg'>
                              <AlertDialog.Title className='text-lg font-bold'>Confirm Deletion</AlertDialog.Title>
                              <AlertDialog.Description className='text-sm text-gray-600'>
                                Are you sure you want to delete this place{' '}
                                <span className='font-bold text-black'>{place.name}</span>?
                              </AlertDialog.Description>
                              <div className='mt-4 flex justify-end gap-2'>
                                <AlertDialog.Cancel asChild>
                                  <Button variant='outline'>Cancel</Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action
                                  asChild
                                  onClick={() => {
                                    if (deleteId) {
                                      handlerDelete(deleteId)
                                    }
                                  }}
                                >
                                  <Button variant='outline'>Delete</Button>
                                </AlertDialog.Action>
                              </div>
                            </AlertDialog.Content>
                          </AlertDialog.Portal>
                        </AlertDialog.Root>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, placesData?.length)} of {''}
          {count} entries
        </p>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={page === 1}>
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={handleNextPage} disabled={page === totalPages}>
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
PlacePage.layout = DashboardLayout
