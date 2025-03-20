'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, UserCheck, Bell, ArrowUpRight, Clock, BarChart3, Home } from 'lucide-react'
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

  if (isLoading) {
    return <div>Loading</div>
  }

  const stats = dashboardData?.data
    ? [
        {
          title: 'Total Residents',
          value: dashboardData.data.data.residancy,
          icon: Users,
          gradient: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600',
          increase: '12%'
        },
        {
          title: 'Security Staff',
          value: dashboardData.data.data.security,
          icon: Shield,
          gradient: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600',
          increase: '8%'
        },
        {
          title: 'Active Visitors',
          value: dashboardData.data.data.visitors,
          icon: UserCheck,
          gradient: 'from-emerald-500 to-green-600',
          textColor: 'text-emerald-600',
          increase: '15%'
        }
      ]
    : []

  const recentActivities = [
    {
      title: 'New visitor approved',
      time: '2 minutes ago',
      gradient: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Security staff check-in',
      time: '15 minutes ago',
      gradient: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Maintenance request submitted',
      time: '1 hour ago',
      gradient: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600'
    }
  ]

  const quickActions = [
    {
      label: 'Add Resident',
      href: '/residency',
      icon: Users,
      gradient: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-600'
    },
    {
      label: 'Add Security',
      href: '/security',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-600'
    },
    {
      label: 'View Visitors',
      href: '/visitors',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-green-600',
      textColor: 'text-emerald-600'
    },
    {
      label: 'Manage Flats',
      href: '/flat',
      icon: Home,
      gradient: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600'
    }
  ]

  return (
    <div className='w-full space-y-8  mx-auto min-h-screen'>
      <motion.div initial='hidden' animate='show' variants={container} className='space-y-8'>
        <motion.div variants={item} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Dashboard Overview
            </h1>
            <p className='text-muted-foreground mt-2'>Welcome back to your admin dashboard</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full cursor-pointer shadow-md'
          >
            <Bell className='h-4 w-4' />
            <span className='font-medium'>Notifications</span>
            <div className='bg-white text-indigo-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold'>
              3
            </div>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className='grid gap-6 md:grid-cols-3'>
            {[1, 2, 3].map((_, i) => (
              <Card key={i} className='overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-800'>
                <CardHeader className='pb-2'>{/* <Skeleton className='h-4 w-[120px]' /> */}</CardHeader>
                <CardContent>{/* <Skeleton className='h-8 w-[80px]' /> */}</CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <Card className='border-0 shadow-lg bg-white dark:bg-slate-800'>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center justify-center text-center space-y-2'>
                <div className='rounded-full bg-gradient-to-r from-red-500 to-pink-600 p-3 shadow-md'>
                  <Bell className='h-6 w-6 text-white' />
                </div>
                <CardTitle className='text-red-600 dark:text-red-400'>Unable to load dashboard data</CardTitle>
                <p className='text-red-500 text-sm'>Please check your connection and try again</p>
                <button
                  className='mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-6 py-2 text-sm font-medium text-white hover:from-red-600 hover:to-pink-700 shadow-md'
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div variants={container} className='grid gap-6 md:grid-cols-3'>
            {stats.map(stat => (
              <motion.div key={stat.title} variants={item}>
                <Card className='overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 bg-white white:bg-slate-800'>
                  <div className={`h-2 w-full bg-gradient-to-r ${stat.gradient}`}></div>
                  <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                    <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                    <div className={`p-2 rounded-full bg-gradient-to-r ${stat.gradient} shadow-md`}>
                      <stat.icon className='h-4 w-4 text-white' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between'>
                      <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
                      <div
                        className={`text-xs text-white bg-gradient-to-r ${stat.gradient} px-3 py-1 rounded-full shadow-sm`}
                      >
                        +{stat.increase}
                      </div>
                    </div>
                    <div className='mt-4 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden'>
                      <div className={`h-full bg-gradient-to-r ${stat.gradient} w-[75%]`}></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className='grid gap-6 md:grid-cols-2'>
          <motion.div variants={item}>
            <Card className='overflow-hidden border-0 shadow-lg bg-white white:bg-slate-800'>
              <div className='h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600'></div>
              <CardHeader className='border-b border-slate-100 dark:border-slate-700'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <div className='p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm'>
                      <Clock className='h-4 w-4 text-white' />
                    </div>
                    <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                      Recent Activities
                    </span>
                  </CardTitle>
                  <Link
                    href='/activities'
                    className='text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline'
                  >
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <motion.div variants={container} className='space-y-4'>
                  {recentActivities.map((activity, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className='flex items-center gap-4 p-4 rounded-xl bg-white white:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-200'
                      whileHover={{ x: 5 }}
                    >
                      <div className={`h-10 w-1 rounded-full bg-gradient-to-b ${activity.gradient}`} />
                      <div className='flex-1'>
                        <p className={`text-sm font-medium ${activity.textColor}`}>{activity.title}</p>
                        <p className='text-xs text-muted-foreground'>{activity.time}</p>
                      </div>
                      <button className='text-xs bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-medium hover:underline'>
                        Details
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className='overflow-hidden border-0 shadow-lg h-full bg-white white:bg-slate-800'>
              <div className='h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-600'></div>
              <CardHeader className='border-b border-slate-100 dark:border-slate-700'>
                <CardTitle className='flex items-center gap-2'>
                  <div className='p-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 shadow-sm'>
                    <ArrowUpRight className='h-4 w-4 text-white' />
                  </div>
                  <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    Quick Actions
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-2 gap-4'>
                  {quickActions.map(action => (
                    <Link key={action.label} href={action.href} passHref>
                      <motion.div
                        variants={item}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className='p-4 rounded-xl border border-slate-100 white:border-slate-700 shadow-md hover:shadow-lg transition-all bg-white white:bg-slate-800 flex flex-col items-center justify-center gap-2 h-[110px]'
                      >
                        <div className={`p-2 rounded-full bg-gradient-to-r ${action.gradient} shadow-md`}>
                          <action.icon className='h-5 w-5 text-white' />
                        </div>
                        <span className={`text-sm font-medium text-center ${action.textColor}`}>{action.label}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <Card className='overflow-hidden border-0 shadow-lg bg-white white:bg-slate-800'>
            <div className='h-1.5 w-full bg-gradient-to-r from-emerald-500 to-green-600'></div>
            <CardHeader className='border-b border-slate-100 dark:border-slate-700'>
              <CardTitle className='flex items-center gap-2'>
                <div className='p-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-sm'>
                  <BarChart3 className='h-4 w-4 text-white' />
                </div>
                <span className='bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>
                  Property Overview
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='space-y-2 p-4 rounded-xl bg-white white:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm'>
                  <div className='text-sm font-medium text-muted-foreground'>Total Properties</div>
                  <div className='text-3xl font-bold text-blue-600 dark:text-blue-400'>128</div>
                  <div className='w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden'>
                    <div className='bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full w-[85%]'></div>
                  </div>
                  <div className='text-xs text-blue-600 dark:text-blue-400 font-medium'>85% occupancy rate</div>
                </div>

                <div className='space-y-2 p-4 rounded-xl bg-white white:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm'>
                  <div className='text-sm font-medium text-muted-foreground'>Maintenance Requests</div>
                  <div className='text-3xl font-bold text-amber-600 dark:text-amber-400'>24</div>
                  <div className='w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden'>
                    <div className='bg-gradient-to-r from-amber-500 to-orange-600 h-2.5 rounded-full w-[40%]'></div>
                  </div>
                  <div className='text-xs text-amber-600 dark:text-amber-400 font-medium'>40% resolved</div>
                </div>

                <div className='space-y-2 p-4 rounded-xl bg-white white:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm'>
                  <div className='text-sm font-medium text-muted-foreground'>Security Incidents</div>
                  <div className='text-3xl font-bold text-emerald-600 dark:text-emerald-400'>3</div>
                  <div className='w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden'>
                    <div className='bg-gradient-to-r from-emerald-500 to-green-600 h-2.5 rounded-full w-[95%]'></div>
                  </div>
                  <div className='text-xs text-emerald-600 dark:text-emerald-400 font-medium'>95% resolved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

Dashboard.layout = DashboardLayout
