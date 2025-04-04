'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusCircle, Users } from 'lucide-react'

// Mock data - replace with actual API calls
const mockGroups = [
  {
    _id: '1',
    name: 'Building A Residents',
    type: 'RESIDANCE',
    members: Array(12).fill({}),
    flat: { name: 'Building A' }
  },
  {
    _id: '2',
    name: 'Security Chat',
    type: 'RESIDANCE-SECURITY',
    members: Array(8).fill({}),
    flat: { name: 'Building B' }
  },
  { _id: '3', name: 'Floor 3 Group', type: 'RESIDANCE', members: Array(5).fill({}), flat: { name: 'Building A' } }
]

export default function GroupsPage() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with actual API call
    const fetchGroups = async () => {
      try {
        // const response = await fetch('/api/groups')
        // const data = await response.json()
        // setGroups(data)
        setGroups(mockGroups as any)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching groups:', error)
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  return (
    <div className='container mx-auto py-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>All Groups</h1>
        <Link href='/group/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Create Group
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <Card key={i} className='overflow-hidden'>
              <CardHeader className='pb-2'>
                <Skeleton className='h-5 w-1/2 mb-2' />
                <Skeleton className='h-4 w-3/4' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 w-full mb-2' />
                <Skeleton className='h-4 w-2/3' />
              </CardContent>
              <CardFooter>
                <Skeleton className='h-10 w-full' />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {groups.map((group: any) => (
            <Card key={group._id} className='overflow-hidden'>
              <CardHeader className='pb-2'>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.flat.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-2 mb-2'>
                  <Badge variant={group.type === 'RESIDANCE' ? 'default' : 'secondary'}>
                    {group.type === 'RESIDANCE' ? 'Residents' : 'Residents & Security'}
                  </Badge>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Users className='h-3.5 w-3.5 mr-1' />
                    {group.members.length} members
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/group/${group._id}`} className='w-full'>
                  <Button variant='outline' className='w-full'>
                    Open Chat
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {groups.length === 0 && (
            <div className='col-span-full text-center py-10'>
              <h3 className='text-lg font-medium mb-2'>No groups found</h3>
              <p className='text-muted-foreground mb-6'>Create your first group to get started</p>
              <Link href='/groups/create'>
                <Button>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  Create Group
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
