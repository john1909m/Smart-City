import { Line } from 'react-chartjs-2'
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
  const latestData = [...data].slice(-8).reverse()
  
  const chartData = {
    labels: latestData.map(d => {
      const date = new Date(d.timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }),
    datasets: [{
      label: `${title} (${unit})`,
      data: latestData.map(d => d.value),
      borderColor: borderColor,
      backgroundColor: `${borderColor}10`,
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 5,
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { size: 10 } } },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { grid: { color: '#ffffff10' }, ticks: { color: '#7e8c9e' } },
      x: { ticks: { color: '#7e8c9e', maxRotation: 45, minRotation: 45 } }
    }
  }

  const latestValue = data.length > 0 ? data[data.length - 1]?.value : null

  return (
    <div className="glass-card">
      <div className="p-5 border-b border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h2 className="gradient-text text-xl font-medium">{title}</h2>
              <p className="text-xs text-gray-500">{unit}</p>
            </div>
          </div>
          {latestValue && (
            <div className="text-right">
              <div className={`text-2xl font-bold ${color}`}>{latestValue.toFixed(1)}</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 h-48">
        {data.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Loading chart...
          </div>
        )}
      </div>
      
      <div className="px-5 pb-4">
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
          <span>Latest readings</span>
          <span>{data.length} records</span>
        </div>
        <div className="max-h-48 overflow-y-auto scrollbar-thin">
          <table className="w-full text-xs">
            <thead className="text-gray-500 border-b border-white/5">
              <tr>
                <th className="text-left py-2">ID</th>
                <th className="text-left">Value</th>
                <th className="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {[...data].slice(-5).reverse().map(record => (
                <tr key={record.id} className="border-b border-white/5">
                  <td className="py-2 text-gray-400">{record.id}</td>
                  <td className="text-gray-300">{record.value?.toFixed(2)}</td>
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
  )
}

export default SensorCard