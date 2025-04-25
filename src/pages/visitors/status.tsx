// pages/visitor/status.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const VisitorStatusPage = () => {
  const router = useRouter()
  const { id, status } = router.query
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id && status) {
      fetch(`/api/visitor/update-status?id=${id}&status=${status}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setMessage(status === 'approved' ? '✅ Visitor Approved' : '❌ Visitor Denied')
          } else {
            setMessage('⚠️ Something went wrong')
          }
        })
        .catch(() => setMessage('❌ Error while processing request'))
        .finally(() => setLoading(false))
    }
  }, [id, status])

  return <div style={{ textAlign: 'center', padding: '50px' }}>{loading ? <p>Loading...</p> : <h1>{message}</h1>}</div>
}

export default VisitorStatusPage
