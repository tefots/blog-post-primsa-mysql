'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  // session management
  const { data: session, status } = useSession();

  // Handle session changes to update isLoggedIn
  useEffect(() => {
    setIsLoggedIn(status === 'authenticated');
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleBlogs = () => {
    if (isLoggedIn) {
      router.push('/pages/Dashboard');
    } else {
      if (pathname === '/') {
        document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/?scrollTo=posts');
      }
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
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
              <button
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  onClick={handleBlogs}>
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

          {/* User profile picture for desktop */}
          <div className="flex items-center">
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={session?.user?.image || '/placeholder.svg'}
                    alt="User profile"
                    width={32}
                    height={32}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/pages/Settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
              <Link href="/pages/Dashboard" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Dashboard
              </Link>
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
                  src={session?.user?.image || '/placeholder.svg'}
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
              <button
                onClick={toggleProfileDropdown}
                className="ml-auto flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="sr-only">Open user menu</span>
              </button>
            </div>
            {isProfileDropdownOpen && (
              <div className="mt-3 space-y-1">
                <Link href="/pages/Settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
