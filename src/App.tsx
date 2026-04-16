import  Guest  from './components/Guest'
import Profile from './components/Profile'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './app/hooks'

function App() {
  const token = useAppSelector((state) => state.token)

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/profile" replace /> : <Guest />} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/" replace/>} />
    </Routes>
  )
}

export default App
