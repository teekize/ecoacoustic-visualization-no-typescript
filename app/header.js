"use client"
import React from 'react'
import Link from 'next/link'


function NavBar() {
  return (
    <div className="navbar bg-[#316459] mb-2 rounded-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Custom Impementation</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>

    <Link href="/" className="btn  text-xl bg-slate-100">Listen to Nature&apos;s Symphony</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        
      <li><Link href="/sound/custom">Custom Impementation</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">{""}</a>
  </div>
</div>
  )
}

export default NavBar