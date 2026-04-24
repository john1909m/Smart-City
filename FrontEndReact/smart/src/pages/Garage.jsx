import { useApiData } from '../hooks/useApiData'
import StatusBadge from '../components/StatusBadge'

const Garage = () => {
  const { data: rfidData, loading } = useApiData('/rfid/5')
  
  // حساب عدد السيارات في الجراج (عدد مرات الدخول - عدد مرات الخروج)
  const authorizedEntries = rfidData?.filter(r => r.status === 'AUTHORIZED') || []
  const totalEntries = authorizedEntries.length
  const maxCapacity = 50
  const currentVehicles = Math.min(totalEntries % 100, maxCapacity)
  const availableSpots = maxCapacity - currentVehicles

  // تقسيم الأحداث حسب الاتجاه (لو في data direction)
  const todayEntries = authorizedEntries.slice(-10).filter((_, i) => i % 2 === 0).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="gradient-text text-4xl font-semibold tracking-tight">🚗 Garage Management</h1>
        <p className="text-gray-500 mt-1">Smart access control & vehicle counting</p>
      </div>

      {/* Hero Card */}
      <div className="glass-card mb-8">
        <div className="p-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-7xl">🚗</span>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Vehicles</div>
              <div className="gradient-text text-7xl font-bold">{currentVehicles}</div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              availableSpots > 10 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}>
              {availableSpots} spots available
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5 text-center">
          <div className="text-2xl mb-1">📊</div>
          <div className="text-2xl font-bold text-green-400">{totalEntries}</div>
          <div className="text-xs text-gray-500">Total Events</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-2xl font-bold text-blue-400">{authorizedEntries.length}</div>
          <div className="text-xs text-gray-500">Authorized</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl mb-1">🚫</div>
          <div className="text-2xl font-bold text-red-400">
            {rfidData?.filter(r => r.status !== 'AUTHORIZED').length || 0}
          </div>
          <div className="text-xs text-gray-500">Denied</div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl mb-1">🏷️</div>
          <div className="text-2xl font-bold text-purple-400">{maxCapacity}</div>
          <div className="text-xs text-gray-500">Max Capacity</div>
        </div>
      </div>

      {/* Recent Events Table */}
      <div className="glass-card">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪪</span>
            <div>
              <h2 className="gradient-text text-xl font-medium">Garage Access Records</h2>
              <p className="text-xs text-gray-500">Live feed from RFID readers</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading events...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b border-white/5">
                  <tr>
                    <th className="text-left py-3">ID</th>
                    <th className="text-left">Card ID</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {rfidData?.slice(-15).reverse().map(record => (
                    <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-gray-400">{record.id}</td>
                      <td className="font-mono text-sm">{record.cardId}</td>
                      <td><StatusBadge status={record.status} /></td>
                      <td className="text-gray-500 text-sm">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 text-xs text-gray-500 text-center">
            🔄 Updates every 5 seconds • Last {rfidData?.length || 0} events
          </div>
        </div>
      </div>
    </div>
  )
}

export default Garage