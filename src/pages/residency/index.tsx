import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import { deleteResidency, fetchResidencies } from '@/api-handler/residency'
import DashboardLayout from '@/layout/DashboardLayout'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import ScreenLoading from '@/components/ScreenLoading'

export default function ResidencyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [q, setQ] = useState('')

  const {
    data: residenceList,
    refetch,
    isLoading
  } = useQuery(['residenceList', page, pageSize, q], () => fetchResidencies({ page, pageSize, q }), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })

  const { mutate: handlerDelete } = useMutation((id: string) => deleteResidency(id), {
    onSuccess: () => {
      console.log('Residence deleted successfully')
      refetch()
    },
    onError: error => {
      console.error('Error deleting residence:', error)
    }
  })
  const residentsData = residenceList?.data?.data?.result
  const count = residenceList?.data?.data?.total || 0
  const handleNextPage = () => setPage(prevPage => prevPage + 1)
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
  const totalPages = Math.ceil(count / pageSize)

  return (
    <div className='space-y-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Residence Management</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
        <div className='flex items-center '>
          <Input
            placeholder='Search residents...'
            value={q}
            onChange={e => {
              setQ(e.target.value)
              refetch()
            }}
            className='w-[60%]'
          />
        </div>
        <div className='rounded-lg border bg-card'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Flat No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {residentsData?.map((resident: any, index: any) => (
                  <motion.tr
                    key={resident.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className='group hover:bg-muted/50'
                  >
                    <TableCell className='font-medium'>{resident.name}</TableCell>
                    <TableCell>{resident.flatNo}</TableCell>
                    <TableCell>{resident.email}</TableCell>
                    <TableCell>{resident.phoneNumber1}</TableCell>
                    <TableCell>{`${resident.flat.fullAddress}`}</TableCell>
                    <TableCell className='text-right gap-2'>
                      <Button variant='ghost' size='sm' className='mr-2'>
                        <Edit className='mr-2 h-4 w-4' />{' '}
                      </Button>{' '}
                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                          <Button variant='ghost' size='sm' onClick={() => setDeleteId(resident?._id)}>
                            <Trash className='mr-2 h-4 w-4 text-red-500' />
                          </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className='fixed inset-0 bg-black/50' />
                          <AlertDialog.Content className='fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg'>
                            <AlertDialog.Title className='text-lg font-bold'>Confirm Deletion</AlertDialog.Title>
                            <AlertDialog.Description className='text-sm text-gray-600'>
                              Are you sure you want to delete this residence? This action cannot be undo.
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
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, residentsData?.length)} of {''}
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
ResidencyPage.layout = DashboardLayout
