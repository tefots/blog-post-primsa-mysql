'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // session management
  const { data: session, status } = useSession();
  console.log(session?.user);
  console.log(status);

  // Handle session changes to update isLoggedIn
  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status]); // Only run when status changes

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleBlogs = () => {
    if (pathname === '/pages/AllPosts') {
      // Directly scroll to section if already on home page
      document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home with query for scrolling
      router.push('/?scrollTo=posts');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky">
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
                  alt='Logo'
                />
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
                onClick={handleBlogs}
              >
                Blogs
              </button>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/pages/CreatePost"
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
                    {/* Show user's profile picture or a placeholder */}
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={session?.user?.image || '/placeholder.svg?height=32&width=32'}
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

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="bg-primary border-primary text-primary-foreground block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Home
          </Link>
          <button
            
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={handleBlogs}
          >
            Blogs
          </button>
          {isLoggedIn ? (
            <>
              <Link
                href="/pages/CreatePost"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Write Blog
              </Link>
              <Link
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/pages/Auth"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* User profile picture and info for mobile */}
        {isLoggedIn && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={session?.user?.image || '/placeholder.svg?height=40&width=40'}
                  alt="User profile"
                  width={40}
                  height={40}
                />
                
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {session?.user?.name || 'User Name'}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {session?.user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
