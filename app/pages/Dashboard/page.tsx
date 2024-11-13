"use client";

import NavBar from "@/app/components/NavBar";
import { useState } from "react";
import AllPosts from "../AllPosts/page";


const DashBoard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('posts'); // State to track the current page

    const toggleSideBar = () => setIsSidebarOpen(!isSidebarOpen);
    
    // Function to handle navigation
    const handleNavigation = (page: string) => {
        setCurrentPage(page);
        setIsSidebarOpen(false); // Close sidebar on navigation
    };

    return (
        <div className="relative flex w-full h-screen">
          
            {/* Main Content Area */}
            <div className="flex flex-1 flex-col h-full overflow-auto">
                {/* Navbar */}
                <NavBar  />

                <main className="flex-1 overflow-auto p-4">
                    <AllPosts />  
                </main>
            </div>

            {/* overlay for sidebar on small screens */}
            {isSidebarOpen && (
                <div className="fixed w-full inset-0 opacity-50 z-10 md:hidden" onClick={toggleSideBar}></div>
            )}
        </div>
    )
}

export default DashBoard;
