'use client'

import { useState } from 'react'
// import { AppSidebar } from "@/components/app-sidebar"
import axios from 'axios'
import { MobileFrame } from '@/components/mobile-frame'
import { LoginScreen } from '@/components/login-screen'
import { SignupScreen } from '@/components/signup-screen'
import { ResidentHomeScreen } from '@/components/resident-home-screen'
import { SecurityHomeScreen } from '@/components/security-home-screen'
import { PastVisitorsScreen } from '@/components/past-visitors-screen'
import { PastMaintenanceScreen } from '@/components/past-maintenance-screen'
import { SettingsScreen } from '@/components/settings-screen'
import { CreateVisitorScreen } from '@/components/create-visitor-screen'
const API_URL = 'http://localhost:3000'
type ScreenType =
  | 'login'
  | 'signup'
  | 'residentHome'
  | 'securityHome'
  | 'pastVisitors'
  | 'pastMaintenance'
  | 'settings'
  | 'createVisitor'

type UserType = 'residance' | 'security' | null

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login')
  const [userType, setUserType] = useState<UserType>(null)

  const handleLogin = async (type: UserType, email: string, password: string) => {
    try {
      const response = await axios.post(
        'api/residance/login',
        {
          userType: type,
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      const token = response.data.token
      localStorage.setItem('token', token)

      setUserType(type)
      if (type === 'residance') {
        setCurrentScreen('residentHome')
      } else if (type === 'security') {
        setCurrentScreen('securityHome')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials.')
    }
  }
  const handleLogout = () => {
    setCurrentScreen('login')
    setUserType(null)
  }

  const handleNavigate = (screen: any) => {
    setCurrentScreen(screen)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin as any} onSignup={() => setCurrentScreen('signup')} />
      case 'signup':
        return <SignupScreen onBack={() => setCurrentScreen('login')} />
      case 'residentHome':
        return <ResidentHomeScreen onNavigate={handleNavigate} />
      case 'securityHome':
        return <SecurityHomeScreen onNavigate={handleNavigate} />
      case 'pastVisitors':
        return <PastVisitorsScreen onNavigate={handleNavigate} userType={userType} />
      case 'pastMaintenance':
        return <PastMaintenanceScreen onNavigate={handleNavigate} />
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} userType={userType} />
      case 'createVisitor':
        return <CreateVisitorScreen onNavigate={handleNavigate} />
      default:
        return (
          <LoginScreen
            onLogin={(type: any, email: any, password: any) => handleLogin(type, email, password)}
            onSignup={() => setCurrentScreen('signup')}
          />
        )
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-100 white:bg-gray-900'>
      {/* <AppSidebar onLogout={handleLogout} userType={userType} /> */}
      <main className='flex-1 flex items-center justify-center p-4'>
        <MobileFrame>{renderScreen()}</MobileFrame>
      </main>
    </div>
  )
}
