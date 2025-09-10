'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import notFound from '../error'
import Link from 'next/link';
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const [bookId, setBookId] = useState<number | null>(null)
    const [isDeleteModalOpen, setDeleteModal] = useState(false)
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
            else{
                const data= await res.json()
                return notFound(data.error)
            }
        }
        fetchUser()
    }, [])
    const fetchBooks = async () => {
        const res = await fetch('/api/books')
        if(!res.ok){
            const data= await res.json()
            return notFound(data.error)
        }
        const data: Book[] = await res.json()
        let filterBooks = data.filter(book => book.isVerified === true)
        filterBooks = filterBooks.filter(book => book.userId !== user?.id)
        setBooks(filterBooks)
    }
    useEffect(() => {
        if (user) {
            fetchBooks();
        }
    }, [user])

    const viewBook = (id: number) => {
        router.push(`/book/${id}`)
    }
    const deleteBook = async () => {
        const res = await fetch(`/api/books/${bookId}`, {
            method: "DELETE"
        })
        const data = await res.json()
        if (res.ok) {
            await fetchBooks()
        }
        else {
            return notFound(data.error)
        }
        setDeleteModal(false)

    }
    const updateBook = (id: number) => {
        router.push(`/update/${id}`)
    }

    return (
        <>
            <div className="w-full mt-3">
                <div className="verifiedbooks-container">
                    <div className="relative z-10 text-center max-w-3xl px-6 py-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black uppercase tracking-wide">
                            Verified Books
                        </h1>

                        <p className="mt-4 text-gray-950 text-sm sm:text-base md:text-lg leading-relaxed">
                            Discover a world of knowledge, imagination, and inspiration. Explore our
                            curated collection to fuel your curiosity and ignite
                            your passion for reading.
                        </p>

                        <div className="mt-6">
                            <Link href="#booksContainer">
                                <button className="px-8 py-3 rounded-full bg-[#F58220] text-black font-semibold text-lg shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
                                    Explore Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-10 mb-10 px-4" id="booksContainer">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mt-18 mb-12">
                        Browser Your <span className="text-[#F58220]">Category</span>
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
                                    <Image
                                        src={book.image.startsWith("/") ? book.image : `/${book.image}`}
                                        alt="Book Cover"
                                        width={400}
                                        height={600}
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
                                        onClick={() => { setBookId(book.id); setDeleteModal(true) }}
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
                                        onClick={() => { setBookId(book.id); setDeleteModal(true) }}
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
                                </div>
                            </div>
                        ))}
                    </div>

                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Confirm Action
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete this item?
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="button"
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white transition cursor-pointer"
                                        onClick={() => deleteBook()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}