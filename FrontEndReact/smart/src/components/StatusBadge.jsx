const StatusBadge = ({ status }) => {
  const isAuthorized = status?.toUpperCase() === 'AUTHORIZED'
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isAuthorized 
        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
        : 'bg-red-500/20 text-red-400 border border-red-500/30'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isAuthorized ? 'bg-green-400' : 'bg-red-400'}`} />
      {isAuthorized ? 'Authorized' : 'Denied'}
    </span>
  )
}

export default StatusBadge