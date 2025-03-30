import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import IntroductionPage from './IntroductionPage'
import './App.css'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleShowLogin = () => {
    setIsRegistering(false)
    setShowIntro(false)
  }

  const handleSignupClick = () => {
    setIsRegistering(true)
    setShowIntro(false)
  }

  if (isLoggedIn)
  {
    return <Dashboard/>
  }

  return (
    <div>
      {showIntro ? (
        <IntroductionPage 
        onLoginClick={handleShowLogin}
        onSignupClick={handleSignupClick}
         />
      ) : (
        <Login isRegisteringDefault={isRegistering} />
      )}
    </div>
  )
}

// export default App
