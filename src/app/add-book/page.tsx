'use client'
import { useState } from "react"
import Image from "next/image"
export default function AddBook() {
    const [formData, setFormData] = useState({
        image: null as File | null,
        title: "",
        category: "",
        author: "",
        narrator: "",
        publisher: "",
        publishedAt: "",
        details: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement
        if (name === "image" && files) {
            setFormData({ ...formData, image: files[0] })
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData();
        form.append("image", formData.image!);
        form.append("title", formData.title);
        form.append("author", formData.author);
        form.append("narrator", formData.narrator);
        form.append("publisher", formData.publisher);
        form.append("publishedAt", formData.publishedAt);
        form.append("details", formData.details)
        form.append("category", formData.category)
        const res = await fetch('/api/books', {
            method: 'POST',
            body: form
        })
        const data = res.json();
        console.log(data)
    }
    return (
        <>
            <div className="container mx-auto mb-12">
                <div className="flex flex-wrap -mx-2 add-book-container mt-5">
                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
                        <Image
                            src="/images/add-book.jpg"
                            alt="Add Book"
                            width={600}   
                            height={400}  
                            className="add-book-image"
                        />
                    </div>

                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 add-book-sub-container">
                        <form onSubmit={handleSubmit} id="addBook">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full">
                                    <label className="input-label">
                                        Choose Your Book Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="custom-file-input"
                                        name="image"
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        className="library-input"
                                        pattern="^[A-Za-z0-9\s\-:,.!?()]{2,100}$"
                                        title="Title should be 2-100 characters and contain only letters, numbers, spaces, and common punctuation."
                                        value={formData.title}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Select Book Category
                                    </label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="library-input" required>
                                        <option value="" disabled selected>Select</option>
                                        <option value="fiction">Fiction</option>
                                        <option value="children">Children</option>
                                        <option value="history">History</option>
                                        <option value="biography">Biography</option>
                                        <option value="arts">Arts</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Author
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Author"
                                        name="author"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Author name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.author}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Narrator
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Narrator"
                                        name="narrator"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Narrator name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.narrator}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Publisher
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Publisher"
                                        name="publisher"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Publisher name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.publisher}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Published Date
                                    </label>
                                    <input
                                        type="date"
                                        name="publishedAt"
                                        className="library-input"
                                        value={formData.publishedAt}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Details
                                    </label>
                                    <input
                                        placeholder="Details"
                                        name="details"
                                        className="library-textarea"
                                        required
                                        value={formData.details}
                                        onChange={handleChange}
                                        title="Details must be 20-1000 characters and can include letters, numbers, and punctuation." />
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                <button type="submit" className="btn library-button">ADD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}