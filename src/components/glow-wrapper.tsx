import React from 'react'

const Glow = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="relative">
    <div className="absolute bg-gradient-to-r animate-pulse from-blue-600 to-purple-600 -inset-0.5 blur opacity-75"></div>
    {children}
    </div>
  )
}

export default Glow