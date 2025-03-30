import React from 'react'

export default function IntroductionPage({ onLoginClick, onSignupClick }) {
  return (
    <div style={styles.container}>
      {}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Sublease Matcher!</h1>
        <p style={styles.subtitle}>
          Start your journey with us today.
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={onLoginClick}>
            Login
          </button>
          <button style={styles.button} onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
      </div>

      {}
      <div style={{ ...styles.wave, ...styles.waveBottom }} />
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse at center, #ff9a9e 0%, #fad0c4 45%, #fad0c4 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    position: 'relative',
    zIndex: 2,           
    maxWidth: '600px',
    padding: '2rem',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1.125rem',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #FFD194, #D1913C)',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
  },

  wave: {
    position: 'absolute',
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    animation: 'waveAnimation 10s ease-in-out infinite alternate',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='320' viewBox='0 0 1440 320' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' fill-opacity='0.75' d='M0,64L80,96C160,128,320,192,480,224C640,256,800,256,960,224C1120,192,1280,128,1360,96L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  waveBottom: {
    bottom: 0,
  },
}
