'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import notFound from './error';
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

export default function PendingBooks() {
    const router = useRouter()
    const [user, setUser] = useState<{ id: number; username: string } | null>(null);
    const [books, setBooks] = useState<Book[]>([])
    const [verifyBtn, setVerifyBtn] = useState(false)
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/cookies', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        }
        fetchUser()
    }, [])
    const fetchBooks = async () => {
        const res = await fetch('/api/books')
        const data: Book[] = await res.json()
        let filterBooks;
        if (user?.username === "superAdmin" && user.id === 1) {
            filterBooks = data.filter(book => book.isVerified === false)
            setVerifyBtn(true)
        }
        else {
            filterBooks = data.filter(book => book.userId === user?.id)
            filterBooks = filterBooks.filter(book => book.isVerified === false)
            setVerifyBtn(false)
        }
        setBooks(filterBooks)
    }
    useEffect(() => {
        fetchBooks();
    }, [user])

    const viewBook = (id: number) => {
        router.push(`/book/${id}`)
    }
    const deleteBook = async (id: number) => {
        const res = await fetch(`/api/books/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        if (res.ok) {
            await fetchBooks()
        }
        else {
            notFound(data.error)
        }
    }
    const updateBook = (id: number) => {
        router.push(`/update/${id}`)
    }

    const verifyBook = async (id: number) => {
        const res = await fetch(`/api/verify/${id}`, {
            method: "PATCH"
        })
        const data = await res.json()
        if (res.ok) {
            await fetchBooks()
        }
        notFound(data.error)
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
                <div className="container mx-auto mt-10 mb-10 px-4" id="booksContainer">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Browse Our Book Categories
                    </h1>

                    {books.length === 0 && notFound("No books available")}

                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="relative group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            >
                                {/* Book Image */}
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={book.image}
                                        alt="Book Cover"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                        {book.category}
                                    </span>
                                </div>

                                {/* Book Info */}
                                <div className="p-5 space-y-2">
                                    <h2 className="text-lg font-bold text-gray-800 truncate group-hover:text-yellow-600">
                                        {book.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm truncate">Author: {book.author}</p>
                                    {book.publisher && (
                                        <p className="text-gray-400 text-xs truncate">
                                            Publisher: {book.publisher}
                                        </p>
                                    )}
                                </div>

                                {/* Actions for Desktop (hover overlay) */}
                                <div className="hidden md:flex absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 items-center justify-center gap-3 transition-opacity duration-300">
                                    <button
                                        onClick={() => viewBook(book.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
                                        title="View"
                                    >
                                        🔍
                                    </button>
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                    <button
                                        onClick={() => updateBook(book.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
                                        title="Update"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => verifyBook(book.id)}
                                        className={verifyBtn ? "bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110" : "hidden"}
                                        title="Verify"
                                    >
                                        ✅
                                    </button>
                                </div>

                                {/* Actions for Mobile (always visible) */}
                                <div className="flex md:hidden justify-center gap-2 p-3 border-t bg-gray-50">
                                    <button
                                        onClick={() => viewBook(book.id)}
                                        className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => updateBook(book.id)}
                                        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => verifyBook(book.id)}
                                        className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </>
    )
}