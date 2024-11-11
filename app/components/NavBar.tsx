'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {

  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would typically come from your auth state


  //session management
  const { data: session, status, update } = useSession();
  //loging the user data
  console.log(session?.user);
  
  console.log(status);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('pages/Auth');

  }
  else{
    setIsLoggedIn(true);
  }

 // scrolling to section on navigation
  const handlleBlogs = () => {
    if (pathname === '/pages/AllPosts') {
      // Directly scroll to section if already on home page
      document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home with query for scrolling
      router.push('/?scrollTo=posts');
    }

  };
  console.log(isLoggedIn);
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-gray-800">
                <Image 
                src={'/pictures/bs_logo.png'}
                height={78}
                width={78}
                alt='Logo'/>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <button

                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                onClick={handlleBlogs}
              >
                Blogs
              </button>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/services"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Write Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/pages/Auth"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
                        </div>

          <div className="flex items-center">
            {/* User profile picture for desktop */}
            {isLoggedIn && (
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="ml-3 relative">
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <Image
                      className="h-8 w-8 rounded-full"
                      src="/placeholder.svg?height=32&width=32"
                      alt="User profile"
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
                    </div>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
                    </div>
                    {/* Plus icon for small screens */}
                    <div className="md:hidden ml-2">
                        <Link href='/pages/CreatePost' className="text-green-400 text-2xl">
                            <FaPlus /> {/* Plus icon */}
                        </Link>
                    </div>
                    <div className="links px-2 items-center">
                        <ul className="px-5 space-x-4 flex gap-x-3 text-white ">
                            <li>
                                <Link href={'#'} className="">
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'} className="">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href={'#'} className="">
                                    Signin
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'} className="">
                                    Signup
                                </Link>
                            </li>
                            <li className="h-5 w-10 ">
                                <Link href={'#'} className="">
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
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
}
