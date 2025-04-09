'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PersistSecurity } from '@/components/create-security-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMutation, useQuery } from 'react-query'
import { deleteSecurity, fetchSecurity } from '@/api-handler/security'
import moment from 'moment'
import DashboardLayout from '@/layout/DashboardLayout'
import { useEffect, useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Input } from '@/components/ui/input'
import ScreenLoading from '@/components/ScreenLoading'

export default function SecurityPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Gate-Pass Admin || Security'
  }, [])

  const {
    data: securityList,
    refetch,
    isLoading
  } = useQuery(['securityList', page, pageSize, q], () => fetchSecurity({ page, pageSize, q }), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })
  const securityListData = securityList?.data?.data?.result || []
  const count = securityList?.data?.data?.total || 0
  const handleNextPage = () => setPage(prevPage => prevPage + 1)
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
  const totalPages = Math.ceil(count / pageSize)

  const { mutate: handlerDelete } = useMutation((id: string) => deleteSecurity(id), {
    onSuccess: () => {
      console.log('Security deleted successfully')
      refetch()
    },
    onError: error => {
      console.error('Error deleting Security:', error)
    }
  })
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Security Management</h1>
          <p className='text-muted-foreground mt-2'>Manage security staff and their schedules</p>
        </div>
        <PersistSecurity Refetch={refetch}>
          <Button size='lg' variant='outline' className='shadow-lg hover:shadow-xl transition-all'>
            <PlusCircle className='mr-2 h-5 w-5' />
            Add Security
          </Button>
        </PersistSecurity>
      </div>
      <div className='flex items-center '>
        <Input
          placeholder='Search security...'
          value={q}
          onChange={e => {
            setQ(e.target.value)
            refetch()
          }}
          className='w-[60%]'
        />
      </div>
      <div className='rounded-xl border bg-card shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Security Member</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Shift Time</TableHead>
              <TableHead>Security Address</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='p-6 text-center'>
                  <div className='flex justify-center items-center h-32'>
                    <ScreenLoading />
                  </div>
                </td>
              </tr>
            ) : securityListData?.length === 0 ? (
              <tr>
                <td colSpan={6} className='text-center p-4'>
                  No security found.
                </td>
              </tr>
            ) : (
              securityListData?.map((security: any, index: number) => (
                <motion.tr
                  key={security.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group hover:bg-muted/50'
                >
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-9 w-9'>
                        <AvatarImage src={security.avatar} alt={security.name} />
                        <AvatarFallback>{security.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{security.name}</div>
                        <div className='text-sm text-muted-foreground'>{security.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    +91 {security.phoneNumber1} & {security?.phoneNumber2 || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      {security?.shiftTime} - {security.shiftEndTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    {security.addressLine1}, {security.addressLine2}
                  </TableCell>
                  <TableCell>₹{security.salary}</TableCell>
                  <TableCell className='text-right gap-2'>
                    <PersistSecurity id={security?._id}>
                      <Button variant='ghost' size='sm' className='mr-2'>
                        <Edit className='mr-2 h-4 w-4' />
                      </Button>
                    </PersistSecurity>

                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <Button variant='ghost' size='sm' onClick={() => setDeleteId(security?._id)}>
                          <Trash className='mr-2 h-4 w-4 text-red-500' />
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className='fixed inset-0 bg-black/50' />
                        <AlertDialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg'>
                          <AlertDialog.Title className='text-lg font-bold'>Confirm Deletion</AlertDialog.Title>
                          <AlertDialog.Description className='text-sm text-gray-600'>
                            Are you sure you want to delete this Security{' '}
                            <span className='font-bold text-black'>{security?.name}</span> ?
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
          </TableBody>
        </Table>
      </div>{' '}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, securityListData?.length)} of {''}
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
    </motion.div>
  )
}
SecurityPage.layout = DashboardLayout
