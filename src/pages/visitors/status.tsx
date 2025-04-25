import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const VisitorStatusPage = () => {
  const router = useRouter()
  const { id, status } = router.query
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState('')
  const [bgColor, setBgColor] = useState('#ffffff')

  useEffect(() => {
    if (id && status) {
      fetch(`/api/visitor/update-status?id=${id}&status=${status}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            if (status === 'approved') {
              setMessage('✅ Visitor Approved')
              setImage('/approved.png')
              setBgColor('#d4edda') // light green
            } else {
              setMessage('❌ Visitor Denied')
              setImage('/denied.png')
              setBgColor('#f8d7da') // light red
            }
          } else {
            setMessage('⚠️ Something went wrong')
            setImage('/error.png')
            setBgColor('#fff3cd') // warning yellow
          }
        })
        .catch(() => {
          setMessage('❌ Error while processing request')
          setImage('/error.png')
          setBgColor('#f8d7da')
        })
        .finally(() => setLoading(false))
    }
  }, [id, status])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          textAlign: 'center'
        }}
      >
        {loading ? (
          <p style={{ fontSize: '1.5rem', color: '#555' }}>Processing...</p>
        ) : (
          <>
            {image && <img src={image} alt='status' style={{ width: '120px', marginBottom: '20px' }} />}
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '10px' }}>{message}</h1>
            <p style={{ color: '#666', fontSize: '1rem' }}>You can close this window now.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default VisitorStatusPage
