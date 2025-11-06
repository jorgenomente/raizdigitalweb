export const RaizLoader = () => {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-3 h-3 rounded-full bg-[var(--neural-cyan)] animate-network-pulse"
        style={{ animationDelay: '0s' }}
      ></div>
      <div 
        className="w-3 h-3 rounded-full bg-[var(--neural-cyan)] animate-network-pulse"
        style={{ animationDelay: '0.3s' }}
      ></div>
      <div 
        className="w-3 h-3 rounded-full bg-[var(--neural-cyan)] animate-network-pulse"
        style={{ animationDelay: '0.6s' }}
      ></div>
    </div>
  );
};
