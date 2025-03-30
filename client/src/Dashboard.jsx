import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [protectedData, setProtectedData] = useState('')

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch('/api/protected')
        if (response.ok) {
          const data = await response.json()
          setProtectedData(data.message)
        } else {
          setProtectedData('Not authorized or error fetching data.')
        }
      } catch (error) {
        setProtectedData('Network error.')
      }
    }
    fetchProtectedData()
  }, [])

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Dashboard</h1>
      <p>{protectedData}</p>
      {/* 
        actual app will go here with all the diff screens
      */}
    </div>
  )
}
