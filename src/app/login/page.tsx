'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function Login() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const [formData, setFormData]= useState({
        username: "",
        password:"",
    })
    const router= useRouter()
    const [error, setError]=useState()
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit= async(e:React.FormEvent)=>{
        e.preventDefault();
        const res= await fetch(`${baseUrl}/api/login`, {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        const data= await res.json()
        if(data.error){
            setError(data.error)
        }
        else{
            router.push('/');
            router.refresh();
        }
    }
    return (
        <>
            <div className="container mx-auto mt-5">
                <div className="login-signup-container">
                    <h1 className="login-signup-heading">Log In</h1>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="flex justify-center">
                            <div className="w-full sm:w-full md:w-9/12 lg:w-9/12">
                                <input type="text" placeholder="Username" name="username" className="library-input" value={formData.username} onChange={handleChange} required/>

                                    <div className="position-relative">
                                        <input type="password" placeholder="Password" name="password" className="library-input" value={formData.password} onChange={handleChange}  required/>
                                    </div>

                                    
                                    <button type="submit" className="btn login-signup-button">Log In</button>
                                    {error && <p className="library-errors">{error}</p>}
                                    <p className="library-text mt-3">New user?
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