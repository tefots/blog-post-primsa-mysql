import Link from "next/link";
import { FaHome, FaCog, FaClipboardList, FaSignOutAlt, FaList } from "react-icons/fa";

// an interface
interface SideBarPops{
    isOpen: boolean;
    toggleSideBar: () => void;
}
 const SideBar:React.FC<SideBarPops> = ({isOpen, toggleSideBar}) => {


    return(
        <>
        {/* <div className="flex flex-col bg-[#008080] border mb-2 h-screen w-1/4 p-5 space-y-8 items-center "> */}
        <div className={`flex flex-col p-5 fixed inset-y-0 left-0 z-20 md:w-1/4 bg-[#008080] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0`}>
            <div className="text-white text-2xl font-bold text-center">
                <h1 className="text-white">Blog Post Platform</h1>
            </div>
                {/* Links */}
                <div className="m-16 flex-grow">
                    <ul className="text-white space-y-10 items-start justify-between flex flex-col">
                        <li className="flex flex-row">
                        <FaHome className="mx-2 h-6 "/>
                        <Link href={'/' } className="mx-5">
                            Home                    
                        </Link>
                        </li>
                        
                        <li className="flex flex-row">
                        <FaClipboardList className="mx-2 h-5 "/>
                        <Link href={'/'} className="mx-5">
                            Posts                    
                        </Link>
                        </li>

                        <li className="flex flex-row">
                        <FaCog className="mx-2 h-6 "/>
                        <Link href={'/'} className="mx-5">
                            Settings                   
                        </Link>
                        </li>

                        <li className="flex flex-row">
                        <FaList className="mx-2 h-6 "/>
                        <Link href={'/'} className="mx-5">
                            Categories                   
                        </Link>
                        </li>                  
                    </ul>

                </div>
            <div className="text-white flex text-center justify-center mb-2  position-bottom mt-5">
                <li className="flex flex-row ">
                <FaSignOutAlt  className="mx-2 h-6"/>
                <Link href={'/'} className="mx-5">
                    Logout
                </Link>
                </li>
            </div>
            <button onClick={toggleSideBar} className="block md:hidden mt-4 text-gray-400 text-sm">
                Close Side bar
            </button>
        </div>
        </>
    );
}

export default SideBar;