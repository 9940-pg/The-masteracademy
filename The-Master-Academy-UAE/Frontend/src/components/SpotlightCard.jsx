// Clean card wrapper component
export default function SpotlightCard({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
