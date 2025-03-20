'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, UserX, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, AlertTriangle } from 'lucide-react'
import moment from 'moment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from 'react-query'
import { fetchVisitors } from '@/api-handler/visitors'
import DashboardLayout from '@/layout/DashboardLayout'
import { useState } from 'react'

const statusStyles = {
  pending: {
    badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: AlertTriangle
  },
  approved: {
    badge: 'bg-green-50 text-green-700 border-green-200',
    icon: Check
  },
  denied: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    icon: X
  }
}
const sos = {
  false: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    icon: X
  },
  true: {
    badge: 'bg-green-50 text-green-700 border-green-200',
    icon: Check
  }
}

export default function VisitorsPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [q, setQ] = useState('')
  const { data: visitorsList, refetch } = useQuery(
    ['visitorsList', page, pageSize, q],
    () => fetchVisitors({ page, pageSize, q }),
    {
      onError: error => {
        console.error('Error fetching residents:', error)
      }
    }
  )

  const visitorsData = visitorsList?.data?.data?.result
  const totalVisitors = visitorsList?.data?.data || 0
  const count = visitorsList?.data?.data?.total || 0
  const handleNextPage = () => setPage(prevPage => prevPage + 1)
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
  const totalPages = Math.ceil(count / pageSize)

  console.log(totalVisitors, 'totalVisitors')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Visitor Management</h1>
        <p className='text-muted-foreground mt-2'>Track and manage all visitor entries</p>
      </div>
      <div className='grid gap-6 md:grid-cols-3'>
        <Card className='hover:shadow-lg transition-all'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Pending Approvals</CardTitle>
            <Clock className='h-4 w-4 text-yellow-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalVisitors.pending}</div>
          </CardContent>
        </Card>
        <Card className='hover:shadow-lg transition-all'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Denied Entry</CardTitle>
            <UserX className='h-4 w-4 text-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalVisitors.denied}</div>
          </CardContent>
        </Card>
        <Card className='hover:shadow-lg transition-all'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>Apprved Approvals</CardTitle>
            <UserCheck className='h-4 w-4 text-Green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalVisitors.approved}</div>
          </CardContent>
        </Card>
      </div>
      <div className='rounded-xl border bg-card shadow-sm overflow-hidden'>
        <div className='p-4 bg-muted/50'>
          <div className='flex items-center gap-4'>
            <Input
              placeholder='Search Visitors...'
              value={q}
              onChange={e => {
                setQ(e.target.value)
                refetch()
              }}
              className='w-[60%]'
            />
            <Select defaultValue='all'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent className='max-h-48 overflow-y-auto bg-white'>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='denied'>Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Vehicle No.</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Exit Time</TableHead>
              <TableHead>Flat No</TableHead>
              <TableHead>Residance Name</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sos</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitorsData?.map((visitor: any, index: number) => {
              const StatusIcon = statusStyles[visitor.status as keyof typeof statusStyles].icon
              const SosIcon = sos[visitor.emergencyFlag as keyof typeof sos].icon
              return (
                <motion.tr
                  key={visitor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group hover:bg-muted/50'
                >
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-9 w-9'>
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={visitor.name} />
                        <AvatarFallback>{visitor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{visitor.name}</div>
                        <div className='text-sm text-muted-foreground'>{visitor.phone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{visitor.vehicleNumber}</TableCell>
                  <TableCell>{moment(visitor?.entryTime).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>{moment(visitor?.exitTime).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>
                    <div>
                      <div className='font-medium'>{visitor.residenceName}</div>
                      <div className='text-sm text-muted-foreground'>{visitor.residance?.flatNo}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className='font-medium'>{visitor.residenceName}</div>
                      <div className='text-sm text-muted-foreground'>{visitor.residance?.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={statusStyles[visitor.status as keyof typeof statusStyles].badge}
                    >
                      <StatusIcon className='mr-1 h-3 w-3' />
                      {visitor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className={sos[visitor.emergencyFlag as keyof typeof sos].badge}>
                      <SosIcon className='mr-1 h-3 w-3' />
                      {visitor.emergencyFlag ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='opacity-0 group-hover:opacity-100 transition-opacity'
                        onClick={() => {
                          /* Handle approve */
                        }}
                      >
                        <Check className='mr-1 h-4 w-4' /> Approve
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='opacity-0 group-hover:opacity-100 transition-opacity text-red-600'
                        onClick={() => {
                          /* Handle deny */
                        }}
                      >
                        <X className='mr-1 h-4 w-4' /> Deny
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </div>{' '}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, visitorsData?.length)} of {''}
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
VisitorsPage.layout = DashboardLayout
