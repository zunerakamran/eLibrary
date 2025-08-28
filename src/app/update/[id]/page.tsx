'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
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

export default function UpdateBook({ params }: { params: { id: string } }) {
    const bookid = Number(params.id)
    const router = useRouter();
    const [loading, setLoader] = useState(true)
    const [user, setUser] = useState<{ id: number; username: string } | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [isVisible, setisVisible] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/cookies')
            if (!res.ok) {
                router.push('/');
                return;
            }
            const data = await res.json()
            setUser(data)
        }
        fetchUser();
    }, [router])
    useEffect(() => {
        async function fetchBook() {
            if (!user) return
            const res = await fetch(`/api/books/${bookid}`)
            const { book }: { book: Book } = await res.json();
            if (user && Number(user.id) !== Number(book.userId)) {
                router.push('/');
                return
            }
            setBook(book)
            setLoader(false)
        }
        fetchBook();
    }, [bookid, user, router])

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
    useEffect(() => {
        if (book) {
            setFormData({
                image: book.image as unknown as File | null,
                title: book.title,
                category: book.category,
                author: book.author || "",
                narrator: book.narrator || "",
                publisher: book.publisher || "",
                publishedAt: book.publishedAt ? new Date(book.publishedAt).toISOString().split('T')[0] : "",
                details: book.details || "",
            });
        }
    }, [book])

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
        form.append("image", formData.image as File);
        form.append("title", formData.title);
        form.append("author", formData.author);
        form.append("narrator", formData.narrator);
        form.append("publisher", formData.publisher);
        form.append("publishedAt", formData.publishedAt);
        form.append("details", formData.details)
        form.append("category", formData.category)
        const res = await fetch(`/api/books/${bookid}`, {
            method: 'PATCH',
            body: form
        })
        const data = res.json();
        console.log(data)
    }
    if (loading) return <h1>Loading...</h1>;
    return (
        <>
            <div className="container mx-auto mb-12">
                <div className="flex flex-wrap -mx-2 add-book-container mt-5">

                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 add-book-sub-container">
                        <form onSubmit={handleSubmit} id="addBook">
                            <button className="library-button mb-5" onClick={() => setisVisible(!isVisible)}>Update Book Image</button>
                            <div className="flex flex-wrap justify-center">
                                <div className={isVisible ? "block w-full" : "hidden"}>
                                    <label className="input-label">
                                        Choose Your Book Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="custom-file-input"
                                        name="image"
                                        onChange={handleChange} />
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
                                <button type="submit" className="btn library-button">UPDATE</button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
                        <img src="/images/update.jpg" className="add-book-image" />
                    </div>
                </div>
            </div>
        </>
    )
}