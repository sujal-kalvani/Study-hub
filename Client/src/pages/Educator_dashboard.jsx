import React, { useState, useEffect } from 'react'
import SidebarItems from '../Components/Educator/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Educator_dashboard() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    return (
        <>
            <Navbar
                variant="dashboard"
                onMenuClick={() => setOpen(prev => !prev)}
                open={open}
            />

            <div className="flex min-h-[calc(130vh-120px)] pt-16 bg-slate-100">

                {/* Overlay (mobile) */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed lg:relative z-40
                        w-60 bg-white shadow-2xl
                        h-[calc(130vh-120px)]
                        transition-transform duration-300
                        ${open ? "translate-x-0" : "-translate-x-full"}
                        lg:translate-x-0
                    `}
                >
                    <div className="p-4 pt-6 overflow-y-auto">
                        <SidebarItems closeSidebar={() => setOpen(false)} />
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-10 lg:ml-10 overflow-scroll TABLE">
                    <Outlet />
                </main>

            </div>
        </>
    )
}
