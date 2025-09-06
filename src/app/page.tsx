
import Image from "next/image";
import Link from "next/link";
export default function Home() {
    return (
        <>
            <section className="relative flex items-center justify-center lg:h-[83vh] h-[77vh] rounded-2xl overflow-hidden my-5">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105"
                        style={{ backgroundImage: "url('/images/hero.jpg')" }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 text-center px-6 max-w-3xl animate-fadeIn">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Discover Your Next{" "}
                        <br />
                        <span className="relative text-[#F58220]">
                            Great Read
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-gray-200 font-medium">
                        At <span className="font-semibold text-[#F58220]">Naredko</span>, we
                        build digital platforms for book lovers and researchers — explore,
                        access, and enjoy a world of knowledge at your fingertips.
                    </p>

                    <div className="mt-10">
                        <Link
                            href="/categories/all"
                            className="bg-[#F58220] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-[#e56e0f] transition transform hover:scale-105"
                        >
                            Explore Now
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl text-center font-bold text-gray-900 leading-tight mt-18 mb-10">
                    Browse Our <span className="text-[#F58220] relative">Categories</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card Component */}
                    {[
                        { title: "Fiction", count: "250+", img: "/images/category1.jpg", link: "/categories/fiction" },
                        { title: "Children", count: "180+", img: "/images/category2.jpg", link: "/categories/children" },
                        { title: "History", count: "145+", img: "/images/category3.jpg", link: "/categories/history", span: "sm:col-span-2 lg:col-span-2" },
                        { title: "All", count: "200+", img: "/images/category6.jpg", link: "/categories/all", span: "sm:col-span-2 lg:col-span-2" },
                        { title: "Biography", count: "125+", img: "/images/category4.jpg", link: "/categories/biography" },
                        { title: "Arts", count: "230+", img: "/images/category5.jpg", link: "/categories/arts" },
                    ].map((cat, idx) => (
                        <Link key={idx} href={cat.link} className={cat.span || ""}>
                            <div className="relative group rounded-2xl overflow-hidden h-64 sm:h-72 shadow-lg cursor-pointer transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                {/* Background */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${cat.img})` }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-[#F58220]/80 group-hover:via-black/50 group-hover:to-transparent transition-all duration-500" />
                                {/* Content */}
                                <div className="relative z-10 flex flex-col justify-end h-full p-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white tracking-wide">{cat.title}</h2>
                                        <Image src="/images/arrow.png" alt="Arrow" width={26} height={26} className="opacity-90 group-hover:translate-x-1 transition" />
                                    </div>
                                    <p className="text-sm text-gray-200 mt-1">Books Available: {cat.count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* <!-- stats / achievements section --> */}
                <section className="py-16 bg-gray-50 mt-18 rounded-2xl">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        {/* Heading */}
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">
                            Our <span className="text-[#F58220]">Impact</span>
                        </h1>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Stat 1 */}
                            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
                                <h2 className="text-4xl font-bold text-[#F58220]">10K+</h2>
                                <p className="text-gray-700 mt-2 text-sm md:text-base">Books Available</p>
                            </div>

                            {/* Stat 2 */}
                            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
                                <h2 className="text-4xl font-bold text-[#F58220]">5K+</h2>
                                <p className="text-gray-700 mt-2 text-sm md:text-base">Active Readers</p>
                            </div>

                            {/* Stat 3 */}
                            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
                                <h2 className="text-4xl font-bold text-[#F58220]">50+</h2>
                                <p className="text-gray-700 mt-2 text-sm md:text-base">Categories Covered</p>
                            </div>

                            {/* Stat 4 */}
                            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
                                <h2 className="text-4xl font-bold text-[#F58220]">24/7</h2>
                                <p className="text-gray-700 mt-2 text-sm md:text-base">Access Anytime</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* <!-- why choose us? section --> */}
                <section className="py-16 bg-white">
                    <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-900 leading-snug mb-12">
                        Why Choose <span className="text-[#F58220]">Our Library</span>
                    </h1>

                    <div className="flex flex-wrap -mx-4 items-center">
                        {/* Left Image */}
                        <div className="w-full lg:w-5/12 px-4 mb-6 lg:mb-0">
                            <Image
                                src="/images/library.jpg"
                                alt="My Books"
                                width={600}
                                height={400}
                                className="section3-images shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="w-full lg:w-7/12 px-4">
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Card 1 */}
                                <div className="section-boxes hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <h2 className="text-lg font-semibold mb-2">Expertise & Knowledge</h2>
                                    <p className="text-sm leading-relaxed">
                                        A curated collection of quality books, organized for easy discovery by genre, author, or popularity.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="section-boxes hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <h2 className="text-lg font-semibold mb-2">Time & Stress Savings</h2>
                                    <p className="text-sm leading-relaxed">
                                        Simplifies your reading journey with smart search, filters, and personalized recommendations.
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="section-boxes hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <h2 className="text-lg font-semibold mb-2">Community & Contribution</h2>
                                    <p className="text-sm leading-relaxed">
                                        Readers can submit books and share knowledge, while admins ensure every submission is verified.
                                    </p>
                                </div>

                                {/* Highlighted Card */}
                                <div className="section-orange-boxes shadow-xl hover:scale-105 transition-all duration-300">
                                    <h2 className="text-lg font-semibold mb-2">Access Anytime, Anywhere</h2>
                                    <p className="text-sm leading-relaxed">
                                        Enjoy unlimited access to books—whether at home, school, or on the go—on any device, 24/7.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Books Section */}
                <section className="py-16 bg-gray-50 rounded-2xl">
                    <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-900 leading-snug mb-12">
                        Featured <span className="text-[#F58220]">Books</span>
                    </h1>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
                        {/* Book 1 */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/images/books/book59.jpg"
                                alt="Book 1"
                                width={400}
                                height={500}
                                className="w-full h-75 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900">The Silent Patient</h2>
                                <p className="text-sm text-gray-600 mb-4">By Alex Michaelides</p>
                                <Link href="/book/10" className="bg-[#F58220] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e56e0f]">
                                    Read Now
                                </Link>
                            </div>
                        </div>

                        {/* Book 2 */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/images/books/book54.jpg"
                                alt="Book 2"
                                width={400}
                                height={500}
                                className="w-full h-75 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900">The Quintet</h2>
                                <p className="text-sm text-gray-600 mb-4">By Michael E. Karpeles (Mek)</p>
                                <Link href="/book/11" className="bg-[#F58220] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e56e0f]">
                                    Read Now
                                </Link>
                            </div>
                        </div>

                        {/* Book 3 */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/images/books/book67.jpg"
                                alt="Book 3"
                                width={400}
                                height={500}
                                className="w-full h-75 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Still Life</h2>
                                <p className="text-sm text-gray-600 mb-4">By Anna Backman Rogers</p>
                                <Link href="/book/12" className="bg-[#F58220] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e56e0f]">
                                    Read Now
                                </Link>
                            </div>
                        </div>

                        {/* Book 4 */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/images/books/book68.jpg"
                                alt="Book 4"
                                width={400}
                                height={500}
                                className="w-full h-75 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Infatuate</h2>
                                <p className="text-sm text-gray-600 mb-4">By Aimee Agresti</p>
                                <Link href="/book/68" className="bg-[#F58220] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e56e0f]">
                                    Read Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- testimonials section --> */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        {/* Heading */}
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">
                            What Our <span className="text-[#F58220]">Readers Say</span>
                        </h1>

                        {/* Testimonials Grid */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Testimonial 1 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
                                <p className="text-gray-700 text-base leading-relaxed">
                                    “Naredko has completely transformed my reading journey.
                                    I can now find books instantly”
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <Image
                                        src="/images/testimonial1.jpg"
                                        alt="User 1"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Georgia Thomas</h3>
                                        <p className="text-sm text-gray-500">Research Scholar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
                                <p className="text-gray-700 text-base leading-relaxed">
                                    “I love the curated categories and recommendations.
                                    It saves me so much time finding the right book.”
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <Image
                                        src="/images/testimonial2.jpg"
                                        alt="User 2"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Emma Mickel</h3>
                                        <p className="text-sm text-gray-500">Book Enthusiast</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:bg-[#FF914D] hover:shadow-lg transition duration-300">
                                <p className="text-gray-700 hover:text-white text-base leading-relaxed">
                                    “The platform works flawlessly on my laptop and phone.
                                    I can access my books anytime, anywhere. Love it!”
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <Image
                                        src="/images/testimonial3.jpg"
                                        alt="User 3"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Karan Kapoor</h3>
                                        <p className="text-sm text-gray-500">College Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- CTA Banner --> */}
                <section className="relative bg-[#F58220] py-16 md:py-20 rounded-2xl">
                    <div className="max-w-6xl mx-auto px-6 text-center text-white">
                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            Ready to Explore Endless Knowledge?
                        </h2>

                        {/* Subtext */}
                        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            Join thousands of readers who trust our library for books, learning, and inspiration.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/categories/all"
                                className="bg-white text-[#F58220] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
                            >
                                Browse Books
                            </Link>
                            <Link
                                href="/signup"
                                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#F58220] transition"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}
