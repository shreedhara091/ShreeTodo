import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-indigo-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>ShreeTodo</span>
        </div>
      <ul className="flex gap-5 mx-9 w-37.5">
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        
      </ul>
    </nav>
  )
}

export default Navbar
