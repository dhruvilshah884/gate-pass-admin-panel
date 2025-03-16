'use client'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { CreateSecurityDialog } from '@/components/create-security-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from 'react-query'
import { fetchSecurity } from '@/api-handler/security'
import moment from 'moment'
import DashboardLayout from '@/layout/DashboardLayout'

export default function SecurityPage() {
  const { data: securityList } = useQuery(['securityList'], () => fetchSecurity(), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })
  const securityListData = securityList?.data?.data?.result
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
            Add Security Staff
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
                  <Button variant='ghost' size='sm'>
                    <Trash className='mr-2 h-4 w-4 color-red-500' />{' '}
                  </Button>
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
