import React from 'react'
import SidebarItems from '../Components/Educator/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Educator_dashboard() {
    return (
        <>
            <div className='min-h-[calc(100vh-120px)] flex'>

                <aside className={`min-h-full w-full max-w-60 customShadow pt-20 bg-white shadow-2xl absolute lg:relative`}>

                    <div className='p-4 flex flex-col gap-1'>
                        <SidebarItems />
                    </div>

                </aside>

                <main className='w-full p-4 bg-slate-100'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}