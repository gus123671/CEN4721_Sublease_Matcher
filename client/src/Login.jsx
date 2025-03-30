import React, { useState } from 'react'

export default function Login({ setIsLoggedIn, isRegisteringDefault = true }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(isRegisteringDefault)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      if (isRegistering) {
        // register
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        if (response.status === 201) {
          alert('User registered. Now please log in.')
          setIsRegistering(false)
        } else {
          const data = await response.json()
          setErrorMessage(data.message || 'Registration error')
        }
      } else {
        // login
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        if (response.ok) {
          // On successful login
          setIsLoggedIn(true)
        } else {
          const data = await response.json()
          setErrorMessage(data.message || 'Login error')
        }
      }
    } catch (error) {
      setErrorMessage('Network error')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {isRegistering ? 'Register' : 'Login'}
        </h1>

        {}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}

          {}
          <button type="submit" style={styles.submitButton}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        {}
        <p style={styles.toggleQuestion}>
          {isRegistering ? 'Already have an account?' : 'Need an account?'}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            style={styles.toggleButton}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: 'radial-gradient(circle at center, #ff9a9e, #fad0c4 50%, #fad0c4 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,      
    padding: '2rem',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: '400px',
    width: '100%',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 1.5rem',
    fontSize: '2rem',
    color: '#333',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    margin: '0 auto',   
    maxWidth: '300px',
    width: '100%',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
  submitButton: {
    background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(255, 94, 98, 0.3)',
    transition: 'transform 0.3s ease',
  },
  toggleQuestion: {
    marginTop: '1.5rem',
    color: '#555',
  },
  toggleButton: {
    marginLeft: '0.5rem',
    background: 'transparent',
    color: '#ff5e62',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
}
