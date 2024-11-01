"use client";

import NavBar from "@/app/components/NavBar";
import SideBar from "@/app/components/Sidebar";
import { useState } from "react";
import AllPosts from "../AllPosts/page";

const DashBoard: React.FC = () =>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSideBar =() => setIsSidebarOpen(!isSidebarOpen);

    return(

        <div className="relative flex w-full h-screen">
        {/* sidebar */}
            <SideBar isOpen={isSidebarOpen} toggleSideBar={toggleSideBar}/>
        

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col h-full overflow-auto">
                {/* Navbar */}
                <NavBar toggleSideBar={toggleSideBar} />

                {/* Content - Responsive layout for posts */}
                <main className="flex-1 overflow-auto p-4">
                    <AllPosts />
                </main>
            </div>

        {/* overlay for sidebar on small screens */}
        {isSidebarOpen && (

            <div className="fixed w-full inset-0 opacity-50 z-10 md:hidden " onClick={toggleSideBar}>

            </div>
        )}

        </div>
    )
}

export default DashBoard;