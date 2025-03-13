import React from 'react'
import { ResidenceTable } from '@/components/residence-table'
import DashboardLayout from '@/layout/DashboardLayout'
export default function ResidencyPage() {
  return (
    <div className='space-y-6 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Residence Management</h1>
      </div>
      <ResidenceTable />
    </div>
  )
}
ResidencyPage.layout = DashboardLayout
