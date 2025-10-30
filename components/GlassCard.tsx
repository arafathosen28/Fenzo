export function GlassCard({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`glass rounded-2xl p-4 ${className}`}>{children}</div>
}
