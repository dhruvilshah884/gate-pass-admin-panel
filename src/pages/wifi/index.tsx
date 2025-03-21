'use client'
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { fetchWifi } from '@/api-handler/wifi'
import DashboardLayout from '@/layout/DashboardLayout'
import { useState, useEffect } from 'react'

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

export default function Wifi() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data: wifiList, refetch } = useQuery(['wifiList', page, pageSize], () => fetchWifi({ page, pageSize }), {
    onError: error => {
      console.error('Error fetching wifi credentials:', error)
    }
  })

  const wifiData = wifiList?.data?.data?.result || []
  const totalCount = wifiList?.data?.data?.total || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  const handleNextPage = () => setPage(prevPage => Math.min(prevPage + 1, totalPages))
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))

  useEffect(() => {
    refetch()
  }, [page])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>WiFi Credentials</h1>
        <p className='text-muted-foreground mt-2'>Manage and track all WiFi credentials</p>
      </div>

      <div className='rounded-xl border bg-card shadow-sm overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flat No</TableHead>
              <TableHead>Residence</TableHead>
              <TableHead>WiFi Name</TableHead>
              <TableHead>WiFi Credentials</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wifiData.map((wifi, index) => {
              const StatusIcon = statusStyles[wifi.status]?.icon || X
              return (
                <motion.tr
                  key={wifi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group hover:bg-muted/50'
                >
                  <TableCell>{wifi.residance?.flatNo || 'N/A'}</TableCell>
                  <TableCell>{wifi.residance?.name || 'N/A'}</TableCell>
                  <TableCell>{wifi.wifiName}</TableCell>
                  <TableCell>{wifi.wifiCredentials}</TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, wifiData.length)} of {totalCount}{' '}
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

Wifi.layout = DashboardLayout
