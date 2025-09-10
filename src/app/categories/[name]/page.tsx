'use client';
import notFound from '@/app/error';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Book {
    id: number;
    title: string;
    image: string;
    author: string;
    narrator: string;
    publisher: string;
    category: string;
    publishedAt: Date;
    details: string;
    isVerified: boolean;
}

export default function Categories() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const params = useParams();
    const category = params.name as string;
    const categories = ["fiction", "children", "history", "biography", "arts", "all"];
    const [books, setBooks] = useState<Book[]>([]);
    const isValidCategory = categories.includes(category.toLowerCase());

    useEffect(() => {
        if (!isValidCategory) return;
        const loadBooks = async () => {
            const res = await fetch(`${baseUrl}/api/books`, { cache: "no-store" });
            if(!res.ok){
                const data= await res.json()
                return notFound(data.error)
            }
            const data: Book[] = await res.json();
            if (category.toLowerCase() === "all") {
                setBooks(data)
            }
            else {
                const filtered = data.filter(book => book.category.toLowerCase() === category.toLowerCase());
                setBooks(filtered);
            }
        };

        if (category) {
            loadBooks();
        }
    }, [category, isValidCategory]);

    if (!isValidCategory) {
        return notFound("This category does not exists");
    }

    return (
        <>
            <div className="w-full mt-3">
                <div
                    className={`relative category-${category}-image categories-hero-section flex items-center justify-center rounded-2xl overflow-hidden`}
                >
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-10 text-center max-w-3xl px-6 py-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wide">
                            {category}
                        </h1>

                        <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
                            Discover a world of knowledge, imagination, and inspiration. Explore our
                            curated {category.toLowerCase()} collection to fuel your curiosity and ignite
                            your passion for reading.
                        </p>

                        <div className="mt-6">
                            <Link href="#booksContainer">
                                <button className="px-8 py-3 rounded-full bg-[#F58220] text-white font-semibold text-lg shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
                                    Explore Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="container mx-auto mt-5 mb-5" id="booksContainer">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mt-18 mb-12">
                        Browser Your <span className="text-[#F58220]">Category</span>
                    </h1>
                    {books.length === 0 && notFound("No books available with this category")}
                    <div className="flex flex-wrap justify-center">
                        {books.map(book => (
                            <div key={book.id} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 m-5 book-card">
                                <Link href={`/book/${book.id}`} className="gallery-clickable-content">
                                    <Image
                                        src={book.image.startsWith("/") ? book.image : `/${book.image}`} // ensure it starts with /
                                        alt={book.title || "Book Cover"}
                                        width={300}     // pick a base width
                                        height={400}    // pick a base height
                                        className="books-images"
                                    />
                                    <div className="mt-2">
                                        <h4 className="books-title"> {book.title}</h4>
                                        <p className="books-author"> {book.author} </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}
