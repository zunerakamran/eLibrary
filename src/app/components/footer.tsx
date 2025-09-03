import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-black text-white rounded-xl px-10 py-30 my-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={250}
                        height={120}
                        className="w-[250px] h-[120px]"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Pages</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
                        <li><Link href="/signup" className="hover:text-orange-400">SignUp</Link></li>
                        <li><Link href="/login" className="hover:text-orange-400">LogIn</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Categories</h3>
                    <ul className="space-y-2">
                        <li><Link href="/books/fiction" className="hover:text-orange-400">Fiction</Link></li>
                        <li><Link href="/books/history" className="hover:text-orange-400">History</Link></li>
                        <li><Link href="/books/children" className="hover:text-orange-400">Children</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
