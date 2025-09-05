'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignUp() {
    const baseUrl= process.env.NEXT_PUBLIC_BASE_URL || "";
    const [error, setError] = useState();
    const router= useRouter()
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
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    if(data.error){
        setError(data.error)
    }
    else{
        router.push('/login')
    }
    
};
    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="login-signup-container">
                    <h1 className="login-signup-heading mb-10">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="mt-5">
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
                                    required/>

                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="library-input"
                                    pattern="^[a-zA-Z0-9_]{8,20}$"
                                    title="Username should be 8-20 characters long and contain only letters, numbers, and underscores."
                                    required/>

                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="library-input"
                                    required
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="Please enter a valid email address"/>

                                <div className="position-relative">
                                    <input
                                        type="password"
                                        placeholder="Password (Strong)"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        id="passwordInput"
                                        className="library-input"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                        title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
                                        required/>                                                      
                                    <i className="bi bi-eye-slash toggle-signup-password"></i>
                                </div>
                                {error && <p className="library-errors">{error}</p>}
                                <button type="submit" className="btn login-signup-button">Sign Up</button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}