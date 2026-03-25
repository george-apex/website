'use client'

export function MarqueeTest() {
  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="w-[60px] h-[60px] bg-surface-800 border border-border rounded-xl overflow-hidden relative">
        <div className="flex items-center h-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-4xl font-bold text-content-primary uppercase flex">
            <span className="mr-4">THE LAST MILE</span>
            <span className="mr-4">THE LAST MILE</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
