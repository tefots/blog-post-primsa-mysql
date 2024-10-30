"use client";

import NavBar from "@/app/components/NavBar";
import SideBar from "@/app/components/Sidebar";
import { useState } from "react";

const DashBoard: React.FC = () =>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSideBar =() => setIsSidebarOpen(!isSidebarOpen);

    return(

        <div className="relative flex w-full h-screen">
        {/* sidebar */}
            <SideBar isOpen={isSidebarOpen} toggleSideBar={toggleSideBar}/>
        

        {/* navbar */}
        <section className="flex flex-col flex-1">
            <NavBar toggleSideBar={toggleSideBar}/>
        </section>

        {/* overlay for sidebar on small screens */}
        {isSidebarOpen && (

            <div className="fixed w-full inset-0 opacity-50 z-10 md:hidden " onClick={toggleSideBar}>

            </div>
        )}

        </div>
    )
}

export default DashBoard;