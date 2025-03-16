import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit, Trash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from 'react-query'
import { fetchResidencies } from '@/api-handler/residency'
import DashboardLayout from '@/layout/DashboardLayout'

export default function ResidencyPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: residenceList } = useQuery(['residenceList'], () => fetchResidencies(), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })

  const residentsData = residenceList?.data?.data?.result
  return (
    <div className='space-y-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Residence Management</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
        <div className='flex items-center '>
          <Input
            placeholder='Search residents...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
                    <TableCell>{`${resident.locality}, ${resident.city}`}</TableCell>
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
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
ResidencyPage.layout = DashboardLayout
