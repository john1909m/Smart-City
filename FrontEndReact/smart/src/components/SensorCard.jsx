import { Line } from 'react-chartjs-2'
import { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const SensorCard = ({ title, icon, unit, data, color, borderColor }) => {
  const [displayData, setDisplayData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef()

  // Initialize display data
  useEffect(() => {
    if (data && data.length > 0) {
      setDisplayData([...data])
    }
  }, [data])

  // Effect to cycle through values and update chart
  useEffect(() => {
    if (displayData.length === 0) return

    intervalRef.current = setInterval(() => {
      setIsAnimating(true)
      
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + 1
        if (newIndex >= displayData.length) {
          newIndex = 0
        }
        
        // Update the chart data
        setDisplayData(prevData => {
          const newData = [...prevData]
          const currentRecord = newData[newIndex]
          
          // Create a new timestamp
          const newTimestamp = new Date()
          
          // Add a new record
          const newRecord = {
            ...currentRecord,
            id: Date.now(),
            timestamp: newTimestamp,
            value: currentRecord.value
          }
          
          newData.push(newRecord)
          if (newData.length > 10) {
            newData.shift()
          }
          
          return newData
        })
        
        return newIndex
      })
      
      setTimeout(() => setIsAnimating(false), 300)
    }, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [displayData.length])

  const chartDataForDisplay = [...displayData].slice(-8).reverse()
  
  const chartData = {
    labels: chartDataForDisplay.map((d, idx) => {
      if (idx === chartDataForDisplay.length - 1 && isAnimating) {
        return 'NOW'
      }
      const date = new Date(d.timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }),
    datasets: [{
      label: `${title} (${unit})`,
      data: chartDataForDisplay.map(d => d.value),
      borderColor: borderColor,
      backgroundColor: `${borderColor}10`,
      fill: true,
      tension: 0.4,
      pointRadius: (context) => {
        const index = context.dataIndex
        if (index === chartDataForDisplay.length - 1 && isAnimating) {
          return 6
        }
        if (index === chartDataForDisplay.length - 1) {
          return 4
        }
        return 3
      },
      pointBackgroundColor: (context) => {
        const index = context.dataIndex
        if (index === chartDataForDisplay.length - 1 && isAnimating) {
          return '#f59e0b'
        }
        if (index === chartDataForDisplay.length - 1) {
          return borderColor
        }
        return `${borderColor}80`
      },
      pointBorderColor: '#fff',
      pointBorderWidth: (context) => {
        const index = context.dataIndex
        if (index === chartDataForDisplay.length - 1 && isAnimating) {
          return 2
        }
        return 1
      },
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true, // THIS IS KEY - prevents overflow
    animation: {
      duration: 400,
      easing: 'easeOutQuad',
    },
    plugins: {
      legend: { 
        labels: { 
          color: '#94a3b8', 
          font: { size: 10 } 
        } 
      },
      tooltip: { 
        mode: 'index', 
        intersect: false,
      }
    },
    scales: {
      y: { 
        grid: { color: '#ffffff10' }, 
        ticks: { color: '#7e8c9e' },
        suggestedMin: title.toLowerCase().includes('temp') ? 18 : 
                      title.toLowerCase().includes('humid') ? 40 : 0,
        suggestedMax: title.toLowerCase().includes('temp') ? 35 :
                      title.toLowerCase().includes('humid') ? 80 : 100,
      },
      x: { 
        ticks: { 
          color: '#7e8c9e', 
          maxRotation: 45, 
          minRotation: 45,
          autoSkip: true,
        },
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 5
      }
    }
  }

  const currentRecord = displayData.length > 0 ? displayData[displayData.length - 1] : null
  const currentValue = currentRecord?.value

  return (
    <div className={`glass-card transition-all duration-300 ${isAnimating ? 'ring-2 ring-blue-500/50' : ''}`}>
      <div className="p-5 border-b border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className={`text-3xl transition-all ${isAnimating ? 'animate-pulse' : ''}`}>
              {icon}
            </span>
            <div>
              <h2 className="gradient-text text-xl font-medium">{title}</h2>
              <p className="text-xs text-gray-500">{unit}</p>
            </div>
          </div>
          {currentValue && (
            <div className="text-right">
              <div className={`text-2xl font-bold ${color} transition-all duration-300 ${isAnimating ? 'scale-110 text-orange-400' : ''}`}>
                {currentValue.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                <div className={`w-1.5 h-1.5 rounded-full ${isAnimating ? 'bg-orange-500 animate-ping' : 'bg-green-500'}`}></div>
                <span className={isAnimating ? 'text-orange-500 font-bold' : 'text-gray-500'}>
                  {isAnimating ? 'UPDATING...' : 'Current'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed height container with overflow hidden */}
      <div className="p-4" style={{ height: '200px', overflow: 'hidden' }}>
        {chartDataForDisplay.length > 0 ? (
          <div style={{ height: '100%', width: '100%' }}>
            <Line 
              key={displayData.length} 
              data={chartData} 
              options={options}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Loading chart...
          </div>
        )}
      </div>
      
      <div className="px-5 pb-4">
        <div className="text-xs text-gray-500 mb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>📈 Chart cycling</span>
            <span className="text-orange-400 text-xs">● MOVING</span>
          </div>
          <span className="bg-white/5 px-2 py-0.5 rounded-full text-xs">
            {displayData.length} records
          </span>
        </div>
        
        <div className="max-h-48 overflow-y-auto scrollbar-thin">
          <table className="w-full text-xs">
            <thead className="text-gray-500 border-b border-white/5">
              <tr>
                <th className="text-left py-2">ID</th>
                <th className="text-left">Value</th>
                <th className="text-left">Status</th>
                <th className="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {[...displayData].slice(-8).reverse().map((record, idx) => {
                const isLatest = idx === 0
                return (
                  <tr 
                    key={record.id} 
                    className={`border-b border-white/5 transition-all duration-300 ${
                      isLatest && isAnimating ? 'bg-orange-500/20' : ''
                    } ${isLatest && !isAnimating ? 'bg-blue-500/5' : 'hover:bg-white/5'}`}
                  >
                    <td className="py-2 text-gray-400">
                      {record.id}
                      {isLatest && (
                        <span className="ml-2 text-[10px] text-orange-500">
                          ⭐ CURRENT
                        </span>
                      )}
                    </td>
                    <td className={`font-medium ${
                      isLatest ? 'text-orange-400 text-base font-bold' : 'text-gray-300'
                    }`}>
                      {record.value?.toFixed(2)}
                    </td>
                    <td>
                      {isLatest ? (
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-500">Live</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600">Recorded</span>
                      )}
                    </td>
                    <td className="text-gray-500 text-xs">
                      {new Date(record.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-3 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-[10px] text-gray-500">
            <span>🔄 Chart updates every 2 seconds</span>
            <div className="flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
              <span>auto-refresh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorCard