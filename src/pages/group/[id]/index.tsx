'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Send, Users } from 'lucide-react'

// Mock data - replace with actual API calls
const mockGroup = {
  _id: '1',
  name: 'Building A Residents',
  type: 'RESIDANCE',
  members: Array(12).fill({}),
  flat: { name: 'Building A' }
}

const mockMessages = [
  {
    _id: '1',
    text: 'Hello everyone!',
    sender: { _id: '101', name: 'John Doe' },
    timestamp: new Date(Date.now() - 3600000 * 2)
  },
  {
    _id: '2',
    text: 'Welcome to the group chat!',
    sender: { _id: '102', name: 'Jane Smith' },
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    _id: '3',
    text: 'Is anyone having issues with the elevator?',
    sender: { _id: '103', name: 'Mike Johnson' },
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    _id: '4',
    text: "Yes, it's been slow today.",
    sender: { _id: '101', name: 'John Doe' },
    timestamp: new Date(Date.now() - 900000)
  },
  {
    _id: '5',
    text: "I'll report it to management.",
    sender: { _id: '104', name: 'Sarah Williams' },
    timestamp: new Date(Date.now() - 600000)
  },
  {
    _id: '6',
    text: 'Thank you Sarah!',
    sender: { _id: '103', name: 'Mike Johnson' },
    timestamp: new Date(Date.now() - 300000)
  }
]

// For demo purposes, we'll use a fixed user ID
const currentUserId = '101'

export default function GroupChatPage() {
  const params = useParams()
  const { id } = params
  const [group, setGroup] = useState(null) as any
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null) as any

  useEffect(() => {
    // Replace with actual API calls
    const fetchGroupAndMessages = async () => {
      try {
        // const groupResponse = await fetch(`/api/groups/${id}`)
        // const groupData = await groupResponse.json()
        // setGroup(groupData)

        // const messagesResponse = await fetch(`/api/messages/${id}`)
        // const messagesData = await messagesResponse.json()
        // setMessages(messagesData)

        // Using mock data for now
        setGroup(mockGroup as any)
        setMessages(mockMessages as any)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchGroupAndMessages()
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageData = {
      text: newMessage,
      group: id,
      sender: currentUserId,
      timestamp: new Date()
    }

    // Optimistically update UI
    const optimisticMessage = {
      _id: Date.now().toString(),
      text: newMessage,
      sender: { _id: currentUserId, name: 'John Doe' }, // Replace with actual user data
      timestamp: new Date(),
      pending: true
    }

    setMessages([...messages, optimisticMessage] as any)
    setNewMessage('')

    try {
      // Replace with actual API call
      // const response = await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(messageData),
      // })

      // if (!response.ok) throw new Error('Failed to send message')
      // const data = await response.json()

      // Update messages with the actual message from the server
      // setMessages(messages => messages.map(msg =>
      //   msg._id === optimisticMessage._id ? data : msg
      // ))

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Remove pending state
      setMessages((messages: any) =>
        messages.map((msg: any) => (msg._id === optimisticMessage._id ? { ...msg, pending: false } : msg))
      )
    } catch (error) {
      console.error('Error sending message:', error)
      // Remove the optimistic message on error
      setMessages((messages: any) => messages.filter((msg: any) => msg._id !== optimisticMessage._id))
    }
  }

  const formatTime = (date: any) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString()
  }

  const isNewDay = (current: any, previous: any) => {
    if (!previous) return true
    const currentDate = new Date(current.timestamp).toDateString()
    const previousDate = new Date(previous.timestamp).toDateString()
    return currentDate !== previousDate
  }

  if (loading) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex items-center mb-4'>
          <Link href='/group'>
            <Button variant='ghost' size='icon' className='mr-2'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <Skeleton className='h-8 w-48' />
        </div>
        <Card className='h-[calc(100vh-180px)] flex flex-col'>
          <div className='flex-1 p-4 overflow-y-auto'>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className='flex items-start gap-2 mb-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-16 w-64' />
                </div>
              </div>
            ))}
          </div>
          <div className='p-4 border-t'>
            <Skeleton className='h-12 w-full' />
          </div>
        </Card>
      </div>
    )
  }

  if (!group) {
    return (
      <div className='container mx-auto py-10 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Group not found</h2>
        <p className='mb-6'>The group you're looking for doesn't exist or you don't have access.</p>
        <Link href='/groups'>
          <Button>Back to Groups</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <Link href='/groups'>
            <Button variant='ghost' size='icon' className='mr-2'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-xl font-bold'>{group.name}</h1>
        </div>
        <div className='flex items-center text-sm text-muted-foreground'>
          <Users className='h-4 w-4 mr-1' />
          {group.members.length} members
        </div>
      </div>

      <Card className='h-[calc(100vh-180px)] flex flex-col'>
        <div className='flex-1 p-4 overflow-y-auto'>
          {messages.map((message: any, index: any) => {
            const isCurrentUser = message.sender._id === currentUserId
            const showDateDivider = isNewDay(message, messages[index - 1])

            return (
              <div key={message._id}>
                {showDateDivider && (
                  <div className='flex justify-center my-4'>
                    <div className='bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground'>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                )}

                <div className={`flex items-start gap-2 mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  {!isCurrentUser && (
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender.name} />
                      <AvatarFallback>
                        {message.sender.name
                          .split(' ')
                          .map((n: any) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[75%] ${isCurrentUser ? 'text-right' : ''}`}>
                    {!isCurrentUser && <div className='text-sm font-medium mb-1'>{message.sender.name}</div>}
                    <div
                      className={`inline-block rounded-lg px-4 py-2 text-sm ${
                        isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      } ${message.pending ? 'opacity-70' : ''}`}
                    >
                      {message.text}
                    </div>
                    <div className='text-xs text-muted-foreground mt-1'>
                      {formatTime(message.timestamp)}
                      {message.pending && ' • Sending...'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className='p-4 border-t'>
          <form onSubmit={handleSendMessage} className='flex gap-2'>
            <Input
              placeholder='Type your message...'
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className='flex-1'
            />
            <Button type='submit' size='icon' disabled={!newMessage.trim()}>
              <Send className='h-4 w-4' />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
