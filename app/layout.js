import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './header'
import SideBar from './sideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EcoAcoustics',
  description: 'listen to earth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className= "bg-gradient-custom min-h-screen">
        <NavBar />
        <div className='flex justify-between w-[100%]'>
        <SideBar />
        <div className=' min-h-screen bg-slate-200 w-[100%]'>
        {children}
        </div>
        </div>
        </body>

    </html>
  )
}
