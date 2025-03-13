'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, AlertTriangle } from 'lucide-react'
import moment from 'moment'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const visitors = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '1234567890',
    vehicleNumber: 'ABC123',
    entryTime: '2023-07-25T10:00:00Z',
    status: 'pending',
    residenceName: 'Alice Johnson',
    flatNo: 'A-101'
  }
  // Add more dummy data
]

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

export function VisitorsTable() {
  return (
    <div className='rounded-xl border bg-card shadow-sm overflow-hidden'>
      <div className='p-4 bg-muted/50'>
        <div className='flex items-center gap-4'>
          <Input placeholder='Search visitors...' className='w-[50%]' />
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
            <TableHead>Residence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor, index) => {
            const StatusIcon = statusStyles[visitor.status as keyof typeof statusStyles].icon
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
                <TableCell>
                  <div>
                    <div className='font-medium'>{visitor.residenceName}</div>
                    <div className='text-sm text-muted-foreground'>Flat: {visitor.flatNo}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className={statusStyles[visitor.status as keyof typeof statusStyles].badge}>
                    <StatusIcon className='mr-1 h-3 w-3' />
                    {visitor.status}
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
    </div>
  )
}
