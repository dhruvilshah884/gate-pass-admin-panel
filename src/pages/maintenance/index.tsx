import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation, useQuery } from 'react-query'
import DashboardLayout from '@/layout/DashboardLayout'
import { fetchMaintenance, postMaintenance } from '@/api-handler/maintence'
import moment from 'moment'
import ScreenLoading from '@/components/ScreenLoading'

export default function Maintenance() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [q, setQ] = useState('')
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const {
    data: MaintenaceList,
    refetch,
    isLoading
  } = useQuery(['maintenaceList', page, pageSize, q], () => fetchMaintenance({ page, pageSize, q }), {
    onError: error => console.error('Error fetching Maintenance:', error)
  })

  const { mutate: mainteancePost, isLoading: isDelete } = useMutation(() => postMaintenance(), {
    onSuccess: () => {
      localStorage.setItem('lastSentTime', Date.now().toString())
      calculateRemainingTime()
      refetch()
    },
    onError: error => alert(error)
  })

  const maintenanceData = MaintenaceList?.data?.data?.result
  const count = MaintenaceList?.data?.data?.total || 0
  const totalPages = Math.ceil(count / pageSize)

  const calculateRemainingTime = () => {
    const lastSentTime = localStorage.getItem('lastSentTime')
    if (lastSentTime) {
      const lastSentTimestamp = parseInt(lastSentTime, 10)
      const now = Date.now()
      const timePassed = now - lastSentTimestamp
      const timeLeft = 30 * 24 * 60 * 60 * 1000 - timePassed

      if (timeLeft > 0) {
        setRemainingTime(timeLeft)
      } else {
        localStorage.removeItem('lastSentTime')
        setRemainingTime(null)
      }
    }
  }

  useEffect(() => {
    calculateRemainingTime()
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev && prev > 1000) return prev - 1000
        clearInterval(timer)
        return null
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((time / (1000 * 60)) % 60)
    const seconds = Math.floor((time / 1000) % 60)
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  if (isDelete) {
    return <ScreenLoading />
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Maintenance List</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Input
            placeholder='Search Maintenance...'
            value={q}
            onChange={e => {
              setQ(e.target.value)
              refetch()
            }}
            className='w-[60%]'
          />
          <Button
            variant='outline'
            size='default'
            onClick={() => mainteancePost()}
            disabled={isLoading || remainingTime !== null}
          >
            {remainingTime !== null
              ? `Disabled: ${formatTime(remainingTime)}`
              : isLoading
              ? 'Sending...'
              : 'Send All Mails'}
          </Button>
        </div>
        <div className='rounded-lg border bg-card'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Residence Name</TableHead>
                <TableHead>Maintenance</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead>Payment Month</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {maintenanceData?.map((maintenance: any, index: any) => (
                  <motion.tr
                    key={maintenance.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className='group hover:bg-muted/50'
                  >
                    <TableCell>{maintenance.residance.name}</TableCell>
                    <TableCell>{maintenance.amount}</TableCell>
                    <TableCell>{maintenance.paymentMode || 'N/A'}</TableCell>
                    <TableCell>{moment(maintenance.paymentDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{maintenance.paymentProof || 'N/A'}</TableCell>
                    <TableCell>{maintenance.paymentMonth || 'N/A'}</TableCell>
                    <TableCell>{maintenance.status ? 'Success' : 'Pending'}</TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, maintenanceData?.length)} of {count}{' '}
          entries
        </p>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm' onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

Maintenance.layout = DashboardLayout
