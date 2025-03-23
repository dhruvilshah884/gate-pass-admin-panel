import { ResidentBottomNav } from '@/components/resident-bottom-nav'

interface ResidentHomeScreenProps {
  onNavigate: (screen: string) => void
}

export function ResidentHomeScreen({ onNavigate }: ResidentHomeScreenProps) {
  return (
    <div className='flex flex-col h-full bg-gray-50 white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800'>
        <h1 className='text-lg font-bold'>Resident Dashboard</h1>
      </div>

      <div className='flex-1 overflow-auto p-4'>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700 flex flex-col items-center justify-center'>
            <div className='text-3xl font-bold text-primary'>2</div>
            <div className='text-sm text-gray-500 white:text-gray-400'>Pending Visitors</div>
          </div>
          <div className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700 flex flex-col items-center justify-center'>
            <div className='text-3xl font-bold text-primary'>1</div>
            <div className='text-sm text-gray-500 white:text-gray-400'>Maintenance Requests</div>
          </div>
        </div>

        <h2 className='text-md font-semibold mb-3'>Recent Activity</h2>
        <div className='space-y-4'>
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700'
            >
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-medium'>Visitor Approved</h3>
                <span className='text-xs text-gray-500 white:text-gray-400'>2h ago</span>
              </div>
              <p className='text-sm text-gray-500 white:text-gray-400'>
                John Doe has been approved for entry on March 22, 2025.
              </p>
            </div>
          ))}
        </div>
      </div>

      <ResidentBottomNav onNavigate={onNavigate} activeTab='residentHome' />
    </div>
  )
}
