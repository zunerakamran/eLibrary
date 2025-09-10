'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const [isLoginModalOpen, setLoginModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const router = useRouter()
    const [error, setError] = useState()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        const res = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        setLoginModal(false)
        if (data.error) {
            setError(data.error)
        }
        else {
            router.push('/');
            router.refresh();
        }
    }
    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="login-signup-container">
                    <h1 className="login-signup-heading">Log In</h1>
                    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="mt-5">
                        <div className="flex justify-center">
                            <div className="w-full sm:w-full md:w-9/12 lg:w-9/12">
                                <input type="text" placeholder="Username" name="username" className="library-input" value={formData.username} onChange={handleChange} required />

                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="library-input" value={formData.password} onChange={handleChange} required />
                                    {/* Eye Icon */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-5 flex items-center justify-center h-5 w-5 text-gray-500 hover:text-[#F58220] transition"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <button className="btn login-signup-button" onClick={() => {
                                    if (formRef.current?.checkValidity()) {
                                        // ✅ open modal only if form is valid
                                        setLoginModal(true);
                                    } else {
                                        // ❌ show browser validation if not valid
                                        formRef.current?.reportValidity();
                                    }
                                }}>Log In</button>
                                {isLoginModalOpen && (
                                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                Confirm Action
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Are you sure you want to login to this account?
                                            </p>
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                                                    onClick={() => setLoginModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit"
                                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white transition cursor-pointer"
                                                    onClick={handleSubmit}
                                                >
                                                    LogIn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {error && <p className="library-errors">{error}</p>}
                                <p className="library-text mt-3">New user? {"  "}
                                    <Link className="gallery-clickable-content log-in-sign-up" href="/signup">
                                        SignUp
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}