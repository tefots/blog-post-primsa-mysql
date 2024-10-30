import { FaSearch} from 'react-icons/fa';
import Link from "next/link";
interface NavBarProps {
    toggleSideBar: () => void;
}

const  NavBar: React.FC<NavBarProps> =({toggleSideBar}) => {


return (
    <>
      <nav className="bg-slate-200  h-20">
        <div className="flex flex-row left-0 w-full">
            <div className="relative mt-8 px-3 ">
            <button className="font-lg px-4 md:hidden " onClick={toggleSideBar} >
                &#9776;
            </button>
            </div>
            {/* search bar */}
            <div className="w-full md:w-1/2 relative mt-5 px-4 mr-3 items-center justify-center">
                <div className="absolute top-3 left-3 items-center px-4">
                    <FaSearch className="font-light" />                
                </div>

                <input  type="text"  className="block p-2 pl-10 w-70 bg-gray-50 rounded-xl focus:pl-3"
                placeholder="Search"  />

            </div>

            {/* all posts add new post */}
            <div className="w- full md:w-1/2 right-1 bg-[#00fff]">
                <ul className="flex p-4 mt-3 mx-4 gap-x-4 ">
                    <li className='text-xl font-light'>
                        <Link  href="/">
                        All posts
                        </Link>
                    </li>
                    <button className="bg-green-400 px-5 rounded-3xl font-light text-white text-xl">
                        Add new Post
                    </button>
                </ul>
            </div>
        </div>
      </nav>
    
    
    </>
);

}
export default NavBar;