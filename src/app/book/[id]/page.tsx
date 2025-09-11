'use client'
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    userId: number;
    user?: { username: string };
}

export default function Book() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const params = useParams();
    const id = Number(params.id);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            const res = await fetch(`${baseUrl}/api/books`, { cache: "no-store" });
            if (!res.ok) return;
            const data: Book[] = await res.json();
            const filtered = data.filter((book) => book.id === id);
            setBooks(filtered);
        };
        loadBooks();
    }, [id]);


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-2xl shadow-lg"
                >
                    {/* Book Cover */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <Image
                            src={book.image.startsWith("/") ? book.image : `/${book.image}`}
                            alt={book.title || "Book Cover"}
                            width={280}
                            height={420}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    {/* Book Content */}
                    <div className="flex-1 space-y-6">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            {book.title}
                        </h1>

                        {/* Author + Added By */}
                        <p className="text-lg text-gray-700">
                            By{" "}
                            <span className="text-[#F58220] font-semibold text-2xl">
                                {book.author}
                            </span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Added by{" "}
                            <span className="text-[#F58220] font-medium">
                                {book.user?.username ?? "Unknown"}
                            </span>
                        </p>
                        {book.isVerified && book.user?.username !== "superAdmin" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 mt-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                ✅ Verified by Admin (username: superAdmin)
                            </span>
                        )}


                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-700 text-base">
                            <p>
                                <span className="font-semibold text-gray-900">Category:</span>{" "}
                                {book.category}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900">Narrator:</span>{" "}
                                {book.narrator}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900">Publisher:</span>{" "}
                                {book.publisher}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Published At:
                                </span>{" "}
                                {new Date(book.publishedAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="pt-4 border-t">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Book Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed max-w-2xl">
                                {book.details}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
