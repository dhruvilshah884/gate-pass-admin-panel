'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash, MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { fetchSecurity } from '@/api-handler/security'

export function SecurityTable() {
  const { data: securityList } = useQuery(['securityList'], () => fetchSecurity(), {
    onError: error => {
      console.error('Error fetching residents:', error)
    }
  })
  const securityListData = securityList?.data?.data?.result
  return (
    <div className='rounded-xl border bg-card shadow-sm'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Shift Time</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
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
                  {security.shiftTime} - {security.shiftEndTime}
                </div>
              </TableCell>
              <TableCell>${security.salary}</TableCell>
              <TableCell>
                <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                  {security.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' className='opacity-0 group-hover:opacity-100'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>
                      <Edit className='mr-2 h-4 w-4' /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-red-600'>
                      <Trash className='mr-2 h-4 w-4' /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
