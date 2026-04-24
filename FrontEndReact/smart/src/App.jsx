import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Garage from './pages/Garage'
import LEDPanel from './pages/LEDPanel'

function App() {
  return (
    <div className="min-h-screen bg-[#05070a] relative overflow-x-hidden">
      {/* Animated Orb Backgrounds */}
      <div className="fixed top-[-30vw] left-[-20vw] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[80px] orb-animate pointer-events-none" />
      <div className="fixed bottom-[-30vw] right-[-20vw] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[80px] orb-animate pointer-events-none animation-reverse" />
      
      <Navbar />
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/led-panel" element={<LEDPanel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App