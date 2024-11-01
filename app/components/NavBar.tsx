import { FaSearch, FaPlus } from 'react-icons/fa'; // Import FaPlus
import Link from "next/link";

interface NavBarProps {
    toggleSideBar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSideBar }) => {
    return (
        <>
            <nav className="bg-slate-500 h-20">
                <div className="flex mt-5 items-center justify-between w-full px-4">
                    {/* Toggle button for sidebar on small screens */}
                    <button className="md:hidden text-2xl text-gray-700" onClick={toggleSideBar}>
                        &#9776; {/* Hamburger icon */}
                    </button>
                    {/* Search bar */}
                    <div className="w-full ml-3  md:w-1/2 relative">
                        <div className="absolute top-3 left-3">
                            <FaSearch className="font-light text-gray-600" />
                        </div>
                        <input 
                            type="text" 
                            className="block p-2 pl-10 w-full bg-gray-50 text-black rounded-xl focus:pl-3"
                            placeholder="Search" 
                        />
                    </div>
                    {/* Navigation links */}
                    <div className="hidden md:flex md:w-1/2 items-center justify-between">
                        
                        <Link className="bg-green-400 mx-4 px-5 rounded-3xl font-light text-white text-xl" href={'/pages/CreatePost'}>
                            Add new Post
                        </Link>
                    </div>
                    {/* Plus icon for small screens */}
                    <div className="md:hidden ml-2">
                        <Link href='/pages/CreatePost' className="text-green-400 text-2xl">
                            <FaPlus /> {/* Plus icon */}
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;


