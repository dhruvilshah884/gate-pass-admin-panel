'use client'
import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit, Trash, PlusCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import DashboardLayout from '@/layout/DashboardLayout'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { fetchFlats, deleteFlat } from '@/api-handler/flat'
import { PersistFlat } from '@/components/custom-flat'

export default function FlatPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: flatList, refetch } = useQuery(['flatList'], () => fetchFlats(), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })
  const { mutate: handlerDelete } = useMutation((id: string) => deleteFlat(id), {
    onSuccess: () => {
      console.log('Residence deleted successfully')
      refetch()
    },
    onError: error => {
      console.error('Error deleting residence:', error)
    }
  })
  const flatListData = flatList?.data?.data?.result
  console.log('flatListData -> ', flatListData)

  return (
    <div className='space-y-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Flat</h1>
        <PersistFlat id={undefined}>
          <Button size='lg' className='shadow-lg hover:shadow-xl transition-all border border-black'>
            <PlusCircle className='mr-2 h-5 w-5' />
            Add Flat
          </Button>
        </PersistFlat>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
        <div className='flex items-center '>
          <Input
            placeholder='Search flat...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-[60%]'
          />
        </div>
        <div className='rounded-lg border bg-card'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flat Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>State</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {flatListData?((flat: any, index: any) => (
                  <motion.tr
                    key={flat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className='group hover:bg-muted/50'
                  >
                    <TableCell className='font-medium'>{flat.flatName}</TableCell>
                    <TableCell>{flat.country}</TableCell>
                    <TableCell>{flat.state}</TableCell>
                    <TableCell>{flat.city}</TableCell>
                    <TableCell>{flat.fullAddress}</TableCell>
                    <TableCell className='text-right gap-2'>
                      <PersistFlat id={flat?._id}>
                        <Button variant='ghost' size='sm' className='mr-2'>
                          <Edit className='mr-2 h-4 w-4' />{' '}
                        </Button>{' '}
                      </PersistFlat>
                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                          <Button variant='ghost' size='sm' onClick={() => setDeleteId(flat?._id)}>
                            <Trash className='mr-2 h-4 w-4 text-red-500' />
                          </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className='fixed inset-0 bg-black/50' />
                          <AlertDialog.Content className='fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg'>
                            <AlertDialog.Title className='text-lg font-bold'>Confirm Deletion</AlertDialog.Title>
                            <AlertDialog.Description className='text-sm text-gray-600'>
                              Are you sure you want to delete this flat?
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
                // {/* ))} */}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
FlatPage.layout = DashboardLayout
