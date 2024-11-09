import { FaSearch, FaPlus, FaAirbnb } from 'react-icons/fa'; // Import FaPlus
import Link from "next/link";
import Image from 'next/image';

// interface NavBarProps {
//     toggleSideBar: () => void;
// }

export default function NavBar(){  return (
        <>
            <nav className="bg-slate-500 h-20 w-full">
                <div className="flex  items-center justify-between w-full px-4 p-6">
                    {/* Toggle button for sidebar on small screens */}
                    {/* <button className="md:hidden text-2xl text-gray-700" onClick={toggleSideBar}>
                        &#9776; {/* Hamburger icon */}
                   {/* </button> */}
                    {/* Search bar */}
                    <div className="w-full ml-3  relative">
                        <div className="absolute top-3 left-3">
                            <FaSearch className="font-light text-gray-600" />
                        </div>
                        <input 
                            type="text" 
                            className="hidden block p-2 pl-10 w-full bg-gray-50 text-black rounded-xl focus:pl-3"
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

                    <div className="md:hidden ml-8 items-end ">
                        <Link href="#" passHref className=" text-green-400 font-bold">
                               <FaAirbnb  />
                        </Link>
                    </div>
                    <div className="links px-2 items-center">
                        <ul className="px-5 space-x-4 flex gap-x-3 text-white ">
                            
                                <Link href={'#'} className="">
                                    Blogs
                                </Link>                           
                            
                                <Link href={'#'} className="">
                                    About
                                </Link>                          
                            
                                <Link href={'#'} className="">
                                    Sigout
                                </Link>                            
                                <Link href={'#'} className="h-5 w-10">
                                    <Image 
                                    alt="profile-image"
                                    width={50}
                                    height={50}
                                    src="/pictures/Hackathon5.png"
                                    layout="responsive"
                                    className="object-cover  object-center"
                                    >

                                    </Image>
                                </Link>
                            
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
}



