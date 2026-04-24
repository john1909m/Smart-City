import { useState, useEffect, useCallback, useRef } from 'react'

const LEDPanel = () => {
  const [leds, setLeds] = useState({
    living: { on: true, brightness: 80, color: '#fbbf24' },
    kitchen: { on: true, brightness: 60, color: '#fef08a' },
    bedroom: { on: false, brightness: 40, color: '#c084fc' },
    garden: { on: true, brightness: 70, color: '#34d399' },
  })
  
  const [animation, setAnimation] = useState(null)
  const animationRef = useRef(null)

  const toggleLED = useCallback((id, turnOn) => {
    setLeds(prev => ({
      ...prev,
      [id]: { ...prev[id], on: turnOn }
    }))
  }, [])

  const setBrightness = useCallback((id, value) => {
    setLeds(prev => ({
      ...prev,
      [id]: { ...prev[id], brightness: parseInt(value) }
    }))
  }, [])

  const setColor = useCallback((id, color) => {
    setLeds(prev => ({
      ...prev,
      [id]: { ...prev[id], color }
    }))
  }, [])

  const startAnimation = useCallback((type) => {
    if (animationRef.current) clearInterval(animationRef.current)
    
    setAnimation(type)
    
    if (type === 'pulse') {
      let step = 0
      animationRef.current = setInterval(() => {
        setLeds(prev => {
          const brightness = Math.abs(Math.sin(step * 0.1)) * 100
          step++
          return {
            living: { ...prev.living, brightness: prev.living.on ? brightness : 0 },
            kitchen: { ...prev.kitchen, brightness: prev.kitchen.on ? brightness : 0 },
            bedroom: { ...prev.bedroom, brightness: prev.bedroom.on ? brightness : 0 },
            garden: { ...prev.garden, brightness: prev.garden.on ? brightness : 0 },
          }
        })
      }, 50)
    } 
    else if (type === 'wave') {
      let step = 0
      const order = ['living', 'kitchen', 'bedroom', 'garden']
      animationRef.current = setInterval(() => {
        setLeds(prev => {
          const newState = { ...prev }
          order.forEach((id, idx) => {
            const delay = (idx * 10)
            const brightness = Math.sin((step - delay) * 0.2) * 50 + 50
            if (newState[id].on) newState[id].brightness = Math.max(20, Math.min(100, brightness))
          })
          step++
          return newState
        })
      }, 80)
    }
    else if (type === 'rainbow') {
      let hue = 0
      animationRef.current = setInterval(() => {
        hue = (hue + 5) % 360
        setLeds(prev => ({
          ...prev,
          garden: { ...prev.garden, color: `hsl(${hue}, 100%, 60%)` }
        }))
      }, 100)
    }
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current)
      animationRef.current = null
    }
    setAnimation(null)
    // Reset brightness to defaults
    setLeds(prev => ({
      living: { ...prev.living, brightness: 80 },
      kitchen: { ...prev.kitchen, brightness: 60 },
      bedroom: { ...prev.bedroom, brightness: 40 },
      garden: { ...prev.garden, brightness: 70 },
    }))
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [])

  const ledConfigs = {
    living: { name: 'Living Room', icon: '🛋️', color: '#fbbf24' },
    kitchen: { name: 'Kitchen', icon: '🍳', color: '#fef08a' },
    bedroom: { name: 'Bedroom', icon: '🛏️', color: '#c084fc' },
    garden: { name: 'Garden', icon: '🌿', color: '#34d399' },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="gradient-text text-4xl font-semibold tracking-tight">💡 LED Control Panel</h1>
        <p className="text-gray-500 mt-1">Smart lighting system with animations</p>
      </div>

      {/* Animation Controls */}
      <div className="glass-card mb-8">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <h2 className="gradient-text text-xl font-medium">Lighting Animations</h2>
          </div>
        </div>
        <div className="p-5 flex flex-wrap gap-3">
          <button 
            onClick={() => startAnimation('pulse')}
            className="px-5 py-2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-500/30 transition-all"
          >
            🎭 Pulse
          </button>
          <button 
            onClick={() => startAnimation('wave')}
            className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-medium hover:bg-blue-500/30 transition-all"
          >
            🌊 Wave
          </button>
          <button 
            onClick={() => startAnimation('rainbow')}
            className="px-5 py-2 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 text-sm font-medium hover:bg-pink-500/30 transition-all"
          >
            🌈 Rainbow
          </button>
          <button 
            onClick={stopAnimation}
            className="px-5 py-2 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 text-sm font-medium hover:bg-gray-500/30 transition-all"
          >
            ⏹️ Stop
          </button>
          {animation && (
            <span className="text-xs text-green-400 self-center animate-pulse">
              ▶ Animation: {animation}
            </span>
          )}
        </div>
      </div>

      {/* LED Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(ledConfigs).map(([id, config]) => (
          <div key={id} className="glass-card">
            <div className="p-6 flex flex-col items-center text-center border-b border-white/5">
              <div 
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  leds[id].on ? 'shadow-2xl' : 'bg-gray-800'
                }`}
                style={{
                  background: leds[id].on 
                    ? `radial-gradient(circle, ${leds[id].color} 0%, ${leds[id].color}cc 70%)`
                    : 'radial-gradient(circle, #374151 0%, #1f2937 100%)',
                  boxShadow: leds[id].on ? `0 0 40px ${leds[id].color}` : 'none',
                  transform: leds[id].on ? 'scale(1.02)' : 'scale(1)',
                }}
                onClick={() => toggleLED(id, !leds[id].on)}
              >
                <span className="text-4xl">{config.icon}</span>
              </div>
              <h3 className="gradient-text text-lg font-medium mt-4">{config.name}</h3>
              <div className={`text-sm mt-1 ${leds[id].on ? 'text-green-400' : 'text-gray-500'}`}>
                {leds[id].on ? '● Active' : '○ Off'}
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleLED(id, true)}
                  className="flex-1 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium hover:bg-green-500/30 transition-all"
                >
                  Turn On
                </button>
                <button 
                  onClick={() => toggleLED(id, false)}
                  className="flex-1 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-all"
                >
                  Turn Off
                </button>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Brightness</span>
                  <span>{Math.round(leds[id].brightness)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={leds[id].brightness}
                  onChange={(e) => setBrightness(id, e.target.value)}
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  disabled={animation !== null}
                />
              </div>
              
              {id === 'garden' && (
                <div>
                  <div className="text-xs text-gray-500 mb-2">Color Mode</div>
                  <div className="flex gap-2 flex-wrap">
                    {['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff', '#ff8844'].map(color => (
                      <button
                        key={color}
                        onClick={() => setColor(id, color)}
                        className="w-8 h-8 rounded-full border-2 border-white/30 hover:scale-110 transition-transform"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LEDPanel