import Link from "next/link";
import { FaHome, FaCog, FaClipboardList, FaSignOutAlt, FaList, FaTimes } from "react-icons/fa";

// Interface for Sidebar props
interface SideBarProps {
    isOpen: boolean;
    toggleSideBar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSideBar }) => {
    return (
        <>
            {/* Sidebar container */}
            <div className={`fixed inset-y-0 left-0 z-20 bg-[#008080] p-5 flex flex-col h-full items-center transform md:relative md:translate-x-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:w-1/4`}>
                {/* Close button on small screens */}
                <button onClick={toggleSideBar} className="absolute top-5 right-5 text-white md:hidden">
                    <FaTimes className="h-6 w-6" />
                </button>
                
                <div className="text-white text-2xl mt-6 font-bold text-center mb-8">
                    <h1>Blog Post Platform</h1>
                </div>
                {/* Links */}
                <div className="flex-grow">
                    <ul className="text-white space-y-10">
                        <li className="flex items-center">
                            <FaHome className="mx-2 h-6" />
                            <Link href="/" className="ml-2">Home</Link>
                        </li>
                        <li className="flex items-center">
                            <FaClipboardList className="mx-2 h-5" />
                            <Link href="/" className="ml-2">Posts</Link>
                        </li>
                        <li className="flex items-center">
                            <FaCog className="mx-2 h-6" />
                            <Link href="/" className="ml-2">Settings</Link>
                        </li>
                        <li className="flex items-center">
                            <FaList className="mx-2 h-6" />
                            <Link href="/" className="ml-2">Categories</Link>
                        </li>
                    </ul>
                </div>
                {/* Logout button positioned at the bottom */}
                <div className="mt-4 text-white flex items-center justify-center mb-4">
                    <FaSignOutAlt className="mx-2 h-6" />
                    <Link href="/" className="ml-2">Logout</Link>
                </div>
            </div>
        </>
    );
}

export default SideBar;

