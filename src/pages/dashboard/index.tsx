'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, UserCheck, ArrowUp, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/globals.css'
import DashboardLayout from '@/layout/DashboardLayout'

const stats = [
  {
    title: 'Total Residents',
    value: '123',
    icon: Users,
    change: '+12%',
    trend: 'up'
  },
  {
    title: 'Security Staff',
    value: '45',
    icon: Shield,
    change: '+5%',
    trend: 'up'
  },
  {
    title: 'Active Visitors',
    value: '12',
    icon: UserCheck,
    change: '-3%',
    trend: 'down'
  }
]

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
  return (
    <div className='w-full space-y-6'>
      {' '}
      <motion.div initial='hidden' animate='show' variants={container} className='space-y-8'>
        <motion.div variants={item}>
          <h1 className='text-3xl font-bold'>Dashboard Overview</h1>
          <p className='text-muted-foreground mt-2'>Welcome back to your admin dashboard</p>
        </motion.div>

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
                    <div
                      className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUp className='h-4 w-4 mr-1' />
                      ) : (
                        <ArrowDown className='h-4 w-4 mr-1' />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
                <div className='grid grid-cols-2 gap-4'>
                  {['Add Resident', 'Add Security', 'View Visitors', 'Settings'].map(action => (
                    <motion.button
                      key={action}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium'
                    >
                      {action}
                    </motion.button>
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
