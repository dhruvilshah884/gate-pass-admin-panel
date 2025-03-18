'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/layout/DashboardLayout'
import { fetchDashboard } from '@/api-handler/dashboard'
import { useQuery } from 'react-query'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  const {
    data: dashboardData,
    isLoading,
    isError
  } = useQuery(['dashboardData'], () => fetchDashboard(), {
    onError: error => {
      console.error('Error fetching dashboard data:', error)
    }
  })
  console.log(dashboardData?.data.data, 'dashboardData')

  const stats = dashboardData?.data
    ? [
        { title: 'Total Residents', value: dashboardData.data.data.residancy, icon: Users },
        { title: 'Security Staff', value: dashboardData.data.data.security, icon: Shield },
        { title: 'Active Visitors', value: dashboardData.data.data.visitors, icon: UserCheck }
      ]
    : []

  return (
    <div className='w-full space-y-6'>
      <motion.div initial='hidden' animate='show' variants={container} className='space-y-8'>
        <motion.div variants={item}>
          <h1 className='text-3xl font-bold'>Dashboard Overview</h1>
          <p className='text-muted-foreground mt-2'>Welcome back to your admin dashboard</p>
        </motion.div>

        {isLoading ? (
          <p>Loading data...</p>
        ) : isError ? (
          <p className='text-red-500'>Error fetching data</p>
        ) : (
          <motion.div variants={container} className='grid gap-6 md:grid-cols-3'>
            {stats.map(stat => (
              <motion.div key={stat.title} variants={item}>
                <Card className='hover:shadow-lg transition-all duration-200 hover:-translate-y-1'>
                  <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                    <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                    <stat.icon className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between'>
                      <div className='text-2xl font-bold'>{stat.value}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        <div className='grid gap-6 md:grid-cols-2'>
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div variants={container} className='space-y-4'>
                  {[1, 2, 3].map((_, i) => (
                    <motion.div key={i} variants={item} className='flex items-center gap-4 p-4 rounded-lg bg-muted/50'>
                      <div className='h-2 w-2 rounded-full bg-primary' />
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>New visitor approved</p>
                        <p className='text-sm text-muted-foreground'>2 minutes ago</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 '>
                  {[
                    { label: 'Add Resident', href: '/residency' },
                    { label: 'Add Security', href: '/security' },
                    { label: 'View Visitors', href: '/visitors' },
                    { label: 'Flat', href: '/flat' }
                  ].map(action => (
                    <Link key={action.label} href={action.href} passHref>
                      <motion.button
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='p-4 rounded-lg bg-black/5 hover:bg-black/10 transition-colors text-sm font-medium'
                      >
                        {action.label}
                      </motion.button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
Dashboard.layout = DashboardLayout
