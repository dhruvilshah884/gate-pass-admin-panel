'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useQuery } from 'react-query'
import { fetchComplains } from '@/api-handler/complain'
import DashboardLayout from '@/layout/DashboardLayout'
import { useState, useEffect } from 'react'

const statusStyles:any = {
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

export default function Complain() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data: complainsList, refetch } = useQuery(
    ['complainsList', page, pageSize],
    () => fetchComplains({ page, pageSize }),
    {
      onError: error => {
        console.error('Error fetching complaints:', error)
      }
    }
  )

  const complainsData = complainsList?.data?.data?.result || []
  const count = complainsList?.data?.data?.total || 0

  const handleNextPage = () => setPage(prevPage => Math.min(prevPage + 1, Math.ceil(count / pageSize)))
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
  const totalPages = Math.ceil(count / pageSize)

  useEffect(() => {
    refetch()
  }, [page , refetch])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Complaint Management</h1>
        <p className='text-muted-foreground mt-2'>Track and manage all complaints</p>
      </div>
      <div className='rounded-xl border bg-card shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Residence</TableHead>
              <TableHead>Complaint</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complainsData.map((complaint:any, index:any) => {
              const StatusIcon = statusStyles[complaint.status].icon
              return (
                <motion.tr
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group hover:bg-muted/50'
                >
                  <TableCell>{complaint.residance.name}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{moment(complaint.date).format('MM/DD/YYYY')}</TableCell>
                  <TableCell className='flex items-center'>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium shadow-md transition-all
      ${statusStyles[complaint.status].badge}`}
                    >
                      <StatusIcon className='h-4 w-4' style={{ color: statusStyles[complaint.status].iconColor }} />
                      {complaint.status}
                    </motion.span>
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, complainsData.length)} of {count}{' '}
          entries
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






