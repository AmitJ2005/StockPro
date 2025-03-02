export function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Abstract shapes */}
      <svg className="absolute text-green-100 top-0 left-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,1000 C200,800 350,750 500,750 C650,750 800,800 1000,1000" fill="currentColor" />
        <path d="M0,1000 C150,850 300,800 450,800 C600,800 750,850 1000,1000" fill="currentColor" opacity="0.5" />
        <path d="M0,1000 C100,900 250,850 400,850 C550,850 700,900 1000,1000" fill="currentColor" opacity="0.25" />
      </svg>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-50 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-yellow-200 rounded-full opacity-50 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-purple-200 rounded-full opacity-50 animate-float"></div>

      {/* Stock chart lines */}
      <svg className="absolute text-gray-200 bottom-0 left-0 w-full h-1/3" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,300 L50,280 L100,290 L150,250 L200,270 L250,240 L300,260 L350,220 L400,240 L450,200 L500,230 L550,210 L600,240 L650,200 L700,220 L750,180 L800,210 L850,170 L900,190 L950,150 L1000,170" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,300 L50,260 L100,280 L150,240 L200,260 L250,220 L300,240 L350,200 L400,220 L450,180 L500,210 L550,190 L600,220 L650,180 L700,200 L750,160 L800,190 L850,150 L900,170 L950,130 L1000,150" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  )
}

