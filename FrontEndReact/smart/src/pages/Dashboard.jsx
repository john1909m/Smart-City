import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SensorCard from '../components/SensorCard'
import StatusBadge from '../components/StatusBadge'
import { useApiData } from '../hooks/useApiData'

const Dashboard = () => {
  const { data: co2Data, loading: co2Loading } = useApiData('/readings/2')
  const { data: humidityData } = useApiData('/readings/3')
  const { data: rainData } = useApiData('/readings/4')
  const { data: rfidData } = useApiData('/rfid/5')
  
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const totalPoints = (co2Data?.length || 0) + (humidityData?.length || 0) + (rainData?.length || 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="gradient-text text-4xl font-semibold tracking-tight">Smart Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time environmental monitoring</p>
        </div>
        <div className="flex gap-3">
          <Link to="/garage" className="px-4 py-2 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 text-sm font-medium hover:bg-green-500/25 transition-all">
            🚗 Go to Garage
          </Link>
          <Link to="/led-panel" className="px-4 py-2 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-500/25 transition-all">
            💡 LED Control
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="glass-card px-5 py-3 rounded-2xl">
          <div className="text-xs text-gray-500 uppercase tracking-wide">System</div>
          <div className="text-green-400 font-medium">● Operational</div>
        </div>
        <div className="glass-card px-5 py-3 rounded-2xl">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Last Update</div>
          <div className="text-gray-300 text-sm">{lastUpdate.toLocaleTimeString()}</div>
        </div>
        <div className="glass-card px-5 py-3 rounded-2xl">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Data Points</div>
          <div className="text-gray-300 text-sm">{totalPoints.toLocaleString()}</div>
        </div>
        <div className="glass-card px-5 py-3 rounded-2xl">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Garage Entry</div>
          <div className="text-gray-300 text-sm">
            {rfidData?.filter(r => r.status === 'AUTHORIZED').length || 0}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SensorCard 
          title="CO₂ Sensor" icon="🌫️" unit="ppm" 
          data={co2Data} color="text-blue-400" borderColor="#60a5fa"
        />
        <SensorCard 
          title="Humidity" icon="💧" unit="%" 
          data={humidityData} color="text-green-400" borderColor="#34d399"
        />
        <SensorCard 
          title="Rain Sensor" icon="☔" unit="mm" 
          data={rainData} color="text-purple-400" borderColor="#a78bfa"
        />
        
        {/* RFID Card */}
        <div className="glass-card">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪪</span>
              <div>
                <h2 className="gradient-text text-xl font-medium">RFID Access</h2>
                <p className="text-xs text-gray-500">Recent events</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b border-white/5">
                  <tr>
                    <th className="text-left py-2">Card</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {rfidData?.slice(-8).reverse().map(record => (
                    <tr key={record.id} className="border-b border-white/5">
                      <td className="py-3 font-mono text-xs">{record.cardId}</td>
                      <td><StatusBadge status={record.status} /></td>
                      <td className="text-gray-500 text-xs">
                        {new Date(record.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard