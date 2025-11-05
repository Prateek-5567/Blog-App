import React from 'react'

function Logo({
  size = "h-8 w-8",          // use h-6 w-6 or h-10 w-10 as needed
  rounded = "rounded-full",  // use "rounded-md" for a square look
  bg = "bg-blue-600",        // change to your brand color
  text = "text-white",       // change to "text-black" etc.
  className = "",
}) {
  return (
    <div
      className={`inline-flex ${size} ${rounded} ${bg} ${text} items-center justify-center font-extrabold leading-none select-none ${className}`}
      aria-label="PB logo"
    >
      <span className="text-[0.95rem]">PB</span>
    </div>
  );
}

export default Logo
