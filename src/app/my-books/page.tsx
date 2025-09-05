'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import notFound from "./error";
import { useRouter } from 'next/navigation';
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
    userId: number
}

export default function MyBooks() {
    const baseUrl= process.env.NEXT_PUBLIC_BASE_URL || "";
    const router = useRouter()
    const [user, setUser] = useState<{ id: number; username: string } | null>(null);
    const [books, setBooks] = useState<Book[]>([])
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`${baseUrl}/api/cookies`, { credentials: 'include', cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        }
        fetchUser()
    }, [])
    async function fetchBooks() {
        const res = await fetch('/api/books')
        const data: Book[] = await res.json()
        let filterBooks = data.filter(book => book.userId === user?.id)
        filterBooks = filterBooks.filter(book => book.isVerified === true)
        setBooks(filterBooks)
    }

    useEffect(() => {
        fetchBooks()
    }, [user, fetchBooks])

    const viewBook = (id: number) => {
        router.push(`/book/${id}`)
    }
    const deleteBook = async (id: number) => {
        const res = await fetch(`/api/books/${id}`, {
            method: "DELETE"
        })
        if (res.ok) {
            fetchBooks()
        }
        else {
            notFound("Something went wrong")
        }
    }
    const updateBook = (id: number) => {
        router.push(`/update/${id}`)
    }
    return (
        <>
            <div className="w-full mt-3">
                <div className="mybooks-container">
                    <div className="hero-section-container">
                        <h1 className="hero-section-heading mt-3 text-capitalize">
                            My Books
                        </h1>
                        <p className="hero-section-text mt-3">
                            Discover a world of knowledge, imagination, and inspiration. Browse through our diverse range of categories—each carefully curated to fuel your curiosity and ignite your passion for reading.
                        </p>
                        <button className="library-button mt-5" >
                            Explore Now
                        </button>
                    </div>
                </div>
                <div className="container mx-auto mt-5 mb-5" id="booksContainer">
                    <h1 className="library-heading text-center mb-4">Browse Our Book Categories</h1>
                    {books.length === 0 && notFound("No books available")}
                    <div className="flex flex-wrap justify-center">
                        {books.map(book => (
                            <div key={book.id} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 m-5 book-card">
                                <div className='max-w-sm mx-auto'>
                                    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                                        <Image
                                            src={book.image.startsWith("/") ? book.image : `/${book.image}`}
                                            alt="Book Cover"
                                            width={300}        
                                            height={400}      
                                            className="books-images"
                                        />
                                        <div className='p-4'>
                                            <h2 className="text-xl font-semibold mb-2 books-title">{book.title}</h2>
                                            <p className="text-gray-600 text-sm mb-4 books-author">
                                                {book.author}
                                            </p>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors my-5" onClick={() => viewBook(book.id)}>
                                                View
                                            </button>
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-2 my-5" onClick={() => deleteBook(book.id)}>
                                                Delete
                                            </button>
                                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mx-2 my-5" onClick={() => updateBook(book.id)}>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}