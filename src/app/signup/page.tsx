'use client';
import { useRef, useState } from "react";
import notFound from "../error";
import {useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
export default function SignUp() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const [isSignupModalOpen, setSignupModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState();
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const res = await fetch(`${baseUrl}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if(!res.ok){
            const data= await res.json()
            return notFound(data.error)
        }

        const data = await res.json();
        setSignupModal(false)
        if (data.error) {
            setError(data.error)
        }
        else {
            router.push('/login')
        }

    };
    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="login-signup-container">
                    <h1 className="login-signup-heading mb-10">Sign Up</h1>
                    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="mt-5">
                        <div className="flex justify-center">
                            <div className="w-full sm:w-full md:w-9/12 lg:w-9/12">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="library-input"
                                    pattern="^[A-Za-z\s]{2,40}$"
                                    title="Full name should be 2-40 characters and contain only letters and spaces"
                                    required />

                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="library-input"
                                    pattern="^[a-zA-Z0-9_]{8,20}$"
                                    title="Username should be 8-20 characters long and contain only letters, numbers, and underscores."
                                    required />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="library-input"
                                    required
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="Please enter a valid email address" />

                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Password (Strong)"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="library-input"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                        title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
                                        required />
                                    {/* Eye Icon */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-5 flex items-center justify-center h-5 w-5 text-gray-500 hover:text-[#F58220] transition"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>

                                </div>
                                {error && <p className="library-errors">{error}</p>}
                                <button className="btn login-signup-button" onClick={() => {
                                    if (formRef.current?.checkValidity()) {
                                        // ✅ open modal only if form is valid
                                        setSignupModal(true);
                                    } else {
                                        // ❌ show browser validation if not valid
                                        formRef.current?.reportValidity();
                                    }
                                }}>Sign Up</button>
                                {isSignupModalOpen && (
                                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                Confirm Action
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Are you sure you want to signup to this account?
                                            </p>
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                                                    onClick={() => setSignupModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit"
                                                    className="px-4 py-2 rounded-lg bg-green-600 text-white transition cursor-pointer"
                                                    onClick={handleSubmit}
                                                >
                                                    SignUp
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}