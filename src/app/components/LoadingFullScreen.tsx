// LoadingFullScreen.tsx
import React from "react";

export function LoadingFullScreen() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="min-h-[60vh] flex items-center justify-center bg-transparent"
        >
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <svg
                    className="animate-spin h-12 w-12 text-[#F58220]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>

                {/* Message */}
                <p className="text-sm md:text-base text-gray-600">Loading — please wait...</p>
            </div>
        </div>
    );
}
