import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <>
            {/* <!-- Footer Section --> */}
            {/* <!-- Footer Section --> */}
            <footer className="bg-[#111] text-white py-14 rounded-2xl mt-5 mb-2">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                        {/* Brand / About */}
                        <div>
                            <h2 className="text-2xl font-semibold text-[#F58220]">eLibrary</h2>
                            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                                Your digital gateway to endless knowledge. Discover books, explore categories, and read anytime, anywhere.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Explore</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/" className="hover:text-[#F58220] transition">Home</Link></li>
                                <li><Link href="/signup" className="hover:text-[#F58220] transition">SignUp</Link></li>
                                <li><Link href="/login" className="hover:text-[#F58220] transition">LogIn</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/categories/fiction" className="hover:text-[#F58220] transition">Fiction</Link></li>
                                <li><Link href="/categories/history" className="hover:text-[#F58220] transition">History</Link></li>
                                <li><Link href="/categories/children" className="hover:text-[#F58220] transition">Children</Link></li>
                                <li><Link href="/categories/biography" className="hover:text-[#F58220] transition">Biography</Link></li>
                                <li><Link href="/categories/all" className="hover:text-[#F58220] transition">All</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                            <p className="text-gray-400 text-sm">Get updates on new books & features.</p>
                            <div className="mt-4 flex rounded-full overflow-hidden border border-gray-600">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 text-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MyLibrary. All rights reserved.</p>

                        {/* Socials */}
                        <div className="flex gap-5 mt-4 md:mt-0">
                            <a href="#" className="hover:text-[#F58220] transition">🌐</a>
                            <a href="#" className="hover:text-[#F58220] transition">🐦</a>
                            <a href="#" className="hover:text-[#F58220] transition">📘</a>
                            <a href="#" className="hover:text-[#F58220] transition">📸</a>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    );
}
