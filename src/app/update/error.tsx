'use client'

import Link from "next/link"

export default function notFound(error: string) {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Oops! Something went wrong
                </h1>

                {/* Error message */}
                <p className="text-gray-600 max-w-lg mb-6">{error}</p>

                {/* CTA */}
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-[#F58220] text-white font-medium hover:bg-orange-600 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </>
    )
}