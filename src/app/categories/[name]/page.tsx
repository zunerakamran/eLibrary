'use client';
import notFound from "../error";
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const params = useParams();
    const category = params.name as string;
    const categories = ["fiction", "children", "history", "biography", "arts", "all"];
    const [books, setBooks] = useState<Book[]>([]);
    const isValidCategory = categories.includes(category.toLowerCase());

    useEffect(() => {
        if (!isValidCategory) return;
        const loadBooks = async () => {
            const res = await fetch("/api/books", { cache: "no-store" });
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
    }, [category,isValidCategory]);
    
    if (!isValidCategory) {
        return notFound("This category does not exists");
    }

    return (
        <>
            <div className="w-full mt-3">
                <div className={`category-${category}-image categories-hero-section`}>
                    <div className="hero-section-container">
                        <h1 className="hero-section-heading mt-3 text-capitalize">
                            {category.toUpperCase()}
                        </h1>
                        <p className="hero-section-text mt-3">
                            Discover a world of knowledge, imagination, and inspiration. Browse through our diverse range of categories—each carefully curated to fuel your curiosity and ignite your passion for reading.
                        </p>
                        <Link className="gallery-clickable-content" href="#booksContainer">
                            <button className="btn library-button mt-3">Explore Now</button>
                        </Link>
                    </div>
                </div>

                <div className="container mx-auto mt-5 mb-5" id="booksContainer">
                    <h1 className="library-heading text-center mb-4">Browse Our Book Categories</h1>
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
