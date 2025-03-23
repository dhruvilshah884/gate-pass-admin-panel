import { BottomNav } from '@/components/bottom-nav'

export function HomeScreen() {
  return (
    <div className='flex flex-col h-full bg-gray-50 white:bg-gray-900'>
      <div className='p-4 border-b border-gray-200 white:border-gray-800'>
        <h1 className='text-lg font-bold'>Home</h1>
      </div>

      <div className='flex-1 overflow-auto p-4'>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5].map(item => (
            <div
              key={item}
              className='bg-white white:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 white:border-gray-700'
            >
              <h3 className='font-medium mb-1'>Item {item}</h3>
              <p className='text-sm text-gray-500 white:text-gray-400'>
                This is a sample item in your feed. Pull to refresh or scroll for more content.
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
