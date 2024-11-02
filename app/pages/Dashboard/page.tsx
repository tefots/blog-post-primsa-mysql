"use client";

import NavBar from "@/app/components/NavBar";
import SideBar from "@/app/components/Sidebar";
import { useState } from "react";
import AllPosts from "../AllPosts/page";
import Settings from "../Settings/page"; // Assuming you have a Settings component

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
            {/* sidebar */}
            <SideBar 
                isOpen={isSidebarOpen} 
                toggleSideBar={toggleSideBar} 
                onNavigate={handleNavigation} // Pass down the navigation function
            />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col h-full overflow-auto">
                {/* Navbar */}
                <NavBar toggleSideBar={toggleSideBar} />

                {/* Content - Responsive layout for posts */}
                <main className="flex-1 overflow-auto p-4">
                    {currentPage === 'posts' ? <AllPosts /> : <Settings />}
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
