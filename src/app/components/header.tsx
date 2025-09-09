'use client'
import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen = 0, setIsOpen] = useState(false);
    const [isUserMenuOpen = 0, setIsUserMenuOpen] = useState(false)
    const [user, setUser] = useState<{ id: number, username: string } | null>(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isCategoryOpen, setCategoryMenu] = useState(false)
    const [isUserOpen, setUserMenu] = useState(false)
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/cookies")
            const data = await res.json()
            setUser(data?.id ? data : null)
            if (data.username === "superAdmin" && data.id === 1) {
                setIsAdmin(true)
            }
        }
        fetchUser()
    }, [pathname])

    //close the menu when clicking on any link in mobile screen
    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close menu after clicking a link
    };
    return (
        <nav className="bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Screen */}
                <div className="flex justify-between h-20 items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={150}
                            height={80}
                            className="w-[150px] h-[80px]"
                        />
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-[#F58220] font-medium pt-2">
                            Home
                        </Link>
                        <div className="relative pt-2" onClick={() => setCategoryMenu(!isCategoryOpen)}>
                            <Link href="#" className="text-gray-700 hover:text-[#F58220] font-medium">
                                Categories
                                <span
                                    className="ml-1 cursor-pointer text-xs px-1 py-0.5 rounded-full transition">
                                    ▼
                                </span>
                            </Link>

                            {/* Dropdown */}
                            <div className={isCategoryOpen ? "absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-opacity duration-200 z-50" : "hidden"}>
                                <ul className="py-2">
                                    <li>
                                        <Link href="/categories/fiction" className="block px-4 py-2 hover:bg-gray-100">
                                            Fiction
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/children" className="block px-4 py-2 hover:bg-gray-100">
                                            Children
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/biography" className="block px-4 py-2 hover:bg-gray-100">
                                            Biography
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/history" className="block px-4 py-2 hover:bg-gray-100">
                                            History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/arts" className="block px-4 py-2 hover:bg-gray-100">
                                            Arts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categories/all" className="block px-4 py-2 hover:bg-gray-100">
                                            All
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <span className={user ? "block pt-2" : "hidden"}>
                            <Link href="/add-book" className="text-gray-700 hover:text-[#F58220] font-medium">
                                Add Book
                            </Link>
                        </span>
                        <span className={user ? "block pt-2" : "hidden"}>
                            <div className="relative" onClick={() => setUserMenu(!isUserOpen)}>

                                <Link href="#" className="text-gray-700 hover:text-[#F58220] font-medium">
                                    {user?.username}
                                    <span
                                        className="ml-1 cursor-pointer text-xs px-1 py-0.5 rounded-full transition">
                                        ▼
                                    </span>
                                </Link>

                                {/* Dropdown */}
                                <div className={isUserOpen ? "absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-opacity duration-200 z-50" : "hidden"}>
                                    <ul className="py-2">
                                        <li>
                                            <Link href="/my-books" className="block px-4 py-2 hover:bg-gray-100">
                                                My Books
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pending-books" className="block px-4 py-2 hover:bg-gray-100">
                                                Pending Books
                                            </Link>
                                        </li>
                                        <div className={isAdmin ? "block" : "hidden"}>
                                            <li>
                                                <Link href="/verified-books" className="block px-4 py-2 hover:bg-gray-100">
                                                    Verified Books
                                                </Link>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </span>

                        <Link href="/login" className="library-button">
                            Log In
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-[#F58220] focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Screen */}
                {isMenuOpen && (
                    <div className="md:hidden mt-2 space-y-2 bg-white shadow-lg rounded-lg p-4">
                        <Link href="/" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                            Home
                        </Link>

                        <Link
                            href="#"
                            className="block text-gray-700 hover:text-[#F58220]"
                            onClick={(e) => {
                                e.preventDefault(); // stop navigation
                                setIsOpen(!isOpen);
                            }}>
                            Categories
                            <span
                                className="ml-1 cursor-pointer text-xs px-1 py-0.5 rounded-full transition">
                                ▼
                            </span>
                        </Link>

                        {isOpen && (
                            <ul className="py-2">
                                <li className="py-2 px-10">
                                    <Link href="/categories/fiction" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        Fiction
                                    </Link>
                                </li>
                                <li className="py-2 px-10">
                                    <Link href="/categories/children" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        Children
                                    </Link>
                                </li>
                                <li className="py-2 px-10">
                                    <Link href="/categories/biography" className="text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        Biography
                                    </Link>
                                </li>
                                <li className="py-2 px-10">
                                    <Link href="/categories/history" className="text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        History
                                    </Link>
                                </li>
                                <li className="py-2 px-10">
                                    <Link href="/categories/arts" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        Arts
                                    </Link>
                                </li>
                                <li className="py-2 px-10">
                                    <Link href="/categories/all" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                        All
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <div className={user ? "block" : "hidden"}>
                            <Link href="/add-book" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                Add Book
                            </Link>
                        </div>

                        <div className={user ? "block" : "hidden"}>
                            <Link
                                href="#"
                                className="block text-gray-700 hover:text-[#F58220]"
                                onClick={(e) => {
                                    e.preventDefault(); // stop navigation
                                    setIsUserMenuOpen(!isUserMenuOpen);
                                }}>
                                {user?.username}
                                <span
                                    className="ml-1 cursor-pointer text-xs px-1 py-0.5 rounded-full transition">
                                    ▼
                                </span>
                            </Link>
                            {isUserMenuOpen && (
                                <ul className="py-2">
                                    <li className="py-2 px-10">
                                        <Link href="/my-books" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                            My Books
                                        </Link>
                                    </li>
                                    <li className="py-2 px-10">
                                        <Link href="/pending-books" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                            Pending Books
                                        </Link>
                                    </li>
                                    <div className={isAdmin ? "block" : "hidden"}>
                                        <li className="py-2 px-10">
                                            <Link href="/verified-books" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                                                Verified Books
                                            </Link>
                                        </li>
                                    </div>
                                </ul>
                            )}
                        </div>

                        <Link href="/login" className="block text-gray-700 hover:text-[#F58220]" onClick={handleLinkClick}>
                            Log In
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}