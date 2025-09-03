'use client'
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';

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
export default function Book() {
    const params = useParams();
    const id = Number(params.id);
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        const loadBooks = async () => {
            const res = await fetch('/api/books');
            const data: Book[] = await res.json();
            const filtered = data.filter(book => book.id === id);
            setBooks(filtered);
        };
        loadBooks();
    }, [id]);
    return (
        <>
            <div className="container mx-auto p-10">
                {books.map(book => (
                    <div className="flex flex-wrap -mx-4 mb-4">
                        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 py-3">
                            <Image
                                src={book.image.startsWith("/") ? book.image : `/${book.image}`} 
                                alt={book.title || "Book Cover"}
                                width={400}  
                                height={600}  
                                className="books-details-image"
                            />
                            <table className="min-w-full divide-y divide-gray-200 mt-2">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {book.title}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {book.author}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {book.category}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Narrator
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {book.narrator}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Published At
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(book.publishedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 cursor-pointer">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Publisher
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">{book.publisher}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-2/3 px-8 py-3">
                            <h1 className="library-heading">
                                {book.title}
                            </h1>
                            <p className="library-text">
                                By :- <b className="text-[#F58220] text-[26px]"> {book.author} </b>
                            </p>
                            {/* <p className="library-text">
                                 Book Added By :- <b style="color:#F58220; font-size: 26px;"> {<%- users.username} </b>
                             </p> */}

                            <p className="books-detail-text">
                                {book.details}
                            </p>
                            <button className="btn library-button mt-3">
                                <Link href="<%-book.download %>" download className="gallery-clickable-content">Download Now</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}