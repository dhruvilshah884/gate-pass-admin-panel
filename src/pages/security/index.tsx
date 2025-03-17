'use client'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { CreateSecurityDialog } from '@/components/create-security-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMutation, useQuery } from 'react-query'
import { deleteSecurity, fetchSecurity } from '@/api-handler/security'
import moment from 'moment'
import DashboardLayout from '@/layout/DashboardLayout'
import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

export default function SecurityPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { data: securityList, refetch } = useQuery(['securityList'], () => fetchSecurity(), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })
  const securityListData = securityList?.data?.data?.result

  const { mutate: handlerDelete } = useMutation((id: string) => deleteSecurity(id), {
    onSuccess: () => {
      console.log('Residence deleted successfully')
      refetch()
    },
    onError: error => {
      console.error('Error deleting residence:', error)
    }
  })
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Security Management</h1>
          <p className='text-muted-foreground mt-2'>Manage security staff and their schedules</p>
        </div>
        <CreateSecurityDialog>
          <Button size='lg' className='shadow-lg hover:shadow-xl transition-all'>
            <PlusCircle className='mr-2 h-5 w-5' />
            Add Security
          </Button>
        </CreateSecurityDialog>
      </div>
      <div className='rounded-xl border bg-card shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Shift Time</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityListData?.map((security: any, index: number) => (
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
                <TableCell>{security.phone}</TableCell>
                <TableCell>
                  <div className='text-sm'>
                    {moment(security?.shiftTime).format('MM/DD/YYYY')} -{' '}
                    {moment(security.shiftEndTime).format('MM/DD/YYYY')}
                  </div>
                </TableCell>
                <TableCell>₹{security.salary}</TableCell>
                <TableCell className='text-right gap-2'>
                  <Button variant='ghost' size='sm' className='mr-2'>
                    <Edit className='mr-2 h-4 w-4' />{' '}
                  </Button>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button variant='ghost' size='sm' onClick={() => setDeleteId(security?._id)}>
                        <Trash className='mr-2 h-4 w-4 text-red-500' />
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className='fixed inset-0 bg-black/50' />
                      <AlertDialog.Content className='fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg'>
                        <AlertDialog.Title className='text-lg font-bold'>Confirm Deletion</AlertDialog.Title>
                        <AlertDialog.Description className='text-sm text-gray-600'>
                          Are you sure you want to delete this Security? This action cannot be undone.
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
          </TableBody>
        </Table>
      </div>{' '}
    </motion.div>
  )
}
SecurityPage.layout = DashboardLayout
